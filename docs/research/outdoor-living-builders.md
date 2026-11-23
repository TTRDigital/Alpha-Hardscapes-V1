# Outdoor-Living, Pool, Builder and Deck Website Research
## For the Alpha Hardscapes (Cheshire, CT) redesign

Research date: 2026-11-23. Method: WebSearch for roundups (Pool & Spa News Top 50 website judging, CyberOptik/FreshySites/Colorlib/SiteBuilderReport lists, Webflow showcase, agency case studies), then a curl probe of each homepage (platform signatures, font loads, tel: links, headings, CTA strings, trust keywords, sticky classes) plus WebFetch of the homepage and at least one portfolio/project page per site. Visual judgements (palette, density) are inferred from CSS/HTML and text extraction, not from rendered screenshots, so treat palette notes as indicative.

Hosts that would not resolve from this session (not reviewed): ciprianolandscapedesign.com, lewisaquatech.com, jtortorella.com, waltierhomes.com, willowhomes.com, eppright.com, karpassociates.com, gardinerlarson.com, rinelandscape.com. stonewoodllc.com is a parked domain; paradiserestored.com now redirects to spam.

---

## URL list

**Reference**
- R. Lions Creek Outdoor (the agency's inspiration) — https://www.lionscreekconstruction.com/

**(a) Pool builders and outdoor-living / outdoor-kitchen companies (8)**
1. Heritage Pools — https://swimhere.com/ — portfolio: https://swimhere.com/portfolio/ — project: https://swimhere.com/portfolio/260223/
2. Keith Zars Pools — https://keithzarspools.com/ — gallery: https://keithzarspools.com/residential-gallery/
3. Ryan Hughes Design Build — https://ryanhughesdesign.com/ — project: https://ryanhughesdesign.com/projects/odyssey/
4. Shoreline Pools (Stamford, CT) — https://www.shorelinepools.com/ — gallery: https://www.shorelinepools.com/swimming-pool-gallery/
5. Drakeley Pool Company (Bethlehem, CT) — https://www.drakeleypools.com/ — gallery: https://www.drakeleypools.com/modern — about: https://www.drakeleypools.com/firm
6. Avree Custom Pools — https://avreecustompools.com/ — gallery: https://avreecustompools.com/project-gallery/
7. Clarkson Pools — https://clarksonpools.com/ — gallery: https://clarksonpools.com/clarkson-pools-gallery/ — projects: https://clarksonpools.com/projects/
8. Platinum Poolcare — https://platinumpoolcare.com/ — gallery: https://platinumpoolcare.com/swimming-pool-pictures/geometric-pools

**(b) Premium custom home builders, remodelers, GCs (8)**
9. Hobbs, Inc. (New Canaan, CT) — https://hobbsinc.com/ — project: https://hobbsinc.com/work/montauk-cliff-house — process: https://hobbsinc.com/how-we-work/
10. Prutting & Company (New Canaan, CT) — https://www.prutting.com/ — work: https://www.prutting.com/work — project: https://www.prutting.com/work-/new-canaan-modern
11. John Kraemer & Sons (MN) — https://www.jkandsons.com/ — portfolio: https://www.jkandsons.com/custom-homes/ — project: https://www.jkandsons.com/project/edina-belgian-modern/
12. BOWA (McLean, VA) — https://www.bowa.com/ — projects: https://www.bowa.com/projects/luxury-kitchen-renovations/ — project: https://www.bowa.com/transitional-kitchen-washington-dc/
13. Anthony Wilder Design/Build (Cabin John, MD) — https://anthonywilder.com/ — projects: https://anthonywilder.com/projects/ — project: https://anthonywilder.com/project/outdoor-oasis/
14. STOCK Custom Homes (Naples, FL) — https://www.stockcustomhomes.com/ — project: https://www.stockcustomhomes.com/property/317-west-street
15. Environs Development (Chicago) — https://www.environschicago.com/ — project: https://www.environschicago.com/lincoln-park-timeless
16. Meadowlark Design+Build (Ann Arbor, MI) — https://www.meadowlarkbuilders.com/ — projects: https://www.meadowlarkbuilders.com/our-projects — project: https://www.meadowlarkbuilders.com/scandinavian-kitchen-remodel-ann-arbor

**(c) Deck and pergola builders (4)**
17. Keystone Custom Decks (PA; also TN/NY/FL) — https://keystonecustomdecks.com/ — gallery: https://keystonecustomdecks.com/project-gallery/ — project: https://keystonecustomdecks.com/project/custom-infinity-pool-flagstone-patio-outdoor-kitchen-chester-springs-pa/
18. Barrett Outdoors (NJ) — https://barrettoutdoors.com/ — gallery: https://barrettoutdoors.com/gallery/ — project: https://barrettoutdoors.com/projects/holmdel-curved-deck-project/
19. Deck Remodelers (NJ; serves CT) — https://deckremodelers.com/ — portfolio map: https://deckremodelers.com/portfolio — project: https://deckremodelers.com/greenwich-ct
20. Decks by Kiefer (NJ) — https://decksbykiefer.com/ — projects: https://decksbykiefer.com/projects/ — project: https://decksbykiefer.com/projects/curved-ipe-deck-warren-nj/

**Alternates looked at briefly (not fully profiled):** Gohlke Pools https://gohlkepools.com/ (878 Google reviews via Trustindex, team page with 80+ staff), Burton Pools https://www.burtonpools.com/, McDonald Remodeling https://www.mcdonaldremodeling.com/ (Squarespace, galleries by room), Riverbend Timber Framing https://www.riverbendtf.com/ (NAHB marketing-award website), Hendel Homes https://hendelhomes.com/ (NAHB Custom Home Builder of the Year 2024; thin JS-rendered home page), Fine Decks https://www.finedecks.com/ (Squarespace, gmail contact; weak).

---

## R. Reference: Lions Creek Outdoor (lionscreekconstruction.com)

Important finding: the reference is not a custom home builder. The `<title>` is "Lions Creek Outdoor | Custom Pools and Outdoor Living in Connecticut" and the sitemap/bundle show a New Haven, CT design-build firm doing gunite pools, Soake plunge pools, outdoor kitchens and pool houses, landscape, lighting/audio, and masonry/carpentry, serving Fairfield, New Haven, Litchfield and Middlesex counties. It is a direct Alpha Hardscapes competitor one county over, which makes it an even more useful benchmark (and a reason not to copy it too closely).

- **Platform:** Custom React single-page app built with Vite (`/assets/index-*.js`, 800 KB bundle; React Router; Radix UI toast/primitives). No CMS signature. Server returns an empty shell, so content is invisible without JS (SEO risk unless they pre-render; the sitemap exists, but crawlers that do not execute JS see only the title).
- **Typography:** Google Fonts: Playfair Display (400–700, italics) for display + Inter (300–500) for body. Classic "serif headline / light sans body" premium pairing. Tailwind utility CSS (ui-sans-serif stack), so spacing is on a tight 4-px grid with generous section padding.
- **Sections (from route and string analysis):** full-bleed hero video (`hero-video.mp4` with a separate `hero-mobile.mp4` and a poster JPG) → "Designing and building luxury outdoor spaces across Connecticut" → services grid (Gunite Pools & Spas, Plunge Pools, Outdoor Kitchens & Pool Houses, Landscape, Lighting & Audio, Masonry & Carpentry) → "Featured Project" / "More Lions Creek Projects" → before-and-after drag slider ("Drag to reveal the transformation") → "Our Model" value props ("One contract, one team", "One budget. Every dollar goes into the build, not into markup between companies", "Accountable from the first sketch to years after the build") → process steps (property evaluation, design plans and material selections, permits, timeline, design team introduces build team) → "Meet Your Design Team / Meet Your Build Team" → "Ready to elevate your outdoor space?" CTA → footer with service areas.
- **Pages:** Services (6 sub-pages), Portfolio, Before & Afters (a dedicated page), About Us, Contact, For Architects, For Builders & General Contractors (B2B referral pages), Blog (9 long-tail local SEO posts such as "luxury pool builder Fairfield County project management", "courtyard pools Fairfield County"), Outdoor Kitchen Packages (productised offer).
- **CTAs:** "Schedule a Private Consultation", "Schedule a Consultation", "Intro Call", "Schedule Walkthrough", "Start your project", "Get Started", "Get In Touch", "View Our Portfolio", "View Full Portfolio". Two tel: links (203-689-6590 and 203-824-7564). Form is "LC - Website Contact Form". "See It Before We Build It" suggests 3D renderings.
- **Trust:** process transparency, one-contract model, team pages, B2B credibility pages, blog authority. No visible review counts or star ratings in the bundle strings; no awards strings. Trust is built through tone and process rather than social proof.
- **Takeaways for Alpha:** the premium feel comes from (1) Playfair/Inter pairing, (2) video hero with a mobile-specific encode, (3) before/after slider as a feature not an afterthought, (4) "one team, one contract" positioning, (5) county-level SEO blog. Weaknesses to beat: JS-only rendering, no review/ratings proof, no visible star rating, no sticky mobile call bar in the bundle strings.

---

## (a) Pool builders and outdoor-living companies

### 1. Heritage Pools — swimhere.com
- **Location / services:** Charleston, SC. Concrete, fiberglass, "I-Beam" and elevated pools; renovations (replaster, liner); maintenance; financing. Ranked #1 website in Pool & Spa News' 2026 Top 50 judging.
- **Platform:** WordPress + Elementor. Fonts: DM Sans (Google) with Proxima Nova in custom CSS; uppercase letter-spaced labels. Neutral palette, white/grey logo variants for light/dark headers, circular badge motif.
- **Homepage order:** header (Portfolio, Pools, Services, Contact + "Request A Consultation") → hero "Charleston's elite pool builder" / "Start Here" → four pool-type cards → portfolio prompt → brand statement ("Designed by Nature. Engineered by Heritage.") → entertaining-spaces → maintenance → certifications/awards (PSN Top 50, Pentair, PHTA Gold, Pinnacle, Certified Master builder) → renovations → reviews (4 five-star quotes, "See All Reviews") → digital Look Book (flipbook) → downloadable guides (freeze, storm) → footer.
- **Projects:** The standout. Portfolio is a filterable database: filters for build method and features, search box, sort by newest/oldest/most photos, compact-view toggle. Each card shows project number, pool type, dimensions, street and city. Detail page lists Pool Type, Style, Size (18' x 32', Medium), Coping and Hardscaping material (Travertine, Ivory), Features (Fire Feature, Raised Wall, Tanning Ledge, Water Feature), each value linking to a filtered list; "Explore Similar Projects" and "Explore Projects in [town] Area" blocks. Images open full-size, no captions, no video, no before/after.
- **Typography / style:** airy, premium, nature-inspired; uppercase subheads; large photography.
- **Trust:** awards strip, Certified Master designation, reviews naming scheduler and PM, process pages per pool type, financing. No phone on homepage; no years stated.
- **CTAs:** "Request A Consultation" (header), "Start Here" (hero), "Start Your Project Today" (project pages), "Speak with a designer", "Download Now" lead magnets. Judges praised the consultation form that shows only fields relevant to the inquiry type.
- **Nav / footer:** 4-item nav; footer with Pools/Services/Contact columns, legal, socials incl. Houzz and YouTube.
- **Mobile:** sticky header classes present; no mobile call bar detected; phone absent from page text, so mobile callers must open Contact.
- **Design 9/10** — judged best-in-category by the trade press; restrained type, consistent badge motif, portfolio UX that feels like a product.
- **Lead-gen 7/10** — strong CTA repetition and lead magnets, but the phone number is effectively hidden and no star-rating aggregate is shown.
- **Borrow:** the filterable, metadata-rich portfolio (material, size, features, town) with "similar projects" and "projects near [town]" — ideal for Alpha's paver/wall/kitchen mix and for town-level SEO. Also the two downloadable guides as lead magnets.
- **Avoid:** burying the phone number.

### 2. Keith Zars Pools — keithzarspools.com
- **Location / services:** San Antonio + 3 regional offices, TX. Residential construction, renovation, cleaning, service/repair, retail; commercial. PSN Top 50 website pick for "striking visual identity".
- **Platform:** WordPress + Divi; Gravity Forms; Trustindex review widget. Fonts: League Spartan (headings), Plus Jakarta Sans / Poppins (body), Playfair Display and Alex Brush script accents. Palette: deep teal-navy #2a5164, aqua #0f9ab9, coral #f63f4b, gold #f6bb06 — bolder than most premium sites.
- **Homepage order:** utility bar (Payments, Financing, Commercial, Warranty, FAQ, phone) → nav with dropdowns + "Request Quote" → hero "#1 Award-Winning Pool Builder / Texas Built. Texas Trusted." → intro → Google Guaranteed badge → award-logo grid → "Gallery Of Our Work" image grid → four service cards → brochure download → free-consultation block → stats + Google review carousel → "What can we help you with?" five path cards → four office blocks with hours/phones → footer.
- **Projects:** Residential gallery of ~30 image cards with project name + city; only some link to detail pages; no filters, no video. Hero and gallery photography shifts moods (daylight, dusk, aerial).
- **Trust:** founded 1985, "42+ years", "13,250+ projects", "2,400+ five-star Google reviews", "16,000+ recommendations", repeat-customer counts, Google Guaranteed, PSN Top 50 2020–2026, Master Pools Guild, warranty page. Very heavy.
- **CTAs:** "Call Now", "Request Quote" (nav), "Start your design", "Get my price", "Book service", "Get Your Copy" (brochure). Phone in top bar, header and mid-page; four office numbers in footer.
- **Nav / footer:** large mega-nav; footer columns Build / Care / Company / Help.
- **Mobile:** sticky header; multiple tel links; dense pages.
- **Design 7/10** — memorable identity and good photography, but a lot going on (five fonts, bright palette, award walls).
- **Lead-gen 9/10** — phone everywhere, intent-based path cards, quantified proof, Google Guaranteed, financing, office hours.
- **Borrow:** the "What can we help you with?" intent router (new build / renovation / service / price) and the quantified proof row (years, projects, five-star reviews). Alpha could run years / projects / Google rating / towns served.
- **Avoid:** award-logo walls and five typefaces; it dilutes the premium feel.

### 3. Ryan Hughes Design Build — ryanhughesdesign.com
- **Location / services:** Tampa, FL. High-concept integrated outdoor living: pools/spas, landscape, water and fire features, outdoor furniture (Solana Outdoor sister brand).
- **Platform:** WordPress + Elementor; Gravity Forms. Fonts not loaded from Google (likely Elementor system/Adobe); dark background with white media logos.
- **Homepage order:** header → hero "We design and build high-concept, fully integrated outdoor living spaces. / Redefining Outdoor Living Spaces." → founder bio with stat counters (projects, awards, glass tiles, gallons) → "Award Winning Design" media logos (WSJ, HGTV, USA Today, Luxury Pools) → signature-project feature (Amarula Sun, 10,000 sq ft) → press list → "Recent Projects" six cards → FAQ → footer.
- **Projects:** Named projects ("Odyssey", "Prism Vue") each with its own page: full-width hero, H1 name, 25-image grid (no captions), awards strip with badge captions, three prose paragraphs embedding specs (6,400 sq ft pool, 192-ft vanishing edge, 5,700 sq ft glass tile) and brand credits inline; prev/next project links; no in-page CTA.
- **Typography / style:** image-led, dark, "luxury magazine" tone; aspirational copy ("without peer").
- **Trust:** ~two decades, "$110M+ of work", APSP Gold, HGTV nomination, publications, licence number. No reviews, no process, no warranty.
- **CTAs:** "Latest Projects", "Get Started" (hero), "View More". Phone only in footer. No form on homepage.
- **Nav / footer:** Services (Signature Projects, Solana Outdoor), Portfolio, About, Blog, Careers, Contact; footer with socials, licence, privacy.
- **Mobile:** duplicate nav block for mobile; no call bar.
- **Design 8/10** — cinematic photography and confident editorial copy; project pages read like features.
- **Lead-gen 4/10** — footer-only phone, no form, no reviews, no process; built for prestige not inquiries.
- **Borrow:** naming projects and writing them as mini-features with real numbers (sq ft, materials, lighting brands) and award captions.
- **Avoid:** the hidden phone and absence of any homepage form; Alpha depends on calls.

### 4. Shoreline Pools — shorelinepools.com (Stamford, CT)
- **Location / services:** Stamford CT; CT, Westchester, Hamptons, islands. Design, construction, renovation, service, auto covers, smart pool tech, 3D renderings.
- **Platform:** WordPress + Elementor (site by Premiere Creative). Fonts: DIN (headings), Inter/Roboto body. Light background, boxed tiles, all-caps triad headings ("SERVICE. CRAFTSMANSHIP. TRADITION."), dark footer.
- **Homepage order:** header with socials incl. Houzz and nav (About, Design, Construction, Renovation, Service, Gallery, Employment, Contact) → five-slide full-width slideshow → heritage intro (50 years, founded 1969) → "6,000+ pools" → testimonial → four service tiles → "#myshoreline" social prompt → 3D renderings / 11,000 sq ft warehouse / dedicated PM → founder story → "From Our Gallery" thumbnail grid → customer portal sign-up → blog → video/safety/smart-tech tiles → footer.
- **Projects:** Construction gallery of ~45 titled tiles ("A Grand Entrance", "Award-Winning Composition") each with a detail page; separate Design gallery (conceptual plans and 3D renderings as plain image files), Renovation gallery, Video gallery. No filters; image-only, no captions; no before/after on construction gallery.
- **Trust:** 50+ years, 6,000+ pools, family-owned, PM, Houzz, safety commitment, customer portal. No awards or reviews count on home.
- **CTAs:** "Contact us today »", "Read our blog »" — soft, text-link CTAs with chevrons. Two phone numbers (sales, service) but only in footer and gallery intro. Inquiry form on Contact page only.
- **Nav / footer:** eight-item nav; footer with two Stamford addresses, map links, blog/FAQ/login, agency credit.
- **Mobile:** sticky header; no call bar.
- **Design 6/10** — clean and credible but template-y (boxed tiles, chevron links), dense homepage, heritage-heavy rather than editorial.
- **Lead-gen 5/10** — weak CTA wording, footer-only phone, no form on home; strong local-proof content though.
- **Borrow:** a dedicated "Design" gallery showing plans/3D renderings next to finished work (Alpha can show 2D paver layouts and 3D kitchen renderings), and the renovation gallery for restoration work.
- **Avoid:** "Read our blog »" as a primary hero-adjacent CTA.

### 5. Drakeley Pool Company — drakeleypools.com (Bethlehem, CT)
- **Location / services:** Bethlehem CT; serves CT, NY, MA. Fourth-generation luxury "watershape" design-build, commercial, consulting, service division. Founded 2000; American Shotcrete Association Qualified Contractor.
- **Platform:** Squarespace. Fonts: Futura PT and Proxima Nova (Adobe via Squarespace). Dark greys (#272727, #131313) dominate; near-monochrome.
- **Homepage order:** full-bleed imagery with almost no text: header with all-caps nav (SPACES, VIDEOS, ABOUT, CONTACT) → social icons → address + phone block → footer list of "Spaces". No headline, no services copy, no CTA buttons.
- **Projects:** "Spaces" organised by mood/style (Modern, Country, Ocean, Spa, Garden, Commercial, Historical Modernist). Each is a Squarespace gallery of ~80 images with filename alts, no captions, no project pages, no text. Video section split Residential / Commercial / Education.
- **Typography / style:** pure portfolio minimalism; geometric sans caps; feels like an architecture studio.
- **Trust:** About sub-pages (Firm, Team, Four Generations, Ethic, Awards, Press, Media) carry it; homepage has none. ~400 words on Firm page; "one of only two ASA Qualified Pool Contractors".
- **CTAs:** "Sales Inquiry" and "Contact Us" only in nav. Phone in footer only.
- **Mobile:** Squarespace responsive; no call bar.
- **Design 7/10** — authentically editorial and photo-first, but underdesigned (no hierarchy, no captions) and dated Squarespace template.
- **Lead-gen 2/10** — no headline, no services, no CTA, no proof on the page; a crawler sees almost nothing.
- **Borrow:** the idea of grouping work by mood ("Modern", "Country", "Garden") as a secondary browse axis alongside service type.
- **Avoid:** everything else about its conversion path; it is the clearest example of "premium at the cost of leads".

### 6. Avree Custom Pools — avreecustompools.com
- **Location / services:** Houston (two offices). New pools, remodels, "Express Pools", fire/water features, spas, outdoor living, pool school, financing, podcast. PSN Top 50 website pick for consistent upscale photography.
- **Platform:** WordPress (BeTheme "mfn" classes), Google Fonts Arsenal + Poppins; blue accent #0089f7 on white/grey.
- **Homepage order:** top bar ("Book a FREE Design Consultation", "Pick a Time" Calendly link, phone, socials) → logo + nav → hero "Create Your Luxury OUTDOOR LIVING SPACE with an Award-Winning Pool Builder" + award badge + two photos → "Ready to make memories poolside?" + START YOUR PROJECT → "Over 50 years" + five design-category tiles → three-step process with circled numerals → testimonial carousel → two project images → Google review → contact block (addresses, phone, email) → footer.
- **Projects:** Project Gallery = 32 location-named cards (League City, Cinco Ranch) each with a detail page; 15 YouTube videos section; Before & After image block; no filters or captions beyond town.
- **Trust:** #11 nationally (PSN/Hayward), Houston Chronicle Best of the Best, 50 combined years, a dozen testimonials naming designers/PMs, Pool School, warranty page.
- **CTAs:** very strong: "Book a FREE Design Consultation" in the top bar, Calendly "Pick a Time", "START YOUR PROJECT", "Request a FREE Consultation", "Click Here To Call Us Now". Phone in top bar and footer.
- **Nav / footer:** deep nav (About with 6 children, Customer Care, Financing, Podcasts); footer with both offices.
- **Mobile:** sticky header; tel links; no explicit call bar.
- **Design 6/10** — competent and consistent photography, but generic theme and uppercase-heavy copy.
- **Lead-gen 9/10** — self-scheduling link in the top bar is the best single conversion idea in the set; CTAs at every section.
- **Borrow:** "Pick a Time" self-booking next to the phone, and projects titled by town for local SEO.
- **Avoid:** repeating town names as the only caption (Manvel twice in a row); add a one-line descriptor.

### 7. Clarkson Pools — clarksonpools.com
- **Location / services:** Jacksonville FL. Design + build, renovations, outdoor living, pool care, pricing tiers ("Clarkson Classics"), financing.
- **Platform:** WordPress + Elementor; Gravity Forms; Trustindex. Fonts: Montserrat + Staatliches (condensed display) + Inter. Palette navy #005198 and gold #f6bb06 on light grey #f4f4f4.
- **Homepage order:** header with phone/email/address/socials → hero "Award-Winning Pools & Dream Backyards" + award badges + "Schedule Your Consultation" → three category buttons (Pools & spas / Outdoor Living / Pool Care) → "From Backyard to Beautiful" intro → "Why Clarkson" four cards → residential summary → pricing block → five-step process → Google reviews → six-question FAQ → contact form → footer with licences and badges.
- **Projects:** Gallery page has six category tiles and nine "Featured Projects" with name + descriptor ("Modern Coastal Retreat — Complete Outdoor Living"); each has a detail page; projects archive paginated; no filters, no video on gallery.
- **Trust:** since 1990, 3,500+ pools, 100+ awards, badges (PSN Top 50, Pinnacle), Google reviews naming staff, PHTA/FSPA/Aquatech, four licence numbers, "Life of the Pool Commitment".
- **CTAs:** "Schedule Your Consultation" (hero), "Build Your Pool", "Get Inspired", "Call 904-223-4050" button in footer; homepage contact form; newsletter.
- **Nav / footer:** Design+Build, Gallery, Pool Care, About, Contact; footer with quick links, newsletter, badges, licences.
- **Mobile:** sticky header, tel links.
- **Design 6/10** — tidy, card-based and consistent; the condensed display font and gold badges push it toward "regional brand" rather than editorial.
- **Lead-gen 8/10** — pricing transparency, FAQ, process, form on home, phone in header and footer.
- **Borrow:** a published pricing/package tier ("Classics") and an FAQ block on the homepage; both reduce unqualified calls and help SEO.
- **Avoid:** badge strips in the hero.

### 8. Platinum Poolcare — platinumpoolcare.com
- **Location / services:** Wheeling IL (Chicago North Shore); IL, WI, MI, IN. Pools and spas, 24-hour maintenance, renovations, landscape design studio; HGTV and "Epic Pools" TV appearances; Aqua Magazine Hall of Fame 2010.
- **Platform:** WordPress + WPBakery (Visual Composer). Fonts: Raleway + Montserrat.
- **Homepage order:** mega-nav (Inground Pools, Our Process with Sales/Design/Construction/Client Orientation, Maintenance, Renovations, Landscape Design, 15 themed Galleries, About incl. Press/Financing/Communities Served/As Seen on HGTV) → hero "Custom Inground Swimming Pools & Spas" with REQUEST A QUOTE and CALL buttons → three columns (Pool Construction / Pool Maintenance / Landscape Design, each READ MORE) → long company copy → "Amazing Custom Pools & Spas" → office block → footer.
- **Projects:** Galleries split by feature (Waterfalls, Bubblers, Fire Features, Sun Shelf, Infinity Edge, Geometric, Freeform, Indoor, Commercial). Each is ~90 uncaptioned thumbnails linking to raw JPGs; one 20-word intro; "Receive a Free Estimate / REQUEST QUOTE" at top. No project pages.
- **Typography / style:** dense, text-heavy, early-2010s WordPress look; two sans fonts; SEO-driven URL slugs ("swimming-pool-builder-in-il").
- **Trust:** "nearly a half-century", Hall of Fame, APSP member, TV, 24-hour service, safety focus; testimonials page.
- **CTAs:** "Request a Quote" appears 6+ times; "CALL" button in hero; phone (847) 537-2525 in header/office block.
- **Mobile:** tel link; sticky header; dense mega-menu.
- **Design 4/10** — strong photography undermined by dated template, wall-of-text sections and uncaptioned galleries.
- **Lead-gen 7/10** — quote CTA and phone are everywhere; mega-nav exposes every service for SEO.
- **Borrow:** feature-based galleries (Fire Features, Sun Shelf, Water Features) as a browse axis — Alpha equivalents: fire pits, outdoor kitchens, sitting walls, steps, pool decks.
- **Avoid:** 90-thumbnail galleries that open raw image files; galleries need captions and project context.

---

## (b) Premium custom home builders, remodelers, GCs

### 9. Hobbs, Inc. — hobbsinc.com (New Canaan, CT)
- **Location / services:** New Canaan CT, NYC, Hamptons, NJ, Westchester. Luxury custom homes since 1954; Hobbs Care aftercare.
- **Platform:** WordPress with a bespoke theme ("Built by PJM"). Fonts: Spectral (serif, headings), Archivo (sans), IBM Plex Mono for labels/metadata — a genuinely editorial system. Near-monochrome palette; text-based arrow links ("View project →").
- **Homepage order:** header (Who We Are, How We Work, Our Work, Collaborators, Press, Inquire) → twelve-image hero slideshow with pause control and project credit → region strip → "The Firm / We are builders." with editorial photo → "Featured Work / A measured body of work." three cards (region, name, architect, "View project →") → CTA cluster (Instagram, View our work, Begin an inquiry, How we work) → inquiry panel → four office blocks → footer.
- **Projects:** Detail page = title, location, architect credit; full-width hero; two short paragraphs; Roman-numeral chapters ("I. Cliff and Ocean, II. Courtyard and Rooms, III. Private Details") mixing full-width and paired images with occasional titled shots; credits block (Architect, Interior Design, Landscape Architecture, Builder, Location, Imagery); lightbox; "← Our work" / "Next project →"; inquiry form and office cards at the bottom.
- **Process page:** five numbered phases (01 Discovery, 02 Design Partnership, 03 Pre-Construction with Scope/Time/Materials/Risk, 04 Construction, 05 Delivery and Stewardship), each with an image and caption; tagline "One team · One line of accountability."
- **Trust:** Est. 1954, named owners, architect credits, press and journal, collaborators page; "a small number of commissions each year". No reviews, no awards.
- **CTAs:** "Inquire" (header), "Begin an inquiry →", "Send inquiry →". Form: name, email, project location dropdown (CT / Westchester / NYC / Hamptons / Elsewhere), details. Phones only in office cards (four tel links).
- **Nav / footer:** six-item nav; footer with Areas We Serve, Press, Journal, Conversations, Careers, Hobbs Care, cookie prefs, back-to-top.
- **Mobile:** "Inquire" becomes "Contact" in the mobile menu; sticky header; no call bar.
- **Design 10/10** — the closest thing in the set to a print monograph: three-font system, chaptered project pages, credits, restraint everywhere.
- **Lead-gen 5/10** — one quiet CTA, footer-only phones, no reviews; appropriate for a firm that limits commissions, not for Alpha.
- **Borrow:** project-page anatomy (hero → two paragraphs → chaptered image groups with titles → credits block → next project → inquiry form); mono-font metadata labels; "Areas We Serve" footer list.
- **Avoid:** exclusivity copy ("small number of commissions") and inquiry-only tone.

### 10. Prutting & Company — prutting.com (New Canaan, CT)
- **Location / services:** New Canaan CT; CT, Westchester, Hudson Valley, Long Island, Berkshires. Award-winning architectural construction (architect-led modern homes); P365 maintenance and management service.
- **Platform:** Squarespace (older template). Fonts: Helvetica Neue stack; uppercase titles. Orange-red accent #f0523d on white/grey.
- **Homepage order:** a splash page — brand name and a single "ENTER" link to /work. Nothing else.
- **Work page:** two "Featured" card sections, 39 projects with uppercase titles and "Read more →"; no filters or captions. Project page: ~17 stacked photos first, then date, title, architect credit (e.g., Joeb Moore + Partners), a short paragraph, credits (architect, photographers), category and tag lists; prev/next; keyword paragraph repeated under every image (SEO stuffing).
- **Typography / style:** stark, gallery-like; images dominate; dated Squarespace chrome.
- **Trust:** architect and photographer credits, Houzz, awards implied in tagline; footer still says ©2018.
- **CTAs:** none beyond "Read more →"; email and phone (203) 972-1028 in page footer.
- **Mobile:** Squarespace responsive; splash page adds a tap before any content.
- **Design 6/10** — beautiful work, but the site itself is dated and the splash page is a 2010 habit.
- **Lead-gen 2/10** — splash page, no CTA, no proof, stale copyright.
- **Borrow:** crediting the architect/designer on every project (Alpha can credit landscape architects, pool builders, suppliers such as Techo-Bloc/Unilock).
- **Avoid:** splash pages and repeated keyword paragraphs.

### 11. John Kraemer & Sons — jkandsons.com (Minnesota)
- **Location / services:** Twin Cities MN (licences MN/WI/FL). Custom homes, renovations, condos, property management, homes for sale. "Minnesota's Only Five-Time Builder of the Year."
- **Platform:** WordPress + Divi. Fonts: Open Sans, PT Serif, PT Sans (Josefin Slab accent). Dark brown #1e1a16 and slate #737f87 with a deep red accent.
- **Homepage order:** header → hero headline "Minnesota's Only / Five-Time Builder of the Year" + "Behind all of our homes is a great story." → single featured image linking to a 45-years article → socials → licence numbers → footer. That is the entire page.
- **Projects:** Portfolio by category (Custom Homes, Renovations, Condos); custom-homes index is a grid of named projects ("Edina Belgian Modern", "Deephaven Farmhouse"); detail page = title, four credit lines (Architecture, Interior Design, Landscaping, Photography), ~40 stacked 400x284 thumbnails opening full-size, prev/next home; no narrative text, no specs.
- **Typography / style:** text-light, image-light homepage; italic emphasis in headline; otherwise plain.
- **Trust:** award headline, Awards and In the News pages, testimonials page, 45 years, licences. No reviews count, no phone anywhere on the homepage.
- **CTAs:** none; "Contact Us" nav only.
- **Mobile:** minimal page so it works, but nothing to act on.
- **Design 6/10** — confident single-statement homepage, but the project pages are thumbnail dumps.
- **Lead-gen 2/10** — no phone, no CTA, no form, no proof beyond the award.
- **Borrow:** leading with one unambiguous superlative claim in the hero (Alpha equivalent: "Cheshire's highest-rated hardscape contractor — 4.9 stars from N reviews" if true) and crediting landscaping/photography partners.
- **Avoid:** the empty homepage and uncaptioned 40-thumbnail pages.

### 12. BOWA — bowa.com (McLean, VA)
- **Location / services:** Northern VA, MD, DC; two offices. Design-build remodeling: kitchens, baths, whole-house, additions, condos; purchase consultations; client aftercare. 35+ years.
- **Platform:** WordPress; Gravity Forms; site by Sharp Innovations. Fonts: Lato, Open Sans Condensed, Droid Sans; Font Awesome Pro icons. Palette: bronze #a37b52 and navy #1e3278 on white.
- **Homepage order:** utility bar (phone + GET IN TOUCH) → nav → hero slideshow "A BETTER REMODEL BEGINS WITH BOWA" with CONTACT US → project-type tiles (*luxury* Kitchens, *masterful* Bathrooms…) → "As Seen In" press logos → lifestyle hero "your family's story BEGINS at HOME" → award icons → "A PROVEN PROCESS / TAKE THE 5 STEPS TO SUCCESS" → recent-projects gallery → "let our experts ANSWER your QUESTIONS" form → newsletter → socials → footer.
- **Projects:** Category landing pages with rows of titled cards ("Transitional Kitchen, Laundry, and Bath Renovation in Washington, DC"); detail page = "project profile" label, title, before/after image at top and bottom, several narrative paragraphs including owner quote, ten-photo grid, sidebar of recent posts, contact form with topic dropdown, newsletter. No specs or credits.
- **Typography / style:** italic lowercase accent word + bold caps noun pattern; dense but organised; bronze/navy feels established rather than editorial.
- **Trust:** Best of Houzz, NARI CotY, Bethesda Best, press logos, 35th anniversary, Our Experts, 5-step process, Client Aftercare, Clients' Perspectives. No review counts.
- **CTAs:** GET IN TOUCH (header), CONTACT US (hero), TAKE THE 5 STEPS, LET'S CHAT ABOUT YOUR PROJECT, form on home. Phone in header and footer (two offices).
- **Nav / footer:** Home, Projects, Expect, Gallery, Contact with deep submenus; footer with both offices, careers, blog, six socials.
- **Mobile:** tel links in header; sticky header; dense menus.
- **Design 6/10** — polished but corporate; the italic/caps headline device gets repetitive.
- **Lead-gen 8/10** — phone top-left, form on home, process as a CTA, topic-routed form, aftercare page.
- **Borrow:** "project profile" pages that open with a before/after and tell the homeowner's story; a topic dropdown on the form ("New patio / Repair / Pool deck / Other").
- **Avoid:** six-icon award rows with no labels (they read as clutter).

### 13. Anthony Wilder Design/Build — anthonywilder.com (Cabin John, MD)
- **Location / services:** MD, DC, VA. Architecture + interiors + construction; divisions Design-Build, WilderWorks (smaller projects), Interiors.
- **Platform:** WordPress + Avada + Slider Revolution; Adobe Typekit "Gotham". Site by Red Thinking. Light greys with olive #929d01 and sage #acaea0 accents.
- **Homepage order:** header with primary nav (Design-Build, WilderWorks, Interiors) and secondary nav (Projects, Our Story, Recognition, Contact) → short firm intro + client quote → "Creating award-winning projects" tabbed service cards with large image and "VIEW >" → footer. Very short page.
- **Projects:** Index of cards (thumbnail, title, VIEW PROJECT), no filters; detail page = title, location, full-width hero, subheading + one paragraph, 10-slide slideshow with "1/10" counter and arrows, and a "VIEW BEFORE" toggle on individual slides (true before/after per image); "ALL PROJECTS" link; no next-project link; no credits.
- **Typography / style:** Gotham caps labels, pipe-separated category lines, arrow text links; airy.
- **Trust:** Recognition page, Houzz, award language; no years, reviews, process or warranty on home. Phone footer-only.
- **CTAs:** "VIEW >" and "SEND US A MESSAGE" (projects page); "Call Us At" link on projects page.
- **Mobile:** Avada responsive; slideshow galleries work well on phones.
- **Design 8/10** — restrained, Gotham-led, strong hero slideshow; one of the cleaner remodeler sites.
- **Lead-gen 4/10** — no CTA on the homepage besides VIEW, phone footer-only, no proof numbers.
- **Borrow:** per-slide "VIEW BEFORE" toggle inside the gallery — the most elegant before/after implementation found; Alpha has strong before/after material.
- **Avoid:** a homepage that is only an intro and three cards.

### 14. STOCK Custom Homes — stockcustomhomes.com (Naples, FL)
- **Location / services:** Naples, Sarasota, Palm Beach (and Wyoming). Estate custom homes; also sells available homes. Webflow showcase site.
- **Platform:** Webflow (site by FinerFox); HubSpot forms. Fonts: Minion Pro (serif) + Albert Sans. Monochrome wordmark, light greys, dusk photography.
- **Homepage order:** header + featured-property slider → hero "Where the exceptional comes home" with "View Available Homes" / "Browse Portfolio" → featured home → Available Now (two listings) → Where We Build (four region tiles) → Portfolio (four cards) → About → News → "Start your custom home journey / Contact us" → footer with newsletter, offices, legal.
- **Projects:** Cards with name, beds/baths/sq ft; detail page = name, pipe-separated specs bar, dusk hero, credits with links (Architect, Interior Designer, Landscape Architect, Photographer), one paragraph, floor-plan/brochure downloads, ~30-image single-column gallery (no captions, tiles link to "#"), featured properties as the only cross-navigation.
- **Typography / style:** classic serif + geometric sans; airy; real-estate-listing structure.
- **Trust:** "award-winning", ~25 years, licence, press releases, News & accolades. No reviews, team, process, warranty.
- **CTAs:** Browse Portfolio, View Available Homes, Get in touch, Contact us; phones footer-only.
- **Mobile:** Webflow responsive; slider at top is heavy on phones.
- **Design 8/10** — handsome, consistent, premium; Webflow lets them keep CMS cards tidy.
- **Lead-gen 5/10** — oriented to buyers of spec homes; weak for service inquiries; phones hidden.
- **Borrow:** specs bar on project pages (Alpha: "1,260 sq ft · Unilock Beacon Hill · Fire pit · Cheshire, CT") and linked partner credits.
- **Avoid:** empty data fields rendering as "SQ Ft |" when content is missing (CMS hygiene).

### 15. Environs Development — environschicago.com (Chicago)
- **Location / services:** Lincoln Park / Lakeview, Chicago. Vertically integrated design-develop-build of luxury homes plus renovations and interiors; 30+ years.
- **Platform:** Squarespace. Fonts: DIN Condensed (labels), Calluna (serif body), Cormorant Garamond and Cinzel (display) — four faces. Dark charcoal #272727 and espresso #3b1902 with terracotta #d45f35 accent.
- **Homepage order:** full-bleed hero with "Scroll" cue → about us (one paragraph) → Available Homes (two addresses, "call or email") → Our Process ("Swiss watch" testimonial, named team roles) → Interior Design → Portfolio (four uncaptioned tiles) → footer with address, phone/fax, email, Instagram, Houzz.
- **Projects:** Project page = title, ~32-image Squarespace gallery, no text, no captions, no credits, no next-project link.
- **Typography / style:** moody, lowercase headings ("about us"), minimalist; Colorlib-featured as "minimalist, upscale".
- **Trust:** three decades, named team structure, one testimonial, Houzz. Phone footer-only; asks visitors to "call or email" without printing the number inline.
- **CTAs:** "Learn More", "View All"; no buttons for inquiry.
- **Design 7/10** — atmospheric and restrained, but four display fonts and uncaptioned galleries.
- **Lead-gen 3/10** — no inquiry CTA, phone in footer only, no form.
- **Borrow:** the one-paragraph process block that names the roles the client will meet (architect, design coordinator, construction manager, PM) — Alpha can name the designer, foreman and crew lead.
- **Avoid:** "Scroll" cue heroes that hide all content above the fold on mobile.

### 16. Meadowlark Design+Build — meadowlarkbuilders.com (Ann Arbor, MI)
- **Location / services:** Ann Arbor + ten listed towns in SE Michigan. Custom homes, whole-home remodels, cosmetic updates (Revive+Restore), sustainable building; 20+ years; three-year warranty.
- **Platform:** HubSpot CMS. Fonts: Larken (Typekit display serif) + Inter. Warm palette: amber #f49f00, olive #545f27, terracotta #cf571c, cream #f7f4f0.
- **Homepage order:** header (What We Do, Portfolio, Homeowner Resources, About, Contact button) → hero "Your Vision, Realized." → "An Award-Winning and Nationally-Recognized Company" + "Book a Call" → three service cards with arrow CTAs → In The News → Recent Projects grid → "The Meadowlark Experience" → What We Do → Where We Work (town list) → testimonials → Recent Articles → "Let's Talk" form → footer.
- **Projects:** Projects index with story-style headlines ("A Kitchen Reimagined for a Growing Family in Ann Arbor") and category chips (Kitchen, Whole Home, Exterior, Basement…); detail page = headline, hero, intro, Project Snapshot (location, neighbourhood, project type, home type, challenge, goals), Product Selections by room with linked brands, narrative, full-width photos, "What Changed" before/after lists, "By the Numbers", Meadowlark's Approach steps, BEFORE photo row, closing CTA "What Could Your Main Level Do Better? / Start the conversation".
- **Typography / style:** editorial, warm, thin dividers, arrow CTAs; the most "magazine" of the remodelers while still selling.
- **Trust:** Qualified Remodeler Master Design Awards, Houzz most-saved, Forbes/Apartment Therapy/CBS features, named designers, four testimonials, fixed-price contracts, three-year warranty, town list.
- **CTAs:** "Book a Call" (hero), arrow CTAs on every card, "Let's Talk" form on home; phone footer-only.
- **Mobile:** HubSpot responsive; toggle menu; no call bar.
- **Design 8/10** — warm editorial system with a real display face; cards and dividers keep it calm.
- **Lead-gen 7/10** — "Book a Call", form on home, warranty and fixed-price promises, town list; loses points for footer-only phone and placeholder footer links.
- **Borrow:** the project "Snapshot" + "Product Selections" + "What Changed" structure (Alpha: Snapshot = town, lot, scope; Selections = paver line/colour, wall block, lighting; What Changed = before/after bullets). Also the explicit "Where We Work" town block for local SEO.
- **Avoid:** leaving placeholder "Example Link" items in the footer.

---

## (c) Deck and pergola builders

### 17. Keystone Custom Decks — keystonecustomdecks.com (East Earl, PA)
- **Location / services:** PA, DE, MD, NJ, NY, TN, FL; showrooms in four states. Decks, patios, porches, pergolas, masonry, outdoor kitchens, fire features, water features, pools, spas, Soake plunge pools; 40+ years; lifetime workmanship warranty; financing; free 3D renderings. Site by LifeX Marketing.
- **Platform:** WordPress + Beaver Builder. Font: Jost (geometric sans) throughout. Light neutrals, single accent colour, line icons.
- **Homepage order:** sticky header with "Schedule an Estimate" → hero "Space For What Matters" with service tabs (Decks, Patios, Porches, Pools, Spas) → intro → "Your Backyard Retreat Reimagined" (Retreat / Gather / Live) → "100+ People On Your Side" checklist → four-step stress-free process → testimonial with photos → Additional Features → six recent-project cards → testimonial carousel → partner logos (TimberTech, Trex, Soake, Bullfrog) → local-builder SEO block → luxury-builder feature overview → showroom hours and locations → footer.
- **Projects:** Cards titled by scope + town ("Infinity Pool / Flagstone Patio / Outdoor Kitchen — Chester Springs, PA"); detail page = H1, share bar, short descriptive paragraphs, spec list (ID, Decking: Trex Spiced Rum, Patio: Flagstone Shenandoah Cragside 1,260 sq ft, Masonry: Quarry Cut, Price range $550k–650k), 17-thumbnail grid, prev/next, "Similar Projects" cards with project numbers, "Love This Project? Get Started on Yours Today!" CTA. No video, no before/after.
- **Typography / style:** clean, modern, whitespace, alternating text/image; single family of type.
- **Trust:** 40 years, lifetime warranty, 100+ staff, 3D renderings, five testimonials, pro-sports partnerships, brand logos; no star count.
- **CTAs:** "Schedule an Estimate" repeated in header, hero, mid-page, process; "View Our Project Gallery" as secondary everywhere. Phones only in the locations block (four tel links).
- **Mobile:** sticky header; no call bar detected; phone not in header.
- **Design 8/10** — the most disciplined deck site: one typeface, calm spacing, consistent CTA pairing.
- **Lead-gen 8/10** — estimate CTA everywhere, warranty and process up front, price ranges on projects (pre-qualifies leads); phone hidden costs a point.
- **Borrow:** publishing a price range and material spec list on each project; the paired primary/secondary CTA ("Schedule an Estimate" + "View Gallery") on every section.
- **Avoid:** hiding phone numbers until the locations block.

### 18. Barrett Outdoors — barrettoutdoors.com (Allentown, NJ)
- **Location / services:** Central NJ, ten towns listed. Custom decks (curved, multi-level, covered, pool), composite brands, pergolas, pavilions, outdoor kitchens, fire pits; design center; financing. NADRA award winner.
- **Platform:** WordPress + Elementor (8,000+ Elementor classes — heavy). Fonts: Poppins + Assistant. Burgundy #861723 accent on greys.
- **Homepage order:** 0% financing promo banner → utility bar (design center address, phone, "Tell Us About Your Project", financing) → nav with "Free Estimate" → hero H1 "Award-Winning Custom Deck Builder Serving New Jersey" + "Contact Us" + brand/association logos → intro → four numbered reasons → service cards → "Why Choose" four points (warranty, communication) → stats counters → six featured projects → four-step process → What to Expect → nine-image "Explore Our Work" grid → city list → NADRA awards → six articles → "Request a Free Consultation Today" → footer with licence, hours.
- **Projects:** Project page = category label, H1, intro, location link to city page, bullet spec block (870 sq ft deck, 192 sq ft pavilion, Trex Transcend, Azek PVC trim, Investment $105k–110k (2021)), six thumbnails without captions, consultation CTAs; no related projects, no before/after.
- **Typography / style:** bold headings, cards, repeated CTAs; polished but busy; long page.
- **Trust:** NADRA awards and membership, manufacturer logos, "5-star reviews" mention, warranty, counters, licence number, process.
- **CTAs:** "Contact Us", "Tell Us About Your Project", "Free Estimate" (nav), "Schedule Your Free Consultation", "Get Started Today!". Phone 866 number in utility bar, nav and footer.
- **Mobile:** promo banner + utility bar + nav stack tall on phones; tel links present.
- **Design 6/10** — competent Elementor build; too many sections and logo strips to feel premium.
- **Lead-gen 8/10** — phone in header, financing hook, city pages, investment ranges, repeated consultation CTAs.
- **Borrow:** linking each project to a town landing page (project → "Holmdel" city page) and stating the investment range with the year.
- **Avoid:** promo banners above the header and SEO city lists in the body of the homepage.

### 19. Deck Remodelers — deckremodelers.com (Sparta, NJ; serves NJ/NY/CT/PA + MA)
- **Location / services:** Sparta NJ; projects mapped across NJ, NY, CT (Greenwich/Cos Cob), PA; second office for Greater Boston. Full design-build outdoor living: decks, under-deck patios, outdoor kitchens, louvered roofs (Azenco), fire features, patios and retaining walls, pools/hot tubs, lighting, custom engineering. 80+ NADRA awards.
- **Platform:** Craft CMS with Bootstrap 5. Fonts: Libre Baskerville (serif headings), Open Sans, Dancing Script accent. Default Bootstrap palette in CSS; dusk/evening photography dominates.
- **Homepage order:** header with mega-nav, "Call Us" block (two numbers) and "Get Started" → hero "We Have Mastered The Art Of Designing & Building Dreams, One Backyard At A Time." with rotating gallery and video controls → intro → "More than just deck builders" → eight-tile Integrated Services grid → "Limitless Creations" carousel → Quality Materials & Exclusive Partnerships → Innovative Outdoor Spaces with before/after photos → testimonials (name + town) → "Luxurious" awards/leadership block with six images → Design Consultation form → blog → footer with vendor partners, newsletter.
- **Projects:** "Portfolio Map": 44 projects as cards headed by town + state with "View →", filterable by state (NJ/NY/CT/PA); category filters in the menu. Project page (Greenwich, CT) = H1 town, seven-photo strip, H2 "Multi-Level Deck & Under-Deck Patio in Greenwich, CT", five or six descriptive paragraphs naming features (rail-top bar, ceiling heaters, integrated lighting), closing "Call us Today", consultation form. No specs, captions, before/after or related projects on the page.
- **Form:** name, email, phone, address, project stage (3 radio options), referral source (9 options), 12 project-type checkboxes incl. "Entire Outdoor Living Space", comments, newsletter opt-in. Long but qualifying.
- **Typography / style:** serif + sans editorial pairing; "Elegance / Luxurious / Impeccable" section labels; evening photography gives a premium mood.
- **Trust:** 80+ NADRA awards, named owner with woodworking/luxury-home background, certified designers, three testimonials with towns, process; no warranty, no review count.
- **CTAs:** "Get Started" and "Design Consultation" in header; "Contact Us Today" twice; "View Gallery"; "Send Request". Two phones in header, one in footer.
- **Mobile:** mega-nav heavy; tel links in header; no fixed call bar detected.
- **Design 7/10** — editorial type and dusk photography make it feel upscale; carousels and label words ("Luxurious") are a little template-y.
- **Lead-gen 8/10** — header phones, qualifying form on home, town-based project map, consultation CTAs throughout.
- **Borrow:** the town-keyed Portfolio Map with state/county filters (Alpha: Cheshire, Wallingford, Southington, Hamden… with New Haven / Hartford county filters) and the project-stage + project-type qualifying form.
- **Avoid:** project pages with zero specs/captions; prose alone does not help scanning.

### 20. Decks by Kiefer — decksbykiefer.com (North Plainfield, NJ)
- **Location / services:** Hunterdon, Monmouth, Ocean, Somerset, Morris counties; ~40 towns. Custom decks (curved, multi-level, pool, ipe/bamboo hardwood), pergolas, pavilions, patios/pavers, outdoor kitchens, fire features; since 1986; founder is a landscape architect; NADRA awards. Site by Deck Builder Marketers.
- **Platform:** WordPress + Elementor. Fonts: Lato + Roboto. Light greys #e7e7e7, dark #33373d, single accent.
- **Homepage order:** header with dropdown nav and "Schedule Today" → hero "Deck Builder in New Jersey Built to Last" + "Get a Consultation" + "CALL NOW" + stats (years, decks built) → "Your Backyard Becomes the Best Room in Your Home" founder angle → stats + CTAs → three service tiles → "The Deck Builder Other Builders Cannot Match" → "Since 1986" three pillars → four-image gallery teaser with "View Gallery" / "View Projects" → reviews + "All Reviews" → three-step process (Collaborate, Build, Enjoy) → service-area towns → YouTube lightbox video → founder story, NADRA awards, trusted-by logos → closing CTA "Your Home Deserves a Deck Built to Match It" → footer with hours.
- **Projects:** Ten named projects ("Curved Ipe Deck Changes the View Entirely in Warren, NJ"); detail page = H1, spec block (Location, Materials Used: Ipe + redwood, Investment Range $75k–100k), three short paragraphs with bold inline links to city and service pages, eight related-project cards, "See All Projects", closing CTA; no captions, before/after or video.
- **Typography / style:** minimal, text-led, bold emphasis on keywords; premium-understated rather than photo-led.
- **Trust:** 50 years / since 1986, NADRA, master craftsman named, reviews, process, long-term warranties page, trusted-by logos, Yelp/Houzz/Facebook/Instagram.
- **CTAs:** "Get a Consultation" after nearly every section; "Schedule Today" in header; "CALL NOW" in hero; floating call button; sticky mobile bar with phone icon + consultation button (confirmed on project pages).
- **Mobile:** the only site in the set with a confirmed sticky mobile call/consult bar; hours listed Mon–Sat 8–8.
- **Design 6/10** — tidy but formulaic Elementor conversion template; photography is secondary to copy.
- **Lead-gen 9/10** — sticky mobile bar, CALL NOW in hero, consultation CTA cadence, investment ranges, town list, reviews.
- **Borrow:** the sticky mobile bar (call + consultation), hero stats, and "Investment Range" on project pages.
- **Avoid:** stat counters that render "0 +" without JS; and copy-first pages that starve the photography.

---

## Patterns

### What makes a contractor site feel "editorial, premium"
1. **A real type system, usually serif + sans + mono/caps label.** The sites that read as premium use a display serif or distinctive display face paired with a quiet sans: Lions Creek (Playfair Display + Inter), Hobbs (Spectral + Archivo + IBM Plex Mono labels), STOCK (Minion Pro + Albert Sans), Meadowlark (Larken + Inter), Deck Remodelers (Libre Baskerville + Open Sans), Environs (Calluna/Cormorant + DIN Condensed). Sites on Poppins/Montserrat/Lato alone (Barrett, Kiefer, Avree, Platinum) read as "contractor template" no matter how good the photos are. Keep to two faces plus one label style; Keith Zars (five faces) and Environs (four display faces) show the ceiling.
2. **Whitespace and a short homepage.** Premium sites run 6–9 sections (Hobbs, Anthony Wilder, STOCK, Lions Creek) with one idea per section and large section padding. Lead-gen templates run 14–17 sections (Barrett, Keystone, Clarkson, Kiefer). Target 9–11 for Alpha: enough for proof and CTAs, not a scroll marathon.
3. **Photography treatment:** full-bleed hero (video with a mobile-specific encode at Lions Creek; 12-image slideshow at Hobbs; dusk stills at STOCK/Deck Remodelers/Ryan Hughes), then a rhythm of full-width + paired images on project pages (Hobbs chapters). Dusk/"blue hour" shots with lighting on are the single most repeated premium cue across pools, decks and homes. Consistent crops (3:2 landscape cards, square thumbnails) matter more than quantity; 80–90 uncaptioned thumbnails (Drakeley, Platinum, JK&Sons) feel cheap.
4. **Captions, credits and metadata.** The premium tier credits architects, designers, landscape architects and photographers (Hobbs, Prutting, JK&Sons, STOCK) and labels images with place and subject. Mono or small-caps metadata labels (Hobbs) are a cheap way to look designed. Alpha equivalents: town, paver/wall product line and colour, square footage, features, lighting brand, year.
5. **Restrained colour.** Near-monochrome with one accent: Hobbs (grey + arrows), STOCK (black wordmark), Drakeley (charcoal), Lions Creek (neutral + red utility). Warm earth accents work when disciplined (Meadowlark's amber/olive/terracotta, BOWA's bronze). Bright brand blues/golds with badge strips (Clarkson, Keith Zars, Avree) read regional.
6. **Motion that serves content, not decoration:** before/after drag sliders (Lions Creek), per-slide "VIEW BEFORE" toggles (Anthony Wilder), paused-slideshow hero with project credit (Hobbs), "Scroll" cue only when there is content under it (Environs misuses it). No parallax carousels of logos.
7. **Copy voice:** short declarative headlines ("We are builders." "A measured body of work." "Space For What Matters." "Designing and building luxury outdoor spaces across Connecticut."), process written as numbered phases with one line each (Hobbs 01–05, Lions Creek, Keystone's four steps), and a single value proposition repeated ("One team · One line of accountability" at Hobbs; "One contract, one team" at Lions Creek).
8. **Navigation:** 5–6 top-level items (Work / Services / Process / About / Journal / Contact) with the CTA as a button in the header. Mega-menus (Platinum, Barrett, Deck Remodelers) help SEO but cost polish; put the long service list in the footer and on a Services hub page instead.

### Where premium-looking sites sacrifice lead generation (what Alpha must not copy)
- **Hidden or footer-only phone numbers:** Heritage (none on page), Ryan Hughes, Shoreline, Drakeley, Hobbs, Anthony Wilder, STOCK, Environs, Meadowlark, Keystone (locations block only), JK&Sons (none). Only Keith Zars, Avree, Clarkson, Platinum, BOWA, Barrett, Deck Remodelers and Kiefer put a phone in the header. Alpha's revenue is phone-driven: header phone on desktop, sticky call bar on mobile (only Kiefer does this well).
- **Inquiry-only, exclusivity tone:** "Begin an inquiry", "a small number of commissions", splash-page "ENTER" (Prutting), no homepage form (Ryan Hughes, Hobbs behind a panel, Drakeley, JK&Sons, Environs, Anthony Wilder). Use "Request a Free Estimate" / "Schedule a Site Visit" language with a short form visible on the homepage.
- **No quantified social proof:** none of the editorial tier shows a star rating or review count; the conversion tier does (Keith Zars 2,400+ five-star, Gohlke 878 Google reviews, Clarkson/Avree Google carousels). A single "4.9 ★ from N Google reviews" line near the hero does not break a premium layout.
- **Galleries without project context:** raw-JPG thumbnail dumps (Platinum, Drakeley, STOCK tiles linking to "#", JK&Sons) give nothing to SEO or to a homeowner deciding. Heritage's filterable, metadata-rich portfolio and Meadowlark's story pages prove you can be both beautiful and useful.
- **JS-only rendering:** Lions Creek's React SPA, Hendel's Flash-era remnants and Squarespace galleries deliver almost no indexable text. For Alpha's local SEO, server-rendered HTML with real headings, town names and captions is non-negotiable.
- **No process, warranty or team on the homepage:** premium builders rely on reputation; a hardscaper in Cheshire needs the four-step process, the workmanship warranty (Keystone's lifetime; Meadowlark's 3-year), ICPI/NCMA/Unilock or Techo-Bloc authorised-contractor badges, licence/insurance, and faces of the crew (Gohlke shows 80+ staff; Lions Creek "Meet Your Build Team").
- **Mobile neglect:** tall promo banner + utility bar + nav stacks (Barrett), "Scroll" heroes (Environs), splash pages (Prutting), and no sticky call bar anywhere but Kiefer. Hero video needs a mobile encode and poster (Lions Creek does this right).

### Recommended synthesis for Alpha Hardscapes
- **Look:** Hobbs/Lions Creek typography (display serif + light sans + mono labels), Keystone's single-accent calm, dusk photography, 9–11 homepage sections, 5–6 nav items.
- **Portfolio:** Heritage-style database (filters: service type, material line, feature, town; cards with town + scope + size), project pages with Meadowlark's Snapshot/Selections/What Changed, Hobbs's chaptered images and credits, Keystone/Kiefer's investment range, Anthony Wilder's in-gallery "View Before", Deck Remodelers' town map, and a dedicated Before & After page like Lions Creek.
- **Conversion:** header phone + "Request a Free Estimate" button, Kiefer-style sticky mobile bar, Avree's "Pick a Time" self-booking, Keith Zars' intent router (Patio / Walkway / Retaining Wall / Outdoor Kitchen / Pool Surround / Repair), a short homepage form with project-type dropdown (BOWA/Deck Remodelers), Google rating line near the hero, process + warranty + badges block, "Where We Work" town list (Meadowlark) and Lions Creek's county-level blog for SEO.
