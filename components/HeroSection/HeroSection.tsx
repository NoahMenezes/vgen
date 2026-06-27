"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./HeroSection.module.css";

interface HeroSectionProps {
  isVisible: boolean;
}

export default function HeroSection({ isVisible }: HeroSectionProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);

  useEffect(() => {
    let active = true;

    const handleScroll = () => {
      if (!trackRef.current) return;
      const rect = trackRef.current.getBoundingClientRect();
      const viewHeight = window.innerHeight;
      
      const totalScrollable = rect.height - viewHeight;
      if (totalScrollable <= 0) return;
      
      const currentScroll = -rect.top;
      const pct = Math.min(Math.max(currentScroll / totalScrollable, 0), 1);
      targetProgressRef.current = pct;
    };

    const updateProgress = () => {
      if (!active) return;
      
      const ease = 0.06; // Lower value = more viscous / heavier feel
      const diff = targetProgressRef.current - currentProgressRef.current;
      
      currentProgressRef.current += diff * ease;
      
      if (Math.abs(diff) > 0.0001) {
        setProgress(currentProgressRef.current);
      } else {
        setProgress(targetProgressRef.current);
      }

      requestAnimationFrame(updateProgress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    requestAnimationFrame(updateProgress);
    handleScroll();

    return () => {
      active = false;
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const services = [
    "Bespoke storefront design + development",
    "UX / UI improvements",
    "Enhanced flexibility for content creation",
    "AI agent integrations & optimizations",
    "Conversion rate optimization",
    "Streamlined cloud architecture"
  ];

  return (
    <div className={`${styles.heroWrapper} ${isVisible ? styles.visible : ""}`}>
      
      {/* SECTION 1: Minimal Centered Landing */}
      <section className={`${styles.section} ${styles.landingSection}`}>
        <div className={styles.horizLine} />
        <div className={styles.vertLine} />

        <div className={styles.centerBlock}>
          <h1 className={styles.title}>Vgen</h1>
          <p className={styles.subtitle}>Web · App · AI Agent Services</p>
        </div>
      </section>

      {/* SECTION 2: Horizontal Video / Media Track */}
      <div ref={trackRef} className={styles.track}>
        {/* Invisible Vertical Snap Points (ensures browser snaps to each video state) */}
        <div className={styles.snapPoint} style={{ position: "absolute", top: 0 }} />
        <div className={styles.snapPoint} style={{ position: "absolute", top: "100vh" }} />
        <div className={styles.snapPoint} style={{ position: "absolute", top: "200vh" }} />
        
        {/* Sticky viewport content */}
        <div className={styles.sticky}>
          <div 
            className={styles.horizontalContainer}
            style={{ transform: `translate3d(-${progress * 200}vw, 0, 0)` }}
          >
            {/* Slide 1 */}
            <div className={styles.slide}>
              <div className={styles.mediaCard} />
            </div>

            {/* Slide 2 */}
            <div className={styles.slide}>
              <div className={styles.mediaCard} />
            </div>

            {/* Slide 3 */}
            <div className={styles.slide}>
              <div className={styles.mediaCard} />
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 3: Overview Section */}
      <section className={`${styles.section} ${styles.overviewSection}`}>
        <div className={styles.overviewGrid}>
          
          {/* Left Column Labels */}
          <div className={styles.labelCol}>
            <h3 className={styles.overviewLabel}>Overview</h3>
            <h3 className={`${styles.overviewLabel} hidden md:block`}>Services</h3>
          </div>

          {/* Right Column Main content */}
          <div className={styles.contentCol}>
            <p className={styles.overviewHeadline}>
              Born in a digital-first studio, Vgen is a modern production collective built on craft, quality, and considered design, bringing globally sourced, locally optimized digital systems to thoughtfully designed interfaces across the web and beyond.
            </p>
            
            <p className={styles.overviewParagraph}>
              Vgen was brought in to elevate next-generation digital presences and create websites that better reflect each brand&apos;s design-led ethos and distinctive spaces. Each workspace is defined by its own architectural character and sense of place, an approach that informs our work from strategy through execution.
            </p>

            <p className={styles.overviewParagraph}>
              The result is a design-forward digital suite that showcases identity with clarity and intention, providing a beautifully considered experience.
            </p>

            {/* Mobile-only Services label */}
            <h3 className={`${styles.overviewLabel} md:hidden mt-8`}>Services</h3>

            {/* Services Grid Cells */}
            <div className={styles.servicesGrid}>
              {services.map((service, index) => (
                <div key={index} className={styles.serviceCell}>
                  {service}
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
