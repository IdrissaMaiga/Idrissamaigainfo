// Section data type definitions
export type SectionId = "about" | "projects" | "contact";

export interface ProjectContent {
  description: string;
  techStack: string[];
  purpose: string;
  githubLink: string;
}

export interface SectionDetail {
  faces: string[];
  content: Record<string, string | ProjectContent>;
  faceBackgrounds: Record<string, string>;
}

export const sectionColors = ["#FF6B6B", "#4ECDC4", "#45B7D1"];
export const sectionNames: SectionId[] = ["about", "projects", "contact"];

// Section details configuration
export const sectionDetails: Record<SectionId, SectionDetail> = {
  about: {
    faces: ["Desires", "Skills"],
    content: {
      Desires: "I aspire to create meaningful digital experiences. I desire to innovate and develop tech that leaves a lasting impact, addressing real-world problems.",
      Skills: "Proficient in React, Three.js, Python ,LLM tunning and modern web technologies, with experience in building web applications and interactive 3D environments.",
    },
    faceBackgrounds: {
      Desires: "/logos/desire.jpg",
      Skills: "/logos/skills.png",
    },
  },

  projects: {
    faces: ["Filmu", "SignalApp", "Kouma - AI-powered Chat App"],
    content: {
      "Filmu": {
        description: "Filmu - VOD Streaming Platform built with React Native and Node.js, using MongoDB for storage and integrating personalized content recommendations.",
        techStack: ["React Native", "Node.js", "MongoDB", "Video Streaming", "Auth"],
        purpose: "A scalable, video-on-demand platform designed for seamless content delivery.",
        githubLink: "https://github.com/IdrissaMaiga/Android-Filmu-ReactNative-MongoDb",
      },
      "SignalApp": {
        description: "SignalApp - Trading Signals platform created with React Native and Firebase to provide real-time market insights and secure user authentication.",
        techStack: ["React Native", "Firebase", "OAuth", "Real-time Data"],
        purpose: "An app providing real-time trading signals for market participants.",
        githubLink: "https://github.com/IdrissaMaiga/SignalApp",
      },
      "Kouma - AI-powered Chat App": {
        description: "Kouma - AI-powered Chat App built using Node.js and React.js, utilizing NLP models for automated responses.",
        techStack: ["Node.js", "React.js", "NLP", "AI", "Real-time Chat"],
        purpose: "Real-time chat application with integrated AI chatbot functionality for enhanced interaction.",
        githubLink: "https://github.com/IdrissaMaiga/Kouma-Chat-With-Ai",
      },
    },
    faceBackgrounds: {
      "Filmu": "/logos/Filmu.png",
      "SignalApp": "/logos/kouma.png",
      "Kouma - AI-powered Chat App": "/logos/signal.png",
    },
  },

  contact: {
    faces: ["Email", "LinkedIn", "GitHub"],
    content: {
      Email: "Email: maigadrisking@gmail.com",
      LinkedIn: "LinkedIn: https://linkedin.com/in/yourusername",
      GitHub: "GitHub: https://github.com/yourusername",
    },
    faceBackgrounds: {
      Email: "/logos/gmail.png",
      LinkedIn: "/logos/linkedin.png",
      GitHub: "/logos/github.png",
    },
  },
};