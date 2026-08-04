"use client";

import Reveal from "@/components/ui/Reveal";
import Counter from "@/components/ui/Counter";
import { stats } from "@/lib/data";

export default function Stats() {
  return (
    <section className="relative border-y border-border py-16 sm:py-20">
      <div className="section-container grid grid-cols-2 gap-y-10 md:grid-cols-4">
        {stats.map((stat, i) => (
          <Reveal key={stat.label} delay={0.06 * i} className="relative flex flex-col gap-1 px-2">
            {i !== 0 && (
              <span className="absolute -left-0 top-0 hidden h-full w-px bg-border md:block" />
            )}
            <div
              className="font-mono text-4xl font-medium text-accent sm:text-5xl"
            >
              <Counter value={stat.value} suffix={stat.suffix} />
            </div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted sm:text-sm">
              {stat.label}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
