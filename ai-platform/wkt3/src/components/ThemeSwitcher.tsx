"use client";

import { useContext } from "react";
import { ThemeContext } from "./ThemeProvider";

const themes = ["light", "dark", "blue", "green", "red"];

export default function ThemeSwitcher() {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <div className="flex gap-2 items-center">
      {themes.map((t) => (
        <button
          key={t}
          className={`px-3 py-1 rounded text-white ${
            theme === t ? "ring-2 ring-offset-2 ring-black" : ""
          } bg-${t === "light" ? "gray-500" : t}-600`}
          onClick={() => setTheme(t)}
        >
          {t}
        </button>
      ))}
    </div>
  );
}
