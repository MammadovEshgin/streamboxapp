import { afterEach, describe, expect, it, vi } from "vitest";
import {
  FRAME_BUDGET_MS,
  PROBE_DURATION_MS,
  detectPerformanceTier,
  initPerformanceTier,
  isFrameRateTooLow,
  readTierOverride,
  startFrameRateProbe,
} from "@/lib/performance";

const DESKTOP_CHROME =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36";
const ANDROID_PHONE =
  "Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Mobile Safari/537.36";

describe("detectPerformanceTier", () => {
  it.each([
    [
      "Google TV Streamer",
      "Mozilla/5.0 (Linux; Android 14; Google TV Streamer Build/UTT3.240625.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/126.0.6478.188 Mobile Safari/537.36",
    ],
    [
      "NVIDIA Shield",
      "Mozilla/5.0 (Linux; Android 11; SHIELD Android TV Build/RQ1A.210105.003; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/120.0.6099.230 Mobile Safari/537.36",
    ],
    [
      "Fire TV",
      "Mozilla/5.0 (Linux; Android 9; AFTKA Build/PS7633; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/113.0.5672.162 Mobile Safari/537.36",
    ],
    [
      "Sony Bravia",
      "Mozilla/5.0 (Linux; Android 10; BRAVIA 4K VH2 Build/QTG3.200305.006; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/110.0.5481.153 Mobile Safari/537.36",
    ],
    [
      "Xiaomi Mi TV",
      "Mozilla/5.0 (Linux; Android 9; MiTV-MSSP2 Build/PTT1.190826.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/96.0.4664.104 Mobile Safari/537.36",
    ],
    [
      "Samsung Tizen",
      "Mozilla/5.0 (SMART-TV; LINUX; Tizen 6.5) AppleWebKit/537.36 (KHTML, like Gecko) 85.0.4183.93/6.5 TV Safari/537.36",
    ],
    [
      "LG webOS",
      "Mozilla/5.0 (Web0S; Linux/SmartTV) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.128 Safari/537.36 WebAppManager",
    ],
  ])("keeps %s on the lite tier", (_device, userAgent) => {
    expect(detectPerformanceTier({ userAgent })).toBe("lite");
  });

  it.each([
    ["a desktop browser", DESKTOP_CHROME],
    ["a modern phone", ANDROID_PHONE],
  ])("upgrades %s to the full tier", (_device, userAgent) => {
    expect(detectPerformanceTier({ userAgent, deviceMemory: 8, hardwareConcurrency: 8 })).toBe(
      "full"
    );
  });

  it.each([
    ["low device memory", { deviceMemory: 2 }],
    ["a dual-core CPU", { hardwareConcurrency: 2 }],
    ["data saver", { saveData: true }],
    ["no pointing device (D-pad only)", { hasNoPointer: true }],
  ])("demotes a device with %s", (_reason, signals) => {
    expect(detectPerformanceTier({ userAgent: DESKTOP_CHROME, ...signals })).toBe("lite");
  });

  it("treats missing optional signals as capable", () => {
    expect(detectPerformanceTier({ userAgent: DESKTOP_CHROME })).toBe("full");
  });
});

describe("readTierOverride", () => {
  it.each([
    ["?perf=lite", "lite"],
    ["?perf=full", "full"],
    ["?utm_source=tv&perf=lite", "lite"],
    ["?perf=turbo", null],
    ["", null],
  ])("reads %j as %j", (search, expected) => {
    expect(readTierOverride(search)).toBe(expected);
  });
});

describe("isFrameRateTooLow", () => {
  const frames = (count: number, intervalMs: number) => Array<number>(count).fill(intervalMs);

  it("accepts a steady 60 fps", () => {
    expect(isFrameRateTooLow(frames(120, 16.7))).toBe(false);
  });

  it("flags a device stuck below 30 fps", () => {
    expect(isFrameRateTooLow(frames(40, 50))).toBe(true);
  });

  it("ignores a single long hydration frame", () => {
    expect(isFrameRateTooLow([400, ...frames(100, 16.7)])).toBe(false);
  });

  it("does not decide on too few samples", () => {
    expect(isFrameRateTooLow([500, 500])).toBe(false);
  });

  it("compares the median against the budget", () => {
    expect(isFrameRateTooLow(frames(10, FRAME_BUDGET_MS))).toBe(false);
    expect(isFrameRateTooLow(frames(10, FRAME_BUDGET_MS + 1))).toBe(true);
  });
});

describe("startFrameRateProbe", () => {
  function createFrameClock(intervalMs: number) {
    let now = 0;
    let nextId = 0;
    const pending = new Map<number, FrameRequestCallback>();

    const win = {
      requestAnimationFrame: (callback: FrameRequestCallback) => {
        pending.set(++nextId, callback);
        return nextId;
      },
      cancelAnimationFrame: (id: number) => pending.delete(id),
    } as unknown as Window;

    const runFor = (durationMs: number) => {
      const end = now + durationMs;
      while (now <= end && pending.size > 0) {
        const callbacks = [...pending.values()];
        pending.clear();
        now += intervalMs;
        for (const callback of callbacks) callback(now);
      }
    };

    return { win, runFor };
  }

  it("reports a device that cannot keep up", () => {
    const clock = createFrameClock(60);
    const onTooSlow = vi.fn();
    startFrameRateProbe(onTooSlow, clock.win);

    clock.runFor(PROBE_DURATION_MS + 500);

    expect(onTooSlow).toHaveBeenCalledOnce();
  });

  it("stays quiet on a smooth device", () => {
    const clock = createFrameClock(16);
    const onTooSlow = vi.fn();
    startFrameRateProbe(onTooSlow, clock.win);

    clock.runFor(PROBE_DURATION_MS + 500);

    expect(onTooSlow).not.toHaveBeenCalled();
  });

  it("can be cancelled before it decides", () => {
    const clock = createFrameClock(60);
    const onTooSlow = vi.fn();
    const cancel = startFrameRateProbe(onTooSlow, clock.win);

    clock.runFor(500);
    cancel();
    clock.runFor(PROBE_DURATION_MS);

    expect(onTooSlow).not.toHaveBeenCalled();
  });
});

describe("initPerformanceTier", () => {
  afterEach(() => {
    delete document.documentElement.dataset.perf;
    window.history.replaceState(null, "", "/");
  });

  it("tags <html> and arms the frame-rate probe on capable devices", () => {
    const requestFrame = vi.spyOn(window, "requestAnimationFrame").mockReturnValue(1);
    vi.spyOn(navigator, "hardwareConcurrency", "get").mockReturnValue(8);

    expect(initPerformanceTier()).toBe("full");
    expect(document.documentElement.dataset.perf).toBe("full");
    expect(requestFrame).toHaveBeenCalled();
  });

  it("honours a ?perf override without probing", () => {
    const requestFrame = vi.spyOn(window, "requestAnimationFrame").mockReturnValue(1);
    window.history.replaceState(null, "", "/?perf=lite");

    expect(initPerformanceTier()).toBe("lite");
    expect(document.documentElement.dataset.perf).toBe("lite");
    expect(requestFrame).not.toHaveBeenCalled();
  });
});
