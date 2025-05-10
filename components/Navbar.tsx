"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { FiMenu, FiX, FiDownload, FiSun, FiMoon, FiUpload } from "react-icons/fi";
import { useTheme } from "./theme-provider";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [uploadCode, setUploadCode] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { theme, setTheme } = useTheme();

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setScrolled(scrollPosition > 10);

      const sections = navLinks.map((link) => link.href.substring(1));
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Toggle theme
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  // Handle CV upload
  const handleCVUpload = async () => {
    if (!selectedFile || selectedFile.type !== "application/pdf") {
      alert("Please select a valid PDF file.");
      return;
    }

    if (!uploadCode) {
      alert("Upload code is required.");
      return;
    }

    const formData = new FormData();
    formData.append("cv", selectedFile);
    formData.append("code", uploadCode);

    try {
      const response = await fetch("/api/cv", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        alert(result.message);
        setShowCodeModal(false);
        setUploadCode("");
        setSelectedFile(null);
      } else {
        alert(result.error || "Failed to upload CV");
      }
    } catch (error) {
      console.error("Error uploading CV:", error);
      alert("An error occurred while uploading the CV");
    }
  };

  // Handle file selection
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setShowCodeModal(true);
    }
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "py-2 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-md"
          : "py-4 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Logo & Name */}
        <Link
          href="#home"
          className="flex items-center space-x-3 group"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div className="relative w-10 h-10 overflow-hidden rounded-full transition-all duration-300 border-2 border-blue-500 dark:border-blue-400 group-hover:border-amber-500 dark:group-hover:border-amber-400">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-cyan-500 dark:from-blue-500 dark:to-cyan-400 opacity-60 group-hover:opacity-0 transition-opacity duration-300" />
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-red-500 dark:from-amber-400 dark:to-red-400 opacity-0 group-hover:opacity-60 transition-opacity duration-300" />
            <Image
              src="/logos/id_.jpg"
              alt="Idrissa Maiga"
              width={80}
              height={80}
              className="scale-110 rounded-full"
            />
          </div>
          <div>
            <span className="text-base md:text-lg font-bold tracking-tight group-hover:translate-x-0.5 transition-all duration-300 gradient-text gradient-text-primary">
              Idrissa Maiga
            </span>
            <span className="block text-xs text-gray-500 dark:text-gray-400 font-mono">
              Full-Stack Developer
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center">
          <ul className="flex space-x-1">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 relative ${
                    activeSection === link.href.substring(1)
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                  }`}
                >
                  {link.name}
                  {activeSection === link.href.substring(1) && (
                    <motion.span
                      layoutId="activeSection"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2 md:space-x-4">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
          </button>

          {/* Resume Download Button */}
          <a
            href="/IdrissaMaigaCV.pdf"
            download
            className="hidden sm:flex items-center space-x-2 px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
          >
            <FiDownload className="w-4 h-4" />
            <span className="font-medium">Resume</span>
          </a>

          {/* CV Upload Button */}
          <label
            htmlFor="cv-upload"
            className="hidden sm:flex items-center space-x-2 px-4 py-2 bg-green-600 dark:bg-green-500 text-white rounded-lg hover:bg-green-700 dark:hover:bg-green-600 transition-colors cursor-pointer"
          >
            <FiUpload className="w-4 h-4" />
            <span className="font-medium">Upload CV</span>
          </label>
          <input
            id="cv-upload"
            type="file"
            accept="application/pdf"
            onChange={handleFileSelect}
            className="hidden"
          />

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <FiX className="w-5 h-5" />
            ) : (
              <FiMenu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-lg"
          >
            <nav className="container mx-auto px-4 py-4">
              <ul className="space-y-3">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                        activeSection === link.href.substring(1)
                          ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                          : "hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <a
                    href="/IdrissaMaigaCV.pdf"
                    download
                    className="flex items-center space-x-2 px-4 py-3 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <FiDownload className="w-4 h-4" />
                    <span className="font-medium">Download Resume</span>
                  </a>
                </li>
                <li>
                  <label
                    htmlFor="cv-upload-mobile"
                    className="flex items-center space-x-2 px-4 py-3 bg-green-600 dark:bg-green-500 text-white rounded-lg hover:bg-green-700 dark:hover:bg-green-600 transition-colors cursor-pointer"
                  >
                    <FiUpload className="w-4 h-4" />
                    <span className="font-medium">Upload CV</span>
                  </label>
                  <input
                    id="cv-upload-mobile"
                    type="file"
                    accept="application/pdf"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </li>
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Code Input Modal */}
      <AnimatePresence>
        {showCodeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-sm w-full"
            >
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Enter Upload Code
              </h2>
              <input
                type="password"
                value={uploadCode}
                onChange={(e) => setUploadCode(e.target.value)}
                className="w-full p-2 border rounded-lg mb-4 text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                placeholder="Enter code"
              />
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => {
                    setShowCodeModal(false);
                    setUploadCode("");
                    setSelectedFile(null);
                  }}
                  className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-900 dark:text-gray-100 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCVUpload}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Upload
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}