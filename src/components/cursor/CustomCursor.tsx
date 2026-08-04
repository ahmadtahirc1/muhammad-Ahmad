"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isTouch, setIsTouch] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { damping: 30, stiffness: 400, mass: 0.5 });
  const ringY = useSpring(y, { damping: 30, stiffness: 400, mass: 0.5 });
  const dotX = useSpring(x, { damping: 40, stiffness: 900, mass: 0.2 });
  const dotY = useSpring(y, { damping: 40, stiffness: 900, mass: 0.2 });

  useEffect(() => {
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time pointer-type detection on mount
    setIsTouch(coarse);
    if (coarse) return;

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const down = () => setIsPressed(true);
    const up = () => setIsPressed(false);

    const over = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setIsHovering(!!target.closest("[data-cursor-hover]"));
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    window.addEventListener("mouseover", over);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      window.removeEventListener("mouseover", over);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  if (isTouch) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[100]" aria-hidden="true">
      <motion.div
        className="absolute top-0 left-0 rounded-full border"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isHovering ? 56 : 32,
          height: isHovering ? 56 : 32,
          opacity: visible ? (isPressed ? 0.4 : 1) : 0,
          scale: isPressed ? 0.85 : 1,
          borderColor: isHovering ? "rgba(15,122,92,0.7)" : "rgba(20,18,10,0.3)",
        }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      />
      <motion.div
        className="absolute top-0 left-0 h-1.5 w-1.5 rounded-full bg-foreground"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: visible ? 1 : 0,
        }}
        animate={{
          scale: isHovering ? 0 : isPressed ? 1.6 : 1,
        }}
        transition={{ duration: 0.2 }}
      />
    </div>
  );
}
