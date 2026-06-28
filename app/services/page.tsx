"use client";

import { services, processSteps } from "@/lib/data";

export default function ServicesPage() {
  return (
    <main className="services-page">
      {/* ── Hero ── */}
      <section className="services-hero">
        <div className="services-hero__eyebrow">Services</div>
        <h1 className="services-hero__headline">
          Built for brands
          <br />
          <em>that mean it.</em>
        </h1>
        <p className="services-hero__sub">
          We build the digital infrastructure that lets ambitious companies grow
          without compromise — bespoke design, sharp engineering, and AI systems
          that actually work.
        </p>
      </section>

      {/* ── Service list ── */}
      <section className="services-list">
        {services.map((svc) => (
          <article
            key={svc.id}
            className="service-card"
            style={{ "--accent": svc.accent } as React.CSSProperties}
          >
            <div className="service-card__meta">
              <span className="service-card__num">{svc.category}</span>
              <span className="service-card__tag">{svc.id.toUpperCase()}</span>
            </div>
            <div className="service-card__body">
              <h2 className="service-card__title">{svc.title}</h2>
              <p className="service-card__tagline">{svc.tagline}</p>
              <p className="service-card__desc">{svc.description}</p>
              <ul className="service-card__list">
                {svc.deliverables.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            </div>
            <div className="service-card__accent-bar" />
          </article>
        ))}
      </section>

      {/* ── Process ── */}
      <section className="process-section">
        <div className="process-section__label">How we work</div>
        <h2 className="process-section__heading">
          No black boxes.
          <br />
          No handoffs into the void.
        </h2>
        <div className="process-grid">
          {processSteps.map((step, i) => (
            <div key={step.label} className="process-step">
              <div className="process-step__index">0{i + 1}</div>
              <h3 className="process-step__label">{step.label}</h3>
              <p className="process-step__body">{step.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="services-cta">
        <p className="services-cta__kicker">Ready to start?</p>
        <h2 className="services-cta__heading">
          Tell us what
          <br />
          you're building.
        </h2>
        <a href="/contact" className="services-cta__btn">Get in touch →</a>
      </section>

      <style jsx>{`
        .services-page {
          background: #0d0d0d;
          color: #f0ede8;
          font-family: "Georgia", "Times New Roman", serif;
          min-height: 100vh;
        }
        .services-hero {
          padding: 140px 6vw 80px;
          border-bottom: 1px solid #2a2a2a;
        }
        .services-hero__eyebrow {
          font-family: "Helvetica Neue", Arial, sans-serif;
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #666;
          margin-bottom: 32px;
        }
        .services-hero__headline {
          font-size: clamp(3rem, 7vw, 6.5rem);
          font-weight: 400;
          line-height: 1.05;
          margin: 0 0 32px;
          letter-spacing: -0.02em;
        }
        .services-hero__headline em {
          font-style: italic;
          color: #c8b8a2;
        }
        .services-hero__sub {
          font-family: "Helvetica Neue", Arial, sans-serif;
          font-size: clamp(0.95rem, 1.5vw, 1.15rem);
          line-height: 1.7;
          color: #888;
          max-width: 520px;
        }
        .services-list {
          display: flex;
          flex-direction: column;
        }
        .service-card {
          display: grid;
          grid-template-columns: 120px 1fr 6px;
          gap: 0 40px;
          padding: 64px 6vw;
          border-bottom: 1px solid #1e1e1e;
          transition: background 0.3s ease;
        }
        .service-card:hover {
          background: #111;
        }
        .service-card__meta {
          display: flex;
          flex-direction: column;
          gap: 6px;
          padding-top: 6px;
        }
        .service-card__num {
          font-family: "Helvetica Neue", Arial, sans-serif;
          font-size: 11px;
          color: #444;
          letter-spacing: 0.1em;
        }
        .service-card__tag {
          font-family: "Helvetica Neue", Arial, sans-serif;
          font-size: 10px;
          letter-spacing: 0.2em;
          color: var(--accent);
          text-transform: uppercase;
        }
        .service-card__body {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .service-card__title {
          font-size: clamp(1.6rem, 3vw, 2.6rem);
          font-weight: 400;
          letter-spacing: -0.015em;
          margin: 0;
          line-height: 1.15;
        }
        .service-card__tagline {
          font-size: 1rem;
          font-style: italic;
          color: var(--accent);
          margin: 0;
        }
        .service-card__desc {
          font-family: "Helvetica Neue", Arial, sans-serif;
          font-size: 0.9rem;
          line-height: 1.75;
          color: #999;
          max-width: 560px;
          margin: 0;
        }
        .service-card__list {
          list-style: none;
          padding: 0;
          margin: 8px 0 0;
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }
        .service-card__list li {
          font-family: "Helvetica Neue", Arial, sans-serif;
          font-size: 0.78rem;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          padding: 6px 14px;
          border: 1px solid #2a2a2a;
          border-radius: 2px;
          color: #bbb;
          transition: border-color 0.2s, color 0.2s;
        }
        .service-card:hover .service-card__list li {
          border-color: var(--accent);
          color: var(--accent);
        }
        .service-card__accent-bar {
          width: 3px;
          background: var(--accent);
          border-radius: 2px;
          opacity: 0;
          transition: opacity 0.3s;
          margin: 8px 0;
        }
        .service-card:hover .service-card__accent-bar {
          opacity: 1;
        }
        .process-section {
          padding: 100px 6vw;
          border-bottom: 1px solid #1e1e1e;
        }
        .process-section__label {
          font-family: "Helvetica Neue", Arial, sans-serif;
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #555;
          margin-bottom: 40px;
        }
        .process-section__heading {
          font-size: clamp(2rem, 4vw, 3.5rem);
          font-weight: 400;
          line-height: 1.1;
          margin: 0 0 64px;
          letter-spacing: -0.02em;
        }
        .process-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 48px 40px;
        }
        .process-step {
          border-top: 1px solid #2a2a2a;
          padding-top: 24px;
        }
        .process-step__index {
          font-family: "Helvetica Neue", Arial, sans-serif;
          font-size: 11px;
          color: #444;
          letter-spacing: 0.12em;
          margin-bottom: 12px;
        }
        .process-step__label {
          font-size: 1.25rem;
          font-weight: 400;
          margin: 0 0 12px;
        }
        .process-step__body {
          font-family: "Helvetica Neue", Arial, sans-serif;
          font-size: 0.875rem;
          line-height: 1.7;
          color: #777;
          margin: 0;
        }
        .services-cta {
          padding: 120px 6vw;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .services-cta__kicker {
          font-family: "Helvetica Neue", Arial, sans-serif;
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #555;
          margin: 0;
        }
        .services-cta__heading {
          font-size: clamp(2.5rem, 6vw, 5.5rem);
          font-weight: 400;
          line-height: 1.05;
          margin: 0 0 32px;
          letter-spacing: -0.02em;
        }
        .services-cta__btn {
          display: inline-block;
          font-family: "Helvetica Neue", Arial, sans-serif;
          font-size: 0.875rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #0d0d0d;
          background: #f0ede8;
          padding: 16px 36px;
          text-decoration: none;
          border-radius: 2px;
          transition: opacity 0.2s;
          width: fit-content;
        }
        .services-cta__btn:hover { opacity: 0.85; }
        @media (max-width: 768px) {
          .service-card {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          .service-card__accent-bar { display: none; }
          .service-card__meta { flex-direction: row; gap: 16px; }
        }
      `}</style>
    </main>
  );
}