"use client";

import Image from "next/image";
import styles from "./HeroSection.module.css";

interface HeroSectionProps {
  isVisible: boolean;
}

export default function HeroSection({ isVisible }: HeroSectionProps) {
  return (
    <div className={`${styles.heroWrapper} ${isVisible ? styles.visible : ""}`}>
      
      {/* SECTION 1: Minimal Centered Landing */}
      <section className={styles.section}>
        <div className={styles.horizLine} />
        <div className={styles.vertLine} />

        <div className={styles.centerBlock}>
          <h2 className={styles.title}>Vgen</h2>
          <p className={styles.subtitle}>Web · App · AI Agent Services</p>
        </div>
      </section>

      {/* SECTION 2: Large Rounded Media Card */}
      <section className={styles.section}>
        <div className={styles.mediaCard}>
          <Image 
            src="/hero_video_placeholder.png" 
            alt="Vgen Generative Media Placeholder" 
            className={styles.mediaImage}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 95vw"
          />
        </div>
      </section>

    </div>
  );
}
