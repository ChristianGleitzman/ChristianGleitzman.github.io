"use client";

import { useTheme } from "@/app/ThemeContext";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle"
      aria-label="Toggle dark/light theme"
      title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {theme === "dark" ? (
        <i className="fa fa-sun-o"></i>
      ) : (
        <i className="fa fa-moon-o"></i>
      )}
    </button>
  );
}
