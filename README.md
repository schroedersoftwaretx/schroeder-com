# schroeder-com

The Next.js site lives in **`blog/`** (not the repository root).

## Deploy on Vercel (avoids `404 NOT_FOUND`)

If the Vercel project root is the repo root, there is **no** `package.json` or Next app there, so the deployment may not serve your site and you can see **platform `NOT_FOUND`** (not your Next.js `not-found` page).

1. Open the project on [Vercel](https://vercel.com) → **Settings** → **General**.
2. Set **Root Directory** to **`blog`** (click Edit, choose the `blog` folder, save).
3. **Redeploy** the latest commit (**Deployments** → … → Redeploy).

Then open the deployment URL from the dashboard (**Visit**), or your assigned `*.vercel.app` hostname.

If **`https://<project>.vercel.app`** still shows **Vercel’s** `404 NOT_FOUND` (with a `cle1::…` id) even with Root Directory = `blog`:

1. **Deployments → Production** — Is there a **Ready** deployment? If every production build **Error**s, the production URL may not serve your app. Open **Build Logs** and fix the error.
2. **Settings → Git → Production Branch** — Must match the branch you push to (e.g. **`main`**). If Vercel watches **`master`** but you only use **`main`**, production never updates.
3. **Environment variables** — Do **not** set `NEXT_PUBLIC_SITE_URL` to an empty value. Leave it unset or set to a full URL (e.g. `https://schroeder-com.vercel.app` or your custom domain).

### Optional env

In **Settings → Environment Variables**, set `NEXT_PUBLIC_SITE_URL` to your production URL (no trailing slash), e.g. `https://your-domain.com` or `https://schroeder-com.vercel.app`.

Local development: see `blog/README.md`.
