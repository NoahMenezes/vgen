"use client";

import styles from "./HeroSection.module.css";

interface HeroSectionProps {
  isVisible: boolean;
}

export default function HeroSection({ isVisible }: HeroSectionProps) {
  return (
    <div className={`${styles.heroContainer} ${isVisible ? styles.visible : ""}`}>
      
      {/* Grid crosshair lines */}
      <div className={styles.horizLine} />
      <div className={styles.vertLine} />

      {/* Centered agency overview */}
      <div className={styles.centerBlock}>
        <h2 className={styles.title}>Vgen</h2>
        <p className={styles.subtitle}>Web · App · AI Agent Services</p>
      </div>

      {/* Scroll Explore Indicator */}
      <div className={styles.scrollIndicator}>
        <span className={styles.scrollText}>Scroll to explore</span>
        <div className={styles.scrollLine} />
      </div>

    </div>
  );
}
