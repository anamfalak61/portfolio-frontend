import React, { useState, useEffect } from "react";
import axios from "axios";
import Contact from "./Contact";

// 1. UPDATED PRODUCTION URL (Vercel rewrite handle karega)
const API_URL = "https://portfolio-backend-seven-amber.vercel.app";

export default function App() {
  const [projects, setProjects] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Reusable Classes
  const sectionClass = "py-10 sm:py-12 px-4 sm:px-6 lg:px-8";
  const containerClass = "max-w-6xl mx-auto";
  const headingClass = "text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8";
  const cardClass =
    "bg-[#12121a] border border-gray-800 rounded-2xl p-5 hover:border-cyan-400/50 transition-all";
  const navLinkClass = (id) =>
    `hover:text-white transition ${
      activeSection === id ? "text-white border-b-2 border-cyan-400 pb-1" : "text-gray-300"
    }`;

  // Experience Data
  const experience = [
    {
      role: "Full Stack Developer",
      company: "Freelance / Global Clients",
      year: "2023 - Present",
      desc: "Built scalable web apps using React, Node.js, MongoDB for clients in US, UK, KSA.",
    },
    {
      role: "Frontend Developer",
      company: "Tech Agency",
      year: "2022 - 2023",
      desc: "Developed responsive UI components and integrated REST APIs.",
    },
    {
      role: "Backend Developer",
      company: "Tech company",
      year: "2024 - 2025",
      desc: "Designed and developed Maryapp.io, a multi-vendor cannabis marketplace with session tracking and an integrated dashboard. Implemented an AI-powered chatbot using machine learning to enhance user support. Built a scalable microservices architecture using Docker in a monorepo.",
    }
  ];

  // Skills Data
  const skills = [
    "React", "Next.js", "Node.js", "Express", "MongoDB",
    "PostgreSQL", "AWS", "Docker", "Kubernetes", ".NET",
    "Tailwind CSS", "Redux"
  ];

  // Clients Data
  const clients = [
    { name: "Maryapp", logo: "M" },
    { name: "Sundial Home", logo: "S" },
    { name: "Zed Live", logo: "Z" },
  ];

  // Get Projects Function
  const getProjects = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/projects`);
      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching projects:", error);

      // Fallback Data (Agar server off ho toh yeh chalega)
      setProjects([
        {
          title: "Maryapp",
          type: "Full Stack",
          typeColor: "text-cyan-400",
          desc: "Multi-vendor marketplace with AI chatbot and tracking.",
          tech: ["React", "Node.js", "MongoDB", "AWS", "Docker"],
        },
        {
          title: "Sundial Home",
          type: "DevOps",
          typeColor: "text-purple-400",
          desc: "E-commerce platform with CI/CD and inventory system.",
          tech: ["React", "Node.js", "Kubernetes", "AWS", "PostgreSQL"],
        },
        {
          title: "Zed Live",
          type: "Backend",
          typeColor: "text-pink-400",
          desc: "Live streaming platform with NFT integration.",
          tech: [".NET", "React", "Redis", "Kafka"],
        },
      ]);
    }
  };

  useEffect(() => {
    getProjects();
  }, []);

  useEffect(() => {
    const sectionIds = ["home", "experience", "skills", "clients", "projects", "contact"];
    const handleScroll = () => {
      const currentScroll = window.scrollY + window.innerHeight / 3;
      let currentSection = "home";

      sectionIds.forEach((id) => {
        const section = document.getElementById(id);
        if (section && section.offsetTop <= currentScroll) {
          currentSection = id;
        }
      });

      setActiveSection(currentSection);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-[#0a0a0f] text-white overflow-x-hidden">
      <header className="sticky top-0 z-30 bg-[#0a0a0f]/95 border-b border-gray-900 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <a href="#home" className="text-lg font-bold text-cyan-400">Anam</a>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#experience" className={navLinkClass("experience")}>
              Experience
            </a>
            <a href="#skills" className={navLinkClass("skills")}>
              Skills
            </a>
            <a href="#clients" className={navLinkClass("clients")}>
              Clients
            </a>
            <a href="#projects" className={navLinkClass("projects")}>
              Projects
            </a>
            <a href="#contact" className={navLinkClass("contact")}>
              Contact
            </a>
          </nav>
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="md:hidden inline-flex items-center justify-center rounded-lg border border-gray-700 bg-[#12121a] px-3 py-2 text-sm text-gray-200 shadow-lg shadow-cyan-500/10 transition hover:bg-[#1e1e2a]"
            aria-label="Toggle navigation"
          >
            <span className="sr-only">Toggle navigation</span>
            {menuOpen ? (
              <span className="inline-flex h-5 w-5 items-center justify-center">
                <span className="block h-0.5 w-5 rotate-45 bg-gray-200"></span>
                <span className="block h-0.5 w-5 -rotate-45 bg-gray-200 -mt-0.5"></span>
              </span>
            ) : (
              <span className="inline-flex flex-col gap-1">
                <span className="block h-0.5 w-5 bg-gray-200"></span>
                <span className="block h-0.5 w-5 bg-gray-200"></span>
                <span className="block h-0.5 w-5 bg-gray-200"></span>
              </span>
            )}
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden border-t border-gray-900 bg-[#0a0a0f]/95 px-4 py-3">
            <div className="flex flex-col gap-3 text-sm text-gray-300">
              <a href="#experience" onClick={() => setMenuOpen(false)} className={navLinkClass("experience")}>Experience</a>
              <a href="#skills" onClick={() => setMenuOpen(false)} className={navLinkClass("skills")}>Skills</a>
              <a href="#clients" onClick={() => setMenuOpen(false)} className={navLinkClass("clients")}>Clients</a>
              <a href="#projects" onClick={() => setMenuOpen(false)} className={navLinkClass("projects")}>Projects</a>
              <a href="#contact" onClick={() => setMenuOpen(false)} className={navLinkClass("contact")}>Contact</a>
            </div>
          </div>
        )}
      </header>

      {/* Hero */}
      <section id="home" className="min-h-screen md:min-h-[85vh] flex items-center justify-center text-center relative px-4 sm:px-6 lg:px-8 pt-10 pb-10">
        <div className="absolute w-[300px] h-[300px] sm:w-[420px] sm:h-[420px] md:w-[500px] md:h-[500px] bg-[radial-gradient(circle,rgba(0,255,200,0.15)_0%,transparent_70%)] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>

        <div className="relative z-10 mx-auto w-full max-w-3xl px-4 sm:px-0">
          <p className="text-gray-400 text-base sm:text-lg mb-2">Hello, I'm</p>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-cyan-400 mb-3">Anam Falak</h1>
          <h2 className="text-lg sm:text-xl md:text-2xl text-gray-200 mb-4">Full Stack Developer</h2>
          <p className="text-gray-400 leading-relaxed mb-6 text-sm sm:text-base">
            2+ years building scalable web applications for global clients.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="#contact" className="w-full sm:w-auto px-7 py-3 bg-cyan-400 text-[#0a0a0f] font-semibold rounded-lg hover:-translate-y-1 transition-all">
              Hire Me
            </a>
            <a href="#projects" className="w-full sm:w-auto px-7 py-3 border-2 border-cyan-400 text-cyan-400 font-semibold rounded-lg hover:bg-cyan-400/10 transition-all">
              View Work
            </a>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className={sectionClass}>
        <div className={`${containerClass} px-2 sm:px-0`}>
          <h2 className={headingClass}>Work Experience</h2>
          <div className="space-y-5">
            {experience.map((exp, i) => (
              <div key={i} className={cardClass}>
                <div className="flex justify-between items-start mb-3 flex-wrap gap-3">
                  <div>
                    <h3 className="text-2xl font-bold text-cyan-400">{exp.role}</h3>
                    <p className="text-gray-300">{exp.company}</p>
                  </div>
                  <span className="text-sm text-gray-400 bg-[#1e1e2a] px-3 py-1 rounded-lg">
                    {exp.year}
                  </span>
                </div>
                <p className="text-gray-400">{exp.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className={`${sectionClass} bg-[#0c0c12]`}>
        <div className={containerClass}>
          <h2 className={headingClass}>Skills</h2>
          <div className="flex flex-wrap gap-3 justify-center">
            {skills.map((skill, i) => (
              <span key={i} className="px-4 py-2 bg-[#12121a] border border-gray-800 rounded-lg text-sm text-gray-300 hover:border-cyan-400/50 hover:text-cyan-400 transition-all">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Clients */}
      <section id="clients" className={sectionClass}>
        <div className={`${containerClass} px-2 sm:px-0`}>
          <h2 className={headingClass}>Clients</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {clients.map((client, i) => (
              <div key={i} className={cardClass + " flex items-center justify-center"}>
                <span className="text-2xl font-bold text-cyan-400">{client.logo}</span>
                <span className="ml-3 text-gray-300">{client.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className={`${sectionClass} bg-[#0c0c12]`}>
        <div className="max-w-7xl mx-auto px-2 sm:px-0">
          <h2 className={headingClass}>Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {projects.map((p, i) => (
              <div key={i} className={cardClass + " hover:-translate-y-2"}>
                {/* Safe logic for types & colors */}
                <p className={`${p.typeColor || "text-cyan-400"} text-sm font-medium mb-2`}>
                  {p.type || "Web App"}
                </p>

                <h3 className="text-2xl font-bold mb-3">{p.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{p.desc || p.description}</p>

                {/* Safe array check for tags mapping */}
                <div className="flex flex-wrap gap-2">
                  {p.tech && Array.isArray(p.tech) ? (
                    p.tech.map((t) => (
                      <span key={t} className="px-3 py-1 bg-[#1e1e2a] text-gray-300 text-xs rounded-lg">
                        {t}
                      </span>
                    ))
                  ) : (
                    // Default tags if database doesn't pass tech array
                    ["React", "Node.js"].map((t) => (
                      <span key={t} className="px-3 py-1 bg-[#1e1e2a] text-gray-300 text-xs rounded-lg">
                        {t}
                      </span>
                    ))
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className={sectionClass}>
        <div className="max-w-2xl mx-auto px-2 sm:px-0">
          <h2 className={headingClass}>Contact Me</h2>
          <Contact />
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-4 border-t border-gray-800 text-gray-500">
        © 2026 Anam Falak. All rights reserved.
      </footer>
    </div>
  );
}