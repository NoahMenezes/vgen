"use client";

import { useState, useEffect } from "react";
import styles from "./LogoIntro.module.css";

export default function LogoIntro() {
  const [animationKey, setAnimationKey] = useState(0);
  const [isCurtainUp, setIsCurtainUp] = useState(false);
  const [isAtLeft, setIsAtLeft] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const mountTimer = setTimeout(() => {
      setHasMounted(true);
    }, 0);
    
    // Phase 1: Wait 3 seconds, then slide curtain up and move logo to top center
    const curtainTimer = setTimeout(() => {
      setIsCurtainUp(true);
    }, 3000);

    // Phase 2: Wait 4.8 seconds (3s initial + 1.8s vertical transition), then slide logo to the left corner slowly
    const leftTimer = setTimeout(() => {
      setIsAtLeft(true);
    }, 4800);

    return () => {
      clearTimeout(mountTimer);
      clearTimeout(curtainTimer);
      clearTimeout(leftTimer);
    };
  }, [animationKey]);

  const handleReplay = () => {
    setIsCurtainUp(false);
    setIsAtLeft(false);
    setIsMenuOpen(false);
    setAnimationKey((prev) => prev + 1);
  };

  if (!hasMounted) {
    return <div className="min-h-screen bg-black" />;
  }

  return (
    <div 
      key={animationKey} 
      className="bg-white min-h-screen relative overflow-hidden select-none"
    >
      
      {/* Black Curtain Section (in front initially) */}
      <div 
        className={`fixed inset-0 bg-black z-10 transition-transform duration-[1.6s] ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isCurtainUp ? "translate-y-[-100%]" : "translate-y-0"
        }`}
      />

      {/* Centered Logo Text "Vgen" (Z-indexed above curtain) */}
      <h1 
        className={`font-serif-headline font-normal uppercase tracking-[0.25em] ${styles.logoTransition} ${
          !isCurtainUp 
            ? styles.logoStage0
            : isAtLeft
            ? styles.logoStage2
            : styles.logoStage1
        }`}
        style={{
          fontSize: "var(--logo-size)",
        }}
      >
        Vgen
      </h1>

      {/* Desktop & Tablet Navigation (appears on the top-right after logo moves left) */}
      <nav 
        className={`fixed z-20 hidden md:flex items-center transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isAtLeft ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
        style={{
          top: "var(--logo-offset)",
          right: "var(--logo-offset)",
          gap: "clamp(16px, 2vw, 32px)",
          fontSize: "clamp(10px, 1vw, 12px)",
        }}
      >
        <span className="font-sans font-light uppercase tracking-[0.2em] text-black cursor-pointer hover:text-zinc-500 transition-colors">
          Home
        </span>
        <span className="font-sans font-light uppercase tracking-[0.2em] text-black cursor-pointer hover:text-zinc-500 transition-colors">
          Services
        </span>
        <span className="font-sans font-light uppercase tracking-[0.2em] text-black cursor-pointer hover:text-zinc-500 transition-colors">
          Work
        </span>
        <span className="font-sans font-light uppercase tracking-[0.2em] text-black cursor-pointer hover:text-zinc-500 transition-colors">
          OurStory
        </span>
        <span className="font-sans font-light uppercase tracking-[0.2em] text-black cursor-pointer hover:text-zinc-500 transition-colors">
          Contact
        </span>
      </nav>

      {/* Mobile Menu Toggle Button (displays below md breakpoint) */}
      <button 
        onClick={() => setIsMenuOpen(true)}
        className={`fixed z-20 md:hidden font-sans font-light uppercase tracking-[0.2em] text-black cursor-pointer hover:text-zinc-500 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isAtLeft ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
        style={{
          top: "var(--logo-offset)",
          right: "var(--logo-offset)",
          fontSize: "clamp(10px, 1.5vw, 12px)",
        }}
      >
        Menu
      </button>

      {/* Fullscreen Mobile Overlay Menu */}
      <div 
        className={`fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isMenuOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-full pointer-events-none"
        }`}
      >
        {/* Close button in top right */}
        <button 
          onClick={() => setIsMenuOpen(false)}
          className="absolute font-sans font-light uppercase tracking-[0.2em] text-white hover:text-zinc-400 cursor-pointer"
          style={{
            top: "var(--logo-offset)",
            right: "var(--logo-offset)",
            fontSize: "clamp(10px, 1.5vw, 12px)",
          }}
        >
          Close
        </button>

        {/* Vertical menu links */}
        <div className="flex flex-col items-center gap-8">
          <span 
            onClick={() => setIsMenuOpen(false)}
            className="font-serif-headline text-3xl uppercase tracking-[0.25em] text-white cursor-pointer hover:text-zinc-400 transition-colors"
          >
            Home
          </span>
          <span 
            onClick={() => setIsMenuOpen(false)}
            className="font-serif-headline text-3xl uppercase tracking-[0.25em] text-white cursor-pointer hover:text-zinc-400 transition-colors"
          >
            Services
          </span>
          <span 
            onClick={() => setIsMenuOpen(false)}
            className="font-serif-headline text-3xl uppercase tracking-[0.25em] text-white cursor-pointer hover:text-zinc-400 transition-colors"
          >
            Work
          </span>
          <span 
            onClick={() => setIsMenuOpen(false)}
            className="font-serif-headline text-3xl uppercase tracking-[0.25em] text-white cursor-pointer hover:text-zinc-400 transition-colors"
          >
            OurStory
          </span>
          <span 
            onClick={() => setIsMenuOpen(false)}
            className="font-serif-headline text-3xl uppercase tracking-[0.25em] text-white cursor-pointer hover:text-zinc-400 transition-colors"
          >
            Contact
          </span>
        </div>
      </div>

      {/* Subtle Replay Button at the bottom (fades in on the white background) */}
      <div 
        className={`fixed z-20 transition-opacity duration-1000 ${
          isAtLeft ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{
          bottom: "var(--logo-offset)",
          right: "var(--logo-offset)",
        }}
      >
        <button
          onClick={handleReplay}
          className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 hover:text-black transition-colors cursor-pointer border border-zinc-200 hover:border-black px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-xs"
        >
          Replay
        </button>
      </div>

    </div>
  );
}
