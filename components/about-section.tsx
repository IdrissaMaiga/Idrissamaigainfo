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
    <section id="about" className="py-20 relative bg-gray-50 dark:bg-gray-900">
      {/* Decorative elements */}
      <div className="blur-circle blur-secondary w-96 h-96 bottom-0 -right-48 opacity-30"></div>
      
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 text-center"
        >
          <span className="px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium">
            About Me
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6">
            Get to know me better
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-400">
            A passionate full-stack developer with focus on creating impactful digital solutions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Left column - Personal info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="card p-6 h-full">
              <div className="mb-6 inline-flex items-center justify-center p-2 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                <FiUser className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-4">Personal Info</h3>
              
              <ul className="space-y-4 text-gray-600 dark:text-gray-400">
                <li className="flex items-start">
                  <span className="font-semibold mr-2 min-w-28">Name:</span>
                  <span>Idrissa Maiga</span>
                </li>
                <li className="flex items-start">
                  <span className="font-semibold mr-2 min-w-28">Born in:</span>
                  <span>Bamako, Mali</span>
                </li>
                <li className="flex items-start">
                  <span className="font-semibold mr-2 min-w-28">Languages:</span>
                  <div className="flex flex-col space-y-1">
                    <span className="flex items-center">
                      <FiGlobe className="mr-1" /> English (Fluent)
                    </span>
                    <span className="flex items-center">
                      <FiGlobe className="mr-1" /> French (Native)
                    </span>
                    <span className="flex items-center">
                      <FiGlobe className="mr-1" /> Hungarian (Beginner)
                    </span>
                    <span className="flex items-center">
                      <FiGlobe className="mr-1" /> Bambara (Native)
                    </span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="font-semibold mr-2 min-w-28">Location:</span>
                  <span className="flex items-center">
                    <FiMapPin className="mr-1" /> Budapest, Hungary
                  </span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Center column - Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true, margin: "-100px" }}
            className="md:col-span-2"
          >
            <div className="card p-6 h-full flex flex-col">
              {/* Tab navigation */}
              <div className="flex border-b border-gray-200 dark:border-gray-800 mb-6">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center py-3 px-4 border-b-2 font-medium text-sm transition-colors relative ${
                      activeTab === tab.id
                        ? "border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400"
                        : "border-transparent text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                    }`}
                  >
                    <span className="mr-2">{tab.icon}</span>
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
                    className="space-y-4 text-gray-600 dark:text-gray-400"
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
                    className="space-y-6"
                  >
                    <div className="relative pl-8 border-l-2 border-blue-200 dark:border-blue-800">
                      <div className="absolute w-4 h-4 bg-blue-600 dark:bg-blue-400 rounded-full -left-[9px] top-0"></div>
                      <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                        BSc in Computer Science
                      </h4>
                      <p className="text-blue-600 dark:text-blue-400 mb-1">
                        Obuda University, Budapest | 2023 - 2027 (Expected)
                      </p>
                      <p className="text-gray-600 dark:text-gray-400">
                        GPA: 8.7/10 
                        <br />
                        Focusing on software engineering, data structures, algorithms, and
                        AI development methodologies.
                      </p>
                    </div>
                    
                    <div className="relative pl-8 border-l-2 border-blue-200 dark:border-blue-800">
                      <div className="absolute w-4 h-4 bg-blue-600 dark:bg-blue-400 rounded-full -left-[9px] top-0"></div>
                      <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                        Technical Certifications
                      </h4>
                      <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 mt-2 space-y-1">
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
                    className="space-y-6"
                  >
                    <div className="relative pl-8 border-l-2 border-blue-200 dark:border-blue-800">
                      <div className="absolute w-4 h-4 bg-blue-600 dark:bg-blue-400 rounded-full -left-[9px] top-0"></div>
                      <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                        Junior Java Engineer
                      </h4>
                      <p className="text-blue-600 dark:text-blue-400 mb-1">
                        TechSolutions Inc. | 2022 - Present
                      </p>
                      <p className="text-gray-600 dark:text-gray-400">
                        Developing and maintaining Java-based applications and RESTful APIs. Working with Spring Boot, 
                        MySQL, and AWS. Collaborating in an agile team on digital transformation projects.
                      </p>
                    </div>
                    
                    <div className="relative pl-8 border-l-2 border-blue-200 dark:border-blue-800">
                      <div className="absolute w-4 h-4 bg-blue-600 dark:bg-blue-400 rounded-full -left-[9px] top-0"></div>
                      <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                        Freelance Web Developer
                      </h4>
                      <p className="text-blue-600 dark:text-blue-400 mb-1">
                        Self-employed | 2019 - 2022
                      </p>
                      <p className="text-gray-600 dark:text-gray-400">
                        Designed and developed websites and web applications for various clients. Technologies used included 
                        React.js, Node.js, and MongoDB. Projects ranged from e-commerce sites to custom CRM systems.
                      </p>
                    </div>
                    
                    <div className="relative pl-8 border-l-2 border-blue-200 dark:border-blue-800">
                      <div className="absolute w-4 h-4 bg-blue-600 dark:bg-blue-400 rounded-full -left-[9px] top-0"></div>
                      <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                        Programming Intern
                      </h4>
                      <p className="text-blue-600 dark:text-blue-400 mb-1">
                        LocalTech Startup | 2018 - 2019
                      </p>
                      <p className="text-gray-600 dark:text-gray-400">
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