"use client";

import { works, testimonials } from "@/lib/data";

export default function WorkPage() {
  return (
    <main className="work-page">
      {/* ── Header ── */}
      <section className="work-header">
        <div className="work-header__top">
          <span className="work-header__eyebrow">Selected Work</span>
          <span className="work-header__count">{works.length} projects</span>
        </div>
        <h1 className="work-header__headline">
          What we've
          <br />
          <em>shipped.</em>
        </h1>
      </section>

      {/* ── Project list ── */}
      <section className="work-list">
        {works.map((project) => (
          <article
            key={project.id}
            className={`work-item ${project.dark ? "work-item--dark" : "work-item--light"}`}
          >
            <div className="work-item__text">
              <div className="work-item__meta">
                <span className="work-item__client">{project.client}</span>
                <span className="work-item__year">{project.year}</span>
              </div>
              <h2 className="work-item__headline">{project.headline}</h2>
              <p className="work-item__desc">{project.description}</p>
              <div className="work-item__tags">
                {project.tags.map((t) => (
                  <span key={t} className="work-item__tag">{t}</span>
                ))}
              </div>
              <div className="work-item__outcome">
                <span className="work-item__outcome-label">Outcome</span>
                <span className="work-item__outcome-val">{project.outcome}</span>
              </div>
            </div>
            <div className="work-item__visual" aria-hidden="true">
              <div className="work-item__img-placeholder">
                <span>{project.client}</span>
              </div>
            </div>
          </article>
        ))}
      </section>

      {/* ── Testimonials ── */}
      <section className="testimonials">
        <div className="testimonials__label">What clients say</div>
        <div className="testimonials__grid">
          {testimonials.map((t) => (
            <blockquote key={t.id} className="testimonial-card">
              <p className="testimonial-card__quote">"{t.quote}"</p>
              <footer className="testimonial-card__footer">
                <div className="testimonial-card__avatar" aria-hidden="true">
                  {t.author.charAt(0)}
                </div>
                <div>
                  <div className="testimonial-card__name">{t.author}</div>
                  <div className="testimonial-card__role">{t.role}</div>
                </div>
              </footer>
            </blockquote>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="work-cta">
        <p className="work-cta__line">Your project could be next.</p>
        <a href="/contact" className="work-cta__link">Start a conversation →</a>
      </section>

      <style jsx>{`
        .work-page {
          background: #f7f5f1;
          color: #111;
          font-family: "Georgia", "Times New Roman", serif;
          min-height: 100vh;
        }
        .work-header {
          padding: 140px 6vw 60px;
          border-bottom: 1px solid #e0dcd6;
        }
        .work-header__top {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 32px;
        }
        .work-header__eyebrow,
        .work-header__count {
          font-family: "Helvetica Neue", Arial, sans-serif;
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #999;
        }
        .work-header__headline {
          font-size: clamp(3rem, 8vw, 7rem);
          font-weight: 400;
          line-height: 1.0;
          margin: 0;
          letter-spacing: -0.025em;
        }
        .work-header__headline em {
          font-style: italic;
          color: #7b6f5e;
        }
        .work-list {
          display: flex;
          flex-direction: column;
        }
        .work-item {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 520px;
        }
        .work-item--light {
          background: #f7f5f1;
          border-bottom: 1px solid #e0dcd6;
        }
        .work-item--light .work-item__text {
          padding: 72px 6vw 72px;
          border-right: 1px solid #e0dcd6;
        }
        .work-item--light .work-item__client { color: #7b6f5e; }
        .work-item--light .work-item__year { color: #bbb; }
        .work-item--light .work-item__headline { color: #111; }
        .work-item--light .work-item__desc { color: #666; }
        .work-item--light .work-item__tag { border-color: #ccc; color: #777; }
        .work-item--light .work-item__outcome { border-top-color: #e0dcd6; }
        .work-item--light .work-item__outcome-val { color: #111; }
        .work-item--light .work-item__img-placeholder { background: #e8e4dc; color: #bbb; }
        .work-item--dark {
          background: #111;
          border-bottom: 1px solid #222;
        }
        .work-item--dark .work-item__text {
          padding: 72px 6vw 72px;
          border-right: 1px solid #222;
        }
        .work-item--dark .work-item__client { color: #c8b8a2; }
        .work-item--dark .work-item__year { color: #444; }
        .work-item--dark .work-item__headline { color: #f0ede8; }
        .work-item--dark .work-item__desc { color: #777; }
        .work-item--dark .work-item__tag { border-color: #333; color: #888; }
        .work-item--dark .work-item__outcome { border-top-color: #222; }
        .work-item--dark .work-item__outcome-val { color: #f0ede8; }
        .work-item--dark .work-item__img-placeholder { background: #1a1a1a; color: #444; }
        .work-item__text {
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 20px;
        }
        .work-item__meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .work-item__client {
          font-family: "Helvetica Neue", Arial, sans-serif;
          font-size: 11px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
        }
        .work-item__year {
          font-family: "Helvetica Neue", Arial, sans-serif;
          font-size: 11px;
          letter-spacing: 0.1em;
        }
        .work-item__headline {
          font-size: clamp(1.4rem, 2.5vw, 2rem);
          font-weight: 400;
          line-height: 1.2;
          margin: 0;
          letter-spacing: -0.01em;
        }
        .work-item__desc {
          font-family: "Helvetica Neue", Arial, sans-serif;
          font-size: 0.875rem;
          line-height: 1.75;
          margin: 0;
        }
        .work-item__tags {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }
        .work-item__tag {
          font-family: "Helvetica Neue", Arial, sans-serif;
          font-size: 0.7rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          padding: 4px 12px;
          border: 1px solid;
          border-radius: 2px;
        }
        .work-item__outcome {
          border-top: 1px solid;
          padding-top: 20px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .work-item__outcome-label {
          font-family: "Helvetica Neue", Arial, sans-serif;
          font-size: 10px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #999;
        }
        .work-item__outcome-val {
          font-size: 1.1rem;
          font-style: italic;
        }
        .work-item__visual {
          display: flex;
          align-items: stretch;
        }
        .work-item__img-placeholder {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: "Helvetica Neue", Arial, sans-serif;
          font-size: 0.75rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
        }
        .testimonials {
          background: #111;
          padding: 100px 6vw;
        }
        .testimonials__label {
          font-family: "Helvetica Neue", Arial, sans-serif;
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #555;
          margin-bottom: 48px;
        }
        .testimonials__grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 32px;
        }
        .testimonial-card {
          background: #181818;
          border: 1px solid #222;
          border-radius: 4px;
          padding: 40px;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 28px;
        }
        .testimonial-card__quote {
          font-family: "Georgia", serif;
          font-size: clamp(1rem, 1.5vw, 1.15rem);
          line-height: 1.65;
          color: #f0ede8;
          margin: 0;
          font-style: italic;
        }
        .testimonial-card__footer {
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .testimonial-card__avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #2a2a2a;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: "Helvetica Neue", Arial, sans-serif;
          font-size: 0.875rem;
          color: #888;
          flex-shrink: 0;
        }
        .testimonial-card__name {
          font-family: "Helvetica Neue", Arial, sans-serif;
          font-size: 0.875rem;
          color: #f0ede8;
          font-weight: 500;
        }
        .testimonial-card__role {
          font-family: "Helvetica Neue", Arial, sans-serif;
          font-size: 0.75rem;
          color: #555;
          margin-top: 2px;
        }
        .work-cta {
          background: #f7f5f1;
          padding: 100px 6vw;
          border-top: 1px solid #e0dcd6;
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 24px;
        }
        .work-cta__line {
          font-size: clamp(1.5rem, 3vw, 2.5rem);
          font-style: italic;
          color: #333;
          margin: 0;
        }
        .work-cta__link {
          font-family: "Helvetica Neue", Arial, sans-serif;
          font-size: 0.875rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #111;
          text-decoration: none;
          border-bottom: 1px solid #111;
          padding-bottom: 2px;
          transition: opacity 0.2s;
        }
        .work-cta__link:hover { opacity: 0.6; }
        @media (max-width: 768px) {
          .work-item { grid-template-columns: 1fr; }
          .work-item__visual { height: 260px; }
          .work-cta { flex-direction: column; }
        }
      `}</style>
    </main>
  );
}