"use client";

import {
  useEffect,
  useState,
} from "react";

export function useStream(
  text: string,
  speed = 10,
) {

  const [value, setValue] =
    useState("");

  useEffect(() => {

    setValue("");

    let i = 0;

    const timer = setInterval(() => {

      i++;

      setValue(
        text.slice(0, i),
      );

      if (i >= text.length) {
        clearInterval(timer);
      }

    }, speed);

    return () =>
      clearInterval(timer);

  }, [text, speed]);

  return value;

}