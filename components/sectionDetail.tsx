"use client";

import React, { useRef, useEffect } from "react";
import { Html } from "@react-three/drei";
import { SectionId, sectionDetails, ProjectContent } from "../lib/sectionData";
import * as THREE from "three";
import gsap from "gsap";
import { useThree } from "@react-three/fiber";

interface SectionDetailProps {
  currentSection: SectionId;
  selectedFace: string | null;
}

const SectionDetail: React.FC<SectionDetailProps> = ({
  currentSection,
  selectedFace,

}) => {
  const groupRef = useRef<THREE.Group>(null!);
  const { size } = useThree();
  const content = selectedFace ? sectionDetails[currentSection]?.content[selectedFace] : null;
  const isMobile = size.width < 768;

  useEffect(() => {
    if (groupRef.current) {
      groupRef.current.scale.set(0, 0, 0);
      gsap.to(groupRef.current.scale, {
        x: 1,
        y: 1,
        z: 1,
        duration: 0.8,
        ease: "elastic.out(1, 0.5)",
      });
      gsap.to(groupRef.current.rotation, {
        y: Math.PI * 2,
        duration: 1.2,
        ease: "power2.out",
      });
    }
  }, [selectedFace]);

  const renderAboutContent = (text: string) => {
    return (
      <Html position={[0, 0, 0]} transform center distanceFactor={10}>
        <div className="bg-gray-900/90 rounded-xl p-6 border border-red-400/30 shadow-xl backdrop-blur-sm max-w-[300px] text-center">
          <p className="text-white text-sm">{text}</p>
        </div>
      </Html>
    );
  };

  const renderProjectContent = (project: ProjectContent) => {
    return (
      <Html position={[0, 0, 0]} transform center distanceFactor={10}>
        <div className="bg-gray-900/90 rounded-xl p-6 border border-teal-400/30 shadow-xl backdrop-blur-sm max-w-[300px] text-center">
          <h3 className="text-teal-400 font-semibold mb-4 text-lg">{selectedFace}</h3>
          <p className="text-white text-sm mb-4">{project.description}</p>
          <h4 className="text-teal-400 font-semibold mb-2 text-sm">Tech Stack</h4>
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {project.techStack.map((tech) => (
              <div
                key={tech}
                className="px-3 py-1 bg-gray-800 rounded-full text-white text-xs border border-teal-400/50 hover:border-teal-400 transition-all duration-300 shadow-sm hover:shadow-teal-400/20"
              >
                {tech}
              </div>
            ))}
          </div>
          <a
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-block px-6 py-2 bg-teal-500 text-white font-semibold rounded-full overflow-hidden transition-all duration-300 hover:scale-105"
          >
            <span className="relative z-10">View on GitHub</span>
            <span className="absolute inset-0 bg-teal-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </a>
        </div>
      </Html>
    );
  };

  const renderContactContent = (text: string) => {
    const [label, value] = text.includes(": ") ? text.split(": ") : [text, ""];
    const href = label === "Email" ? `mailto:${value}` : value;

    return (
      <Html position={[0, 0, 0]} transform center distanceFactor={10}>
        <div className="bg-gray-900/90 rounded-xl p-6 border border-blue-400/30 shadow-xl backdrop-blur-sm max-w-[300px] text-center">
          <h3 className="text-blue-400 font-semibold mb-3 text-lg">{label}</h3>
          {href ? (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-block px-5 py-2 bg-blue-500 text-white rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 max-w-full"
            >
              <span className="relative z-10 break-words block max-w-[220px] mx-auto">
                {value}
              </span>
              <span className="absolute inset-0 bg-blue-600 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-bottom"></span>
            </a>
          ) : (
            <p className="text-white text-sm break-words">{text}</p>
          )}
        </div>
      </Html>
    );
  };

  if (!selectedFace || !content) return null;

  const scale = isMobile ? 1.4 : 1.6;

  return (
    <group ref={groupRef} scale={[scale, scale, scale]}>
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />
      {currentSection === "about" && typeof content === "string" && renderAboutContent(content)}
      {currentSection === "projects" && typeof content !== "string" && renderProjectContent(content)}
      {currentSection === "contact" && typeof content === "string" && renderContactContent(content)}
    </group>
  );
};

export default SectionDetail;