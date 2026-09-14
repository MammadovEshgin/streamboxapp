/**
 * Rendering tiers.
 *
 * The stylesheet is authored lite-first: paint-heavy effects (backdrop blur, film grain,
 * depth-of-field blur, the pulsing hero glow) only apply under `html[data-perf="full"]`.
 * Transform and opacity animations run on the compositor thread and are kept in every tier.
 *
 * Capable devices are upgraded at startup. TVs, low-memory devices and data-saver users stay
 * lite, and a short frame-rate probe demotes anything that passes detection but still cannot
 * hold ~30 fps — e.g. a TV browser spoofing a desktop user agent.
 */
import { isTelevision, readDeviceSignals, type DeviceSignals } from "@/lib/device";

export type PerformanceTier = "full" | "lite";

const LOW_MEMORY_GIB = 2;
const LOW_CORE_COUNT = 2;

export function detectPerformanceTier(signals: DeviceSignals): PerformanceTier {
  const { deviceMemory, hardwareConcurrency, saveData } = signals;
  const isConstrained =
    isTelevision(signals) ||
    saveData === true ||
    (deviceMemory !== undefined && deviceMemory <= LOW_MEMORY_GIB) ||
    (hardwareConcurrency !== undefined && hardwareConcurrency <= LOW_CORE_COUNT);

  return isConstrained ? "lite" : "full";
}

/** `?perf=lite` or `?perf=full` pins a tier — useful when QA-ing on a real TV. */
export function readTierOverride(search: string): PerformanceTier | null {
  const value = new URLSearchParams(search).get("perf");
  return value === "full" || value === "lite" ? value : null;
}

/** Median frame interval (ms) above which a device is dropping below ~30 fps. */
export const FRAME_BUDGET_MS = 34;
const MIN_FRAME_SAMPLES = 3;

export function isFrameRateTooLow(
  frameIntervals: readonly number[],
  budgetMs = FRAME_BUDGET_MS
): boolean {
  if (frameIntervals.length < MIN_FRAME_SAMPLES) return false;

  const sorted = [...frameIntervals].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  const median =
    sorted.length % 2 === 0 ? (sorted[middle - 1] + sorted[middle]) / 2 : sorted[middle];

  return median > budgetMs;
}

export function applyPerformanceTier(tier: PerformanceTier, root: HTMLElement): void {
  root.dataset.perf = tier;
}

export const PROBE_DURATION_MS = 2000;

/** Samples `requestAnimationFrame` pacing and calls `onTooSlow` if the median frame blows the budget. */
export function startFrameRateProbe(
  onTooSlow: () => void,
  win: Window = window,
  durationMs = PROBE_DURATION_MS
): () => void {
  const intervals: number[] = [];
  let startedAt: number | undefined;
  let previous = 0;

  let frame = win.requestAnimationFrame(function sample(now) {
    if (startedAt === undefined) startedAt = now;
    else intervals.push(now - previous);
    previous = now;

    if (now - startedAt < durationMs) {
      frame = win.requestAnimationFrame(sample);
    } else if (isFrameRateTooLow(intervals)) {
      onTooSlow();
    }
  });

  return () => win.cancelAnimationFrame(frame);
}

/** Resolves the tier, tags `<html>` with it, and arms the probe when there is a tier to demote. */
export function initPerformanceTier(win: Window = window): PerformanceTier {
  const root = win.document.documentElement;
  const override = readTierOverride(win.location.search);
  const tier = override ?? detectPerformanceTier(readDeviceSignals(win));
  applyPerformanceTier(tier, root);

  if (override === null && tier === "full") {
    const probe = () => startFrameRateProbe(() => applyPerformanceTier("lite", root), win);
    if (win.document.readyState === "complete") probe();
    else win.addEventListener("load", probe, { once: true });
  }

  return tier;
}
