"use client";

import {
  startTransition,
  useActionState,
  useEffect,
  useRef,
  useState,
} from "react";
import { ImagePlus, Loader2, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { saveProject, type FormState } from "./actions";

type Values = {
  title: string;
  description: string;
  longDescription: string | null;
  image: string | null;
  images: string[];
  features: string[];
  tags: string[];
  role: string | null;
  year: string | null;
  category: string;
  github: string | null;
  live: string | null;
  order: number;
};

const field = "border-white/10 bg-white/5 text-white placeholder:text-gray-500";
const ACCEPT = "image/png,image/jpeg,image/webp,image/gif";

function usePreview(file: File | null) {
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!file) {
      setUrl(null);
      return;
    }
    const u = URL.createObjectURL(file);
    setUrl(u);
    return () => URL.revokeObjectURL(u);
  }, [file]);

  return url;
}

function Thumb({
  src,
  label,
  onRemove,
}: {
  src: string | File;
  label?: string;
  onRemove: () => void;
}) {
  const preview = usePreview(src instanceof File ? src : null);
  const href = src instanceof File ? preview : src;

  return (
    <div className="group relative aspect-video overflow-hidden rounded-xl border border-white/10 bg-neutral-900">
      {href && (
        <>
          <img
            src={href}
            alt=""
            aria-hidden
            className="absolute inset-0 h-full w-full scale-125 object-cover opacity-40 blur-xl"
          />
          <img
            src={href}
            alt=""
            className="relative h-full w-full object-contain"
          />
        </>
      )}
      {label && (
        <span className="absolute left-2 top-2 rounded-full bg-primary px-2 py-0.5 text-[10px] font-medium text-white">
          {label}
        </span>
      )}
      <button
        type="button"
        onClick={onRemove}
        aria-label="Remove image"
        className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/70 text-white transition hover:bg-red-500 sm:opacity-0 sm:group-hover:opacity-100 sm:focus:opacity-100"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

const dropzone =
  "flex aspect-video flex-col items-center justify-center gap-1.5 rounded-xl border border-dashed border-white/20 text-xs text-gray-400 transition hover:border-primary hover:text-primary";

export default function ProjectForm({
  id,
  project,
}: {
  id?: number;
  project?: Values;
}) {
  const [state, action, pending] = useActionState<FormState, FormData>(
    saveProject.bind(null, id ?? null),
    {},
  );

  const [coverKeep, setCoverKeep] = useState(project?.image ?? "");
  const [coverFile, setCoverFile] = useState<File | null>(null);

  const [keepImages, setKeepImages] = useState<string[]>(project?.images ?? []);
  const [newFiles, setNewFiles] = useState<File[]>([]);

  const coverInput = useRef<HTMLInputElement>(null);
  const galleryInput = useRef<HTMLInputElement>(null);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);

    fd.set("coverKeep", coverKeep);
    if (coverFile) fd.set("coverFile", coverFile);
    keepImages.forEach((p) => fd.append("keepImages", p));
    newFiles.forEach((f) => fd.append("newImages", f));

    startTransition(() => action(fd));
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            name="title"
            required
            defaultValue={project?.title}
            className={field}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="category">Category</Label>
          <select
            id="category"
            name="category"
            defaultValue={project?.category ?? "Web"}
            className="h-9 rounded-md border border-white/10 bg-neutral-900 px-3 text-sm text-white"
          >
            <option>Web</option>
            <option>Mobile</option>
            <option>Backend</option>
          </select>
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="description">Short description</Label>
        <Textarea
          id="description"
          name="description"
          required
          defaultValue={project?.description}
          className={`${field} min-h-20 field-sizing-fixed`}
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="longDescription">Long description</Label>
        <Textarea
          id="longDescription"
          name="longDescription"
          defaultValue={project?.longDescription ?? ""}
          className={`${field} min-h-40 field-sizing-fixed`}
        />
      </div>

      {/* ---------- Cover image ---------- */}
      <div className="grid gap-2">
        <Label>Cover image</Label>
        {coverFile || coverKeep ? (
          <div className="max-w-sm">
            <Thumb
              src={coverFile ?? coverKeep}
              label={coverFile ? "New" : "Current"}
              onRemove={() =>
                coverFile ? setCoverFile(null) : setCoverKeep("")
              }
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-2 rounded-full border-[#48484A]"
              onClick={() => coverInput.current?.click()}
            >
              <ImagePlus /> {coverFile || coverKeep ? "Replace" : "Choose"}
            </Button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => coverInput.current?.click()}
            className={`${dropzone} max-w-sm`}
          >
            <ImagePlus className="h-6 w-6" /> Choose cover image
          </button>
        )}
        <input
          ref={coverInput}
          type="file"
          accept={ACCEPT}
          hidden
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) setCoverFile(f);
            e.target.value = "";
          }}
        />
      </div>

      {/* ---------- Gallery ---------- */}
      <div className="grid gap-2">
        <Label>Gallery images</Label>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {keepImages.map((p) => (
            <Thumb
              key={p}
              src={p}
              onRemove={() => setKeepImages((k) => k.filter((x) => x !== p))}
            />
          ))}
          {newFiles.map((f, i) => (
            <Thumb
              key={`${f.name}-${f.lastModified}-${i}`}
              src={f}
              label="New"
              onRemove={() => setNewFiles((n) => n.filter((_, j) => j !== i))}
            />
          ))}
          <button
            type="button"
            onClick={() => galleryInput.current?.click()}
            className={dropzone}
          >
            <ImagePlus className="h-5 w-5" /> Add images
          </button>
        </div>
        <p className="text-xs text-gray-500">
          PNG, JPG, WebP or GIF, up to 5 MB each.
        </p>
        <input
          ref={galleryInput}
          type="file"
          accept={ACCEPT}
          multiple
          hidden
          onChange={(e) => {
            const files = Array.from(e.target.files ?? []);
            if (files.length) setNewFiles((n) => [...n, ...files]);
            e.target.value = "";
          }}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="tags">Tags (comma separated)</Label>
          <Input
            id="tags"
            name="tags"
            placeholder="Java, Jakarta EE, MySQL"
            defaultValue={project?.tags.join(", ")}
            className={field}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="features">Key features (one per line)</Label>
          <Textarea
            id="features"
            name="features"
            defaultValue={project?.features.join("\n")}
            className={`${field} min-h-20 field-sizing-fixed`}
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-4">
        <div className="grid gap-2">
          <Label htmlFor="role">Role</Label>
          <Input
            id="role"
            name="role"
            defaultValue={project?.role ?? ""}
            className={field}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="year">Year</Label>
          <Input
            id="year"
            name="year"
            defaultValue={project?.year ?? ""}
            className={field}
          />
        </div>
        <div className="grid gap-2 sm:col-span-2">
          <Label htmlFor="order">Display order</Label>
          <Input
            id="order"
            name="order"
            type="number"
            min={0}
            defaultValue={project?.order ?? 0}
            className={field}
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="github">GitHub URL</Label>
          <Input
            id="github"
            name="github"
            defaultValue={project?.github ?? ""}
            className={field}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="live">Live site or video URL</Label>
          <Input
            id="live"
            name="live"
            placeholder="https://... or youtu.be/...#portrait"
            defaultValue={project?.live ?? ""}
            className={field}
          />
        </div>
      </div>

      {state.error && <p className="text-sm text-red-400">{state.error}</p>}

      <Button
        type="submit"
        disabled={pending}
        className="w-fit rounded-full px-8 font-bold text-white"
      >
        {pending ? (
          <>
            <Loader2 className="animate-spin" /> Saving...
          </>
        ) : (
          "Save project"
        )}
      </Button>
    </form>
  );
}
