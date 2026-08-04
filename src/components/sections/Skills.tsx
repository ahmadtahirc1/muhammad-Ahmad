"use client";

import {
  LayoutGrid,
  Server,
  Database,
  Sparkles,
  Workflow,
  Rocket,
  Palette,
} from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { skillCategories } from "@/lib/data";

const icons: Record<string, React.ComponentType<{ size?: number }>> = {
  LayoutGrid,
  Server,
  Database,
  Sparkles,
  Workflow,
  Rocket,
  Palette,
};

export default function Skills() {
  return (
    <section id="skills" className="relative py-28 sm:py-36">
      <div className="section-container">
        <SectionHeading
          number="02"
          eyebrow="Skills & Tools"
          title="A full-stack toolkit,"
          highlight="built for real products."
          description="From pixel-perfect interfaces to the automation running behind the scenes."
        />

        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((cat, i) => {
            const Icon = icons[cat.icon] ?? Sparkles;
            return (
              <Reveal key={cat.category} delay={0.05 * (i % 3)}>
                <div className="card card-hover h-full rounded-2xl p-7">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-accent">
                      <Icon size={18} />
                    </div>
                    <div>
                      <h3
                        className="text-lg font-medium tracking-tight"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {cat.category}
                      </h3>
                      <p className="text-xs text-muted-2">{cat.description}</p>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {cat.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-md border border-border px-2.5 py-1 text-xs text-muted"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
