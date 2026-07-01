"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "@/components/LogoIntro/LogoIntro.module.css";
import AboutSection from "@/components/AboutSection";

export default function AboutPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "auto";
    document.body.style.overflowX = "hidden";
    document.body.style.overflowY = "auto";
  }, []);

  return (
    <main className="min-h-screen relative select-none">
      
      {/* Vgen Logo link in top-left (stays static, no entry animation on this subpage) */}
      <Link href="/">
        <h1 
          className={`font-serif-headline font-normal uppercase tracking-[0.25em] ${styles.logoTransition} ${styles.logoStage2}`}
          style={{ fontSize: "var(--logo-size)" }}
        >
          Vgen
        </h1>
      </Link>

      {/* Unified Hamburger Menu Button */}
      <button 
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className={`${styles.burgerButton} ${isMenuOpen ? styles.open : ""}`}
        style={{
          top: "var(--logo-offset)",
          right: "var(--logo-offset)",
          opacity: 1,
          transform: "translate3d(0, 0, 0)",
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
          <Link href="/" className={styles.menuLink}>
            Home
          </Link>
          <span onClick={() => setIsMenuOpen(false)} className={styles.menuLink}>
            About
          </span>
        </div>

        {/* Footer inside overlay */}
        <div className={styles.menuFooter}>
          <span className={styles.supportLabel}>Need Support?</span>
          <a href="mailto:hello@vgen.co" className={styles.supportEmail}>
            hello@vgen.co
          </a>
        </div>
      </div>

      {/* About Page Contents */}
      <AboutSection />

    </main>
  );
}
