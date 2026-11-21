import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import ThemeProvider from "./hooks/ThemeProvider";
import "./index.css";
import App from "./App.jsx";

const rootEl = document.getElementById("root");
// Replace the prerendered HTML (kept for crawlers) with the interactive app.
rootEl.removeAttribute("data-prerendered");
rootEl.replaceChildren();

createRoot(rootEl).render(
  <BrowserRouter>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </BrowserRouter>
);
