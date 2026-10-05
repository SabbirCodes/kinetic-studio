"use client";
import { useRef, type ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "@/lib/animations";

export default function MagneticButton({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const move = (e: React.MouseEvent) => {
    const r = ref.current!.getBoundingClientRect();
    gsap.to(ref.current, {
      x: (e.clientX - r.left - r.width / 2) * 0.3,
      y: (e.clientY - r.top - r.height / 2) * 0.3,
      duration: 0.4,
    });
  };
  const leave = () => {
    gsap.to(ref.current, {
      x: 0,
      y: 0,
      duration: 0.7,
      ease: "elastic.out(1,0.4)",
    });
  };
  return (
    <a
      ref={ref}
      href={href}
      onMouseMove={move}
      onMouseLeave={leave}
      className="group inline-flex items-center gap-3 rounded-full bg-ink px-10 py-6 font-display text-xl font-bold text-paper"
    >
      {children}
      <ArrowUpRight
        className="size-5 transition-transform group-hover:rotate-45"
        aria-hidden
      />
    </a>
  );
}
