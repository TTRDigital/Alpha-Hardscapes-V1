# Lions Creek Outdoor (lionscreekconstruction.com) — Inspiration Reference Analysis

Prepared for the Alpha Hardscapes (Cheshire, CT) redesign. Researched 2026-11-23.

## 0. How this was researched, and one important caveat

The site is a **client-side-rendered single-page app**. The HTML returned by the server for every URL is a ~2.3 KB shell containing only `<div id="root"></div>`, meta tags, and a link to one 800 KB JavaScript bundle (`/assets/index-ljdEppfd.js`) plus one 75 KB CSS file (`/assets/index-C7KD9kQa.css`). WebFetch therefore saw nothing but the page `<title>` for the homepage and every inner page.

To do the analysis properly I downloaded the raw HTML shells for `/`, `/services`, `/portfolio`, `/before-and-afters`, `/about-us`, `/contact`, `/architects`, `/builders`, `/blog`, `/services/gunite-pools`, plus `sitemap.xml`, `robots.txt`, the full JS bundle and CSS, and reverse-engineered every page's React component tree, copy, data arrays, class names and asset lists from the bundle. All copy and class names quoted below are verbatim from the bundle. Visual judgments (what it "looks like") are inferred from the Tailwind classes and assets, not from a rendered screenshot.

### Platform / stack (from the raw source)

| Item | Finding |
|---|---|
| Builder | **Lovable** (AI site builder). Tell-tales: Vite + React SPA, Tailwind + shadcn/ui token system (`--sidebar-*` vars, `tailwindcss-animate` keyframes `enter`/`exit`/`accordion-*`), lucide-react icons, and the `/__l5e/assets-v1/<uuid>/filename` asset path convention (`l5e` = "lovable"). |
| Hosting | **Vercel** (`server: Vercel`, `x-vercel-cache: HIT`, `x-vercel-id: iad1::…`). |
| Rendering | Pure CSR. Per-route `<title>`/`<meta>`/`<link rel=canonical>`/OG tags **are** injected into the HTML shell server-side (the shells differ per route), but **no body content, headings or JSON-LD are present without JavaScript**. JSON-LD is injected client-side via react-helmet-async. |
| Previous platform | Filenames like `…-400x250.webp`, `…-1024x683.jpg`, `…-e1770389843459-400x250.webp` are WordPress-generated thumbnail names, so content was migrated from a prior WordPress site. |
| Fonts | One Google Fonts request in the CSS: `https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Inter:wght@300;400;500&display=swap`. CSS vars: `--font-display: "Playfair Display", serif; --font-body: "Inter", sans-serif`. No Adobe Fonts. |
| Animation | **framer-motion** (every section fades/slides in on scroll; hero text typewriter-style clip-path reveal) and **Lenis** smooth scroll (`duration: 1.15`, custom exponential easing, `smoothWheel: true`, `touchMultiplier: 1.2`). |
| Lead tools | **GoHighLevel / LeadConnector**: contact page embeds `https://api.leadconnectorhq.com/widget/booking/Jv9a5TOIIy1dkvgo2Ext` (calendar) and `https://api.leadconnectorhq.com/widget/form/DDnVu15IWBs0Gtrm9QYE` (form named "LC - Website Contact Form"), with the `https://link.msgsndr.com/js/form_embed.js` loader. |
| Analytics | **None found.** No GA4/gtag, GTM, Meta Pixel, Clarity, Hotjar, CallRail or similar in the HTML or bundle. Only a `google-site-verification` meta tag. (The matches for "clarity"/"segment" in the bundle are ordinary English words in blog copy.) |
| Social | Footer links to `facebook.com/lionscreekoutdoor/` and `instagram.com/lionscreekoutdoor/`. |
| JS weight | 801,777 bytes raw / 258,611 bytes compressed, single bundle, no route code-splitting. |

Routes in the router: `/`, `/about-us` (and `/about` alias), `/services`, `/services/:slug` (gunite-pools, soake-plunge-pools, landscape, outdoor-kitchens, lighting-audio, masonry-carpentry), `/services/soake-pools` (alias), `/portfolio`, `/before-and-afters`, `/architects`, `/builders`, `/blog`, `/blog/:slug` (9 posts), `/contact`, `/outdoor-kitchen-packages`, and `*` (404).

---

## 1. Homepage layout and section order (top to bottom)

The page component is literally `[SEO, Header, Hero, WhoWeAre, Services, FeaturedProjects, CTA, Footer]`. Dark theme throughout (navy background, cream text, gold accents).

### 1.1 Header (fixed)
- `fixed top-0 … z-50`; transparent over the hero, switches to `bg-background/90 backdrop-blur-md border-b border-border` after 60 px of scroll or on any non-home page. Animates in from `y:-20` with a 0.5 s delay.
- Left: logo image (`/assets/logo-icon-….png`, `h-14`, alt "Lions Creek Outdoor"). Note the logo is a PNG icon, not SVG.
- Center/right (desktop only, `hidden md:flex … gap-8`): 5 top-level items, all `text-xs tracking-[0.2em] uppercase text-cream-muted hover:text-primary`:
  - **Portfolio** `/portfolio`
  - **Before & Afters** `/before-and-afters`
  - **About** `/about-us` with hover dropdown: Who We Are, For Architects, For Builders, Blog
  - **Services** `/services` with hover dropdown: Gunite Pools & Spas, Soake Plunge Pools, Landscape Design, Outdoor Kitchens & Pool Houses, Lighting & Audio, Masonry & Carpentry
  - **Contact** `/contact`
- Dropdowns: CSS hover (`group-hover:opacity-100 group-hover:visible`), `bg-card border border-border py-2 min-w-[180px]`, items `text-[11px] tracking-[0.15em] uppercase`. No click/touch handling for dropdowns, so on touch devices the parent link simply navigates.
- Right CTA (desktop only): outlined gold button **"Schedule a Site Visit"** → `/contact#booking` (`text-xs tracking-[0.15em] uppercase border border-primary/30 text-primary px-6 py-2.5 hover:bg-primary hover:text-primary-foreground`).
- **No phone number in the header.**
- Mobile: hamburger (three 1 px lines morphing to an X) opens a full-screen overlay (`fixed inset-0 z-40 bg-background/98 backdrop-blur-lg`), centered items in `font-display text-3xl`, sub-items `text-sm text-muted-foreground`, and the same "Schedule a Site Visit" outlined button at the bottom.

### 1.2 Hero (100vh video)
- `section.relative h-screen w-full overflow-hidden`.
- Background `<video autoPlay muted loop playsInline preload="auto" width=1920 height=1080>` with poster `hero-poster.jpg` (596 KB). Source switches by media query: `(max-width: 1023px)` → `hero-mobile.mp4` (3.35 MB), else `hero-video.mp4` (12.8 MB). A poster `<div>` sits over the video until `canplay` fires, then fades out over 700 ms. Custom loop-restart logic avoids the black frame at loop end.
- Overlay gradient: `bg-gradient-to-b from-background/60 via-background/30 to-background` (so the bottom of the hero dissolves into the navy page).
- Centered text stack:
  - Eyebrow: `DESIGN · BUILD · TRANSFORM` — `text-xs tracking-[0.3em] uppercase text-primary`.
  - H1: **"Not a backyard. / *A private resort.*"** — `font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl leading-[1.1] tracking-tight max-w-4xl`; second line is italic with the gold gradient and is revealed with a clip-path "typewriter" animation plus a blinking gold caret, starting 2 s after load.
  - Sub: "Designing and building luxury outdoor spaces across Connecticut." — `text-sm md:text-base … max-w-md font-medium drop-shadow-lg`.
  - Two buttons: solid gold **"Schedule a Site Visit"** (`/contact#booking`) and outlined **"View Our Portfolio"** (`/portfolio`), both `text-xs tracking-[0.15em] uppercase px-10 py-4`.
- Bottom center: "Scroll" micro-label (`text-[10px] tracking-[0.3em] uppercase`) with a 1 px gold fading line, appearing after 3 s.
- Animation timeline: nav 0.5 s → eyebrow 0.8 s → H1 1 s → sub 1.5 s → buttons 2 s → italic reveal 2–3.6 s → scroll cue 3 s. Nothing is clickable with confidence for ~2 s after load.

### 1.3 "Who We Are" (text-only, centered, `max-w-3xl`)
- Eyebrow: `Who We Are`.
- H2: **"Design & Build, / *under one roof.*"** (`text-3xl md:text-5xl`, italic gold second line).
- Three paragraphs (`text-sm md:text-base text-muted-foreground font-light leading-relaxed`):
  > "Lions Creek Outdoor is a design-build firm based in Connecticut. We build custom pools, pool houses, patios, outdoor kitchens, and full property transformations, and we handle every piece of it in-house. The design, the construction, the scheduling, the coordination. One team from the first drawing to the final walkthrough."
  > "Our clients hire us because everything runs through one team, and because the finished product holds up to a standard most builders can't reproduce. That standard shows in the parts you see every day, and in the parts buried under concrete that you never will."
  > "If that's the way you want your project handled, we should talk."
- Sub-block "Service Areas" (eyebrow + 2×2 grid): Fairfield County, New Haven County, Litchfield County, Middlesex County. Plain text, not links.
- Closed by the `.luxury-divider` (a 64 px wide, 1 px tall, gold gradient hairline).

### 1.4 "Our Services" (actually a 3-step process, `bg-card`)
- Eyebrow `What We Do`, H2 **"Our Services"**, divider.
- 3-column grid (`grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12`), each card = image `aspect-[4/3]` (lazy, `group-hover:scale-105` over 1.5 s, subtle dark veil that lifts on hover) + H3 `font-display text-xl md:text-2xl` + `text-sm` paragraph:
  1. **Project Design & Planning** — "Work directly with our design team to plan your space from the ground up. We visit your property, take real measurements, and build a 3D model so you see the finished project before anything breaks ground." (image: project-design-render.jpg)
  2. **Permitting** — "A great design only matters if the town approves it. Our internal design team works with outside engineers to make sure your project passes town boards and secures every permit and document needed to build." (image: homepage-Project-Management-and-Permitting.jpg)
  3. **Full-Service Construction** — "With the design approved and permits in hand, your project comes to life. We manage everything from contractor selection to scheduling to quality control, and we remain your single point of contact through completion." (image: homepage-full-service-construction.jpg)
- Note: despite the "Our Services" heading, this section lists process phases, not the six actual service lines. The cards are **not links**.

### 1.5 "Featured Projects"
- Eyebrow `Selected Work`, H2 **"Featured Projects"**, divider.
- 2-column grid (`lg:grid-cols-2 gap-12 lg:gap-16`) of two **video** cards (`aspect-video`, muted, `preload="metadata"`, poster JPG, click-to-play with a 64 px circular glass play button):
  1. **Year Round Oasis** — "Custom pool house with outdoor kitchen, infrared heaters, fireplace, year-round pool and spa, hydronic heating throughout the porcelain patio, and total surround sound by Coastal Source." (video `Lionscreek_Hero_Video_Burlington.mp4`, **53 MB**)
  2. **Defined Elegance** — "In partnership with David Schiffer of DMS Site Design… A medium-sized gunite pool with year-round capability, spa modes, and a full-sized swim resistance jet. Finished with an incredible Teak deck and coping, surrounded by a brand-new lush landscape." (video `Fairfield-Reel.mp4`, **49 MB**)
- Each card carries a `Featured Project` eyebrow, H3 `text-2xl md:text-3xl`, `text-sm` description `max-w-xl`.
- Outlined button **"View Full Portfolio"** → `/portfolio`.

### 1.6 Closing CTA ("Begin")
- Centered `max-w-2xl`. Eyebrow `Begin`, H2 **"Your estate awaits."**, paragraph: "Tell us about your property, your vision, and the life you want to live outdoors. We'll schedule a private site visit at your convenience." Solid gold button **"Schedule a Site Visit"** → `/contact#booking`.

### 1.7 Footer (`bg-navy-dark border-t`)
- Centered grayscale logo (`h-20 opacity-80`).
- 3 columns (`max-w-4xl`), each with a small uppercase heading:
  - **About**: Portfolio, Before & Afters, About Lions Creek, Architects, Builders.
  - **Services**: Custom Gunite Pools & Spas, Soake Plunge Pools, Landscape Design and Installation, Outdoor Kitchens and Pool Houses, Lighting & Audio, Masonry & Carpentry (note: several of these footer links point to the generic `/services`, not the detail pages).
  - **Get Started**: "Start Process" (`/contact#booking`), "Contact Us" (`/contact`); then address `470 James St Unit 007 / New Haven, CT 06513` and phone `(203) 689-6590` (`tel:+12036896590`, gold).
- Bottom bar: `© 2026 Lions Creek Outdoor. All rights reserved.` (10 px uppercase) and Facebook/Instagram lucide icons.
- No email in the footer, no hours, no license number, no service-town list, no privacy policy link.

What is **absent** from the homepage: testimonials/reviews, star ratings, awards/badges, years in business, team photos, project counts, FAQs, a visible phone number above the footer, any form, a map, and any town-level local SEO content.

---

## 2. How projects are shown

### 2.1 Portfolio index (`/portfolio`)
Structure:
1. Page hero band (`pt-32 pb-16 bg-card`, centered): eyebrow `Portfolio`, H1 **"Featured *Projects*"** (`text-4xl md:text-6xl`), divider.
2. **"Signature Outdoor Transformations"** — the same two video projects as the homepage (Year Round Oasis, Defined Elegance), stacked full-width (`max-w-5xl`, `aspect-video`, 80 px play button), each with eyebrow `Featured Project`, H3 `text-2xl md:text-4xl`, and a longer description `max-w-3xl`. No photos, no specs, no location beyond the description text.
3. **"More Lions Creek Projects"** — a **CSS-columns masonry** (`columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-3`, items `mb-3 break-inside-avoid`) of **28 images**. Each item is just an `<img loading="lazy">` with a generic alt ("Aerial estate view", "Pool and patio", "Evening pool lighting", "Construction detail", "Estate drone", …). Hover: `scale-105` over 1.5 s. Click opens a **minimal custom lightbox**: `fixed inset-0 bg-background/95`, the image at `max-h-[90vh] object-contain`, and a "✕" button. **No captions, no prev/next, no keyboard navigation, no swipe.**
4. CTA band: H2 "Start your project" + "Schedule a Site Visit".

There is **no filtering**, no categories, no per-project detail pages, no project names/towns/materials on the grid, and no "related projects" navigation. The portfolio is essentially a 28-image photo dump plus two videos.

Image quality: the grid mixes drone (DJI) HDR shots, mirrorless (2A4A…) HDR shots, and several WordPress-era thumbnails (`1024x683`, `1024x575`). Many full-size JPEGs are 0.7–0.95 MB each (e.g. `2A4A9915-HDR.jpg` 949 KB, `DJI_0253-HDR.jpg` 772 KB); only some assets were converted to WebP.

### 2.2 Before & Afters (`/before-and-afters`)
- Hero band: eyebrow `Transformations`, H1 **"Before & Afters"**, sub "Drag to reveal the transformation. See how we turn ordinary backyards into extraordinary outdoor estates.", outlined button **"Start the Process"** → `/contact`.
- **5 comparison sliders**, each preceded by a centered H2 (`font-display text-2xl tracking-wider`) naming the project: *Fairfield County - The Terrace*, *Westport - The Sunken Garden*, *Greenwich - Lanterna*, *Fireplace*, *West Port - Lido*.
- Slider is hand-rolled: `aspect-[16/10]`, follows mouse/touch position (no drag handle state), 1 px gold divider with a 40 px round glass handle and arrows icon, "BEFORE"/"AFTER" micro-labels in the corners. Before/after images are WebP (~115 KB).
- No descriptive text per project, no scope/materials/timeline.

### 2.3 Service detail pages (closest thing to "case study" content)
Template (`/services/:slug`):
1. Hero: full-bleed background photo at `opacity-30` under a navy gradient; eyebrow tagline (e.g. `CUSTOM GUNITE POOL BUILDER IN CONNECTICUT`), H1 (`text-4xl md:text-6xl`), divider, intro paragraph `max-w-2xl`, solid button **"Schedule a Consultation"**.
2. Alternating 2-column sections (`lg:grid-cols-2`, image `aspect-[4/3]`, image side alternates by index) with H2 + one paragraph. Gunite page: "Custom Gunite Pools & Spas", "What is Gunite?", "What is the Lifespan of a Gunite Pool?", "Premium Finishes". Soake page: "We Partnered Because Clients Kept Asking", "Precast Doesn't Mean Pre-Decided", "A Fraction of the Upkeep", "July and January".
3. "Our Other Services" — 3 cards (image `aspect-[4/3]`, H3 only).
4. CTA band "Ready to elevate your outdoor space?" + "Schedule a Site Visit".
5. Footer.
Each service page emits a `Service` JSON-LD with provider Organization and `areaServed: "Connecticut"`.

### 2.4 Services index (`/services`)
Hero band (eyebrow `What We Do`, H1 "Our *Services*") → H2 "Design & Build Services" → 3-column card grid of the six services (image 4:3, H3, 1 paragraph, text link "Explore {title}" with gold underline) → "Schedule a Site Visit" → CTA band → footer. Service blurbs are good, e.g. Masonry & Carpentry: "The trade that shows in every project. Stone walls, fire features, decks, steps, and the details that separate a poured patio from finished work, all done by our own crews."

---

## 3. Typography, colour, imagery

### 3.1 Typography
- **Display**: Playfair Display (serif), weights 400–700 + italics. Used for every H1/H2/H3, numerals, team names. Always `tracking-tight` (−0.025em) except a few `tracking-wider` pages (Before & Afters, Architects, Builders). **Sentence case**, never uppercase. Signature device: the last phrase of a heading set in *italic* with `.text-gold-gradient` (`linear-gradient(135deg, gold-light, gold, gold-dark)` clipped to text).
- **Body**: Inter, weights 300/400/500. Body copy is almost always `font-light` (300), `text-sm` (14 px) or `text-sm md:text-base` (14→16 px), `leading-relaxed` (1.625), colour `text-muted-foreground` (#7b899d, a grey-blue at roughly 4.5:1 on the navy — borderline for 14 px light text).
- **Eyebrows / labels / buttons**: Inter, `text-[10px]`–`text-xs` (10–12 px), `uppercase`, letterspacing `tracking-[0.15em]` (buttons), `tracking-[0.2em]` (nav), `tracking-[0.3em]` (eyebrows). This is the only uppercase usage.
- Scale: H1 hero `text-4xl → 5xl → 7xl → 8xl` (36/48/72/96 px); inner page H1 `text-4xl md:text-6xl` (36/60 px); section H2 `text-3xl md:text-5xl` or `md:text-4xl` (30/48 or 36 px); card H3 `text-xl md:text-2xl`; blog body `text-[15px] leading-[1.9]`.
- Measure: text blocks capped at `max-w-md` (hero sub), `max-w-lg`/`max-w-xl` (card copy), `max-w-2xl`/`max-w-3xl` (section intros) — roughly 45–75 characters per line.
- Section rhythm: `.section-padding` = `6rem 1.5rem` mobile → `8rem 3rem` tablet → `10rem 6rem` desktop. Very generous vertical whitespace (96–160 px).
- Radius: `--radius: .25rem`; practically everything is square-cornered (buttons have no radius at all).

### 3.2 Colour palette (from `:root`, converted to hex)

| Token | HSL | Hex | Use |
|---|---|---|---|
| `--background` / `--navy-dark` | 215 55% 10% | **#0b1728** | page background, footer |
| `--card` | 215 50% 14% | #122136 | alternating section bands, dropdowns, cards |
| `--navy` | 215 50% 16% | #14253d | |
| `--secondary` | 215 40% 18% | #1c2b40 | hover fills |
| `--muted` | 215 35% 20% | #213045 | |
| `--border` / `--input` | 215 30% 20% | #243042 | 1 px hairlines everywhere |
| `--navy-light` | 215 40% 24% | #253956 | |
| `--muted-foreground` | 215 15% 55% | #7b899d | body copy |
| `--cream-muted` | 40 10% 70% | #bab5ab | nav links |
| `--secondary-foreground` | 40 20% 85% | #e0dbd1 | |
| `--foreground` / `--cream` | 40 20% 92% | **#efece7** | headings, primary text |
| `--primary` / `--gold` / `--accent` / `--ring` | 40 50% 58% | **#c9a65e** | buttons, eyebrows, dividers, links |
| `--gold-light` | 40 40% 72% | #d4c19b | button hover, gradient start |
| `--gold-dark` | 40 55% 42% | #a67f30 | gradient end |
| `--primary-foreground` | 0 0% 5% | #0d0d0d | text on gold buttons |
| `--charcoal` / `--charcoal-light` | 0 0% 10% / 18% | #1a1a1a / #2e2e2e | defined, rarely used |

The **contact page booking/form sections flip to a white background** (`bg-white text-neutral-900`) because the embedded GoHighLevel widgets are light-themed — a visible seam in the design.

### 3.3 Imagery
- Hero: full-bleed 16:9 muted autoplay video with a heavy navy gradient. Everything else: fixed aspect boxes — `aspect-[4/3]` for service/process cards, `aspect-video` for project videos, `aspect-[16/10]` for before/after and blog cards, `aspect-square` for team headshots (rendered `grayscale`, colour on hover).
- Treatment: no rounded corners (except team `rounded-sm` and blog images `rounded`), no borders, slow 1.5 s zoom on hover, a 10 % navy veil over process cards. Service hero images are dimmed to 30 % opacity.
- Photo style: heavy use of drone/aerial HDR estate shots, twilight "evening lighting" shots, lush planted poolscapes. Almost no people, no crews at work (one "soake-installation-team" image on the Soake page), no close-up material/joint detail shots, no in-progress photos except two "Construction detail" images in the grid.
- Video: hero (12.8 MB desktop / 3.35 MB mobile), two featured project reels (53 MB and 49 MB, click-to-play, `preload="metadata"`), all self-hosted MP4 on Vercel; no HLS/WebM, no YouTube/Vimeo.

---

## 4. Trust signals

| Signal | Present? | Detail |
|---|---|---|
| Reviews / testimonials | **No** | Zero quotes, zero star ratings, no Google/Houzz/Angi widgets anywhere on the site. |
| Awards / certifications | **No** | None. No Belgard/Unilock/Techo-Bloc/ICPI/NCMA or pool-industry (PHTA) badges. The only "partner" mention is Soake Pools (New Hampshire precast plunge pools) and PebbleTec finishes, in body copy. |
| Years in business / project counts | **No** | No numbers anywhere. |
| Team photos | **Yes** (About page) | 4 headshots in a 2×4 grid, grayscale→colour on hover: Nate Misbach (Creative Director), Gary Cali (Director of Operations), Zach Masi (Landscape Designer), Laura West (Office Administrator). No bios, no founder story with a name. |
| Process | **Yes, strong** | Homepage 3-phase cards; About page has a 10-step animated vertical timeline ("Our Design Process": Meet Your Design Team → Site Planning & Layout → 3D Modeling & Material Selections → Final Design & Material Sign-Off → Meet Your Construction Team → Permitting → Permits Approved → Project Timeline → Schedule Review → Construction Begins) with a scroll-driven gold progress line and dots that light up as you scroll. |
| Differentiation argument | **Yes, strong** | About page "One Team. *Design and Build.*" with a 3-card comparison (01 Design-Only Firms / 02 Build-Only Firms / 03 Lions Creek — Design + Build, tagged "Our Model") and a 5-bullet "What this means for you" list ("A single point of contact…", "One budget. Every dollar goes into the build, not into markup between companies.", "Accountable from the first sketch to years after the build."). |
| Warranties / guarantees | **No** | Nothing beyond the "50 to 100 years" gunite lifespan claim. |
| Logos / press | **No** | One blog post leverages designer Emily Henderson's Soake pool as borrowed credibility. |
| Before & afters | **Yes** | 5 sliders (see §2.2). |
| Named referral partners | Partial | "David Schiffer of DMS Site Design", "Coastal Source" audio named in project copy. |
| B2B pages | Yes | `/architects` and `/builders` pages pitch the firm as a build partner — a signal of scale/professionalism. |
| Service-area statement | Weak | Four counties listed as plain text; towns (Greenwich, Darien, New Canaan…) appear only inside a blog post. |

---

## 5. CTAs and lead capture

### Wording and placement
- The single primary CTA is **"Schedule a Site Visit"**, repeated 13 times across the site, always to `/contact#booking`. Variants: "Schedule a Consultation" (service hero), "Start Process" (footer), "Start the Process" (before/after), "Contact Us" (blog post footer), "Schedule a Private Consultation" (blog heading).
- Placement: header (desktop only), hero (primary + secondary "View Our Portfolio"), after Featured Projects ("View Full Portfolio"), closing CTA band on every page, footer "Get Started" column, mobile menu bottom. **No sticky/floating CTA, no sticky mobile call bar.**
- Visual language: solid gold `bg-primary text-primary-foreground` for primary, 1 px gold-tinted outline for secondary; both `text-xs uppercase tracking-[0.15em] px-10/12 py-4`, square corners, 500 ms hover transitions.

### Phone visibility
- Three different numbers appear: **(203) 689-6590** (footer, every page), **(203) 824-7564** (contact page + architects page), **(203) 684-0324** (LocalBusiness JSON-LD `telephone`). Inconsistent NAP.
- Phone is **not** in the header or hero. On mobile a visitor must scroll to the footer or open the contact page to call.

### Contact page (`/contact`) flow
1. Hero band: eyebrow `Get In Touch`, H1 **"Schedule Your *Intro Call*"**.
2. `#booking` section (white background): eyebrow `Book A Call`, H2 "Schedule Your Intro Call", then a **GoHighLevel calendar iframe** (`minHeight: 720px`, title "Book a Call with Lions Creek Outdoor"). The booking is a call, not literally a site visit, despite the button wording.
3. Second white section, 2 columns: left H2 **"Contact Us"** with a **GoHighLevel form iframe** (`minHeight: 640px`, form "LC - Website Contact Form" — fields are inside the third-party iframe and could not be read from source); right column: Address (470 James St Unit 007, New Haven, CT 06513), Phone (203) 824-7564, Email contact@lionscreekconstruction.com.
4. Footer.
- No native form, no quote/estimate language, no budget/timeline qualifiers visible, no map embed, no hours, no "what happens next" copy. No visible spam protection (handled inside GHL).

---

## 6. Navigation

- Desktop: 5 items + CTA (see §1.1). Two hover dropdowns (About: 4 items; Services: 6 items). Logo links home.
- Mobile: full-screen overlay menu with all parent and child items listed, plus CTA. Body scroll is not locked while open (no `overflow-hidden` toggle found).
- Footer: 3 link columns + NAP (one phone) + social icons + copyright. Footer "Services" links mostly go to `/services` rather than the detail pages (missed internal-linking opportunity).
- Route change: scrolls to top (or to hash) after 100 ms; Lenis smooth scrolling applied globally.
- Not present: breadcrumbs, search, phone/email in header, sticky bottom bar, "Service areas" page, FAQ page, financing page, careers.

---

## 7. Mobile considerations (inferred)

- Tailwind breakpoints used: `sm` 640, `md` 768, `lg` 1024, `xl` 1280. Grids collapse to single column below `md`; masonry becomes 1 column below `sm`.
- Hero is `h-screen` on mobile with a 3.35 MB MP4 autoplaying (`playsInline muted`) — plus a 596 KB poster JPG that is also preloaded with `fetchpriority="high"`. H1 at 36 px (`text-4xl`) on a 390 px screen with `max-w-4xl` is fine; the typewriter italic line is `whitespace-nowrap`, so "A private resort." could overflow on very narrow screens.
- Header CTA is `hidden md:block`, so on mobile the only above-the-fold conversion paths are the two hero buttons that fade in after 2 s; **no tap-to-call anywhere above the footer**.
- Images have **no `srcset`/`sizes`**; mobile loads the same 0.7–0.95 MB JPEGs as desktop. Only 8 `loading="lazy"` attributes exist in the bundle (applied to card components, so most grid images are lazy; the hero poster/video are not).
- Before/after slider uses `onTouchMove` so it works on touch, but there is no drag handle "grab" affordance and page scroll vs. slider drag may conflict.
- Dropdowns are hover-only; on touch, tapping "Services" navigates to `/services` instead of opening the menu (acceptable, since the mobile overlay lists children anyway).
- `prefers-reduced-motion` is only handled by Tailwind's default `@media (prefers-reduced-motion: reduce)` utility block; framer-motion animations are not gated, so motion-sensitive users still get all fades/slides.
- Section padding of 96 px top/bottom on mobile is very tall; pages scroll long for little content.

---

## 8. Performance / SEO observations

### Weight
- First load: 2.3 KB HTML + 259 KB (compressed) JS + ~75 KB CSS + Google Fonts (2 families, 9 styles) + 596 KB poster + 3.35/12.8 MB hero video. Portfolio page adds 28 images, many 0.5–1 MB JPEGs, and two 50 MB MP4s (metadata only until clicked).
- Single JS bundle (no code-splitting) that also includes react-markdown/remark for the blog and the entire blog content inline — every visitor downloads all blog posts.
- JS/CSS served with `cache-control: public, max-age=0, must-revalidate` (hashed filenames, so fine, but not `immutable`).
- Image formats: mix of JPEG (most large shots), WebP (before/after, Soake, team, some cards), PNG (logo, two thumbnails). No AVIF. No responsive variants. Several WordPress thumbnail-sized images (1024 px wide) used in a 4-column masonry — adequate — but full-res HDR files used elsewhere.

### SEO
- Per-route `<title>`, `<meta description>`, canonical, OG and Twitter tags **are present in the HTML shell** (server-side injected), which is better than a typical SPA. Titles are decent and geo-modified, e.g. "Custom Gunite Pools in Connecticut | Lions Creek Outdoor", "Outdoor Living Services in Connecticut | Lions Creek Outdoor". One generic OG image (`/social/lions-creek-project.jpg`) is reused on all pages.
- Note the title mismatch: the server shell says "Lions Creek Outdoor | Custom Pools and Outdoor Living in Connecticut" while the React helmet sets "Lions Creek Outdoor — Luxury Outdoor Estates in Connecticut"; both exist, the client one wins after hydration.
- **All body content, headings and JSON-LD require JavaScript.** Google renders JS, but the second-wave indexing delay and the empty initial HTML are real disadvantages for a local-lead site versus SSR/static. Bing/other crawlers and link previews see no content.
- JSON-LD (client-injected): `LocalBusiness` on the home page (name, image = favicon.png, url, telephone (203) 684-0324, PostalAddress New Haven 06513, `areaServed: State Connecticut`, `makesOffer` list of 8 services), `Service` on each service page, `Article` on blog posts. No `aggregateRating`, no `geo`, no `openingHours`, no `sameAs`, no `priceRange`, image is a favicon. The three different phone numbers across site/schema are a NAP consistency problem for local SEO.
- Headings: exactly one H1 per page, logical H2/H3 nesting. Homepage H1 "Not a backyard. A private resort." contains **no keyword or location** — the only H2s are "Design & Build, under one roof.", "Our Services", "Featured Projects", "Your estate awaits." None mention pools, patios, hardscape or a town.
- `robots.txt` allows all and points to a sitemap listing 24 URLs with `lastmod` only on blog posts.
- Blog: 9 posts (Feb–Mar 2026), all Fairfield County / luxury pool topics (e.g. "Luxury Pool Builder Fairfield County Project Management", "Courtyard Pools Fairfield County"). Clearly an SEO content push toward Fairfield County, yet the business is in New Haven. Posts render from inline markdown; images in posts have captions from alt text.
- Alt text on portfolio images is generic ("Estate view", "Pool detail"), no location or material keywords.
- No town/service-area landing pages (Cheshire, Wallingford, Southington… equivalents), no FAQ schema, no review schema.

### Accessibility notes
- Hamburger has `aria-label`; video cards are keyboard operable (`role=button tabIndex=0`, Enter/Space). Lightbox has no focus trap, no Escape handling, no prev/next. 14 px light-weight grey-blue body text on navy is low contrast. Hover-only dropdowns are not keyboard-accessible (no focus-within styling found).

---

## 9. Honest critique

### What is genuinely strong (worth borrowing)
1. **A clear, confident positioning statement.** "Design & Build, under one roof" is hammered consistently: homepage, About comparison cards, process timeline, B2B pages. The copy is specific and well written ("the parts buried under concrete that you never will", "the details that separate a poured patio from finished work"). It sounds like a person, not a template.
2. **Process as a trust device.** The 3-phase homepage cards and the 10-step animated timeline turn an intimidating purchase into a legible sequence. For a hardscape contractor, a 5–7 step version (site visit → design/3D → proposal → scheduling → build → walkthrough → care) would do real work.
3. **Disciplined visual system.** One serif display face, one neutral body face, one accent colour, hairline dividers, square corners, fixed aspect ratios, consistent micro-label/eyebrow pattern. It feels premium precisely because it is restrained. The italic-gold "last phrase" heading device is distinctive.
4. **Before & After sliders** with project names. Hardscape is a transformation business; this is the most persuasive content type on the site and the cheapest to produce.
5. **Service detail pages that educate** ("What is Gunite?", "What is the Lifespan…", "Precast Doesn't Mean Pre-Decided") — question-led H2s that map to real search queries.
6. **Per-route meta in the server HTML**, sensible titles, `Service` schema per service, and a sitemap — competent baseline SEO hygiene for a Lovable build.
7. **Mobile-specific hero video** and poster fallback show some performance thought.

### What is weak or generic
1. **Zero social proof.** No reviews, no ratings, no awards, no numbers, no client names. For a six-figure purchase this is a glaring omission, and every "luxury" site that omits it looks the same.
2. **The portfolio is a photo dump.** 28 unlabeled images, no project pages, no location/scope/materials/timeline, no captions, no filtering, a bare-bones lightbox without prev/next. Two 50 MB videos carry the "featured" weight. A visitor cannot answer "have they built something like my project, near me, with the materials I want?"
3. **Lead capture is thin and outsourced.** One path (book a GoHighLevel call), one third-party form in an iframe you cannot style, white-background seam, no quote/estimate language, no phone in the header, no sticky mobile call bar, no "what happens next". Three different phone numbers across the site and schema.
4. **Homepage H1 and H2s contain no keywords or geography.** "Not a backyard. A private resort." is a nice line and an SEO zero. The homepage never says "patio", "retaining wall", "paver", "hardscape" in a heading.
5. **Heavy, slow, JS-dependent.** 800 KB JS bundle with all blog posts inlined, no code splitting, 12.8 MB hero video, 0.7–0.95 MB JPEGs without `srcset`, blank HTML without JS, 2-second staged hero animation before CTAs appear. Lenis smooth scroll and pervasive fade-ins are the current "AI luxury template" look; they will date fast and hurt Core Web Vitals.
6. **Generic "luxury" vocabulary** ("estate", "resort-level", "bespoke", "elevate", "Your estate awaits") — ironically the site's own blog-meta generator strips words like "bespoke|curated|elevate|seamless|unmatched" because they read as filler.
7. **Dark navy theme** reduces photo legibility (stone, pavers and plantings read better on light/neutral backgrounds), lowers body-text contrast, and conflicts with the white third-party widgets.
8. **Hover-only dropdowns, no keyboard support, no reduced-motion gating, low-contrast 14 px light text** — accessibility debt.
9. **Inconsistent information architecture**: the homepage "Our Services" section actually lists process steps; footer service links go to the generic services page; "Schedule a Site Visit" leads to a calendar for an "Intro Call".

### What would NOT fit Alpha Hardscapes (Cheshire, CT, lead-gen + local SEO)
- **The luxury-pool "private resort" posture.** Lions Creek sells $250k+ gunite pool estates to Fairfield County; its site is built to filter for that buyer (book a call, no prices, no "free estimate"). Alpha's core work (paver patios, walkways, retaining walls, outdoor kitchens, fire features) has a broader New Haven/Hartford County homeowner audience that expects a phone number in the header, a short estimate form, and fast answers. Copy the restraint and the process story, not the exclusivity gating.
- **Dark theme.** Paver colours, natural stone textures and masonry detail are the product; they need a light, warm-neutral canvas. Keep an accent (Alpha could use a warm stone/terracotta or deep green rather than gold) but not a navy page.
- **Video-first hero and heavy motion.** For a contractor whose leads come from mobile Google searches ("paver patio Cheshire CT"), LCP and a tap-to-call in the first viewport matter more than a 12 MB reel. Use a strong still (or a <2 MB, short, optional loop) and put the H1 + phone + estimate CTA up immediately.
- **CSR-only React SPA.** Local SEO needs crawlable HTML, fast first paint, town pages, FAQ/review schema. Build static/SSR (Astro, Next, 11ty, or even WordPress with a block theme) and keep JS to progressive enhancement.
- **Unlabeled masonry portfolio.** Alpha needs project cards with town, scope, materials/brand (e.g. Techo-Bloc, Unilock, Cambridge), square footage, and photos per project, filterable by service, each as its own indexable page. Add before/after sliders inside project pages rather than as a separate orphan page.
- **No social proof / one booking funnel.** Alpha should surface Google review count + rating, review quotes with towns, manufacturer certifications (ICPI/CMHA, Techo-Pro, Unilock Authorized, Belgard Master Craftsman — whichever apply), years in business, CT HIC license number, insurance, warranty on workmanship — and offer two paths everywhere: call now and a short estimate form (name, phone, email, town, service, timeline, photo upload).
- **Three different phone numbers.** Alpha must publish one NAP everywhere, with matching LocalBusiness/HomeAndConstructionBusiness schema (geo, hours, sameAs, aggregateRating).
- **Statewide "Connecticut" targeting with Fairfield County blog bait.** Alpha should name Cheshire and the real service radius (Southington, Wallingford, Hamden, Meriden, Prospect, Wolcott, Hamden, North Haven, Waterbury…) in headings, footer, schema, and dedicated town pages.

### What to carry over (summary)
Carry over: the typographic restraint (one serif display + one sans body, generous whitespace, hairline dividers, sentence-case headings with a single italic emphasis), the "one team, one point of contact" process narrative with a step timeline, question-led service pages, before/after sliders, square-cornered fixed-ratio image cards, and consistent per-page CTA bands. Replace: dark theme → light; video hero → optimized still with H1/phone/form; GHL iframe → native estimate form plus click-to-call; photo dump → structured, filterable project pages; silence on proof → reviews/certs/years/license; statewide luxury copy → Cheshire-anchored, service-keyword headings; CSR SPA → static/SSR.
