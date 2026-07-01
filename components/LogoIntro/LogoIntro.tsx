"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./LogoIntro.module.css";
import HeroSection from "../HeroSection";
import AboutSection from "../AboutSection";
import ContactSection from "../ContactSection";

export default function LogoIntro() {
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
  }, []);

  // Lock scroll during intro, unlock to allow normal scrolling once logo is positioned
  useEffect(() => {
    if (isAtLeft) {
      document.body.style.overflowY = "auto";
      document.body.style.overflowX = "hidden";
    } else {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.overflowX = "";
      document.body.style.overflowY = "";
    };
  }, [isAtLeft]);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };


  if (!hasMounted) {
    return <div className="min-h-screen bg-[#0a0a0a]" />;
  }

  return (
    <div 
      className={`min-h-screen relative select-none ${isAtLeft ? "overflow-visible" : "overflow-hidden"}`}
      style={{ backgroundColor: isAtLeft ? "transparent" : "#0a0a0a" }}
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

      {/* Unified Hamburger Menu Button (visible on all screens after logo settles) */}
      <button 
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className={`${styles.burgerButton} ${isMenuOpen ? styles.open : ""} ${
          isAtLeft ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
        style={{
          top: "var(--logo-offset)",
          right: "var(--logo-offset)",
        }}
      >
        <span className={styles.burgerLine1} />
        <span className={styles.burgerLine2} />
        <span className={styles.burgerLine3} />
      </button>

      {/* Fullscreen Overlay Menu */}
      <div 
        className={`${styles.menuOverlay} ${
          isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Header spacer inside overlay */}
        <div className={styles.menuHeader} />

        {/* Vertical menu links */}
        <div className={styles.menuItems}>
          <a href="#home" onClick={(e) => handleScrollTo(e, 'home')} className={styles.menuLink}>
            Home
          </a>
          <a href="#about" onClick={(e) => handleScrollTo(e, 'about')} className={styles.menuLink}>
            About
          </a>
          <a href="#contact" onClick={(e) => handleScrollTo(e, 'contact')} className={styles.menuLink}>
            Contact
          </a>
        </div>

        {/* Footer inside overlay */}
        <div className={styles.menuFooter}>
          <span className={styles.supportLabel}>Need Support?</span>
          <a href="mailto:hello@vgen.co" className={styles.supportEmail}>
            hello@vgen.co
          </a>
        </div>
      </div>

      {/* Home Section */}
      <div id="home">
        <HeroSection isVisible={isAtLeft} />
      </div>

      {/* Stacked Sections (Rendered only after intro completes) */}
      {isAtLeft && (
        <>
          <div id="about">
            <AboutSection />
          </div>
          <div id="contact">
            <ContactSection />
          </div>
        </>
      )}

    </div>
  );
}
