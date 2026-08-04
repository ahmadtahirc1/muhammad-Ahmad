"use client";

import { ExternalLink, MapPin, Phone } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import CopyButton from "@/components/ui/CopyButton";
import QRPlaceholder from "@/components/ui/QRPlaceholder";
import { personal } from "@/lib/data";
import { FacebookIcon, InstagramIcon, WhatsappIcon } from "@/components/icons/BrandIcons";

const whatsappHref = `https://wa.me/92${personal.whatsapp.replace(/[^0-9]/g, "").slice(1)}`;

const cards = [
  {
    label: "Phone",
    value: personal.phone,
    icon: Phone,
    href: `tel:+92${personal.phone.replace(/[^0-9]/g, "").slice(1)}`,
    copy: personal.phone,
  },
  {
    label: "WhatsApp",
    value: personal.whatsapp,
    icon: WhatsappIcon,
    href: whatsappHref,
    copy: personal.whatsapp,
  },
  {
    label: "Facebook",
    value: "Muhammad Ahmad",
    icon: FacebookIcon,
    href: "https://www.facebook.com/share/1BEmVi9oLJ/",
    copy: "https://www.facebook.com/share/1BEmVi9oLJ/",
  },
  {
    label: "Instagram",
    value: "@ahmad_jutt_315",
    icon: InstagramIcon,
    href: "https://www.instagram.com/ahmad_jutt_315?igsh=anlrY21kN3FodTd4",
    copy: "https://www.instagram.com/ahmad_jutt_315?igsh=anlrY21kN3FodTd4",
  },
];

export default function Contact() {
  return (
    <section id="contact" className="relative py-28 sm:py-36">
      <div className="section-container">
        <SectionHeading
          number="07"
          eyebrow="Get In Touch"
          title="Let's build something"
          highlight="great together."
          description="No forms, no friction — just reach out directly. I usually reply within a few hours."
        />

        <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-[1.4fr_1fr]">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {cards.map((card, i) => (
              <Reveal key={card.label} delay={0.06 * i}>
                <div className="card card-hover group flex h-full flex-col justify-between rounded-2xl p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-border text-muted transition-colors group-hover:border-accent/40 group-hover:text-accent">
                      <card.icon size={18} />
                    </div>
                    <CopyButton value={card.copy} />
                  </div>

                  <div className="mt-6">
                    <p className="text-xs uppercase tracking-[0.2em] text-muted-2">{card.label}</p>
                    <p className="mt-1 text-lg font-medium tracking-tight">{card.value}</p>
                  </div>

                  <a
                    href={card.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor-hover
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-accent"
                  >
                    Open <ExternalLink size={13} />
                  </a>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal direction="left" delay={0.16}>
            <div className="card flex h-full flex-col items-center justify-center gap-6 rounded-2xl p-8 text-center sm:p-10">
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                <span className="num-tag uppercase">Available for freelance work</span>
              </span>

              <QRPlaceholder size={140} />

              <p className="text-xs text-muted-2">Scan to save my contact</p>

              <div className="flex items-center gap-2 text-sm text-muted">
                <MapPin size={15} className="text-accent" />
                {personal.location}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
