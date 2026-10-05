"use client";

import { useLayoutEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "@/lib/animations";
import { site } from "@/data/site";

const lines = ["We build", "brands that", "can't be", "ignored."];

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(
      "(prefers-reduced-motion: no-preference)",
      () => {
        // Headline reveal. clearProps removes leftover transforms when it finishes,
        // so the text is rendered normally and cannot jitter afterwards.
        gsap.from("[data-line]", {
          yPercent: 110,
          duration: 1.1,
          stagger: 0.12,
          ease: "power4.out",
          clearProps: "all",
        });
        gsap.from("[data-hero-fade]", {
          opacity: 0,
          y: 24,
          duration: 0.8,
          delay: 0.7,
          stagger: 0.1,
          clearProps: "all",
        });

        // Gentle vertical drift only: no rotation, slower, and promoted to its own layer.
        gsap.to("[data-float]", {
          y: -10,
          duration: 4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          force3D: true,
        });

        // Mouse parallax only on devices with a real pointer.
        if (!window.matchMedia("(pointer: fine)").matches) return;
        const move = (e: MouseEvent) => {
          gsap.to("[data-depth]", {
            x: (e.clientX / window.innerWidth - 0.5) * 30,
            y: (e.clientY / window.innerHeight - 0.5) * 30,
            duration: 1,
            ease: "power2.out",
          });
        };
        window.addEventListener("mousemove", move);
        return () => window.removeEventListener("mousemove", move);
      },
      root,
    );

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={root}
      className="relative flex min-h-svh flex-col justify-start overflow-hidden px-5 pb-10 pt-28 md:justify-end md:px-10 md:pb-16 md:pt-32"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <div
          data-depth
          className="absolute left-1/2 top-[34%] size-[110vw] -translate-x-1/2 -translate-y-1/2 rounded-full border border-line md:left-auto md:right-[-12vw] md:top-24 md:size-[55vw] md:max-w-160 md:translate-x-0 md:translate-y-0"
        />
        <div
          data-float
          className="absolute right-[8vw] top-[22%] size-40 rounded-full bg-accent opacity-25 sm:size-56 md:right-[12vw] md:top-40 md:size-40 md:opacity-100"
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <p data-hero-fade className="mb-5 text-sm text-muted md:mb-6">
          {site.tagline}
        </p>

        <h1 className="h-display text-[clamp(3rem,16vw,5.5rem)] font-extrabold md:text-[7.5rem] lg:text-[9rem]">
          {lines.map((line) => (
            <span key={line} className="block overflow-hidden pb-[0.08em]">
              <span data-line className="block">
                {line}
              </span>
            </span>
          ))}
        </h1>

        <div className="mt-8 flex flex-col gap-8 md:mt-10 md:flex-row md:items-end md:justify-between">
          <p
            data-hero-fade
            className="max-w-md text-base text-muted md:text-lg"
          >
            {site.description}
          </p>

          <div data-hero-fade className="flex flex-col gap-3 sm:flex-row">
            <a
              href={site.cta.href}
              className="group inline-flex items-center justify-center gap-2 rounded-sm bg-accent px-6 py-3.5 font-semibold text-ink"
            >
              {site.cta.label}
              <ArrowUpRight
                className="size-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                aria-hidden
              />
            </a>
            <a
              href="#services"
              className="inline-flex items-center justify-center rounded-sm border border-line px-6 py-3.5 font-semibold transition-colors hover:border-paper"
            >
              See services
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
