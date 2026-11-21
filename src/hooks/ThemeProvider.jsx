import { useCallback, useEffect, useMemo, useState } from "react";
import { ThemeContext } from "./useTheme";

export default function ThemeProvider({ children }) {
  // The inline script in index.html has already applied the right class before first paint.
  const [theme, setTheme] = useState(() =>
    typeof document !== "undefined" && !document.documentElement.classList.contains("dark") ? "light" : "dark"
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.style.colorScheme = theme;
    try {
      localStorage.setItem("theme", theme);
    } catch {
      /* storage can be unavailable (private mode) */
    }
  }, [theme]);

  const toggle = useCallback(() => setTheme((t) => (t === "dark" ? "light" : "dark")), []);
  const value = useMemo(() => ({ theme, toggle }), [theme, toggle]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
