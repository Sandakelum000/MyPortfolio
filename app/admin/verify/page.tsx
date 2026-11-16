"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2, MailCheck } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth/auth-client";

export default function VerifyPage() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const sentOnce = useRef(false);

  async function sendCode() {
    setError("");
    setInfo("");
    const { error } = await authClient.twoFactor.sendOtp();
    if (error) {
      setError("Could not send a code. Your sign-in may have expired, so please sign in again.");
      return;
    }
    setInfo("We sent a 6-digit code to your email.");
    setCooldown(30);
  }

  useEffect(() => {
    if (sentOnce.current) return;
    sentOnce.current = true;
    void sendCode();
  }, []);

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [cooldown]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const { error } = await authClient.twoFactor.verifyOtp({ code });
    setLoading(false);
    if (error) {
      setError("Invalid or expired code.");
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
            <MailCheck className="h-5 w-5" />
          </span>
          <h1 className="text-2xl font-bold tracking-tight">Check your email</h1>
          <p className="text-sm text-gray-400">Enter the code to finish signing in</p>
        </div>

        <Input
          value={code}
          onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
          inputMode="numeric"
          autoComplete="one-time-code"
          autoFocus
          placeholder="000000"
          aria-label="Verification code"
          className="h-14 border-white/10 bg-white/5 text-center text-2xl tracking-[0.5em]"
        />

        {info && !error && <p className="text-center text-sm text-gray-400">{info}</p>}
        {error && <p className="text-center text-sm text-red-400">{error}</p>}

        <Button
          type="submit"
          disabled={loading || code.length !== 6}
          className="rounded-full font-bold text-white"
        >
          {loading ? <><Loader2 className="animate-spin" /> Verifying...</> : "Verify and sign in"}
        </Button>

        <div className="flex items-center justify-between text-xs text-gray-500">
          <button
            type="button"
            onClick={sendCode}
            disabled={cooldown > 0}
            className="transition hover:text-primary disabled:cursor-not-allowed disabled:opacity-50"
          >
            {cooldown > 0 ? `Resend code in ${cooldown}s` : "Resend code"}
          </button>
          <Link href="/admin/login" className="transition hover:text-primary">
            Back to sign in
          </Link>
        </div>
      </form>
    </main>
  );
}