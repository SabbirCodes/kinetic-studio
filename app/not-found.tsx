import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Reveal from "@/components/ui/Reveal";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: `Page not found | ${site.name}`,
  description: "The page you are looking for does not exist.",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main>
        <Reveal className="relative flex min-h-svh flex-col justify-center overflow-hidden px-5 pb-16 pt-28 md:px-10">
          {/* Decorative ring, same language as the hero */}
          <div
            aria-hidden
            className="pointer-events-none absolute right-[-30vw] top-1/2 size-[90vw] -translate-y-1/2 rounded-full border border-line md:right-[-10vw] md:size-[55vw] md:max-w-160"
          />

          <div className="relative mx-auto w-full max-w-7xl">
            <p data-reveal className="text-sm text-muted">
              Error 404
            </p>

            {/* 4, a lime circle as the zero, 4 */}
            <h1
              data-reveal
              aria-label="404"
              className="h-display mt-4 flex items-center gap-[0.04em] text-[clamp(7rem,32vw,14rem)] font-extrabold md:text-[16rem]"
            >
              <span aria-hidden>4</span>
              <span
                aria-hidden
                className="inline-block size-[0.62em] shrink-0 rounded-full bg-accent"
              />
              <span aria-hidden>4</span>
            </h1>

            <p
              data-reveal
              className="mt-8 max-w-md font-display text-3xl font-bold leading-tight md:text-4xl"
            >
              This page wandered off.
            </p>
            <p data-reveal className="mt-4 max-w-md text-muted">
              The link may be broken, or the page may have moved. Let&apos;s get
              you back on track.
            </p>

            <div data-reveal className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/"
                className="group inline-flex items-center justify-center gap-2 rounded-sm bg-accent px-6 py-3.5 font-semibold text-ink"
              >
                <ArrowLeft
                  className="size-4 transition-transform group-hover:-translate-x-1"
                  aria-hidden
                />
                Back to home
              </Link>
              <Link
                href="/#work"
                className="group inline-flex items-center justify-center gap-2 rounded-sm border border-line px-6 py-3.5 font-semibold transition-colors hover:border-paper"
              >
                See our work
                <ArrowUpRight
                  className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden
                />
              </Link>
            </div>
          </div>
        </Reveal>
      </main>
      <Footer />
    </>
  );
}
