"use client";
import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    budget: "",
    message: "",
  });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const budgetOptions = [
    "Under $5k",
    "$5k – $15k",
    "$15k – $40k",
    "$40k+",
    "Let's talk",
  ];

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.MouseEvent) {
    e.preventDefault();
    setLoading(true);
    // Replace with your actual form submission endpoint
    await new Promise((r) => setTimeout(r, 1200));
    setSent(true);
    setLoading(false);
  }

  return (
    <main className="contact-page">
      {/* ── Left panel ── */}
      <aside className="contact-aside">
        <div className="contact-aside__inner">
          <p className="contact-aside__eyebrow">Contact</p>
          <h1 className="contact-aside__heading">
            Let's build
            <br />
            something
            <br />
            <em>worth</em>
            <br />
            showing.
          </h1>
          <div className="contact-aside__details">
            <a
              href="mailto:hello@vgen.studio"
              className="contact-aside__email"
            >
              hello@vgen.studio
            </a>
            <p className="contact-aside__note">
              We reply within one business day. No templates, no auto-replies.
            </p>
          </div>
          <div className="contact-aside__availability">
            <span className="contact-aside__dot" />
            <span>Taking on new projects</span>
          </div>
        </div>
      </aside>

      {/* ── Right panel: form ── */}
      <section className="contact-form-panel">
        {sent ? (
          <div className="contact-success">
            <div className="contact-success__icon">✓</div>
            <h2 className="contact-success__heading">Message received.</h2>
            <p className="contact-success__body">
              We'll be in touch within one business day. In the meantime, check
              out our{" "}
              <a href="/work" className="contact-success__link">
                recent work
              </a>
              .
            </p>
          </div>
        ) : (
          <div className="contact-form">
            <div className="form-row form-row--two">
              <div className="form-field">
                <label className="form-label" htmlFor="name">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className="form-input"
                  placeholder="Your name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-field">
                <label className="form-label" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="form-input"
                  placeholder="you@company.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-field">
              <label className="form-label" htmlFor="company">
                Company / Project
              </label>
              <input
                id="company"
                name="company"
                type="text"
                className="form-input"
                placeholder="What are you building?"
                value={form.company}
                onChange={handleChange}
              />
            </div>

            <div className="form-field">
              <label className="form-label">Approximate budget</label>
              <div className="budget-options">
                {budgetOptions.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    className={`budget-btn${form.budget === opt ? " budget-btn--active" : ""}`}
                    onClick={() => setForm((p) => ({ ...p, budget: opt }))}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <div className="form-field">
              <label className="form-label" htmlFor="message">
                Tell us more
              </label>
              <textarea
                id="message"
                name="message"
                className="form-textarea"
                placeholder="What's the project? What's the timeline? What have you tried so far?"
                value={form.message}
                onChange={handleChange}
                rows={5}
              />
            </div>

            <button
              type="button"
              className={`form-submit${loading ? " form-submit--loading" : ""}`}
              onClick={handleSubmit}
              disabled={loading || !form.name || !form.email}
            >
              {loading ? "Sending…" : "Send message →"}
            </button>
          </div>
        )}
      </section>

      <style jsx>{`
        /* ─── Layout ─── */
        .contact-page {
          display: grid;
          grid-template-columns: 1fr 1.4fr;
          min-height: 100vh;
          font-family: "Georgia", "Times New Roman", serif;
        }

        /* ─── Aside ─── */
        .contact-aside {
          background: #141414;
          color: #f0ede8;
          padding: 0;
          position: sticky;
          top: 0;
          height: 100vh;
          display: flex;
          align-items: center;
        }
        .contact-aside__inner {
          padding: 60px;
          display: flex;
          flex-direction: column;
          gap: 40px;
          max-width: 440px;
        }
        .contact-aside__eyebrow {
          font-family: "Helvetica Neue", Arial, sans-serif;
          font-size: 11px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #555;
          margin: 0;
        }
        .contact-aside__heading {
          font-size: clamp(2.2rem, 4vw, 3.4rem);
          font-weight: 400;
          line-height: 1.1;
          margin: 0;
          letter-spacing: -0.02em;
        }
        .contact-aside__heading em {
          font-style: italic;
          color: #c8b8a2;
        }
        .contact-aside__details {
          display: flex;
          flex-direction: column;
          gap: 12px;
          border-top: 1px solid #2a2a2a;
          padding-top: 32px;
        }
        .contact-aside__email {
          font-family: "Helvetica Neue", Arial, sans-serif;
          font-size: 0.95rem;
          color: #c8b8a2;
          text-decoration: none;
          transition: opacity 0.2s;
        }
        .contact-aside__email:hover { opacity: 0.7; }
        .contact-aside__note {
          font-family: "Helvetica Neue", Arial, sans-serif;
          font-size: 0.8rem;
          line-height: 1.6;
          color: #666;
          margin: 0;
        }
        .contact-aside__availability {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: "Helvetica Neue", Arial, sans-serif;
          font-size: 0.78rem;
          color: #7b9e87;
          letter-spacing: 0.06em;
        }
        .contact-aside__dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #7b9e87;
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }

        /* ─── Form panel ─── */
        .contact-form-panel {
          background: #f7f5f1;
          padding: 120px 6vw 80px;
          display: flex;
          align-items: flex-start;
        }
        .contact-form {
          width: 100%;
          max-width: 560px;
          display: flex;
          flex-direction: column;
          gap: 32px;
        }

        /* ─── Form elements ─── */
        .form-row--two {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        .form-field {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .form-label {
          font-family: "Helvetica Neue", Arial, sans-serif;
          font-size: 10px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #999;
        }
        .form-input,
        .form-textarea {
          font-family: "Helvetica Neue", Arial, sans-serif;
          font-size: 0.95rem;
          color: #111;
          background: transparent;
          border: none;
          border-bottom: 1px solid #ccc;
          padding: 10px 0;
          outline: none;
          transition: border-color 0.2s;
          resize: none;
          width: 100%;
        }
        .form-input::placeholder,
        .form-textarea::placeholder {
          color: #bbb;
        }
        .form-input:focus,
        .form-textarea:focus {
          border-bottom-color: #111;
        }

        /* Budget */
        .budget-options {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .budget-btn {
          font-family: "Helvetica Neue", Arial, sans-serif;
          font-size: 0.78rem;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          padding: 8px 16px;
          border: 1px solid #ccc;
          border-radius: 2px;
          background: transparent;
          color: #777;
          cursor: pointer;
          transition: all 0.2s;
        }
        .budget-btn:hover {
          border-color: #111;
          color: #111;
        }
        .budget-btn--active {
          background: #111;
          border-color: #111;
          color: #f7f5f1;
        }

        /* Submit */
        .form-submit {
          font-family: "Helvetica Neue", Arial, sans-serif;
          font-size: 0.875rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #f7f5f1;
          background: #111;
          border: none;
          padding: 18px 40px;
          cursor: pointer;
          border-radius: 2px;
          transition: opacity 0.2s;
          width: fit-content;
          margin-top: 8px;
        }
        .form-submit:hover:not(:disabled) { opacity: 0.8; }
        .form-submit:disabled { opacity: 0.4; cursor: default; }
        .form-submit--loading { opacity: 0.6; }

        /* ─── Success ─── */
        .contact-success {
          display: flex;
          flex-direction: column;
          gap: 20px;
          padding: 40px 0;
        }
        .contact-success__icon {
          font-size: 2rem;
          color: #7b9e87;
        }
        .contact-success__heading {
          font-size: 2rem;
          font-weight: 400;
          margin: 0;
        }
        .contact-success__body {
          font-family: "Helvetica Neue", Arial, sans-serif;
          font-size: 0.9rem;
          line-height: 1.7;
          color: #666;
          max-width: 360px;
          margin: 0;
        }
        .contact-success__link {
          color: #111;
          text-decoration: underline;
        }

        /* ─── Responsive ─── */
        @media (max-width: 900px) {
          .contact-page {
            grid-template-columns: 1fr;
          }
          .contact-aside {
            position: static;
            height: auto;
          }
          .contact-aside__inner {
            padding: 80px 6vw 60px;
          }
          .form-row--two {
            grid-template-columns: 1fr;
          }
          .contact-form-panel {
            padding: 60px 6vw 80px;
          }
        }
      `}</style>
    </main>
  );
}