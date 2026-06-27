"use client";

import styles from "./AboutSection.module.css";

export default function AboutSection() {
  const pillars = [
    {
      num: "01",
      title: "Web Development",
      content: "We believe in building digital architectures that are blazing fast, accessible, and designed to convert."
    },
    {
      num: "02",
      title: "App Development",
      content: "Apps should feel native, fluid, and intuitive, bridging the gap between desktop power and mobile convenience."
    },
    {
      num: "03",
      title: "AI Agents",
      content: "Intelligent workflows and custom agents that automate actions, engage users, and build a smarter future."
    }
  ];

  return (
    <div className={styles.aboutWrapper}>
      
      {/* About Header Intro */}
      <h2 className={styles.introText}>
        We are Vgen; a <span className={styles.serifItalic}>production</span> agency specialised in <span className={styles.serifItalic}>web, app and AI agents</span>.
      </h2>

      {/* Team Picture Placeholder */}
      <div className={styles.teamPictureContainer}>
        <div className={styles.teamPicturePlaceholder}>
          <span className={styles.placeholderText}>Team picture</span>
        </div>
      </div>

      {/* Mission Section */}
      <section className={styles.missionSection}>
        <h3 className={styles.label}>Mission</h3>
        <p className={styles.missionText}>
          We create <span className={styles.serifItalic}>magnetic commerce</span> that attracts, resonates and converts, helping brands turn <span className={styles.serifItalic}>brave ideas</span> into <span className={styles.serifItalic}>digital experiences</span> that captivate their audience, build trust, and drive <span className={styles.serifItalic}>lasting growth</span>.
        </p>
      </section>

      {/* Agency Pillars Section */}
      <section className={styles.pillarsSection}>
        <h3 className={styles.pillarsTitle}>Agency Pillars</h3>
        
        <div className={styles.cardsStack}>
          {pillars.map((pillar, index) => {
            // Apply different card styles and sticky top offsets dynamically
            const cardClass = 
              index === 0 ? styles.card1 :
              index === 1 ? styles.card2 :
              styles.card3;
            
            // Increment top offset for each sticky card so they overlap but show header offsets
            const stickyTop = `${80 + index * 40}px`;
            
            return (
              <div 
                key={index} 
                className={`${styles.pillarCard} ${cardClass}`}
                style={{ top: stickyTop, zIndex: index + 1 }}
              >
                <div className={styles.cardHeader}>
                  <h4 className={styles.cardTitle}>{pillar.title}</h4>
                  <span className={styles.cardNum}>{pillar.num}</span>
                </div>
                <div className={styles.cardBody}>
                  <p className={styles.cardText}>{pillar.content}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}
