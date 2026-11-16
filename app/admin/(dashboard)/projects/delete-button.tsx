"use client";

import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DeleteButton({ action, title }: { action: () => Promise<void>; title: string }) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!confirm(`Delete "${title}"? This cannot be undone.`)) e.preventDefault();
      }}
    >
      <Button type="submit" variant="outline" size="sm"
        className="rounded-full border-red-500/40 text-red-400 hover:bg-red-500/10 hover:text-red-300">
        <Trash2 /> Delete
      </Button>
    </form>
  );
}