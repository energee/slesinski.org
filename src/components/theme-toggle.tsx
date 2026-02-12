"use client";

import { useEffect, useState } from "react";
import { Sun, Moon, Monitor } from "lucide-react";

type Theme = "light" | "dark" | "system";

const options: Theme[] = ["light", "dark", "system"];

const icons: Record<Theme, typeof Sun> = {
  light: Sun,
  dark: Moon,
  system: Monitor,
};

function applyTheme(theme: Theme): void {
  const root = document.documentElement;
  root.classList.remove("light", "dark");
  if (theme !== "system") {
    root.classList.add(theme);
  }
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("system");

  useEffect(() => {
    const stored = localStorage.getItem("theme") as Theme | null;
    if (stored === "light" || stored === "dark") {
      setTheme(stored);
    }
  }, []);

  function handleChange(next: Theme): void {
    setTheme(next);
    if (next === "system") {
      localStorage.removeItem("theme");
    } else {
      localStorage.setItem("theme", next);
    }
    applyTheme(next);
  }

  return (
    <div className="flex gap-1">
      {options.map((option) => {
        const Icon = icons[option];
        return (
          <button
            key={option}
            onClick={() => handleChange(option)}
            aria-label={`${option} theme`}
            className={`rounded p-1.5 transition-colors ${
              theme === option
                ? "bg-foreground/10 text-foreground"
                : "text-muted hover:text-foreground"
            }`}
          >
            <Icon size={14} />
          </button>
        );
      })}
    </div>
  );
}
