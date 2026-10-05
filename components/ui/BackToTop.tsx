"use client";
import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const on = () =>
      setP(
        window.scrollY /
          (document.documentElement.scrollHeight - window.innerHeight),
      );
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <button
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed bottom-6 right-6 z-50 grid size-12 place-items-center rounded-full bg-ink transition-opacity ${p > 0.05 ? "opacity-100" : "pointer-events-none opacity-0"}`}
    >
      <svg
        className="absolute inset-0 -rotate-90"
        viewBox="0 0 48 48"
        aria-hidden
      >
        <circle
          cx="24"
          cy="24"
          r="22"
          fill="none"
          stroke="var(--color-line)"
          strokeWidth="2"
        />
        <circle
          cx="24"
          cy="24"
          r="22"
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth="2"
          strokeDasharray={138.2}
          strokeDashoffset={138.2 * (1 - p)}
        />
      </svg>
      <ArrowUp className="size-4 text-accent" />
    </button>
  );
}
