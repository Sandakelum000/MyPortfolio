"use client";

import { ExternalLink, Expand, Folder, Play } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { Badge } from "@/components/ui/badge";
import { techIcons } from "@/lib/tech-icons";
import { parseDemo } from "@/lib/demo";
import type { Project } from "@/lib/models/projects";
import FitImage from "@/components/fit-image";
import Reveal from "./reveal";

export default function ProjectCard({
  project,
  onOpen,
  onWatch,
}: {
  project: Project;
  onOpen: () => void;
  onWatch: () => void;
}) {
  const { title, description, image, category, tags, github, live } = project;
  const demo = parseDemo(live);

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={onOpen}
      onKeyDown={(e) => {
        if (e.target !== e.currentTarget) return;
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen();
        }
      }}
      className="group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/3 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_0_40px_-12px] hover:shadow-primary/40"
    >
      {/* Media */}
      <div className="relative aspect-video overflow-hidden bg-linear-to-br from-neutral-800 to-neutral-950">
        {image ? (
          <FitImage
            src={image}
            alt={title}
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="absolute inset-0 transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <Folder className="h-12 w-12 text-white/20" />
          </div>
        )}
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />

        <div className="absolute right-2 top-1 rounded-full  bg-black/30 p-1 shadow-lg shadow-black/30 backdrop-blur-md">
          <Badge className="rounded-full border-transparent bg-primary px-3 text-xs font-medium text-white">
            {category}
          </Badge>
        </div>

        <span className="absolute bottom-3 right-3 flex translate-y-1 items-center gap-1 rounded-full bg-primary px-3 py-1 text-xs font-medium text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <Expand className="h-3 w-3" /> Details
        </span>
      </div>

      {/* Body */}

      <div className="flex flex-1 flex-col gap-3 p-5">
        <Reveal>
          <h3 className="text-xl font-semibold tracking-tight transition-colors group-hover:text-primary">
            {title}
          </h3>
          <p className="line-clamp-4 text-sm font-light leading-6 text-gray-400 mt-2">
            {description}
          </p>
        </Reveal>

        {/* Tech chips */}
        <Reveal>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, i) => {
              const tech = techIcons[tag];
              const Icon = tech?.icon;
              return (
                <span
                  key={`${i}-${tag}`}
                  className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-gray-300"
                >
                  {Icon && (
                    <Icon
                      className="h-3.5 w-3.5"
                      style={{ color: tech.color }}
                    />
                  )}
                  {tag}
                </span>
              );
            })}
          </div>
        </Reveal>

        {/* Links */}
        <Reveal className="mt-auto">
          <div className="flex items-center gap-4 pt-3 text-sm">
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1.5 text-gray-400 transition-colors hover:text-primary"
              >
                <SiGithub className="h-4 w-4" /> Code
              </a>
            )}

            {demo?.kind === "site" && (
              <a
                href={demo.url}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1.5 text-gray-400 transition-colors hover:text-primary"
              >
                <ExternalLink className="h-4 w-4" /> Live
              </a>
            )}

            {demo && demo.kind !== "site" && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onWatch();
                }}
                className="flex items-center gap-1.5 text-gray-400 transition-colors hover:text-primary"
              >
                <Play className="h-4 w-4" /> Demo
              </button>
            )}
          </div>
        </Reveal>
      </div>
    </article>
  );
}
