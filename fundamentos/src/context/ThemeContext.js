import React, { createContext, useEffect, useMemo, useState } from "react";
import themes from "../styles/themes";

export const ThemeContext = createContext();

export default function CurrentThemeProvider({ children }) {
  const THEME = "theme";

  const [theme, setTheme] = useState("dark");

  const currentTheme = useMemo(() => {
    return themes[theme] ?? themes.dark;
  }, [theme]);

  function handleToggleTheme() {
    setTheme((currentThemeState) =>
      currentThemeState === "dark" ? "light" : "dark"
    );
  }

  const contextValue = useMemo(
    () => ({
      currentTheme,
      selectedTheme: theme,
      handleToggleTheme,
    }),
    [currentTheme, theme, handleToggleTheme]
  );

  useEffect(() => {
    const storedTheme = localStorage.getItem(THEME);

    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(THEME, theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}
