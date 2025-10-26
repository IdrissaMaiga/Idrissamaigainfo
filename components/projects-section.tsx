"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { 
  FiExternalLink, 
  FiGithub, 
  FiCode, 
  FiLayers, 
  FiServer, 
  FiDatabase, 
  FiLayout,
  FiChevronLeft,
  FiChevronRight,
  FiShare2,
  FiInfo,
  FiBox
} from "react-icons/fi";
import { 
  SiReact,
  SiNodedotjs,
  SiMongodb,
  SiFirebase,
  SiExpress,
  SiSocketdotio,
  SiTypescript,
  SiTailwindcss,
  SiStripe,
  SiSpring,
  SiMysql,
  SiAmazon,
  SiDocker
} from "react-icons/si";// Project data with detailed information
const projects = [
  {
    id: "indusac",
    title: "INDUSAC Innovation Ecosystem Matchmaking Platform",
    shortDesc: "Comprehensive B2B matchmaking platform connecting startups, investors, accelerators, and corporate partners across European innovation markets.",
    description: `
      INDUSAC is a sophisticated innovation ecosystem platform designed to facilitate connections between startups, investors, research institutions, and corporate partners. The platform uses intelligent matching algorithms to create meaningful partnerships that drive innovation and economic growth across European markets.
      
      This project was developed as part of my internship at 4D Consulting Kft., focusing on creating a scalable solution for the European innovation landscape. The platform handles complex matchmaking scenarios with intelligent algorithms that consider multiple parameters for optimal connections.
    `,
    image: "/logos/HorizonEurope Home.png",
    additionalImages: ["/logos/HorizonEurope Login.png"],
    imageAlt: "INDUSAC Innovation Platform",
    techStack: [
      { name: "Spring Boot", icon: <SiSpring /> },
      { name: "PostgreSQL", icon: <SiMysql /> },
      { name: "React.js", icon: <SiReact /> },
      { name: "TypeScript", icon: <SiTypescript /> },
      { name: "AWS", icon: <SiAmazon /> },
      { name: "Docker", icon: <SiDocker /> }
    ],
    features: [
      "Intelligent matchmaking algorithm considering 20+ parameters",
      "Real-time messaging system using WebSockets",
      "Advanced filtering and search capabilities",
      "Admin dashboard with analytics and metrics",
      "RESTful API for third-party integrations",
      "Stripe payment processing for premium features"
    ],
    challenges: [
      "Developing sophisticated matching algorithms",
      "Handling large datasets with 10,000+ user profiles",
      "Ensuring real-time performance with sub-200ms response times",
      "Implementing secure third-party integrations"
    ],
    solution: `
      I implemented a multi-factor matching algorithm that analyzes industry verticals, funding stages, and strategic objectives. The backend uses Spring Boot with PostgreSQL for robust data management, while Redis provides caching for optimal performance.
      
      The frontend leverages React.js with TypeScript for type safety and better developer experience. WebSocket integration enables real-time communication between matched parties, creating an interactive platform for innovation collaboration.
    `,
    githubLink: "#",
    liveLink: "#"
  },
  {
    id: "gmail-ai",
    title: "Gmail AI Assistance - Intelligent Email Management",
    shortDesc: "AI-powered Gmail management system automating email categorization, priority detection, and response generation.",
    description: `
      Gmail AI Assistance is an intelligent email management platform that leverages advanced AI models to streamline email workflows. The system automatically categorizes emails, detects priorities, and generates personalized responses using cutting-edge language models.
      
      This project demonstrates the practical application of AI in productivity tools, combining Google OAuth integration with multiple AI services to create a comprehensive email management solution.
    `,
    image: "/logos/gmail.png",
    additionalImages: [],
    imageAlt: "Gmail AI Assistance",
    techStack: [
      { name: "Next.js", icon: <SiReact /> },
      { name: "TypeScript", icon: <SiTypescript /> },
      { name: "Google OAuth", icon: <SiFirebase /> },
      { name: "DeepSeek R1", icon: <FiBox /> },
      { name: "Mistral AI", icon: <FiBox /> },
      { name: "Tailwind CSS", icon: <SiTailwindcss /> }
    ],
    features: [
      "Secure Google OAuth 2.0 authentication",
      "AI-powered email categorization and prioritization",
      "Smart response generation with multiple AI models",
      "Batch processing handling 1,000+ emails",
      "Intelligent rate limiting and API optimization",
      "Comprehensive analytics dashboard"
    ],
    challenges: [
      "Integrating multiple AI services efficiently",
      "Managing API rate limits and costs",
      "Ensuring data privacy and security",
      "Processing large volumes of emails"
    ],
    solution: `
      I implemented a hybrid AI approach combining DeepSeek R1 and Mistral AI for optimal performance. The system uses intelligent caching and batch processing to handle large email volumes while staying within API limits.
      
      Secure OAuth integration ensures user data privacy, while the responsive UI built with Next.js and Tailwind CSS provides an intuitive experience for managing complex email workflows.
    `,
    githubLink: "#",
    liveLink: "#"
  },
  {
    id: "signalapp",
    title: "SignalApp - Trading Signals Platform",
    shortDesc: "Real-time trading signals platform providing market insights and secure authentication for traders.",
    description: `
      SignalApp is a trading signals platform that delivers real-time market insights to traders across various financial instruments. The application combines powerful technical analysis with robust security features to provide a reliable trading companion.
      
      This project was born from my interest in financial markets and the need for a reliable signals platform that traders could trust. The main goal was to create an application that delivered accurate signals while maintaining a clean, intuitive interface.
    `,
    image: "/logos/signal.png",
    additionalImages: [],
    imageAlt: "SignalApp Trading Platform",
    techStack: [
      { name: "React Native", icon: <SiReact /> },
      { name: "Firebase", icon: <SiFirebase /> },
      { name: "TypeScript", icon: <SiTypescript /> },
      { name: "Real-time Database", icon: <FiDatabase /> },
      { name: "OAuth", icon: <FiServer /> },
      { name: "TailwindCSS", icon: <SiTailwindcss /> }
    ],
    features: [
      "Real-time market signals and alerts with configurable notifications",
      "Technical analysis indicators with visual representations",
      "User customizable watchlists and alert conditions",
      "Push notifications for critical signals and price targets",
      "Historical performance tracking and analysis",
      "Multi-source data verification for signal accuracy"
    ],
    challenges: [
      "Ensuring signal delivery with minimal latency",
      "Managing real-time data synchronization across devices",
      "Implementing accurate technical analysis indicators",
      "Balancing information density with UI clarity"
    ],
    solution: `
      I implemented a WebSocket-based communication system to ensure real-time signal delivery with minimal latency. The signal generation engine uses a multi-factor verification approach, combining various indicators to filter out false signals.
      
      For the UI, I adopted a card-based design with collapsible sections, allowing users to focus on their preferred markets while maintaining access to comprehensive data. Firebase was utilized for authentication and real-time data synchronization, ensuring a consistent experience across devices.
    `,
    githubLink: "https://github.com/IdrissaMaiga/SignalApp",
    liveLink: "#"
  },
  {
    id: "filmu",
    title: "Filmu - Video-on-Demand Streaming Platform",
    shortDesc: "A comprehensive VOD platform with 10,000+ video library serving 500+ concurrent users with 99.8% uptime.",
    description: `
      Filmu is a comprehensive VOD streaming platform designed to provide users with a Netflix-like experience. The application offers personalized content recommendations based on user viewing history and preferences, along with robust user authentication and profile management.
      
      This project was developed to combine my passion for video streaming solutions with modern mobile development technologies. It presented several technical challenges, particularly in implementing adaptive video streaming with efficient caching mechanisms.
    `,
    image: "/logos/Filmu.png",
    additionalImages: [],
    imageAlt: "Filmu VOD Platform",
    techStack: [
      { name: "React Native", icon: <SiReact /> },
      { name: "Node.js", icon: <SiNodedotjs /> },
      { name: "Express.js", icon: <SiExpress /> },
      { name: "MongoDB", icon: <SiMongodb /> },
      { name: "AWS S3", icon: <SiAmazon /> },
      { name: "Redis", icon: <SiMongodb /> }
    ],
    features: [
      "Personalized content recommendations using collaborative filtering, increasing user engagement by 45%",
      "Secure JWT authentication with role-based access control (RBAC) for users, creators, and administrators",
      "Adaptive video streaming with HLS/DASH and CDN integration",
      "CMS enabling creators to upload, edit, and monetize content with analytics dashboard",
      "Stripe integration for subscription management, pay-per-view transactions, and creator payouts",
      "Offline viewing capability with encrypted local storage for premium users",
      "Cross-platform mobile app (iOS/Android) with 95% code reusability"
    ],
    challenges: [
      "Implementing efficient video streaming with minimal buffering",
      "Designing a recommendation engine that provides relevant content",
      "Ensuring user data security and privacy compliance",
      "Optimizing app performance for older mobile devices"
    ],
    solution: `
      I developed a custom recommendation algorithm that analyzes viewing patterns and content metadata. For video streaming, I implemented a chunked delivery system with adaptive bitrate selection based on network conditions.
      
      User authentication was handled using JWT tokens with refresh token rotation, ensuring both security and a seamless user experience. The mobile app was extensively optimized to minimize resource usage while maintaining a smooth UI experience.
    `,
    githubLink: "https://github.com/IdrissaMaiga/Android-Filmu-ReactNative-MongoDb",
    liveLink: "#"
  },
];

// Project section tabs
const tabs = [
  { id: "overview", label: "Overview", icon: <FiInfo /> },
  { id: "features", label: "Features", icon: <FiLayers /> },
  { id: "challenges", label: "Challenges & Solutions", icon: <FiServer /> },
  { id: "tech", label: "Tech Stack", icon: <FiCode /> },
];

export default function DetailedProjectsSection() {
  const [activeProject, setActiveProject] = useState(projects[0].id);
  const [activeTab, setActiveTab] = useState("overview");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  
  const carouselRef = useRef<HTMLDivElement>(null);
  const projectSectionRef = useRef<HTMLDivElement>(null);

  const getActiveProject = useCallback(() => {
    return projects.find(project => project.id === activeProject) || projects[0];
  }, [activeProject]); // Removed projects from dependency array

  // Image carousel controls
  const nextImage = useCallback(() => {
    const project = getActiveProject();
    const totalImages = project.additionalImages.length + 1; // +1 for main image
    setCurrentImageIndex((prev) => (prev + 1) % totalImages);
  }, [getActiveProject]);

  const prevImage = useCallback(() => {
    const project = getActiveProject();
    const totalImages = project.additionalImages.length + 1;
    setCurrentImageIndex((prev) => (prev - 1 + totalImages) % totalImages);
  }, [getActiveProject]);

  // Handle touch events for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    
    // If the swipe is significant enough, change image
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextImage();
      } else {
        prevImage();
      }
    }
  };

  // Reset state when project changes
  useEffect(() => {
    setCurrentImageIndex(0);
    setActiveTab("overview");
    setIsExpanded(false);
  }, [activeProject]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        prevImage();
      } else if (e.key === "ArrowRight") {
        nextImage();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextImage, prevImage]);

  // Get current image source
  const getCurrentImageSrc = () => {
    const project = getActiveProject();
    if (currentImageIndex === 0) {
      return project.image;
    } else {
      return project.additionalImages[currentImageIndex - 1];
    }
  };

  return (
    <section 
      id="projects" 
      ref={projectSectionRef}
      className="py-20 relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="blur-circle blur-primary w-96 h-96 -left-48 top-1/3 opacity-30"></div>
      <div className="blur-circle blur-accent w-96 h-96 -right-48 bottom-1/4 opacity-30"></div>
      
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 text-center"
        >
          <span className="px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium">
            Portfolio
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6">
            Featured Projects
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-400">
            A selection of my most significant work that showcases my skills and expertise
          </p>
        </motion.div>

        {/* Project Selection */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              onClick={() => setActiveProject(project.id)}
              className={`card overflow-hidden cursor-pointer transition-all duration-300 ${
                activeProject === project.id 
                  ? "ring-2 ring-blue-500 dark:ring-blue-400 shadow-lg" 
                  : "hover:shadow-md"
              }`}
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.imageAlt}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-lg font-bold text-white">{project.title.split(' - ')[0]}</h3>
                </div>
              </div>
              <div className="p-4">
                <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-4">
                  {project.shortDesc}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.slice(0, 3).map((tech) => (
                    <span 
                      key={tech.name} 
                      className="inline-flex items-center text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full text-gray-700 dark:text-gray-300"
                    >
                      <span className="mr-1 text-blue-500 dark:text-blue-400">{tech.icon}</span>
                      {tech.name}
                    </span>
                  ))}
                  {project.techStack.length > 3 && (
                    <span className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full text-gray-700 dark:text-gray-300">
                      +{project.techStack.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Active Project Details */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="card p-0 overflow-hidden"
          key={activeProject} // Re-render when project changes
        >
          {/* Project Images Carousel */}
          <div 
            ref={carouselRef}
            className="relative h-64 md:h-96 bg-gray-800 overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Main image */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentImageIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0"
              >
                <Image
                  src={getCurrentImageSrc()}
                  alt={getActiveProject().imageAlt}
                  fill
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>

            {/* Navigation arrows */}
            <button
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors z-10"
              aria-label="Previous image"
            >
              <FiChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors z-10"
              aria-label="Next image"
            >
              <FiChevronRight className="w-5 h-5" />
            </button>

            {/* Image indicators */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {[getActiveProject().image, ...getActiveProject().additionalImages].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentImageIndex(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    currentImageIndex === i 
                      ? "bg-white w-4" 
                      : "bg-white/50 hover:bg-white/80"
                  }`}
                  aria-label={`Go to image ${i + 1}`}
                />
              ))}
            </div>

            {/* Project title overlay */}
            <div className="absolute left-0 right-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6">
              <h3 className="text-2xl font-bold text-white">{getActiveProject().title}</h3>
              <div className="flex mt-2 space-x-4">
                {getActiveProject().githubLink && (
                  <a 
                    href={getActiveProject().githubLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-white/90 hover:text-white transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FiGithub className="mr-2" /> GitHub
                  </a>
                )}
                {getActiveProject().liveLink && (
                  <a 
                    href={getActiveProject().liveLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-white/90 hover:text-white transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FiExternalLink className="mr-2" /> Live Demo
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Project content tabs */}
          <div className="border-b border-gray-200 dark:border-gray-800">
            <div className="flex overflow-x-auto scrollbar-hide">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center whitespace-nowrap py-4 px-6 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? "border-b-2 border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400"
                      : "text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab content */}
          <div className="p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {activeTab === "overview" && (
                  <div className="prose prose-lg dark:prose-invert max-w-none">
                    <div className={`relative ${isExpanded ? "" : "max-h-32 overflow-hidden"}`}>
                      <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                        {getActiveProject().description}
                      </p>
                      {!isExpanded && (
                        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white dark:from-gray-900 to-transparent"></div>
                      )}
                    </div>
                    <button 
                      onClick={() => setIsExpanded(!isExpanded)}
                      className="mt-2 text-blue-600 dark:text-blue-400 font-medium text-sm flex items-center"
                    >
                      {isExpanded ? "Show less" : "Read more"}
                      <FiChevronRight className={`ml-1 transition-transform ${isExpanded ? "rotate-90" : ""}`} />
                    </button>
                  </div>
                )}

                {activeTab === "features" && (
                  <div>
                    <h4 className="text-xl font-semibold mb-4 flex items-center">
                      <FiLayers className="mr-2 text-blue-600 dark:text-blue-400" /> Key Features
                    </h4>
                    <ul className="space-y-3">
                      {getActiveProject().features.map((feature, index) => (
                        <motion.li 
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="flex items-start"
                        >
                          <span className="text-green-500 dark:text-green-400 mr-2 mt-1">•</span>
                          <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                )}

                {activeTab === "challenges" && (
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-xl font-semibold mb-4 flex items-center">
                        <FiServer className="mr-2 text-blue-600 dark:text-blue-400" /> Challenges
                      </h4>
                      <ul className="space-y-3">
                        {getActiveProject().challenges.map((challenge, index) => (
                          <motion.li 
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            className="flex items-start"
                          >
                            <span className="text-amber-500 dark:text-amber-400 mr-2 mt-1">•</span>
                            <span className="text-gray-700 dark:text-gray-300">{challenge}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-xl font-semibold mb-4 flex items-center">
                        <FiLayout className="mr-2 text-blue-600 dark:text-blue-400" /> Solution
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                        {getActiveProject().solution}
                      </p>
                    </div>
                  </div>
                )}

                {activeTab === "tech" && (
                  <div>
                    <h4 className="text-xl font-semibold mb-6 flex items-center">
                      <FiCode className="mr-2 text-blue-600 dark:text-blue-400" /> Technology Stack
                    </h4>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {getActiveProject().techStack.map((tech, index) => (
                        <motion.div
                          key={tech.name}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="flex flex-col items-center p-4 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                        >
                          <div className="text-3xl text-blue-600 dark:text-blue-400 mb-2">
                            {tech.icon}
                          </div>
                          <span className="text-gray-700 dark:text-gray-300 text-sm text-center">
                            {tech.name}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                    
                    <div className="mt-8">
                      <h5 className="font-semibold mb-2 text-gray-700 dark:text-gray-300">Technology Breakdown</h5>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        This project leverages a {getActiveProject().techStack.some(t => t.name.includes("React")) ? "React-based" : "custom"} frontend
                        with a {getActiveProject().techStack.some(t => t.name.includes("Node")) ? "Node.js" : "custom"} backend.
                        Data is stored in {getActiveProject().techStack.some(t => t.name.includes("MongoDB")) ? "MongoDB" : getActiveProject().techStack.some(t => t.name.includes("Firebase")) ? "Firebase" : "a database"}.
                        The architecture follows modern best practices for scalability and maintainability.
                      </p>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Footer with additional links */}
          <div className="p-6 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 flex flex-wrap justify-between items-center gap-4">
            <div className="flex items-center space-x-2">
              <span className="text-gray-600 dark:text-gray-400 text-sm">Share:</span>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href + "#" + getActiveProject().id);
                  alert("Link copied to clipboard!");
                }}
                className="p-2 rounded-full text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
                aria-label="Copy link"
              >
                <FiShare2 className="w-4 h-4" />
              </button>
            </div>
            
            <div className="flex space-x-4">
              {getActiveProject().githubLink && (
                <a 
                  href={getActiveProject().githubLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-outline text-sm py-2 px-4"
                >
                  <FiGithub className="mr-2" /> View Code
                </a>
              )}
              {getActiveProject().liveLink && (
                <a 
                  href={getActiveProject().liveLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-primary text-sm py-2 px-4"
                >
                  <FiExternalLink className="mr-2" /> Live Demo
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}