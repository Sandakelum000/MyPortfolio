import {
  BookOpen,
  Calendar,
  GraduationCap,
  MapPin,
  School,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Reveal from "@/components/reveal";
import { cn } from "@/lib/utils";
import { education } from "@/data/education";

type Entry = {
  period: string;
  title: string;
  institution: string;
  location?: string;
  description?: string;
  highlights?: string[];
  type: "university" | "school" | "course";
  current?: boolean;
};

const icons: Record<Entry["type"], LucideIcon> = {
  university: GraduationCap,
  school: School,
  course: BookOpen,
};

export default function Education() {
  return (
   
      <section id="education" className="relative z-10 px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-primary">
            Education
          </p>
          <h2 className="mt-2 bg-linear-to-r from-neutral-400 via-white to-neutral-400 bg-clip-text text-3xl font-bold tracking-tight text-transparent md:text-4xl">
            My Learning Journey
          </h2>
        <Reveal>
          <div className="relative mt-10">
            <div
              aria-hidden
              className="absolute bottom-0 left-4 top-0 w-px bg-linear-to-b from-primary via-white/15 to-transparent md:left-1/2"
            />

            <ol className="flex flex-col gap-6">
              {education.map((item, i) => {
                const Icon = icons[item.type];
                const right = i % 2 === 0;

                return (
                  <li key={item.title} className="relative grid md:grid-cols-2">
                    <span className="absolute left-4 top-5 z-10 flex h-8 w-8 -translate-x-1/2 items-center justify-center md:left-1/2">
                      {item.current && (
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/40" />
                      )}
                      <span className="relative flex h-8 w-8 items-center justify-center rounded-full border border-primary/60 bg-black text-primary shadow-[0_0_18px_-4px] shadow-primary">
                        <Icon className="h-4 w-4" />
                      </span>
                    </span>

                    {/* Card */}
                    <Reveal
                      delay={i * 100}
                      className={cn(
                        "pl-12 md:pl-0",
                        right
                          ? "md:col-start-2 md:pl-10"
                          : "md:col-start-1 md:pr-10",
                      )}
                    >
                      <div className="group rounded-xl border border-white/10 bg-white/3 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-[0_0_30px_-12px] hover:shadow-primary/40">
                        <div className="flex items-center gap-2 text-xs">
                          <span className="flex items-center gap-1.5 rounded-full bg-primary/15 px-2.5 py-0.5 font-medium text-primary">
                            <Calendar className="h-3 w-3" />
                            {item.period}
                          </span>
                          {item.current && (
                            <span className="flex items-center gap-1.5 text-green-400">
                              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" />
                              Ongoing
                            </span>
                          )}
                        </div>

                        <h3 className="mt-3 text-base font-semibold leading-snug tracking-tight transition-colors group-hover:text-primary">
                          {item.title}
                        </h3>

                        <p className="mt-1 flex flex-wrap items-center gap-x-2 text-xs text-gray-400">
                          <span className="text-gray-300">
                            {item.institution}
                          </span>
                          {item.location && (
                            <span className="flex items-center gap-1 text-gray-500">
                              <MapPin className="h-3 w-3" />
                              {item.location}
                            </span>
                          )}
                        </p>

                        {item.description && (
                          <p className="mt-3 line-clamp-3 text-xs font-light leading-5 text-gray-400">
                            {item.description}
                          </p>
                        )}

                        {item.highlights && (
                          <div className="mt-3 flex flex-wrap gap-1.5">
                            {item.highlights.map((h) => (
                              <span
                                key={h}
                                className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] text-gray-300"
                              >
                                {h}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </Reveal>
                  </li>
                );
              })}
            </ol>
          </div>
          </Reveal>
        </div>
      </section>
  );
}
