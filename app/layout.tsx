"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import "./globals.css";
import { ThemeProvider } from "./ThemeContext";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function RootLayout({ children }: { readonly children: React.ReactNode }) {
  const pathname = usePathname();
  const isLanding = pathname === "/";

  return (
    <html lang="en" data-theme="dark">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
        <title>Christian Gleitzman | Portfolio</title>
        <meta name="description" content="Computer Science Student specialising in backend development, systems design, and cloud architecture." />
        <meta name="keywords" content="Christian Gleitzman, portfolio, software engineer, computer science, backend development" />
        <meta name="author" content="Christian Gleitzman" />
        <meta name="theme-color" content="#1a1a1a" />
        
        {/* Open Graph Tags for Social Sharing */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Christian Gleitzman | Software Engineering Portfolio" />
        <meta property="og:description" content="Explore my projects, skills, and journey as an aspiring software engineer specializing in backend development." />
        <meta property="og:url" content="https://christian-gleitzman.me" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Christian Gleitzman | Portfolio" />
        <meta name="twitter:description" content="Computer Science student creating impactful software solutions." />
        
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Christian Gleitzman",
              url: "https://christian-gleitzman.me",
              sameAs: [
                "https://github.com/ChristianGleitzman",
                "https://www.linkedin.com/in/christian-gleitzman",
              ],
              jobTitle: "Software Engineer (Student)",
              description:
                "Computer Science student at University of Southampton specializing in backend development and systems design",
            }),
          }}
        />
      </head>
      <body className="landing-body">
        <ThemeProvider>
          {!isLanding && (
            <header className="navbar">
              <h2 className="page-title">Christian Gleitzman</h2>
              <nav className="nav-links">
                <Link href="/">Home</Link>
                <Link href="/about">About Me</Link>
                <Link href="/projects">My Projects</Link>
                <Link href="/contact">Contact Me</Link>
              </nav>
              <ThemeToggle />
            </header>
          )}

          <main className="content-wrapper" style={{ flex: 1, width: '100%' }}>
            {children}
          </main>

          <footer className="footer">
            <p>&copy; {new Date().getFullYear()} Christian Gleitzman</p>
            <ul className="social-list">
              <li className="social-list-item">
                <a href="https://github.com/ChristianGleitzman" className="social-list-link" target="_blank" rel="noopener noreferrer">
                  <i className="fa fa-github"></i>
                </a>
              </li>
              <li className="social-list-item">
                <a href="https://www.linkedin.com/in/christian-gleitzman" className="social-list-link" target="_blank" rel="noopener noreferrer">
                  <i className="fa fa-linkedin"></i>
                </a>
              </li>
            </ul>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}