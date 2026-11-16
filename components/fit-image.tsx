import Image from "next/image";
import { cn } from "@/lib/utils";

export default function FitImage({
  src,
  alt,
  sizes,
  className,
}: {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
}) {
  return (
    <div className={cn("relative overflow-hidden bg-neutral-900", className)}>
      {/* Blurred copy fills the empty space */}
      <Image
        src={src}
        alt=""
        aria-hidden
        fill
        sizes={sizes}
        className="scale-125 object-cover opacity-40 blur-2xl"
      />
      {/* The real image, never cropped */}
      <Image src={src} alt={alt} fill sizes={sizes} className="object-contain" />
    </div>
  );
}