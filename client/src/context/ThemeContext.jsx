import { createContext, useState, useContext, useEffect } from "react";

const ThemeContext = createContext(undefined);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");
  const [isClient, setIsClient] = useState(false);

  // Effect for client-side detection
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Effect for theme initialization
  useEffect(() => {
    if (isClient) {
      // Check for theme in localStorage
      const savedTheme = localStorage.getItem("theme");
      
      // If theme exists in localStorage, use it
      if (savedTheme === "dark" || savedTheme === "light") {
        setTheme(savedTheme);
      }
      // Otherwise check for preferred color scheme
      else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        setTheme("dark");
      }
      // Default is already set to light
    }
  }, [isClient]);

  // Effect for theme changes
  useEffect(() => {
    if (isClient) {
      // Update localStorage
      localStorage.setItem("theme", theme);
      
      // Update document class
      if (theme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }, [theme, isClient]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
