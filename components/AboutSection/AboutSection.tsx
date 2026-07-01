"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./AboutSection.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const router = useRouter();
  const pillarsSectionRef = useRef<HTMLDivElement>(null);
  const ballRef = useRef<HTMLDivElement>(null);

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

  // Ball transition effect when reaching the bottom of the About page
  useEffect(() => {
    if (!pillarsSectionRef.current || !ballRef.current) return;

    router.prefetch("/contact");

    const ctx = gsap.context(() => {
      // Start the ball off-screen at the bottom center and invisible
      gsap.set(ballRef.current, { y: "60vh", scale: 1, autoAlpha: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pillarsSectionRef.current,
          start: "bottom-=100vh bottom",
          end: "bottom-=20px bottom",
          scrub: true,
          onLeave: () => {
            router.push("/contact");
          },
          onUpdate: (self) => {
            if (self.progress >= 0.99 && self.direction > 0) {
              router.push("/contact");
            }
          },
        },
      });

      tl.to(ballRef.current, {
        autoAlpha: 1,
        y: "0vh",
        ease: "power1.inOut",
      })
      .to(ballRef.current, {
        scale: 35,
        ease: "power2.in",
      });
    });

    return () => {
      ctx.revert();
    };
  }, [router]);

  return (
    <div className={styles.aboutWrapper}>
      
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

      {/* Transition Ball (Emerges and expands on scroll complete) */}
      <div ref={ballRef} className={styles.transitionBall} />

    </div>
  );
}
