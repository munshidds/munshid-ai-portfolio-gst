"use client";

import React from "react";
import { motion } from "motion/react";

interface CinematicRevealProps {
  words: string;
  className?: string;
  delay?: number;
  wordDelay?: number;
  direction?: "up" | "down";
  once?: boolean;
}

/**
 * CinematicReveal splits a block of text into words and applies a high-end
 * masked translation transition. Words slide up smoothly from an invisible mask,
 * which is the classic design pattern used in premium cinematic/creative agency sites.
 */
export function CinematicReveal({
  words,
  className = "",
  delay = 0,
  wordDelay = 0.04,
  direction = "up",
  once = true,
}: CinematicRevealProps) {
  const allWords = words.split(" ");

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: wordDelay,
        delayChildren: delay,
      },
    },
  };

  const wordVariants = {
    hidden: {
      y: direction === "up" ? "110%" : "-110%",
      opacity: 0,
    },
    visible: {
      y: "0%",
      opacity: 1,
      transition: {
        duration: 0.85,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number], // Custom cinematic cubic-bezier (out-expo style)
      },
    },
  };

  return (
    <motion.span
      className={`inline-flex flex-wrap ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
    >
      {allWords.map((word, index) => (
        <span
          key={index}
          className="relative inline-block overflow-hidden py-0.5 mr-[0.25em]"
          style={{ verticalAlign: "bottom" }}
        >
          <motion.span
            variants={wordVariants}
            className="inline-block transform-gpu origin-bottom font-display"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

interface LetterRevealProps {
  text: string;
  className?: string;
  delay?: number;
  letterDelay?: number;
  once?: boolean;
}

/**
 * LetterReveal animates each individual symbol/character, adding a premium 
 * cinematic blur-reduction and springy scale-up entrance behavior.
 */
export function LetterReveal({
  text,
  className = "",
  delay = 0,
  letterDelay = 0.02,
  once = true,
}: LetterRevealProps) {
  const letters = Array.from(text);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: letterDelay,
        delayChildren: delay,
      },
    },
  };

  const letterVariants = {
    hidden: {
      opacity: 0,
      y: 12,
      scale: 0.94,
      filter: "blur(4px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        type: "spring" as const,
        damping: 16,
        stiffness: 110,
      },
    },
  };

  return (
    <motion.span
      className={`inline-block ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
    >
      {letters.map((char, index) => {
        if (char === " ") {
          return <span key={index}>&nbsp;</span>;
        }
        return (
          <motion.span
            key={index}
            variants={letterVariants}
            className="inline-block origin-bottom transform-gpu"
          >
            {char}
          </motion.span>
        );
      })}
    </motion.span>
  );
}

interface CinematicSubheadingProps {
  children: React.ReactNode;
  delay?: number;
}

/**
 * A soft, elegant fading container with subtle spacing expander animation
 * that represents top-tier editorial design layouts.
 */
export function CinematicSubheading({ children, delay = 0.45 }: CinematicSubheadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, filter: "blur(8px)", y: 15, letterSpacing: "-0.01em" }}
      whileInView={{ opacity: 1, filter: "blur(0px)", y: 0, letterSpacing: "0px" }}
      viewport={{ once: true }}
      transition={{
        duration: 1.1,
        delay,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      }}
    >
      {children}
    </motion.div>
  );
}
