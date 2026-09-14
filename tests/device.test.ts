import { afterEach, describe, expect, it, vi } from "vitest";
import { initDeviceType, isTelevision } from "@/lib/device";
import { mockMatchMedia } from "./utils/matchMedia";

const BRAVIA_TV =
  "Mozilla/5.0 (Linux; Android 12; BRAVIA 4K VH22 Build/STT1.211025.001.Z4; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/120.0.6099.230 Mobile Safari/537.36";
const DESKTOP_CHROME =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36";
const ANDROID_PHONE =
  "Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Mobile Safari/537.36";

describe("isTelevision", () => {
  it("recognises a TV user agent", () => {
    expect(isTelevision({ userAgent: BRAVIA_TV })).toBe(true);
  });

  it("recognises a D-pad-only device even behind a desktop user agent", () => {
    expect(isTelevision({ userAgent: DESKTOP_CHROME, hasNoPointer: true })).toBe(true);
  });

  it.each([
    ["desktop browser", DESKTOP_CHROME],
    ["phone", ANDROID_PHONE],
  ])("does not treat a %s as a TV", (_device, userAgent) => {
    expect(isTelevision({ userAgent, hasNoPointer: false })).toBe(false);
  });
});

describe("initDeviceType", () => {
  afterEach(() => {
    delete document.documentElement.dataset.device;
  });

  it("marks <html> on a TV so the layout keeps to the title-safe area", () => {
    vi.spyOn(navigator, "userAgent", "get").mockReturnValue(BRAVIA_TV);

    expect(initDeviceType()).toBe(true);
    expect(document.documentElement.dataset.device).toBe("tv");
  });

  it("marks a device whose only input is a remote", () => {
    vi.spyOn(navigator, "userAgent", "get").mockReturnValue(DESKTOP_CHROME);
    mockMatchMedia({ noPointer: true });

    expect(initDeviceType()).toBe(true);
    expect(document.documentElement.dataset.device).toBe("tv");
  });

  it("leaves other devices untouched", () => {
    vi.spyOn(navigator, "userAgent", "get").mockReturnValue(DESKTOP_CHROME);

    expect(initDeviceType()).toBe(false);
    expect(document.documentElement.dataset.device).toBeUndefined();
  });
});
