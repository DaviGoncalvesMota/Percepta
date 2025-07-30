/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useEffect, useState } from "react";

type ThemeContextType = {
  themeMode: "dark" | "light";
  setThemeMode: React.Dispatch<React.SetStateAction<"dark" | "light">>;
};

export const ThemeContext = createContext<ThemeContextType>({
  themeMode: "light",
  setThemeMode: () => {},
});

export const ThemeContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const getInitialTheme = (): "light" | "dark" => {
    const storedTheme = localStorage.getItem("themeMode");
    return storedTheme === "dark" ? "dark" : "light";
  };

  const [themeMode, setThemeMode] = useState<"dark" | "light">(getInitialTheme);

  useEffect(() => {
    localStorage.setItem("themeMode", themeMode);
  }, [themeMode]);

  return (
    <ThemeContext.Provider value={{ themeMode, setThemeMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
