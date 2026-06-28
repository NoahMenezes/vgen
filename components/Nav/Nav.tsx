"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => setOpen(false), [pathname]);

  // Detect if current page is dark-background
  const isDarkPage = pathname === "/services" || pathname === "/";

  return (
    <>
      <nav
        className={`nav${scrolled ? " nav--scrolled" : ""}${isDarkPage ? " nav--dark" : " nav--light"}${open ? " nav--open" : ""}`}
      >
        <Link href="/" className="nav__logo">
          VGEN
        </Link>

        <button
          className="nav__burger"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          <span className="nav__burger-bar" />
          <span className="nav__burger-bar" />
          <span className="nav__burger-bar nav__burger-bar--short" />
        </button>

        <div className="nav__links">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`nav__link${pathname === href ? " nav__link--active" : ""}`}
            >
              {label}
            </Link>
          ))}
        </div>
      </nav>

      {/* Fullscreen mobile menu */}
      <div className={`nav-overlay${open ? " nav-overlay--open" : ""}`}>
        <div className="nav-overlay__links">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="nav-overlay__link"
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>

      <style jsx>{`
        /* ─── Nav ─── */
        .nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 28px 6vw;
          transition: background 0.3s, padding 0.3s;
        }
        .nav--scrolled {
          padding: 18px 6vw;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }
        /* Dark pages */
        .nav--dark { color: #f0ede8; }
        .nav--dark.nav--scrolled { background: rgba(13, 13, 13, 0.88); }
        /* Light pages */
        .nav--light { color: #111; }
        .nav--light.nav--scrolled { background: rgba(247, 245, 241, 0.9); }

        .nav__logo {
          font-family: "Georgia", "Times New Roman", serif;
          font-size: 0.9rem;
          letter-spacing: 0.25em;
          text-decoration: none;
          color: inherit;
        }

        .nav__links {
          display: flex;
          gap: 36px;
          align-items: center;
        }
        .nav__link {
          font-family: "Helvetica Neue", Arial, sans-serif;
          font-size: 0.78rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          text-decoration: none;
          color: inherit;
          opacity: 0.6;
          transition: opacity 0.2s;
        }
        .nav__link:hover,
        .nav__link--active {
          opacity: 1;
        }

        /* Burger */
        .nav__burger {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
        }
        .nav__burger-bar {
          display: block;
          width: 24px;
          height: 1px;
          background: currentColor;
          transition: transform 0.2s, opacity 0.2s;
        }
        .nav__burger-bar--short { width: 16px; }
        .nav--open .nav__burger-bar:nth-child(1) {
          transform: translateY(6px) rotate(45deg);
        }
        .nav--open .nav__burger-bar:nth-child(2) {
          transform: translateY(-6px) rotate(-45deg);
        }
        .nav--open .nav__burger-bar--short { opacity: 0; }

        /* ─── Mobile overlay ─── */
        .nav-overlay {
          position: fixed;
          inset: 0;
          background: #0d0d0d;
          z-index: 90;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.3s;
        }
        .nav-overlay--open {
          opacity: 1;
          pointer-events: all;
        }
        .nav-overlay__links {
          display: flex;
          flex-direction: column;
          gap: 32px;
          text-align: center;
        }
        .nav-overlay__link {
          font-family: "Georgia", serif;
          font-size: clamp(2rem, 8vw, 4rem);
          color: #f0ede8;
          text-decoration: none;
          font-weight: 400;
          letter-spacing: -0.01em;
          transition: color 0.2s;
        }
        .nav-overlay__link:hover { color: #c8b8a2; }

        @media (max-width: 640px) {
          .nav__links { display: none; }
          .nav__burger { display: flex; }
        }
      `}</style>
    </>
  );
}