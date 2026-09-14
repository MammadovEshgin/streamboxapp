import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import ScreenshotsSection from "@/components/ScreenshotsSection";
import { mockMatchMedia } from "./utils/matchMedia";

describe("ScreenshotsSection", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("plays the old panel out before showing the selected one", () => {
    vi.useFakeTimers();
    render(<ScreenshotsSection />);

    expect(screen.getByRole("tab", { name: "Discover" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Find your next binge.");

    const statsTab = screen.getByRole("tab", { name: "Stats" });
    fireEvent.click(statsTab);

    expect(statsTab).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tabpanel")).toHaveAttribute("data-state", "exit");
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Find your next binge.");

    act(() => {
      vi.runOnlyPendingTimers();
    });

    const panel = screen.getByRole("tabpanel");
    expect(panel).toHaveAttribute("data-state", "enter");
    expect(panel).toHaveTextContent("Five views into your viewer DNA.");
    expect(panel).toHaveAttribute("aria-labelledby", statsTab.id);
    expect(within(panel).getByRole("region", { name: "Stats" })).toBeInTheDocument();
    expect(within(panel).getAllByRole("group")).toHaveLength(5);
  });

  it("switches instantly when the user prefers reduced motion", () => {
    mockMatchMedia({ reducedMotion: true });
    render(<ScreenshotsSection />);

    fireEvent.click(screen.getByRole("tab", { name: "Movies" }));

    const panel = screen.getByRole("tabpanel");
    expect(panel).toHaveAttribute("data-state", "enter");
    expect(panel).toHaveTextContent("The full catalog, at a glance.");
  });

  it("wires every tab to the shared panel", () => {
    render(<ScreenshotsSection />);
    const panel = screen.getByRole("tabpanel");

    for (const tab of screen.getAllByRole("tab")) {
      expect(tab).toHaveAttribute("aria-controls", panel.id);
    }
  });
});
