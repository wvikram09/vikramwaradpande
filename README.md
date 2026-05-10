# Personal Website

Single-page personal site, Next.js 16 + Tailwind v4, deploys to Vercel.

## Develop

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

> Requires Node 20.9+ (the project is on Next.js 16). If you use nvm: `nvm use 24`.

## Build

```bash
npm run build
npm start
```

## Deploy

Push the repo to GitHub and import it at https://vercel.com/new — Next.js is auto-detected. The first deploy lands on `<repo-name>.vercel.app`. Add a custom domain later from the Vercel dashboard.

## Edit content

All content lives in `app/page.tsx`. Update the `roles`, `talks`, and `projects` arrays and redeploy.

- Headshot: `public/headshot.jpg`
- Resume: `public/resume.pdf`
- Theme tokens (light/dark colors): `app/globals.css`
- Favicon: `app/icon.tsx`
