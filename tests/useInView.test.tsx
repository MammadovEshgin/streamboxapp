import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useInView, type InViewOptions } from "@/hooks/useInView";
import { MockIntersectionObserver, setAllInView } from "./utils/intersectionObserver";

function Probe(options: InViewOptions) {
  const [ref, inView] = useInView<HTMLDivElement>(options);
  return <div ref={ref}>{inView ? "visible" : "hidden"}</div>;
}

describe("useInView", () => {
  it("follows the element in and out of the viewport", () => {
    render(<Probe />);
    expect(screen.getByText("hidden")).toBeInTheDocument();

    setAllInView(true);
    expect(screen.getByText("visible")).toBeInTheDocument();

    setAllInView(false);
    expect(screen.getByText("hidden")).toBeInTheDocument();
  });

  it("latches on the first intersection when `once` is set", () => {
    render(<Probe once />);

    setAllInView(true);
    setAllInView(false);

    expect(screen.getByText("visible")).toBeInTheDocument();
    expect(MockIntersectionObserver.instances[0]?.targets.size).toBe(0);
  });

  it("starts from `initialInView` so prerendered markup can animate immediately", () => {
    render(<Probe initialInView />);
    expect(screen.getByText("visible")).toBeInTheDocument();
  });

  it("passes the root margin through and disconnects on unmount", () => {
    const { unmount } = render(<Probe rootMargin="0px 0px -60px 0px" />);
    const [observer] = MockIntersectionObserver.instances;
    expect(observer?.rootMargin).toBe("0px 0px -60px 0px");
    expect(observer?.targets.size).toBe(1);

    unmount();

    expect(observer?.targets.size).toBe(0);
  });
});
