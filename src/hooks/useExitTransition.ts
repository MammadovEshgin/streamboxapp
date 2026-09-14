import { useEffect, useState } from "react";

export interface ExitTransition<T> {
  /** The value to render — lags `value` by `exitMs` while the old one animates out. */
  current: T;
  isExiting: boolean;
}

/**
 * Keeps the previous value mounted for `exitMs` so it can play an exit animation before
 * the next one enters. A dependency-free replacement for `<AnimatePresence mode="wait">`.
 */
export function useExitTransition<T>(value: T, exitMs: number): ExitTransition<T> {
  const [current, setCurrent] = useState(value);
  const skipExit = exitMs <= 0;

  // With no exit to play, follow `value` directly (state adjustment during render).
  if (skipExit && !Object.is(current, value)) setCurrent(value);

  useEffect(() => {
    if (skipExit || Object.is(current, value)) return;
    const timer = window.setTimeout(() => setCurrent(value), exitMs);
    return () => window.clearTimeout(timer);
  }, [current, value, exitMs, skipExit]);

  if (skipExit) return { current: value, isExiting: false };
  return { current, isExiting: !Object.is(current, value) };
}
