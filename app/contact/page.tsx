"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "@/components/LogoIntro/LogoIntro.module.css";
import ContactSection from "@/components/ContactSection";

export default function ContactPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "auto";
    document.body.style.overflowX = "hidden";
    document.body.style.overflowY = "auto";
  }, []);

  return (
    <main className="min-h-screen relative select-none bg-white">
      
      {/* Vgen Logo link in top-left (stays static, forced dark color on contact page) */}
      <Link href="/">
        <h1 
          className={`font-serif-headline font-normal uppercase tracking-[0.25em] ${styles.logoTransition} ${styles.logoStage2}`}
          style={{ fontSize: "var(--logo-size)", color: "#0a0a0a" }}
        >
          Vgen
        </h1>
      </Link>

      {/* Unified Hamburger Menu Button (forced dark color unless menu is open) */}
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
        <span className={styles.burgerLine1} style={{ backgroundColor: isMenuOpen ? "#ffffff" : "#0a0a0a" }} />
        <span className={styles.burgerLine2} style={{ backgroundColor: isMenuOpen ? "#ffffff" : "#0a0a0a" }} />
        <span className={styles.burgerLine3} style={{ backgroundColor: isMenuOpen ? "#ffffff" : "#0a0a0a" }} />
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
          <Link href="/about" className={styles.menuLink}>
            About
          </Link>
          <span onClick={() => setIsMenuOpen(false)} className={styles.menuLink}>
            Contact
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

      {/* Contact Page Contents */}
      <ContactSection />

    </main>
  );
}
