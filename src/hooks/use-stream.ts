"use client";

import { useEffect, useState } from "react";

export function useStream(text: string, speed = 10) {
  const [value, setValue] = useState("");

  useEffect(() => {
    if (!text) {
      setValue("");
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion || speed <= 0) {
      setValue(text);
      return;
    }

    setValue("");

    let currentIndex = 0;

    // Long AI responses should finish streaming in a usable time,
    // rather than waiting one timer tick for every single character.
    const charactersPerStep = Math.max(1, Math.ceil(text.length / 260));

    const timer = window.setInterval(() => {
      currentIndex = Math.min(
        currentIndex + charactersPerStep,
        text.length,
      );

      setValue(text.slice(0, currentIndex));

      if (currentIndex >= text.length) {
        window.clearInterval(timer);
      }
    }, speed);

    return () => {
      window.clearInterval(timer);
    };
  }, [text, speed]);

  return value;
}