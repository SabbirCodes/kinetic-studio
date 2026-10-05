"use client";

import { useLayoutEffect, useRef } from "react";
import { process as steps } from "@/data/content";
import { gsap, useReveal } from "@/lib/animations";

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLOListElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);

  useReveal(sectionRef);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(
      "(prefers-reduced-motion: no-preference)",
      () => {
        gsap.fromTo(
          progressRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            transformOrigin: "top",
            scrollTrigger: {
              trigger: listRef.current,
              start: "top 65%",
              end: "bottom 75%",
              scrub: 1.2,
            },
          },
        );

        // One timeline per step: marker pops in, the number counts up, then the text follows.
        gsap.utils.toArray<HTMLElement>("[data-step]").forEach((step) => {
          const marker = step.querySelector<HTMLElement>("[data-marker]");
          const number = step.querySelector<HTMLElement>("[data-count]");
          const content = step.querySelector<HTMLElement>("[data-content]");
          if (!marker || !number || !content) return;

          const counter = { value: 0 };
          const end = Number(number.dataset.count);
          number.textContent = "0";

          gsap.set(marker, { scale: 0.6, opacity: 0 });
          gsap.set(content, { y: 32, opacity: 0 });

          gsap
            .timeline({
              defaults: { ease: "power3.out" },
              scrollTrigger: { trigger: step, start: "top 80%", once: true },
            })
            .to(marker, { scale: 1, opacity: 1, duration: 0.8 })
            .to(
              counter,
              {
                value: end,
                duration: 1.8,
                ease: "power2.inOut",
                onUpdate: () => {
                  number.textContent = String(Math.round(counter.value));
                },
              },
              "<0.1",
            )
            .to(content, { y: 0, opacity: 1, duration: 1.1 }, "<0.35");
        });
      },
      sectionRef,
    );

    return () => mm.revert();
  }, []);

  return (
    <section
      id="process"
      ref={sectionRef}
      aria-labelledby="process-heading"
      className="px-5 py-28 md:px-10"
    >
      <div className="mx-auto max-w-5xl">
        <h2
          id="process-heading"
          data-reveal
          className="h-display text-5xl font-extrabold md:text-8xl"
        >
          How we work
        </h2>

        <ol ref={listRef} className="relative mt-16 pl-12 md:pl-24">
          {/* Track and animated progress fill, centred on the step markers */}
          <span
            aria-hidden
            className="absolute left-3.5 top-0 h-full w-px -translate-x-1/2 bg-line md:left-4.5"
          >
            <span ref={progressRef} className="block size-full bg-accent" />
          </span>

          {steps.map((step, index) => (
            <li
              key={step.title}
              data-step
              className="relative pb-20 last:pb-0 md:pb-28"
            >
              <span
                aria-hidden
                data-marker
                className="absolute -left-12 top-1 grid size-7 place-items-center rounded-full border border-accent bg-ink text-xs tabular-nums text-accent md:-left-24 md:size-9 md:text-sm"
              >
                <span data-count={index + 1}>{index + 1}</span>
              </span>
              <div data-content>
                <h3 className="font-display text-3xl font-bold md:text-5xl">
                  {step.title}
                </h3>
                <p className="mt-3 max-w-lg text-muted">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
