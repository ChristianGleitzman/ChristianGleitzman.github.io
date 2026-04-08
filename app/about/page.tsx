import React from 'react';

export default function AboutPage(): React.ReactElement {
  return (
    <section className="about-section">
      <h1>About Me</h1>
      <p>
        I am an undergraduate transitioning into professional software engineering, 
        focusing on data-driven technologies and clean system architecture.
      </p>
      {/* Migrate your existing HTML content here, 
        ensuring you change 'class' to 'className' 
      */}
    </section>
  );
}