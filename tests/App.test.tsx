import { StrictMode } from "react";
import { hydrateRoot, type Root } from "react-dom/client";
import { act, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import App from "@/App";
import { APK_DOWNLOAD_URL, APK_SHA256 } from "@/content/release";
import { render as prerender } from "@/entry-server";

describe("App", () => {
  it("prerenders the whole landing page to static HTML", () => {
    const html = prerender();

    expect(html).toContain("Stream Movies.");
    expect(html).toContain('id="features"');
    expect(html).toContain('id="app-preview"');
    expect(html).toContain('id="download"');
    expect(html).toContain(APK_DOWNLOAD_URL);
  });

  it("hydrates the prerendered markup without mismatches", async () => {
    const container = document.createElement("div");
    container.innerHTML = prerender();
    document.body.append(container);

    const onRecoverableError = vi.fn();
    const consoleError = vi.spyOn(console, "error");
    let root: Root | undefined;

    await act(async () => {
      root = hydrateRoot(
        container,
        <StrictMode>
          <App />
        </StrictMode>,
        { onRecoverableError }
      );
      await Promise.resolve();
    });

    expect(onRecoverableError).not.toHaveBeenCalled();
    expect(consoleError).not.toHaveBeenCalled();

    act(() => root?.unmount());
    container.remove();
  });

  it("offers the latest APK together with its checksum", () => {
    render(<App />);

    expect(screen.getByRole("link", { name: "Download for Android" })).toHaveAttribute(
      "href",
      APK_DOWNLOAD_URL
    );
    expect(APK_DOWNLOAD_URL).toMatch(/\/releases\/latest\/download\/StreamBox\.apk$/);
    expect(APK_SHA256).toMatch(/^[a-f0-9]{64}$/);
    expect(screen.getByText(`sha256:${APK_SHA256}`)).toBeInTheDocument();
  });

  it("has a single h1 and a target for every in-page link", () => {
    render(<App />);

    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);

    const fragments = new Set(
      screen
        .getAllByRole("link")
        .map((link) => link.getAttribute("href") ?? "")
        .filter((href) => href.startsWith("#") && href !== "#top")
    );
    expect(fragments.size).toBeGreaterThan(0);
    for (const fragment of fragments) {
      expect(document.querySelector(fragment), fragment).not.toBeNull();
    }
  });
});
