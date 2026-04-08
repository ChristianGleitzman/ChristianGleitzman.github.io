"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import "./globals.css";

export default function RootLayout({ children }: { readonly children: React.ReactNode }) {
  const pathname = usePathname();
  const isLanding = pathname === "/";

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
        <title>Christian Gleitzman | Portfolio</title>
        <meta name="description" content="Computer Science Student specializing in systems design and backend architecture." />
      </head>
      <body className="landing-body">
        {!isLanding && (
          <header className="navbar">
            <h2 className="page-title">Christian Gleitzman</h2>
            <nav className="nav-links">
              <Link href="/">Home</Link>
              <Link href="/about">About Me</Link>
              <Link href="/projects">My Projects</Link>
              <Link href="/contact">Contact Me</Link>
            </nav>
          </header>
        )}

        {/* The active page content is injected here */}
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
      </body>
    </html>
  );
}