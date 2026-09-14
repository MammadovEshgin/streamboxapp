import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import App from "@/App";

/** Renders the landing page to static HTML at build time (see scripts/prerender.mjs). */
export function render(): string {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
