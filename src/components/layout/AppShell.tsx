"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import LoadingScreen from "@/components/loading/LoadingScreen";
import CustomCursor from "@/components/cursor/CustomCursor";
import SmoothScroll from "@/components/providers/SmoothScroll";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <SmoothScroll>
      <LoadingScreen onDone={() => setLoaded(true)} />
      <CustomCursor />
      <div className="noise" />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loaded ? 1 : 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
      >
        <Navbar />
        <main>{children}</main>
        <Footer />
      </motion.div>
    </SmoothScroll>
  );
}
