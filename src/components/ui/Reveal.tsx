"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  blur?: boolean;
  scale?: boolean;
  once?: boolean;
};

const offsets = {
  up: { y: 32, x: 0 },
  down: { y: -32, x: 0 },
  left: { x: 32, y: 0 },
  right: { x: -32, y: 0 },
  none: { x: 0, y: 0 },
};

export default function Reveal({
  children,
  className,
  delay = 0,
  direction = "up",
  blur = false,
  scale = false,
  once = true,
}: RevealProps) {
  const offset = offsets[direction];

  return (
    <motion.div
      className={cn(className)}
      initial={{
        opacity: 0,
        ...offset,
        filter: blur ? "blur(10px)" : "blur(0px)",
        scale: scale ? 0.94 : 1,
      }}
      whileInView={{ opacity: 1, y: 0, x: 0, filter: "blur(0px)", scale: 1 }}
      viewport={{ once, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
