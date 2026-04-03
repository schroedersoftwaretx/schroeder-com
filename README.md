# schrodersoftware.com

Personal site: portfolio, resume, and blog (Next.js App Router, MDX, Tailwind).
Based off of a vercel template I found here: https://github.com/vercel/examples/tree/main/solutions/blog

## Local development

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production URL

Canonical site URL and metadata use `NEXT_PUBLIC_SITE_URL` when set (no trailing slash). The default in `app/site.ts` is **`https://schrodersoftware.com`**.

## Build

The app uses **`output: 'export'`** so `pnpm build` writes a static site to **`out/`** (includes **`out/index.html`**) for hosts like **Hostinger** that expect static files.

```bash
pnpm build
```

- **Preview the static output locally:** `npx serve out` (or any static file server pointed at `out/`).
- **`pnpm start`** is for running the Node server in non-export mode; with static export, deploy **`out/`** or use `serve` as above.

## Hostinger (or any static host)

1. Run `pnpm build` on your machine (or in CI).
2. Upload **everything inside** the **`out/`** folder into your hosting **document root** (often `public_html`). You should see **`index.html`** at the root of what you upload.
3. Set **`NEXT_PUBLIC_SITE_URL`** to your live URL before building so RSS, sitemap, and metadata use the correct domain (or edit `app/site.ts` / `scripts/generate-rss.mjs` defaults).

RSS is generated as **`public/rss.xml`** during **`prebuild`** and copied into **`out/rss.xml`**.

## Vercel

Use the **repository root** as the project root (leave **Root Directory** empty or set to `.`). Install: **`pnpm install`**, build: **`pnpm build`**. With `output: 'export'`, set **Output Directory** to **`out`** if the dashboard asks for it.
