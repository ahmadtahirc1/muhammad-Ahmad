"use client";

import { GraduationCap, Rocket, Sparkles, Code2 } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { personal } from "@/lib/data";

const pillars = [
  {
    icon: Code2,
    title: "Frontend & Full Stack",
    text: "Building responsive, production-grade web applications with React, Next.js and modern tooling.",
  },
  {
    icon: Sparkles,
    title: "AI Automation",
    text: "Integrating OpenAI and Claude APIs with automation tools like N8N to streamline business operations.",
  },
  {
    icon: Rocket,
    title: "Business Software",
    text: "Delivering desktop POS systems and management tools that real businesses run on, daily.",
  },
  {
    icon: GraduationCap,
    title: "Always Learning",
    text: "Software Engineering student at COMSATS University, constantly refining craft alongside client work.",
  },
];

export default function About() {
  return (
    <section id="about" className="relative py-28 sm:py-36">
      <div className="section-container">
        <SectionHeading
          number="01"
          eyebrow="About Me"
          title="Engineering software,"
          highlight="one client at a time."
          description="A closer look at how I think about building things."
        />

        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
          <Reveal direction="right" className="lg:col-span-7">
            <div className="card rounded-2xl p-8 sm:p-10">
              <p className="text-lg leading-relaxed text-foreground/90 sm:text-xl">
                I&apos;m {personal.name}, a Software Engineering student and freelance developer
                based in Pakistan, working at the intersection of{" "}
                <span className="text-accent-mark">frontend engineering</span>,{" "}
                <span className="text-accent-mark">full-stack development</span>, and{" "}
                <span className="text-accent-mark">AI-driven automation</span>.
              </p>
              <p className="mt-6 text-base leading-relaxed text-muted sm:text-lg">
                Over the past few years I&apos;ve moved from writing my first lines of code to
                shipping software real businesses depend on — a POS system running across six-plus
                stores, client websites built for performance and clarity, and automation
                workflows that quietly save businesses hours of manual work every week.
              </p>
              <p className="mt-6 text-base leading-relaxed text-muted sm:text-lg">
                I care about clean architecture as much as clean interfaces. Whether it&apos;s a
                landing page, a management system, or an AI-powered workflow, my goal is the
                same: understand the business problem first, then build the simplest solution
                that solves it well.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:col-span-5">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={0.08 * i} direction="left">
                <div className="card card-hover h-full rounded-2xl p-6">
                  <p.icon size={20} className="mb-4 text-accent" />
                  <h3 className="mb-2 text-sm font-semibold tracking-tight">{p.title}</h3>
                  <p className="text-sm leading-relaxed text-muted">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
