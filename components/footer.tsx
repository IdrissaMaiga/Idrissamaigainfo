"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiMail, FiArrowUp, FiHeart } from "react-icons/fi";

export default function Footer() {
  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white relative overflow-hidden">
      {/* Scroll to top button */}
      <div className="container mx-auto px-4 py-10 flex justify-center">
        <motion.button
          onClick={scrollToTop}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="bg-blue-600 dark:bg-blue-500 rounded-full p-4 shadow-lg relative -top-6 hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
          aria-label="Scroll to top"
        >
          <FiArrowUp className="w-6 h-6" />
        </motion.button>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 pt-10 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Logo & About */}
          <div className="md:col-span-1">
            <Link href="#home" className="flex items-center mb-4 group">
              <div className="relative w-10 h-10 overflow-hidden rounded-full mr-3">
                <Image
                  src="/logos/id_.jpg"
                  alt="Idrissa Maiga"
                  width={80}
                  height={80}
                  className="scale-110 rounded-full"
                />
              </div>
              <div>
                <span className="text-xl font-bold gradient-text gradient-text-primary">
                  Idrissa Maiga
                </span>
              </div>
            </Link>
            <p className="text-gray-400 text-sm mb-6">
              Full-stack developer specializing in Java, Spring Boot, and modern web technologies.
              Creating robust, scalable applications with a focus on performance and user experience.
            </p>
            
            <div className="flex space-x-4">
              <a
                href="https://github.com/IdrissaMaiga"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <FiGithub className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/idrissa-maiga-16581b245/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <FiLinkedin className="w-5 h-5" />
              </a>
              <a
                href="mailto:maigadrisking@gmail.com"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Email"
              >
                <FiMail className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="md:col-span-1">
            <h3 className="text-xl font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {["Home", "About", "Projects", "Skills", "Contact"].map((item) => (
                <li key={item}>
                  <Link 
                    href={`#${item.toLowerCase()}`} 
                    className="text-gray-400 hover:text-white transition-colors flex items-center"
                  >
                    <span className="mr-2 text-blue-400">›</span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Services */}
          <div className="md:col-span-1">
            <h3 className="text-xl font-bold mb-6">Services</h3>
            <ul className="space-y-3">
              {[
                "Web Development", 
                "Mobile Apps", 
                "API Development",
                "Database Design",
                "Cloud Solutions"
              ].map((item) => (
                <li key={item}>
                  <Link 
                    href="#contact" 
                    className="text-gray-400 hover:text-white transition-colors flex items-center"
                  >
                    <span className="mr-2 text-blue-400">›</span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact */}
          <div className="md:col-span-1">
            <h3 className="text-xl font-bold mb-6">Contact</h3>
            <ul className="space-y-3 text-gray-400">
              <li>
                Budapest, Hungary
              </li>
              <li>
                <a 
                  href="mailto:maigadrisking@gmail.com" 
                  className="hover:text-white transition-colors"
                >
                  maigadrisking@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/IdrissaMaiga"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  github.com/IdrissaMaiga
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm text-center md:text-left mb-4 md:mb-0">
            © {new Date().getFullYear()} Idrissa Maiga. All rights reserved.
          </div>
          <div className="text-gray-400 text-sm flex items-center">
            Made with <FiHeart className="text-red-500 mx-1" /> in Budapest
          </div>
        </div>
      </div>
    </footer>
  );
}