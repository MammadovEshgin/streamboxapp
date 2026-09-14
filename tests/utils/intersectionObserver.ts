import { act } from "@testing-library/react";
import { vi } from "vitest";

/** Controllable stand-in for `IntersectionObserver`: tests decide what is on screen. */
export class MockIntersectionObserver {
  static instances: MockIntersectionObserver[] = [];

  readonly targets = new Set<Element>();
  readonly rootMargin: string;
  readonly #callback: IntersectionObserverCallback;

  constructor(callback: IntersectionObserverCallback, options: IntersectionObserverInit = {}) {
    this.#callback = callback;
    this.rootMargin = options.rootMargin ?? "0px";
    MockIntersectionObserver.instances.push(this);
  }

  observe(target: Element) {
    this.targets.add(target);
  }

  unobserve(target: Element) {
    this.targets.delete(target);
  }

  disconnect() {
    this.targets.clear();
  }

  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }

  trigger(isIntersecting: boolean) {
    const entries = [...this.targets].map((target): IntersectionObserverEntry => ({
      target,
      isIntersecting,
      intersectionRatio: isIntersecting ? 1 : 0,
      time: performance.now(),
      rootBounds: null,
      boundingClientRect: target.getBoundingClientRect(),
      intersectionRect: target.getBoundingClientRect(),
    }));
    if (entries.length > 0) this.#callback(entries, this as unknown as IntersectionObserver);
  }
}

export function installIntersectionObserver() {
  MockIntersectionObserver.instances = [];
  vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);
}

/** Reports every observed element as entering (or leaving) the viewport. */
export function setAllInView(isIntersecting: boolean) {
  act(() => {
    for (const observer of MockIntersectionObserver.instances) observer.trigger(isIntersecting);
  });
}
