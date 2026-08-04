"use client";

import { Briefcase, GraduationCap } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { experience } from "@/lib/data";

const builds = [
  "Web Applications",
  "Business Automation",
  "Management Systems",
  "Portfolio Websites",
  "Educational Platforms",
  "POS Software",
];

export default function Experience() {
  return (
    <section id="experience" className="relative py-28 sm:py-36">
      <div className="section-container">
        <SectionHeading
          number="04"
          eyebrow="Experience & Education"
          title="What I've been"
          highlight="building."
          description="Freelance and client work across web, desktop, and automation — alongside my degree."
        />

        <div className="relative mx-auto mt-16 max-w-3xl">
          <div className="absolute left-[23px] top-2 bottom-2 w-px bg-border sm:left-[27px]" />

          <div className="flex flex-col gap-10">
            {experience.map((item, i) => (
              <Reveal key={`${item.role}-${item.company}`} delay={0.08 * i}>
                <div className="relative flex gap-6">
                  <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-border bg-bg text-accent sm:h-14 sm:w-14">
                    {item.type === "education" ? <GraduationCap size={18} /> : <Briefcase size={18} />}
                  </div>
                  <div className="card flex-1 rounded-2xl p-6 sm:p-7">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="text-lg font-medium tracking-tight sm:text-xl" style={{ fontFamily: "var(--font-display)" }}>
                        {item.role}
                      </h3>
                      <span className="num-tag rounded-full border border-border px-3 py-1 uppercase">
                        {item.period}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-accent">{item.company}</p>
                    <ul className="mt-4 flex flex-col gap-2">
                      {item.points.map((point) => (
                        <li key={point} className="flex items-start gap-2 text-sm leading-relaxed text-muted">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted-2" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={0.16}>
          <div className="mx-auto mt-14 max-w-3xl">
            <div className="card rounded-2xl p-6 sm:p-8">
              <p className="mb-4 text-center text-xs uppercase tracking-[0.25em] text-muted-2">
                Things I build
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {builds.map((b) => (
                  <span
                    key={b}
                    className="rounded-full border border-border px-4 py-2 text-sm text-foreground/90"
                  >
                    {b}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
