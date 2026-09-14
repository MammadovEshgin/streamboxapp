import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, beforeEach } from "vitest";
import { installIntersectionObserver } from "./utils/intersectionObserver";
import { mockMatchMedia } from "./utils/matchMedia";

// jsdom implements neither API; both are re-installed per test (globals unstub automatically).
beforeEach(() => {
  mockMatchMedia();
  installIntersectionObserver();
});

afterEach(() => {
  cleanup();
});
