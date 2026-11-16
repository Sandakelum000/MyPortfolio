"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import AnimatedButton from "./ui/animated-button";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

function scrollToSection(href: string) {
  if (href === "#home") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    history.replaceState(null, "", window.location.pathname);
  } else {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    history.replaceState(null, "", href);
  }
}

export default function Navbar() {
  const [active, setActive] = useState(navLinks[0].href);
  const [beam, setBeam] = useState({
    left: 0,
    width: 0,
    visible: false,
    animate: false,
  });

  const headerRef = useRef<HTMLElement>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  /* ---- Which section is on screen ---- */
  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;

      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 4;

      let current = navLinks[0].href;

      if (atBottom) {
        current = navLinks[navLinks.length - 1].href;
      } else {
        for (const { href } of navLinks) {
          const el = document.querySelector(href);
          if (
            el &&
            el.getBoundingClientRect().top <= window.innerHeight * 0.4
          ) {
            current = href;
          }
        }
      }

      setActive(current);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  /* ---- indicator under the active link ---- */
  const measure = useCallback(() => {
    const header = headerRef.current;
    const link = linkRefs.current[active];
    if (!header || !link) return;

    const h = header.getBoundingClientRect();
    const l = link.getBoundingClientRect();

    if (l.width === 0) {
      setBeam((b) => ({ ...b, visible: false }));
      return;
    }

    setBeam((b) => ({
      left: l.left - h.left,
      width: l.width,
      visible: true,
      animate: b.visible,
    }));
  }, [active]);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    document.fonts?.ready.then(measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-xl"
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("#home");
          }}
          className="flex items-center gap-2.5"
        >
          <Image
            src="/images/logo.png"
            alt="Hiran Sandakelum logo"
            width={66}
            height={66}
            priority
            className="h-15 w-auto"
          />
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => {
            const isActive = active === link.href;
            return (
              <a
                key={link.href}
                href={link.href}
                ref={(el) => {
                  linkRefs.current[link.href] = el;
                }}
                aria-current={isActive ? "location" : undefined}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                className={cn(
                  "px-3 py-2 text-sm transition-colors duration-300",
                  isActive ? "text-white" : "text-gray-400 hover:text-white",
                )}
              >
                {link.label}
              </a>
            );
          })}
        </div>

        <AnimatedButton as="a" href="#contact" whileTap={{ scale: 0.94 }}>
          Contact Me
          <ArrowUpRight className="h-4 w-3" />
        </AnimatedButton>
      </nav>

      {/* Active indicator */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute -bottom-px h-0.5",
          beam.animate
            ? "transition-[left,width,opacity] duration-500 ease-out motion-reduce:transition-none"
            : "transition-none",
        )}
        style={{
          left: beam.left,
          width: beam.width,
          opacity: beam.visible ? 1 : 0,
        }}
      >
        <span className="absolute inset-x-3 inset-y-0 rounded-full bg-primary shadow-[0_0_6px_1px] shadow-primary/50" />
      </div>
    </header>
  );
}
