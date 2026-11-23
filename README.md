# Alpha Hardscapes website (V1 redesign)

A new, original website for Alpha Hardscapes (Cheshire, CT hardscaping, paver and masonry contractor), built with **Next.js 16**, **Tailwind CSS 4** and **Sanity** (Studio embedded at `/studio`). Built by TTR Digital Marketing.

- **Editable without code:** home page, services, projects and gallery, reviews, FAQs, service areas, blog posts, legal pages, site settings (phone, email, hours, social links, service areas) and SEO fields. Guide for the client: [`docs/editing-with-sanity.md`](docs/editing-with-sanity.md).
- **Complete on day one:** all content and photos from the live site are in `content/fallback/` and are seeded into Sanity by `npm run seed`. If Sanity is empty or unreachable the site still builds and shows that content.
- **Publish → rebuild:** a Sanity webhook hits `/api/revalidate`, which clears the content cache and can call a Vercel deploy hook. Steps: [`docs/deploy-and-rebuild.md`](docs/deploy-and-rebuild.md).
- **Research behind the design:** [`docs/research-report.md`](docs/research-report.md) (105 sites, including "Lions Creek vs. the best of the 100") and the live-site inventory in [`docs/phase-0-live-site-audit.md`](docs/phase-0-live-site-audit.md).

## Quick start

```bash
npm install
cp .env.example .env.local      # optional: add the Sanity project ID to read from the CMS
npm run dev                     # http://localhost:3000 (site) and /studio (CMS)
```

Checks: `npm run lint`, `npm run typecheck`, `npm test`, `npm run build`.

## How it is organised

| Folder | What is there |
|---|---|
| `app/(site)/` | Public pages (home, services, projects, service areas, blog, about, reviews, FAQ, contact, legal) |
| `app/studio/` | Sanity Studio at `/studio` |
| `app/api/lead/` | Estimate form handler → GoHighLevel webhook and/or email |
| `app/api/revalidate/` | Sanity publish webhook → cache revalidation (+ optional deploy hook) |
| `components/` | UI primitives (`ui/`), site chrome (`site/`), page blocks (`blocks/`) |
| `content/fallback/` | Built-in content (also the seed source). `*.data.ts` files are generated from the old site. |
| `lib/content.ts` | Content API: Sanity first, built-in copy as fallback |
| `lib/sanity/` | Client, GROQ queries, image helpers |
| `sanity/schemas/` | CMS document types |
| `scripts/seed.ts` | Seeds Sanity with the built-in content and uploads the photos |
| `redirects.ts` | 301 map from every old URL to the new structure |
| `docs/` | Client guide, deploy guide, research report and Phase 0 audit |

## Environment variables

See `.env.example`. The site runs with none of them set. Secrets (`SANITY_API_TOKEN`, webhook secret, lead webhook, email key) live only in Vercel / GitHub secrets, never in code.

## Scripts

| Command | Purpose |
|---|---|
| `npm run dev` / `build` / `start` | Next.js |
| `npm run seed` | Add built-in content to Sanity (`-- --force` overwrites, `npm run seed:dry` previews) |
| `npm test` | Unit tests (content integrity, redirects, SEO helpers, Portable Text converter) |
| `npm run lint` / `typecheck` | ESLint / TypeScript |
