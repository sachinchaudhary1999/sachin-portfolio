// Scroll to a section on the home page, or navigate home first if we're elsewhere.
export function goToSection(navigate, pathname, id) {
  if (pathname === "/") {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    window.history.replaceState(null, "", `/#${id}`);
  } else {
    navigate(`/#${id}`);
  }
}

export const isMac = () =>
  typeof navigator !== "undefined" && /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);
