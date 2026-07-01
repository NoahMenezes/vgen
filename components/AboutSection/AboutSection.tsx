"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./AboutSection.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutSection() {
  const pillarsSectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const topPanelRef = useRef<HTMLDivElement>(null);
  const bottomPanelRef = useRef<HTMLDivElement>(null);

  const pillars = [
    {
      num: "01",
      title: "Web Development",
      content: "We believe in building digital architectures that are blazing fast, accessible, and designed to convert."
    },
    {
      num: "02",
      title: "App Development",
      content: "Apps should feel native, fluid, and intuitive, bridging the gap between desktop power and mobile convenience."
    },
    {
      num: "03",
      title: "AI Agents",
      content: "Intelligent workflows and custom agents that automate actions, engage users, and build a smarter future."
    }
  ];

  useEffect(() => {
    const container = containerRef.current;
    const topPanel = topPanelRef.current;
    const bottomPanel = bottomPanelRef.current;

    if (!container || !topPanel || !bottomPanel) return;

    const ctx = gsap.context(() => {
      // Pin the top half (Intro + Team picture) when its bottom hits the bottom of the viewport
      // and scrub the clip path of the bottom panel (Mission + Pillars) as it scrolls up
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: topPanel,
          start: "bottom bottom",
          end: "+=100%", // pin for 1 viewport height
          pin: true,
          pinSpacing: false,
          scrub: true,
          anticipatePin: 1,
        }
      });

      tl.fromTo(bottomPanel,
        {
          clipPath: "circle(0% at 50% 0%)",
          WebkitClipPath: "circle(0% at 50% 0%)"
        },
        {
          clipPath: "circle(150% at 50% 0%)",
          WebkitClipPath: "circle(150% at 50% 0%)",
          ease: "none"
        }
      );
    });

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div ref={containerRef} className={styles.aboutWrapper}>
      
      {/* Top Panel: Intro and Team Picture (Pinned on scroll trigger) */}
      <div ref={topPanelRef} id="about-top-panel" className={styles.topPanel}>
        {/* About Header Intro */}
        <h2 className={styles.introText}>
          We are Vgen; a <span className={styles.serifItalic}>production</span> agency specialised in <span className={styles.serifItalic}>web, app and AI agents</span>.
        </h2>

        {/* Team Picture Placeholder */}
        <div className={styles.teamPictureContainer}>
          <div className={styles.teamPicturePlaceholder}>
            <span className={styles.placeholderText}>Team picture</span>
          </div>
        </div>
      </div>

      {/* Bottom Panel: Mission and Pillars (Scrub-revealed as expanding ball) */}
      <div 
        ref={bottomPanelRef} 
        id="about-bottom-panel" 
        className={styles.bottomPanel}
        style={{
          clipPath: "circle(0% at 50% 0%)",
          WebkitClipPath: "circle(0% at 50% 0%)"
        }}
      >
        {/* Mission Section */}
        <section className={styles.missionSection}>
          <h3 className={styles.label}>Mission</h3>
          <p className={styles.missionText}>
            We create <span className={styles.serifItalic}>magnetic commerce</span> that attracts, resonates and converts, helping brands turn <span className={styles.serifItalic}>brave ideas</span> into <span className={styles.serifItalic}>digital experiences</span> that captivate their audience, build trust, and drive <span className={styles.serifItalic}>lasting growth</span>.
          </p>
        </section>

        {/* Agency Pillars Section */}
        <section ref={pillarsSectionRef} className={styles.pillarsSection}>
          <h3 className={styles.pillarsTitle}>Agency Pillars</h3>
          
          <div className={styles.cardsStack}>
            {pillars.map((pillar, index) => {
              // Apply different card styles and sticky top offsets dynamically
              const cardClass = 
                index === 0 ? styles.card1 :
                index === 1 ? styles.card2 :
                styles.card3;
              
              // Increment top offset for each sticky card so they overlap but show header offsets
              const stickyTop = `${80 + index * 40}px`;
              
              return (
                <div 
                  key={index} 
                  className={`${styles.pillarCard} ${cardClass}`}
                  style={{ top: stickyTop, zIndex: index + 1 }}
                >
                  <div className={styles.cardHeader}>
                    <h4 className={styles.cardTitle}>{pillar.title}</h4>
                    <span className={styles.cardNum}>{pillar.num}</span>
                  </div>
                  <div className={styles.cardBody}>
                    <p className={styles.cardText}>{pillar.content}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
