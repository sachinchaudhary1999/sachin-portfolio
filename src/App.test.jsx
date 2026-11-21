import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import App from "./App";
import ThemeProvider from "./hooks/ThemeProvider";

const renderAt = (path = "/") =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </MemoryRouter>
  );

describe("portfolio", () => {
  it("renders the hero and every home section", async () => {
    renderAt();
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/MERN applications/i);
    for (const name of ["Projects", "Experience", "Skills", "GitHub", "Education", "Contact"]) {
      expect(screen.getByRole("heading", { level: 2, name })).toBeInTheDocument();
    }
    expect(await screen.findByText("public repositories")).toBeInTheDocument();
  });

  it("opens the command palette with Ctrl+K and navigates to a case study", async () => {
    const user = userEvent.setup();
    renderAt();
    await user.keyboard("{Control>}k{/Control}");
    const dialog = screen.getByRole("dialog", { name: /command palette/i });
    await user.type(within(dialog).getByRole("combobox"), "travel");
    await user.keyboard("{Enter}");
    expect(await screen.findByRole("heading", { level: 1, name: "TravelNest" })).toBeInTheDocument();
  });

  it("toggles the theme", async () => {
    const user = userEvent.setup();
    renderAt();
    const before = document.documentElement.classList.contains("dark");
    await user.click(screen.getByRole("button", { name: /switch to (light|dark) theme/i }));
    expect(document.documentElement.classList.contains("dark")).toBe(!before);
  });

  it("validates the contact form before sending", async () => {
    const user = userEvent.setup();
    renderAt();
    await user.click(screen.getByRole("button", { name: /send message/i }));
    expect(screen.getByText(/valid email address/i)).toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveTextContent(/fix the highlighted fields/i);
  });

  it("redirects legacy numeric project URLs and handles unknown ones", async () => {
    renderAt("/projects/1");
    expect(await screen.findByRole("heading", { level: 1, name: "BiteRush" })).toBeInTheDocument();
  });

  it("shows a helpful message for an unknown project", async () => {
    renderAt("/projects/does-not-exist");
    expect(await screen.findByRole("heading", { level: 1, name: /project not found/i })).toBeInTheDocument();
  });

  it("selecting a diagram node updates the detail panel", async () => {
    const user = userEvent.setup();
    renderAt();
    await user.click(screen.getByRole("button", { name: /^MongoDB:/ }));
    expect(screen.getByText(/Models for users, listings, orders/i)).toBeInTheDocument();
  });
});
