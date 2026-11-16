"use client";

import { useState } from "react";
import { ArrowUpRight, CheckCircle2, Loader2, Mail, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { contacts } from "@/lib/contacts";
import Reveal from "../reveal";

type Status = "idle" | "sending" | "sent" | "error";

const fieldClass =
  "border-white/10 bg-white/5 text-white placeholder:text-gray-500 focus-visible:border-primary focus-visible:ring-primary/30";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget; 
    const data = Object.fromEntries(new FormData(form));
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="relative z-10 overflow-hidden px-6 py-24">
      {/* Glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-[120px]" />

      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-medium uppercase tracking-[0.25em] text-primary">
          Contact
        </p>

        <Reveal>
          <div className="mt-2 grid gap-12 lg:grid-cols-2">

            <div className="flex flex-col">
              <h2 className="bg-linear-to-r from-neutral-400 via-white to-neutral-400 bg-clip-text text-4xl font-bold tracking-tight text-transparent md:text-6xl">
                Let&apos;s build something great together
              </h2>

              <p className="mt-5 max-w-md font-light leading-7 text-gray-300 sm:text-lg">
                Have a project, an opportunity, or just want to say hi? My inbox
                is always open.
              </p>

              <p className="mt-6 flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-gray-300">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                </span>
                Available for new opportunities
              </p>

              <div className="mt-10 flex flex-col gap-3">
                {contacts.map(({ label, value, href, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/3 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-[0_0_40px_-12px] hover:shadow-primary/40"
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="flex-1">
                      <span className="block text-xs uppercase tracking-widest text-gray-500">
                        {label}
                      </span>
                      <span className="block text-sm text-gray-200">
                        {value}
                      </span>
                    </span>
                    <ArrowUpRight className="h-5 w-5 text-gray-500 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                  </a>
                ))}
              </div>
            </div>

            {/* contact form */}
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-5 rounded-3xl border border-white/10 bg-white/3 p-6 backdrop-blur-xl sm:p-8"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="grid gap-3">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    required
                    placeholder="Your name"
                    className={fieldClass}
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="you@email.com"
                    className={fieldClass}
                  />
                </div>
              </div>

              <div className="grid gap-3">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  name="subject"
                  required
                  maxLength={120}
                  placeholder="What's this about?"
                  className={fieldClass}
                />
              </div>

              <div className="flex flex-1 flex-col gap-4">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  placeholder="Tell me about your project..."
                  className={cn(
                    fieldClass,
                    "min-h-44 flex-1 resize-none field-sizing-fixed",
                  )}
                />
              </div>

              {/* Honeypot: bot protection */}
              <input
                type="text"
                name="company"
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
              />

              <Button
                type="submit"
                size="lg"
                disabled={status === "sending"}
                className="mt-auto rounded-full font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110"
              >
                {status === "sending" ? (
                  <>
                    <Loader2 className="animate-spin" /> Sending...
                  </>
                ) : (
                  <>
                    <Send /> Send Message
                  </>
                )}
              </Button>

              {status === "sent" && (
                <p className="flex items-center gap-2 text-sm text-green-400">
                  <CheckCircle2 className="h-4 w-4" /> Thanks! Your message was
                  sent.
                </p>
              )}
              {status === "error" && (
                <p className="text-sm text-red-400">
                  Something went wrong. Please try again or email me directly.
                </p>
              )}
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
