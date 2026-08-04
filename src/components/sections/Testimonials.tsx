"use client";

import { Quote } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { testimonials } from "@/lib/data";

export default function Testimonials() {
  return (
    <section className="relative py-28 sm:py-36">
      <div className="section-container">
        <SectionHeading
          number="06"
          eyebrow="Testimonials"
          title="Kind words from"
          highlight="clients."
          description="Placeholder feedback reflecting the kind of experience clients can expect — updated as new projects wrap up."
        />

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={0.06 * i}>
              <div className="card card-hover h-full rounded-2xl p-8">
                <Quote className="mb-4 text-accent/50" size={26} />
                <p className="text-base leading-relaxed text-foreground/90">&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-6 flex items-center gap-3 border-t border-border pt-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-xs font-medium text-accent">
                    {t.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{t.name}</p>
                    <p className="text-xs text-muted-2">{t.role}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
