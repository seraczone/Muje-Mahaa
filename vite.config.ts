import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(() => {
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
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
      dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime", "@tanstack/react-query", "@tanstack/query-core"],
    },
  };
});
