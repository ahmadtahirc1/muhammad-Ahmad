"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, X } from "lucide-react";
import type { Project } from "@/lib/data";
import { GithubIcon } from "@/components/icons/BrandIcons";

export default function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center p-4 sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="card relative z-10 max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl p-8 sm:p-10"
          >
            <button
              onClick={onClose}
              data-cursor-hover
              aria-label="Close"
              className="absolute right-6 top-6 flex h-9 w-9 items-center justify-center rounded-full border border-border-strong text-muted transition-colors hover:text-foreground"
            >
              <X size={16} />
            </button>

            <div className="mb-6 h-1 w-16 rounded-full bg-accent" />

            <h3
              className="text-3xl font-medium tracking-tight sm:text-4xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {project.title}
            </h3>

            {project.highlight && (
              <span className="mt-3 inline-block rounded-full border border-accent/30 px-3 py-1 text-xs text-accent">
                {project.highlight}
              </span>
            )}

            <p className="mt-5 text-base leading-relaxed text-muted">{project.longDescription}</p>

            <div className="mt-6 flex flex-wrap gap-2">
              {project.stack.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-border bg-surface-hover px-3 py-1.5 text-xs text-foreground/90"
                >
                  {s}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor-hover
                  className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-bg transition-colors hover:bg-accent"
                >
                  Live Demo <ExternalLink size={14} />
                </a>
              )}
              <a
                href="https://github.com/ahmadtahirc1"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-hover
                className="inline-flex items-center gap-2 rounded-full border border-border-strong px-6 py-3 text-sm font-medium text-foreground hover:bg-surface-hover"
              >
                <GithubIcon size={14} /> GitHub
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
