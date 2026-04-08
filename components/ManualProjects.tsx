'use client';

import React, { useEffect, useRef, useState } from 'react';

interface ManualProject {
  id: string;
  title: string;
  period: string;
  description: string;
  highlights: string[];
  technologies: string[];
  role?: string;
  links?: { label: string; url: string }[];
}

const manualProjectsData: ManualProject[] = [
  {
    id: 'secure-journal',
    title: 'Secure Journaling Application',
    period: 'Oct 2025 – Present',
    description: 'A secure journaling application developed as part of a 4-person Agile team.',
    highlights: [
      'Designed and delivered secure journaling app with future-proof engineering standards',
      'Enforced Git pull-and-merge workflow and automated backend unit testing (JUnit)',
      'Architected decoupled MVC backend with integrated NLP model (LangChain4j) for semantic topic analysis',
      'Maintained absolute data privacy for sensitive user inputs',
    ],
    technologies: ['Java', 'Git', 'JUnit', 'LangChain4j', 'MVC Architecture'],
    role: 'SCRUM Master / Backend Engineer (4-person Agile team)',
  },
  {
    id: 'java-messaging',
    title: 'Java Online Messaging App',
    period: 'Summer 2025',
    description: 'A collaborative multi-threaded real-time messaging application using Java Sockets and Concurrency.',
    highlights: [
      'Architected multi-threaded real-time messaging application with Java Sockets',
      'Handled simultaneous user connections with robust concurrency patterns',
      'Implemented scalable client-server architecture with OOP design patterns',
      'Managed version control with feature branches and pull requests',
    ],
    technologies: ['Java', 'Java Sockets', 'Concurrency', 'OOP Design Patterns', 'Git/GitHub'],
    role: 'Collaborative Developer with fellow student',
  },
  {
    id: 'password-manager',
    title: 'Password Manager',
    period: 'Personal Project',
    description: 'A secure credential storage solution with encryption and authentication.',
    highlights: [
      'Implemented AES-256 encryption and salted hashing (SHA-256) for data security',
      'Engineered responsive GUI using PyQt with focus on UX and security flows',
      'Built intuitive CRUD operations for credential management',
      'Demonstrated full-stack development with Python backend and database integration',
    ],
    technologies: ['Python', 'SQL', 'PyQt', 'AES-256', 'SHA-256 Hashing'],
    role: 'Full-Stack Developer',
  },
  {
    id: 'maths-revision',
    title: 'Maths Revision Game',
    period: 'A-Level Computer Science Coursework 2022',
    description: 'A client-server Python application for student progress tracking and revision.',
    highlights: [
      'Built full-stack client-server Python application with database integration',
      'Implemented progress tracking and high score persistence',
      'Collaborated with stakeholders to gather requirements and feedback',
      'Demonstrated effectiveness as a revision tool with positive student feedback',
    ],
    technologies: ['Python', 'SQL', 'Client-Server Architecture'],
    role: 'Solo Developer',
  },
];

export const ManualProjects: React.FC = () => {
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const cardRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            const cardIndex = parseInt(target.dataset.index || '0');
            
            // Add a small delay for staggered animation
            setTimeout(() => {
              setVisibleCards(prev => new Set([...prev, cardIndex]));
            }, cardIndex * 150); // 150ms stagger
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="manual-projects-grid">
      {manualProjectsData.map((project, index) => (
        <article
          key={project.id}
          ref={(el) => {
            if (el) cardRefs.current[index] = el;
          }}
          className={`manual-project-card ${visibleCards.has(index) ? 'visible' : ''}`}
          data-index={index}
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className="project-header">
            <h4 className="project-title">{project.title}</h4>
            <p className="project-period">{project.period}</p>
          </div>

          <p className="project-description">{project.description}</p>

          <div className="project-highlights">
            <h5>Key Highlights</h5>
            <ul>
              {project.highlights.map((highlight, idx) => (
                <li key={idx}>{highlight}</li>
              ))}
            </ul>
          </div>

          <div className="project-tech-stack">
            <h5>Tech Stack</h5>
            <div className="tech-tags">
              {project.technologies.map((tech) => (
                <span key={tech} className="tech-tag">{tech}</span>
              ))}
            </div>
          </div>

          {project.role && (
            <p className="project-role">
              <strong>Role:</strong> {project.role}
            </p>
          )}
        </article>
      ))}
    </section>
  );
};
