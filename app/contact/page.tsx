import React from 'react';
import Link from 'next/link';

/**
 * Renders the static Contact page.
 * @returns A React functional component.
 */
export default function ContactPage(): React.ReactElement {
  return (
    <div className="content">
      <section className="contact-me">
        <h2>Contact Me</h2>
        <p className="contact-me-info">
          The easiest form of direct contact is via my email,{' '}
          <a className="inlineLink" href="mailto:chris.gleitzman@gmail.com">
            chris.gleitzman@gmail.com
          </a>{' '}
          where I will try my best to respond promptly. Another way of contacting me is via my{' '}
          <a
            className="inlineLink"
            href="https://www.linkedin.com/in/christian-gleitzman"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          . Alternatively, you can contact me through this website below via this form:
        </p>

        <div className="form-container">
          <form
            id="contact-form"
            action="https://docs.google.com/forms/d/e/1FAIpQLSc__BiQ68zUorGc6_mQVzTtzk-HnPzGu_l9clwJkVG-6lU7Cg/formResponse"
            method="POST"
          >
            <label htmlFor="entry.1377322308">Name:</label>
            <input type="text" name="entry.1377322308" id="entry.1377322308" required />

            <label htmlFor="entry.1417686407">Email Address:</label>
            <input type="email" name="entry.1417686407" id="entry.1417686407" required />

            <label htmlFor="entry.1500459884">Subject:</label>
            <input type="text" name="entry.1500459884" id="entry.1500459884" required />

            <label htmlFor="entry.138196121">Message:</label>
            <textarea name="entry.138196121" id="entry.138196121" rows={5} required></textarea>

            <input type="submit" value="Submit" className="btn" />
          </form>
          <div id="form-status"></div>
        </div>
      </section>
    </div>
  );
}