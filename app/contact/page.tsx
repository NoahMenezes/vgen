"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Circle } from "lucide-react";
import logoStyles from "@/components/LogoIntro/LogoIntro.module.css";

// --- Subcomponents ---

interface InputGroupProps {
  label: string;
  placeholder: string;
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

function InputGroup({ 
  label, 
  placeholder, 
  type, 
  name,
  value,
  onChange,
  required = false
}: InputGroupProps) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="text-sm font-medium text-white/80">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full bg-brand-gray border-none rounded-xl h-12 px-4 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all duration-200 text-sm"
      />
    </div>
  );
}

// --- Main Page Component ---

export default function ContactPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showTransitionOverlay, setShowTransitionOverlay] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    // Enable scroll but hide horizontal scrollbars
    document.body.style.overflow = "auto";
    document.body.style.overflowX = "hidden";
    document.body.style.overflowY = "auto";

    // Fade out the white transition overlay after a short delay
    const timer = setTimeout(() => {
      setShowTransitionOverlay(false);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const { name, email, phone } = formData;
    if (!name || !email || !phone) {
      alert("Please fill in all the fields.");
      return;
    }

    // Format message and encode for WhatsApp API redirect
    const baseMessage = `Hi Vgen Team! I would like to get in touch to discuss a new project.\n\n• Name: ${name}\n• Email: ${email}\n• Phone: ${phone}`;
    const encodedMessage = encodeURIComponent(baseMessage);
    
    // Direct link to WhatsApp (using a standard placeholder number or direct API)
    const whatsappUrl = `https://wa.me/919999999999?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <main className="relative flex min-h-screen w-full bg-black selection:bg-white/30 p-2 transition-all duration-500 lg:h-screen lg:overflow-hidden lg:p-4">
      
      {/* 
        White transition overlay:
        Bridges the white expanding GSAP transition ball from the bottom of the About Page 
        into the dark background of the Contact Page by starting white and fading out smoothly.
      */}
      <AnimatePresence>
        {showTransitionOverlay && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 bg-white z-[9999] pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* Vgen logo in top-left */}
      <Link href="/" className="absolute left-[var(--logo-offset)] top-[var(--logo-offset)] z-50">
        <h1 
          className={`font-serif-headline font-normal uppercase tracking-[0.25em] ${logoStyles.logoTransition} ${logoStyles.logoStage2}`}
          style={{ fontSize: "var(--logo-size)", color: "#ffffff" }}
        >
          Vgen
        </h1>
      </Link>

      {/* Hamburger menu toggle button */}
      <button 
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className={`${logoStyles.burgerButton} ${isMenuOpen ? logoStyles.open : ""}`}
        style={{
          top: "var(--logo-offset)",
          right: "var(--logo-offset)",
          opacity: 1,
          transform: "translate3d(0, 0, 0)",
          zIndex: 101,
        }}
      >
        <span className={logoStyles.burgerLine1} style={{ backgroundColor: "#ffffff" }} />
        <span className={logoStyles.burgerLine2} style={{ backgroundColor: "#ffffff" }} />
        <span className={logoStyles.burgerLine3} style={{ backgroundColor: "#ffffff" }} />
      </button>

      {/* Fullscreen Overlay Menu */}
      <div 
        className={`${logoStyles.menuOverlay} ${
          isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{ zIndex: 99 }}
      >
        <div className={logoStyles.menuHeader} />
        <div className={logoStyles.menuItems}>
          <Link href="/" className={logoStyles.menuLink}>
            Home
          </Link>
          <Link href="/about" className={logoStyles.menuLink}>
            About
          </Link>
          <span onClick={() => setIsMenuOpen(false)} className={logoStyles.menuLink}>
            Contact
          </span>
        </div>
        <div className={logoStyles.menuFooter}>
          <span className={logoStyles.supportLabel}>Need Support?</span>
          <a href="mailto:hello@vgen.co" className={logoStyles.supportEmail}>
            hello@vgen.co
          </a>
        </div>
      </div>

      {/* Two-Column Registration/Contact Interface */}
      <div className="flex w-full h-full gap-4 relative">
        
        {/* Left Column: Hero Video & Agency Quote */}
        <div className="relative w-[52%] hidden lg:flex flex-col items-start justify-end pb-32 px-16 rounded-3xl overflow-hidden shadow-2xl h-full">
          <video 
            autoPlay 
            muted 
            loop 
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source 
              src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260506_081238_406ed0e3-5d83-436e-a512-0bbff7ec5b95.mp4" 
              type="video/mp4" 
            />
          </video>

          {/* Staggered Animations Content */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.15,
                  delayChildren: 0.2,
                }
              }
            }}
            className="z-10 w-full max-w-md space-y-12"
          >
            {/* Brand/Logo */}
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
              }}
              className="flex items-center gap-2"
            >
              <Circle className="w-5 h-5 text-white fill-white" />
              <span className="text-xl font-semibold tracking-tight text-white font-sans">Vgen Agency</span>
            </motion.div>

            {/* Custom Agency Quote Block */}
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
              }}
              className="space-y-4 border-l border-white/20 pl-6"
            >
              <p className="text-2xl font-light italic leading-relaxed text-white/90 font-serif-headline">
                "We don't just build websites. We craft digital experiences that redefine how brands connect with their audiences."
              </p>
              <span className="block text-xs font-semibold tracking-widest uppercase text-white/40 font-sans">
                — Vgen Team
              </span>
            </motion.div>

          </motion.div>
        </div>

        {/* Right Column: Contact Us Form Container */}
        <div className="flex-1 flex flex-col items-center justify-between py-12 lg:py-8 px-4 sm:px-12 lg:px-16 xl:px-24 overflow-y-auto lg:overflow-hidden h-full">
          
          {/* Top spacer to center form */}
          <div className="hidden lg:block" />

          {/* Center Form */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full max-w-xl space-y-8"
          >
            {/* Form Header */}
            <div>
              <h2 className="text-3xl font-medium tracking-tight text-white font-sans">Contact Us</h2>
              <p className="text-white/40 text-sm mt-2 font-sans">
                Input your details below to instantly start a conversation on WhatsApp.
              </p>
            </div>

            {/* Contact Form */}
            <form onSubmit={handleFormSubmit} className="space-y-5">
              
              {/* Name field */}
              <InputGroup 
                label="Full Name" 
                placeholder="Enter your name" 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required 
              />

              {/* Email address */}
              <InputGroup 
                label="Email Address" 
                placeholder="you@domain.com" 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required 
              />

              {/* Phone Number */}
              <InputGroup 
                label="Phone Number" 
                placeholder="+91 XXXXX XXXXX" 
                type="tel" 
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required 
              />

              {/* Submit trigger button redirects to Whatsapp */}
              <button 
                type="submit" 
                className="w-full h-14 bg-white text-black font-semibold rounded-xl hover:bg-white/90 active:scale-[0.98] transition-all duration-200 mt-6 cursor-pointer font-sans"
              >
                Send to WhatsApp
              </button>
            </form>

          </motion.div>

          {/* Bottom Team Footer */}
          <div className="w-full max-w-xl pt-8 mt-12 border-t border-white/10 flex flex-col gap-3">
            <span className="text-[10px] uppercase tracking-widest text-white/30 font-medium font-sans">
              Our Team
            </span>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-white/50 font-medium font-sans">
              <span className="text-white hover:text-white transition-colors duration-150">Noah Menezes</span>
              <span className="text-white/20">•</span>
              <span className="hover:text-white transition-colors duration-150">Jared Furtado</span>
              <span className="text-white/20">•</span>
              <span className="hover:text-white transition-colors duration-150">Piyush Prajapat</span>
              <span className="text-white/20">•</span>
              <span className="hover:text-white transition-colors duration-150">Vibhu Porobo</span>
              <span className="text-white/20">•</span>
              <span className="hover:text-white transition-colors duration-150">G Karrtikeya</span>
            </div>
          </div>

        </div>

      </div>
    </main>
  );
}
