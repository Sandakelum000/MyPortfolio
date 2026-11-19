type Variant = "aurora" | "grid" | "dots" | "beams";

const beams = [
  { left: "12%", delay: "0s", duration: "9s" },
  { left: "34%", delay: "3s", duration: "11s" },
  { left: "62%", delay: "1.5s", duration: "10s" },
  { left: "86%", delay: "5s", duration: "12s" },
];

export default function SectionBg({ variant }: { variant: Variant }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      {variant === "aurora" && (
        <>
          <div className="bg-blob animate-blob-a -left-24 top-0 h-112 w-md" />
          <div className="bg-blob animate-blob-b -right-24 bottom-0 h-128 w-lg" />
        </>
      )}

      {variant === "grid" && (
        <>
          <div className="bg-grid" />
          <div className="bg-blob animate-blob-a left-1/2 top-0 h-104 w-104 -translate-x-1/2 opacity-60" />
        </>
      )}

      {variant === "dots" && (
        <>
          <div className="bg-dots-wrap">
            <div className="bg-dots" />
          </div>
          <div className="bg-blob animate-blob-b -right-20 top-10 h-96 w-[24rem] opacity-70" />
        </>
      )}

      {variant === "beams" && (
        <>
          <div className="bg-blob animate-blob-a -left-32 top-1/3 h-104 w-104 opacity-50" />
          {beams.map((b) => (
            <span
              key={b.left}
              className="bg-beam"
              style={{ left: b.left, animationDelay: b.delay, animationDuration: b.duration }}
            />
          ))}
        </>
      )}
    </div>
  );
}