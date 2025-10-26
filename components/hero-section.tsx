"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { FiGithub, FiLinkedin, FiMail, FiArrowRight } from "react-icons/fi";

// Typing animation effect
const titles = [
  "Full Stack Engineer",
  "Software Developer",
  "AI Solutions Architect",
  "Java Ecosystem Expert",
  "Cloud-Native Developer",
];

export default function HeroSection() {
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayedTitle, setDisplayedTitle] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    // Typing animation logic
    const currentTitle = titles[titleIndex];

    // Handle typing and deleting
    const timer = setTimeout(() => {
      // When deleting
      if (isDeleting) {
        setDisplayedTitle(currentTitle.substring(0, displayedTitle.length - 1));
        setTypingSpeed(50); // Faster when deleting

        // If empty, change to typing mode and go to next title
        if (displayedTitle.length === 0) {
          setIsDeleting(false);
          setTitleIndex((titleIndex + 1) % titles.length);
          setTypingSpeed(150); // Reset typing speed
        }
      }
      // When typing
      else {
        setDisplayedTitle(currentTitle.substring(0, displayedTitle.length + 1));

        // If complete, pause, then start deleting
        if (displayedTitle.length === currentTitle.length) {
          setTypingSpeed(2000); // Pause at the end
          setTimeout(() => setIsDeleting(true), 2000);
        } else {
          setTypingSpeed(150); // Normal typing speed
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayedTitle, isDeleting, titleIndex, typingSpeed]);

  return (
    <section
      id="home"
      className="min-h-screen flex items-center relative pt-20 overflow-hidden"
    >
      {/* Decorative gradients */}
      <div className="blur-circle blur-primary w-96 h-96 -top-48 -left-48 opacity-60"></div>
      <div className="blur-circle blur-secondary w-96 h-96 top-1/4 right-0 opacity-40"></div>

      <div className="container mx-auto px-4 md:px-6 py-12 flex flex-col md:flex-row items-center justify-between relative z-10">
        {/* Hero content */}
        <motion.div
          className="w-full md:w-3/5 mb-12 md:mb-0"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="inline-block px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium mb-6">
            Hello, I&apos;m Idrissa Maiga
          </span>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Building digital experiences with
            <span className="gradient-text gradient-text-primary"> passion</span> and
            <span className="gradient-text gradient-text-accent"> precision</span>
          </h1>

          <div className="h-8 mb-8">
            <span className="text-xl font-medium font-mono text-gray-700 dark:text-gray-300">
              {displayedTitle}
              <span className="inline-block w-1 h-6 bg-blue-500 dark:bg-blue-400 ml-1 animate-pulse"></span>
            </span>
          </div>

          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-xl">
            Transforming ideas into robust, elegant solutions with modern
            technologies and a focus on performance, security, and user experience.
          </p>

          <div className="flex flex-wrap gap-4">
            <a href="#projects" className="btn btn-primary">
              View Projects
              <FiArrowRight className="ml-2" />
            </a>

            <a href="#contact" className="btn btn-outline">
              Get In Touch
            </a>
          </div>

          <div className="flex mt-10 space-x-5">
            <a
              href="https://github.com/IdrissaMaiga"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
              aria-label="GitHub"
            >
              <FiGithub className="w-6 h-6" />
            </a>
            <a
              href="https://linkedin.com/in/idrissa-maiga"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
              aria-label="LinkedIn"
            >
              <FiLinkedin className="w-6 h-6" />
            </a>
            <a
              href="mailto:maigadrisking@gmail.com"
              className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
              aria-label="Email"
            >
              <FiMail className="w-6 h-6" />
            </a>
          </div>
        </motion.div>

        {/* Hero image */}
        <motion.div
          className="w-full md:w-2/5 flex justify-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 animate-float">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 blur-lg opacity-70"></div>
            <div className="absolute inset-0 rounded-full overflow-hidden bg-white dark:bg-gray-900 p-2">
              <div className="absolute inset-0 rounded-full overflow-hidden">
                <Image
                  src="/logos/id_.jpg"
                  alt="Idrissa Maiga"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-transparent"></div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Wave divider */}
      <div className="wave">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
        </svg>
      </div>
    </section>
  );
}