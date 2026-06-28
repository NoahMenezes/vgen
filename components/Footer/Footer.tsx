import Link from "next/link";

const footerLinks = [
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__top">
        <Link href="/" className="footer__logo">
          VGEN
        </Link>
        <nav className="footer__nav">
          {footerLinks.map(({ href, label }) => (
            <Link key={href} href={href} className="footer__link">
              {label}
            </Link>
          ))}
        </nav>
        <a href="mailto:hello@vgen.studio" className="footer__email">
          hello@vgen.studio
        </a>
      </div>

      <div className="footer__bottom">
        <span className="footer__copy">© {year} VGEN. All rights reserved.</span>
        <span className="footer__tagline">Web · App · AI Agent Services</span>
      </div>

      <style jsx>{`
        .footer {
          background: #0d0d0d;
          color: #f0ede8;
          padding: 60px 6vw 40px;
          border-top: 1px solid #1e1e1e;
        }
        .footer__top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 24px;
          margin-bottom: 48px;
          padding-bottom: 48px;
          border-bottom: 1px solid #1e1e1e;
        }
        .footer__logo {
          font-family: "Georgia", serif;
          font-size: 0.9rem;
          letter-spacing: 0.25em;
          text-decoration: none;
          color: #f0ede8;
        }
        .footer__nav {
          display: flex;
          gap: 28px;
        }
        .footer__link {
          font-family: "Helvetica Neue", Arial, sans-serif;
          font-size: 0.78rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          text-decoration: none;
          color: #666;
          transition: color 0.2s;
        }
        .footer__link:hover { color: #f0ede8; }
        .footer__email {
          font-family: "Helvetica Neue", Arial, sans-serif;
          font-size: 0.85rem;
          color: #c8b8a2;
          text-decoration: none;
          transition: opacity 0.2s;
        }
        .footer__email:hover { opacity: 0.7; }
        .footer__bottom {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 8px;
        }
        .footer__copy,
        .footer__tagline {
          font-family: "Helvetica Neue", Arial, sans-serif;
          font-size: 0.72rem;
          letter-spacing: 0.1em;
          color: #444;
          text-transform: uppercase;
        }

        @media (max-width: 640px) {
          .footer__top {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </footer>
  );
}