"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
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
  
  // Timeline beam animation hooks
  const { scrollYProgress: servicesProgress } = useScroll({
    target: servicesSectionRef,
    offset: ["start center", "end end"]
  });
  
  const beamHeight = useTransform(servicesProgress, [0, 1], ["0%", "100%"]);
  
  const beamColor = useTransform(
    servicesProgress,
    [0, 0.25, 0.5, 0.75, 1],
    ["#06b6d4", "#3b82f6", "#8b5cf6", "#ec4899", "#f97316"] // cyan -> blue -> purple -> pink -> orange
  );
  
  const beamShadow = useTransform(
    servicesProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [
      "0 0 20px 4px rgba(6, 182, 212, 0.8)",
      "0 0 20px 4px rgba(59, 130, 246, 0.8)",
      "0 0 20px 4px rgba(139, 92, 246, 0.8)",
      "0 0 20px 4px rgba(236, 72, 153, 0.8)",
      "0 0 20px 4px rgba(249, 115, 22, 0.8)",
    ]
  );
    
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

      {/* SECTION 5: Services Timeline Section (Dark background for glowing beam contrast) */}
      <section 
        ref={servicesSectionRef}
        className="w-full bg-[#0a0a0a] text-white relative py-48 select-none"
      >
        <div className="max-w-[1400px] mx-auto w-full px-8 md:px-16 flex gap-8 md:gap-24 relative">
          
          {/* Left Sticky Label */}
          <div className="hidden md:flex w-32 flex-col items-start pt-12 relative z-10">
            <h3 className="sticky top-48 font-sans text-xs tracking-[0.2em] text-white/40 uppercase">
              Services
            </h3>
          </div>

          {/* Center Timeline Track */}
          <div className="relative w-1 flex-shrink-0 ml-4 md:ml-0">
             {/* Faint base line */}
             <div className="absolute top-0 bottom-0 left-0 w-[1px] bg-white/10" />
             {/* Glowing beam animated dynamically on scroll */}
             <motion.div 
               className="absolute top-0 left-0 w-[2px] -ml-[0.5px]"
               style={{ 
                 height: beamHeight,
                 backgroundColor: beamColor,
                 boxShadow: beamShadow
               }}
             />
          </div>

          {/* Right Content */}
          <div className="flex-1 flex flex-col gap-[50vh] pb-[20vh] pt-12">
            {services.map((service, index) => (
              <div key={index} className="flex flex-col relative w-full">
                
                {/* Horizontal Connector Line */}
                <div className="absolute top-[28px] -left-8 md:-left-24 w-8 md:w-24 h-[1px] bg-white/10" />
                
                <motion.div
                  initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: false, margin: "-150px" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  <div className="flex flex-col gap-4 mb-8">
                    <span className="font-serif-headline text-3xl italic text-white/80 mb-2 drop-shadow-md">{service.num}</span>
                    <h4 className="font-sans text-4xl md:text-6xl lg:text-7xl tracking-tighter text-white font-bold leading-[1.1] drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]">
                      {service.title}
                    </h4>
                  </div>
                  <p className="font-sans text-lg md:text-2xl text-white/95 font-medium max-w-2xl leading-relaxed pl-6 md:pl-10 border-l-2 border-white/30 drop-shadow-sm">
                    {service.content}
                  </p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
