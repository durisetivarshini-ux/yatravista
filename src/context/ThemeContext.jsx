import React, { createContext, useContext, useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const ThemeContext = createContext();

export const themeOptions = [
  {
    id: "royal-sandstone",
    name: "Royal Sandstone",
    description: "Ivory, Sandstone Gold & Deep Emerald",
    swatches: ["#FAF7F2", "#1C3B2B", "#C59A45"],
  },
  {
    id: "kerala-rainforest",
    name: "Kerala Rainforest",
    description: "Crisp Palm Mist, Deep Evergreen & Warm Teak",
    swatches: ["#F3F7F4", "#1B4332", "#D4A373"],
  },
  {
    id: "varanasi-twilight",
    name: "Varanasi Twilight",
    description: "Ghat Twilight Indigo, Saffron & Ganga Blue",
    swatches: ["#F5F6FA", "#1E2A4A", "#E07A5F"],
  },
  {
    id: "kashmir-mist",
    name: "Kashmir Mist",
    description: "Alpine Frost, Cedar Slate & Chinar Amber",
    swatches: ["#F0F4F8", "#2C3E50", "#D97706"],
  },
];

export function ThemeProvider({ children }) {
  // Support migration from old theme ids (heritage/coastal/mountain) to new standard theme names
  const [theme, setTheme] = useLocalStorage("yatravista_theme", "royal-sandstone");

  useEffect(() => {
    let resolvedTheme = theme;
    if (theme === "heritage") resolvedTheme = "royal-sandstone";
    if (theme === "coastal") resolvedTheme = "varanasi-twilight";
    if (theme === "mountain") resolvedTheme = "kashmir-mist";

    const root = document.documentElement;
    root.setAttribute("data-theme", resolvedTheme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themeOptions }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
export default ThemeProvider;
