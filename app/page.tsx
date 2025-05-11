"use client";

import AboutSection from "@/components/about-section";
import ProjectsSection from "@/components/projects-section";
import SkillsSection from "@/components/skills-section";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";
import ChatButton from "@/components/chat-button";
import MatrixBackground from "@/components/matrix-background";
import Navbar from "@/components/navbar-section";
import HeroSection from "@/components/hero-section";

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-x-hidden">
      {/* Programming-themed matrix background */}
      <MatrixBackground
        opacity={0.1}
        lightModeOpacity={0.08}
        darkModeOpacity={0.15}
        speed={0.8} // Slightly slower speed for mobile
      />

      {/* Navbar */}
      <Navbar />

      {/* Main Sections with responsive container */}
    
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <SkillsSection />
        <ContactSection />
     

      {/* Footer */}
      <Footer />

      {/* Interactive Chat Button */}
      <ChatButton />
    </main>
  );
}