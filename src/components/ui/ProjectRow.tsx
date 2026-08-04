"use client";

import { useState } from "react";
import { ExternalLink, FileText } from "lucide-react";
import { motion } from "framer-motion";
import type { Project } from "@/lib/data";
import { GithubIcon } from "@/components/icons/BrandIcons";

export default function ProjectRow({
  project,
  index,
  onOpenCaseStudy,
}: {
  project: Project;
  index: number;
  onOpenCaseStudy: (p: Project) => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative grid grid-cols-1 gap-6 border-b border-border py-9 transition-colors first:pt-0 hover:bg-surface-hover/60 lg:grid-cols-[3rem_1fr_11rem_auto] lg:items-center lg:gap-8 lg:px-4"
    >
      <span className="num-tag hidden lg:block">{String(index + 1).padStart(2, "0")}</span>

      <div>
        <div className="flex flex-wrap items-center gap-3">
          <h3
            className="text-2xl font-medium tracking-tight sm:text-3xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {project.title}
          </h3>
          {project.highlight && (
            <span className="rounded-full border border-accent/30 px-2.5 py-0.5 text-[11px] font-medium text-accent">
              {project.highlight}
            </span>
          )}
        </div>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">{project.description}</p>
        <div className="mt-3 flex flex-wrap gap-2 lg:hidden">
          {project.tags.map((t) => (
            <span key={t} className="rounded-md border border-border px-2 py-0.5 text-[11px] text-muted">
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="hidden flex-wrap gap-2 lg:flex">
        {project.stack.map((s) => (
          <span key={s} className="rounded-md bg-surface-hover px-2.5 py-1 text-[11px] text-muted-2">
            {s}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-4">
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor-hover
            className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors hover:text-accent"
          >
            Live <ExternalLink size={13} />
          </a>
        )}
        <a
          href="https://github.com/ahmadtahirc1"
          target="_blank"
          rel="noopener noreferrer"
          data-cursor-hover
          className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-foreground"
        >
          <GithubIcon size={13} />
        </a>
        <button
          onClick={() => onOpenCaseStudy(project)}
          data-cursor-hover
          className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-foreground"
        >
          <FileText size={13} />
        </button>
      </div>

      <motion.div
        initial={false}
        animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.96 }}
        transition={{ duration: 0.25 }}
        className="pointer-events-none absolute right-10 top-1/2 hidden aspect-video w-64 -translate-y-1/2 items-center justify-center overflow-hidden rounded-xl border border-border-strong bg-bg-elevated shadow-[0_20px_50px_-20px_rgba(20,18,10,0.3)] lg:flex"
      >
        <span
          className="select-none text-lg font-medium text-muted-2"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {project.title}
        </span>
      </motion.div>
    </div>
  );
}
