"use client";

import React, { useState, FormEvent } from 'react';

/**
 * Renders the Contact page and handles asynchronous API communication.
 * @returns A strictly-typed React functional component.
 */
export default function ContactPage(): React.ReactElement {
  // State management for UI feedback during network requests
  const [statusMsg, setStatusMsg] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  /**
   * Intercepts the form submission, serializes data, and executes an async POST request.
   * @param e - The HTML form submission event.
   */
  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMsg("");

    const formData = new FormData(e.currentTarget);
    
    // Construct the payload matching the Python ContactPayloadDTO
    const payload = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
    };

    try {
      // Dispatch payload to your versioned API route
      const response = await fetch("/api/v1/communications/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorDetail = await response.text();
        throw new Error(`HTTP ${response.status} - ${errorDetail}`);
      }

      setStatusMsg("Thank you! Your message has been sent successfully.");
      (e.target as HTMLFormElement).reset(); // Clear the form on success
      
    } catch (error) {
      console.error("API Dispatch Error:", error);
      setStatusMsg("Failed to send message. Please try emailing me directly.");
    } finally {
      setIsSubmitting(false); // Re-enable the form
    }
  };

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
          <form id="contact-form" onSubmit={handleFormSubmit}>
            <label htmlFor="name">Name</label>
            <input 
              type="text" 
              name="name" 
              id="name" 
              placeholder="Your name" 
              required 
              disabled={isSubmitting} 
            />

            <label htmlFor="email">Email Address</label>
            <input 
              type="email" 
              name="email" 
              id="email" 
              placeholder="your@email.com" 
              required 
              disabled={isSubmitting} 
            />

            <label htmlFor="subject">Subject</label>
            <input 
              type="text" 
              name="subject" 
              id="subject" 
              placeholder="e.g., Internship Opportunity" 
              required 
              disabled={isSubmitting} 
            />

            <label htmlFor="message">Message</label>
            <textarea 
              name="message" 
              id="message" 
              rows={5} 
              placeholder="Tell me more..." 
              required 
              disabled={isSubmitting}
            ></textarea>

            <input 
              type="submit" 
              value={isSubmitting ? "Sending..." : "Send Message"} 
              className="btn" 
              disabled={isSubmitting} 
            />
          </form>
          
          {/* Status Message Display */}
          {statusMsg && (
            <div 
              id="form-status" 
              style={{ 
                marginTop: '1rem', 
                color: statusMsg.includes("Failed") ? 'hsl(0, 100%, 60%)' : 'hsl(162, 92%, 50%)',
                textAlign: 'center',
                fontWeight: 'bold'
              }}
            >
              {statusMsg}
            </div>
          )}
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