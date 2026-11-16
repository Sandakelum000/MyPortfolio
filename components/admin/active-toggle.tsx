"use client";

import { startTransition, useOptimistic } from "react";
import { cn } from "@/lib/utils";

export default function ActiveToggle({
  active,
  action,
  label,
}: {
  active: boolean;
  action: (next: boolean) => Promise<void>;
  label: string;
}) {
  const [on, setOn] = useOptimistic(active);

  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={`${on ? "Hide" : "Show"} ${label}`}
      onClick={() =>
        startTransition(async () => {
          setOn(!on); // flips instantly, then the server catches up
          await action(!on);
        })
      }
      className={cn(
        "relative h-6 w-11 shrink-0 rounded-full transition-colors",
        on ? "bg-primary" : "bg-white/15"
      )}
    >
      <span
        className={cn(
          "absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white transition-transform",
          on && "translate-x-5"
        )}
      />
    </button>
  );
}