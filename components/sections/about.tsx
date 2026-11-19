import { techIcons } from "@/lib/tech-icons";
import Reveal from "../reveal";
import { site, stats } from "@/data/site";
import { skillGroups } from "@/data/skills";
import { cn } from "@/lib/utils";
import SectionBg from "../section-bg";

export default function About() {
  return (
    <section id="about" className="relative z-10 overflow-hidden px-6 py-24">
      <SectionBg variant="dots" />
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-medium uppercase tracking-[0.25em] text-primary">
          About
        </p>
        <h2 className="mt-2 bg-linear-to-r from-neutral-400 via-white to-neutral-400 bg-clip-text text-4xl font-bold tracking-tight text-transparent md:text-5xl">
          Who I Am
        </h2>

        <Reveal>
          <div className="mt-10 grid gap-10 lg:grid-cols-5">
            {/* Bio */}
            <div className="flex flex-col lg:col-span-2">
              <Reveal>
                {site.about.map((paragraph, i) => (
                  <p
                    key={paragraph}
                    className={cn(
                      "font-light leading-7",
                      i === 0
                        ? "text-gray-300 sm:text-lg"
                        : "mt-4 text-gray-400",
                    )}
                  >
                    {paragraph}
                  </p>
                ))}
              </Reveal>

              <Reveal>
                <div className="mt-auto grid grid-cols-3 gap-3 pt-8">
                  {stats.map((s) => (
                    <div
                      key={s.label}
                      className="rounded-2xl border border-white/10 bg-white/3 p-4 text-center"
                    >
                      <p className="text-2xl font-bold text-primary">
                        {s.value}
                      </p>
                      <p className="mt-1 text-xs text-gray-400">{s.label}</p>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            {/* Skills */}
            <div className="grid gap-4 sm:grid-cols-2 lg:col-span-3">
              {skillGroups.map(({ title, icon: GroupIcon, items }) => (
                <div
                  key={title}
                  className="rounded-2xl border border-white/10 bg-white/3 p-5 transition-all duration-300 hover:-translate-y-1 
                hover:border-primary/50 hover:shadow-[0_0_40px_-12px] hover:shadow-primary/40"
                >
                  <Reveal>
                    <div className="flex items-center gap-2">
                      <GroupIcon className="h-5 w-5 text-primary" />
                      <h3 className="font-semibold tracking-tight">{title}</h3>
                    </div>
                  </Reveal>

                  <Reveal>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {items.map((name) => {
                        const tech = techIcons[name];
                        const Icon = tech?.icon;
                        return (
                          <span
                            key={name}
                            className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-gray-300"
                          >
                            {Icon && (
                              <Icon
                                className="h-3.5 w-3.5"
                                style={{ color: tech.color }}
                              />
                            )}
                            {name}
                          </span>
                        );
                      })}
                    </div>
                  </Reveal>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
