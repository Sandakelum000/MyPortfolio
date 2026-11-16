import prisma from "@/lib/prisma";
import ProjectsGrid from "@/components/sections/projects-grid";

export default async function Projects() {
  const db_projects = await prisma.project.findMany({
    where: { active: true },
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
  });

  const projects = db_projects.map((p) => ({
    title: p.title,
    description: p.description,
    longDescription: p.longDescription ?? undefined,
    image: p.image ?? undefined,
    images: p.images,
    features: p.features,
    role: p.role ?? undefined,
    year: p.year ?? undefined,
    category: p.category,
    tags: p.tags,
    github: p.github ?? undefined,
    live: p.live ?? undefined,
  }));

  return <ProjectsGrid projects={projects} />;
}
