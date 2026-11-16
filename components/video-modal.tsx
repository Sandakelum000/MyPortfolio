"use client";

import { useState } from "react";
import { Loader2, X } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { parseDemo, type Demo } from "@/lib/demo";
import type { Project } from "@/lib/models/projects";

type VideoDemo = Exclude<Demo, { kind: "site" }>;

/* ---------- The screen: phone frame (portrait) or wide player (landscape) ---------- */
function Screen({
  demo,
  title,
  portrait,
  onRatio,
}: {
  demo: VideoDemo;
  title: string;
  portrait: boolean;
  onRatio: (ratio: number) => void;
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className={cn(
        "relative shrink-0 overflow-hidden bg-black",
        portrait
          ? "mx-auto h-[min(70vh,600px)] w-[calc(min(70vh,600px)*9/16)] max-w-full rounded-[2.25rem] border-[9px] border-neutral-800 shadow-2xl shadow-primary/20 ring-1 ring-white/15"
          : "aspect-video w-full rounded-xl",
      )}
    >
      {portrait && (
        <span
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1.5 z-10 h-4 w-16 -translate-x-1/2 rounded-full bg-neutral-800"
        />
      )}

      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}

      {demo.kind === "file" ? (
        <video
          src={demo.url}
          controls
          autoPlay
          playsInline
          onLoadedMetadata={(e) =>
            onRatio(e.currentTarget.videoWidth / e.currentTarget.videoHeight)
          }
          onLoadedData={() => setLoaded(true)}
          className="h-full w-full object-contain"
        />
      ) : (
        <iframe
          src={`${demo.embed}?autoplay=1`}
          title={`${title} demo`}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          onLoad={() => setLoaded(true)}
          className="h-full w-full border-0"
        />
      )}
    </div>
  );
}

/* ---------- Modal ---------- */
export default function VideoModal({
  project,
  open,
  onOpenChange,
}: {
  project: Project | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [ratio, setRatio] = useState<number | null>(null);

  const demo = parseDemo(project?.live);
  if (!project || !demo || demo.kind === "site") return null;

  const portrait =
    ratio !== null
      ? ratio < 1
      : demo.orientation
        ? demo.orientation === "portrait"
        : project.category === "Mobile";

  const handleOpenChange = (o: boolean) => {
    if (!o) setRatio(null);
    onOpenChange(o);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        className={cn(
          "w-[calc(100%-1.5rem)] gap-0 overflow-visible border-0 bg-transparent p-0 shadow-none [&>button]:hidden",
          portrait ? "sm:max-w-md" : "sm:max-w-4xl",
        )}
      >
        {/* Glow behind the card */}
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-6 -z-10 rounded-[3rem] bg-primary/20 blur-3xl"
        />

        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-neutral-950/90 text-white backdrop-blur-xl">
          {/* Title bar */}
          <div className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-3">
            <DialogTitle className="flex min-w-0 items-center gap-2.5 text-base font-semibold tracking-tight">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              <span className="truncate">{project.title}</span>
            </DialogTitle>

            <DialogClose
              aria-label="Close"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 text-gray-400 transition hover:border-primary hover:text-primary"
            >
              <X className="h-4 w-4" />
            </DialogClose>
          </div>

          {/* Hidden description */}
          <DialogDescription className="sr-only">
            Video demonstration of {project.title}
          </DialogDescription>

          {/* Video only */}
          <div className="p-4 sm:p-5">
            <Screen
              demo={demo}
              title={project.title}
              portrait={portrait}
              onRatio={setRatio}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
