import { clients } from "@/data/content";

export default function Clients() {
  const row = [...clients, ...clients];
  return (
    <section
      aria-label="Clients"
      className="marquee-wrap overflow-hidden border-y border-line py-8"
    >
      <ul className="marquee flex w-max gap-16 pr-16">
        {row.map((c, i) => (
          <li
            key={i}
            aria-hidden={i >= clients.length}
            className="h-display whitespace-nowrap text-4xl font-extrabold text-muted/60 transition-colors hover:text-accent md:text-6xl"
          >
            {c}
          </li>
        ))}
      </ul>
    </section>
  );
}
