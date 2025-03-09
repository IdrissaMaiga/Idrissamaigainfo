"use client";

import { useRef, useEffect } from "react";
import p5 from "p5";

export default function LoadingContent() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const p5Instance = useRef<p5 | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const sketch = (p: p5) => {
      let grid: string[][] = [];
      let colors: { r: number; g: number; b: number; highlight: boolean }[][] = [];
      const charWidth = 12;
      const charHeight = 12;
      let cols: number;
      let rows: number;

      const initializeGrid = () => {
        cols = Math.ceil(p.width / charWidth);
        rows = Math.ceil(p.height / charHeight);
        grid = [];
        colors = [];

        for (let i = 0; i < rows; i++) {
          const row: string[] = [];
          const colorRow: { r: number; g: number; b: number; highlight: boolean }[] = [];
          for (let j = 0; j < cols; j++) {
            row.push(Math.random() > 0.5 ? "1" : "0");
            colorRow.push({
              r: p.random(50, 100),
              g: p.random(50, 100),
              b: p.random(50, 100),
              highlight: Math.random() < 0.2,
            });
            if (colorRow[j].highlight) {
              colorRow[j].r = p.random(150, 255);
              colorRow[j].g = p.random(150, 255);
              colorRow[j].b = p.random(150, 255);
            }
          }
          grid.push(row);
          colors.push(colorRow);
        }
      };

      const updateGrid = (direction: "horizontal" | "vertical", index: number) => {
        if (direction === "horizontal") {
          grid[index] = grid[index].slice(1).concat(grid[index][0]);
          for (let j = 0; j < cols; j++) {
            if (Math.random() < 0.2) {
              grid[index][j] = grid[index][j] === "1" ? "0" : "1";
              colors[index][j].highlight = Math.random() < 0.4;
              if (colors[index][j].highlight) {
                colors[index][j] = {
                  r: p.random(150, 255),
                  g: p.random(150, 255),
                  b: p.random(150, 255),
                  highlight: true,
                };
              } else {
                colors[index][j] = {
                  r: p.random(50, 100),
                  g: p.random(50, 100),
                  b: p.random(50, 100),
                  highlight: false,
                };
              }
            }
            for (let i = 0; i < rows; i++) {
              if (i !== index && Math.random() < 0.1) {
                grid[i][j] = grid[i][j] === "1" ? "0" : "1";
              }
            }
          }
        } else {
          for (let i = 0; i < rows - 1; i++) {
            grid[i][index] = grid[i + 1][index];
          }
          grid[rows - 1][index] = grid[0][index];
          for (let i = 0; i < rows; i++) {
            if (Math.random() < 0.2) {
              grid[i][index] = grid[i][index] === "1" ? "0" : "1";
              colors[i][index].highlight = Math.random() < 0.4;
              if (colors[i][index].highlight) {
                colors[i][index] = {
                  r: p.random(150, 255),
                  g: p.random(150, 255),
                  b: p.random(150, 255),
                  highlight: true,
                };
              } else {
                colors[i][index] = {
                  r: p.random(50, 100),
                  g: p.random(50, 100),
                  b: p.random(50, 100),
                  highlight: false,
                };
              }
            }
            for (let j = 0; j < cols; j++) {
              if (j !== index && Math.random() < 0.1) {
                grid[i][j] = grid[i][j] === "1" ? "0" : "1";
              }
            }
          }
        }
      };

      const highlightZerosNearMouse = () => {
        const mouseX = p.mouseX;
        const mouseY = p.mouseY;
        const radius = 100;

        for (let i = 0; i < rows; i++) {
          for (let j = 0; j < cols; j++) {
            const x = j * charWidth;
            const y = i * charHeight;
            const distance = p.dist(mouseX, mouseY, x, y);

            if (distance < radius && grid[i][j] === "0") {
              colors[i][j] = {
                r: 255,
                g: 255,
                b: 0,
                highlight: true,
              };
            } else if (colors[i][j].r === 255 && colors[i][j].g === 255 && colors[i][j].b === 0) {
              colors[i][j] = {
                r: p.random(50, 100),
                g: p.random(50, 100),
                b: p.random(50, 100),
                highlight: false,
              };
              if (Math.random() < 0.2) {
                colors[i][j] = {
                  r: p.random(150, 255),
                  g: p.random(150, 255),
                  b: p.random(150, 255),
                  highlight: true,
                };
              }
            }
          }
        }
      };

      p.setup = () => {
        p.createCanvas(window.innerWidth, window.innerHeight);
        p.textFont("Courier");
        p.textSize(12);
        initializeGrid();
      };

      p.draw = () => {
        p.background(0);

        if (p.frameCount % 30 === 0) {
          const row = Math.floor(p.random(rows));
          updateGrid("horizontal", row);
        }
        if (p.frameCount % 45 === 0) {
          const col = Math.floor(p.random(cols));
          updateGrid("vertical", col);
        }

        if (p.frameCount % 10 === 0) {
          const i = Math.floor(p.random(rows));
          const j = Math.floor(p.random(cols));
          grid[i][j] = grid[i][j] === "1" ? "0" : "1";
          colors[i][j].highlight = Math.random() < 0.4;
          colors[i][j] = colors[i][j].highlight
            ? {
                r: p.random(150, 255),
                g: p.random(150, 255),
                b: p.random(150, 255),
                highlight: true,
              }
            : {
                r: p.random(50, 100),
                g: p.random(50, 100),
                b: p.random(50, 100),
                highlight: false,
              };
        }

        highlightZerosNearMouse();

        for (let i = 0; i < rows; i++) {
          for (let j = 0; j < cols; j++) {
            const r = colors[i][j].r;
            const g = colors[i][j].g;
            const b = colors[i][j].b;
            p.fill(r, g, b);
            p.text(grid[i][j], j * charWidth, i * charHeight);
          }
        }
      };

      p.windowResized = () => {
        p.resizeCanvas(window.innerWidth, window.innerHeight);
        initializeGrid();
      };
    };

    p5Instance.current = new p5(sketch, canvasRef.current);
    return () => {
      p5Instance.current?.remove();
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div ref={canvasRef} className="absolute inset-0 z-0" />
      <div className="relative z-10 flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-t-4 border-white/30 border-t-teal-400 rounded-full animate-spin mb-4"></div>
        <h1 className="text-4xl font-mono text-teal-400 animate-pulse">Loading...</h1>
        <p className="text-sm text-white/70 mt-2 font-mono animate-bounce">
          Initializing Matrix...
        </p>
      </div>
    </div>
  );
}