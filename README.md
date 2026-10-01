# KROMA Spatial — Monograph 2026

A responsive single-page architecture monograph built with React 18, Vite, Tailwind CSS, Framer Motion, and Lucide React.

## Deploy to Vercel

This project is configured for Vercel in `vercel.json`:

- Install: `npm ci`
- Build: `npm run build`
- Output: `dist`
- Environment variables: none

Unzip the project, then deploy the extracted folder with the Vercel CLI (`npx vercel`) or connect its Git repository to Vercel. The Vercel project can use the defaults from `vercel.json`.

## Run locally

```bash
npm ci
npm run dev
```

Create a production build with `npm run build` and serve it locally with `npm run preview`.

## Included interactions

- Live Zurich and Kyoto studio clocks, responsive navigation, and smooth in-page links.
- Physical / wireframe hero toggle and filtered project index with technical record drawers.
- Selectable material specimens with provenance and thermal-mass data.
- Commission intake with typology, scale, investment, and brief fields, followed by the requested dossier verification state.
- Three-page studio manifesto PDF at `public/kroma-manifesto.pdf`.

The site uses the supplied Unsplash image URLs and Google Fonts import. Image containers keep dark, fixed-ratio skeletons while assets load; those external assets need a network connection.
