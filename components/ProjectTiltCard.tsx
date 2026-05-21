"use client";

import React, { useRef } from "react";

interface ProjectTiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  maxTilt?: number;            // Maximum tilt angle (degrees)
  scale?: number;              // Hover scale factor
  perspective?: number;        // Perspective depth (px)
  transitionSpeed?: string;     // Time for general transitions
}

/**
 * A specialized 3D Project Card that implements interactive mouse tilt,
 * hardware acceleration, exploded interior layer depth (preserve-3d), and
 * gentle recovery spring-back on cursor departure.
 */
export default function ProjectTiltCard({
  children,
  maxTilt = 8,
  scale = 1.015,
  perspective = 1000,
  transitionSpeed = "0.6s cubic-bezier(0.25, 1, 0.5, 1)",
  className = "",
  style = {},
  ...props
}: ProjectTiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const width = rect.width;
    const height = rect.height;

    const xPercent = x / width - 0.5;
    const yPercent = y / height - 0.5;

    // TiltX around the horizontal axis (y offset), TiltY around vertical axis (x offset)
    const tiltX = -yPercent * maxTilt;
    const tiltY = xPercent * maxTilt;

    // Apply 3D transformations dynamically with zero react state overhead for raw 120fps speed
    card.style.transform = `perspective(${perspective}px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(${scale}, ${scale}, ${scale})`;
  };

  const handleMouseEnter = () => {
    const card = cardRef.current;
    if (!card) return;
    // Fast snap response during interactions
    card.style.transition = "transform 0.15s cubic-bezier(0.25, 0.8, 0.25, 1), border-color 0.3s ease, box-shadow 0.3s ease";
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    // Gentle recovery transition to normal state
    card.style.transition = `transform ${transitionSpeed}, border-color 0.3s ease, box-shadow 0.3s ease`;
    card.style.transform = `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative select-none transition-all ${className}`}
      style={{
        transformStyle: "preserve-3d",
        willChange: "transform",
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}
