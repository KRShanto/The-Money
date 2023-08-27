"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { BsFillMoonStarsFill, BsFillSunFill } from "react-icons/bs";
import NavButton from "./NavButton";

export default function ToggleTheme() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // When mounted on client, now we can show the UI. Else it will throw hydration error.
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <NavButton
      onClick={() => {
        setTheme(theme === "dark" ? "light" : "dark");
      }}
      title={
        theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
      }
    >
      {theme === "dark" ? <BsFillSunFill /> : <BsFillMoonStarsFill />}
    </NavButton>
  );
}
