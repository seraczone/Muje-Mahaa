import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import heroUrl from "@/assets/hero.jpg?url";
import logoUrl from "@/assets/apc-logo.jpg?url";

// Preload the brand logo on every page. The hero image is only critical on
// the home route, so avoid preloading it for every page load.
const preload = (href: string, as: "image", type?: string) => {
  const link = document.createElement("link");
  link.rel = "preload";
  link.as = as;
  link.href = href;
  if (type) link.type = type;
  link.fetchPriority = "high";
  document.head.appendChild(link);
};

if (window.location.pathname === "/") {
  preload(heroUrl, "image", "image/jpeg");
}

preload(logoUrl, "image", "image/jpeg");

createRoot(document.getElementById("root")!).render(<App />);
