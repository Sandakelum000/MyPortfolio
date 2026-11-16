"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Lock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth/auth-client";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const form = new FormData(e.currentTarget);

    const { data, error } = await authClient.signIn.email({
      email: String(form.get("email")),
      password: String(form.get("password")),
    });

    setLoading(false);

    if (error) {
      setError("Invalid email or password."); 
      return;
    }

    if ((data as { twoFactorRedirect?: boolean } | null)?.twoFactorRedirect) {
      router.push("/admin/verify");
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-6 text-white">
      <div className="pointer-events-none absolute h-96 w-96 rounded-full bg-primary/20 blur-[120px]" />
      <form
        onSubmit={onSubmit}
        className="relative z-10 flex w-full max-w-sm flex-col gap-5 rounded-3xl border border-white/10 bg-white/3 p-8 backdrop-blur-xl"
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Lock className="h-5 w-5" />
          </span>
          <h1 className="text-2xl font-bold tracking-tight">Admin</h1>
          <p className="text-sm text-gray-400">Sign in to manage your portfolio</p>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" required autoComplete="email"
            className="border-white/10 bg-white/5" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" type="password" required autoComplete="current-password"
            className="border-white/10 bg-white/5" />
        </div>

        {error && <p className="text-sm text-red-400">{error}</p>}

        <Button type="submit" disabled={loading} className="rounded-full font-bold text-white">
          {loading ? <><Loader2 className="animate-spin" /> Signing in...</> : "Sign in"}
        </Button>
      </form>
    </main>
  );
}