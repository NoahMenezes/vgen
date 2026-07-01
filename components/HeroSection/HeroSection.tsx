"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./HeroSection.module.css";
import ScrollReveal from "./ScrollReveal";
import StormBackground from "./StormBackground";

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  isVisible: boolean;
}

export default function HeroSection({ isVisible = true }: { isVisible?: boolean }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const landingSectionRef = useRef<HTMLDivElement>(null);
  const centerBlockRef = useRef<HTMLDivElement>(null);
  const servicesSectionRef = useRef<HTMLDivElement>(null);
  
  const [progress, setProgress] = useState(0);
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);

  useEffect(() => {
    if (!landingSectionRef.current || !centerBlockRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        centerBlockRef.current,
        {
          scale: 1,
          opacity: 1,
        },
        {
          scale: 2.5,
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: landingSectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    });

    return () => {
      ctx.revert();
    };
  }, []);

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

  // Ball transition effect when reaching the bottom of the page
  useEffect(() => {
    if (!servicesSectionRef.current) return;

    // Scroll to the top on fresh mount to guarantee the entry animation plays correctly
    if (window.scrollY > 0) {
      window.scrollTo(0, 0);
    }

    const ctx = gsap.context(() => {
      // Start the ball off-screen      // We no longer trigger a route transition, scrolling is seamless natively
    });

    return () => {
      ctx.revert();
    };
  }, []);

  const services = [
    {
      num: "01",
      title: "Bespoke storefront design + development",
      content: "Tailored digital commerce solutions built for high-performance brands, ensuring pixel-perfect execution, rapid loading times, and custom-designed paths to purchase."
    },
    {
      num: "02",
      title: "UX / UI improvements",
      content: "Refining user flows, visual hierarchies, and interactive elements to create frictionless, intuitive, and delightful customer journeys."
    },
    {
      num: "03",
      title: "Enhanced flexibility for content creation",
      content: "Empowering teams with headless CMS integrations and customizable component libraries to build and publish content without development bottlenecks."
    },
    {
      num: "04",
      title: "AI agent integrations & optimizations",
      content: "Deploying intelligent systems, LLMs, and custom automation workflows to enhance customer support, recommendation engines, and internal operations."
    },
    {
      num: "05",
      title: "Conversion rate optimization",
      content: "Conducting data-driven UX testing, checkout path refinement, and performance tuning to turn visitors into loyal customers."
    },
    {
      num: "06",
      title: "Streamlined cloud architecture",
      content: "Designing scalable, secure, and cost-effective hosting setups utilizing modern serverless/edge computing and CDN caching."
    }
  ];

  return (
    <div className={`${styles.heroWrapper} ${isVisible ? styles.visible : ""}`}>
      {/* Three.js Storm Particles Background */}
      <StormBackground />
      {/* SECTION 1: Minimal Centered Landing */}
      <section 
        ref={landingSectionRef}
        className={`${styles.section} ${styles.landingSection}`}
      >
        <div ref={centerBlockRef} className={styles.centerBlock}>
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

      {/* SECTION 3: Overview Section (White background) */}
      <section className={`${styles.section} ${styles.overviewSection}`}>
        <div className={styles.overviewGrid}>
          {/* Left Column Labels */}
          <div className={styles.labelCol}>
            <h3 className={styles.overviewLabel}>Overview</h3>
          </div>

          {/* Right Column Main content */}
          <div className={styles.contentCol}>
            <ScrollReveal
              baseOpacity={0.1}
              enableBlur
              baseRotation={3}
              blurStrength={4}
            >
              Born in a digital-first studio, Vgen is a modern production collective built on craft, quality, and considered design. We bring globally sourced, locally optimized digital systems to thoughtfully designed interfaces across the web and beyond, creating unforgettable experiences for forward-thinking brands.
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* SECTION 4: Details Section (Black background) */}
      <section className={`${styles.section} ${styles.detailsSection}`}>
        <div className={styles.overviewGrid}>
          {/* Left Column Labels */}
          <div className={styles.labelCol}>
            <h3 className={styles.overviewLabel}>Details</h3>
          </div>

          {/* Right Column Main content */}
          <div className={styles.contentCol}>
            <ScrollReveal
              baseOpacity={0.1}
              enableBlur
              baseRotation={3}
              blurStrength={4}
            >
              Vgen was brought in to elevate next-generation digital presences and create websites that better reflect each brand&apos;s design-led ethos and distinctive spaces. Each workspace is defined by its own architectural character and sense of place, an approach that informs our work from strategy through execution.
            </ScrollReveal>

            <div className={styles.paragraphGap} />

            <ScrollReveal
              baseOpacity={0.1}
              enableBlur
              baseRotation={3}
              blurStrength={4}
            >
              The result is a design-forward digital suite that showcases identity with clarity and intention, providing a beautifully considered experience.
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* SECTION 5: Services Section (White background) */}
      <section 
        ref={servicesSectionRef}
        className={`${styles.section} ${styles.servicesSection}`}
      >
        <div className={styles.overviewGrid}>
          {/* Left Column Labels */}
          <div className={styles.labelCol}>
            <h3 className={styles.overviewLabel}>Services</h3>
          </div>

          {/* Right Column Main content */}
          <div className={styles.contentCol}>
            {/* Services Stacking Cards */}
            <div className={styles.cardsStack}>
              {services.map((service, index) => {
                const cardClass = 
                  index === 0 ? styles.card1 :
                  index === 1 ? styles.card2 :
                  index === 2 ? styles.card3 :
                  index === 3 ? styles.card4 :
                  index === 4 ? styles.card5 :
                  styles.card6;

                return (
                  <div
                    key={index}
                    className={`${styles.serviceCard} ${cardClass}`}
                    style={{ "--index": index } as React.CSSProperties}
                  >
                    <div className={styles.cardHeader}>
                      <h4 className={styles.cardTitle}>{service.title}</h4>
                      <span className={styles.cardNum}>{service.num}</span>
                    </div>
                    <div className={styles.cardBody}>
                      <p className={styles.cardText}>{service.content}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Removed transitionBall as it's now a single-page site */}
      </section>

    </div>
  );
}
