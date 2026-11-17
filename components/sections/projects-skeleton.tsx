const bone = "animate-pulse rounded-md bg-white/8";

function CardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/3">
      <div className={`${bone} aspect-video rounded-none`} />
      <div className="flex flex-col gap-3 p-5">
        <div className={`${bone} h-6 w-3/4`} />
        <div className={`${bone} h-4 w-full`} />
        <div className={`${bone} h-4 w-2/3`} />
        <div className="flex gap-2 pt-1">
          <div className={`${bone} h-6 w-16 rounded-full`} />
          <div className={`${bone} h-6 w-20 rounded-full`} />
          <div className={`${bone} h-6 w-14 rounded-full`} />
        </div>
        <div className={`${bone} mt-4 h-4 w-24`} />
      </div>
    </div>
  );
}

export default function ProjectsSkeleton() {
  return (
    <section
      id="projects"
      aria-busy="true"
      aria-label="Loading projects"
      className="relative z-10 px-6 py-24"
    >
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-medium uppercase tracking-[0.25em] text-primary">
          Portfolio
        </p>
        <h2 className="mt-2 bg-linear-to-r from-neutral-400 via-white to-neutral-400 bg-clip-text text-4xl font-bold tracking-tight text-transparent md:text-5xl">
          My Projects
        </h2>

        <div className="mt-8 flex gap-2">
          {[64, 84, 76, 88].map((w) => (
            <div key={w} className={`${bone} h-8 rounded-full`} style={{ width: w }} />
          ))}
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
      </div>
    </section>
  );
}