"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Brain,
  ExternalLink,
  Code2,
  Database,
  Cpu,
  Layers,
  Award,
  Phone,
  Mail,
  ArrowRight,
  ChevronRight,
  Copy,
  Check,
  Github,
  Linkedin,
  Terminal,
  Activity,
  Sparkles,
  Zap,
  CheckCircle2,
  HelpCircle,
  Menu,
  X
} from "lucide-react";
import ThreeBackground from "@/components/ThreeBackground";
import MindChatDrawer from "@/components/MindChatDrawer";

// Custom type for active viewport section
type SectionId = "hero" | "expertise" | "projects" | "contact";

export default function Page() {
  const [activeSection, setActiveSection] = useState<SectionId>("hero");
  const [copiedText, setCopiedText] = useState<"email" | "phone" | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  // Expanded project index state
  const [expandedProject, setExpandedProject] = useState<number | null>(null);

  // References to section elements to track viewport scroll positions
  const heroRef = useRef<HTMLElement>(null);
  const expertiseRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 40);

      const scrollPos = window.scrollY + window.innerHeight / 3;

      const heroTop = heroRef.current?.offsetTop || 0;
      const expertiseTop = expertiseRef.current?.offsetTop || 0;
      const projectsTop = projectsRef.current?.offsetTop || 0;
      const contactTop = contactRef.current?.offsetTop || 0;

      if (scrollPos >= contactTop - 100) {
        setActiveSection("contact");
      } else if (scrollPos >= projectsTop - 100) {
        setActiveSection("projects");
      } else if (scrollPos >= expertiseTop - 100) {
        setActiveSection("expertise");
      } else {
        setActiveSection("hero");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCopy = (text: string, type: "email" | "phone") => {
    navigator.clipboard.writeText(text);
    setCopiedText(type);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // Offset for sticky navigation bar
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
    setMobileMenuOpen(false);
  };

  const expertiseData = [
    {
      id: "ai-ml",
      title: "AI & Machine Learning",
      icon: <Brain className="w-6 h-6 text-orange-400" />,
      tagline: "advanced generative architectures",
      glowClass: "panel-glow",
      colorTheme: "amber",
      skills: [
        { name: "Large Language Models (LLMs)", level: "expert" },
        { name: "Retrieval-Augmented Gen (RAG)", level: "expert" },
        { name: "Prompt Engineering & Evaluation", level: "expert" },
        { name: "Natural Language Processing (NLP)", level: "expert" },
        { name: "OCR & Document Parsing", level: "advanced" },
        { name: "Transformer fine-tuning", level: "advanced" }
      ],
      tools: ["Gemini", "GPT (OpenAI)", "LLaMA", "Qwen", "LangChain", "LangGraph"]
    },
    {
      id: "backend-db",
      title: "Backend & Vector Engines",
      icon: <Database className="w-6 h-6 text-violet-400" />,
      tagline: "scalable pipeline infrastructure",
      glowClass: "panel-glow-purple",
      colorTheme: "violet",
      skills: [
        { name: "API Architecture Design", level: "expert" },
        { name: "Vector Database Indexing", level: "expert" },
        { name: "Schema & Query Optimization", level: "expert" },
        { name: "High-Performance Caching", level: "advanced" },
        { name: "Asynchronous Task Pipelines", level: "advanced" }
      ],
      tools: ["Python", "FastAPI", "Django", "Flask", "MySQL", "PostgreSQL", "MongoDB", "ChromaDB", "Qdrant", "Redis"]
    },
    {
      id: "mlops-quality",
      title: "MLOps & System Quality",
      icon: <Cpu className="w-6 h-6 text-emerald-400" />,
      tagline: "robust production integration",
      glowClass: "panel-glow-gold",
      colorTheme: "emerald",
      skills: [
        { name: "Containerization & Orchestration", level: "advanced" },
        { name: "Cloud Compute Provisioning", level: "advanced" },
        { name: "Model Eval & Guardrailing", level: "expert" },
        { name: "Automated Integration Testing", level: "advanced" },
        { name: "CI / CD Model Deployment", level: "advanced" }
      ],
      tools: ["Docker", "Microsoft Azure", "Pytest", "LangSmith", "Promptfoo"]
    }
  ];

  const projectsData = [
    {
      index: "01",
      title: "AI-Powered Churn Prediction Software & Retention Suite",
      scope: "Enterprise Customer Retention",
      context: "Led end-to-end ML pipeline for WHMCS client data. Fine-tuned transformer models for sentiment analysis of support tickets to calculate real-time churn probability.",
      deepDive: "By extracting support logs, customer profiles, and service health indices, the system correlates customer sentiment with historical subscription records. Integrated optimized Pytest pipelines and containerized deployment flows using Docker directly into WHMCS environments for real-time proactive alerts, dramatically boosting preemptive support outreach metrics.",
      tags: ["Transformers", "Sentiment Analysis", "WHMCS Integration", "Docker", "Pytest"],
      link: "https://github.com"
    },
    {
      index: "02",
      title: "Agentic AI Support & Contextual Reasoning Framework",
      scope: "Context-Aware Agent Network",
      context: "Built a LangGraph + FastAPI support system using Qwen2.5-7B and a RAG pipeline (ChromaDB) for smart query reasoning across server control panels. Includes a chat auto-summarization plugin via Gemini/LLaMA.",
      deepDive: "This stateful multi-agent system uses LangGraph to route queries based on topic context. Standard documentation is indexed in ChromaDB for high-accuracy RAG. Uses Qwen2.5 (7B parametrics) as local reasoning nodes alongside OpenAI or Gemini proxy APIs. Automatically synthesizes long support threads into concise summaries.",
      tags: ["LangGraph", "FastAPI", "Qwen2.5", "RAG (ChromaDB)", "Gemini", "LLaMA"],
      link: "https://github.com"
    },
    {
      index: "03",
      title: "Visual Hybrid Search & Analytics Engine",
      scope: "Multimodal Vector Retrieval",
      context: "Developed an Amazon-style visual product search using FastAPI, TrOCR, CLIP, and ChromaDB with hybrid vector similarity ranking.",
      deepDive: "Combines text query tokenization and multimodal CLIP image embeddings to provide highly accurate, cross-modal retrieval. Implemented TrOCR for text detection inside product decals and label images. Computes hybrid search ranks combining semantic, keyword, and visual coordinates with lightning-fast query latency.",
      tags: ["CLIP", "TrOCR", "FastAPI", "ChromaDB", "Hybrid Vector Search"],
      link: "https://github.com"
    }
  ];

  return (
    <div className="relative min-h-screen">
      {/* Three.js Interactive Background */}
      <ThreeBackground activeSection={activeSection} />

      {/* Floating Header */}
      <header
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
          hasScrolled ? "bg-black/40 backdrop-blur-md border-b border-white/5 py-4" : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo Brand Title */}
          <button onClick={() => scrollToSection("hero")} className="flex items-center gap-2.5 text-left select-none">
            <span className="w-8 h-8 rounded-full bg-gradient-to-tr from-orange-500 via-violet-500 to-amber-500 p-[1px] flex items-center justify-center">
              <span className="w-full h-full rounded-full bg-black flex items-center justify-center">
                <Brain className="w-4.5 h-4.5 text-orange-400" />
              </span>
            </span>
            <div>
              <span className="font-display font-medium text-white tracking-tight text-sm block leading-none">
                munshidrahman.k
              </span>
              <span className="font-mono text-[9px] text-gray-400 tracking-wider">AI/ML ENGINEER</span>
            </div>
          </button>

          {/* Nav Items Desktop */}
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection("hero")}
              className={`font-mono text-xs tracking-wider uppercase transition-colors ${
                activeSection === "hero" ? "text-orange-400" : "text-gray-400 hover:text-white"
              }`}
            >
              01 // Home
            </button>
            <button
              onClick={() => scrollToSection("expertise")}
              className={`font-mono text-xs tracking-wider uppercase transition-colors ${
                activeSection === "expertise" ? "text-violet-400" : "text-gray-400 hover:text-white"
              }`}
            >
              02 // AI Stack
            </button>
            <button
              onClick={() => scrollToSection("projects")}
              className={`font-mono text-xs tracking-wider uppercase transition-colors ${
                activeSection === "projects" ? "text-amber-400" : "text-gray-400 hover:text-white"
              }`}
            >
              03 // Systems
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className={`font-mono text-xs tracking-wider uppercase transition-colors ${
                activeSection === "contact" ? "text-orange-400" : "text-gray-400 hover:text-white"
              }`}
            >
              04 // Connect
            </button>
          </nav>

          {/* Action buttons */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => setIsChatOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-full font-mono text-xs uppercase bg-white/5 border border-white/10 hover:border-orange-500/20 text-orange-300 hover:text-orange-200 transition-all cursor-pointer hover:bg-orange-500/5 active:scale-95"
            >
              <Terminal className="w-3.5 h-3.5" />
              Explore My Mind
            </button>
          </div>

          {/* Mobile Menu Icon */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-gray-400 hover:text-white transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 w-full bg-[#07060b]/95 backdrop-blur-lg border-b border-white/10 shadow-2xl p-6 flex flex-col gap-6 md:hidden z-50 animate-fade-in"
            >
              <div className="flex flex-col gap-4">
                <button
                  onClick={() => scrollToSection("hero")}
                  className="font-mono text-sm tracking-wider uppercase text-left py-2 border-b border-white/5 text-gray-300"
                >
                  <span className="text-orange-400 mr-2">01 //</span> Home
                </button>
                <button
                  onClick={() => scrollToSection("expertise")}
                  className="font-mono text-sm tracking-wider uppercase text-left py-2 border-b border-white/5 text-gray-300"
                >
                  <span className="text-violet-400 mr-2">02 //</span> AI Stack
                </button>
                <button
                  onClick={() => scrollToSection("projects")}
                  className="font-mono text-sm tracking-wider uppercase text-left py-2 border-b border-white/5 text-gray-300"
                >
                  <span className="text-amber-400 mr-2">03 //</span> Systems
                </button>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="font-mono text-sm tracking-wider uppercase text-left py-2 text-gray-300"
                >
                  <span className="text-orange-400 mr-2">04 //</span> Connect
                </button>
              </div>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsChatOpen(true);
                }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-full font-mono text-xs uppercase bg-gradient-to-tr from-orange-600/90 to-amber-600/90 hover:opacity-90 active:scale-95 text-white"
              >
                <Terminal className="w-3.5 h-3.5" />
                Explore My Mind
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Floating Status Bar - Anti-AI-slop custom high-end literal indicator */}
      <div className="fixed bottom-6 left-6 z-30 hidden lg:flex items-center gap-3 px-4 py-2.5 bg-black/50 backdrop-blur-md rounded-full border border-white/10 select-none">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span className="font-mono text-[10px] text-gray-400 tracking-wider">
          SYSTEM CORE: <span className="text-emerald-400 font-bold">ONLINE</span>
        </span>
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 select-text">
        {/* HERO SECTION */}
        <section
          ref={heroRef}
          id="hero"
          className="min-h-screen flex flex-col justify-center pt-28 pb-16 md:pb-24 relative"
        >
          {/* Subtle decorative glow overlay */}
          <div className="absolute top-1/4 left-1/3 -z-20 w-80 h-80 rounded-full bg-orange-500/10 blur-[100px] pointer-events-none" />

          <div className="max-w-4xl space-y-8">
            {/* Status cluster tag */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full"
            >
              <Sparkles className="w-3.5 h-3.5 text-orange-400" />
              <span className="font-mono text-[10px] uppercase text-gray-300 tracking-widest">
                Designing Stateful Decision Engines
              </span>
            </motion.div>

            {/* Custom Lowercase Display Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="text-4xl sm:text-6xl md:text-7xl font-display font-medium leading-[1.05] tracking-tighter text-white lowercase"
            >
              solving complex data. <br />
              <span className="bg-gradient-to-r from-orange-400 via-amber-400 to-violet-400 bg-clip-text text-transparent italic">
                building intelligent systems.
              </span>
            </motion.h1>

            {/* Structured Minimal Human Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed font-sans max-w-2xl font-normal"
            >
              I am <span className="text-white font-medium">Munshid Rahman K</span>, an AI/ML Engineer dedicating my mind to translating advanced statistical learning algorithms and generative technology into robust, highly-scalable, business-driven framework architectures.
            </motion.p>

            {/* Primary Action Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="flex flex-wrap items-center gap-4 pt-4"
            >
              <button
                onClick={() => setIsChatOpen(true)}
                className="group relative px-6 py-3.5 bg-gradient-to-tr from-orange-600 to-amber-600 rounded-full font-mono text-xs uppercase tracking-wider text-white font-semibold flex items-center gap-2.5 transition-all outline-none border border-orange-500/20 active:scale-95 shadow-lg hover:shadow-orange-950/20 shadow-orange-950/10 cursor-pointer"
              >
                <Terminal className="w-4 h-4 text-orange-200" />
                Explore My Mind
                <ChevronRight className="w-4 h-4 text-orange-100 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => scrollToSection("projects")}
                className="px-6 py-3.5 rounded-full font-mono text-xs uppercase tracking-wider text-gray-300 hover:text-white border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 transition-all cursor-pointer"
              >
                View Architecture
              </button>

              {/* Minimal social linkages */}
              <div className="flex items-center gap-1.5 ml-2 md:ml-4 border-l border-white/10 pl-4 md:pl-6">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-white/5 hover:border-white/20 bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-all hover:scale-105"
                >
                  <Github className="w-4.5 h-4.5" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-white/5 hover:border-white/20 bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-all hover:scale-105"
                >
                  <Linkedin className="w-4.5 h-4.5" />
                </a>
              </div>
            </motion.div>
          </div>

          {/* Quick Stats Panel Embedded directly into the Hero for maximum initial impact */}
          <div className="mt-16 sm:mt-24 max-w-4xl border-t border-white/10 pt-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center text-violet-400 border border-violet-500/20">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <span className="block text-2xl font-display font-semibold text-white">490+</span>
                <span className="block text-xs font-mono text-gray-400 uppercase tracking-widest">
                  Trainees mentored in Data Science
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-400 border border-orange-500/20">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <span className="block text-2xl font-display font-semibold text-white">4.9 / 5</span>
                <span className="block text-xs font-mono text-gray-400 uppercase tracking-widest">
                  Trainer Evaluation Rating
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsChatOpen(true)}
              className="flex items-center justify-between gap-4 p-3 bg-white/5 rounded-xl border border-white/10 hover:border-orange-500/30 transition-all text-left text-xs max-w-sm"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
                <span className="font-mono text-gray-300">Let&apos;s test my contextual knowledge</span>
              </div>
              <ArrowRight className="w-4 h-4 text-orange-400 flex-shrink-0" />
            </button>
          </div>
        </section>

        {/* CORE EXPERTISE (THE AI STACK) */}
        <section
          ref={expertiseRef}
          id="expertise"
          className="py-24 md:py-32 relative border-t border-white/5"
        >
          {/* Section Heading */}
          <div className="space-y-3 mb-16">
            <span className="font-mono text-xs uppercase text-violet-400 tracking-widest flex items-center gap-1.5 font-bold">
              <Terminal className="w-3.5 h-3.5" />
              02 / COGNITIVE ENGINE
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-medium tracking-tight lowercase">
              the intelligent <span className="italic block sm:inline text-violet-400">neural stack.</span>
            </h2>
            <p className="text-sm sm:text-base text-gray-400 font-sans max-w-xl">
              An exhaustive stack built for high-accuracy reasoning, prompt evaluated models, quality-controlled testing pipelines, and fast indexing.
            </p>
          </div>

          {/* Core neural grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {expertiseData.map((category) => (
              <div
                key={category.id}
                className={`relative group bg-[#09080e] rounded-2xl p-6 border border-white/10 hover:border-violet-500/30 transition-all duration-300 flex flex-col justify-between ${category.glowClass}`}
              >
                {/* Visual Accent */}
                <div className={`absolute top-0 right-0 w-24 h-24 rounded-tr-2xl bg-gradient-to-bl from-violet-500/5 to-transparent pointer-events-none group-hover:from-violet-500/10`} />

                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-3 bg-white/5 rounded-xl border border-white/10 group-hover:border-violet-500/20 transition-all">
                      {category.icon}
                    </div>
                    <span className="font-mono text-[9px] uppercase text-gray-500 tracking-wider">
                      {category.tagline}
                    </span>
                  </div>

                  <h3 className="text-lg font-display font-medium text-white mb-6">
                    {category.title}
                  </h3>

                  {/* Skills lists */}
                  <ul className="space-y-3 mb-8">
                    {category.skills.map((skill, sIdx) => (
                      <li key={sIdx} className="flex items-start justify-between text-xs font-sans">
                        <span className="text-gray-300 flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-violet-400 flex-shrink-0" />
                          {skill.name}
                        </span>
                        <span className="font-mono text-[9px] px-2 py-0.5 rounded bg-white/5 text-gray-500 uppercase tracking-widest font-bold">
                          {skill.level}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Lower Stack Badges */}
                <div className="border-t border-white/5 pt-5">
                  <span className="block font-mono text-[9px] text-gray-500 uppercase tracking-wider mb-2.5 font-bold">
                    Primary Tools & Frameworks
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {category.tools.map((tool) => (
                      <span
                        key={tool}
                        className="font-mono text-[10px] text-gray-300 bg-white/5 hover:bg-violet-500/15 border border-white/5 hover:border-violet-500/20 rounded px-2.5 py-1 transition-colors"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FEATURED INTELLIGENT SYSTEMS */}
        <section
          ref={projectsRef}
          id="projects"
          className="py-24 md:py-32 relative border-t border-white/5"
        >
          {/* Subtle decoration */}
          <div className="absolute top-1/2 right-1/4 -z-20 w-80 h-80 rounded-full bg-amber-500/5 blur-[120px] pointer-events-none" />

          {/* Section heading */}
          <div className="space-y-3 mb-16">
            <span className="font-mono text-xs uppercase text-amber-500 tracking-widest flex items-center gap-1.5 font-bold">
              <Layers className="w-3.5 h-3.5" />
              03/ FEASIBLE ARCHITECTURES
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-medium tracking-tight lowercase">
              featured intelligent <span className="italic block sm:inline text-amber-500">systems.</span>
            </h2>
            <p className="text-sm sm:text-base text-gray-400 font-sans max-w-xl">
              Real-world deployment case studies demonstrating production MLOps integration, contextual LangGraph setups, and deep indexing.
            </p>
          </div>

          {/* Dynamic Interactive Case Study Cards */}
          <div className="space-y-6">
            {projectsData.map((project, idx) => {
              const isExpanded = expandedProject === idx;
              return (
                <div
                  key={idx}
                  className="group bg-[#09090b] rounded-2xl border border-white/10 hover:border-amber-500/30 transition-all duration-300 panel-glow-gold overflow-hidden"
                >
                  <div
                    onClick={() => setExpandedProject(isExpanded ? null : idx)}
                    className="p-6 sm:p-8 flex flex-col md:flex-row items-start justify-between gap-6 cursor-pointer select-none"
                  >
                    <div className="space-y-4 flex-1">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs text-amber-500 font-bold tracking-wider">
                          INDEX : {project.index} .
                        </span>
                        <span className="font-mono text-[10px] px-2.5 py-0.5 rounded bg-white/5 text-gray-400 uppercase tracking-widest">
                          {project.scope}
                        </span>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-display font-medium text-white group-hover:text-amber-400 transition-colors">
                        {project.title}
                      </h3>

                      <p className="text-sm text-gray-400 font-sans leading-relaxed max-w-3xl">
                        {project.context}
                      </p>
                    </div>

                    <div className="flex items-center gap-4 self-end md:self-center pr-2">
                      <span className="font-mono text-xs text-gray-400 group-hover:text-amber-300 uppercase tracking-widest transition-colors flex items-center gap-1">
                        {isExpanded ? "[ Collapse Details ]" : "[ Deep Investigation ]"}
                        <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? "rotate-90" : ""}`} />
                      </span>
                    </div>
                  </div>

                  {/* Expandable description panel */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="border-t border-white/10 bg-black/40"
                      >
                        <div className="p-6 sm:p-8 space-y-6">
                          <div className="space-y-2">
                            <h4 className="font-mono text-[10px] text-amber-500 uppercase tracking-widest font-bold">
                              Systems Pipeline Investigation & Realized Outcome
                            </h4>
                            <p className="text-sm font-sans text-gray-300 leading-relaxed max-w-3xl">
                              {project.deepDive}
                            </p>
                          </div>

                          {/* Technical Tags */}
                          <div className="flex flex-wrap gap-2">
                            {project.tags.map((tag) => (
                              <span
                                key={tag}
                                className="font-mono text-[10px] bg-[#11111e]/80 text-gray-300 px-3 py-1 border border-white/5 rounded-full"
                              >
                                # {tag}
                              </span>
                            ))}
                          </div>

                          {/* Trigger suggestion in brain chatbot directly referencing this project! */}
                          <div className="flex items-center justify-between border-t border-white/10 pt-6">
                            <span className="font-mono text-[10px] text-gray-400 uppercase tracking-widest">
                              Need a custom overview on Index {project.index}?
                            </span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setIsChatOpen(true);
                              }}
                              className="font-mono text-xs text-amber-300 hover:text-amber-200 uppercase tracking-widest flex items-center gap-1.5 transition-colors"
                            >
                              Consult Digital Brain
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>

        {/* CONTACT / CONNECT */}
        <section
          ref={contactRef}
          id="contact"
          className="py-24 md:py-32 relative border-t border-white/5"
        >
          {/* Subtle background glow */}
          <div className="absolute top-1/4 left-1/2 -z-20 w-80 h-80 rounded-full bg-orange-500/5 blur-[120px] pointer-events-none" />

          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto bg-[#0a0910] border border-white/10 rounded-3xl p-8 md:p-12 panel-glow">
            {/* Context block */}
            <div className="space-y-6 flex flex-col justify-between">
              <div className="space-y-3">
                <span className="font-mono text-xs uppercase text-orange-400 tracking-widest flex items-center gap-1.5 font-bold">
                  <Activity className="w-3.5 h-3.5 animate-pulse" />
                  04 / SYNAPTIC LINK
                </span>
                <h2 className="text-3xl sm:text-5xl font-display font-medium tracking-tight lowercase">
                  let&apos;s build something <span className="italic text-orange-400 block sm:inline">intelligent.</span>
                </h2>
                <p className="text-sm sm:text-base text-gray-400 font-sans leading-relaxed">
                  I am always looking forward to exploring custom machine learning challenges, agent optimization, advanced vector architecture, and scalable mentor initiatives. Touch base relative to collaborations.
                </p>
              </div>

              {/* Instant suggestions */}
              <div className="p-4 bg-white/5 rounded-2xl border border-white/5 hidden md:block">
                <span className="block font-mono text-[10px] text-gray-500 uppercase tracking-widest mb-2 font-bold">
                  Quick digital mind query
                </span>
                <p className="text-xs text-gray-300 mb-3 font-sans">
                  You can chat with my digital clone immediately. Ask about my models or contact details directly.
                </p>
                <button
                  onClick={() => setIsChatOpen(true)}
                  className="font-mono text-xs text-orange-300 hover:text-orange-200 uppercase tracking-wider flex items-center gap-1.5 transition-colors font-medium"
                >
                  Initiate Brain Connection
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Direct human connections */}
            <div className="space-y-6 flex flex-col justify-center">
              {/* Direct email box */}
              <div className="p-6 bg-white/5 rounded-2xl border border-white/10 space-y-3 group hover:border-orange-500/30 transition-all">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-400 border border-orange-500/20">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="block text-[10px] font-mono text-gray-400 uppercase tracking-widest">
                        Email Address
                      </span>
                      <span className="block text-sm font-semibold text-white">
                        munshid.ds@gmail.com
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleCopy("munshid.ds@gmail.com", "email")}
                    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:border-orange-500/20 flex items-center justify-center text-gray-400 hover:text-white transition-all active:scale-95 cursor-pointer"
                    title="Copy Email"
                  >
                    {copiedText === "email" ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Direct phone box */}
              <div className="p-6 bg-white/5 rounded-2xl border border-white/10 space-y-3 group hover:border-orange-500/30 transition-all">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-400 border border-orange-500/20">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="block text-[10px] font-mono text-gray-400 uppercase tracking-widest">
                        Telephone Node
                      </span>
                      <span className="block text-sm font-semibold text-white">
                        +91 9544428993
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleCopy("9544428993", "phone")}
                    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:border-orange-500/20 flex items-center justify-center text-gray-400 hover:text-white transition-all active:scale-95 cursor-pointer"
                    title="Copy Number"
                  >
                    {copiedText === "phone" ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Mobile quick trigger button directly inline */}
              <button
                onClick={() => setIsChatOpen(true)}
                className="w-full md:hidden flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-white/5 border border-white/10 text-orange-300 font-mono text-xs uppercase"
              >
                <Terminal className="w-4 h-4" />
                Explore My Mind AI
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-white/10 bg-[#040306]/80 backdrop-blur-md py-12 text-center text-gray-500 select-none">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-left space-y-1">
            <span className="font-display font-medium text-white text-sm block">Munshid Rahman K</span>
            <span className="font-mono text-[10px] text-gray-400 block uppercase tracking-widest">
              Translating intelligence, solving complex data
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-6 font-mono text-[11px] text-gray-400">
            <button onClick={() => scrollToSection("hero")} className="hover:text-white transition-colors">
              [ 01 // Home ]
            </button>
            <button onClick={() => scrollToSection("expertise")} className="hover:text-white transition-colors">
              [ 02 // Stack ]
            </button>
            <button onClick={() => scrollToSection("projects")} className="hover:text-white transition-colors">
              [ 03 // Systems ]
            </button>
          </div>

          <div className="text-center sm:text-right font-mono text-[10px] text-gray-500">
            © 2026 // MUNSHID RAHMAN K. INTERNAL STACK v2.5
          </div>
        </div>
      </footer>

      {/* Interactive AI Mind Chatbot Drawer */}
      <MindChatDrawer isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
}
