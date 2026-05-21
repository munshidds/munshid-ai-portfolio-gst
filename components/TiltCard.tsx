"use client";

import React, { useRef } from "react";

interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  maxTilt?: number;          // Maximum tilt angle (degrees)
  scale?: number;            // Hover scale factor
  perspective?: number;      // 3D Perspective distance in pixels
  transitionSpeed?: string;   // Transition timing on reset/enter
}

/**
 * A highly performant, 3D interactive TiltCard using pure Web APIs and Refs.
 * Avoids constant React re-renders on mousemove to maintain buttery-smooth 60+ FPS animations.
 */
export default function TiltCard({
  children,
  maxTilt = 12,
  scale = 1.02,
  perspective = 1000,
  transitionSpeed = "0.5s ease",
  className = "",
  style = {},
  ...props
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position within the element
    const y = e.clientY - rect.top;  // y position within the element

    const width = rect.width;
    const height = rect.height;

    // Normalize coordinates to ranges between -0.5 and 0.5
    const xPercent = x / width - 0.5;
    const yPercent = y / height - 0.5;

    // Calculate rotation angles
    // TiltX rotates around X-axis (depends on vertical mouse cursor offset)
    const tiltX = -yPercent * maxTilt;
    // TiltY rotates around Y-axis (depends on horizontal mouse cursor offset)
    const tiltY = xPercent * maxTilt;

    // Apply the 3D transforms directly for hardware acceleration and latency-free response
    card.style.transform = `perspective(${perspective}px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(${scale}, ${scale}, ${scale})`;
  };

  const handleMouseEnter = () => {
    const card = cardRef.current;
    if (!card) return;
    // Set a tiny snap transition for interactive alignment, then rely on raw movement
    card.style.transition = "transform 0.15s cubic-bezier(0.25, 1, 0.5, 1)";
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    // Apply a gentle release transition and reset back to flat default
    card.style.transition = `transform ${transitionSpeed}`;
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
