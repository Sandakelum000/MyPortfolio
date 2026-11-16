import Link from "next/link";
import { Pencil, Plus } from "lucide-react";
import prisma from "@/lib/prisma";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import ActiveToggle from "@/components/admin/active-toggle";
import DeleteButton from "./delete-button";
import { deleteProject, setProjectActive } from "./actions";

export default async function AdminProjects() {
  
  const projects = await prisma.project.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
        <Button  className="rounded-full font-bold text-white">
          <Plus /> <Link href="/admin/projects/new">New project</Link>
        </Button>
      </div>

      <ul className="mt-8 flex flex-col gap-3">
        {projects.map((p) => (
          <li
            key={p.id}
            className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/3 p-4"
          >
            <div className={cn("min-w-0", !p.active && "opacity-50")}>
              <p className="flex items-center gap-2 font-semibold">
                <span className="truncate">{p.title}</span>
                {!p.active && (
                  <span className="shrink-0 rounded-full border border-white/15 px-2 py-0.5 text-[10px] font-normal uppercase tracking-wider text-gray-400">
                    Hidden
                  </span>
                )}
              </p>
              <p className="text-xs text-gray-500">
                {p.category} · order {p.order}
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-3">
              <ActiveToggle
                active={p.active}
                label={p.title}
                action={setProjectActive.bind(null, p.id)}
              />
              <Button  variant="outline" size="sm" className="rounded-full border-[#48484A]">
               <Pencil /> <Link href={`/admin/projects/${p.id}`}> Edit</Link>
              </Button>
              <DeleteButton action={deleteProject.bind(null, p.id)} title={p.title} />
            </div>
          </li>
        ))}
        {projects.length === 0 && <p className="text-gray-500">No projects yet.</p>}
      </ul>
    </div>
  );
}