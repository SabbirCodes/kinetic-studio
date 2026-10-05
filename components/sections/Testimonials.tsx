"use client";

import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { testimonials } from "@/data/content";
import { gsap } from "@/lib/animations";

const GAP = 32;
const EDGE_RESISTANCE = 0.35;
const THROW = 250;

const pad = (n: number) => String(n).padStart(2, "0");

export default function Testimonials() {
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLUListElement>(null);
  const setX = useRef<((v: number) => void) | null>(null);

  // Mutable carousel state lives in refs, so dragging never triggers a React render.
  const carousel = useRef({ index: 0, step: 0, min: 0, maxIndex: 0 });
  const drag = useRef({
    active: false,
    startPointer: 0,
    startX: 0,
    lastPointer: 0,
    lastTime: 0,
    velocity: 0,
  });

  const [index, setIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(0);

  const goTo = useCallback((target: number, instant = false) => {
    const c = carousel.current;
    const next = Math.min(Math.max(target, 0), c.maxIndex);
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    c.index = next;
    setIndex(next);
    gsap.to(track.current, {
      x: Math.max(-next * c.step, c.min),
      duration: instant || reduce ? 0 : 0.8,
      ease: "power3.out",
      overwrite: true,
    });
  }, []);

  // Measure on mount and whenever the container resizes.
  useLayoutEffect(() => {
    const v = viewport.current;
    const t = track.current;
    if (!v || !t) return;

    setX.current = gsap.quickSetter(t, "x", "px") as (v: number) => void;

    const measure = () => {
      const card = t.querySelector("li");
      if (!card) return;
      const c = carousel.current;
      c.step = card.offsetWidth + GAP;
      c.min = -Math.max(0, t.scrollWidth - v.clientWidth);
      c.maxIndex = Math.max(0, Math.ceil(-c.min / c.step - 0.001));
      setMaxIndex(c.maxIndex);
      goTo(c.index, true);
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(v);

    return () => {
      observer.disconnect();
      gsap.killTweensOf(t);
    };
  }, [goTo]);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    gsap.killTweensOf(track.current);
    drag.current = {
      active: true,
      startPointer: e.clientX,
      startX: gsap.getProperty(track.current, "x") as number,
      lastPointer: e.clientX,
      lastTime: performance.now(),
      velocity: 0,
    };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d.active) return;

    const raw = d.startX + (e.clientX - d.startPointer);
    const min = carousel.current.min;
    // Rubber-band resistance past either end
    const x =
      raw > 0
        ? raw * EDGE_RESISTANCE
        : raw < min
          ? min + (raw - min) * EDGE_RESISTANCE
          : raw;
    setX.current?.(x);

    // Smoothed velocity in px/ms
    const now = performance.now();
    const dt = now - d.lastTime;
    if (dt > 0)
      d.velocity = d.velocity * 0.6 + ((e.clientX - d.lastPointer) / dt) * 0.4;
    d.lastPointer = e.clientX;
    d.lastTime = now;
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d.active) return;
    d.active = false;
    e.currentTarget.releasePointerCapture(e.pointerId);

    const x = gsap.getProperty(track.current, "x") as number;
    const projected = x + d.velocity * THROW;
    goTo(Math.round(-projected / carousel.current.step));
  };

  const arrow =
    "grid size-12 place-items-center rounded-full border border-line transition-colors hover:border-accent hover:bg-accent hover:text-ink disabled:pointer-events-none disabled:opacity-30";

  const visible = testimonials.length - maxIndex; // cards in view at this breakpoint

  return (
    <section
      aria-labelledby="testimonials-heading"
      className="px-5 py-28 md:px-10"
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex items-end justify-between gap-6">
          <h2
            id="testimonials-heading"
            className="h-display text-5xl font-extrabold md:text-8xl"
          >
            Kind words
          </h2>
          <div className="flex items-center gap-5">
            <p
              aria-live="polite"
              className="hidden font-display text-lg tabular-nums text-muted sm:block"
            >
              <span className="text-paper">{pad(index + visible)}</span> /{" "}
              {pad(testimonials.length)}
            </p>
            <div className="flex gap-2">
              <button
                aria-label="Previous testimonial"
                disabled={index === 0}
                onClick={() => goTo(index - 1)}
                className={arrow}
              >
                <ArrowLeft className="size-5" aria-hidden />
              </button>
              <button
                aria-label="Next testimonial"
                disabled={index === maxIndex}
                onClick={() => goTo(index + 1)}
                className={arrow}
              >
                <ArrowRight className="size-5" aria-hidden />
              </button>
            </div>
          </div>
        </div>

        <div
          ref={viewport}
          data-cursor
          tabIndex={0}
          role="group"
          aria-roledescription="carousel"
          aria-label="Client testimonials"
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") goTo(index + 1);
            if (e.key === "ArrowLeft") goTo(index - 1);
          }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          className="mt-16 cursor-grab touch-pan-y select-none overflow-hidden active:cursor-grabbing"
        >
          <ul ref={track} className="flex gap-8 will-change-transform">
            {testimonials.map((t, i) => (
              <li
                key={t.name}
                aria-roledescription="slide"
                className="group relative flex shrink-0 basis-full flex-col justify-between border-t border-line pt-8 md:basis-[calc(50%-1rem)]"
              >
                <span
                  aria-hidden
                  className="absolute -top-px left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-700 ease-out group-hover:scale-x-100"
                />
                <span aria-hidden className="font-display text-sm text-accent">
                  {pad(i + 1)}
                </span>
                <blockquote className="mt-6 font-display text-3xl leading-[1.15] tracking-tight md:text-4xl">
                  {t.quote}
                </blockquote>
                <footer className="mt-12 flex items-center gap-4">
                  <span
                    aria-hidden
                    className="grid size-11 shrink-0 place-items-center rounded-full border border-line font-display text-sm font-bold transition-colors group-hover:border-accent group-hover:bg-accent group-hover:text-ink"
                  >
                    {t.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                  <p>
                    <span className="block font-semibold">{t.name}</span>
                    <span className="text-sm text-muted">
                      {t.role}, {t.company}
                    </span>
                  </p>
                </footer>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
