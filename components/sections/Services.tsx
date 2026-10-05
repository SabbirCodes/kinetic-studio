"use client";
import { useRef } from "react";
import { services } from "@/data/services";
import { useReveal } from "@/lib/animations";

export default function Services() {
  const root = useRef<HTMLElement>(null);
  useReveal(root);
  return (
    <section id="services" ref={root} className="px-5 py-28 md:px-10">
      <div className="mx-auto max-w-7xl">
        <h2
          data-reveal
          className="h-display max-w-3xl text-5xl font-extrabold md:text-8xl"
        >
          Everything your growth needs.
        </h2>
        <ul className="mt-16 grid border-l border-t border-line sm:grid-cols-2 lg:grid-cols-3">
          {services.map(({ title, description, icon: Icon }, i) => (
            <li
              key={title}
              data-reveal
              className="group relative overflow-hidden border-b border-r border-line p-8 transition-colors duration-500 hover:bg-accent hover:text-ink"
            >
              <span
                className="h-display absolute -right-2 -top-4 text-8xl text-line transition-colors group-hover:text-ink/15"
                aria-hidden
              >
                {i + 1}
              </span>
              <Icon
                className="size-7 text-accent transition-colors group-hover:text-ink"
                aria-hidden
              />
              <h3 className="mt-16 font-display text-2xl font-bold">{title}</h3>
              <p className="mt-3 text-muted transition-colors group-hover:text-ink/80">
                {description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
