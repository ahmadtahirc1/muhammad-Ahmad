"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navLinks, personal } from "@/lib/data";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks
      .map((l) => document.querySelector(l.href))
      .filter(Boolean) as Element[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled ? "py-3" : "py-6"
        )}
      >
        <div className="section-container">
          <div
            className={cn(
              "flex items-center justify-between rounded-2xl border px-5 py-3 backdrop-blur-xl transition-all duration-500",
              scrolled ? "border-border bg-bg/85 shadow-[0_8px_32px_-16px_rgba(20,18,10,0.18)]" : "border-transparent bg-transparent"
            )}
          >
            <a
              href="#home"
              data-cursor-hover
              className="flex items-center gap-2.5 text-lg font-medium tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-accent/40 text-sm text-accent">
                MA
              </span>
              <span className="hidden sm:inline">Muhammad Ahmad</span>
            </a>

            <nav className="hidden items-center gap-2 lg:flex">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  data-cursor-hover
                  className={cn(
                    "group relative px-3 py-2 text-sm text-muted transition-colors hover:text-foreground",
                    active === link.href && "text-foreground"
                  )}
                >
                  <span className="relative">{link.label}</span>
                  <span
                    className={cn(
                      "absolute inset-x-3 -bottom-0.5 h-px origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100",
                      active === link.href && "scale-x-100"
                    )}
                  />
                </a>
              ))}
            </nav>

            <div className="hidden lg:block">
              <Button href="#contact" variant="outline" className="!px-5 !py-2.5 text-xs">
                Let&apos;s Talk
              </Button>
            </div>

            <button
              data-cursor-hover
              onClick={() => setOpen((o) => !o)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border-strong text-foreground lg:hidden"
              aria-label="Toggle menu"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 flex flex-col bg-bg/98 backdrop-blur-2xl lg:hidden"
          >
            <div className="flex flex-1 flex-col items-center justify-center gap-6">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 * i }}
                  className="text-3xl font-medium tracking-tight text-foreground"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.06 * navLinks.length }}
                className="mt-4"
              >
                <Button href={`mailto:${personal.email}`} onClick={() => setOpen(false)}>
                  Contact Me
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
