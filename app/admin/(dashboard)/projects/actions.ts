"use server";

import { randomUUID } from "node:crypto";
import { mkdir, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin";

export type FormState = { error?: string };

/* ---------- Text fields ---------- */
const lines = (s: string) => s.split("\n").map((x) => x.trim()).filter(Boolean);
const csv = (s: string) => s.split(",").map((x) => x.trim()).filter(Boolean);
const optional = z.string().trim().transform((v) => v || null);

const schema = z.object({
  title: z.string().trim().min(2, "Title is too short").max(120),
  description: z.string().trim().min(10, "Description is too short").max(500),
  longDescription: optional,
  features: z.string().transform(lines),
  tags: z.string().transform(csv),
  role: optional,
  year: optional,
  category: z.enum(["Web", "Mobile", "Backend"]),
  github: z
    .union([z.literal(""), z.string().trim().url("GitHub must be a full URL")])
    .transform((v) => v || null),
  live: optional,
  order: z.coerce.number().int().min(0).default(0),
});

/* ---------- Image helpers ---------- */
class UploadError extends Error {}

const MAX_SIZE = 5 * 1024 * 1024; // 5 MB
const ROOT = path.join(process.cwd(), "public", "images", "projects");

const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "project";

// Decide the type from the file's real bytes, not its name or declared type.
function sniff(b: Buffer): string | null {
  if (b.subarray(0, 4).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47]))) return "png";
  if (b.subarray(0, 3).equals(Buffer.from([0xff, 0xd8, 0xff]))) return "jpg";
  if (b.subarray(0, 4).toString("ascii") === "RIFF" && b.subarray(8, 12).toString("ascii") === "WEBP") return "webp";
  if (b.subarray(0, 3).toString("ascii") === "GIF") return "gif";
  return null;
}

async function saveImage(file: File, slug: string, prefix: string): Promise<string> {
  if (file.size > MAX_SIZE) throw new UploadError(`"${file.name}" is larger than 5 MB.`);

  const buffer = Buffer.from(await file.arrayBuffer());
  const ext = sniff(buffer);
  if (!ext) throw new UploadError(`"${file.name}" is not a PNG, JPG, WebP or GIF image.`);

  const dir = path.join(ROOT, slug);
  await mkdir(dir, { recursive: true });

  const name = `${prefix}-${randomUUID().slice(0, 8)}.${ext}`;
  await writeFile(path.join(dir, name), buffer);
  return `/images/projects/${slug}/${name}`;
}

async function removeFiles(paths: string[]) {
  for (const p of paths) {
    if (!p.startsWith("/images/projects/")) continue;
    const full = path.join(process.cwd(), "public", p);
    if (!full.startsWith(ROOT + path.sep)) continue; // blocks "../" tricks
    await unlink(full).catch(() => {});
  }
}

/* ---------- Actions ---------- */
export async function saveProject(
  id: number | null,
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  await requireAdmin();

  const parsed = schema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const coverEntry = formData.get("coverFile");
  const cover = coverEntry instanceof File && coverEntry.size > 0 ? coverEntry : null;
  const newFiles = formData
    .getAll("newImages")
    .filter((f): f is File => f instanceof File && f.size > 0);

  if (process.env.VERCEL && (cover || newFiles.length > 0)) {
    return {
      error:
        "Image upload only works when the admin runs locally. Run npm run dev, upload there, then push the images.",
    };
  }

  const existing = id
    ? await prisma.project.findUnique({
        where: { id },
        select: { image: true, images: true },
      })
    : null;

  // keep only paths that really belong to this project 
  const keepCover = String(formData.get("coverKeep") ?? "");
  const keepImages = formData.getAll("keepImages").map(String);

  let image: string | null =
    existing?.image && existing.image === keepCover ? existing.image : null;
  const images = (existing?.images ?? []).filter((p) => keepImages.includes(p));

  const saved: string[] = [];
  try {
    const slug = slugify(parsed.data.title);

    if (cover) {
      const p = await saveImage(cover, slug, "cover");
      saved.push(p);
      image = p;
    }
    for (const file of newFiles) {
      const p = await saveImage(file, slug, "shot");
      saved.push(p);
      images.push(p);
    }

    const data = { ...parsed.data, image, images };
    if (id) {
      await prisma.project.update({ where: { id }, data });
    } else {
      await prisma.project.create({ data });
    }
  } catch (e) {
    await removeFiles(saved); 
    if (e instanceof UploadError) return { error: e.message };
    if ((e as { code?: string }).code === "P2002") {
      return { error: "A project with this title already exists." };
    }
    return { error: "Could not save the project." };
  }

  // Delete files that were removed or replaced (only after the DB update worked)
  const removed = [
    ...(existing?.image && existing.image !== image ? [existing.image] : []),
    ...(existing?.images ?? []).filter((p) => !images.includes(p)),
  ];
  await removeFiles(removed);

  revalidatePath("/");
  revalidatePath("/admin/projects");
  redirect("/admin/projects");
}

export async function deleteProject(id: number) {
  await requireAdmin();

  const project = await prisma.project.findUnique({
    where: { id },
    select: { image: true, images: true },
  });
  await prisma.project.delete({ where: { id } });

  if (project) {
    await removeFiles([...(project.image ? [project.image] : []), ...project.images]);
  }

  revalidatePath("/");
  revalidatePath("/admin/projects");
}

export async function setProjectActive(id: number, active: boolean) {
  await requireAdmin();
  await prisma.project.update({ where: { id }, data: { active } });
  revalidatePath("/");
  revalidatePath("/admin/projects");
}