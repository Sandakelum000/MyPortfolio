import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import ProjectForm from "../project-form";

export default async function EditProject({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await prisma.project.findUnique({ where: { id: Number(id) } });
  if (!project) notFound();

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold tracking-tight">Edit project</h1>
      <ProjectForm id={project.id} project={project} />
    </div>
  );
}