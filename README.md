# schroedersoftware.com

Personal site: portfolio, resume, and blog (Next.js App Router, MDX, Tailwind).
Based off of a vercel template I found here: https://github.com/vercel/examples/tree/main/solutions/blog

## Local development

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production URL

Canonical site URL and metadata use `NEXT_PUBLIC_SITE_URL` when set (no trailing slash). The default in `app/site.ts` is **`https://schroedersoftware.com`**.

## Build

The app uses **`output: 'export'`** so `pnpm build` writes a static site to **`out/`** (includes **`out/index.html`**) for hosts like **Hostinger** that expect static files.

```bash
pnpm build
```

- **Preview the static output locally:** `npx serve out` (or any static file server pointed at `out/`).
- **`pnpm start`** is for running the Node server in non-export mode; with static export, deploy **`out/`** or use `serve` as above.

## Hostinger (or any static host)

1. Run `pnpm build` on your machine.
2. Upload **everything inside** the **`out/`** folder into your hosting **document root** (often `public_html`). You should see **`index.html`** at the root of what you upload.
3. Set **`NEXT_PUBLIC_SITE_URL`** to your live URL before building so RSS, sitemap, and metadata use the correct domain (or edit `app/site.ts` / `scripts/generate-rss.mjs` defaults).

RSS is generated as **`public/rss.xml`** during **`prebuild`** and copied into **`out/rss.xml`**.

## Analytics

The site currently ships with **no analytics**. The Vercel Analytics and Speed Insights packages were removed, since they only collect data when the site is hosted on Vercel.

If you want analytics back on a static Hostinger deploy, each of these is a single `<script>` tag in `app/layout.tsx` and works fine with `output: 'export'`:

- **[Plausible](https://plausible.io)** — paid hosted, cookie-free, no consent banner needed. Self-hostable.
- **[Umami](https://umami.is)** — open source, free hosted tier, self-hostable on your own box.
- **[GoatCounter](https://www.goatcounter.com)** — free for non-commercial use, very lightweight.

Hostinger also exposes raw server access logs in hPanel, which covers basic traffic counts without adding any client-side script.
