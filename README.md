# APC Muje Maha

Public website for the Muje Maha Support Group, built as a Vite + React + TypeScript single-page application.

## Overview

The site presents the movement's message, leadership, achievements, objectives, gallery, supporter registration flow, donation details, and contact information.

It also includes a browser-based admin console at `/admin` for managing public-facing content. At the moment, the admin console stores content in browser `localStorage`, so changes are local to the current browser unless a backend is added later.

## Stack

- React 18
- TypeScript
- Vite
- React Router
- Tailwind CSS
- Framer Motion
- shadcn/ui components

## Local development

### Requirements

- Node.js 20 or newer
- npm

### Run locally

```bash
npm install
npm run dev
```

The local dev server runs on `http://localhost:8080`.

### Production build

```bash
npm run build
```

### Tests

```bash
npm run test
```

## Content management

- Public admin link is intentionally hidden from the navbar and footer.
- The admin console remains accessible directly by URL at `/admin`.
- Changes in the admin console require `Save Changes` and are stored in browser `localStorage`.

## GitHub Pages deployment

This repository is configured for GitHub Pages deployment through GitHub Actions.

### What is included

- Vite base-path handling for the repository name
- SPA route fallback for React Router on GitHub Pages
- Automated deploy workflow at `.github/workflows/deploy.yml`

### Expected site URL

After GitHub Pages is enabled for Actions, the deployed site URL should be:

`https://seraczone.github.io/apc-muje-maha/`

### GitHub setup required

In the GitHub repository:

1. Open `Settings`.
2. Open `Pages`.
3. Under `Build and deployment`, set `Source` to `GitHub Actions`.

After that, every push to `main` will trigger a fresh deployment.

## Repository hygiene

This repository includes:

- `.gitignore` tuned for Node/Vite output and local environment files
- `.gitattributes` to keep line endings and binary assets consistent
- no committed `node_modules` or `dist` output

## Notes

- If you want shared admin storage, authentication, or production form persistence, the next step is adding a backend such as Supabase.
