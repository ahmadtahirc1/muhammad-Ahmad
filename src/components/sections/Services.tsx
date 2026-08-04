"use client";

import { Bot, Globe, Layers, Check } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { services, whyWorkWithMe } from "@/lib/data";
import * as Icons from "lucide-react";

const serviceIcons: Record<string, React.ComponentType<{ size?: number }>> = {
  Globe,
  Bot,
  Layers,
};

export default function Services() {
  return (
    <section id="services" className="relative py-28 sm:py-36">
      <div className="section-container">
        <SectionHeading
          number="05"
          eyebrow="Services"
          title="How I can"
          highlight="help."
          description="Practical, production-ready solutions tailored to what your business actually needs."
        />

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {services.map((service, i) => {
            const Icon = serviceIcons[service.icon] ?? Globe;
            return (
              <Reveal key={service.title} delay={0.08 * i}>
                <div className="card card-hover flex h-full flex-col rounded-2xl p-8">
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-border text-accent">
                    <Icon size={22} />
                  </div>

                  <h3
                    className="text-xl font-medium tracking-tight"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {service.description}
                  </p>

                  <ul className="mt-6 flex flex-col gap-2.5">
                    {service.items.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-foreground/85">
                        <Check size={14} className="shrink-0 text-accent" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.16} className="mt-16">
          <div className="card rounded-2xl p-8 sm:p-10">
            <h3 className="mb-8 text-center text-xs uppercase tracking-[0.25em] text-muted-2">
              Why work with me
            </h3>
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
              {whyWorkWithMe.map((item) => {
                const Icon = (Icons as unknown as Record<string, React.ComponentType<{ size?: number }>>)[item.icon];
                return (
                  <div key={item.title} className="flex flex-col items-center gap-3 text-center">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-border text-accent">
                      {Icon ? <Icon size={17} /> : null}
                    </div>
                    <span className="text-xs leading-tight text-muted">{item.title}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
