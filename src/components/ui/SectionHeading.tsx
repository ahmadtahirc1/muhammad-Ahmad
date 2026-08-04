import Reveal from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

export default function SectionHeading({
  eyebrow,
  number,
  title,
  highlight,
  description,
  align = "left",
  className,
}: {
  eyebrow: string;
  number?: string;
  title: string;
  highlight?: string;
  description?: string;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      <Reveal>
        <div className="flex items-center gap-3">
          {number && <span className="num-tag">{number}</span>}
          <span className="h-px w-8 bg-border-strong" />
          <span className="num-tag uppercase">{eyebrow}</span>
        </div>
      </Reveal>
      <Reveal delay={0.06}>
        <h2
          className="text-4xl leading-[1.08] font-medium tracking-tight text-balance sm:text-5xl md:text-6xl"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {title} {highlight && <span className="text-accent-mark">{highlight}</span>}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.12}>
          <p className={cn("max-w-xl text-balance text-base text-muted sm:text-lg", align === "center" && "mx-auto")}>
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
