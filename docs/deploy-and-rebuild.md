# Deploy, environment variables and publish-to-rebuild

## 1. Environment variables

Set these in the hosting project (Vercel → Project → Settings → Environment Variables) and, for the seed, in GitHub → Settings → Secrets and variables → Actions. Never commit real values; `.env.example` lists them.

| Variable | Where | Secret? | Purpose |
|---|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Vercel | no | `https://alphahardscapes.com` (canonical URLs, sitemap, Open Graph) |
| `NEXT_PUBLIC_ALPHA_SANITY_PROJECT_ID` | Vercel + GitHub | no | The Alpha Hardscapes Sanity project ID. Without it the site builds from the built-in content. |
| `NEXT_PUBLIC_ALPHA_SANITY_DATASET` | Vercel + GitHub | no | Usually `production` |
| `SANITY_READ_TOKEN` | Vercel | yes | Optional. Only needed if the dataset is private. A **Viewer** token. |
| `SANITY_API_TOKEN` | GitHub secret (or local shell) | **yes** | **Seed only.** An **Editor** token used by `npm run seed`. Never set it in Vercel. |
| `SANITY_REVALIDATE_SECRET` | Vercel | yes | Shared secret for the publish webhook (any long random string) |
| `VERCEL_DEPLOY_HOOK_URL` | Vercel | yes | Optional. Deploy hook the webhook calls so a full rebuild runs on publish |
| `GHL_WEBHOOK_URL` | Vercel | yes | GoHighLevel inbound webhook the quote forms send to. Use the same value as the live site's Vercel project (the code falls back to the live site's webhook when unset). |
| `RESEND_API_KEY`, `LEAD_EMAIL_TO`, `LEAD_EMAIL_FROM` | Vercel | yes | Optional email copy of each lead |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`, `RECAPTCHA_SECRET_KEY` | Vercel | secret key: yes | Optional reCAPTCHA **v3** keys for the forms. The honeypot and fill-time checks run either way. |
| `NEXT_PUBLIC_GTM_ID` | Vercel | no | Google Tag Manager container; defaults to the live site's `GTM-PNTJLP8M` (GA4 runs inside it) |
| `NEXT_PUBLIC_TTR_SITE_KEY` | Vercel | ask TTR | TTR OS tracker key. **Ask TTR for it; never copy it from a public page or repository.** |
| `NEXT_PUBLIC_TRACKING_ON_STAGING` | Vercel (Preview) | no | Set to `1` only to test tracking on staging. Without it, GTM and TTR OS run only on alphahardscapes.com. |
| `GHL_SEASON_WEBHOOK_URL` | Vercel | yes | Lead webhook of the season-end ad page `/patios-walkways/` |

The `ALPHA` prefix is deliberate: a generic `NEXT_PUBLIC_SANITY_PROJECT_ID` that belongs to another TTR site cannot point this site at the wrong project.

## 2. First deploy

1. Import the repository in Vercel (framework: Next.js, defaults are fine).
2. Add the variables above (at least `NEXT_PUBLIC_SITE_URL`, the two `NEXT_PUBLIC_ALPHA_SANITY_*` values, `SANITY_REVALIDATE_SECRET` and `GHL_WEBHOOK_URL`).
3. Deploy. The site works immediately from the built-in content even before Sanity has anything in it.
4. In Sanity (sanity.io/manage → the project → API → CORS origins) add `https://alphahardscapes.com`, `https://www.alphahardscapes.com`, the `*.vercel.app` preview address and `http://localhost:3000`, all with credentials, so the Studio at `/studio` can sign in.

## 3. Seed the content (once)

Run from a machine or CI job that has the three Sanity variables and `SANITY_API_TOKEN`:

```bash
npm ci
npm run seed:dry      # preview: documents and photos that will be sent, no token needed
npm run seed          # adds everything that does not exist yet (89 documents, about 220 images including the share images)
```

`npm run seed -- --force` overwrites seeded documents with the built-in copy (use only to reset). The token is read from the environment only; the script never prints it.

A GitHub Actions workflow is included at `.github/workflows/seed.yml`: run it manually from the Actions tab after adding the secrets.

## 4. Publish → rebuild (webhook)

The site caches CMS content for up to an hour. To make a publish show up within seconds and, optionally, trigger a full redeploy:

1. In Vercel → Project → Settings → Git → **Deploy Hooks**: create a hook named "Sanity publish" on the production branch and copy its URL into `VERCEL_DEPLOY_HOOK_URL`. (Optional. Without it, publishes still go live through cache revalidation; the deploy hook additionally rebuilds every static page.)
2. In sanity.io/manage → project → **API → Webhooks → Create webhook**:
   - Name: `Rebuild alphahardscapes.com`
   - URL: `https://alphahardscapes.com/api/revalidate`
   - Dataset: `production`
   - Trigger on: **Create, Update, Delete**
   - Filter: leave empty (any document)
   - Projection: leave empty
   - HTTP method: POST, API version: `v2021-03-25` or later
   - Secret: the same value as `SANITY_REVALIDATE_SECRET`
3. Save. Publish something in the Studio and check the webhook's **Attempts** log in Sanity shows `200`. The response body reports `revalidated: true` and `redeploy: true` when the deploy hook was called.

## 5. Going live on the domain

- Point `alphahardscapes.com` and `www` at Vercel (Vercel shows the exact DNS records under Domains).
- Every live address is served at the same URL (trailing slash included). The 711 redirects the live site answered are carried over (one hop each; only `/retaining-walls/` now goes to `/retaining-walls-connecticut/` instead of the home page) in `content/redirects.json` + `redirects.ts` (one hop each). `www` redirects to the bare domain.
- **Staging is never indexed:** every host except `alphahardscapes.com` gets `X-Robots-Tag: noindex, nofollow` (`next.config.ts`). On the real domain only the thank-you and ad pages are noindex, as before.
- Google Ads landing pages (`/1000-off/`, `/1000-off-copy/`, `/20pct-off/`, `/20-off-patios-walkways/`, `/landing-page/`, `/optin/`, `/masonry/walkway-patio-masonry-optin/`, `/patios-walkways/`) keep their addresses, forms and GoHighLevel embeds.
- The sitemap stays at `https://alphahardscapes.com/sitemap_index.xml` (`/sitemap.xml` redirects there); nothing changes in Search Console.
- Launch at a quiet time and re-check within 24 hours (see `docs/seo-migration-report.md`).

## 6. Local development

```bash
cp .env.example .env.local   # fill in the Sanity project ID to use the CMS, or leave empty for built-in content
npm install
npm run dev                  # http://localhost:3000 and http://localhost:3000/studio
npm test && npm run lint && npm run typecheck && npm run build
```
