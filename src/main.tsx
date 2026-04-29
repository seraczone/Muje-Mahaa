import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import heroUrl from "@/assets/hero.jpg?url";
import logoUrl from "@/assets/apc-logo.png?url";

// Preload only the LCP hero image and the brand logo. All other imagery
// (gallery, leadership portraits, founder, footer) loads lazily.
const preload = (href: string, as: "image", type?: string) => {
  const link = document.createElement("link");
  link.rel = "preload";
  link.as = as;
  link.href = href;
  if (type) link.type = type;
  link.fetchPriority = "high";
  document.head.appendChild(link);
};

preload(heroUrl, "image", "image/jpeg");
preload(logoUrl, "image", "image/png");

createRoot(document.getElementById("root")!).render(<App />);
