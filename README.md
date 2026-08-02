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

## Deployment

> ⚠️ **The repo config and production do not currently agree.** Worth resolving before the next deploy.

**What production is actually doing** (observed against `https://schroedersoftware.com`):

- `Server: LiteSpeed`, `platform: hostinger` — Hostinger, as expected.
- `X-Powered-By: Next.js`, `x-nextjs-cache: HIT`, `x-nextjs-prerender: 1`, and a request with `RSC: 1` returns `text/x-component` — **a Next.js server process is running.**
- `/blog/rag-chatbot.html` returns **404** — the static `out/` tree is *not* what is being served.

**What this repo is configured for:** `next.config.ts` sets `output: 'export'`, which produces a static `out/` directory and is incompatible with `next start`.

So the deployed build was made from a different configuration than the one in this repo. Two ways to make them consistent — pick whichever matches how the Hostinger app is actually set up:

1. **Keep the Node server.** Remove `output: 'export'` from `next.config.ts` and deploy with `pnpm build && pnpm start`. You keep ISR and proper Content-Types; `scripts/fix-og-images.mjs` becomes unnecessary (harmless, but it only rewrites `out/`).
2. **Go fully static.** Keep `output: 'export'` and upload everything inside `out/` to the document root (usually `public_html`), so `index.html` sits at the root. Then the OG postbuild step *is* required — see below.

Either way, set **`NEXT_PUBLIC_SITE_URL`** to the live URL before building so RSS, sitemap, and metadata use the right domain (or edit the `app/site.ts` / `scripts/generate-rss.mjs` defaults).

RSS is generated as **`public/rss.xml`** during **`prebuild`** and copied into **`out/rss.xml`**.

### Open Graph images

Each post gets a social card generated at build time from `app/blog/[slug]/opengraph-image.tsx`.

Next's metadata convention emits these **without a file extension** (`out/blog/<slug>/opengraph-image`). That is fine on Vercel, which sets the Content-Type itself, but on a static host Apache and nginx serve an unknown extension as `application/octet-stream` — and the Facebook, LinkedIn, and X crawlers all reject a non-image Content-Type, so the card silently fails to render.

`postbuild` therefore runs `scripts/fix-og-images.mjs`, which renames the files to `.png` and repoints every reference in `out/`. It only touches `out/`, so under deployment option 1 above (Node server) it is inert — Next sets the Content-Type itself there. Under option 2 (static upload) it is required.

## CI

`.github/workflows/ci.yml` typechecks and builds on every push and PR. Because `app/blog/utils.ts` throws on malformed frontmatter, a broken post fails CI rather than reaching production. The built `out/` is uploaded as a workflow artifact.

## Analytics

The site currently ships with **no analytics**. The Vercel Analytics and Speed Insights packages were removed, since they only collect data when the site is hosted on Vercel.

If you want analytics back on a static Hostinger deploy, each of these is a single `<script>` tag in `app/layout.tsx` and works fine with `output: 'export'`:

- **[Plausible](https://plausible.io)** — paid hosted, cookie-free, no consent banner needed. Self-hostable.
- **[Umami](https://umami.is)** — open source, free hosted tier, self-hostable on your own box.
- **[GoatCounter](https://www.goatcounter.com)** — free for non-commercial use, very lightweight.

Hostinger also exposes raw server access logs in hPanel, which covers basic traffic counts without adding any client-side script.
