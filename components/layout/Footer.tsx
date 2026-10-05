import { site } from "@/data/site";

export default function Footer() {
  return (
    <footer id="contact" className="border-t border-line px-5 py-16 md:px-10">
      <div className="mx-auto max-w-7xl">
        <p className="h-display text-[13vw] font-extrabold md:text-[9rem]">
          Let&apos;s talk.
        </p>
        <div className="mt-10 flex flex-col justify-between gap-8 text-sm text-muted md:flex-row">
          <address className="not-italic">
            <a
              href={`mailto:${site.email}`}
              className="text-xl text-paper hover:text-accent"
            >
              {site.email}
            </a>
            <p className="mt-2">{site.phone}</p>
            <p>{site.location}</p>
          </address>
          <ul className="flex gap-6">
            {site.social.map((s) => (
              <li key={s.label}>
                <a href={s.href} className="hover:text-accent">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-12 text-xs text-muted">
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
