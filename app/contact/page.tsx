import React from 'react';
import Link from 'next/link';

/**
 * Renders the Contact page.
 * @returns A React functional component.
 */
export default function ContactPage(): React.ReactElement {
  return (
    <div className="content">
      {/* Open to Opportunities Banner */}
      <section className="opportunity-banner">
        <div className="banner-content">
          <h3>Open to Internship Opportunities</h3>
          <p>
            I'm actively seeking summer internship positions. If you have an opportunity that aligns with my interests, I'd love to hear from you!
          </p>
        </div>
      </section>

      <section className="contact-me">
        <h2>Get In Touch</h2>
        <p className="contact-me-info">
          The easiest way to reach me is via <strong>email</strong>, and I'll do my best to respond promptly. You can also connect with me on{' '}
          <a
            className="inlineLink"
            href="https://www.linkedin.com/in/christian-gleitzman"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          . Alternatively, fill out the form below:
        </p>

        <div className="form-container">
          <form
            id="contact-form"
            action="https://docs.google.com/forms/d/e/1FAIpQLSc__BiQ68zUorGc6_mQVzTtzk-HnPzGu_l9clwJkVG-6lU7Cg/formResponse"
            method="POST"
          >
            <label htmlFor="entry.1377322308">Name</label>
            <input type="text" name="entry.1377322308" id="entry.1377322308" placeholder="Your name" required />

            <label htmlFor="entry.1417686407">Email Address</label>
            <input type="email" name="entry.1417686407" id="entry.1417686407" placeholder="your@email.com" required />

            <label htmlFor="entry.1500459884">Subject</label>
            <input type="text" name="entry.1500459884" id="entry.1500459884" placeholder="e.g., Internship Opportunity" required />

            <label htmlFor="entry.138196121">Message</label>
            <textarea name="entry.138196121" id="entry.138196121" rows={5} placeholder="Tell me more..." required></textarea>

            <input type="submit" value="Send Message" className="btn" />
          </form>
          <div id="form-status"></div>
        </div>
      </section>

      <section className="quick-contact">
        <h3 className="section-title">Direct Contact</h3>
        <div className="contact-methods">
          <a href="mailto:chris.gleitzman@gmail.com" className="contact-link">
            + chris.gleitzman@gmail.com
          </a>
          <a href="https://www.linkedin.com/in/christian-gleitzman" className="contact-link" target="_blank" rel="noopener noreferrer">
            + LinkedIn Profile
          </a>
          <a href="https://github.com/ChristianGleitzman" className="contact-link" target="_blank" rel="noopener noreferrer">
            + GitHub Profile
          </a>
        </div>
      </section>
    </div>
  );
}