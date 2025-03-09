"use client";

import React, { useRef, useEffect } from "react";
import p5 from "p5";
import * as THREE from "three";

interface WaveEffectProps {
  triggerWave: boolean;
  sectionColor: string;
}

// Create a custom interface for our p5 instance that includes the amplitude property
interface CustomP5Instance extends p5 {
  amplitude: number;
}

const WaveEffect: React.FC<WaveEffectProps> = ({ triggerWave, sectionColor }) => {
  const waveRef = useRef<HTMLDivElement>(null);
  const p5Instance = useRef<CustomP5Instance | null>(null);

  useEffect(() => {
    let amplitude = 0;
    let waveSpeed = 0;
    const color = new THREE.Color(sectionColor || "#ffffff");

    const sketch = (p: p5) => {
      p.setup = () => {
        p.createCanvas(window.innerWidth, window.innerHeight);
        p.background(0, 0);
      };

      p.draw = () => {
        p.background(0, 30); // Lower alpha for smoother fade
        p.stroke(color.r * 255, color.g * 255, color.b * 255, 200); // Match section color
        p.strokeWeight(3); // Thicker wave for visibility
        p.noFill();

        // Multiple waves for richer effect
        for (let i = 0; i < 2; i++) {
          p.beginShape();
          for (let x = 0; x < p.width; x++) {
            const y = p.height / 2 + amplitude * Math.sin((x + waveSpeed) * 0.05 + i * 0.5);
            p.vertex(x, y);
          }
          p.endShape();
        }

        if (amplitude > 0) {
          amplitude *= 0.92; // Slightly slower dampening
          waveSpeed += 0.3; // Faster movement
        }
      };
    };

    // Create p5 instance and cast it to our custom type
    if (waveRef.current) {
      p5Instance.current = new p5(sketch, waveRef.current) as CustomP5Instance;
    }

    return () => {
      if (p5Instance.current) {
        p5Instance.current.remove();
      }
    };
  }, [sectionColor]);

  useEffect(() => {
    if (triggerWave && p5Instance.current) {
      p5Instance.current.amplitude = 150; // Increased amplitude
    }
  }, [triggerWave]);

  return <div ref={waveRef} className="fixed inset-0 pointer-events-none z-20" />;
};

export default WaveEffect;