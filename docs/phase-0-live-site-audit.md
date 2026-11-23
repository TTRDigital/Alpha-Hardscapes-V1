# Phase 0: live site audit and content inventory

**Site audited:** https://alphahardscapes.com (23 November 2026)
**Source of truth:** the live site is a Next.js 16 pixel-copy of the former WordPress/Elementor site (repository `TTRDigital/Alpha-Hardscapes`) with all 109 content documents in Sanity project `7ysj6im9`. Its built-in copy (`content/seed.json`, 10 MB of Elementor node trees) and `public/` folder (556 MB) were used as the inventory source, cross-checked against the live sitemap.

## 1. Business facts (now in `content/site.ts`)

| Fact | Value |
|---|---|
| Legal name | Alpha Hardscapes LLC |
| Owner | Sebastian Ullrich (founder) |
| Phone | (475) 227-6896 |
| Email | alphahardscapes1@gmail.com |
| Location shown | New Haven, CT 06510 (town and ZIP only, never a street address) |
| Hours (from the old schema) | Mon–Fri 8:00–17:00, Sat 9:00–13:00 |
| Social | facebook.com/AlphaHardscapes, instagram.com/alphahardscapes |
| Google | Business profile maps.app.goo.gl/FgHxbjYRenueVuuf7 · Write-a-review maps.app.goo.gl/pLz1Aie8pkVUstaf7 |
| Service area | New Haven, Hartford and Fairfield Counties, "Southern Connecticut" |
| Claims used on the old site | "over 20 years of combined experience", "fully insured", free estimates, financing for qualified customers |
| Claims **not** carried over | "licensed" / "certified" (removed from ad pages by TTR in Nov 2026 for lack of evidence; the HIC number is unknown). The new site says "fully insured" and has a licence-line field. |

## 2. Pages on the live site (62 URLs in the sitemap) and where they went

| Old page(s) | Content | New home |
|---|---|---|
| `/` | Hero + video reel, intro, hardscaping and landscaping service lists, 5-step process, 7 "why us" points, 8-photo projects slider, 10 Google reviews, service-area map, 5 FAQs, CTA | Home page (`content/legacy/site.data.ts`) |
| `/about-us/` | Founder blurb, "Alpha advantage" 4 values, masonry and landscaping service lists | About page |
| `/masonry/` (hub) | Stone/concrete/block/brick masonry, 8 paver project types, 6 benefits, 5-step "how we work", 6 before/after collages | Services index + sections of Retaining Walls, Stone Steps, Chimneys, Stone Veneer, Repairs |
| `/walkway-patio-connecticut/` | Patios and walkways copy, materials list, 5 FAQs, 8 photos | Service: Paver Patios & Walkways |
| `/retaining-walls-connecticut/`, `/stone/`, `/wall-block/`, `/masonry/retaining-walls/*` | Retaining walls, natural stone walls, wall-block walls, 9 FAQs | Service: Retaining Walls (stone and block as sections) |
| `/stone-steps-connecticut/` | Natural stone steps copy, 3 FAQs | Service: Stone Steps & Front Entries |
| `/outdoor-kitchens-connecticut/` | Outdoor kitchens copy, 3 FAQs | Service: Outdoor Kitchens |
| `/fire-features-connecticut/` | Fire pits and fireplaces copy, 3 FAQs | Service: Fire Pits & Outdoor Fireplaces |
| `/pool-builders-south-connecticut/` | Pools and pool patios copy, 3 FAQs, video | Service: Pool Patios & Surrounds |
| `/deck-builders-connecticut/` | Decks copy, 3 FAQs | Service: Decks |
| `/outdoor-living-packages-connecticut/` | Design-build packages, investment guidelines | Service: Outdoor Living Packages |
| `/chimney-installation-and-repair-connecticut/` | Chimneys copy, 3 FAQs | Service: Chimney Installation & Repair |
| `/thinstone-connecticut/` | Thin stone veneer copy, 3 FAQs | Service: Thin Stone Veneer |
| `/repairs-maintenance-connecticut/` | Paver repair and restoration services | Service: Paver Repair & Maintenance |
| `/landscaping/` | Landscaping services, residential and commercial sections, town list | Service: Landscaping |
| `/seasonal-clean-up/`, `/snow-removal/`, `/leaf-removal/` | Seasonal services by season | Service: Seasonal Clean-Up, Leaf & Snow Removal |
| `/gallery/` | 98 photos in a filterless grid (patio, walkway, stairs, retaining wall, fire pit, fence, bed, pool) | Projects: 15 projects grouped from these photos, filterable |
| `/reviews/` | Google reviews widget | Reviews page (10 reviews with names, avatars and links) |
| `/frequently-asked-questions/` | 15 Q&As | FAQ page (15 Q&As, categorised) |
| `/service-areas/`, `/locations/`, `/new-haven-county-ct/`, `/hartford-county-ct/`, `/fairfield-county-ct/` | County copy, town lists, maps | Service areas: 3 county pages |
| `/avon/`, `/berlin/`, `/farmington/`, `/glastonbury/`, `/southington/`, `/uncategorized/west-hartford/` | Templated town copy with 3 FAQs each | Service areas: 6 town pages, rewritten, plus a new Cheshire page |
| `/contact/` | Map image, phone, email | Contact page with estimate form, hours and map |
| `/blog/` + 18 posts (incl. 5 under `/uncategorized/`) | Full articles (Portable Text and Elementor) | Blog: 18 posts converted to Portable Text, same slugs under `/blog/` |
| `/privacy-policy/`, `/terms-and-conditions/` | Legal text | `/privacy-policy/`, `/terms/` |
| `/1000-off/`, `/20pct-off/`, `/optin/`, `/patios-walkways/`, `/landing-page/`, thank-you pages | Google Ads landing pages and form thank-yous | Redirected to `/contact/` or `/thank-you/` (see `redirects.ts`; re-point ads before launch) |
| `/uncategorized/how-do-i-automation-my-facebook-ad/`, `/home-draft/` | Stray drafts | Dropped (redirect to blog / home) |

Every old address is listed in `redirects.ts` (301). The 711 WordPress-era redirects in the old repo's `content/redirects.json` all pointed at these same pages, so they collapse into this map.

## 3. Images

| Set | Count | Where |
|---|---|---|
| Gallery photos (2025/09 and 2026/07 uploads) | 94 | `public/images/gallery/` (WebP, max 1800 px) |
| Service page photos (real jobs and the 2026 service illustrations) | 60 | `public/images/services/` |
| Before/after collages, split into pairs for the slider | 6 pairs | `public/images/before-after/` |
| Blog featured images (from the old Open Graph set) | 18 | `public/images/blog/` |
| Founder photos | 2 | `public/images/people/` |
| Review avatars | 10 | `public/images/reviews/` |
| Service-area maps | 3 | `public/images/areas/` |
| Logos, icons, hero reel (webm/mp4 + poster) | 10 | `public/images/brand/` |

Total 58 MB, down from 556 MB. All images referenced by the built-in content are checked by `tests/content.test.ts`. The 2026/04 service illustrations (outdoor kitchen, fire feature, steps, chimney, thinstone, deck, Avon collages) look AI-generated; they are used only where no real photo exists and should be replaced with job photos when available.

## 4. Observations about the old site (what the redesign fixes)

- Elementor markup: 22 to 26 stylesheets per page before bundling, jQuery, 12 quote popups, hover-only menus.
- No project context: the gallery had 98 photos with no titles, towns or materials; "Recent projects" linked to the raw image files.
- Reviews present but no aggregate rating or count anywhere; no owner photo on the home page.
- Keyword-stuffed town pages (one template, town name swapped) and duplicate service pages (stone / wall block / retaining walls; three thank-you variants per form).
- Contact page had no form; estimates ran through popups whose forms asked for square footage, completion date and budget up front.
- Schema address pointed at a New Haven placeholder; the business is in Cheshire.
- No HIC number, no financing mention outside the FAQ, no sticky mobile call bar.
