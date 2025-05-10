"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "./theme-provider";

interface MatrixBackgroundProps {
  opacity?: number;
  lightModeOpacity?: number;
  darkModeOpacity?: number;
  speed?: number;
}

export default function MatrixBackground({ 
  opacity = 0.1, 
  lightModeOpacity = 0.08,
  darkModeOpacity = 0.15,
  speed = 1
}: MatrixBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Matrix rain effect
    const fontSize = 14;
    const columns = Math.ceil(canvas.width / fontSize);
    const drops: number[] = [];

    // Initialize drops
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100;
    }

    // Use more programming-related characters
    const matrix = "01ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz{}[]()<>=-+*/&|!?:;._$#";
    let requestId: number;

    // Render the matrix rain
    const draw = () => {
      // Set transparency based on theme
      const fadeStrength = theme === "dark" ? 0.05 : 0.12; // Stronger fade in light mode
      ctx.fillStyle = `rgba(0, 0, 0, ${fadeStrength})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Choose character color based on theme
      ctx.fillStyle = theme === "dark" 
        ? "rgba(59, 130, 246, 0.9)" // Blue with higher opacity in dark mode
        : "rgba(29, 78, 216, 0.8)";  // Darker blue with higher opacity in light mode
      
      ctx.font = `${fontSize}px monospace`;

      // Draw characters
      for (let i = 0; i < drops.length; i++) {
        // Get random character
        const text = matrix.charAt(Math.floor(Math.random() * matrix.length));

        // Draw the character
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Reset drop when it reaches the bottom or randomly
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        // Move drop down at specified speed
        drops[i] += speed;
      }

      requestId = window.requestAnimationFrame(draw);
    };

    // Start the animation
    draw();

    // Clean up
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.cancelAnimationFrame(requestId);
    };
  }, [theme, opacity, lightModeOpacity, darkModeOpacity, speed]);

  // Calculate the appropriate opacity based on theme
  const currentOpacity = theme === "dark" 
    ? (opacity * darkModeOpacity) 
    : (opacity * lightModeOpacity);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ 
        opacity: theme === "dark" ? darkModeOpacity : lightModeOpacity, 
        zIndex: -1 
      }}
    />
  );
}