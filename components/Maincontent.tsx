// app/MainContent.tsx
"use client";

import { useRef, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import gsap from "gsap";
import p5 from "p5";
import Navbar from "@/components/Navbar";
import Section from "@/components/Section";
import Cube from "@/components/Cube";
import SectionDetail from "@/components/sectionDetail";
import { SectionId, sectionColors, sectionNames } from "@/components/sectionData";
import ChatButton from "@/components/ChatButton";

export default function MainContent() {
  const [targetSection, setTargetSection] = useState(0);
  const [selectedFace, setSelectedFace] = useState<string | null>(null);
  const [containerSize, setContainerSize] = useState(300);
  const [isInverted, setIsInverted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const cubeRef = useRef<HTMLDivElement>(null);
  const detailRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const p5Instance = useRef<p5 | null>(null);

  useEffect(() => {
    const updateSize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const smallerDimension = Math.min(width, height);
      const newSize = Math.max(smallerDimension * (width < 768 ? 0.8 : 0.6), 200);
      setContainerSize(newSize);
      setIsMobile(width < 768);
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sectionRefs.current.indexOf(entry.target as HTMLElement);
            if (index !== -1 && index !== targetSection) {
              setTargetSection(index);
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    sectionRefs.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, [targetSection]);

  useEffect(() => {
    const moveElements = () => {
      const targetSectionEl = sectionRefs.current[targetSection];
      if (!targetSectionEl || !cubeRef.current || !detailRef.current) return;

      const cubeContainer = targetSectionEl.querySelector(`#cube-container-${targetSection}`);
      const detailContainer = targetSectionEl.querySelector(`#detail-container-${targetSection}`);
      if (!cubeContainer || !detailContainer) return;

      const cubeRect = cubeContainer.getBoundingClientRect();
      const detailRect = detailContainer.getBoundingClientRect();

      cubeRef.current.style.opacity = "1";
      detailRef.current.style.opacity = "1";

      gsap.to(cubeRef.current, {
        left: cubeRect.left + window.scrollX,
        top: cubeRect.top + window.scrollY,
        duration: 0.5,
        ease: "power2.out",
      });

      gsap.to(detailRef.current, {
        left: detailRect.left + window.scrollX,
        top: isMobile ? cubeRect.top + window.scrollY + containerSize + 20 : detailRect.top + window.scrollY,
        duration: 0.5,
        ease: "power2.out",
      });
    };

    moveElements();
    window.addEventListener("scroll", moveElements);
    window.addEventListener("resize", moveElements);

    return () => {
      window.removeEventListener("scroll", moveElements);
      window.removeEventListener("resize", moveElements);
    };
  }, [targetSection, containerSize, isMobile]);

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
            let r = colors[i][j].r;
            let g = colors[i][j].g;
            let b = colors[i][j].b;
            if (isInverted) {
              r = Math.min(255, Math.max(0, r + Math.random() * 50 - 25));
              g = Math.min(255, Math.max(0, g + Math.random() * 50 - 25));
              b = Math.min(255, Math.max(0, b + Math.random() * 50 - 25));
            }
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
  }, [isInverted]);

  return (
    <div className="relative min-h-screen">
      <div ref={canvasRef} className="fixed inset-0 z-0" />
      <div className={`relative z-10 ${isInverted ? "text-white" : "text-black"}`}>
        <Navbar setIsInverted={setIsInverted} />
        <div className="relative z-0">
          {sectionNames.map((id: SectionId, index: number) => (
            <Section
              key={id}
              id={id}
              index={index}
              sectionColor={sectionColors[index]}
              sectionRef={(el) => (sectionRefs.current[index] = el)}
              containerSize={containerSize}
            />
          ))}
        </div>

        <div
          ref={cubeRef}
          className="absolute z-20"
          style={{ width: containerSize, height: containerSize, opacity: 0 }}
        >
          <Canvas camera={{ position: [0, 0, 15], fov: 60 }} shadows>
            <Cube
              sectionColor={sectionColors[targetSection]}
              currentSection={sectionNames[targetSection]}
              setSelectedFace={setSelectedFace}
              containerSize={containerSize}
            />
            <OrbitControls
              enableZoom={false}
              maxDistance={15}
              minDistance={5}
              enablePan={false}
            />
          </Canvas>
        </div>

        <div
          ref={detailRef}
          className="absolute z-20"
          style={{ width: containerSize, height: containerSize, opacity: 0 }}
        >
          {selectedFace && (
            <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
              <SectionDetail
                currentSection={sectionNames[targetSection]}
                selectedFace={selectedFace}
              />
            </Canvas>
          )}
        </div>
      </div>
      <ChatButton />
    </div>
  );
}