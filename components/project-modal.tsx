"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Folder,
  Play,
} from "lucide-react";
import { SiGithub } from "react-icons/si";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { techIcons } from "@/lib/tech-icons";
import { parseDemo } from "@/lib/demo";
import type { Project } from "@/lib/models/projects";
import FitImage from "@/components/fit-image";

/* ---------- Screenshot gallery ---------- */
function Gallery({ title, photos }: { title: string; photos: string[] }) {
  const [index, setIndex] = useState(0);

  if (photos.length === 0) {
    return (
      <div className="flex aspect-video items-center justify-center bg-linear-to-br from-neutral-800 to-neutral-950">
        <Folder className="h-14 w-14 text-white/20" />
      </div>
    );
  }

  const prev = () => setIndex((i) => (i - 1 + photos.length) % photos.length);
  const next = () => setIndex((i) => (i + 1) % photos.length);

  return (
    <div className="min-w-0">
      <div className="relative aspect-video overflow-hidden bg-neutral-900">
        <FitImage
          key={photos[index]}
          src={photos[index]}
          alt={`${title} screenshot ${index + 1}`}
          sizes="(min-width: 768px) 768px, 100vw"
          className="absolute inset-0 animate-in fade-in duration-300"
        />
        {photos.length > 1 && (
          <>
            <button
              onClick={prev}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 backdrop-blur transition hover:bg-primary"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={next}
              aria-label="Next image"
              className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 backdrop-blur transition hover:bg-primary"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            <span className="absolute bottom-3 right-3 rounded-full bg-black/60 px-2.5 py-1 text-xs backdrop-blur">
              {index + 1} / {photos.length}
            </span>
          </>
        )}
      </div>

      {photos.length > 1 && (
        <div className="flex gap-2 overflow-x-auto border-b border-white/10 p-3">
          {photos.map((src, i) => (
            <button
              key={`${i}-${src}`}
              onClick={() => setIndex(i)}
              aria-label={`Show image ${i + 1}`}
              className={cn(
                "relative h-14 w-24 shrink-0 overflow-hidden rounded-lg border-2 transition",
                i === index
                  ? "border-primary"
                  : "border-transparent opacity-60 hover:opacity-100",
              )}
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="96px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------- Modal ---------- */
export default function ProjectModal({
  project,
  open,
  onOpenChange,
  onWatch,
}: {
  project: Project | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onWatch: () => void;
}) {
  if (!project) return null;

  const demo = parseDemo(project.live);
  const photos = [project.image, ...(project.images ?? [])].filter(
    (src): src is string => Boolean(src),
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] gap-0 overflow-y-auto overflow-x-hidden border-white/10 bg-neutral-950 p-0 text-white sm:max-w-3xl">
        <Gallery key={project.title} title={project.title} photos={photos} />

        <div className="flex flex-col gap-6 p-6 sm:p-8">
          {/* Header */}
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="rounded-full bg-primary/15 px-3 py-1 font-medium text-primary">
                {project.category}
              </span>
              {project.year && (
                <span className="text-gray-400">{project.year}</span>
              )}
              {project.role && (
                <span className="text-gray-400">· {project.role}</span>
              )}
            </div>
            <DialogTitle className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
              {project.title}
            </DialogTitle>
            <DialogDescription className="mt-3 whitespace-pre-line font-light leading-7 text-gray-300">
              {project.longDescription ?? project.description}
            </DialogDescription>
          </div>

          {/* Features */}
          {project.features && project.features.length > 0 && (
            <div>
              <h4 className="text-xs font-medium uppercase tracking-[0.25em] text-gray-500">
                Key features
              </h4>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {project.features.map((f, i) => (
                  <li
                    key={`${i}-${f}`}
                    className="flex items-start gap-2 text-sm text-gray-300"
                  >
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tech stack */}
          <div>
            <h4 className="text-xs font-medium uppercase tracking-[0.25em] text-gray-500">
              Tech stack
            </h4>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.tags.map((tag, i) => {
                const tech = techIcons[tag];
                const Icon = tech?.icon;
                return (
                  <span
                    key={`${i}-${tag}`}
                    className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-300"
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
          </div>

          {/* Actions */}
          {(project.github || demo) && (
            <div className="flex flex-wrap gap-3 border-t border-white/10 pt-6">
              {demo?.kind === "site" && (
                <Button className="rounded-full font-bold text-white">
                  <ExternalLink />
                  <a href={demo.url} target="_blank" rel="noreferrer">
                    Live Demo
                  </a>
                </Button>
              )}

              {demo && demo.kind !== "site" && (
                <Button
                  className="rounded-full font-bold text-white"
                  onClick={onWatch}
                >
                  <Play /> Watch Demo
                </Button>
              )}

              {project.github && (
                <Button
                  variant="outline"
                  className="rounded-full border-[#48484A] hover:border-primary hover:bg-[#FF6A00]/10 hover:text-primary"
                >
                  <SiGithub />
                  <a href={project.github} target="_blank" rel="noreferrer">
                    Source Code
                  </a>
                </Button>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
