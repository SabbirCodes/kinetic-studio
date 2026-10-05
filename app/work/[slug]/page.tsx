import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Reveal from "@/components/ui/Reveal";
import ProjectArt from "@/components/ui/ProjectArt";
import { projects } from "@/data/content";
import { caseStudies } from "@/data/case-studies";
import { site } from "@/data/site";
import { slugify } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: slugify(p.title) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => slugify(p.title) === slug);
  if (!project) return {};
  return {
    title: `${project.title} | ${site.name}`,
    description: project.description,
    openGraph: { title: `${project.title} | ${site.name}`, description: project.description, type: "article" },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const index = projects.findIndex((p) => slugify(p.title) === slug);
  const study = caseStudies[slug];
  if (index === -1 || !study) notFound();

  const project = projects[index];
  const next = projects[(index + 1) % projects.length];

  const meta = [
    { label: "Client", value: study.client },
    { label: "Services", value: study.services.join(", ") },
    { label: "Timeline", value: study.duration },
    { label: "Year", value: project.year },
  ];

  return (
    <>
      <Navbar />
      <main>
        <Reveal className="px-5 pb-28 pt-32 md:px-10 md:pt-40">
          <div className="mx-auto max-w-7xl">
            <Link
              href="/#work"
              data-reveal
              className="group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-paper"
            >
              <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" aria-hidden />
              All work
            </Link>

            <p data-reveal className="mt-10 text-sm text-muted">
              {project.category}
            </p>
            <h1 data-reveal className="h-display mt-4 text-[clamp(3rem,13vw,5.5rem)] font-extrabold md:text-[8rem]">
              {project.title}
            </h1>
            <p data-reveal className="mt-8 max-w-2xl text-lg text-muted md:text-xl">
              {project.description}
            </p>

            <dl data-reveal className="mt-14 grid gap-8 border-t border-line pt-8 sm:grid-cols-2 lg:grid-cols-4">
              {meta.map((item) => (
                <div key={item.label}>
                  <dt className="text-sm text-muted">{item.label}</dt>
                  <dd className="mt-2 font-display text-lg font-bold">{item.value}</dd>
                </div>
              ))}
            </dl>

            <figure data-reveal className="mt-16 aspect-4/3 overflow-hidden bg-surface md:aspect-video">
              <ProjectArt i={index} label={project.title} />
            </figure>

            <div className="mt-24 grid gap-16 md:mt-32 md:grid-cols-2 md:gap-20">
              <section data-reveal aria-labelledby="challenge-heading">
                <h2 id="challenge-heading" className="font-display text-sm text-accent">
                  The challenge
                </h2>
                <p className="mt-6 font-display text-2xl leading-snug md:text-3xl">{study.challenge}</p>
              </section>
              <section data-reveal aria-labelledby="solution-heading">
                <h2 id="solution-heading" className="font-display text-sm text-accent">
                  What we did
                </h2>
                <p className="mt-6 font-display text-2xl leading-snug md:text-3xl">{study.solution}</p>
              </section>
            </div>

            <section
              data-reveal
              aria-labelledby="results-heading"
              className="mt-24 bg-accent px-6 py-14 text-ink md:mt-32 md:px-12 md:py-20"
            >
              <h2 id="results-heading" className="font-display text-sm font-bold">
                The results
              </h2>
              <dl className="mt-10 grid gap-10 md:grid-cols-3">
                {study.results.map((r) => (
                  <div key={r.label}>
                    <dd className="h-display text-6xl font-extrabold md:text-8xl">{r.value}</dd>
                    <dt className="mt-3 font-semibold">{r.label}</dt>
                  </div>
                ))}
              </dl>
            </section>

            <Link
              data-reveal
              href={`/work/${slugify(next.title)}`}
              className="group mt-24 block border-t border-line pt-10 md:mt-32"
            >
              <span className="text-sm text-muted">Next project</span>
              <span className="mt-4 flex items-center justify-between gap-6">
                <span className="h-display text-5xl font-extrabold transition-colors group-hover:text-accent md:text-8xl">
                  {next.title}
                </span>
                <ArrowUpRight
                  className="size-10 shrink-0 text-accent transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 md:size-16"
                  aria-hidden
                />
              </span>
            </Link>
          </div>
        </Reveal>
      </main>
      <Footer />
    </>
  );
}