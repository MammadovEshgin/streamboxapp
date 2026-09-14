import { vi } from "vitest";

export interface MediaFeatures {
  reducedMotion?: boolean;
  noPointer?: boolean;
}

export function mockMatchMedia({ reducedMotion = false, noPointer = false }: MediaFeatures = {}) {
  const matches = (query: string) =>
    (reducedMotion && query.includes("prefers-reduced-motion: reduce")) ||
    (noPointer && query.includes("any-pointer: none"));

  vi.stubGlobal("matchMedia", (query: string): MediaQueryList => ({
    matches: matches(query),
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(() => false),
  }));
}
