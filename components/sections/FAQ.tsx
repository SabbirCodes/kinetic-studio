"use client";
import { useState } from "react";
import { Plus } from "lucide-react";
import { faqs } from "@/data/faq";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="px-5 py-28 md:px-10">
      <div className="mx-auto max-w-4xl">
        <h2 className="h-display text-5xl font-extrabold md:text-7xl">
          Good questions.
        </h2>
        <div className="mt-12 border-t border-line">
          {faqs.map((f, i) => (
            <div key={f.q} className="border-b border-line">
              <h3>
                <button
                  aria-expanded={open === i}
                  aria-controls={`faq-${i}`}
                  onClick={() => setOpen(open === i ? null : i)}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left font-display text-xl md:text-2xl"
                >
                  {f.q}
                  <Plus
                    className={`size-6 shrink-0 text-accent transition-transform duration-300 ${open === i ? "rotate-45" : ""}`}
                    aria-hidden
                  />
                </button>
              </h3>
              <div
                id={`faq-${i}`}
                role="region"
                className={`grid transition-[grid-template-rows] duration-500 ${open === i ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
              >
                <div className="min-h-0 overflow-hidden pr-12 text-muted">
                  <p className="pb-6">{f.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
