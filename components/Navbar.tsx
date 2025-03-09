"use client";

import React, { useEffect, useState, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
interface NavbarProps {
  setIsInverted: (inverted: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ 
  setIsInverted, 
}) => {
  const sections = useMemo(() => ["projects", "about", "contact"], []);
  const [activeSection, setActiveSection] = useState<string>("about");
  const [scrolling, setScrolling] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const toggleInverted = useCallback(() => {
    if (setIsInverted) { // Ensure it's a function before calling
      setIsInverted(true);
      setTimeout(() => {
        setIsInverted(false);
      }, 1000);
    }
  }, [setIsInverted]);
  
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolling(window.scrollY > 50);
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  const handleScrollToSection = (section: string) => {
    const element = document.getElementById(section);
    if (element) {
      window.scrollTo({ top: element.offsetTop - 50, behavior: "smooth" });
      setActiveSection(section);
      setMenuOpen(false);
    }
  };

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300`}
    >
      {/* Glass backdrop - More transparent now */}
      <div
        className={`absolute inset-0 transition-all duration-500 ${
          scrolling ? "bg-opacity-5" : "bg-opacity-0"
        }`}
        style={{
          backgroundColor: "rgba(10, 25, 47, 0.1)",
          backdropFilter: scrolling ? "blur(5px)" : "blur(3px)",
          borderBottom: scrolling 
            ? "1px solid rgba(100, 149, 237, 0.1)" 
            : "1px solid rgba(255, 255, 255, 0.01)",
          boxShadow: scrolling 
            ? "0 4px 20px rgba(0, 0, 0, 0.05)" 
            : "none"
        }}
      />

      <div className="container mx-auto flex items-center justify-between py-4 px-6 relative z-10">
        {/* Left Side - Profile Picture & Name */}
        <div className="flex items-center space-x-4">
          <div className="relative overflow-hidden rounded-full">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-yellow-500 animate-spin-slow rounded-full opacity-80"></div>
            <div className="absolute inset-0.5 rounded-full overflow-hidden bg-gray-900 bg-opacity-50">
              <Image
                src="/logos/id_.jpg"
                alt="Your Profile"
                width={50}
                height={50}
                className="rounded-full opacity-90 hover:opacity-100 transition-opacity"
              />
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <span className="text-lg font-bold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-yellow-400">
              Idrissa Maiga
            </span>
            <span className="text-sm text-blue-300 font-mono">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ repeat: Infinity, duration: 1.5, repeatType: "reverse" }}
              >
                Full-Stack Developer
              </motion.span>
            </span>
          </div>
        </div>

        {/* Right Side - Navigation Links & CV Button */}
        <div className="hidden md:flex items-center space-x-8 relative">
          <div className="grid grid-cols-4 gap-4 relative">
            {sections.map((section) => (
              <button
                key={section}
                onClick={() => {handleScrollToSection(section); toggleInverted()}}
                className={`px-4 py-2 text-white text-lg font-semibold transition-all duration-300 hover:text-yellow-300 z-10 text-center relative group ${
                  activeSection === section ? "text-yellow-400" : ""
                }`}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-yellow-400 transform -translate-x-1/2 group-hover:w-full transition-all duration-300 opacity-70"></span>
              </button>
            ))}
            {/* Glow Selection Indicator - More subtle now */}
            <motion.div
              className="absolute w-1/4 h-[calc(100%-0.5rem)] top-1/2 -translate-y-1/2 pointer-events-none"
              animate={{ left: `${sections.indexOf(activeSection) * 25}%` }}
              transition={{
                duration: 0.5,
                ease: [0.25, 1.5, 0.5, 1], // Bouncy easing
              }}
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/10 to-yellow-500/10 blur-sm"></div>
              <div className="absolute inset-2 rounded-full bg-gradient-to-r from-blue-500/5 to-yellow-500/5"></div>
            </motion.div>
          </div>

          {/* Download CV Button - More transparent */}
          <motion.a
            href="/IdrissaMaigaCV.pdf"
            download
            whileHover={{ scale: 1.05 }}
            className="px-4 py-2 text-white rounded-full shadow-lg transition-all duration-300 relative overflow-hidden group"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-yellow-500 opacity-70"></span>
            <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-yellow-600 opacity-0 group-hover:opacity-80 transition-opacity duration-300"></span>
            <span className="relative z-10">Download CV</span>
          </motion.a>
        </div>

        {/* Mobile Menu Button - More transparent */}
        <button
          className="md:hidden p-2 text-white hover:text-yellow-400 transition-colors relative z-10 backdrop-blur-sm bg-gray-800/20 rounded-full"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Navigation Menu - More transparent */}
      {menuOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="md:hidden flex flex-col items-center py-6 space-y-6 shadow-inner w-full relative z-10"
          style={{
            background: "rgba(13, 18, 30, 0.5)",
            backdropFilter: "blur(8px)",
            borderBottom: "1px solid rgba(100, 149, 237, 0.05)"
          }}
        >
          {sections.map((section) => (
            <button
              key={section}
              onClick={() => handleScrollToSection(section)}
              className={`w-3/4 py-3 text-lg font-semibold text-center transition-all duration-300 rounded-full relative overflow-hidden ${
                activeSection === section
                  ? "text-yellow-400"
                  : "text-white hover:text-yellow-400"
              }`}
            >
              <span className={`absolute inset-0 ${
                activeSection === section 
                  ? "bg-gradient-to-r from-blue-500/5 to-yellow-500/5" 
                  : "bg-gray-800/20 hover:bg-gray-700/20"
              } transition-all duration-300`}></span>
              <span className="relative">{section.charAt(0).toUpperCase() + section.slice(1)}</span>
            </button>
          ))}
          <motion.a
            href="/IdrissaMaigaCV.pdf"
            download
            whileHover={{ scale: 1.05 }}
            className="w-3/4 py-3 text-center text-white rounded-full shadow-lg transition-all duration-300 relative overflow-hidden"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-yellow-500 opacity-70"></span>
            <span className="relative z-10">Download CV</span>
          </motion.a>
        </motion.div>
      )}

      <style jsx global>{`
        @keyframes spin-slow {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </motion.nav>
  );
};

export default Navbar;