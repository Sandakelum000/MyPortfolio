import {
  ArrowUp,
  ArrowUpRight,
  Cloud,
  Mail,
  Monitor,
  Server,
  Smartphone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Reveal from "@/components/reveal";
import { techIcons } from "@/lib/tech-icons";
import { contacts, contactEmail } from "@/lib/contacts";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const services = [
  { label: "Web Development", icon: Monitor },
  { label: "Mobile Apps", icon: Smartphone },
  { label: "Backend Systems", icon: Server },
  { label: "Cloud & Databases", icon: Cloud },
];

const stack = [
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Tailwind",
  "Java",
  "Jakarta EE",
  "React Native",
  "Android",
  "MongoDB",
  "Prisma",
  "Firebase",
  "AWS",
  "MySQL",
];

const headingClass =
  "text-xs font-medium uppercase tracking-[0.25em] text-gray-500";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 overflow-hidden border-t border-white/10">
      {/* ---------- Background layer: glows + watermark ---------- */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary to-transparent" />
        <div className="absolute -left-20 top-10 h-72 w-72 animate-pulse rounded-full bg-primary/10 blur-[110px]" />
        <div className="absolute -right-20 bottom-10 h-72 w-72 animate-pulse rounded-full bg-primary/10 blur-[110px] [animation-delay:1.5s]" />

        <div className="absolute inset-0 flex items-center justify-center">
          <span className="animate-drift select-none bg-linear-to-b from-white/[0.07] to-transparent bg-clip-text text-[26vw] font-bold leading-none tracking-tighter text-transparent">
            HIRAN
          </span>
        </div>
      </div>

      {/* ---------- Content ---------- */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 pt-20">
        <Reveal>
          <div className="rounded-3xl border border-white/10 bg-white/3 p-8 backdrop-blur-xl md:p-12">
            <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.25em] text-primary">
                  Got an idea?
                </p>
                <h3 className="mt-2 bg-linear-to-r from-neutral-400 via-white to-neutral-400 bg-clip-text text-3xl font-bold tracking-tight text-transparent md:text-5xl">
                  Let&apos;s build it together.
                </h3>
              </div>

              {contactEmail && (
                <Button
                  size="lg"
                  className="rounded-full px-6 font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110"
                >
                  <Mail />
                   <a href={`mailto:${contactEmail}`}>Say Hello</a>
                </Button>
              )}
            </div>
          </div>
        </Reveal>

        {/* Columns */}
        <div className="mt-16 grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <Reveal delay={0}>
            <a href="#home" className="text-2xl font-bold tracking-tight">
              Hiran<span className="text-primary">.dev</span>
            </a>
            <p className="mt-4 max-w-xs font-light leading-6 text-gray-400">
              Full-Stack Software Developer building modern web apps, mobile apps and
              scalable backend systems.
            </p>
            <p className="mt-5 flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-gray-300">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
              </span>
              Available for new opportunities
            </p>
          </Reveal>

          <Reveal delay={100}>
            <h4 className={headingClass}>Navigate</h4>
            <ul className="mt-5 flex flex-col gap-3">
              {navLinks.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="group flex w-fit items-center gap-2 text-sm text-gray-300 transition-colors hover:text-primary"
                  >
                    <span className="h-px w-0 bg-primary transition-all duration-300 group-hover:w-4" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={200}>
            <h4 className={headingClass}>What I do</h4>
            <ul className="mt-5 flex flex-col gap-3">
              {services.map(({ label, icon: Icon }) => (
                <li
                  key={label}
                  className="flex items-center gap-2.5 text-sm text-gray-300"
                >
                  <Icon className="h-4 w-4 text-primary" />
                  {label}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={300}>
            <h4 className={headingClass}>Connect</h4>
            <ul className="mt-5 flex flex-col gap-3">
              {contacts.map(({ label, value, href, icon: Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="group flex items-center gap-3"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-primary group-hover:bg-primary group-hover:text-white">
                      <Icon className="h-4 w-4" />
                    </span>
                    {label}
                    <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100" />
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Tech marquee */}
        <Reveal delay={150} className="mt-16">
          <p className={`${headingClass} mb-5 text-center`}>Tech I work with</p>
          <div className="marquee overflow-hidden mask-[linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
            <div className="animate-marquee flex w-max">
              {[...stack, ...stack].map((name, i) => {
                const tech = techIcons[name];
                const Icon = tech?.icon;
                return (
                  <span
                    key={`${name}-${i}`}
                    className="mr-4 flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300"
                  >
                    {Icon && (
                      <Icon className="h-4 w-4" style={{ color: tech.color }} />
                    )}
                    {name}
                  </span>
                );
              })}
            </div>
          </div>
        </Reveal>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 py-6 text-sm text-gray-500 sm:flex-row">
          <p>© {year} Hiran Sandakelum. All rights reserved.</p>
          <p className="text-xs">
            Built with Next.js, Tailwind
          </p>
          <a
            href="#home"
            className="group flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs text-gray-400 transition-all duration-300 hover:border-primary hover:text-primary"
          >
            Back to top
            <ArrowUp className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
