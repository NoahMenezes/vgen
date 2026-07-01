"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./LogoIntro.module.css";
import HeroSection from "../HeroSection";
import AboutSection from "../AboutSection";
import ContactSection from "../ContactSection";
import FlowingMenu from "../FlowingMenu/FlowingMenu";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

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

  // Ball reveal scroll animation between About and Contact sections
  useEffect(() => {
    if (!isAtLeft) return;

    const container = document.getElementById("transition-container");
    const contactPanel = document.getElementById("contact-panel");

    if (!container || !contactPanel) return;

    const ctx = gsap.context(() => {
      // Pin the About section container and scrub the circle clip path of the Contact panel
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "bottom bottom",
          end: "+=100%", // duration of scroll-linked transition (1 viewport height)
          pin: true,
          scrub: true,
          anticipatePin: 1,
        }
      });

      tl.fromTo(contactPanel,
        {
          clipPath: "circle(0% at 50% 100%)",
          WebkitClipPath: "circle(0% at 50% 100%)"
        },
        {
          clipPath: "circle(150% at 50% 100%)",
          WebkitClipPath: "circle(150% at 50% 100%)",
          ease: "none"
        }
      );
    });

    return () => {
      ctx.revert();
    };
  }, [isAtLeft]);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMenuOpen(false);
    const id = href.replace('#', '');
    if (id === "contact") {
      // Scroll to the absolute bottom of the document to trigger the full expansion of the Contact section
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth"
      });
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
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

        {/* Flowing Menu UI replacing static vertical links */}
        <div style={{ flex: 1, position: 'relative', width: '100%', minHeight: '300px' }}>
          <FlowingMenu 
            items={[
              { link: '#home', text: 'Home', image: 'https://picsum.photos/600/400?random=1' },
              { link: '#about', text: 'About', image: 'https://picsum.photos/600/400?random=2' },
              { link: '#contact', text: 'Contact', image: 'https://picsum.photos/600/400?random=3' }
            ]}
            speed={15}
            textColor="#ffffff"
            bgColor="transparent"
            marqueeBgColor="#ffffff"
            marqueeTextColor="#0a0a0a"
            borderColor="rgba(255,255,255,0.1)"
            onItemClick={handleScrollTo}
          />
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
          <div id="transition-container" className="w-full relative">
            <AboutSection />
          </div>
          
          <div 
            id="contact-panel" 
            className="w-full h-screen fixed inset-0 z-30 pointer-events-none overflow-hidden"
            style={{ 
              clipPath: "circle(0px at 50% 100%)",
              WebkitClipPath: "circle(0px at 50% 100%)"
            }}
          >
            <div className="w-full h-full pointer-events-auto">
              <ContactSection />
            </div>
          </div>
        </>
      )}

    </div>
  );
}
