import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Navbar from "@/components/Navbar";

describe("Navbar", () => {
  it("keeps the mobile menu inert until it is opened, and closes it after navigation", () => {
    render(<Navbar />);
    const toggle = screen.getByRole("button", { name: "Open menu" });
    const menu = document.getElementById(toggle.getAttribute("aria-controls") ?? "");
    if (!menu) throw new Error("toggle does not control a menu");

    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(menu).toHaveAttribute("inert");

    fireEvent.click(toggle);

    expect(screen.getByRole("button", { name: "Close menu" })).toHaveAttribute(
      "aria-expanded",
      "true"
    );
    expect(menu).not.toHaveAttribute("inert");
    expect(menu).toHaveAttribute("data-open");

    fireEvent.click(within(menu).getByRole("link", { name: "Features" }));

    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(menu).toHaveAttribute("inert");
  });

  it("navigates with native anchors, so it works before hydration and with a D-pad", () => {
    render(<Navbar />);
    const primaryNav = screen.getByRole("navigation", { name: "Primary" });

    expect(within(primaryNav).getByRole("link", { name: "Features" })).toHaveAttribute(
      "href",
      "#features"
    );
    expect(within(primaryNav).getByRole("link", { name: "App Preview" })).toHaveAttribute(
      "href",
      "#app-preview"
    );
    expect(within(primaryNav).getByRole("link", { name: "Get the App" })).toHaveAttribute(
      "href",
      "#download"
    );
  });
});
