"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import munshidAvatar from "@/src/assets/images/munshid_avatar_1779360974913.png";
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
  X,
  Upload,
  Camera,
  RefreshCw,
  Briefcase,
  TrendingUp,
  Workflow
} from "lucide-react";
import ThreeBackground from "@/components/ThreeBackground";
import MindChatDrawer from "@/components/MindChatDrawer";
import TiltCard from "@/components/TiltCard";
import ProjectTiltCard from "@/components/ProjectTiltCard";
import { CinematicReveal, LetterReveal, CinematicSubheading } from "@/components/CinematicTitle";

// Custom type for active viewport section
type SectionId = "hero" | "expertise" | "projects" | "timeline" | "contact";

export default function Page() {
  const [activeSection, setActiveSection] = useState<SectionId>("hero");
  const [copiedText, setCopiedText] = useState<"email" | "phone" | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  // Expanded project index state
  const [expandedProject, setExpandedProject] = useState<number | null>(null);

  const [customAvatar, setCustomAvatar] = useState<string | null>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("munshid_custom_avatar");
    }
    return null;
  });

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        try {
          localStorage.setItem("munshid_custom_avatar", base64String);
          setCustomAvatar(base64String);
        } catch (error) {
          alert("Image file is too large! Please crop or use a smaller image file (under 2MB).");
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const clearCustomAvatar = () => {
    localStorage.removeItem("munshid_custom_avatar");
    setCustomAvatar(null);
  };

  // References to section elements to track viewport scroll positions
  const heroRef = useRef<HTMLElement>(null);
  const expertiseRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  const bgShape1Ref = useRef<HTMLDivElement>(null);
  const bgShape2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = projectsRef.current;
    if (!section) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const width = rect.width;
      const height = rect.height;

      const percentX = (x / width) - 0.5;
      const percentY = (y / height) - 0.5;

      // Subtle inverse displacement for parallax depth
      const moveX = -percentX * 35; // max 35px shift
      const moveY = -percentY * 35;

      if (bgShape1Ref.current) {
        bgShape1Ref.current.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
      }
      if (bgShape2Ref.current) {
        bgShape2Ref.current.style.transform = `translate3d(${-moveX * 0.8}px, ${-moveY * 0.8}px, 0)`;
      }
    };

    const handleMouseLeave = () => {
      // Smoothly returning to original placement
      if (bgShape1Ref.current) {
        bgShape1Ref.current.style.transition = "transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)";
        bgShape1Ref.current.style.transform = "translate3d(0px, 0px, 0px)";
      }
      if (bgShape2Ref.current) {
        bgShape2Ref.current.style.transition = "transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)";
        bgShape2Ref.current.style.transform = "translate3d(0px, 0px, 0px)";
      }
    };

    const handleMouseEnter = () => {
      if (bgShape1Ref.current) {
        bgShape1Ref.current.style.transition = "none";
      }
      if (bgShape2Ref.current) {
        bgShape2Ref.current.style.transition = "none";
      }
    };

    section.addEventListener("mousemove", handleMouseMove);
    section.addEventListener("mouseenter", handleMouseEnter);
    section.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      section.removeEventListener("mousemove", handleMouseMove);
      section.removeEventListener("mouseenter", handleMouseEnter);
      section.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 40);

      const scrollPos = window.scrollY + window.innerHeight / 3;

      const heroTop = heroRef.current?.offsetTop || 0;
      const expertiseTop = expertiseRef.current?.offsetTop || 0;
      const projectsTop = projectsRef.current?.offsetTop || 0;
      const timelineTop = timelineRef.current?.offsetTop || 0;
      const contactTop = contactRef.current?.offsetTop || 0;

      if (scrollPos >= contactTop - 100) {
        setActiveSection("contact");
      } else if (scrollPos >= timelineTop - 100) {
        setActiveSection("timeline");
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
      title: "AI & Intelligence Systems",
      icon: <Brain className="w-6 h-6 text-orange-400" />,
      tagline: "advanced generative architectures",
      glowClass: "panel-glow",
      colorTheme: "amber",
      skills: [
        { name: "Generative AI Applications", level: "expert" },
        { name: "Retrieval-Augmented Gen (RAG)", level: "expert" },
        { name: "Agentic AI Frameworks", level: "expert" },
        { name: "LLM Fine-Tuning & Prompting", level: "expert" },
        { name: "NLP & OCR Systems", level: "expert" },
        { name: "Semantic Search Architectures", level: "expert" }
      ],
      tools: ["GPT", "Gemini", "Qwen", "LLaMA", "CLIP", "TrOCR"]
    },
    {
      id: "backend-infrastructure",
      title: "Backend & AI Infrastructure",
      icon: <Database className="w-6 h-6 text-violet-400" />,
      tagline: "scalable pipeline infrastructure",
      glowClass: "panel-glow-purple",
      colorTheme: "violet",
      skills: [
        { name: "FastAPI, Django & Flask", level: "expert" },
        { name: "REST API Engineering", level: "expert" },
        { name: "LangChain Orchestration", level: "expert" },
        { name: "LangGraph Agent Pipelines", level: "expert" },
        { name: "LlamaIndex Framework", level: "advanced" },
        { name: "Async AI Execution Pipelines", level: "expert" }
      ],
      tools: ["Python", "FastAPI", "Flask", "Django", "LangChain", "LangGraph", "LlamaIndex"]
    },
    {
      id: "automation-vector",
      title: "Workflow, Vector & MLOps",
      icon: <Workflow className="w-6 h-6 text-emerald-400" />,
      tagline: "robust production integration",
      glowClass: "panel-glow-gold",
      colorTheme: "emerald",
      skills: [
        { name: "n8n AI Workflows & Automation", level: "expert" },
        { name: "Multi-step Reasoning Pipelines", level: "expert" },
        { name: "ChromaDB & Qdrant Vector Systems", level: "expert" },
        { name: "PostgreSQL, MySQL, Redis", level: "advanced" },
        { name: "Promptfoo & LangSmith Evaluation", level: "advanced" },
        { name: "Docker, Azure & CI/CD Pipelines", level: "advanced" }
      ],
      tools: ["n8n", "ChromaDB", "Qdrant", "Promptfoo", "LangSmith", "Docker", "Azure", "Pytest"]
    }
  ];

  const projectsData = [
    {
      index: "01",
      title: "AI-Powered Churn Prediction Engine",
      scope: "Enterprise Customer Retention",
      context: "Predictive AI platform engineered for WHMCS ecosystems using behavioral analytics, transformer-based sentiment intelligence, and automated ML pipelines.",
      deepDive: "Lined up behavioral tracking metrics, product metrics, and financial records for clients. Built a deep sentiment classification system of history support logs with fine-tuned transformers. Containerized via Docker and covered with Pytest to proactively alert retention squads before cancellations occur.",
      tags: ["Transformers", "Behavioral Analytics", "WHMCS Integration", "Sentiment Intelligence", "Docker", "Pytest"],
      link: "https://github.com"
    },
    {
      index: "02",
      title: "Agentic AI Support Framework",
      scope: "LangGraph Reasoning Node",
      context: "Context-aware support architecture powered by LangGraph, FastAPI, vector retrieval, and multi-model reasoning systems.",
      deepDive: "Engineered sequential reasoning algorithms and multi-agent system state graphs with LangGraph. Utilized FastAPI to expose low-latency RAG endpoints indexing complete technical libraries within ChromaDB to handle automated server panel customer queries.",
      tags: ["LangGraph", "FastAPI", "Vector Retrieval", "Multi-Agent System", "RAG Pipeline"],
      link: "https://github.com"
    },
    {
      index: "03",
      title: "Visual Hybrid Search Engine",
      scope: "Multimodal Vector Retrieval",
      context: "Semantic visual search system combining OCR extraction, CLIP embeddings, and intelligent vector similarity ranking.",
      deepDive: "Merged text queries and picture embeddings in the identical latent space with CLIP. Integrated TrOCR logic for instant textual recognition inside product images, sorting similarities with high speed vector rankings via Qdrant.",
      tags: ["CLIP Embeddings", "TrOCR", "Vector Similarity", "OCR Detection", "Hybrid Ranking"],
      link: "https://github.com"
    },
    {
      index: "04",
      title: "Conversational CSV Intelligence",
      scope: "Data RAG & Analysis",
      context: "RAG-powered conversational interface enabling natural language interaction with structured business datasets.",
      deepDive: "Implemented advanced pandas structures and LLM-assisted schema queries. Enables non-technical analytics personas to request aggregations, data stats, and logs summaries through chat, retrieving formatted dynamic reporting panels.",
      tags: ["Data RAG", "Pandas Engine", "LlamaIndex", "Dataset Chat", "Analysis Automation"],
      link: "https://github.com"
    },
    {
      index: "05",
      title: "Semantic Infrastructure Recommendation Engine",
      scope: "Embedding-driven Recommendation",
      context: "Embedding-driven recommendation architecture for intelligent server and service plan matching.",
      deepDive: "Leveraged embedding vectors of technical service plans, servers, and features. Intelligently matches user requirements or hardware specs to identical WHMCS service models, scaling cross-sales vectors with precision.",
      tags: ["Semantic Embeddings", "Recommendation System", "Infrastructure Match", "Telemetry Analytics"],
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
          hasScrolled 
            ? "bg-[#030205]/95 md:bg-black/85 backdrop-blur-lg border-b border-white/5 py-3.5 md:py-4 shadow-lg shadow-black/45" 
            : "bg-transparent py-5 md:py-6"
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
              onClick={() => scrollToSection("timeline")}
              className={`font-mono text-xs tracking-wider uppercase transition-colors ${
                activeSection === "timeline" ? "text-orange-400" : "text-gray-400 hover:text-white"
              }`}
            >
              04 // Timeline
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className={`font-mono text-xs tracking-wider uppercase transition-colors ${
                activeSection === "contact" ? "text-violet-405" : "text-gray-400 hover:text-white"
              }`}
            >
              05 // Connect
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
                  onClick={() => {
                    setMobileMenuOpen(false);
                    scrollToSection("hero");
                  }}
                  className="font-mono text-sm tracking-wider uppercase text-left py-3.5 border-b border-white/5 text-gray-300"
                >
                  <span className="text-orange-400 mr-2">01 //</span> Home
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    scrollToSection("expertise");
                  }}
                  className="font-mono text-sm tracking-wider uppercase text-left py-3.5 border-b border-white/5 text-gray-300"
                >
                  <span className="text-violet-400 mr-2">02 //</span> AI Stack
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    scrollToSection("projects");
                  }}
                  className="font-mono text-sm tracking-wider uppercase text-left py-3.5 border-b border-white/5 text-gray-300"
                >
                  <span className="text-amber-400 mr-2">03 //</span> Systems
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    scrollToSection("timeline");
                  }}
                  className="font-mono text-sm tracking-wider uppercase text-left py-3.5 border-b border-white/5 text-gray-300"
                >
                  <span className="text-orange-400 mr-2">04 //</span> Timeline
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    scrollToSection("contact");
                  }}
                  className="font-mono text-sm tracking-wider uppercase text-left py-3.5 text-gray-300"
                >
                  <span className="text-violet-400 mr-2">05 //</span> Connect
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

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-8">
              {/* Status cluster tag */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full"
              >
                <Sparkles className="w-3.5 h-3.5 text-orange-400" />
                <span className="font-mono text-[10px] uppercase text-gray-300 tracking-widest">
                  01 / CORE INTELLIGENCE
                </span>
              </motion.div>

              {/* Custom Lowercase Display Headline with Cinematic Reveal */}
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-medium leading-[1.05] tracking-tighter text-white lowercase">
                <span className="block mb-2 text-white">
                  <span className="inline-block bg-gradient-to-r from-amber-500/10 via-amber-600/10 to-orange-500/10 border border-amber-500/20 rounded-full px-4 py-0.5 sm:px-5 sm:py-1 text-[#fffcf0] align-middle mr-2.5 sm:mr-4 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_4px_12px_rgba(0,0,0,0.5)]">
                    <CinematicReveal
                      words="engineering"
                      delay={0.15}
                      wordDelay={0.05}
                    />
                  </span>
                  <CinematicReveal
                    words="intelligent systems"
                    delay={0.35}
                    wordDelay={0.05}
                  />
                </span>
                <span className="bg-gradient-to-r from-orange-400 via-amber-400 to-violet-400 bg-clip-text text-transparent italic inline-block mt-1 sm:mt-0">
                  <CinematicReveal
                    words="for real-world scale."
                    delay={0.45}
                    wordDelay={0.05}
                  />
                </span>
              </h1>

              {/* Structured Minimal Human Subheading with Cinematic Blur Transition */}
              <CinematicSubheading delay={0.8}>
                <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed font-sans max-w-2xl font-normal">
                  focused on building production-grade LLM applications, autonomous AI workflows, retrieval architectures, and scalable backend intelligence systems.
                </p>
              </CinematicSubheading>

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

            {/* Right Photo Column - Tilted cinematic avatar representation */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end mt-8 lg:mt-0 select-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full max-w-[320px] sm:max-w-[360px] aspect-[4/5] group"
              >
                {/* Ambient Golden Glow Backdrop */}
                <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-amber-500/15 to-orange-500/15 blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-700 -z-10" />

                <ProjectTiltCard
                  maxTilt={12}
                  scale={1.03}
                  className="w-full h-full rounded-2xl border border-white/10 hover:border-amber-500/30 overflow-hidden bg-[#0a0a0c]/80 backdrop-blur-md transition-shadow duration-300 panel-glow-gold flex flex-col relative"
                >
                  <div className="absolute top-3 left-4 z-20 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                    <span className="font-mono text-[8px] uppercase text-gray-450 tracking-widest font-bold">
                      SYSTEM: ACTIVE_NODE //
                    </span>
                  </div>

                  <div className="flex-1 overflow-hidden relative group/avatar p-3 pb-2 mt-4">
                    <div className="relative w-full h-full rounded-xl overflow-hidden bg-[#101014] border border-white/5 group-hover/avatar:border-amber-500/20 transition-colors duration-500">
                      <Image
                        src={customAvatar || munshidAvatar}
                        alt="Munshid Rahman K - AI/ML Engineer Photo"
                        className="object-cover transition-transform duration-700 ease-out group-hover/avatar:scale-105"
                        fill
                        sizes="(max-width: 768px) 100vw, 360px"
                        priority
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-85" />
                    </div>
                  </div>

                  <div className="px-5 py-4 border-t border-white/5 bg-[#09090b]/90 z-20 flex justify-between items-center transform-gpu" style={{ transform: "translateZ(30px)" }}>
                    <div className="space-y-0.5">
                      <span className="font-mono text-[9px] uppercase tracking-widest text-amber-500 font-bold">
                        ENGINEER // IDENT
                      </span>
                      <h4 className="font-display font-medium text-sm text-white tracking-wide">
                        Munshid Rahman K
                      </h4>
                    </div>
                    <div className="font-mono text-[9px] text-gray-500 px-2 py-1 rounded bg-white/5 border border-white/5 uppercase select-none font-bold">
                      MLOps / ARCH
                    </div>
                  </div>
                </ProjectTiltCard>
              </motion.div>
            </div>
          </div>

          {/* 02 / NEURAL IDENTITY SECTION */}
          <div className="mt-20 sm:mt-28 border-t border-white/10 pt-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 space-y-4">
              <span className="font-mono text-xs uppercase text-orange-400 tracking-widest flex items-center gap-1.5 font-bold">
                <Brain className="w-4 h-4 text-orange-400" />
                02 / NEURAL IDENTITY
              </span>
              <h3 className="text-2xl sm:text-3xl font-display font-medium text-white leading-tight lowercase">
                architecting core cognitive reasoning networks.
              </h3>
              <p className="text-gray-400 font-sans text-sm leading-relaxed max-w-md">
                I design and deploy intelligent systems that combine Generative AI, RAG pipelines, NLP, OCR, vector retrieval, and workflow automation into production-ready business solutions.
              </p>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 bg-[#09080d]/40 backdrop-blur-md p-6 rounded-2xl border border-white/5">
              <div className="space-y-3">
                <span className="block font-mono text-[9px] text-orange-450 uppercase tracking-widest font-bold">
                  // My work revolves around:
                </span>
                <ul className="space-y-2 text-xs text-gray-300 font-sans">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-400/80 flex-shrink-0" />
                    LLM orchestration
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-400/80 flex-shrink-0" />
                    Agentic AI systems
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-400/80 flex-shrink-0" />
                    Semantic retrieval
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-400/80 flex-shrink-0" />
                    AI workflow automation
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-400/80 flex-shrink-0" />
                    Context-aware reasoning
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-400/80 flex-shrink-0" />
                    Scalable inference pipelines
                  </li>
                </ul>
              </div>

              <div className="space-y-4 border-t sm:border-t-0 sm:border-l border-white/10 pt-4 sm:pt-0 sm:pl-6 flex flex-col justify-between">
                <div>
                  <span className="block font-mono text-[9px] text-orange-450 uppercase tracking-widest font-bold mb-2">
                    // Building With
                  </span>
                  <p className="text-xs text-gray-300 leading-relaxed font-sans">
                    FastAPI, LangChain, LangGraph, LlamaIndex, n8n, ChromaDB, Qdrant, GPT, Gemini, Qwen, and LLaMA ecosystems.
                  </p>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-2">
                  <span className="text-[9px] font-mono bg-white/5 border border-white/5 text-gray-400 px-2.5 py-1 rounded">FASTAPI</span>
                  <span className="text-[9px] font-mono bg-white/5 border border-white/5 text-gray-400 px-2.5 py-1 rounded">LANGGRAPH</span>
                  <span className="text-[9px] font-mono bg-white/5 border border-white/5 text-gray-400 px-2.5 py-1 rounded">CHROMADB</span>
                  <span className="text-[9px] font-mono bg-white/5 border border-white/5 text-gray-400 px-2.5 py-1 rounded">QDRANT</span>
                </div>
              </div>
            </div>
          </div>

          {/* 06 / SYSTEM METRICS SECTION */}
          <div className="mt-16 sm:mt-24 border-t border-white/10 pt-12">
            <span className="font-mono text-xs uppercase text-violet-400 tracking-widest flex items-center gap-1.5 font-bold mb-8">
              <TrendingUp className="w-4 h-4 text-violet-400" />
              06 / SYSTEM METRICS
            </span>
            <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
              <div className="p-4 bg-white/5 border border-white/5 hover:border-violet-500/20 rounded-xl space-y-1 group transition-all text-left">
                <span className="block text-2xl font-semibold text-white tracking-tight group-hover:text-violet-450 transition-colors">490+</span>
                <span className="block text-[9px] font-mono text-gray-450 uppercase tracking-widest leading-normal">Engineers &amp; Students Mentored</span>
              </div>
              <div className="p-4 bg-white/5 border border-white/5 hover:border-violet-500/20 rounded-xl space-y-1 group transition-all text-left">
                <span className="block text-2xl font-semibold text-white tracking-tight group-hover:text-violet-450 transition-colors">4.9/5</span>
                <span className="block text-[9px] font-mono text-gray-450 uppercase tracking-widest leading-normal">Training Evaluation</span>
              </div>
              <div className="p-4 bg-white/5 border border-white/5 hover:border-violet-500/20 rounded-xl space-y-1 group transition-all text-left">
                <span className="block text-2xl font-semibold text-white tracking-tight group-hover:text-violet-450 transition-colors">Delivered</span>
                <span className="block text-[9px] font-mono text-gray-450 uppercase tracking-widest leading-normal">Production AI Systems</span>
              </div>
              <div className="p-4 bg-white/5 border border-white/5 hover:border-violet-500/20 rounded-xl space-y-1 group transition-all text-left">
                <span className="block text-2xl font-semibold text-white tracking-tight group-hover:text-violet-450 transition-colors">Engineered</span>
                <span className="block text-[9px] font-mono text-gray-450 uppercase tracking-widest leading-normal">Multi-LLM Integrations</span>
              </div>
              <div className="p-4 bg-white/5 border border-white/5 hover:border-violet-500/20 rounded-xl space-y-1 group transition-all text-left">
                <span className="block text-2xl font-semibold text-white tracking-tight group-hover:text-violet-450 transition-colors">Built</span>
                <span className="block text-[9px] font-mono text-gray-450 uppercase tracking-widest leading-normal">End-to-End RAG Architectures</span>
              </div>
              <div className="p-4 bg-white/5 border border-white/5 hover:border-violet-500/20 rounded-xl space-y-1 group transition-all text-left">
                <span className="block text-2xl font-semibold text-white tracking-tight group-hover:text-violet-450 transition-colors">Automated</span>
                <span className="block text-[9px] font-mono text-gray-450 uppercase tracking-widest leading-normal">Intelligent Workflow Pipelines</span>
              </div>
            </div>
          </div>
        </section>

        {/* CORE EXPERTISE (THE AI STACK) */}
        <section
          ref={expertiseRef}
          id="expertise"
          className="py-24 md:py-32 relative border-t border-white/5 overflow-hidden"
        >
          {/* Ambient Background Elements (Floating Abstract 3D Torus and Chain Link) */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {/* Ambient Torus Left */}
            <div className="absolute left-[-8%] top-[12%] opacity-15 animate-float select-none">
              <svg width="280" height="280" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="torusGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#c084fc" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#6366f1" stopOpacity="0.1" />
                  </linearGradient>
                  <linearGradient id="torusGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#312e81" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <ellipse cx="100" cy="100" rx="80" ry="40" stroke="url(#torusGrad1)" strokeWidth="1" strokeDasharray="3 3" transform="rotate(-30, 100, 100)" />
                <ellipse cx="100" cy="100" rx="80" ry="40" stroke="url(#torusGrad1)" strokeWidth="1.5" transform="rotate(0, 100, 100)" />
                <ellipse cx="100" cy="100" rx="80" ry="40" stroke="url(#torusGrad1)" strokeWidth="1" strokeDasharray="5 2" transform="rotate(30, 100, 100)" />
                <ellipse cx="100" cy="100" rx="80" ry="40" stroke="url(#torusGrad1)" strokeWidth="1" transform="rotate(60, 100, 100)" />
                <ellipse cx="100" cy="100" rx="80" ry="40" stroke="url(#torusGrad2)" strokeWidth="1.2" transform="rotate(90, 100, 100)" />
                <ellipse cx="100" cy="100" rx="80" ry="40" stroke="url(#torusGrad2)" strokeWidth="1" transform="rotate(120, 100, 100)" />
                <circle cx="100" cy="100" r="30" stroke="url(#torusGrad1)" strokeWidth="1" opacity="0.5" />
                <circle cx="100" cy="100" r="10" stroke="url(#torusGrad2)" strokeWidth="0.8" opacity="0.3" />
              </svg>
            </div>

            {/* Ambient Chain Link / Linked Rings Right */}
            <div className="absolute right-[-10%] bottom-[18%] opacity-20 animate-float-reverse select-none">
              <svg width="300" height="300" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="chainGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#fb923c" stopOpacity="0.1" />
                  </linearGradient>
                  <linearGradient id="chainGrad2" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#ffedd5" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#ea580c" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <g className="animate-spin-slow" style={{ transformOrigin: "80px 100px" }}>
                  <circle cx="80" cy="100" r="45" stroke="url(#chainGrad1)" strokeWidth="1.5" strokeDasharray="6 3" />
                  <circle cx="80" cy="100" r="35" stroke="url(#chainGrad2)" strokeWidth="1" />
                </g>
                <g style={{ transform: "rotate(45deg)", transformOrigin: "120px 100px" }}>
                  <circle cx="120" cy="100" r="45" stroke="url(#chainGrad1)" strokeWidth="1" />
                  <circle cx="120" cy="100" r="35" stroke="url(#chainGrad2)" strokeWidth="2" strokeDasharray="4 2" />
                </g>
                <line x1="40" y1="100" x2="160" y2="100" stroke="url(#chainGrad2)" strokeWidth="0.5" strokeDasharray="2 4" />
              </svg>
            </div>
            
            {/* Ambient Wave Decor */}
            <div className="absolute left-[35%] bottom-[8%] opacity-10 animate-pulse select-none">
              <svg width="220" height="120" viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0,50 Q25,20 50,50 T100,50 T150,50 T200,50" stroke="#a78bfa" strokeWidth="0.8" />
                <path d="M0,55 Q25,25 50,55 T100,55 T150,55 T200,55" stroke="#f59e0b" strokeWidth="0.5" opacity="0.6" />
              </svg>
            </div>
          </div>

          <div className="relative z-10">
            {/* Section Heading */}
            <div className="space-y-3 mb-16">
              <span className="font-mono text-xs uppercase text-violet-400 tracking-widest flex items-center gap-1.5 font-bold">
                <Terminal className="w-3.5 h-3.5" />
                03 / COGNITIVE STACK
              </span>
              <h2 className="text-3xl sm:text-5xl font-display font-medium tracking-tight lowercase">
                <CinematicReveal words="the intelligent" delay={0.1} />{" "}
                <span className="italic block sm:inline text-violet-400">
                  <CinematicReveal words="neural stack." delay={0.25} />
                </span>
              </h2>
              <CinematicSubheading delay={0.4}>
                <p className="text-sm sm:text-base text-gray-400 font-sans max-w-xl">
                  An exhaustive stack built for high-accuracy reasoning, prompt evaluated models, quality-controlled testing pipelines, and fast vector indexing.
                </p>
              </CinematicSubheading>
            </div>

            {/* Core neural grid */}
            <div className="grid md:grid-cols-3 gap-6">
              {expertiseData.map((category) => (
                <TiltCard
                  key={category.id}
                  maxTilt={12}
                  scale={1.03}
                  className={`bg-[#09080e]/90 rounded-2xl p-6 border border-white/10 hover:border-violet-500/30 transition-shadow duration-300 flex flex-col justify-between ${category.glowClass}`}
                >
                  {/* Visual Accent */}
                  <div className="absolute top-0 right-0 w-24 h-24 rounded-tr-2xl bg-gradient-to-bl from-violet-500/5 to-transparent pointer-events-none group-hover:from-violet-500/10" />

                  <div className="transform-gpu" style={{ transform: "translateZ(20px)" }}>
                    <div className="flex items-center justify-between mb-6 transform-gpu" style={{ transform: "translateZ(30px)" }}>
                      <div className="p-3 bg-white/5 rounded-xl border border-white/10 group-hover:border-violet-500/20 transition-all">
                        {category.icon}
                      </div>
                      <span className="font-mono text-[9px] uppercase text-gray-500 tracking-wider">
                        {category.tagline}
                      </span>
                    </div>

                    <h3 className="text-lg font-display font-medium text-white mb-6 transform-gpu" style={{ transform: "translateZ(40px)" }}>
                      {category.title}
                    </h3>

                    {/* Skills lists */}
                    <ul className="space-y-3 mb-8 transform-gpu" style={{ transform: "translateZ(15px)" }}>
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
                  <div className="border-t border-white/5 pt-5 transform-gpu" style={{ transform: "translateZ(25px)" }}>
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
                </TiltCard>
              ))}
            </div>
          </div>
        </section>

        {/* FEATURED INTELLIGENT SYSTEMS */}
        <section
          ref={projectsRef}
          id="projects"
          className="py-24 md:py-32 relative border-t border-white/5 overflow-hidden"
        >
          {/* Ambient Background Elements (Floating Abstract Gold Geometries / Parallax Link) */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {/* Ambient Gold Octahedron wireframe */}
            <div 
              ref={bgShape1Ref}
              className="absolute left-[5%] top-[10%] opacity-20 animate-float select-none will-change-transform"
            >
              <svg width="220" height="220" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="goldGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#d97706" stopOpacity="0.1" />
                  </linearGradient>
                  <linearGradient id="goldGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#b45309" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <path d="M100 20 L150 100 L100 180 L50 100 Z" stroke="url(#goldGrad1)" strokeWidth="1.2" />
                <path d="M50 100 L150 100" stroke="url(#goldGrad1)" strokeWidth="0.8" strokeDasharray="3 3" />
                <path d="M100 20 L100 180" stroke="url(#goldGrad2)" strokeWidth="0.8" />
                <path d="M100 20 L115 100 L100 180" stroke="url(#goldGrad1)" strokeWidth="1" />
                <path d="M100 20 L85 100 L100 180" stroke="url(#goldGrad1)" strokeWidth="1" />
                <circle cx="100" cy="20" r="3" fill="#fbbf24" />
                <circle cx="150" cy="100" r="3" fill="#fbbf24" />
                <circle cx="100" cy="180" r="3" fill="#fbbf24" />
                <circle cx="50" cy="100" r="3" fill="#fbbf24" />
              </svg>
            </div>

            {/* Ambient Gold Interconnected Node Lattice */}
            <div 
              ref={bgShape2Ref}
              className="absolute right-[8%] bottom-[12%] opacity-15 animate-float-reverse select-none will-change-transform"
            >
              <svg width="240" height="240" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="nodeGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="#ea580c" stopOpacity="0.1" />
                  </linearGradient>
                </defs>
                <line x1="30" y1="40" x2="100" y2="30" stroke="url(#nodeGrad)" strokeWidth="0.8" />
                <line x1="100" y1="30" x2="170" y2="60" stroke="url(#nodeGrad)" strokeWidth="0.8" />
                <line x1="30" y1="40" x2="60" y2="120" stroke="url(#nodeGrad)" strokeWidth="0.8" />
                <line x1="60" y1="120" x2="130" y2="150" stroke="url(#nodeGrad)" strokeWidth="0.8" />
                <line x1="130" y1="150" x2="170" y2="60" stroke="url(#nodeGrad)" strokeWidth="0.8" />
                <line x1="100" y1="30" x2="130" y2="100" stroke="url(#nodeGrad)" strokeWidth="0.8" />
                <line x1="60" y1="120" x2="130" y2="100" stroke="url(#nodeGrad)" strokeWidth="0.8" />
                <line x1="170" y1="60" x2="130" y2="100" stroke="url(#nodeGrad)" strokeWidth="0.8" strokeDasharray="2 2" />
                <line x1="30" y1="40" x2="130" y2="100" stroke="url(#nodeGrad)" strokeWidth="0.5" strokeDasharray="4 2" />

                <circle cx="30" cy="40" r="4" fill="#f59e0b" className="animate-pulse" />
                <circle cx="100" cy="30" r="5" fill="#fbbf24" />
                <circle cx="170" cy="60" r="4" fill="#f59e0b" />
                <circle cx="60" cy="120" r="5" fill="#fbbf24" />
                <circle cx="130" cy="100" r="6" fill="#f59e0b" />
                <circle cx="130" cy="150" r="4" fill="#ea580c" />
              </svg>
            </div>
          </div>

          <div className="relative z-10">
            {/* Section heading */}
            <div className="space-y-3 mb-16">
              <span className="font-mono text-xs uppercase text-amber-500 tracking-widest flex items-center gap-1.5 font-bold">
                <Layers className="w-3.5 h-3.5" />
                04 / INTELLIGENT SYSTEMS
              </span>
              <h2 className="text-3xl sm:text-5xl font-display font-medium tracking-tight lowercase">
                <CinematicReveal words="featured intelligent" delay={0.1} />{" "}
                <span className="italic block sm:inline text-amber-500">
                  <CinematicReveal words="systems." delay={0.25} />
                </span>
              </h2>
              <CinematicSubheading delay={0.4}>
                <p className="text-sm sm:text-base text-gray-400 font-sans max-w-xl">
                  Real-world deployment case studies demonstrating production MLOps integration, contextual LangGraph setups, and deep vector indexing.
                </p>
              </CinematicSubheading>
            </div>

            {/* Dynamic Interactive Case Study Cards */}
            <div className="space-y-6">
              {projectsData.map((project, idx) => {
                const isExpanded = expandedProject === idx;
                return (
                  <ProjectTiltCard
                    key={idx}
                    maxTilt={8}
                    scale={1.015}
                    className="group bg-[#09090b]/90 rounded-2xl border border-white/10 hover:border-amber-500/30 transition-shadow duration-300 panel-glow-gold overflow-hidden"
                  >
                    <div
                      onClick={() => setExpandedProject(isExpanded ? null : idx)}
                      className="p-6 sm:p-8 flex flex-col md:flex-row items-start justify-between gap-6 cursor-pointer select-none relative"
                    >
                      {/* Exploded Depth container */}
                      <div className="space-y-4 flex-1 transform-gpu" style={{ transform: "translateZ(30px)" }}>
                        <div className="flex items-center gap-3 transform-gpu" style={{ transform: "translateZ(40px)" }}>
                          <span className="font-mono text-xs text-amber-500 font-bold tracking-wider">
                            INDEX : {project.index} .
                          </span>
                          <span className="font-mono text-[10px] px-2.5 py-0.5 rounded bg-white/5 text-gray-400 uppercase tracking-widest">
                            {project.scope}
                          </span>
                        </div>

                        <h3 className="text-xl sm:text-2xl font-display font-medium text-white group-hover:text-amber-400 transition-colors transform-gpu" style={{ transform: "translateZ(45px)" }}>
                          {project.title}
                        </h3>

                        <p className="text-sm text-gray-400 font-sans leading-relaxed max-w-3xl transform-gpu" style={{ transform: "translateZ(35px)" }}>
                          {project.context}
                        </p>
                      </div>

                      {/* Explicit Interactive Layer: Deep Investigation Call to Action with Outward sliding and forward translation */}
                      <div 
                        className="flex items-center gap-4 self-end md:self-center pr-2 transform-gpu transition-all duration-300 group-hover:translate-x-2"
                        style={{ transform: "translateZ(55px)" }}
                      >
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
                          className="border-t border-white/10 bg-black/40 transform-gpu"
                          style={{ transform: "translateZ(10px)" }}
                        >
                          <div className="p-6 sm:p-8 space-y-6">
                            <div className="space-y-2 transform-gpu" style={{ transform: "translateZ(20px)" }}>
                              <h4 className="font-mono text-[10px] text-amber-500 uppercase tracking-widest font-bold">
                                Systems Pipeline Investigation & Realized Outcome
                              </h4>
                              <p className="text-sm font-sans text-gray-300 leading-relaxed max-w-3xl">
                                {project.deepDive}
                              </p>
                            </div>

                            {/* Technical Tags */}
                            <div className="flex flex-wrap gap-2 transform-gpu" style={{ transform: "translateZ(15px)" }}>
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
                            <div className="flex items-center justify-between border-t border-white/10 pt-6 transform-gpu" style={{ transform: "translateZ(20px)" }}>
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
                  </ProjectTiltCard>
                );
              })}
            </div>
          </div>
        </section>

        {/* 05 / ENGINEERING TIMELINE */}
        <section
          ref={timelineRef}
          id="timeline"
          className="py-24 md:py-32 relative border-t border-white/5"
        >
          {/* Ambient visual overlay */}
          <div className="absolute top-1/3 right-1/4 -z-20 w-80 h-80 rounded-full bg-orange-500/5 blur-[100px] pointer-events-none" />
          
          <div className="relative z-10">
            <div className="space-y-3 mb-16">
              <span className="font-mono text-xs uppercase text-orange-450 tracking-widest flex items-center gap-1.5 font-bold">
                <Briefcase className="w-3.5 h-3.5" />
                05 / ENGINEERING TIMELINE
              </span>
              <h2 className="text-3xl sm:text-5xl font-display font-medium tracking-tight lowercase">
                <CinematicReveal words="professional journey &" delay={0.1} />{" "}
                <span className="italic block sm:inline text-orange-400">
                  <CinematicReveal words="milestones." delay={0.25} />
                </span>
              </h2>
              <CinematicSubheading delay={0.4}>
                <p className="text-sm sm:text-base text-gray-400 font-sans max-w-xl">
                  Dedicated experience architecting intelligent backend systems, training technical minds, and implementing enterprise MLOps.
                </p>
              </CinematicSubheading>
            </div>

            {/* Timeline structure */}
            <div className="relative max-w-4xl mx-auto pl-6 md:pl-8 border-l border-white/10 space-y-12">
              
              {/* Event 1 */}
              <div className="relative group">
                {/* Node icon and glowing point */}
                <div className="absolute -left-[31px] md:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-orange-500 border-4 border-[#07060b] group-hover:scale-110 group-hover:bg-amber-400 transition-all shadow-[0_0_12px_rgba(249,115,22,0.6)] animate-pulse" />
                
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start bg-[#09080d]/40 border border-white/5 group-hover:border-white/10 p-6 md:p-8 rounded-2xl backdrop-blur-md transition-all">
                  <div className="md:col-span-4 space-y-1">
                    <span className="font-mono text-xs text-orange-400 font-bold uppercase tracking-wider">Poornam Info Vision</span>
                    <h3 className="font-display font-semibold text-lg text-white">AI/ML Engineer</h3>
                    <span className="inline-block font-mono text-[10px] text-gray-400 bg-white/5 border border-white/5 px-2 py-0.5 rounded uppercase mt-1">2024 — Present</span>
                  </div>
                  <div className="md:col-span-8">
                    <ul className="space-y-2.5 text-xs sm:text-sm text-gray-300 font-sans">
                      <li className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500/80 mt-1.5 flex-shrink-0" />
                        <span>Built production-grade AI systems for churn prediction and intelligent support automation.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500/80 mt-1.5 flex-shrink-0" />
                        <span>Developed RAG-based multi-source reasoning pipelines for deep textual architectures.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500/80 mt-1.5 flex-shrink-0" />
                        <span>Integrated GPT, Gemini, Qwen, and LLaMA models into scalable AI/ML pipelines.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500/80 mt-1.5 flex-shrink-0" />
                        <span>Engineered contextual summarization and highly optimized retrieval setups.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Event 2 */}
              <div className="relative group">
                <div className="absolute -left-[31px] md:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-violet-500 border-4 border-[#07060b] group-hover:scale-110 group-hover:bg-violet-400 transition-all shadow-[0_0_12px_rgba(139,92,246,0.6)]" />
                
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start bg-[#09080d]/40 border border-white/5 group-hover:border-white/10 p-6 md:p-8 rounded-2xl backdrop-blur-md transition-all">
                  <div className="md:col-span-4 space-y-1">
                    <span className="font-mono text-xs text-violet-400 font-bold uppercase tracking-wider">RGC Dynamics</span>
                    <h3 className="font-display font-semibold text-lg text-white">AI Developer</h3>
                    <span className="inline-block font-mono text-[10px] text-gray-400 bg-white/5 border border-white/5 px-2 py-0.5 rounded uppercase mt-1">2023 // 1 YEAR</span>
                  </div>
                  <div className="md:col-span-8">
                    <ul className="space-y-2.5 text-xs sm:text-sm text-gray-300 font-sans">
                      <li className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-violet-400 mt-1.5 flex-shrink-0" />
                        <span>Built visual AI search systems and multi-modal models utilizing CLIP, TrOCR, and ChromaDB vector stores.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-violet-400 mt-1.5 flex-shrink-0" />
                        <span>Developed robust hybrid vector retrieval architectures with high-accuracy query parsing.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-violet-400 mt-1.5 flex-shrink-0" />
                        <span>Engineered custom semantic ranking pipelines optimizing discovery engines.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Event 3 */}
              <div className="relative group">
                <div className="absolute -left-[31px] md:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-amber-500 border-4 border-[#07060b] group-hover:scale-110 group-hover:bg-amber-400 transition-all shadow-[0_0_12px_rgba(245,158,11,0.6)]" />
                
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start bg-[#09080d]/40 border border-white/5 group-hover:border-white/10 p-6 md:p-8 rounded-2xl backdrop-blur-md transition-all">
                  <div className="md:col-span-4 space-y-1">
                    <span className="font-mono text-xs text-amber-500 font-bold uppercase tracking-wider">Techolas Technologies</span>
                    <h3 className="font-display font-semibold text-lg text-white">Data Science Trainer</h3>
                    <span className="inline-block font-mono text-[10px] text-gray-400 bg-white/5 border border-white/5 px-2 py-0.5 rounded uppercase mt-1">2022 — 2023</span>
                  </div>
                  <div className="md:col-span-8">
                    <ul className="space-y-2.5 text-xs sm:text-sm text-gray-300 font-sans">
                      <li className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500/80 mt-1.5 flex-shrink-0" />
                        <span>Mentored 490+ students across critical Data Science, Statistics, and AI domains.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500/80 mt-1.5 flex-shrink-0" />
                        <span>Delivered detailed training on Python, Power BI, Tableau and Machine Learning architectures.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500/80 mt-1.5 flex-shrink-0" />
                        <span>Achieved a 4.9/5 student feedback/evaluation rating.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

            </div>
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
                  07 / SYNAPTIC LINK
                </span>
                <h2 className="text-3xl sm:text-5xl font-display font-medium tracking-tight lowercase">
                  <CinematicReveal words="let's build something" delay={0.1} />{" "}
                  <span className="italic text-orange-400 block sm:inline">
                    <CinematicReveal words="intelligent." delay={0.25} />
                  </span>
                </h2>
                <CinematicSubheading delay={0.4}>
                  <p className="text-sm sm:text-base text-gray-400 font-sans leading-relaxed">
                    I am always looking forward to exploring custom machine learning challenges, agent optimization, advanced vector architecture, and scalable mentor initiatives. Touch base relative to collaborations.
                  </p>
                </CinematicSubheading>
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
            <span className="font-mono text-[9px] text-orange-400 block uppercase tracking-widest font-bold">
              08 / FOOTER SIGNAL
            </span>
            <span className="font-display font-medium text-white text-sm block font-bold">Munshid Rahman K</span>
            <span className="font-mono text-[10px] text-gray-400 block uppercase tracking-widest">
              Translating intelligence, solving complex data
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-4 font-mono text-[11px] text-gray-400">
            <button onClick={() => scrollToSection("hero")} className="hover:text-white transition-colors">
              [ 01 // Home ]
            </button>
            <button onClick={() => scrollToSection("expertise")} className="hover:text-white transition-colors">
              [ 03 // Stack ]
            </button>
            <button onClick={() => scrollToSection("projects")} className="hover:text-white transition-colors">
              [ 04 // Systems ]
            </button>
            <button onClick={() => scrollToSection("timeline")} className="hover:text-white transition-colors">
              [ 05 // Timeline ]
            </button>
          </div>

          <div className="text-center sm:text-right font-mono text-[10px] text-gray-500">
            © 2026 // MUNSHID RAHMAN K. INTERNAL STACK v3.0
          </div>
        </div>
      </footer>

      {/* Interactive AI Mind Chatbot Drawer */}
      <MindChatDrawer isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
}
