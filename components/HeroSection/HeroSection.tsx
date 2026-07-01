"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useResponsive } from "../../hooks/useResponsive";
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
  
  // Custom Responsive Logic
  const { isMobile, isMounted } = useResponsive();
  
  // Timeline beam animation hooks
  const { scrollYProgress: servicesProgress } = useScroll({
    target: servicesSectionRef,
    offset: ["start center", "end end"]
  });
  
  const beamHeight = useTransform(servicesProgress, [0, 1], ["0%", "100%"]);
  
  const beamColor = useTransform(
    servicesProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    ["#06b6d4", "#ef4444", "#22c55e", "#a855f7", "#ec4899", "#f97316"] // cyan, red, green, purple, pink, orange
  );
  
  const beamShadow = useTransform(
    servicesProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    [
      "0 0 20px 4px rgba(6, 182, 212, 0.8)",
      "0 0 20px 4px rgba(239, 68, 68, 0.8)",
      "0 0 20px 4px rgba(34, 197, 94, 0.8)",
      "0 0 20px 4px rgba(168, 85, 247, 0.8)",
      "0 0 20px 4px rgba(236, 72, 153, 0.8)",
      "0 0 20px 4px rgba(249, 115, 22, 0.8)",
    ]
  );

  // Generate a smooth curvy path for the timeline that sweeps across the full width of the screen
  const curvyPathDFullWidth = (() => {
    const points = [];
    const steps = 150;
    const height = 1000;
    const width = 1000;
    const centerX = width / 2;
    const amplitude = 420; // Sweeps from 80 (left side) to 920 (right side) in a 1000px width viewBox
    const cycles = 3; // Number of wave cycles down the timeline (Left -> Center -> Right -> Center -> Left)
    
    for (let i = 0; i <= steps; i++) {
      const y = (i / steps) * height;
      const x = centerX - Math.cos((i / steps) * Math.PI * 2 * cycles) * amplitude;
      points.push(`${i === 0 ? "M" : "L"} ${x} ${y}`);
    }
    return points.join(" ");
  })();
    
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
              baseRotation={0}
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
              baseRotation={0}
              blurStrength={4}
            >
              Vgen was brought in to elevate next-generation digital presences and create websites that better reflect each brand&apos;s design-led ethos and distinctive spaces. Each workspace is defined by its own architectural character and sense of place, an approach that informs our work from strategy through execution.
            </ScrollReveal>

            <div className={styles.paragraphGap} />

            <ScrollReveal
              baseOpacity={0.1}
              enableBlur
              baseRotation={0}
              blurStrength={4}
            >
              The result is a design-forward digital suite that showcases identity with clarity and intention, providing a beautifully considered experience.
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* SECTION 5: Services Timeline Section (Dark background for glowing beam contrast) */}
      <section 
        ref={servicesSectionRef}
        className="w-full bg-[#0a0a0a] text-white relative py-48 select-none overflow-hidden"
      >
        {/* Full-width Curvy Timeline SVG in background */}
        <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
          <svg width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 1000 1000" className="overflow-visible">
            {/* Base curvy track */}
            <path 
              d={curvyPathDFullWidth}
              fill="none"
              stroke="rgba(255, 255, 255, 0.05)"
              strokeWidth="3"
              strokeLinecap="round"
            />
            {/* Layer 1: Wide Outer Glow (12px, 15% opacity) */}
            <motion.path 
              d={curvyPathDFullWidth}
              fill="none"
              stroke={beamColor}
              strokeWidth="14"
              strokeLinecap="round"
              opacity="0.12"
              style={{ 
                pathLength: servicesProgress
              }}
            />
            {/* Layer 2: Medium Inner Glow (6px, 35% opacity) */}
            <motion.path 
              d={curvyPathDFullWidth}
              fill="none"
              stroke={beamColor}
              strokeWidth="7"
              strokeLinecap="round"
              opacity="0.35"
              style={{ 
                pathLength: servicesProgress
              }}
            />
            {/* Layer 3: Solid Core (3px, 100% opacity) */}
            <motion.path 
              d={curvyPathDFullWidth}
              fill="none"
              stroke={beamColor}
              strokeWidth="3"
              strokeLinecap="round"
              opacity="1"
              style={{ 
                pathLength: servicesProgress
              }}
            />
          </svg>
        </div>

        <div className="max-w-[1200px] mx-auto w-full px-8 md:px-16 relative z-10">
          {/* Centered Content */}
          <div className="flex flex-col gap-[50vh] pb-[20vh] pt-12 items-center text-center">
            {services.map((service, index) => {
              const sectionColor = [
                "#06b6d4", // 0: Cyan
                "#ef4444", // 1: Red
                "#22c55e", // 2: Green
                "#a855f7", // 3: Purple
                "#ec4899", // 4: Pink
                "#f97316"  // 5: Orange
              ][index];

              return (
                <div key={index} className="flex flex-col items-center w-full max-w-3xl">
                  <motion.div
                    initial={{ opacity: 0, y: isMobile ? 30 : 60, filter: "blur(10px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    viewport={{ once: true, margin: isMobile ? "-40px" : "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="flex flex-col items-center text-center"
                  >
                    <div className="flex flex-col gap-4 mb-8 items-center">
                      <span 
                        className="font-serif-headline text-3xl italic mb-2 drop-shadow-md"
                        style={{ color: sectionColor }}
                      >
                        {service.num}
                      </span>
                      <h4 
                        className="font-sans text-4xl md:text-6xl lg:text-7xl tracking-tighter font-bold leading-[1.1]"
                        style={{ 
                          color: sectionColor, 
                          textShadow: `0 0 25px ${sectionColor}80` // 80 is 50% opacity in hex
                        }}
                      >
                        {service.title}
                      </h4>
                    </div>
                    <p className="font-sans text-lg md:text-2xl text-white/95 font-medium max-w-2xl leading-relaxed drop-shadow-sm">
                      {service.content}
                    </p>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

    </div>
  );
}
