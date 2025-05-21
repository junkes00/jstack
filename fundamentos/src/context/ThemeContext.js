import React, { createContext, useMemo, useState } from "react";
import themes from "../styles/themes";

export const ThemeContext = createContext();

export default function CurrentThemeProvider({ children }) {
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

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}
