import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useExitTransition } from "@/hooks/useExitTransition";

describe("useExitTransition", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  const setup = (exitMs: number) =>
    renderHook(({ value }) => useExitTransition(value, exitMs), { initialProps: { value: "a" } });

  it("keeps the previous value mounted until its exit finishes", () => {
    const { result, rerender } = setup(350);
    expect(result.current).toEqual({ current: "a", isExiting: false });

    rerender({ value: "b" });
    expect(result.current).toEqual({ current: "a", isExiting: true });

    act(() => {
      vi.advanceTimersByTime(349);
    });
    expect(result.current.current).toBe("a");

    act(() => {
      vi.advanceTimersByTime(1);
    });
    expect(result.current).toEqual({ current: "b", isExiting: false });
  });

  it("lands on the latest value when it changes mid-exit", () => {
    const { result, rerender } = setup(350);

    rerender({ value: "b" });
    act(() => {
      vi.advanceTimersByTime(200);
    });
    rerender({ value: "c" });
    act(() => {
      vi.advanceTimersByTime(350);
    });

    expect(result.current).toEqual({ current: "c", isExiting: false });
  });

  it("swaps immediately when there is no exit to play", () => {
    const { result, rerender } = setup(0);

    rerender({ value: "b" });

    expect(result.current).toEqual({ current: "b", isExiting: false });
  });
});
