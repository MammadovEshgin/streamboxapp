import "@fontsource-variable/inter";
import "@fontsource-variable/space-grotesk";
import "./index.css";

import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import App from "@/App";
import { initDeviceType } from "@/lib/device";
import { initPerformanceTier } from "@/lib/performance";

initDeviceType();
initPerformanceTier();

const container = document.getElementById("root");
if (!container) throw new Error("index.html is missing the #root element");

const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

// Production HTML is prerendered by scripts/prerender.mjs; the dev server serves an empty root.
if (container.firstElementChild) hydrateRoot(container, app);
else createRoot(container).render(app);
