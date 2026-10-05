import MagneticButton from "@/components/ui/MagneticButton";

export default function CTA() {
  return (
    <section className="relative overflow-hidden bg-accent px-5 py-32 text-ink md:px-10">
      <p
        aria-hidden
        className="h-display pointer-events-none absolute bottom-[-0.18em] left-0 whitespace-nowrap text-[28vw] font-extrabold text-ink/10"
      >
        Ignore
      </p>
      <div className="relative mx-auto max-w-7xl">
        <h2 className="h-display text-6xl font-extrabold md:text-[9rem]">
          Have a bold idea?
          <br />
          Let&apos;s make it impossible to ignore.
        </h2>
        <div className="mt-14">
          <MagneticButton href="#contact">Start a project</MagneticButton>
        </div>
      </div>
    </section>
  );
}
