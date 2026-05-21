"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, Sparkles, X, BrainCircuit, ArrowUpRight, MessageSquareCode } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface MindChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const PRESET_PROMPTS = [
  "What agentic AI frameworks have you built?",
  "Tell me about the Churn prediction suite.",
  "Which databases and vector engines do you use?",
  "How can I contact or hire you?",
];

const LOADING_STATUSES = [
  "Awakening digital synopsis...",
  "Querying vector space index...",
  "Consulting local LangGraph networks...",
  "Analyzing hyper-parameters...",
];

export default function MindChatDrawer({ isOpen, onClose }: MindChatDrawerProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello traveler. I am Munshid's specialized Digital Brain. Ask me anything about his technical expertise, agentic machine learning systems, or mentoring history.",
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [loadingTextIndex, setLoadingTextIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Cycle through funny AI model statuses during loading
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTyping) {
      interval = setInterval(() => {
        setLoadingTextIndex((prev) => (prev + 1) % LOADING_STATUSES.length);
      }, 1500);
    }
    return () => clearInterval(interval);
  }, [isTyping]);

  // Scroll to bottom whenever messages are added
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSendMessage = async (textToSend: string) => {
    const trimmed = textToSend.trim();
    if (!trimmed) return;

    setInputText("");
    const userMessage: Message = { role: "user", content: trimmed };
    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setIsTyping(true);
    setLoadingTextIndex(0);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      if (!response.ok) {
        throw new Error("Failed to communicate with the digital brain.");
      }

      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.text || "I was unable to recall that information." },
      ]);
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "System alert: A momentary disconnect in the synapatic pipeline was detected. Please check your network or try again.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 cursor-pointer"
          />

          {/* Drawer Panel */}
          <motion.div
            id="mind-drawer-panel"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 180 }}
            className="fixed top-0 right-0 h-full w-full max-w-lg bg-[#0a0a0f] border-l border-white/10 shadow-2xl flex flex-col z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="p-5 border-b border-white/10 flex items-center justify-between bg-[#11111a]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500/20 via-orange-500/10 to-violet-500/20 flex items-center justify-center border border-orange-500/30">
                  <BrainCircuit className="w-5 h-5 text-orange-400 animate-pulse" />
                </div>
                <div>
                  <h3 className="font-sans font-medium text-white tracking-wide text-sm leading-none flex items-center gap-1.5">
                    Munshid&apos;s Digital Brain
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  </h3>
                  <span className="font-mono text-[10px] text-gray-400">Powered by Gemini 3.5 Flash</span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full border border-white/10 hover:border-white/30 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat Body */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-5 space-y-4 space-y-reverse select-text bg-[#030308]"
              style={{ scrollBehavior: "smooth" }}
            >
              <div className="space-y-4">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl p-4 text-sm leading-relaxed ${
                        msg.role === "user"
                          ? "bg-gradient-to-bl from-orange-600 to-amber-700 text-white rounded-tr-none border border-orange-500/20 shadow-md shadow-orange-950/20"
                          : "bg-[#11111c] text-gray-200 rounded-tl-none border border-white/10 font-sans shadow-lg shadow-black/40"
                      }`}
                    >
                      {msg.role === "assistant" && (
                        <div className="flex items-center gap-1.5 mb-1.5 font-mono text-[10px] text-orange-400 tracking-wider uppercase font-medium">
                          <MessageSquareCode className="w-3.5 h-3.5" />
                          Response Engine
                        </div>
                      )}
                      <p className="whitespace-pre-line">{msg.content}</p>
                    </div>
                  </div>
                ))}

                {/* Animated Typing Status */}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="max-w-[85%] rounded-2xl rounded-tl-none p-4 bg-[#11111c] border border-white/10 text-gray-400 flex flex-col gap-2">
                      <div className="flex items-center gap-1 text-[11px] font-mono tracking-widest text-orange-400/80 animate-pulse uppercase">
                        <Sparkles className="w-3.5 h-3.5 text-orange-400 spin-animation" />
                        {LOADING_STATUSES[loadingTextIndex]}
                      </div>
                      <div className="flex gap-1.5 items-center pl-1 pt-1">
                        <span className="w-2 h-2 rounded-full bg-orange-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                        <span className="w-2 h-2 rounded-full bg-orange-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                        <span className="w-2 h-2 rounded-full bg-orange-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Presets Menu */}
            <div className="p-4 bg-[#0a0a0f] border-t border-white/5">
              <span className="block font-mono text-[10px] text-gray-400 uppercase tracking-widest mb-2 px-1">
                Explore Core Topics
              </span>
              <div className="flex flex-wrap gap-2">
                {PRESET_PROMPTS.map((prompt) => (
                  <button
                    key={prompt}
                    disabled={isTyping}
                    onClick={() => handleSendMessage(prompt)}
                    className="flex items-center gap-1 text-left text-xs bg-[#11111e]/80 hover:bg-orange-500/10 border border-white/10 hover:border-orange-500/30 text-gray-300 hover:text-orange-300 rounded-full px-3.5 py-1.5 transition-all text-ellipsis overflow-hidden disabled:opacity-40"
                  >
                    {prompt}
                    <ArrowUpRight className="w-3 h-3 flex-shrink-0" />
                  </button>
                ))}
              </div>
            </div>

            {/* Text Input Footer */}
            <div className="p-4 border-t border-white/10 bg-[#11111a] flex gap-3 items-center">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSendMessage(inputText);
                }}
                disabled={isTyping}
                placeholder="Ask my Digital Brain a question..."
                className="flex-1 h-11 bg-black/40 text-sm text-white px-4 border border-white/10 rounded-full outline-none focus:border-orange-500/40 focus:ring-1 focus:ring-orange-500/10 placeholder-gray-500 transition-all disabled:opacity-60"
              />
              <button
                onClick={() => handleSendMessage(inputText)}
                disabled={isTyping || !inputText.trim()}
                className="w-11 h-11 rounded-full bg-gradient-to-tr from-orange-600 to-amber-600 flex items-center justify-center text-white hover:opacity-90 active:scale-95 border border-orange-500/20 disabled:opacity-50 disabled:pointer-events-none transition-all"
              >
                <Send className="w-4 h-4 ml-0.5" />
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
