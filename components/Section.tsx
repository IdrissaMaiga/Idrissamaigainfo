"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { SectionId } from "../lib/sectionData";

interface SectionProps {
  id: SectionId;
  index: number;
  sectionColor: string;
  sectionRef: (el: HTMLElement | null) => void;
  containerSize: number;
}

export default function Section({ id, index, sectionColor, sectionRef, containerSize }: SectionProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return; // Skip on server
    const updateMobile = () => setIsMobile(window.innerWidth < 768);
    updateMobile(); // Set initial value
    window.addEventListener("resize", updateMobile);
    return () => window.removeEventListener("resize", updateMobile);
  }, []);

  const getSemiTransparentColor = (color: string, opacity: number) => {
    if (color.startsWith("#")) {
      const r = parseInt(color.slice(1, 3), 16);
      const g = parseInt(color.slice(3, 5), 16);
      const b = parseInt(color.slice(5, 7), 16);
      return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    }
    return color;
  };

  return (
    <motion.section
      id={id}
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center snap-start relative"
      style={{ backgroundColor: "transparent" }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      aria-label={`${id} section`}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: getSemiTransparentColor(sectionColor, 0.08),
          boxShadow: "inset 0 0 40px rgba(255, 255, 255, 0.05)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, ${getSemiTransparentColor(
            "#ffffff",
            0.07
          )} 0%, transparent 50%, ${getSemiTransparentColor(
            "#000000",
            0.03
          )} 100%)`,
          pointerEvents: "none",
        }}
      />

      <div className="container mx-auto px-6 flex flex-col items-center relative z-10">
        <div className={`w-full max-w-4xl flex ${isMobile ? "flex-col" : "flex-row"} justify-center items-center gap-8`}>
          <div
            className="relative"
            style={{ width: containerSize, height: containerSize }}
            id={`cube-container-${index}`}
          />
          <div
            className="relative"
            style={{ width: containerSize, height: containerSize }}
            id={`detail-container-${index}`}
          />
        </div>
      </div>
    </motion.section>
  );
}