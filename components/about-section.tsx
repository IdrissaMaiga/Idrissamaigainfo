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
                      I'm a Full-Stack Developer and Junior Java Engineer with over 5 years of experience
                      in building robust web applications and digital solutions. My journey began in Bamako, Mali,
                      where I discovered my passion for technology and problem-solving.
                    </p>
                    <p>
                      I specialize in Java, Spring Boot, and modern web technologies like React.js and Node.js.
                      My expertise extends to database management with MySQL and PostgreSQL, as well as cloud
                      technologies using AWS.
                    </p>
                    <p>
                      I'm passionate about creating technology-driven solutions that make a real impact.
                      I enjoy working on projects that challenge me to learn and grow, particularly in AI
                      development and cloud technologies.
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
                        BSc in Computer Science
                      </h4>
                      <p className="text-blue-600 dark:text-blue-400 mb-1 text-sm sm:text-base">
                        Obuda University, Budapest | 2023 - 2027 (Expected)
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                        GPA: 8.7/10
                        <br />
                        Focusing on software engineering, data structures, algorithms, and
                        AI development methodologies.
                      </p>
                    </div>

                    <div className="relative pl-6 sm:pl-8 border-l-2 border-blue-200 dark:border-blue-800">
                      <div className="absolute w-3 h-3 sm:w-4 sm:h-4 bg-blue-600 dark:bg-blue-400 rounded-full -left-[7px] sm:-left-[9px] top-0"></div>
                      <h4 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200">
                        Technical Certifications
                      </h4>
                      <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 mt-1 sm:mt-2 space-y-1 text-sm sm:text-base">
                        <li>Spring Boot & Spring Cloud Professional</li>
                        <li>Full-Stack Web Development</li>
                        <li>ASP.NET Core Developer</li>
                        <li>Cisco Networking Fundamentals</li>
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
                        Junior Java Engineer
                      </h4>
                      <p className="text-blue-600 dark:text-blue-400 mb-1 text-sm sm:text-base">
                        TechSolutions Inc. | 2022 - Present
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                        Developing and maintaining Java-based applications and RESTful APIs. Working with Spring Boot,
                        MySQL, and AWS. Collaborating in an agile team on digital transformation projects.
                      </p>
                    </div>

                    <div className="relative pl-6 sm:pl-8 border-l-2 border-blue-200 dark:border-blue-800">
                      <div className="absolute w-3 h-3 sm:w-4 sm:h-4 bg-blue-600 dark:bg-blue-400 rounded-full -left-[7px] sm:-left-[9px] top-0"></div>
                      <h4 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200">
                        Freelance Web Developer
                      </h4>
                      <p className="text-blue-600 dark:text-blue-400 mb-1 text-sm sm:text-base">
                        Self-employed | 2019 - 2022
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                        Designed and developed websites and web applications for various clients. Technologies used included
                        React.js, Node.js, and MongoDB. Projects ranged from e-commerce sites to custom CRM systems.
                      </p>
                    </div>

                    <div className="relative pl-6 sm:pl-8 border-l-2 border-blue-200 dark:border-blue-800">
                      <div className="absolute w-3 h-3 sm:w-4 sm:h-4 bg-blue-600 dark:bg-blue-400 rounded-full -left-[7px] sm:-left-[9px] top-0"></div>
                      <h4 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200">
                        Programming Intern
                      </h4>
                      <p className="text-blue-600 dark:text-blue-400 mb-1 text-sm sm:text-base">
                        LocalTech Startup | 2018 - 2019
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                        Assisted the development team with code refactoring and feature implementation.
                        Learned best practices for software development and version control.
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