"use client";

import { ArrowUp, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { navLinks, personal, socials } from "@/lib/data";
import { FacebookIcon, GithubIcon, InstagramIcon } from "@/components/icons/BrandIcons";

const socialIcons: Record<string, React.ComponentType<{ size?: number }>> = {
  Github: GithubIcon,
  Facebook: FacebookIcon,
  Instagram: InstagramIcon,
  Mail,
};

export default function Footer() {
  const year = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-border">
      <div className="section-container flex flex-col gap-10 py-14">
        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
          <a
            href="#home"
            data-cursor-hover
            className="flex items-center gap-2 text-lg font-medium tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-accent/40 text-sm text-accent">
              MA
            </span>
            {personal.name}
          </a>

          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                data-cursor-hover
                className="text-sm text-muted transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {socials.map((s) => {
              const Icon = socialIcons[s.icon] ?? Mail;
              return (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor-hover
                  aria-label={s.name}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border-strong text-muted transition-all hover:-translate-y-1 hover:text-foreground"
                >
                  <Icon size={16} />
                </a>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-xs text-muted-2">
            © {year} {personal.name}. All rights reserved.
          </p>
          <p className="text-xs text-muted-2">Designed &amp; built from scratch in Pakistan 🇵🇰</p>

          <motion.button
            onClick={scrollToTop}
            whileHover={{ y: -3 }}
            data-cursor-hover
            aria-label="Back to top"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border-strong text-muted transition-colors hover:text-foreground"
          >
            <ArrowUp size={16} />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
