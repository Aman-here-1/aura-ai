"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("aura-theme");

    if (savedTheme === "light") {
      document.documentElement.classList.add("light");
      setIsLight(true);
    } else {
      document.documentElement.classList.remove("light");
      setIsLight(false);
    }
  }, []);

  const toggleTheme = () => {
    const nextIsLight = !isLight;

    setIsLight(nextIsLight);

    if (nextIsLight) {
      document.documentElement.classList.add("light");
      localStorage.setItem("aura-theme", "light");
    } else {
      document.documentElement.classList.remove("light");
      localStorage.setItem("aura-theme", "dark");
    }
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={
        isLight ? "Switch to dark theme" : "Switch to light theme"
      }
      title={
        isLight ? "Switch to dark theme" : "Switch to light theme"
      }
      className="
        relative
        flex
        h-10
        w-10
        items-center
        justify-center
        rounded-xl
        border
        border-slate-700
        bg-slate-900/70
        text-slate-300
        shadow-sm
        transition-all
        duration-300
        hover:scale-105
        hover:border-cyan-400/50
        hover:bg-slate-800
        hover:text-white
        focus:outline-none
        focus:ring-2
        focus:ring-cyan-400/40
        light:border-slate-200
        light:bg-white
        light:text-slate-600
        light:hover:border-blue-400
        light:hover:bg-slate-50
        light:hover:text-slate-900
      "
    >
      {isLight ? (
        <Sun size={19} />
      ) : (
        <Moon size={19} />
      )}
    </button>
  );
}