import React from 'react';
import { SkillsMatrix } from '@/components/SkillsMatrix';

export default function AboutPage(): React.ReactElement {
  return (
    <div className="content">
      <section className="overview-section">
        <h3 className="section-title">About Me</h3>
        <p className="section-text">
          I'm a Computer Science undergraduate at the University of Southampton, currently ranking in the <strong>top 10 of my cohort with an 88% Year 1 average</strong>. My interests lie in <strong>backend and cloud development</strong>, but will never turn down the opportunity to solve real-world problems with code!
        </p>
      </section>

      <SkillsMatrix />

      <section className="activities-section">
        <h3 className="section-title">Experience</h3>
        <div className="experience-item">
          <h4 className="experience-title">Retail Team Member - Tesco</h4>
          <p className="experience-details">
            Working in a high-pressure retail environment has honed my <strong>adaptability, teamwork, and communication skills</strong>. I've learned to manage time effectively, work under pressure, and deliver consistent results. I hope to transfer these skills to collaborative development teams!
          </p>
        </div>
      </section>

      <section className="aspirations-section">
        <h3 className="section-title">What I'm Seeking</h3>
        <p className="section-text">
          I'm actively pursuing <strong>internship opportunities</strong> where I can apply my technical skills to real-world challenges. I'm particularly interested in:
        </p>
        <ul style={{ marginLeft: '1.5rem' }}>
          <li>Backend/Systems engineering roles</li>
          <li>Software infrastructure & architecture</li>
          <li>Roles emphasising code quality and system design</li>
          <li>Teams that value learning and mentorship</li>
        </ul>
        <p className="section-text" style={{ marginTop: '1.5rem' }}>
          If you're interested in connecting, collaborating, or discussing opportunities, feel free to reach out via <a className="inlineLink" href="/contact">my contact page</a> or on <a className="inlineLink" href="https://www.linkedin.com/in/christian-gleitzman" target="_blank" rel="noopener noreferrer">LinkedIn</a>.
        </p>
      </section>
    </div>
  );
}