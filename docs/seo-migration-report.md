# SEO migration report (redesign of alphahardscapes.com)

What was done to follow "Alpha Hardscapes redesign: SEO rules", how it was checked, and what Kia and the client need to approve before launch.

**Short version:** the new design serves every live address with the live site's words. Titles, meta descriptions, H1s, body text, FAQs, buttons and in-text links were carried over from the live CMS word for word and compared automatically against a crawl of the live site. The new words I added are listed in section 4 for approval. Section 5 lists live wording that conflicts with the content rules. I left that wording unchanged because rule 2 says not to change ranking words without approval.

---

## 1. How the content was carried over

- The live site's CMS (Sanity project of the current site) was exported: 60 pages, 20 posts, 8 blog-list pages, 14 Elementor templates (header, footer, quote pop-ups), site settings and authors.
- `scripts/migrate/import-live.mjs` turns each live page's widgets into sections and blocks (heading, text, button, feature box, list, FAQ, reviews, photo, gallery, form, map, video, HTML embed). Heading levels, paragraphs, lists, bold text and links are kept exactly. Text that the live site hides on every device size is left out. Mobile-only copies of desktop text are not duplicated.
- The result is `content/legacy/site.data.ts`. It is the built-in content (used when Sanity is empty or unreachable) and the seed source for the new Sanity project.
- **Photos:** only real job photos are used (Sebastian's own project photos). The 2026/04 AI renders, stock images and AI blog banners from the live site were removed. When a page had no real photo, it shows a real photo of the matching work (patio, wall, steps, pool and so on). 157 photos, resized to at most 2560 px and served as AVIF/WebP at phone size.
- **Alt text:** 137 photos had an empty alt, a file-name alt ("grid image 1") or an auto-generated alt ("LIMITED-TIME OFFER! project by Alpha Hardscapes (photo 3)"). They now have a one-sentence description of what the photo shows (`content/legacy/alt-text.json`).

## 2. Rule by rule

| Rule | Status |
|---|---|
| **1. Keep every address** | All 62 sitemap addresses plus the thank-you pages, ad pages, privacy and terms answer **200 at the same URL**, lowercase with trailing slash. 88 pages in total. The live site's **711 redirects** are carried over in `content/redirects.json` (each one hop, never from a live page, always to a live page; all of this is tested). One fix: `/retaining-walls/` now goes to `/retaining-walls-connecticut/` instead of the home page. `/sitemap_index.xml` is kept and `/sitemap.xml` redirects to it. `/robots.txt` and `/feed/` are kept. `www` redirects to the bare domain. |
| **2. Keep the words that rank** | Titles: 84 of 84 compared pages are **identical** to live. Meta descriptions: identical on every indexable page. H1: identical everywhere except 3 ad pages that had two H1s (see 4). Body text: every text block of the live crawl was looked up on the new page; the only ones not found are template filler (post dates, "In this article" counters, blog card excerpts) and text the live site hides on all devices. |
| **3. One H1, real titles and descriptions, alt text, clean structured data** | One H1 per page (tested). Self-referencing https canonical with trailing slash on every page. Structured data: `HomeAndConstructionBusiness` (name, New Haven CT 06510 with no street address, phone, url, opening hours, areas served, social profiles), `WebPage`, `BreadcrumbList`, `FAQPage` only where the questions are visible on the page, `BlogPosting` with author and dates. **No AggregateRating or Review markup anywhere**, and no rating stars on the page. Reviews show as text only. |
| **4. Speed** | Lighthouse mobile on the local production build: home 93–97, service page 94–96, town page 94–97, blog post 94–95 (Performance), and 100 Accessibility / 100 Best Practices on all four. The page photo is preloaded at phone size with high priority and fixed dimensions. Everything else is lazy-loaded. CLS is 0. The hero video loads only after the page has finished loading. GTM and TTR OS load when the browser is idle after the first paint. Two font families (Geist, Geist Mono), `swap`, only the main one preloaded. Lighthouse's simulated LCP was 2.5–3.1 s locally. Measured with real throttling (Moto G4, slow 4G, 4x CPU) it was 0.8–1.8 s. Staging numbers are in section 6. |
| **5. Staging first** | Every host except `alphahardscapes.com` sends `X-Robots-Tag: noindex, nofollow`, so staging and previews can never be indexed. On the real domain only the pages that were noindex on the live site stay noindex (thank-you and ad pages). |

**Business facts and content rules applied:** location shown everywhere is New Haven, CT 06510 (town and ZIP only; the street address was removed from the code, data and docs). Every phone link is `tel:+14752276896`, except the ad pages' tracking number (see 5). No rating stars in markup or on the page. No new claims, no "best", no quote-process descriptions in any new words.

**Tracking, forms, ads:**
- **GTM** `GTM-PNTJLP8M` (GA4 runs inside it) and the **TTR OS tracker** load after first paint, only on alphahardscapes.com (set `NEXT_PUBLIC_TRACKING_ON_STAGING=1` to test on staging). The TTR OS site key is read from `NEXT_PUBLIC_TTR_SITE_KEY` and is **not** in the code. **TTR needs to supply it.**
- **Forms:** all 15 live forms (fields, labels, button text, SMS consent text, thank-you page per form) come from the live settings. Submissions go to the **same GoHighLevel webhook in the same JSON format** as the live site (form name, tags, name/phone/email/address, `fields` keyed by the live labels). Spam guard: hidden honeypot, minimum fill time and reCAPTCHA v3 when its keys are set. Buttons that opened a pop-up on the live site open the same form in a dialog.
- **Ad landing pages** keep their addresses, words, GoHighLevel form embeds (`/1000-off/`, `/1000-off-copy/`, `/20pct-off/`, `/20-off-patios-walkways/`, `/masonry/walkway-patio-masonry-optin/`), Elementor forms (`/landing-page/`, `/optin/`) and noindex. `/patios-walkways/` is served unchanged as the same static page, with its own lead route.
- Search Console and the Business Profile need no changes.

## 3. Automated checks (repeatable)

- `npm test`: every required address exists; one H1 per page; no street address, no ★; only the two known tel: numbers; redirects one hop, from non-live to live addresses; every button and form points at a known form; business schema has town and ZIP only, hours and no ratings; FAQ schema only from visible questions.
- Comparison against the live crawl (status, title, description, canonical, robots, H1, first sentence, every text block, internal links, structured data, missing alt text): 0 non-200, 0 title changes, 0 description changes on indexable pages, 0 canonical problems, 0 rating markup, 0 images without alt.

## 4. New or changed visible words (need Kia, then client approval)

1. **Header and footer layout:** the same menu items and links as live. The footer now also shows the hours (Mon–Fri 8 AM – 5 PM, Sat 9 AM – 1 PM, from the live business data), "New Haven, CT 06510", the email, and links to Contact, Blog, Privacy Policy and Terms and Conditions. The copyright line and "Website by TTR Digital Marketing" are as on live.
2. **Mobile call bar:** "Call" and "Book Your Quote" (the live header button text).
3. **Form labels are visible above each field.** The live forms used placeholders only. The label text is the live form's own field label. Drop-downs without a placeholder show "Select". New error messages: "Please fill in …", "Please add a phone number or email so we can reach you.", "Something went wrong. Please call us at (475) 227-6896."
4. **Blog posts:** the byline "By Sebastian Ullrich, Founder & Hardscaping Specialist at Alpha Hardscapes", the author box and "More from the blog" all use live wording. The category label above the title ("Blog" / "Uncategorized") is new.
5. **Blog list pages:** an author link card (Sebastian's name and role, live wording) under the intro. Post cards show the post's opening words as the summary, as WordPress did.
6. **404 page:** "We could not find that page." with links to Home, Masonry, Gallery and Contact.
7. **Second H1 → H2** on `/1000-off/`, `/1000-off-copy/`, `/20pct-off/` (ad pages, noindex). Same words, now one H1 each.
8. **Removed:** the gallery filter tabs (All, Patios, Retaining Walls, Paths, Stairs, Pools, Beds, Fire Pits, Fences). The gallery now shows all photos in one grid. Also removed: two blocks the live site hides on every device (home "Custom Landscape Design & Installation" box, a `/locations/` paragraph).
9. **Alt text** written for 137 photos (section 1).
10. **Photos:** AI and stock images replaced by real job photos, or dropped.

## 5. Live wording that conflicts with the content rules (left unchanged, needs a decision)

Rule 2 says to keep the words that rank. These live words break the content rules, so they need an approved rewrite or an exception:

- **"best"** appears on 28 indexable pages. Two of the target searches contain "best" ("best retaining walls in cheshire" for `/stone/`, "best masonry in cheshire" for `/hartford-county-ct/`), which conflicts with "no best / #1".
- **"licensed"** appears on 10 pages (FAQ, masonry, 8 blog posts). It is mostly advice like "hire a licensed contractor", but please confirm Alpha holds the licences mentioned, or reword.
- **"guarantee"** appears once (`/uncategorized/how-long-does-a-paver-patio-last/`).
- **Em dashes** appear on 35 pages (rule: no em dashes).
- **Quote-process descriptions** (site visits, "come out", turnaround times) appear on 16 pages (`/wall-block/`, `/stone/`, `/outdoor-kitchens-connecticut/`, several blog posts). Not confirmed in writing, per the rules.
- **"Based in Hamden, CT"** is in Sebastian's author bio (a town, not a street, but different from the New Haven location shown elsewhere).
- **`/uncategorized/how-do-i-automation-my-facebook-ad/`** is a TTR test post ("How Do I Automation my Facebook Ad") live on Alpha's blog. It is kept because it is a live address, but it is left out of "More from the blog". Suggest removing it with a 301 to `/blog/`.
- **Ad pages use (472) 203-3284**, which looks like a call-tracking number. It is kept because the ad pages keep their conversion tracking. Please confirm.
- **Gallery photos** include fences and planting beds (live gallery). The rules prefer patios, walls and real projects over planting.

**Target search check** (title / H1 / first sentence; unchanged live words). These pages miss the target in one or more places:

| Page | Target | Title | H1 | First sentence |
|---|---|---|---|---|
| `/` | hardscapes | yes | no ("Hardscaping, Paver & Masonry Contractors in Connecticut") | yes |
| `/outdoor-living-packages-connecticut/` | outdoor living packages | yes | yes | no |
| `/stone/` | best retaining walls in cheshire | no | no | no |
| `/chimney-installation-and-repair-connecticut/` | chimney repair cheshire ct | yes | no | no |
| `/repairs-maintenance-connecticut/` | repairs maintenance | yes | yes | no |
| `/seasonal-clean-up/leaf-removal/` | leaf removal | yes | yes | no |
| `/glastonbury/`, `/southington/`, `/uncategorized/west-hartford/` | masonry + town | yes | yes | no |
| `/hartford-county-ct/` | best masonry in cheshire | no | no | no |
| `/new-haven-county-ct/` | hardscape masonry | yes | no | yes |
| `/fairfield-county-ct/` | masonry cheshire | yes | no | no |

**Title and description lengths outside the checklist** (live values, unchanged): titles over 60 characters on `/` (62), `/deck-builders-connecticut/` (65), `/repairs-maintenance-connecticut/` (63), `/berlin/` (63), `/glastonbury/` (67), `/southington/` (69), `/stone/` (69) and `/new-haven-county-ct/` (64). Descriptions over 160 characters on `/masonry/`, `/seasonal-clean-up/`, `/seasonal-clean-up/leaf-removal/` and `/seasonal-clean-up/snow-removal/`. The description on `/fire-features-connecticut/` is only 53 characters.

## 6. Staging verification

See the hand-over message for the staging URL and the numbers measured there (status of every address, redirects, Lighthouse on home, a service page, a town page and a blog post).

## 7. Open items before launch

1. **TTR OS site key** → `NEXT_PUBLIC_TTR_SITE_KEY` in Vercel (from TTR).
2. Check that the Vercel project has `GHL_WEBHOOK_URL` (or relies on the built-in live webhook) and, if the live site used reCAPTCHA, **v3** keys. Then send **one test form on staging**, marked as a test.
3. Decide on section 5 (rewrites need Kia, then client approval).
4. **Hero video:** the home background clip is the live site's. Please confirm it is Alpha's own footage.
5. Create the new Sanity project/dataset for this site, add the environment variables (`docs/deploy-and-rebuild.md`) and run the seed. **Waiting for your go-ahead.** No token is needed in chat.
6. Launch at a quiet time, then within 24 hours: re-run the address and redirect check, the Rich Results Test (no rating markup) and PageSpeed on the four page types, and check Search Console coverage.
