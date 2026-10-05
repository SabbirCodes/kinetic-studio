"use client";

import { useLayoutEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/content";
import { gsap } from "@/lib/animations";
import ProjectArt from "@/components/ui/ProjectArt";
import Link from "next/link";
import { slugify } from "@/lib/utils";

export default function Work() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(
      "(prefers-reduced-motion: no-preference)",
      () => {
        // Section heading
        gsap.from("[data-work-heading]", {
          y: 40,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "[data-work-heading]",
            start: "top 88%",
            once: true,
          },
        });

        // One timeline per project: image wipes in, then the text follows.
        gsap.utils.toArray<HTMLElement>("[data-project]").forEach((project) => {
          const frame = project.querySelector<HTMLElement>("[data-frame]");
          const layer = project.querySelector<HTMLElement>("[data-layer]");
          const texts = project.querySelectorAll("[data-text]");
          if (!frame || !layer) return;

          gsap
            .timeline({
              defaults: { ease: "power3.out" },
              scrollTrigger: { trigger: project, start: "top 75%", once: true },
            })
            .fromTo(
              frame,
              { clipPath: "inset(0 100% 0 0)" },
              {
                clipPath: "inset(0 0% 0 0)",
                duration: 1.3,
                ease: "power4.inOut",
              },
            )
            .from(layer, { scale: 1.25, duration: 1.6 }, "<")
            .from(
              texts,
              { y: 28, opacity: 0, duration: 0.9, stagger: 0.1 },
              "<0.5",
            );
        });
      },
      root,
    );

    // Parallax is desktop only: on phones it costs scroll performance and adds little.
    mm.add(
      "(prefers-reduced-motion: no-preference) and (min-width: 768px)",
      () => {
        gsap.utils.toArray<HTMLElement>("[data-layer]").forEach((layer) => {
          gsap.fromTo(
            layer,
            { yPercent: -6 },
            {
              yPercent: 6,
              ease: "none",
              scrollTrigger: {
                trigger: layer.parentElement,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.8,
                invalidateOnRefresh: true,
              },
            },
          );
        });
      },
      root,
    );

    return () => mm.revert();
  }, []);

  return (
    <section
      id="work"
      ref={root}
      aria-labelledby="work-heading"
      className="px-5 py-28 md:px-10"
    >
      <div className="mx-auto max-w-7xl">
        <h2
          id="work-heading"
          data-work-heading
          className="h-display text-5xl font-extrabold md:text-8xl"
        >
          Selected work
        </h2>

        <div className="mt-16 space-y-24 md:space-y-36">
          {projects.map((project, i) => (
            <article
              key={project.title}
              data-project
              className={`grid items-center gap-8 md:grid-cols-12 md:gap-10 ${
                i % 2 ? "md:[&>div:first-child]:order-2" : ""
              }`}
            >
              <div
                data-frame
                data-cursor
                className="group relative aspect-4/3 overflow-hidden bg-surface md:col-span-7"
              >
                <div
                  data-layer
                  className="absolute inset-x-0 inset-y-[-8%] will-change-transform"
                >
                  <div className="size-full transition-transform duration-700 ease-out group-hover:scale-105">
                    <ProjectArt i={i} label={project.title} />
                  </div>
                </div>
              </div>

              <div className="md:col-span-5">
                <p data-text className="text-sm text-muted">
                  {project.category} · {project.year}
                </p>
                <h3
                  data-text
                  className="h-display mt-3 text-4xl font-extrabold md:text-6xl"
                >
                  {project.title}
                </h3>
                <p data-text className="mt-5 max-w-md text-muted">
                  {project.description}
                </p>
                <Link
                  data-text
                  href={`/work/${slugify(project.title)}`}
                  className="group/link mt-8 inline-flex items-center gap-2 border-b border-accent pb-1 font-semibold"
                >
                  View case study
                  <ArrowUpRight
                    className="size-4 transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                    aria-hidden
                  />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
