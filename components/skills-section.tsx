"use client";

import { motion } from "framer-motion";
import { 
  FiServer, 
  FiLayout, 
  FiDatabase, 
  FiCloud, 
  FiCpu, 
  FiCode,
  FiBox
} from "react-icons/fi";

import { 
  SiOracle, 
  SiSpring, 
  SiReact, 
  SiNodedotjs, 
  SiMysql, 
  SiMongodb, 
  SiAmazon, 
  SiDocker, 
  SiKubernetes,
  SiJavascript,
  SiTypescript,
  SiHtml5,
  SiCss3,
  SiTailwindcss,
  SiGit,
  SiPython,
  SiSharp,
  SiDotnet,
  SiExpress,
  SiFirebase
} from "react-icons/si";

// Define skill categories
const skillCategories = [
  {
    id: "languages",
    name: "Programming Languages",
    icon: <FiCode className="w-6 h-6" />,
    color: "from-blue-600 to-cyan-500",
    darkColor: "from-blue-500 to-cyan-400",
    skills: [
      { name: "Java", icon: <SiOracle />, level: 95 },
      { name: "JavaScript", icon: <SiJavascript />, level: 90 },
      { name: "TypeScript", icon: <SiTypescript />, level: 85 },
      { name: "Python", icon: <SiPython />, level: 75 },
      { name: "SQL", icon: <SiMysql />, level: 85 },
      { name: "C#", icon: <SiSharp />, level: 70 },
    ]
  },
  {
    id: "backend",
    name: "Backend Frameworks",
    icon: <FiServer className="w-6 h-6" />,
    color: "from-green-600 to-emerald-500",
    darkColor: "from-green-500 to-emerald-400",
    skills: [
      { name: "Spring Boot", icon: <SiSpring />, level: 90 },
      { name: "Node.js", icon: <SiNodedotjs />, level: 85 },
      { name: "Express.js", icon: <SiExpress />, level: 80 },
      { name: ".NET Core", icon: <SiDotnet />, level: 75 },
      { name: "ASP.NET", icon: <SiDotnet />, level: 70 },
      { name: "Laravel", icon: <SiNodedotjs />, level: 65 },
    ]
  },
  {
    id: "frontend",
    name: "Frontend Technologies",
    icon: <FiLayout className="w-6 h-6" />,
    color: "from-pink-600 to-purple-500",
    darkColor: "from-pink-500 to-purple-400",
    skills: [
      { name: "React.js", icon: <SiReact />, level: 88 },
      { name: "Next.js", icon: <SiReact />, level: 85 },
      { name: "Vue.js", icon: <SiReact />, level: 75 },
      { name: "React Native", icon: <SiReact />, level: 80 },
      { name: "HTML5", icon: <SiHtml5 />, level: 95 },
      { name: "CSS3", icon: <SiCss3 />, level: 90 },
      { name: "Tailwind CSS", icon: <SiTailwindcss />, level: 85 },
    ]
  },
  {
    id: "database",
    name: "Databases",
    icon: <FiDatabase className="w-6 h-6" />,
    color: "from-amber-600 to-orange-500",
    darkColor: "from-amber-500 to-orange-400",
    skills: [
      { name: "MySQL", icon: <SiMysql />, level: 92 },
      { name: "PostgreSQL", icon: <SiMysql />, level: 88 },
      { name: "MongoDB", icon: <SiMongodb />, level: 85 },
      { name: "Redis", icon: <SiMongodb />, level: 80 },
      { name: "Firebase", icon: <SiFirebase />, level: 75 },
    ]
  },
  {
    id: "cloud",
    name: "Cloud & DevOps",
    icon: <FiCloud className="w-6 h-6" />,
    color: "from-indigo-600 to-purple-500",
    darkColor: "from-indigo-500 to-purple-400",
    skills: [
      { name: "AWS", icon: <SiAmazon />, level: 80 },
      { name: "Docker", icon: <SiDocker />, level: 85 },
      { name: "Kubernetes", icon: <SiKubernetes />, level: 75 },
      { name: "Git", icon: <SiGit />, level: 90 },
      { name: "GitHub Actions", icon: <SiGit />, level: 80 },
    ]
  },
  {
    id: "ai",
    name: "AI/ML Technologies",
    icon: <FiCpu className="w-6 h-6" />,
    color: "from-red-600 to-pink-500",
    darkColor: "from-red-500 to-pink-400",
    skills: [
      { name: "OpenAI GPT", icon: <FiBox />, level: 75 },
      { name: "Mistral AI", icon: <FiBox />, level: 70 },
      { name: "DeepSeek R1", icon: <FiBox />, level: 70 },
      { name: "TensorFlow", icon: <FiBox />, level: 65 },
      { name: "NLP Models", icon: <FiBox />, level: 70 },
    ]
  },
];

export default function SkillsSection() {
  return (
    <section id="skills" className="py-20 relative bg-gray-50 dark:bg-gray-900">
      {/* Decorative elements */}
      <div className="blur-circle blur-primary w-96 h-96 -top-48 -right-48 opacity-30"></div>
      <div className="blur-circle blur-accent w-96 h-96 bottom-0 left-1/4 opacity-30"></div>
      
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 text-center"
        >
          <span className="px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium">
            Expertise
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6">
            Skills & Technologies
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-400">
            A comprehensive overview of my technical skills and proficiencies
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: categoryIndex * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="card p-6 h-full">
                <div className="flex items-center mb-6">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-white bg-gradient-to-br ${
                    category.color
                  } dark:${category.darkColor}`}>
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-bold ml-4">{category.name}</h3>
                </div>
                
                <div className="space-y-5">
                  {category.skills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <span className="text-gray-600 dark:text-gray-400 mr-2">
                            {skill.icon}
                          </span>
                          <span className="font-medium">{skill.name}</span>
                        </div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full bg-gradient-to-r ${category.color} dark:${category.darkColor}`}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          transition={{ duration: 1, delay: 0.2 }}
                          viewport={{ once: true }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}