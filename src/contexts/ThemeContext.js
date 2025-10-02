import React, { createContext, useState, useEffect, useCallback } from 'react';

export const ThemeContext = createContext();

const THEME_KEY = 'agrichain-theme';
const THEMES = {
  LIGHT: 'light',
  DARK: 'dark'
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // Get theme from localStorage or system preference
    const savedTheme = localStorage.getItem(THEME_KEY);
    if (savedTheme) {
      return savedTheme;
    }

    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return THEMES.DARK;
    }

    return THEMES.LIGHT;
  });

  useEffect(() => {
    // Apply theme to document
    document.documentElement.setAttribute('data-theme', theme);
    
    // Save to localStorage
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  useEffect(() => {
    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e) => {
      // Only auto-switch if user hasn't manually set a preference
      const savedTheme = localStorage.getItem(THEME_KEY);
      if (!savedTheme) {
        setTheme(e.matches ? THEMES.DARK : THEMES.LIGHT);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(prevTheme => 
      prevTheme === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT
    );
  }, []);

  const setLightTheme = useCallback(() => {
    setTheme(THEMES.LIGHT);
  }, []);

  const setDarkTheme = useCallback(() => {
    setTheme(THEMES.DARK);
  }, []);

  const isDark = theme === THEMES.DARK;
  const isLight = theme === THEMES.LIGHT;

  const value = {
    theme,
    isDark,
    isLight,
    toggleTheme,
    setLightTheme,
    setDarkTheme
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};