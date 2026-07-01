"use client";

import React, { useState } from "react";
import styles from "./ContactSection.module.css";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    details: "",
  });

  const [service, setService] = useState("Web Development");
  const [budget, setBudget] = useState("$25k - $50k");
  const [submitted, setSubmitted] = useState(false);

  const services = ["Web Development", "App Development", "AI Integrations", "Other"];
  const budgets = ["< $25k", "$25k - $50k", "$50k - $100k", "$100k+"];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API submission
    setSubmitted(true);
  };

  return (
    <section className={styles.contactWrapper}>
      <div className={styles.container}>
        
        {/* Left Column: Heading and Info */}
        <div className={styles.infoCol}>
          <h2 className={styles.title}>
            Let&apos;s build something <span className={styles.serifItalic}>exceptional</span> together.
          </h2>
          <p className={styles.subtitle}>
            Have a project in mind or want to explore how our team can partner with you? Share the details and we&apos;ll get back to you shortly.
          </p>

          <div className={styles.contactDetails}>
            <div className={styles.detailBlock}>
              <span className={styles.detailLabel}>General Inquiries</span>
              <a href="mailto:hello@vgen.co" className={styles.detailValue}>
                hello@vgen.co
              </a>
            </div>

            <div className={styles.detailBlock}>
              <span className={styles.detailLabel}>Location</span>
              <span className={styles.detailValue}>London, United Kingdom</span>
            </div>

            <div className={styles.detailBlock}>
              <span className={styles.detailLabel}>Social</span>
              <div className={styles.socials}>
                <a href="#" className={styles.socialLink}>Instagram</a>
                <a href="#" className={styles.socialLink}>LinkedIn</a>
                <a href="#" className={styles.socialLink}>Twitter</a>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className={styles.formCol}>
          {submitted ? (
            <div className={styles.successMessage}>
              <h3 className={styles.successTitle}>Thank You.</h3>
              <p className={styles.successText}>
                Your project inquiry has been received. Our team will review the details and reach out within 24 hours.
              </p>
              <button 
                onClick={() => setSubmitted(false)} 
                className={styles.resetButton}
              >
                Send another inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className={styles.form}>
              
              {/* Service Type Selection */}
              <div className={styles.formSection}>
                <span className={styles.sectionLabel}>I am looking for:</span>
                <div className={styles.optionsGrid}>
                  {services.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setService(item)}
                      className={`${styles.optionChip} ${service === item ? styles.activeChip : ""}`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              {/* Text Fields */}
              <div className={styles.inputsGrid}>
                <div className={styles.inputGroup}>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Your Name *"
                    className={styles.textInput}
                  />
                  <span className={styles.inputBar} />
                </div>

                <div className={styles.inputGroup}>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="Email Address *"
                    className={styles.textInput}
                  />
                  <span className={styles.inputBar} />
                </div>

                <div className={styles.inputGroup}>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="Company Name"
                    className={styles.textInput}
                  />
                  <span className={styles.inputBar} />
                </div>
              </div>

              {/* Project Details */}
              <div className={styles.inputGroup}>
                <textarea
                  name="details"
                  value={formData.details}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Tell us about your project..."
                  className={styles.textareaInput}
                />
                <span className={styles.inputBar} />
              </div>

              {/* Budget Selection */}
              <div className={styles.formSection}>
                <span className={styles.sectionLabel}>Estimated Budget:</span>
                <div className={styles.optionsGrid}>
                  {budgets.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setBudget(item)}
                      className={`${styles.optionChip} ${budget === item ? styles.activeChip : ""}`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <button type="submit" className={styles.submitBtn}>
                <span>Submit Inquiry</span>
                <svg 
                  className={styles.arrowIcon}
                  width="16" 
                  height="16" 
                  viewBox="0 0 16 16" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    d="M1 8H15M15 8L8 1M15 8L8 15" 
                    stroke="currentColor" 
                    strokeWidth="1.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

            </form>
          )}
        </div>

      </div>
    </section>
  );
}
