# Deploying StreamBox to Cloudflare Pages

## Why Cloudflare Pages

- **Unmetered bandwidth** on free tier (Vercel/Netlify cap at 100 GB/mo)
- Free Universal SSL on custom domains
- 500 builds/month — plenty for this site
- Global edge network with strong MENA presence

## One-time setup

### 1. Push the new code

```bash
git add -A
git commit -m "Refresh design system, drop iOS, optimize images"
git push origin main
```

### 2. Create the Pages project

1. Open https://dash.cloudflare.com → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
2. Pick the `streamboxapp` repo, branch **main**.
3. Build settings:
   - **Framework preset:** Vite
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Root directory:** *(leave empty)*
   - **Node version (env var):** `NODE_VERSION = 20`
   - **NPM_FLAGS:** `--legacy-peer-deps`
4. Save and deploy. First build takes ~2 min.

The site will be live at `https://streamboxapp.pages.dev` while you set up the custom domain.

### 3. Attach `streamboxapp.stream`

In your Pages project → **Custom domains** → **Set up a custom domain** → enter `streamboxapp.stream`.

Cloudflare will give you one of two paths:

- **If the domain is already on Cloudflare:** DNS records are auto-created. Done.
- **If the domain is at another registrar:** Either
  - **(Recommended)** change nameservers to the two Cloudflare nameservers shown, OR
  - Add these records at your registrar:
    - `CNAME @ streamboxapp.pages.dev`
    - `CNAME www streamboxapp.pages.dev`

SSL provisions automatically within a few minutes.

### 4. Verify

- `https://streamboxapp.stream` resolves and shows HTTPS lock.
- `https://www.streamboxapp.stream` redirects to apex (configure in Cloudflare → Rules → Redirect Rules if needed).

## Headers and SPA routing

- `public/_headers` sets immutable cache for hashed assets and basic security headers.
- `public/_redirects` makes deep links work (single-page app catch-all).

## CI

`.github/workflows/ci.yml` runs typecheck, tests, and build on every PR. Cloudflare Pages does its own deploy build — these CI checks are an early signal before the deploy build runs.
