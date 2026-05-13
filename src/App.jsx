import React, { useState, useEffect } from "react";
import axios from "axios";
const API_URL = 'https://portfolio-backend-black-rho.vercel.app/api';

export default function App() {
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({name: "", email: "", message: ""});
  const [loading, setLoading] = useState(false);

  // Static data for now - backend me later shift kar sakte ho
  const experience = [
    {
      role: "Full Stack Developer",
      company: "Freelance / Global Clients",
      year: "2023 - Present",
      desc: "Built scalable web apps using React, Node.js, MongoDB for clients in US, UK, KSA."
    },
    {
      role: "Frontend Developer",
      company: "Tech Agency",
      year: "2022 - 2023",
      desc: "Developed responsive UI components and integrated REST APIs."
    },
     {
      role: "Backend Developer",
      company: "Tech company",
      year: "2024 - 2025",
      desc: "Designed and developed Maryapp.io, a multi-vendor cannabis marketplace with session tracking and an integrated dashboard. Implemented an AI-powered chatbot using machine learning to enhance user support. Deployed and managed AWS infrastructure with monitoring via Grafana and CloudWatch. Built a scalable microservices architecture using Docker in a monorepo. Delivered a seamless end-to-end solution across frontend, backend, and DevOps pipelines for production deployment."
    }
  ];

  const skills = [
    "React", "Next.js", "Node.js", "Express", "MongoDB", "PostgreSQL",
    "AWS", "Docker", "Kubernetes", ".NET", "Tailwind CSS", "Redux"
  ];

  const clients = [
    { name: "Maryapp", logo: "M" },
    { name: "Sundial Home", logo: "S" },
    { name: "Zed Live", logo: "Z" }
  ];

  // Get Projects API
  const getProjects = async () => {
    try {
      const response = await axios.get(`${API_URL}/projects`);
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
      // Fallback static data if API fails
      setProjects([
        {
          title: "Maryapp",
          type: "Full Stack",
          typeColor: "text-cyan-400",
          desc: "Multi-vendor marketplace with real-time tracking and AI chatbot.",
          tech: ["React", "Node.js", "MongoDB", "AWS", "Docker"],
        },
        {
          title: "Sundial Home",
          type: "DevOps",
          typeColor: "text-purple-400",
          desc: "E-commerce platform with inventory management and CI/CD.",
          tech: ["React", "Node.js", "Kubernetes", "AWS", "PostgreSQL"],
        },
        {
          title: "Zed Live",
          type: "Backend",
          typeColor: "text-pink-400",
          desc: "Live streaming platform with NFT integration.",
          tech: [".NET", "React", "Redis", "Kafka"],
        }
      ]);
    }
  };

  // Send Message API
  const sendMessage = async (data) => {
    try {
      await axios.post(`${API_URL}/contact`, data);
      alert("Message sent successfully!");
      setFormData({name: "", email: "", message: ""});
    } catch {
      alert("Failed to send message");
    }
  };

  useEffect(() => {
    getProjects();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await sendMessage(formData);
    setLoading(false);
  };

  return (
    <div className="bg-[#0a0a0f] text-white">
      {/* Hero */}
      <section className="min-h-screen flex items-center justify-center text-center relative px-6 pt-20">
        <div className="absolute w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(0,255,200,0.2)_0%,transparent_70%)] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
        <div className="relative z-10 max-w-3xl">
          <p className="text-gray-400 text-lg mb-2">Hello, I'm</p>
          <h1 className="text-5xl md:text-7xl font-bold text-cyan-400 mb-3">Anam Falak</h1>
          <h2 className="text-xl md:text-2xl text-gray-200 mb-4">Full Stack Developer</h2>
          <p className="text-gray-400 leading-relaxed mb-8">
            2+ years building scalable web applications for global clients.
          </p>
          <div className="flex gap-4 justify-center">
            <a href="#contact" className="px-7 py-3 bg-cyan-400 text-[#0a0a0f] font-semibold rounded-lg hover:-translate-y-1 transition-all">
              Hire Me
            </a>
            <a href="#projects" className="px-7 py-3 border-2 border-cyan-400 text-cyan-400 font-semibold rounded-lg hover:bg-cyan-400/10 transition-all">
              View Work
            </a>
          </div>
        </div>
      </section>

      {/* Work Experience */}
      <section id="experience" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Work Experience</h2>
          <div className="space-y-8">
            {experience.map((exp, i) => (
              <div key={i} className="bg-[#12121a] border-gray-800 rounded-2xl p-6 hover:border-cyan-400/50 transition-all">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-2xl font-bold text-cyan-400">{exp.role}</h3>
                    <p className="text-gray-300">{exp.company}</p>
                  </div>
                  <span className="text-sm text-gray-400 bg-[#1e1e2a] px-3 py-1 rounded-lg">{exp.year}</span>
                </div>
                <p className="text-gray-400">{exp.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="py-20 px-6 bg-[#0c0c12]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Skills</h2>
          <div className="flex flex-wrap gap-3 justify-center">
            {skills.map((skill, i) => (
              <span key={i} className="px-5 py-2 bg-[#12121a] border-gray-800 rounded-lg text-gray-300 hover:border-cyan-400/50 hover:text-cyan-400 transition-all">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Clients */}
      <section id="clients" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Clients</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {clients.map((client, i) => (
              <div key={i} className="bg-[#12121a] border-gray-800 rounded-2xl p-6 flex items-center justify-center hover:border-cyan-400/50 transition-all">
                <span className="text-2xl font-bold text-cyan-400">{client.logo}</span>
                <span className="ml-3 text-gray-300">{client.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-20 px-6 bg-[#0c0c12]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">Featured Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            {projects.map((p, i) => (
              <div key={i} className="bg-[#12121a] border-gray-800 rounded-2xl p-6 hover:border-cyan-400/50 hover:-translate-y-2 transition-all">
                <p className={`${p.typeColor} text-sm font-medium mb-2`}>{p.type}</p>
                <h3 className="text-2xl font-bold mb-3">{p.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{p.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {p.tech.map(t => (
                    <span key={t} className="px-3 py-1 bg-[#1e1e2a] text-gray-300 text-xs rounded-lg">{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 px-6">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">Contact Me</h2>
          <div className="bg-[#12121a] border-gray-800 rounded-2xl p-8 mt-16">
            <form onSubmit={handleSubmit} className="space-y-5">
              <input type="text" placeholder="Your name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 bg-[#1e1e2a] rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400" required />
              <input type="email" placeholder="your.email@example.com" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-3 bg-[#1e1e2a] rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400" required />
              <textarea rows="5" placeholder="Your message..." value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="w-full px-4 py-3 bg-[#1e1e2a] rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400" required />
              <button type="submit" disabled={loading} className="w-full py-3 bg-cyan-400 text-[#0a0a0f] font-semibold rounded-lg hover:bg-cyan-300 disabled:opacity-50" >
                {loading? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </section>

      <footer className="text-center py-6 border-t border-gray-800 text-gray-500">
        © 2025 Anam Falak. All rights reserved.
      </footer>
    </div>
  );
}