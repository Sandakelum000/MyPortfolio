import { Button } from "@/components/ui/button";
import { SquareText, UserRoundPen } from "lucide-react";
import Image from "next/image";
import Reveal from "../reveal";
import { site } from "@/data/site";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative z-10 flex items-center justify-center px-6 pb-12 pt-24 md:min-h-[80svh]"
    >
      <Reveal className="w-full">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-8 md:flex-row md:gap-10">
          {/* Profile */}
          <div className="flex w-full justify-center md:w-5/12 md:shrink-0">
            <div className="profile-float relative w-full max-w-sm rounded-3xl p-0.5">
              <div className="rounded-3xl bg-white/5 p-2">
                <Image
                  src="/images/my_profile.jpeg"
                  alt="Hiran Sandakelum"
                  width={600}
                  height={600}
                  priority
                  className="aspect-square w-full rounded-[22px] border border-white/10 object-cover"
                />
              </div>
            </div>
          </div>

          {/* Introduction */}
          <div className="flex w-full flex-col md:flex-1">
            <p className="text-3xl font-bold text-primary md:text-4xl">
              Hello, I&apos;m
            </p>

            <h1
              className="mt-2 bg-linear-to-r from-neutral-400 via-white to-neutral-400 bg-clip-text text-4xl 
            font-bold tracking-tight text-transparent lg:text-7xl"
            >
              {site.name}
            </h1>

            <p className="mb-4 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.35em]">
              <span className="h-2 w-2 animate-pulse rounded-full bg-gray-400" />
              {site.role}
            </p>

            <p className="mt-3 max-w-xl font-light leading-6 text-gray-300 sm:text-lg">
              {site.heroIntro}
            </p>

            <div className="mt-8 flex flex-col items-stretch gap-4 sm:w-auto sm:flex-row sm:items-center">
              <Button
                size="lg"
                className="rounded-full px-6 py-4 font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110"
              >
                <SquareText />
                <a href="#projects">View Projects</a>
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="rounded-full border-[#48484A] px-6 py-4 font-light transition-all duration-200 hover:-translate-y-0.5 hover:border-primary hover:bg-[#FF6A00]/10 hover:text-primary"
              >
                <UserRoundPen />
                <a href="#contact">Contact Me</a>
              </Button>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
