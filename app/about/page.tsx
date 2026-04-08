import React from 'react';

export default function AboutPage(): React.ReactElement {
  return (
    <div className="content">
      <section className="overview-section">
        <h3 className="section-title">Overview</h3>
        <p className="section-text">
          I am a Computer Science undergraduate at the University of Southampton, currently ranking in the <strong>top 10 of my cohort with a Year 1 average of 88%</strong>.
          <br /><br />
          My focus lies in software architecture and backend systems. I move beyond theory to build functional, secure applications.
          <br /><br />
          Parallel to my degree, I have maintained a long-term role at Tesco. Working in a high-pressure retail environment has honed my adaptability and communication skills, ensuring I can deliver results both in code and in collaboration.
        </p>
      </section>

      <section className="activities-section">
        <h3 className="section-title">Technical Skills</h3>
        <p className="section-text">
          My academic and personal projects have built a strong foundation in:
        </p>
        <ul>
          <li><strong>Core Languages:</strong> Java (Proficient), Python, Haskell, SQL.</li>
          <li><strong>Systems Engineering:</strong> Concurrency/Multi-threading, Socket Networking, OOP Patterns.</li>
          <li><strong>Tools:</strong> Git/GitHub, Linux/Unix, IntelliJ, VS Code.</li>
        </ul>
      </section>

      <section className="aspirations-section">
        <h3 className="section-title">Future Aspirations</h3>
        <p className="section-text">
          I'm eager to apply my growing technical skill set in real-world settings - whether through internships, collaborative projects, or freelance work. 
          My long-term goal is to contribute to impactful software that addresses real-world challenges and improves lives.
          <br /><br />
          If you're interested in connecting, collaborating, or sharing insights, feel free to reach out via <a className="inlineLink" href="/contact">my contact page</a> or on <a className="inlineLink" href="https://www.linkedin.com/in/christian-gleitzman" target="_blank" rel="noopener noreferrer">LinkedIn</a>.
        </p>
      </section>
    </div>
  );
}