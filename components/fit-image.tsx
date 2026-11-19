"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function FitImage({
  src,
  alt,
  sizes,
  className,
  priority = false,
}: {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  priority?: boolean;
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={cn("relative overflow-hidden bg-neutral-900", className)}>
      <div
        aria-hidden
        className={cn(
          "absolute inset-0 overflow-hidden bg-white/5 transition-opacity duration-500",
          loaded && "opacity-0",
        )}
      >
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.6s_infinite] bg-linear-to-r from-transparent via-white/10 to-transparent motion-reduce:animate-none" />
      </div>

      <Image
        src={src}
        alt=""
        aria-hidden
        fill
        sizes={sizes}
        className={cn(
          "scale-125 object-cover blur-2xl transition-opacity duration-700",
          loaded ? "opacity-40" : "opacity-0",
        )}
      />

      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
        className={cn(
          "object-contain transition-opacity duration-500",
          loaded ? "opacity-100" : "opacity-0",
        )}
      />
    </div>
  );
}
