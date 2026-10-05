"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/animations";

export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches)
      return;
    const x = gsap.quickTo(dot.current, "x", { duration: 0.25 });
    const y = gsap.quickTo(dot.current, "y", { duration: 0.25 });
    const move = (e: MouseEvent) => {
      x(e.clientX);
      y(e.clientY);
      const hot = (e.target as HTMLElement).closest("a,button,[data-cursor]");
      gsap.to(dot.current, { scale: hot ? 3.5 : 1, duration: 0.3 });
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return (
    <div
      ref={dot}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-100 -ml-2 -mt-2 size-4 rounded-full bg-accent mix-blend-difference max-md:hidden pointer-coarse:hidden"
    />
  );
}
