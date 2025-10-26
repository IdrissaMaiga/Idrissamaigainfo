"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FiCode, FiUser, FiAward, FiMapPin, FiGlobe } from "react-icons/fi";

const tabs = [
  { id: "background", label: "Background", icon: <FiUser /> },
  { id: "education", label: "Education", icon: <FiAward /> },
  { id: "experience", label: "Experience", icon: <FiCode /> },
];

export default function AboutSection() {
  const [activeTab, setActiveTab] = useState("background");

  return (
    <section
      id="about"
      className="py-12 sm:py-16 lg:py-20 relative bg-gray-50 dark:bg-gray-900 safe-area-inset"
    >
      {/* Decorative elements */}
      <div className="blur-circle blur-secondary w-64 h-64 sm:w-96 sm:h-96 bottom-0 -right-32 sm:-right-48 opacity-20 sm:opacity-30"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-50px" }}
          className="mb-8 sm:mb-12 text-center"
        >
          <span className="px-3 py-1 sm:px-4 sm:py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs sm:text-sm font-medium">
            About Me
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-3 sm:mt-4 mb-4 sm:mb-6">
            Get to know me better
          </h2>
          <p className="max-w-xl sm:max-w-2xl mx-auto text-sm sm:text-base text-gray-600 dark:text-gray-400">
            A passionate full-stack developer with focus on creating impactful digital solutions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {/* Left column - Personal info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <div className="card p-4 sm:p-6 h-full">
              <div className="mb-4 sm:mb-6 inline-flex items-center justify-center p-1.5 sm:p-2 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                <FiUser className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Personal Info</h3>

              <ul className="space-y-3 sm:space-y-4 text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                <li className="flex items-start">
                  <span className="font-semibold mr-2 min-w-24 sm:min-w-28">Name:</span>
                  <span>Idrissa Maiga</span>
                </li>
                <li className="flex items-start">
                  <span className="font-semibold mr-2 min-w-24 sm:min-w-28">Born in:</span>
                  <span>Bamako, Mali</span>
                </li>
                <li className="flex items-start">
                  <span className="font-semibold mr-2 min-w-24 sm:min-w-28">Languages:</span>
                  <div className="flex flex-col space-y-1">
                    <span className="flex items-center">
                      <FiGlobe className="mr-1 w-4 h-4 sm:w-5 sm:h-5" /> English (Fluent)
                    </span>
                    <span className="flex items-center">
                      <FiGlobe className="mr-1 w-4 h-4 sm:w-5 sm:h-5" /> French (Native)
                    </span>
                    <span className="flex items-center">
                      <FiGlobe className="mr-1 w-4 h-4 sm:w-5 sm:h-5" /> Hungarian (Beginner)
                    </span>
                    <span className="flex items-center">
                      <FiGlobe className="mr-1 w-4 h-4 sm:w-5 sm:h-5" /> Bambara (Native)
                    </span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="font-semibold mr-2 min-w-24 sm:min-w-28">Location:</span>
                  <span className="flex items-center">
                    <FiMapPin className="mr-1 w-4 h-4 sm:w-5 sm:h-5" /> Budapest, Hungary
                  </span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Center column - Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true, margin: "-50px" }}
            className="md:col-span-2"
          >
            <div className="card p-4 sm:p-6 h-full flex flex-col">
              {/* Tab navigation */}
              <div className="flex flex-wrap border-b border-gray-200 dark:border-gray-800 mb-4 sm:mb-6">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center py-2 sm:py-3 px-3 sm:px-4 border-b-2 font-medium text-xs sm:text-sm transition-colors relative touch-friendly ${
                      activeTab === tab.id
                        ? "border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400"
                        : "border-transparent text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                    }`}
                  >
                    <span className="mr-1 sm:mr-2 w-4 h-4 sm:w-5 sm:h-5">{tab.icon}</span>
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab content */}
              <div className="flex-1">
                {activeTab === "background" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-3 sm:space-y-4 text-gray-600 dark:text-gray-400 text-sm sm:text-base"
                  >
                    <p>
                      Results-driven Full Stack Software Developer with 5+ years of hands-on experience building scalable, high-performance
                      web applications and AI-powered solutions. Expert in Java ecosystem, MERN/MEVN stack, React Native mobile
                      development, and cloud-native architectures.
                    </p>
                    <p>
                      Proven track record delivering enterprise-grade applications for EU institutions and innovation platforms.
                      Specialized in microservices architecture, RESTful API design, real-time data processing, and AI/ML integration.
                      Strong foundation in algorithmic problem-solving, system design, and agile development methodologies.
                    </p>
                    <p>
                      Currently pursuing B.Sc. in Computer Science Engineering (GPA: 8.7/10) while maintaining active development
                      portfolio at creator.iditechs.com. Multilingual professional fluent in English, French, and Bambara.
                    </p>
                  </motion.div>
                )}

                {activeTab === "education" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4 sm:space-y-6"
                  >
                    <div className="relative pl-6 sm:pl-8 border-l-2 border-blue-200 dark:border-blue-800">
                      <div className="absolute w-3 h-3 sm:w-4 sm:h-4 bg-blue-600 dark:bg-blue-400 rounded-full -left-[7px] sm:-left-[9px] top-0"></div>
                      <h4 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200">
                        BSc in Computer Science Engineering
                      </h4>
                      <p className="text-blue-600 dark:text-blue-400 mb-1 text-sm sm:text-base">
                        Óbuda University (Óbudai Egyetem), Budapest, Hungary | Sep 2022 – Expected Feb 2027
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                        GPA: 8.7/10 | Coursework: Data Structures, Algorithms, Database Systems, Web Technologies, Software Engineering
                        <br />
                        Activities: Web Development Club, Competitive Programming, University Running Team, International Student Mentor
                      </p>
                    </div>

                    <div className="relative pl-6 sm:pl-8 border-l-2 border-blue-200 dark:border-blue-800">
                      <div className="absolute w-3 h-3 sm:w-4 sm:h-4 bg-blue-600 dark:bg-blue-400 rounded-full -left-[7px] sm:-left-[9px] top-0"></div>
                      <h4 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200">
                        Professional Certifications
                      </h4>
                      <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 mt-1 sm:mt-2 space-y-1 text-sm sm:text-base">
                        <li>HÖOK SHMN Mentor Camp 2025 – Hungarian Student Leadership & Mentorship Program</li>
                        <li>INDUSAC Co-Creation Project Certificate – Innovation Ecosystem Development</li>
                        <li>Spring Boot and Microservices Development – Comprehensive Backend Architecture</li>
                        <li>Full-Stack Web Development with JavaScript – MERN Stack Specialization</li>
                        <li>ASP.NET Core with Orchard Core CMS – Advanced .NET Development</li>
                        <li>Cisco Networking Certification (CCNA) – Network Fundamentals</li>
                        <li>Kennedy Lugar YES Program Scholar – Cultural Exchange Program, USA</li>
                      </ul>
                    </div>
                  </motion.div>
                )}

                {activeTab === "experience" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4 sm:space-y-6"
                  >
                    <div className="relative pl-6 sm:pl-8 border-l-2 border-blue-200 dark:border-blue-800">
                      <div className="absolute w-3 h-3 sm:w-4 sm:h-4 bg-blue-600 dark:bg-blue-400 rounded-full -left-[7px] sm:-left-[9px] top-0"></div>
                      <h4 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200">
                        Software Developer Intern
                      </h4>
                      <p className="text-blue-600 dark:text-blue-400 mb-1 text-sm sm:text-base">
                        4D Consulting Kft., Budapest, Hungary | Aug 2025 – Present
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                        Leading development of INDUSAC Innovation Ecosystem Matchmaking Platform connecting startups, investors,
                        and research institutions across European innovation markets. Architecting scalable microservices backend
                        using Spring Boot with PostgreSQL, implementing intelligent matching algorithms.
                      </p>
                    </div>

                    <div className="relative pl-6 sm:pl-8 border-l-2 border-blue-200 dark:border-blue-800">
                      <div className="absolute w-3 h-3 sm:w-4 sm:h-4 bg-blue-600 dark:bg-blue-400 rounded-full -left-[7px] sm:-left-[9px] top-0"></div>
                      <h4 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200">
                        Full Stack Engineer
                      </h4>
                      <p className="text-blue-600 dark:text-blue-400 mb-1 text-sm sm:text-base">
                        European Innovation Council and SMEs Executive Agency (EISMEA), Hungary | Jan 2025 – Jul 2025
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                        Developed horizoneurope.io, AI-powered EU funding guidance platform serving 5,000+ monthly users.
                        Engineered smart context management engine processing 500+ funding opportunities with NLP-based categorization.
                        Built document processing system for automated parsing of EU funding calls and application templates.
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}