import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isPagesBuild = process.env.GITHUB_ACTIONS === "true" || process.env.DEPLOY_TARGET === "github-pages";
  const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "apc-muje-maha";

  return {
    base: isPagesBuild ? `/${repositoryName}/` : "/",
    server: {
      host: "::",
      port: 8080,
      hmr: {
        overlay: false,
      },
    },
    plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
      dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime", "@tanstack/react-query", "@tanstack/query-core"],
    },
  };
});
