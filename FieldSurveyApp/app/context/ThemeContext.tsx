import React, { createContext, useContext, useState } from "react";

export type Colors = {
  background: string;
  card: string;
  text: string;
  textSecondary: string;
  textMuted: string;
  border: string;
  primary: string;
  primaryLight: string;
  primaryHighlight: string;
  danger: string;
  white: string;
};

export const lightColors: Colors = {
  background: "#F8FAFC",
  card: "#FFFFFF",
  text: "#1E293B",
  textSecondary: "#64748B",
  textMuted: "#94A3B8",
  border: "#F1F5F9",
  primary: "#047857",
  primaryLight: "#A7F3D0",
  primaryHighlight: "#ECFDF5",
  danger: "#EF4444",
  white: "#FFFFFF",
};

export const darkColors: Colors = {
  background: "#0F172A", // Deep Slate 900
  card: "#1E293B",       // Slate 800
  text: "#F8FAFC",       // Slate 50
  textSecondary: "#94A3B8", // Slate 400
  textMuted: "#64748B",     // Slate 500
  border: "#334155",        // Slate 700
  primary: "#047857",
  primaryLight: "#059669",
  primaryHighlight: "#022C22",
  danger: "#F87171",
  white: "#FFFFFF",
};

type ThemeContextType = {
  isDark: boolean;
  colors: Colors;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  const colors = isDark ? darkColors : lightColors;

  return (
    <ThemeContext.Provider value={{ isDark, colors, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
