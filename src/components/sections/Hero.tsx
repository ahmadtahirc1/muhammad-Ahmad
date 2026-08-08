"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import { personal, socials } from "@/lib/data";
import Button from "@/components/ui/Button";
import RotatingText from "@/components/ui/RotatingText";
import Reveal from "@/components/ui/Reveal";
import { FacebookIcon, GithubIcon, InstagramIcon, WhatsappIcon } from "@/components/icons/BrandIcons";

const socialIcons: Record<string, React.ComponentType<{ size?: number }>> = {
  Github: GithubIcon,
  Facebook: FacebookIcon,
  Instagram: InstagramIcon,
};

const traits = ["Frontend", "AI Automation", "Full Stack", "Freelancer"];

export default function Hero() {
  return (
    <section id="home" className="relative isolate overflow-hidden pt-28 pb-16 sm:pt-32">
      {/* Soft pastel background blobs */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 -top-16 h-[420px] w-[420px] rounded-full bg-[rgba(214,120,104,0.38)] blur-[110px]" />
        <div className="absolute -right-28 top-[8%] h-[380px] w-[380px] rounded-full bg-accent/[0.3] blur-[110px]" />
        <div className="absolute -bottom-24 left-[12%] h-[360px] w-[360px] rounded-full bg-[rgba(163,140,201,0.3)] blur-[110px]" />
      </div>

      {/* Giant background wordmark */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-[8%] z-0 select-none text-center leading-none text-accent/90 sm:top-[5%]"
      >
        <span
          className="text-[24vw] font-bold tracking-tighter sm:text-[20vw] lg:text-[18vw]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          AHMAD
        </span>
      </div>

      <div className="section-container relative z-10">
        {/* Tagline + trait list — stacked on mobile, spread wide on desktop */}
        <div className="flex flex-col items-center gap-6 text-center lg:flex-row lg:items-start lg:justify-between lg:text-left">
          <Reveal className="max-w-[220px] text-sm font-semibold leading-snug">
            <RotatingText words={personal.titles} className="text-accent" />
            <br /> That&apos;s Muhammad.
          </Reveal>

          <Reveal delay={0.1}>
            <div className="card flex flex-row flex-wrap justify-center gap-x-5 gap-y-2 rounded-2xl px-5 py-4 lg:flex-col lg:justify-start lg:gap-2.5">
              {traits.map((t) => (
                <span key={t} className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" /> {t}
                </span>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Photo with overlapping headline + floating stat badges */}
        <Reveal direction="none" delay={0.15} className="relative mx-auto mt-4 max-w-[430px] sm:max-w-[540px] lg:-mt-6 lg:max-w-[680px] xl:max-w-[740px]">
          <div className="relative w-full">
            <div
              aria-hidden
              className="absolute left-1/2 top-[8%] h-[75%] w-[82%] -translate-x-1/2 rounded-full bg-accent/[0.32] blur-[80px]"
            />
            <Image
              src="/images/profile-cutout.png"
              alt="Muhammad Ahmad"
              width={1102}
              height={1410}
              priority
              sizes="(min-width: 1024px) 740px, 90vw"
              className="relative z-10 h-auto w-full select-none"
            />

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="card absolute left-[-2%] top-[34%] z-20 rounded-xl px-4 py-3 text-center sm:left-[-8%] sm:px-5 sm:py-4"
            >
              <div className="font-mono text-xl font-semibold text-accent sm:text-2xl">6+</div>
              <div className="text-[11px] text-muted-2 sm:text-xs">business clients</div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
              className="card absolute right-[-2%] top-[52%] z-20 rounded-xl px-4 py-3 text-center sm:right-[-8%] sm:px-5 sm:py-4"
            >
              <div className="font-mono text-xl font-semibold text-accent sm:text-2xl">4+</div>
              <div className="text-[11px] text-muted-2 sm:text-xs">years learning</div>
            </motion.div>

            <div className="absolute inset-x-0 bottom-[10%] z-10 mx-auto max-w-[88%] px-4 text-center">
              <h1
                className="text-3xl font-bold leading-[1.05] text-bg sm:text-5xl lg:text-[4.2rem]"
                style={{
                  fontFamily: "var(--font-display)",
                  textShadow:
                    "0 2px 28px rgba(8,8,6,0.6), 0 2px 6px rgba(8,8,6,0.85), 0 0 2px rgba(8,8,6,0.9)",
                }}
              >
                Automation, Applied Differently.
              </h1>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.24} className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button href={personal.resumeUrl} external icon={<Download size={16} />}>
            Download Resume
          </Button>
          <Button href="#projects" variant="outline" icon={<ArrowRight size={16} />}>
            View Projects
          </Button>
          <Button href="#contact" variant="ghost">
            Contact Me
          </Button>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-8 border-t border-border pt-8 sm:grid-cols-2">
          <Reveal>
            <p className="max-w-sm text-sm leading-relaxed text-muted">
              I design and build fast, elegant software — business websites, desktop POS
              systems, and AI-powered automation. Currently studying Software Engineering
              while shipping real products for real clients.
            </p>
          </Reveal>

          <Reveal delay={0.08} className="flex flex-col items-start gap-4 sm:items-end">
            <div className="flex items-center gap-3">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              <span className="num-tag uppercase">Available for work — {personal.location}</span>
            </div>
            <div className="flex items-center gap-3">
              {socials.map((s) => {
                const Icon = socialIcons[s.icon];
                if (!Icon) return null;
                return (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor-hover
                    aria-label={s.name}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-accent/50 hover:text-accent"
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
              <a
                href={`https://wa.me/92${personal.whatsapp.replace(/[^0-9]/g, "").slice(1)}`}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-hover
                aria-label="WhatsApp"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-accent/50 hover:text-accent"
              >
                <WhatsappIcon size={16} />
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
