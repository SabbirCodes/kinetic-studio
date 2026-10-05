"use client";
import { useLayoutEffect, useRef } from "react";
import { stats } from "@/data/content";
import { gsap } from "@/lib/animations";

export default function Results() {
  const root = useRef<HTMLElement>(null);
  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(
      "(prefers-reduced-motion: no-preference)",
      () => {
        gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
          const end = Number(el.dataset.count);
          const o = { v: 0 };
          el.textContent = "0";
          gsap.to(o, {
            v: end,
            duration: 2,
            ease: "power2.out",
            onUpdate: () => {
              el.textContent = String(Math.round(o.v));
            },
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
          });
        });
      },
      root,
    );
    return () => mm.revert();
  }, []);
  return (
    <section ref={root} className="bg-accent px-5 py-24 text-ink md:px-10">
      <dl className="mx-auto grid max-w-7xl gap-12 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label}>
            <dt className="order-2 mt-2 font-semibold">{s.label}</dt>
            <dd className="h-display text-7xl font-extrabold md:text-8xl">
              <span data-count={s.value}>{s.value}</span>
              {s.suffix}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
