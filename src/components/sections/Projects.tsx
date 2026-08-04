"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import ProjectRow from "@/components/ui/ProjectRow";
import ProjectModal from "@/components/ui/ProjectModal";
import { projects, type Project } from "@/lib/data";

export default function Projects() {
  const [active, setActive] = useState<Project | null>(null);

  return (
    <section id="projects" className="relative py-28 sm:py-36">
      <div className="section-container">
        <SectionHeading
          number="03"
          eyebrow="Featured Work"
          title="Projects I've"
          highlight="shipped."
          description="A mix of client websites, business software, and side experiments — all real, all live."
        />

        <div className="mt-16 border-t border-border">
          {projects.map((project, i) => (
            <Reveal key={project.slug} delay={0.04 * i}>
              <ProjectRow project={project} index={i} onOpenCaseStudy={setActive} />
            </Reveal>
          ))}

          <Reveal delay={0.04 * projects.length}>
            <div className="flex items-center gap-4 py-9 text-muted">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border">
                <Plus size={16} />
              </span>
              <div>
                <p className="text-sm font-medium text-foreground/90">More projects on the way</p>
                <p className="text-xs text-muted-2">Currently building the next one — check back soon.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      <ProjectModal project={active} onClose={() => setActive(null)} />
    </section>
  );
}
