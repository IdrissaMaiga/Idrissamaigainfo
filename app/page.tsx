import Navbar from "@/components/navbar";
import HeroSection from "@/components/hero-section";
import AboutSection from "@/components/about-section";
import ProjectsSection from "@/components/projects-section";
import SkillsSection from "@/components/skills-section";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";
import ChatButton from "@/components/chat-button";
import MatrixBackground from "@/components/matrix-background";

export default function Home() {
  return (
    <main className="min-h-screen relative">
      {/* Programming-themed matrix background */}
      <MatrixBackground />
      
      {/* Navbar */}
      <Navbar />
      
      {/* Main Sections */}
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