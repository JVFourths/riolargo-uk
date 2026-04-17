"use client";

import { useState } from "react";
import { FORMSPREE_ENDPOINT } from "@/lib/endpoints";

type Intent = "preorder" | "notify";

interface WaitlistFormProps {
  productSlug: string;
  productName: string;
  intent: Intent;
}

const COPY: Record<Intent, { idle: string; success: string; submitting: string }> = {
  preorder: {
    idle: "Pre-Order \u2014 We'll Email You",
    success: "Thanks! We'll email you within 24 hours to confirm your order.",
    submitting: "Sending\u2026",
  },
  notify: {
    idle: "Notify Me When Available",
    success: "Thanks! We'll let you know as soon as it lands in the UK.",
    submitting: "Sending\u2026",
  },
};

export function WaitlistForm({ productSlug, productName, intent }: WaitlistFormProps) {
  const [state, setState] = useState<"idle" | "form" | "submitting" | "submitted" | "error">("idle");
  const [email, setEmail] = useState("");
  const copy = COPY[intent];

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("submitting");
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          email,
          product: productName,
          productSlug,
          intent,
          source: "riolargo-uk waitlist",
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setState("submitted");
    } catch {
      setState("error");
    }
  }

  if (state === "submitted") {
    return (
      <div className="mt-6 py-3 text-center text-sm text-accent font-semibold">
        {copy.success}
      </div>
    );
  }

  if (state === "form" || state === "submitting" || state === "error") {
    return (
      <form onSubmit={handleSubmit} className="mt-6 space-y-2">
        <div className="flex gap-2">
          <input
            type="email"
            required
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={state === "submitting"}
            className="flex-1 px-4 py-3 bg-bg border border-border text-text text-sm placeholder:text-text-muted/50 focus:border-accent focus:outline-none transition-colors disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={state === "submitting"}
            className="px-6 py-3 bg-accent text-bg font-semibold text-sm tracking-wide uppercase hover:bg-accent-hover transition-colors duration-200 shrink-0 cursor-pointer disabled:opacity-50 disabled:cursor-wait"
          >
            {state === "submitting" ? copy.submitting : "Send"}
          </button>
        </div>
        {state === "error" && (
          <p className="text-xs text-red-400">
            Couldn't send that. Please email <a className="underline" href={`mailto:orders@riolargo.co.uk?subject=${encodeURIComponent(productName)}`}>orders@riolargo.co.uk</a> directly.
          </p>
        )}
      </form>
    );
  }

  return (
    <button
      onClick={() => setState("form")}
      className={
        intent === "preorder"
          ? "mt-6 w-full py-3 bg-accent text-bg font-semibold text-sm tracking-wide uppercase hover:bg-accent-hover transition-colors duration-200 cursor-pointer"
          : "mt-6 w-full py-3 border-2 border-accent/40 text-accent font-semibold text-sm tracking-wide uppercase hover:border-accent hover:bg-accent/5 transition-all duration-200 cursor-pointer"
      }
    >
      {copy.idle}
    </button>
  );
}
