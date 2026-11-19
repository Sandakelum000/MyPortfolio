"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import ProjectCard from "@/components/project-card";
import ProjectModal from "@/components/project-modal";
import VideoModal from "@/components/video-modal";
import type { Project } from "@/lib/models/projects";
import Reveal from "../reveal";
import SectionBg from "../section-bg";

export default function ProjectsGrid({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState("All");
  const [selected, setSelected] = useState<Project | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);

  const categories = [
    "All",
    ...Array.from(new Set(projects.map((p) => p.category))),
  ];
  const filtered = projects.filter(
    (p) => active === "All" || p.category === active,
  );

  const openDetails = (p: Project) => {
    setSelected(p);
    setDetailsOpen(true);
  };

  const openVideo = (p: Project) => {
    setSelected(p);
    setVideoOpen(true);
  };

  return (
    <section id="projects" className="relative z-10 overflow-hidden px-6 py-24">
      <SectionBg variant="aurora" />
      
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-medium uppercase tracking-[0.25em] text-primary">
          Portfolio
        </p>
        <h2 className="mt-2 bg-linear-to-r from-neutral-400 via-white to-neutral-400 bg-clip-text text-4xl font-bold tracking-tight text-transparent md:text-5xl">
          My Projects
        </h2>

        {/* Filter pills */}
        <div className="mt-8 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={cn(
                "rounded-full border px-4 py-1.5 text-sm transition-all duration-200",
                active === cat
                  ? "border-primary bg-primary text-white"
                  : "border-[#48484A] text-gray-400 hover:border-primary hover:text-primary",
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((project) => (
              <ProjectCard
                key={project.title}
                project={project}
                onOpen={() => openDetails(project)}
                onWatch={() => openVideo(project)}
              />
            ))}
          </div>
        </Reveal>
      </div>

      <ProjectModal
        project={selected}
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
        onWatch={() => setVideoOpen(true)}
      />
      <VideoModal
        project={selected}
        open={videoOpen}
        onOpenChange={setVideoOpen}
      />
    </section>
  );
}
