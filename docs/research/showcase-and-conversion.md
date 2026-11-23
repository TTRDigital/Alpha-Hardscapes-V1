# Showcase design and conversion research for the Alpha Hardscapes redesign

Researched 2026-11-23. Method: WebSearch to select sites, then WebFetch (text extraction) of each homepage plus one inner page, with a curl pass on the raw HTML of the showcase sites to read fonts, CMS and animation libraries. Text extraction cannot see rendered colour or motion, so palette and motion notes are marked "inferred" where they come from markup, brand knowledge or the site's own copy rather than a rendered view. Vendor-published statistics are flagged as such.

## URL list

### Half (a): design-showcase sites (outdoor, landscape, materials)
1. Unilock: https://www.unilock.com/ and https://www.unilock.com/products/
2. Belgard (Oldcastle APG): https://www.belgard.com/ and https://www.belgard.com/products/
3. Cambridge Pavingstones: https://www.cambridgepavers.com/ and https://www.cambridgepavers.com/design-gallery
4. Nicolock Paving Stones: https://www.nicolock.com/ and https://www.nicolock.com/find-a-contractor/
5. Eldorado Stone (Westlake Royal): https://www.westlakeroyalbuildingproducts.com/stone/eldorado-stone and .../eldorado-stone/gallery
6. Hollander Design Landscape Architects: https://www.hollanderdesign.com/ and https://www.hollanderdesign.com/projects/
7. Nelson Byrd Woltz: https://www.nbwla.com/ and https://www.nbwla.com/work
8. Tom Stuart-Smith Studio: https://tomstuartsmith.co.uk/ and https://tomstuartsmith.co.uk/projects
9. Garden Architecture (Berkeley, Webflow showcase): https://www.gardenarchitecture.biz/ and https://www.gardenarchitecture.biz/projects
10. The Garden Practice (Framer gallery): https://www.thegardenpractice.com.au/ and https://www.thegardenpractice.com.au/projects
- Noted, not fetched: Techo-Bloc https://www.techo-bloc.com/ (bot-protection interstitial blocked every fetch route; second-hand notes only)

### Half (b): high-converting local contractor sites
11. Northface Construction (Hook Agency build): https://northfaceconstruction.com/ and https://northfaceconstruction.com/roofing/albertville-mn/
12. The Roof Tiger (Hook Agency build): https://therooftiger.com/ and https://therooftiger.com/financing/
13. Capstone Roofing (Hook Agency build, cited in Hook's 2026 trends article): https://capstoneroofing.biz/ and https://capstoneroofing.biz/financing/
14. Guardian Roofing (ServiceTitan "18 best roofing websites"; Ferocious Media build): https://www.guardianroofing.com/
15. West Shore Home (national remodeler, offer-led model): https://westshorehome.com/ and https://westshorehome.com/get-quote/
16. Long Fence (regional fence, deck and paver installer since 1945): https://www.longfence.com/ and https://www.longfence.com/specials/
17. American Driveway / Concrete Driveway Co. (WebCitz top concrete pick): https://americandriveway.com/
18. A-1 Concrete Leveling (WebCitz concrete list; HubSpot build by IMPACT): https://www.a1concrete.com/ and https://www.a1concrete.com/request-an-estimate
19. Gibbs Landscape Co. (FreshySites "10 best landscaping websites 2026"): https://gibbslandscape.com/ and https://gibbslandscape.com/residential-landscaping
20. Brookscapes (FreshySites list; LocalEdge build): https://brookscapes.com/ and https://brookscapes.com/raleigh-nc
- Noted, hardscape peer: Pearl Landscaping and Patio Co. https://www.pearllandscaping.com/ (FreshySites list; Wix)

### Research and roundup sources used
- Hook Agency: best contractor websites 2025 (https://hookagency.com/blog/hook-agencys-best-contractor-websites-2025/), mobile UX mistakes (https://hookagency.com/blog/home-services-mobile-ux-mistakes/), contact page conversion (https://hookagency.com/blog/contact-page-conversion/), 2026 design trends (https://hookagency.com/blog/contractor-website-design-trends-2026/)
- FreshySites best landscaping websites 2026 (https://freshysites.com/web-design-development/best-landscaping-company-websites/)
- ServiceTitan 18 best roofing websites (https://www.servicetitan.com/blog/roofing-websites)
- WebCitz best concrete websites (https://www.webcitz.com/blog/best-concrete-websites/)
- Blue Corona landscaping web design page and case studies (https://www.bluecorona.com/?p=66463, https://www.casestudies.com/company/blue-corona)
- Invoca home services marketing stats (https://invoca.com/blog/home-services-marketing-stats) and 2026 benchmarks report
- BrightLocal Local Consumer Review Survey 2026 (https://www.brightlocal.com/research/local-consumer-review-survey/)
- Venture Harbour form length research (https://ventureharbour.com/how-form-length-impacts-conversion-rates/)
- PipelineOn click-to-call placement and contractor conversion rate posts (https://pipelineon.com/blog/click-to-call-button-placement/, https://pipelineon.com/blog/contractor-website-conversion-rate/)
- Americaneagle Techo-Bloc project page (https://www.americaneagle.com/projects/detail/techo-bloc)

---

# Half (a): design showcase sites

Record format: Name, URL, type/location, platform; homepage section order; imagery, typography, palette and layout; trust signals, CTAs, navigation, mobile; scores; borrow/avoid.

## 1. Unilock

- **URL:** https://www.unilock.com/ (inner: /products/)
- **Type/location:** Paver and wall manufacturer, Ontario and US Northeast/Midwest. Direct competitor supplier to Alpha Hardscapes' market (CT is Unilock territory).
- **Platform:** WordPress, custom theme "unilock", Swiper carousels, HubSpot forms, accessibility toolbar, "Website by ITW" credit.
- **Homepage section order:** audience utility bar (Contractor / Commercial / Homeowner, region picker, EN/FR) > main nav with toll-free number and "Get a Free Estimate" > hero "Transform Your Outdoor Space" with a six-tile product grid (Pavers & Slabs, Walls, Fire Features, Step Units, Natural Stone, Coping) > "We're here to help" three cards (Catalog of Dreams, free estimate, Project Planning Guide) > Idea Center video promo > "Get Inspired" use-case tiles (Driveways, Pool Decks, Fire Features, Outdoor Living, Walkways, Front Entrances) > feature bands (EasyClean stain protection, Quarry Smooth, U-Cara, Natural Stone) each with one CTA > testimonials with first name + town > knowledge-centre articles > five-column footer.
- **Imagery:** Large professional installation photography, WebP, every tile is a finished space not a product swatch. Product cards on /products/ use square crops with uppercase product name, one-line description, application tags and a text list of colours. Filters: Category, Style (Modern / Traditional / Rustic), Colour, Price ($ to $$$$), Technologies.
- **Typography (inferred from markup):** uppercase section headings and product names; sans-serif throughout; fonts are self-hosted so not visible in the fetch.
- **Palette (inferred):** neutral charcoal and white chrome; colour comes from the stone photography. No loud accent colour competing with product.
- **Layout:** full-width image bands alternating with card grids; the "tile grid of six" is the recurring module.
- **Trust signals:** Lifetime guarantee and transferable lifetime guarantee, Unilock Authorized Contractor programme with a minimum two-year workmanship guarantee, ASTM/CSA standards, testimonials, Where to Buy.
- **CTAs:** "Get a Free Estimate", "Request your free estimate", "Find A Contractor", "Order a Catalog", "Download Project Planning Guide", "Explore Catalog of Dreams", "Learn More" (generic, overused).
- **Navigation:** DREAM, Products (mega menu), Learn, Request a Catalog, Get a Free Estimate, Where to Buy, Idea Center; audience selector overlay on first visit.
- **Mobile notes:** Swiper-based tile carousels; audience/region popup adds friction on first load.
- **Design quality: 7/10.** Disciplined grid and consistent photography, but the page is long and repetitive, and "Learn More" is used everywhere.
- **Lead-gen effectiveness: 6/10** (as a manufacturer): free-estimate and catalog requests are everywhere, but it routes homeowners to contractors rather than closing anything itself.
- **Borrow:** (1) The use-case tile grid (Patios, Walkways, Pool Decks, Fire Features, Driveways, Front Entrances) as the primary way into services, each tile a finished local project. (2) "Project Planning Guide" as a lead magnet for early-stage homeowners who are not ready for an estimate.
- **Avoid:** The audience/region interstitial, and a dozen identical "Learn More" buttons.

## 2. Belgard

- **URL:** https://www.belgard.com/ (inner: /products/)
- **Type/location:** National paver and wall brand (Oldcastle APG), Atlanta HQ.
- **Platform:** WordPress on Kadence theme (child theme), WP Rocket caching, Americaneagle.com build. Fonts: Rajdhani (headings) and Manrope (body).
- **Homepage section order:** utility bar with Homeowner / Professional toggle, brand switcher and language > primary nav (Inspiration, Design + Services, Resources, About, Support) with "Find a Contractor" and "Find a Dealer" buttons > hero carousel of four slides ("DESIGNED FOR REAL LIFE / Make outside your best room / Get Inspired", "DESIGN WITH PURPOSE", "Patio transformation ideas in seconds with YardAI / TRY IT NOW", "YOUR OASIS AWAITS / Find a Contractor") > Explore Products six cards > Belgard Rooms planner (Outdoor Kitchen, Outdoor Living Room, Outdoor Dining Room, Outdoor Office) > Porcelain feature > Pools feature > Fire feature > Resource Center pills and cards > "Spaces that tell a story" project gallery (co-branded with designers, e.g. Belgard x Tan France) > "Outdoor Living Awaits / Let's build something beautiful together" with "Find a SALES REP" and "Chat with an expert" > newsletter > footer.
- **Imagery:** Lifestyle photography of people using outdoor rooms, not empty patios. Products on /products/ are 512x512 square cards with a primary and "alternate view" image, colour names as text with "+N more", price tier in dollar signs, application tags, and a zip-code based "showing products available in {zip}" availability filter.
- **Typography:** Rajdhani is a condensed, squared technical sans used for eyebrow labels in all caps ("THE ART OF WARMTH", "COOL, CALM, COHESIVE") over title-case headlines; Manrope body. Strong eyebrow-headline-CTA rhythm on every band.
- **Palette (inferred):** dark charcoal/near-black sections alternating with warm off-white; one muted accent. The brand leans warm and editorial.
- **Layout:** Alternating full-bleed image-left/text-right bands, each with exactly one CTA. Eyebrow + headline + one sentence + button.
- **Trust signals:** Oldcastle APG parent, Authorized Contractor programme, Contractor Rewards, Financing Options, Product Warranty, named designer collaborations, Southern Living Showcase Home.
- **CTAs:** "Get Inspired", "START PLANNING", "TRY IT NOW", "Find a Contractor", "Explore the collection", "Find a SALES REP", "Chat with an expert", "Sign Up".
- **Navigation:** Mega menus by application (Patios + Paths, Driveways, Wall Systems, Outdoor Kitchens, Fire Features, Hardscape Accessories).
- **Mobile notes:** heavy page (about 1 MB HTML) and a four-slide hero; lazy-loaded SVG placeholders.
- **Design quality: 8/10.** The eyebrow/headline system and the "outdoor rooms" framing are the most sophisticated brand storytelling in the category.
- **Lead-gen effectiveness: 6/10.** Many parallel paths (contractor, dealer, sales rep, chat, quiz, AR) dilute the one action.
- **Borrow:** (1) The "outdoor rooms" framing (Outdoor Kitchen, Outdoor Living Room, Outdoor Dining Room) to sell a patio as a room, not a surface. (2) Eyebrow + headline + single CTA band rhythm, with a condensed display face for eyebrows and a humanist sans for body.
- **Avoid:** Four-slide hero carousels and four competing contact paths.

## 3. Cambridge Pavingstones with ArmorTec

- **URL:** https://www.cambridgepavers.com/ (inner: /design-gallery)
- **Type/location:** Northeast paver manufacturer, Lyndhurst NJ. Heavily stocked by CT dealers.
- **Platform:** Legacy custom build (no CMS fingerprints; /images/, /graphics/, /dfiles/ paths), Google Fonts Prata (serif display), Raleway, Roboto, plus unused Pacifico, PT Serif and Alice loaded.
- **Homepage section order:** social icon bar and audience links (Contractors, Designers, Distributors) > header with tagline "Pavingstones Sold. Over 3 BILLION!" > three-slide hero ("CAMBRIDGE PAVINGSTONES", "THE ARMORTEC DIFFERENCE", "NEED A PROFESSIONAL INSTALLER?") > "With ArmorTec... Your Outdoor Dreams Come True!" > Digital Catalog (flip book, PDF, visualizer), 2D/3D modeling assets, Events Calendar, TV commercial modal > Quick Resources sidebar > three product category cards (Pavers & Slabs, Wallstone Systems, Outdoor Living) > Transferable Lifetime Warranty banner > "Quality without the premium price" > link columns > footer with "Cambridge is not open to the public".
- **Imagery:** Hero slides and category cards; design gallery is a seven-category tile index (Outdoor Living, Patios & Pools, Driveways, Steps & Walkways, Landscape Walls, Inlays & Unique Applications, Birds Eye View) with no per-project captions and a disclaimer that colours must be confirmed from physical samples.
- **Typography:** Prata serif display in all caps with italicised key words ("THE ARMORTEC *DIFFERENCE*"), Raleway/Roboto body. Dated hierarchy (H4/H5 used as section heads).
- **Palette (inferred):** brand green and gold on white; busy sidebar.
- **Layout:** Three-column rows with a persistent quick-links sidebar; feels 2012.
- **Trust signals:** "Over 3 BILLION" sold, transferable lifetime warranty, American manufacturer, contractor events, physical address, Find a Pro Installer.
- **CTAs:** "View Products", "Learn More", "View Flip Book", "Download PDF", "Locate a Contractor!", "Find a Professional Installer", "Need Financing?".
- **Navigation:** PRODUCTS (dropdown with ~19 Outdoor Living items), DESIGN GALLERY, HOMEOWNERS, BLOG, DEALER LOCATOR.
- **Mobile notes:** sidebar and three-column grids collapse poorly; loads six Google font families.
- **Design quality: 4/10.** Strong brand recognition but visually dated; the gallery lacks captions and filters.
- **Lead-gen effectiveness: 5/10.** The "Need a professional installer?" slide and "Locate a Contractor!" are good intents, but the warranty and financing are buried.
- **Borrow:** (1) Make the warranty a banner-level promise ("Transferable Lifetime Warranty" is understood by homeowners instantly). (2) The "Birds Eye View" gallery category: drone shots of whole-yard projects sell scope.
- **Avoid:** Uncaptioned gallery tiles with a disclaimer; loading six typefaces.

## 4. Nicolock Paving Stones

- **URL:** https://www.nicolock.com/ (inner: /find-a-contractor/)
- **Type/location:** Family-owned paver manufacturer, Lindenhurst NY; strong CT/Long Island distribution.
- **Platform:** WordPress + Elementor (theme "gb-proactive"), Swiper, HubSpot, Lottie. Fonts: Bebas Neue Book (display) and Lato (body), some Source Sans Pro.
- **Homepage section order:** announcement bar "28 Color Blends - the Most Vibrant Color Blends in the Industry" > header (search, Events, Dealer Login, menu) > hero "THE ART OF OUTDOOR LIVING" + "Browse Products" > four value props (50+ Years Family Owned, 100% U.S. Manufactured, Fully Transferable Lifetime Warranty, Certified Hardscape Pro Network) > "How to get started" three path cards, "Match with a Certified Pro" tagged MOST POPULAR > "Join the Hardscape Pro Network" > New Products nine-card grid > AR Gallery promo > 2026 catalog video > Design Studios > North Carolina expansion > ten category tiles each "Learn More" > brand history > three testimonials > Design Center > "Live Life in color" > catalogs > newsletter > footer with seven regional locations and member logos.
- **Imagery:** Product-forward (named blends like "Blue Ridge Contemporary 80MM", "Sedona Wall"), category tiles, lazy-loaded placeholders. Colour is the brand story.
- **Typography:** Bebas Neue all-caps condensed display over Lato body, a classic contractor-industrial pairing that reads bold on mobile.
- **Palette (inferred):** black/charcoal and red brand chrome; stone photography supplies the warmth.
- **Layout:** Elementor sectioning, roughly nineteen sections; long but clearly chunked with icon rows.
- **Trust signals:** 50+ years family owned, 100% US made, transferable lifetime warranty, Certified Hardscape Pro "Shield of Approval", five-year-or-more workmanship guarantee from certified contractors, Houzz, member logos.
- **CTAs:** "Browse Products", "Find a Contractor", "Find a Dealer", "Become a Hardscape Pro", "Get Started!", "Tour the design center", "View Catalogs".
- **Inner page (Find a Contractor) form fields in order:** First Name, Last Name, Street Address, City, Zip, State, Email, Phone, Best Time to be Reached (7 AM to 7 PM), How Did You Hear About Us, project checkboxes (Patio, Driveway, Walkway, Pool Deck, Retaining Wall, Fireplace, Fire Pit, Outdoor Kitchen). Button "Find a Contractor". Eleven required fields: far too long for a first touch.
- **Navigation:** Mega menu including tools (Color Tool, Paver Calculator, Retaining Wall Calculator, Knowledge Base).
- **Mobile notes:** 500 KB HTML, 800+ Swiper references; heavy.
- **Design quality: 6/10.** Clear hierarchy and confident type, but Elementor bloat and too many sections.
- **Lead-gen effectiveness: 6/10.** The four-value-prop strip and "MOST POPULAR" path card are excellent patterns; the eleven-field form is the opposite.
- **Borrow:** (1) The four-icon value-prop strip directly under the hero (years, local, warranty, certified). (2) Project-type checkboxes (Patio, Walkway, Retaining Wall, Fire Pit, Outdoor Kitchen, Pool Deck) on the estimate form, as the one qualifying question.
- **Avoid:** Eleven required fields including "best time to reach you" and "how did you hear about us" before anyone has spoken to the homeowner.

## 5. Eldorado Stone (Westlake Royal Building Products)

- **URL:** https://www.westlakeroyalbuildingproducts.com/stone/eldorado-stone (inner: /gallery)
- **Type/location:** Manufactured stone veneer brand, now a section of the Westlake Royal site. Relevant for Alpha's masonry, veneer and outdoor kitchen work.
- **Platform:** Drupal (/sites/default/files/, image style "large_16_9"), Canto DAM, RenoWorks visualizer, BIMsmith; bot-protected (403 to direct fetch, readable via a reader proxy).
- **Homepage section order:** header (Products, Inspiration, Resources, For Pros, Where to Buy, Contact, Favorites, "Order Samples (0/3)" cart) > looping hero video with H1 "Stone Veneer That Feels Natural" > "Crafting Beauty, One Stone at a Time" + "Explore all Products" > six profile tiles (Brick, Irregular, Ledge, Ashlar, Large Format, Wood) > four colour tiles (Brown, Gray, Black, White & Cream) > "Crafted by Nature, Perfected by Design" six project cards > three resource cards (Stone Guide, Artistry video, Find Near You) > footer.
- **Imagery:** Realistic interior and exterior lifestyle photography, stone always in context (fireplaces, facades, outdoor kitchens). Gallery: 456 results, 16:9 tiles, caption = brand | product line | colour ("Vantage30 | White Elm"), filters by Area of Home, Color Family, Project Type, Style, Profile; "Show More +" loader; Favorites and a three-sample cart gated by zip code.
- **Typography (inferred):** restrained sans, sentence-case H2s written as paired phrases ("Authentic Colors. Unmatched Character.").
- **Palette (inferred):** warm neutral page with stone browns/greys; the product colour tiles become the palette.
- **Layout:** Rigid tile grids of six and four; the most "catalogue-clean" of the manufacturers.
- **Trust signals:** Certified Installer Program, ASTM C1670, warranty registration, "over 150 colors and profiles", Stone 101 Guide.
- **CTAs:** "Get Started" (header), "Explore all Products", "View Details", "Explore the Gallery", "Download the Guide", "Request a Sample", "Find a Dealer", "Order Samples".
- **Navigation:** Products, Inspiration (Gallery, Blog, Design Tool), Resources, For Pros, Where to Buy.
- **Mobile notes:** duplicate desktop/mobile menus in markup; video hero.
- **Design quality: 8/10.** Cleanest grid discipline in the category; captions make every image a material spec.
- **Lead-gen effectiveness: 5/10.** Sample ordering is a strong micro-conversion but everything else is brand browsing.
- **Borrow:** (1) Caption every portfolio image with material and colour ("Unilock Beacon Hill Flagstone, Almond Grove") so the gallery doubles as a spec sheet. (2) A filterable gallery by Area (Patio, Walkway, Pool Deck, Fire Feature, Outdoor Kitchen) and Style, with a "Show More" loader instead of pagination.
- **Avoid:** Burying a brand inside a parent-company site structure with ten-level URLs.

## 6. Hollander Design Landscape Architects

- **URL:** https://www.hollanderdesign.com/ (inner: /projects/)
- **Type/location:** AD100 residential landscape architecture firm, New York, Sag Harbor, Chicago.
- **Platform:** WordPress on a Bedrock-style /app/ layout with a custom theme "mies", GSAP animation, Google Site Kit. Fonts: Open Sans (body) and Aleo (slab serif accent).
- **Homepage section order:** logo + six-item nav (Portfolio, Firm, Awards, News, Careers, Contact) > full-width hero image with category tags (Contemporary, Home, Traditional) > vertical feed of nine large project entries (Linden Hill, The Belnord, Topping Pool, Farm Fields, The REACH at the Kennedy Center, Fowler's Beach, 11 Hoyt...) each with one wide image, title and tags > "Selected Works" eight-card 3:2 grid > "View more" > footer with two office addresses, phones and social.
- **Imagery:** Photography only; no icons, no stock. Wide 16:9 / 3:2 crops; thumbnails 400x267 (3:2). Minimal captions: title + category tags.
- **Typography:** Open Sans at generous sizes with Aleo slab serif for accents; "HOLLANDER design / LANDSCAPE ARCHITECTS" masthead in mixed case/caps. Restrained.
- **Palette (inferred):** white and black with a white/black logo swap on image; no accent colour.
- **Layout:** One column of very large images with lots of air, then a dense selected-works grid. Portfolio page: filters by Project Type (Home, Community, Multifamily, Hospitality) and Style (Contemporary, Waterfront, Traditional, Urban), "Load More" with a spinner.
- **Motion:** GSAP present; likely fade/parallax on scroll and an overlay menu ("Close" label).
- **Trust signals:** Awards page, AD100, ASLA honours, two offices with phone numbers.
- **CTAs:** "View Project", "View more", "Load More". No lead CTA at all.
- **Navigation:** Six items, overlay menu on mobile.
- **Mobile notes:** image-heavy but lazy loaded; single-column feed works naturally.
- **Design quality: 9/10.** The standard for "let the work speak": one image per project, enormous, uncaptioned.
- **Lead-gen effectiveness: 2/10.** Deliberately none; a referral business.
- **Borrow:** (1) The large single-image project feed for a "Featured Projects" page, with project type and style tags as filters. (2) A quiet slab-serif accent face for project titles against a humanist sans body.
- **Avoid:** No CTA anywhere on the homepage; Alpha cannot afford this.

## 7. Nelson Byrd Woltz Landscape Architects

- **URL:** https://www.nbwla.com/ (inner: /work)
- **Type/location:** Nationally awarded landscape architecture practice, Charlottesville VA and New York.
- **Platform:** Custom build; no CMS or font fingerprints in the HTML (self-hosted assets, lazy-loaded base64 placeholders).
- **Homepage section order:** nav (Work, Studio, Process, In Progress, News & Insights, Contact, Search) > hero headline "Land tells a story." with subline "Nelson Byrd Woltz reveals the beauty and complexity of the natural world and our place within it." and one CTA "Our Design Process" > six stacked title + location links (awards and project news) > "Featured Work" three cards with theme label, project name, location > "The Latest" three news items > "Our New Book" with "Purchase the Book" > footer.
- **Imagery:** Large-format landscape photography; the /work page offers 4:3 cards, three display modes (grid, large, text), 18 category filters and sort by Featured / Date / A-Z.
- **Typography (inferred):** a single refined sans at large sizes; three-word headline; project titles with a small location line.
- **Palette (inferred):** off-white, dark ink, no accent.
- **Layout:** Text-led hero (no hero image), then cards. Shows that a strong sentence can replace a hero photo.
- **Motion:** progressive image loading (blurred placeholders), filter drawer.
- **Trust signals:** 100+ national and regional awards, TN ASLA Excellence Award, LUXE Gold List, a published book.
- **CTAs:** "Our Design Process", "All News & Insights", "Purchase the Book".
- **Navigation:** Work / Studio / Process / In Progress / News / Contact.
- **Mobile notes:** text hero loads instantly; card grid collapses cleanly.
- **Design quality: 8/10.** Editorial confidence; the three-word hero and "Process" as a first-class nav item are notable.
- **Lead-gen effectiveness: 2/10.** Institutional work; Contact only.
- **Borrow:** (1) A one-line hero statement plus a "How we work" (Process) CTA, since hardscape buyers worry about what happens between deposit and finished patio. (2) Grid / large / text view toggle on the portfolio.
- **Avoid:** A homepage with no image above the fold for a visual trade; works for NBW, would hurt a contractor.

## 8. Tom Stuart-Smith Studio

- **URL:** https://tomstuartsmith.co.uk/ (inner: /projects)
- **Type/location:** Garden designer, Hertfordshire UK; Chelsea gold medals, Chatsworth, Windsor Castle.
- **Platform:** Nuxt (Vue) front end with Sanity headless CMS; custom webfont Neuzeit (a 1928 geometric grotesque) used for everything including the logo.
- **Homepage section order:** studio name > four-item nav (Projects, About, The Barn Garden, The Serge Hill Project) > image-led content (not captured in text). Projects page: "Filter by category" (Public, Private (City), Private (Country), Show Gardens, Wellbeing, In Progress) then ~70 title-only project links, loosely reverse-chronological (2026 Chelsea first). Footer: Contact, Careers, Privacy.
- **Imagery:** Photography carries the whole site; captions are titles only ("Kent Garden", "Chatsworth").
- **Typography:** One typeface (Neuzeit), small sizes, lower contrast; the type recedes and the gardens dominate.
- **Palette (inferred):** white, grey text; planting colour from photos.
- **Layout:** Minimal, text list portfolio; no hero copy, no CTAs.
- **Motion:** Nuxt page transitions likely; nothing heavy.
- **Trust signals:** Project names themselves (Windsor Castle, Chatsworth, RHS Chelsea shows by year).
- **CTAs:** none beyond filters and Contact.
- **Navigation:** Four items; two named gardens as destinations.
- **Mobile notes:** lightweight (138 KB HTML), fast.
- **Design quality: 8/10.** Pure restraint; one typeface, no colour, no UI chrome.
- **Lead-gen effectiveness: 1/10.** By design.
- **Borrow:** (1) The single-typeface discipline: one well-chosen grotesque at two or three sizes is enough. (2) Category filters that mirror how clients think (Private (City) / Private (Country)), which for Alpha becomes Patios / Walkways / Walls / Pools / Outdoor Kitchens / Fire.
- **Avoid:** Title-only project lists; homeowners need a photo, a town and a one-line scope.

## 9. Garden Architecture (Berkeley, CA) - Webflow showcase

- **URL:** https://www.gardenarchitecture.biz/ (inner: /projects)
- **Type/location:** Landscape architecture AND build firm, Berkeley CA, 120+ projects; Houzz typical job cost USD 20k to 500k. The closest analogue in half (a) to Alpha's design-build model.
- **Platform:** Webflow (data-wf-site, cdn.prod.website-files.com), designed by Vestaso; listed in Webflow's Made in Webflow showcase.
- **Homepage section order:** logo + four-item nav (Home, About, Projects, Contact) > full-screen six-image slideshow with the one line "we design Custom landscapes in The Bay Area" (separate desktop and mobile image sets) > footer (Privacy, "2022 (c) Garden Architecture", Houzz icon, designer credit). That is the entire homepage.
- **Imagery:** Six hero slides of finished gardens; Projects page is a card grid with small category label (Residential / Retreat / Commercial), title case project names ("Berkeley Oasis", "Piedmont Pool Terrace", "Modern Master in Marin"), "Load More", and "Let's Talk About Your Project ->" CTA.
- **Typography (inferred):** all-caps page titles ("OUR PROJECTS"), small caps category labels, light sans.
- **Palette (inferred):** white chrome, photo-led.
- **Layout:** Single-screen homepage; portfolio grid with filters; contact form (Webflow native success/error states).
- **Motion:** Slideshow crossfade.
- **Trust signals:** Houzz profile only; 2022 copyright signals neglect.
- **CTAs:** "Let's Talk About Your Project" (projects page only), "Load More", "View All".
- **Navigation:** Four items.
- **Mobile notes:** separate mobile image set is a nice performance touch; 21 KB HTML.
- **Design quality: 7/10.** Elegant and fast, but the homepage says almost nothing and the copyright is four years stale.
- **Lead-gen effectiveness: 3/10.** One CTA, on a secondary page; no phone, no service area beyond "The Bay Area".
- **Borrow:** (1) Project naming by town + feature ("Piedmont Pool Terrace", "Berkeley Hills Refuge") which is both evocative and local-SEO friendly: "Cheshire Bluestone Patio", "Southington Pool Deck". (2) "Let's Talk About Your Project" as a softer secondary CTA wording alongside "Get a Free Estimate".
- **Avoid:** A homepage that is only a slideshow; no services, no proof, no phone.

## 10. The Garden Practice (Gold Coast, AU) - Framer gallery

- **URL:** https://www.thegardenpractice.com.au/ (inner: /projects)
- **Type/location:** Landscape design studio (landscape architect Candice Teok), Gold Coast / Brisbane / Byron Bay.
- **Platform:** Framer (generator meta), designed by Arbi Khan; fonts Inter Display and Inter (UI), Archivo and General Sans (headings), Amiri (serif accent), Fragment Mono (labels/numbers).
- **Homepage section order:** hero "Crafting gardens across Gold Coast, Brisbane and Byron Bay" + display line "Gardens for a Life Well Lived." + "We design deeply personal gardens..." with CTAs "Explore our gardens" and "Begin your project" > Our Studio (founder intro, planting-first philosophy) > "Every Garden has a Story" two project features > "Two Ways to Begin" (The Garden Direction workshop vs full Garden Design) > "Shaping a Garden" three feature blocks (A Sense of Seclusion, Designed to Mature, Planting as Architecture) > Inside the Studio photography > Our Process six numbered steps 01-06 with stated durations ("1 Week", "4-8 months") > two testimonials carousel > footer with "Book a Discovery Call", "Book a 15-Minute Introduction Call", "Tell us about your place", Instagram.
- **Imagery:** Credited photographer (John Benedict Ryan), "dappled light, raw materials"; projects presented as full-width numbered entries ("View Project 1") with title, narrative and location.
- **Typography:** Five-family system: a grotesque for UI, a display sans for headlines, a serif (Amiri) for emotive lines, a mono for numerals and labels. Sentence-case headlines, small-caps eyebrow labels.
- **Palette (inferred):** "nature-inspired" warm neutrals (sand, olive, charcoal).
- **Layout:** Long-scroll narrative with numbered process; Framer scroll-reveal motion likely.
- **Motion:** Framer default scroll animations; testimonial carousel.
- **Trust signals:** named founder, named photographer, named clients with suburbs, process durations, Instagram.
- **CTAs:** "Explore our gardens", "Begin your project", "See What We've Created", "Explore this service", "Explore Our Approach", "Get to know Candice", "Book a Discovery Call", "Book a 15-Minute Introduction Call", "Tell us about your place".
- **Navigation:** Projects, Services, Studio, Contact, Journal.
- **Mobile notes:** Framer output is heavy (514 KB HTML) but responsive by default.
- **Design quality: 8/10.** The best narrative structure of the ten; "Two Ways to Begin" and a timed six-step process turn a design service into something a client can picture buying.
- **Lead-gen effectiveness: 6/10.** Low-friction "15-Minute Introduction Call" is smart; inconsistent CTA labels (Discovery vs Introduction) and only two projects shown.
- **Borrow:** (1) "Our Process" with six numbered steps and real durations (Consultation, Site Measure, Design, Proposal, Build, Walkthrough), which answers the biggest hardscape-buyer anxiety. (2) "Two Ways to Begin": a lower-commitment entry (free estimate / design consultation) beside the full design-build path.
- **Avoid:** Two differently named booking CTAs; a five-typeface system is beyond what a contractor site needs to maintain.

## Noted: Techo-Bloc (not fetched)

- **URL:** https://www.techo-bloc.com/ returned a "Performing security verification" interstitial via WebFetch, curl with a browser UA, and a reader proxy; web.archive.org is not reachable from this environment.
- **Second-hand:** Americaneagle's project page says the current site runs on ROC Commerce with a custom CMS, bilingual EN/FR, rebuilt after a failed replatforming; trade press notes a "professional project planner" and shareable image library. From prior knowledge of the brand, Techo-Bloc's site is the most editorial of the manufacturers: near-black chrome, dramatic dusk photography, large sans display type, product "collections" presented like fashion, and a prominent "Find a Contractor" plus "Request a Quote" pair. Treat as unverified for this round; a rendered-browser pass is worth doing because its visual language is the one most hardscape contractors in CT try to imitate.

---

# Half (b): highest-converting local contractor sites

Record format: Name, URL, type/location, platform; homepage section order; conversion elements; trust, CTAs (wording, placement, fields), navigation, mobile; scores; borrow/avoid.

## 11. Northface Construction (Elk River / Minneapolis, MN)

- **URL:** https://northfaceconstruction.com/ (inner: /roofing/albertville-mn/)
- **Type/location:** Roofing, siding, windows, gutters; GAF Master Elite; 16+ years; two offices. Hook Agency build and long-running Hook case client.
- **Platform:** WordPress, custom build (Hook), OneTap accessibility, reCAPTCHA, YouTube, lazy placeholders.
- **Homepage section order:** top bar "Give Us A Call (763) 433-2269" + "Schedule Appointment" > hero "5-Star Minneapolis Roofing Contractor / Protecting Minneapolis Families with Trusted Roofing & Exteriors" with embedded quote form, three trust bullets (GAF Master Elite Roofers, Local Minnesota Roofing Contractors, Flexible Financing Options) and "Get to Know Northface" video link > rating badges (4.9, A+, 5.0) > "Built for Minnesota Weather" > "How Minneapolis Homes Wear Down Over Time" > six service cards > single Google review (Doug G.) > services band > "Devoted To Serving Families" office locations > "Our Simple Process" five steps (Customer for Life, Chat With the Office, Sales Rep, First Meeting & Inspection, Project Day, Wrap-Up) > four recent projects > customer care > community/team video > materials (GAF, EDCO, Brava) > 39-city list > five-question FAQ > CEO quote and three blog cards > closing CTA > footer with Hook credit and 40-language selector.
- **Conversion elements:** hero-embedded form; phone in header, hero, offices and footer; financing in hero bullet, FAQ and nav; rating badge strip immediately below hero; 39 linked city pages; process section; SMS consent built in; no promo banner; no chat widget; sticky behaviour not confirmable from text.
- **Form fields (hero, in order):** Name*, Phone*, Email*, Zip Code*, What Service Do You Need?* (11-option dropdown), How You Heard About Us* (13 options), Consent* checkbox. Button "Get My Free Quote". Honeypot "Company". Seven visible required inputs: too many for a hero form.
- **Trust signals:** 4.9 / A+ / 5.0 badges (platforms unnamed, no counts), GAF Master Elite, 19-Point Inspection Process, family-owned, brand logos, two street addresses.
- **CTAs:** "Schedule Appointment" (header, mid-page, footer), "Get My Free Quote" (form), "Schedule an Inspection", "View All Services". Two primary actions compete.
- **Inner page (Albertville, MN):** H1 "Top-Tier Roofing Services In Albertville, MN", ~1,000-1,200 words, same form minus address, same five-step process, five inline Q&As, one review. City name appears four or five times; no landmarks, neighbourhoods or local projects. Template duplication risk is high across 39 pages.
- **Navigation:** About, Services (12), Resources (Financing, FAQs, Project Gallery, Blog), YouTube, Contact.
- **Mobile notes:** "Give Us A Call" bar at top; language selector adds weight; typos ("w're proud to servce").
- **Design quality: 6/10.** Clean and consistent but generic Hook template feel; repeated heading.
- **Lead-gen effectiveness: 8/10.** Form above the fold, phone everywhere, financing in hero, process section and 39 city pages are the standard high-converting roofer playbook.
- **Borrow:** (1) Three trust bullets inside the hero next to the form (for Alpha: "ICPI Certified Installers", "Cheshire-based, serving New Haven & Hartford counties", "Financing available"). (2) "Our Simple Process" with named stages including "Chat With the Office" and "Project Day".
- **Avoid:** Thin city pages that swap only the town name, and the "How did you hear about us" dropdown on the first form.

## 12. The Roof Tiger (Peoria, IL)

- **URL:** https://therooftiger.com/ (inner: /financing/)
- **Type/location:** Residential and commercial roofing, solar, gutters; GAF Master Elite. Hook Agency build.
- **Platform:** WordPress, custom theme "the-roof-tiger-theme", Smash Balloon reviews-feed-pro and youtube-feed-pro.
- **Homepage section order:** header with phone icon link (309) 505-7627 and "Get My Instant Roof Quote" + a second bar with "Instant Quote" and "Schedule Now" (a mobile sticky-bar pattern in markup) > hero "Put A Tiger On Your Roof" + "Get My Instant Roof Quote" > three service cards > "More Stripes. More Roofing Installation Solutions in Peoria, IL" > free inspection CTA > GAF Master Elite block with "What does that mean for you?" explainer > "Rave Reviews For Our Crews" Google review carousel with "Load More" > five-step process > "Serving Peoria and Central Illinois" > "Affordable Roofing Is Just A Click Away" financing teaser > single testimonial > video resources > founder message > Company Promise > project gallery > FAQs > blog > three-step estimate form "Ferocious Roofing / Lock In Your Savings Today" > footer with BBB seal.
- **Conversion elements:** multi-step form (service checkboxes > zip > contact), live Google review feed with relative timestamps, GAF badge with plain-English explainer, financing page with its own pre-application form and FAQ, founder video, mobile two-button bar.
- **Form (3 steps):** Step 1 service checkboxes (Residential Roofing, Commercial Roofing, Storm Damage, Solar Panels, Gutters, Siding) "Next Step"; Step 2 "Where is your project located?" Zip Code; Step 3 Full Name, Phone Number, Email Address, Street Address, City, State, SMS consent; button "Get My Free Estimate". Financing page form: Full Name, Phone, Email, Street, City, State, ZIP (all required).
- **Trust signals:** GAF Master Elite, BBB Blue Seal, Google reviews feed, "licensed and insured", warranties (no terms), founder message, address.
- **CTAs:** "Get My Instant Roof Quote", "Schedule your free inspection", "Get My Free Estimate", "Instant Quote", "Schedule Now", "Lock In Your Savings Today", "Learn More About Financing". Too many variants.
- **Navigation:** Services (7), About, Resources (FAQs, Financing, Blog, Videos, Instant Roof Quote), Project Gallery, Contact.
- **Mobile notes:** two-button bar in markup suggests a fixed bottom bar; forms are thumb-friendly by being stepped.
- **Design quality: 6/10.** Memorable brand voice ("Put A Tiger On Your Roof", "Rave Reviews For Our Crews") but a very long page.
- **Lead-gen effectiveness: 8/10.** The stepped form that asks "what and where" before "who" is the single best form pattern found in this research.
- **Borrow:** (1) Three-step estimate form: project type checkboxes > zip/town > contact. (2) Credential explainer tooltip ("ICPI certified: what does that mean for you?").
- **Avoid:** Six CTA labels for the same action; name inconsistency (LLC vs PLLC) in trust seals.

## 13. Capstone Roofing (Santa Rosa, CA)

- **URL:** https://capstoneroofing.biz/ (inner: /financing/)
- **Type/location:** Residential and commercial roofing, 35+ years, 20,000+ roofs; GAF Master Elite, Diamond Certified. Hook Agency build, featured in Hook's 2025 and 2026 articles for "blue banner, contact info, free inspection CTA".
- **Platform:** WordPress, theme "capstone-roofing", reviews-feed-pro, JSON-LD RoofingContractor schema with opening hours.
- **Homepage section order:** header with phone (707) 575-3577 > hero "Roofing: It's not for the faint of heart." with three bullets (Residential & Commercial, 35+ Years, Free Estimates Provided) > review/award strip (Yelp 4.8, Google 5.0, BBB A+, Best of Sonoma) > lead form "We're Here To Help" > two service cards > trust badge row (BBB, Best of 2024, GAF Master Elite) > testimonial + company intro (35+ years, 20,000+ replacements) > re-roofing and warranties (50-year GAF, 5-year workmanship) > review > four-step process (Contact, Free Inspection, Get Right To Work, Final Checks) > financing, warranties and discounts (seniors and military) > same-day replacement > review with photo > estimate/value > nine-review Google feed > family history > FAQ > blog > closing CTA with repeated ratings.
- **Conversion elements:** ratings strip above the form; form near top; GoodLeap financing with its own page and short "Apply Today" form (First, Last, Email, Phone, ZIP, consent); discounts for seniors and veterans; same-day inspection promise; schema markup.
- **Form fields (homepage):** First Name*, Last Name*, Email Address*, Phone Number*, ZIP Code*, Select Your Service* (5 options), Consent*; button "Get Your Free Inspection".
- **Trust signals:** Yelp 4.8, Google 5.0, BBB A+ (no counts), Best of Sonoma County, Diamond Certified, GAF Master Elite, 50-year material + 5-year workmanship warranty, "20,000+ roof replacements".
- **CTAs:** "Get Your Free Inspection" (primary, repeated), "Request Your Free Estimate", "See Financing Options", "Get a Free Quote", "See All Services".
- **Navigation:** Services, Residential, Commercial, About, Contact, Financing, Blog.
- **Mobile notes:** phone only in header; no sticky bar evident; ratings strip is compact enough for mobile.
- **Design quality: 7/10.** Bold headline and clear band structure; Hook cites the blue header banner as a model.
- **Lead-gen effectiveness: 8/10.** Ratings strip directly above the form and a single consistent primary CTA ("Get Your Free Inspection") is textbook.
- **Borrow:** (1) The three-platform ratings strip (Google, Houzz, BBB) sitting immediately above the estimate form. (2) Named quantities: "35+ years, 20,000+ roofs" becomes "20+ years, 1,000+ patios in Connecticut" for Alpha.
- **Avoid:** Inconsistent experience claims (35+ years on page vs "nearly 30" in schema); uniformly dated review feed.

## 14. Guardian Roofing (Puget Sound WA and Portland OR)

- **URL:** https://www.guardianroofing.com/ (redirect from guardianhome.com)
- **Type/location:** Multi-branch roofing, gutters, attics; six offices; cited by ServiceTitan for "minimalist homepage with orange CTAs, service pages, reviews and accolades". Ferocious Media build.
- **Platform:** WordPress, WebP, Google review embeds.
- **Homepage section order:** utility header (service areas, Guardian Protection Plan, financing, phone 877-926-9966, "Book Online", 4.8 rating, 2026 award badge) > main header repeating phone and "Book Online" (sticky pattern) > hero "Protecting What Matters Most, One Roof at a Time" + "Free Estimate" > five icon service tiles > about snippet (17-point digital roof analysis, 100% satisfaction guarantee) > five service cards + "Request Your Estimate Today" banner > certification and logo wall > six "why choose us" points > two coupon cards (10% off repeat clients; 10% off repair capped at $150 for seniors, military, first responders; both expire Nov 30) > financing via Upgrade ("no credit impact to check") > ~18 Google reviews dated days ago, many naming staff > HALO community project > values icons > WA and OR city lists > "Schedule Your Service With Us Today" > footer with 24/7 answering service and six office phones.
- **Conversion elements:** rating in the header itself, dual header with phone + "Book Online", coupon cards with expiry, soft-pull financing, live recent reviews, community giving, 24/7 answering.
- **Form fields:** none on homepage; all CTAs route to /contact.
- **Trust signals:** GAF, Owens Corning Platinum Preferred, CertainTeed ShingleMaster, IKO, BBB, HomeAdvisor, Angi, Yelp, Best Pick Reports, NRCA, Nextdoor, licence line; the wall is so large it dilutes.
- **CTAs:** "Book Online", "Free Estimate", "Get Started", "Request Your Estimate Today", "Get This Offer", "See All Offers", "Learn More" x many.
- **Navigation:** 40+ link mega menu (Roofing 9, Gutters 5, Chimneys 3, Attics 5, About 13).
- **Mobile notes:** header duplication implies sticky; no chat; heavy logo wall.
- **Design quality: 6/10.** Competent but crowded; badge wall and mega menu compete with CTAs.
- **Lead-gen effectiveness: 7/10.** Rating-in-header, offers with deadlines and soft-pull financing are strong; no on-page form costs it.
- **Borrow:** (1) Show the aggregate rating in the header next to the phone ("4.9 on Google"). (2) Financing copy "check your options with no impact to your credit".
- **Avoid:** A wall of 20+ badges; show three or four that matter (ICPI, Unilock/Techo-Bloc/Belgard Authorized, CT HIC licence, Google rating).

## 15. West Shore Home (national, HQ Mechanicsburg PA)

- **URL:** https://westshorehome.com/ (inner: /get-quote/)
- **Type/location:** Bath, window, door and flooring remodeler, 40+ markets, 355,000+ homeowners; the benchmark for offer-led home-improvement conversion.
- **Platform:** Headless (Contentful CDN), custom front end, accessibility widget.
- **Homepage section order:** promo bar "Don't Wait to Remodel! Black Friday Sale + An Additional $1,000 Off - Offer Ends 11/28/26 / View offer terms" > header with "Sales: (717) 697-4033", hours, zip-based service check ("No service in 17055"), "SCHEDULE CONSULTATION" > hero "Where Luxury Meets Home." with a service selector "What are you looking to remodel? (Select all that apply)" + "Continue" > trust stats bar (4.8 Google, 4.8 BBB, 80,000+ five-star reviews, 355,000+ homeowners, "Installed by our own crews") > financing block "Start Your Project with $0 Down! / Waiving All Installation Costs / Extra $1,000 Off / 12 Months No Payments & No Interest" with "Get Offers" and "See Offer Terms" > Nexa product feature > four service cards > technology section with video (Scan-to-Plan, know your install date instantly) > locations > "difference" section with reviews > BBB A+ and Angi Super Service badges > final CTA block with four contact modes (Schedule, Get My Free Quote, Get a Call Back, Call) > footer with PA HIC number.
- **Conversion elements:** deadline offer bar, stacked financing offer with footnotes, hero that starts the form with a zero-typing question, review volume as a headline number, employee installers as differentiator, call-back option, sticky bottom bar with phone + "Get My Free Quote" (confirmed on the quote page), zip-code service gating.
- **Quote flow (/get-quote/):** Step 1 choose services (4 checkboxes); Step 2 "Are you the homeowner?" Yes/No; Step 3 First Name, Last Name, Phone Number, Zip Code, Email; optional SMS opt-in; "Submit Request". Five contact fields only, after two qualifying taps.
- **Trust signals:** 4.8 Google, 4.8 BBB, 54,000+ Google 5-star reviews, 355,000+ homeowners, BBB A+, Angi Super Service, HIC registration, "our own crews".
- **CTAs:** "SCHEDULE CONSULTATION", "Continue", "Get Offers", "See Offer Terms", "Get My Free Quote", "Schedule Free Consultation", "Get a Call Back", "Tap or Click To Call", "Schedule online in 60 seconds".
- **Navigation:** Bathrooms, Windows, Doors, Flooring, About; footer Reviews, Locations, Blog, Leave a Review.
- **Mobile notes:** sticky bottom bar; selector hero is thumb-first; hours shown in UTC in the header is a bug.
- **Design quality: 7/10.** Polished, dense, promotional; not beautiful but completely intentional.
- **Lead-gen effectiveness: 10/10.** Every proven lever is present: deadline, $0 down, review volume, qualifying question first, five fields, call-back, sticky bar.
- **Borrow:** (1) Hero form that starts with a checkbox question ("What are you planning? Patio / Walkway / Retaining Wall / Pool Deck / Outdoor Kitchen / Fire Feature") before any typing. (2) "Get a Call Back" as a third option for people who will not type or call right now.
- **Avoid:** Stacked promotions with four footnotes; a Black-Friday-style bar reads as high-pressure for a $30k-plus craft purchase. Use one seasonal offer with plain terms ("Book your spring patio by Feb 28, lock 2025 pricing").

## 16. Long Fence (Mid-Atlantic, since 1945)

- **URL:** https://www.longfence.com/ (inner: /specials/)
- **Type/location:** Fence, deck, railing, gate and paver installer; five branches; one of the oldest offer-driven home-services brands in the US.
- **Platform:** WordPress, Cloudflare, Wells Fargo financing, multiple ad pixels.
- **Homepage section order:** rotating top bar (phone 1-800-917-5664, "Free Estimates", "FINANCING", "10% OFF*" / "25% OFF*") > header "FAMILY OWNED SINCE 1945!" > hero "LONG FENCE Your Trusted Fence Company Since 1945" with sub-lines Free Estimate, 10% Off Fences Decks & Patios, Interest-Free Financing for 15 Months, embedded residential estimate form, "Need a Commercial Estimate? Click Here" > "Long Fence Just Makes Sense" four value props (Free Estimates & Priceless Designs, 10% OFF, 0% Financing for 15 Months, Unbeatable Warranties) > four category tiles > "Our clients love us" testimonials with Google 4.6 from 808 reviews > service cascades > blog > three-step process > FAQs > five locations with map links > five tabbed contact forms > footer with four state licence numbers and BBB A+.
- **Conversion elements:** embedded hero form with zip-based service-area gate ("We don't service your area..."), offers with expiry and minimum-purchase fine print, 0% for 15 months, Google rating with count, licence numbers in footer, floating "Free Estimate" image button near the footer, hiring banner.
- **Hero form fields:** First/Last Name, Phone, Email, Address, City, State, Zip, email opt-in. The contact-page version adds product checkboxes (Fence, Decks, Railings & Ironworks, Gates, Pavers, Other) and comments.
- **Specials page:** "10% off fencing products* ... Save up to $498 with a minimum purchase price of $4975", "10% off decks/Pavers* ... Save up to $648 with minimum purchase $6475", "No Interest If Paid In Full Within 15 Months* (Wells Fargo, 29.99% APR thereafter)", warranties.
- **Trust signals:** since 1945, BBB A+, Google 4.6 (808), MHIC/DC/WV licences, one-year workmanship + manufacturer warranties 10-year to lifetime.
- **CTAs:** "GET a free residential estimate", "Learn More", "Read more reviews", "Apply Now!".
- **Navigation:** About, Residential (8), Commercial (6), Government, Buyers Guide (Fencing 101, Financing, Warranty, Glossary, Specifications), Contact, Careers.
- **Mobile notes:** rotating bar with conflicting discounts (10% vs 25%); weekday-only hours; three different "years in business" figures.
- **Design quality: 4/10.** Dated, cluttered, inconsistent.
- **Lead-gen effectiveness: 7/10.** Despite the look, it hits form-in-hero, phone, offers, financing, rating with count and licences; the "Buyers Guide" section is a strong SEO/trust asset.
- **Borrow:** (1) A "Buyer's Guide" hub (Pavers 101, Financing, Warranty, Glossary) that educates and ranks. (2) Licence numbers in the footer (CT HIC #) and the rating with its review count, not just stars.
- **Avoid:** Conflicting offers in a rotating bar; a full address block on the first form.

## 17. American Driveway / Concrete Driveway Co. (Upstate SC and Asheville NC)

- **URL:** https://americandriveway.com/ (redirect from concretedriveway.com)
- **Type/location:** Concrete driveways, patios, foundations, RV pads; WebCitz's top concrete pick for its sticky scroll-triggered quote form.
- **Platform:** WordPress, WPForms, Trustindex Google review widget, Cloudflare, separate booking app subdomain ("See appointment times instantly").
- **Homepage section order:** header (logo, menu, Facebook, "Send a message", phone (864) 717-1239, "Get quote") > hero "Premium Concrete Solutions for American Homes" with "BOOK YOUR FREE ESTIMATE - NOW!" and "OR CALL (864) 717-1239", microcopy "See appointment times instantly" > "25 Years of Experience" stats bar > "Request Your Free Quote" form > four value props (Free Same-Day Quotes, Affordable Financing, 10-Year Warranty, High-Quality Work) > "Why Choose American Driveway?" + "GET STARTED NOW!" > service image tiles > "America's Trusted Driveway Experts / 38,000+ Trusted by Homeowners" > tabbed services each with "Get Free Quote" > reviews: 4.8 rating, 2,505 Google reviews, ~10 shown naming staff > multi-step "Book Your Free Estimate Today" (Step 1 of 4 zip) with a $2,500 minimum-budget checkbox > footer.
- **Conversion elements:** instant online booking as the primary CTA, "or call" as the secondary, review count 2,505 in a widget, warranty as a value prop, multi-step form with zip first and a budget gate, financing page, SMS consent.
- **Form fields (top form):** First Name*, Last Name*, Email*, Phone, Address*, Address Line 1, City, State, Zip, "Tell Us About Your Project?*", SMS consent. (Long.) Multi-step form: zip > name > contact > address > project description > budget at least $2,500 checkbox > consent.
- **Trust signals:** 4.8 Google (2,505 reviews), 10-year warranty, 25 years experience (contradicted by "10+ years" elsewhere), 38,000+ homeowners (unsourced); no licence or insurance badges.
- **CTAs:** "BOOK YOUR FREE ESTIMATE - NOW!", "OR CALL ...", "Get quote", "GET STARTED NOW!", "Get Free Quote", "Contact us now".
- **Navigation:** Services mega list, Financing, Request Quote, Service Area, Strategic Partnerships, About, Contact, Pricing, Testimonials, Warranty, Careers.
- **Mobile notes:** all-caps CTAs, booking app; two overlapping forms.
- **Design quality: 5/10.** Functional, salesy, brand/location inconsistencies (reviews still mention "Concrete Driveway Co of Asheville").
- **Lead-gen effectiveness: 8/10.** Booking-first CTA with "or call", the review-count widget and the budget qualifier are what concrete and paver buyers respond to.
- **Borrow:** (1) The CTA pair "Book your free estimate" + "or call (203) ..." in the hero, with "see appointment times instantly" microcopy if online scheduling exists. (2) A gentle budget qualifier late in the multi-step form ("Most projects start at $X"), which Gibbs also uses, to protect estimator time.
- **Avoid:** Two full forms on one page; unsourced "38,000+ homeowners" style claims.

## 18. A-1 Concrete Leveling (national franchise, HQ Jeffersonville IN)

- **URL:** https://www.a1concrete.com/ (inner: /request-an-estimate)
- **Type/location:** Concrete leveling, caulking, cleaning, sealing; 10+ locations; WebCitz list ("hero dropdown that takes users to a service, video testimonial, before/after slider").
- **Platform:** HubSpot CMS (hubfs paths), "HubSpot Website Design by IMPACT"; strong inbound content model ("Concrete Academy", Pricing page, YouTube channel).
- **Homepage section order:** header (Find Your Location, Locations, Own a Franchise, Careers, "Schedule a Quote") > hero "Give your concrete a second chance." with "I am looking for..." dropdown + "Go" and "Request an Estimate" > "Watch the Video" > three value props (Personalized Plan, Cut Costs, Save Time) > risks of doing nothing > "Fresh Start" CTA > four service cards > customer story video > three testimonials > How It Works three steps > franchise recruitment > before/after gallery with filters (sidewalk, garage, driveway, patio, porch, steps, pool deck) > Concrete Academy resources > "Reclaim Your Concrete" closing CTA > footer with ten service areas.
- **Conversion elements:** service-intent dropdown in hero, "Save up to 70% off the cost of replacement" anchor, a public Pricing page (rare and powerful), free Concrete Care Guide download, filtered before/after gallery, location finder by email, "within one business day" response promise on the estimate page with an explainer video above the form.
- **Form fields:** the estimate page's fields were not exposed in text; the location finder requires an email. Phone (888) 675-3835 appears only in the footer, which is the page's biggest failing.
- **Trust signals:** customer story video, testimonials with towns, Concrete Academy brand, franchise scale; no aggregate rating, no badges.
- **CTAs:** "Schedule a Quote", "Request an Estimate", "Request a Free Estimate", "Go", "Watch the Video", "Find Your Location". Inconsistent.
- **Navigation:** Services, Who We Serve (Homeowners, Property Managers, Real Estate Agents, Home Builders), Pricing, Learning Center, Reviews, About.
- **Mobile notes:** no header phone; no sticky bar; HubSpot pages are reasonably quick.
- **Design quality: 7/10.** Confident, friendly, educational; the hero sentence is the best in half (b).
- **Lead-gen effectiveness: 6/10.** Excellent qualification and education, undermined by hiding the phone and skipping ratings.
- **Borrow:** (1) A public Pricing / "What does a paver patio cost in Connecticut?" page with ranges and a cost guide download; it is the most-searched question in the category. (2) "What happens after I fill out this form?" copy with a one-business-day promise directly above the form.
- **Avoid:** Phone number only in the footer; email-gated location finder.

## 19. Gibbs Landscape Company (Atlanta, GA)

- **URL:** https://gibbslandscape.com/ (inner: /residential-landscaping)
- **Type/location:** Design-build landscaping, hardscape and maintenance since 1964; "Over 300 Awards"; FreshySites 2026 list for "award-based headline and services > testimonials > form flow".
- **Platform:** Hosted builder (octanecdn images, "Toggle Navigation"); likely a vertical CMS.
- **Homepage section order:** header with phone 770-432-7761, "Request a Quote", "Make a Payment", "Call Us", "Contact Us" > hero "Creativity. Quality. Experience. / A Complete Solution for Your Landscaping Vision" with "Play Video" and "Request a Quote" > Residential vs Commercial/HOA cards > "Bring Your Dream To Life" band > "We Plan. We Design. We Install." > image pairing > Gibbs Gardens feature > "Atlanta's Most Award-Winning Landscape Company / Over 300 Awards / Consumers Choice Award 2004-2026" > five testimonials > ~25-tile project carousel > "Request a Quote" form with pricing minimums > footer.
- **Conversion elements:** single primary CTA label ("Request a Quote") repeated in header, hero and footer; stated minimums ("Landscape design and installation starts at $12,000; weekly maintenance starts at $12,000/year") to pre-qualify; awards count as headline proof; video hero; separate Residential / Commercial paths. Weak: no ratings or counts, truncated testimonials, "Varied" hours, no financing, no service-area list, gallery links all point to the residential gallery.
- **Form fields:** not exposed in text ("Fill out the form below and a Gibbs representative will contact you shortly").
- **Inner page:** H1 "Residential Landscaping", carousel, three teaser cards (Maintenance, Landscape Design & Installation, Hardscape Design & Installation) anchored to sections, interactive "Walls / Floors / Ceilings" image map for outdoor rooms, same $12,000 minimums, repeated copy blocks and typos ("Porgrams", "insure").
- **Trust signals:** founded 1964, 300+ awards, Consumers Choice 2004-2026, Southeastern Flower Show awards, named staff in testimonials, 220-acre Gibbs Gardens.
- **CTAs:** "Request a Quote", "Call Us", "Contact Us", "Get Started Today", "View Our Work", "Learn About the Gibbs Approach", "View Some Of Our Awards".
- **Navigation:** Residential, Commercial/HOA, Galleries, Blog, About Us, Gibbs Gardens.
- **Mobile notes:** repeated header blocks suggest a mobile call bar; carousel of 25 tiles is heavy.
- **Design quality: 6/10.** Handsome photography, tidy bands; copy duplication and link errors drag it down.
- **Lead-gen effectiveness: 6/10.** One consistent CTA and pre-qualification are smart; missing ratings, hours, financing and service area.
- **Borrow:** (1) "We Plan. We Design. We Install." as a three-beat design-build promise. (2) Publish a minimum or typical starting price near the form to filter tyre-kickers, phrased warmly ("Most of our patio projects start around $X").
- **Avoid:** "Hours: Varied"; a 25-tile carousel where every tile links to the same page.

## 20. Brookscapes (Raleigh, NC)

- **URL:** https://brookscapes.com/ (inner: /raleigh-nc)
- **Type/location:** Landscape design-build, pools, hardscape, outdoor kitchens, decks; since 2002; FreshySites list for the single strong positioning line "Resort Style Living in Your Backyard".
- **Platform:** LocalEdge template (irp.cdn-website.com / dms3rep, Duda-based), "WEB DESIGN BY LOCALEDGE".
- **Homepage section order:** header with phone (919) 872-5770, email, "Contact Us", "Call Us", social > hero "AWARD-WINNING LANDSCAPE DESIGN AND INSTALLATION / Local Landscaping Company Serving Raleigh, Apex, Wake Forest, NC & Beyond" > intro paragraph since 2002 > "Outstanding Service, From Start to Finish and Beyond" eleven service tiles each "Explore" (Pools & Water Features, Decks & Porches, Fireplaces & Firepits, Outdoor Lighting, Outdoor Kitchens, Patios, Driveways & Walkways, Hardscapes, Audio/Video, Irrigation) > "Why Choose Brookscapes?" credentials list + "Our Portfolio" > "We Deliver Total Landscape Design and Installation!" + "Contact Us" > three testimonials slider > six portfolio tiles (placeholder "title / Button" labels, unfinished) > "CONTACT RALEIGH'S TRUSTED LANDSCAPING COMPANY" form, "You may contact Ken directly" > footer.
- **Conversion elements:** towns named in the hero subhead; credential list written out (NC Landscape Contractor #CL0405, Certified Plant Professional, ICPI Certified Concrete Paver Installer, NCNLA member, NC Green Industry Council); owner's name as contact; short five-field form; three city pages linked from nav.
- **Form fields:** Name, Email, Address, Phone, Message (no required markers). Success copy "Thank you for contacting us. We will get back to you as soon as possible."
- **Inner page (Raleigh, NC):** "Raleigh, NC / LANDSCAPE CONTRACTOR SERVING THE GREATER RALEIGH, NC AREA", ~350-450 words about Raleigh's population, Research Triangle and weather, two CTAs ("Contact Us Today to Schedule a Consultation!"), the same five-field form, four empty "Button" placeholders, links to seven service pages. No local projects or reviews; template risk high.
- **Trust signals:** text-only credentials (ICPI is the one that matters for pavers), "award-winning" without naming awards, three testimonials without stars.
- **CTAs:** "Contact Us", "Call Us", "Explore", "Our Portfolio", "View More Designs", "Contact Us Today to Schedule a Consultation!".
- **Navigation:** Home, About, Our Services (15), Design & Installation, Our Portfolio, Contact (Blog, Resource Center, FAQs, Service Areas).
- **Mobile notes:** template handles mobile; header contact duplication implies a call bar; unlabeled portfolio tiles look broken.
- **Design quality: 4/10.** Template, all-caps headings, placeholder tiles live on the homepage.
- **Lead-gen effectiveness: 5/10.** Phone + short form + towns in hero + ICPI badge are right; everything else is unfinished.
- **Borrow:** (1) Towns in the hero subhead ("Serving Cheshire, Wallingford, Southington, Hamden & Greater New Haven County"). (2) Spell out ICPI / NCMA certifications and the CT HIC licence number in a "Why Choose" list, and link the owner by name ("Ask for [owner]").
- **Avoid:** City pages that describe the city's population instead of your projects there; placeholder tiles in production.

## Noted: Pearl Landscaping and Patio Co. (Capital District, NY)

- **URL:** https://www.pearllandscaping.com/ (Wix). FreshySites praised its dark background making project photos vivid and a full-screen video. Fetched text shows a "Featured Project: Delmar 2025" spotlight (paver patio, pool deck, gas fire pit, outdoor kitchen, covered seating) with "View Project", "View 3D Designs" (renders as a sales tool), "Services of the Month", town list in the intro, four office addresses, three testimonials, no form and no manufacturer badges. Design 6/10, lead-gen 4/10. Borrow the "Featured Project of the season" spotlight and "View 3D Designs" as proof of design capability; avoid relying on phone/email only with no form.

---

# Visual excellence patterns (what the showcase sites share)

1. **Photography does all the colour work; UI chrome is neutral.** Hollander, NBW, Tom Stuart-Smith, Garden Architecture, Eldorado and Unilock all run white or near-black chrome with no accent colour competing with stone and planting. Where an accent exists (Belgard's warm tone, Nicolock's red) it is confined to buttons and eyebrows. For Alpha: a charcoal/warm-white system with one accent (burnt sienna or moss) used only for CTAs, so bluestone, granite and paver blends read true.

2. **Type pairings are a condensed or display face for labels plus a humanist sans for body, or a single grotesque used with discipline.**
   - Belgard: Rajdhani (condensed, all-caps eyebrows) + Manrope (body).
   - Nicolock: Bebas Neue Book (condensed caps display) + Lato.
   - Hollander: Open Sans + Aleo slab serif accent.
   - The Garden Practice: Inter Display / Archivo / General Sans + Amiri serif for emotive lines + Fragment Mono for numerals.
   - Tom Stuart-Smith: Neuzeit only.
   - Cambridge: Prata serif display (dated when paired with six other families).
   Pattern to copy: eyebrow label in small caps condensed or mono, headline in a confident sans at 40-64px, body in a readable humanist sans at 17-18px, one optional serif for a single emotive line per page. Never more than three families.

3. **Grid systems are tile-based in sixes and fours with full-bleed bands between.** Unilock (six product tiles, six inspiration tiles), Belgard (six category cards, four room tiles), Eldorado (six profiles, four colours, six projects), Nicolock (ten category tiles). Showcase studios use a single wide column (Hollander feed) or 3:2 / 4:3 card grids with "Load More" rather than pagination (Hollander, Eldorado, Garden Architecture).

4. **Image ratios:** hero 16:9 or taller full-bleed; project feed 16:9 or 3:2 (Hollander 400x267 thumbs); portfolio cards 3:2 (Hollander) or 4:3 (NBW); product cards square 1:1 (Unilock, Belgard 512x512); gallery tiles 16:9 (Eldorado "large_16_9"). Separate mobile crops (Garden Architecture ships a "-m" image set) keep the subject in frame on phones.

5. **Captions as specification.** Eldorado's "Vantage30 | White Elm" and Unilock's "Quarry Smooth, Grenada White" captions turn inspiration into a shopping list. Studios caption with title + location + category tags (Hollander, NBW, The Garden Practice). For Alpha: "Cheshire, CT - Bluestone patio, Unilock Rivercrest wall, gas fire pit - 2025".

6. **Motion is quiet and functional:** GSAP fades and overlay menus (Hollander), progressive blur-up image loading (NBW), Swiper tile carousels (Unilock, Nicolock), slideshow crossfade (Garden Architecture), Framer scroll reveals (The Garden Practice), one looping hero video (Eldorado, Gibbs). No parallax gimmicks; the heaviest motion sites are also the heaviest pages (Nicolock 500 KB, Belgard 1 MB HTML).

7. **Eyebrow + headline + one sentence + one CTA per band.** Belgard's "THE ART OF WARMTH / Fire pits and fireplaces... / Explore fire features" rhythm is the cleanest storytelling module in the category and is directly reusable for Alpha's services.

8. **Materials and projects are presented as rooms and use-cases, not SKUs.** Belgard Rooms (Outdoor Kitchen, Living Room, Dining Room), Unilock "Get Inspired" (Driveways, Pool Decks, Walkways, Front Entrances), Gibbs "Walls / Floors / Ceilings" image map. Contractors should mirror this: Patios, Walkways & Steps, Retaining & Seating Walls, Pool Decks, Outdoor Kitchens, Fire Features, Driveways.

9. **Process is a first-class page.** NBW puts "Process" in the main nav; The Garden Practice shows six numbered steps with durations; Northface, Roof Tiger, Capstone and Long Fence all have a numbered process on the homepage. It is the bridge between showcase and conversion.

10. **Restraint in copy.** Three-word heroes ("Land tells a story.", "Creativity. Quality. Experience.", "Gardens for a Life Well Lived.") beat paragraphs. Filters mirror client language (Private (City) / Private (Country); Residential / Retreat / Commercial).

---

# Conversion patterns (ranked by how consistently they recur on the highest-converting contractor sites, with evidence)

Ranking combines frequency across the ten half (b) sites, agency guidance (Hook, Blue Corona, ServiceTitan, FreshySites, WebCitz) and the research sources. Vendor statistics are marked (vendor).

1. **Phone number clickable in the header on every page, repeated near the form and in the footer; sticky on mobile.** Present on 9 of 10 sites (A-1 is the exception and suffers for it). Guidance: sticky bottom bar with at most two buttons (Call + Get Estimate), 48px tall, thumb zone (PipelineOn citing Material Design; Hook Agency mobile UX). Reported lifts are anecdotal but directionally consistent: sticky header vs scrolling header +27% calls over 90 days (Dallas roofer, PipelineOn, unsourced); sticky "Call Now" footer 4.2% to 12.8% mobile conversion (ContractorTalk anecdote via PipelineOn); Nielsen Norman "persistent elements get 84% more engagement" (as cited by PipelineOn). Wording: "Call (203) xxx-xxxx", "Tap to Call", "Call Now - Free Estimate".

2. **Estimate form above the fold on the homepage and every service/city page, 4-6 fields, with a qualifying question first.** Northface, Capstone, Long Fence, American Driveway embed the form in or directly under the hero; West Shore Home and Roof Tiger start with a zero-typing checkbox step. Research: multi-step forms outperform single-step in most published tests (Instapage +21.4% on 25,500 visits/variant; HVAC scheduling 7.62% to 13.13% in a small two-week test; Venture Harbour compilations +35% to +214%, vendor-reported). Field count alone is not the lever (Aagaard's Unbounce test: removing wanted fields cut conversions 14%, relabelling lifted 19%); asking the right questions in the right order is. Hook's recommendation for contractors: name, phone, email, service needed, zip; never square footage, full address, budget or appointment window on the first touch. Recommended Alpha form: Step 1 "What are you planning?" checkboxes (Patio, Walkway/Steps, Retaining Wall, Pool Deck, Outdoor Kitchen, Fire Feature, Driveway, Other) > Step 2 Town/Zip > Step 3 Name, Phone, Email, optional "Tell us a little about the project", SMS consent > button "Get My Free Estimate". Show "We reply within one business day" (A-1) or "within 15 minutes during business hours" (Hook example) above the button.

3. **Specific, first-person CTA wording, one primary label repeated everywhere.** Best examples: "Get My Free Quote" (Northface, West Shore), "Get My Free Estimate" (Roof Tiger), "Get Your Free Inspection" (Capstone, single label site-wide), "Request a Quote" (Gibbs, single label), "BOOK YOUR FREE ESTIMATE - NOW! / OR CALL ..." (American Driveway). Hook: personalised CTAs convert 42% more than generic (vendor, secondary); Invoca via PipelineOn: value-driven button copy +22% taps. Worst pattern: Roof Tiger and Guardian using five or six different labels for the same action. For Alpha: primary "Get My Free Estimate", secondary "Call (203) ...", tertiary "Request a Call Back" or "Let's Talk About Your Project".

4. **Ratings strip with platform logos directly above or beside the form, including the count.** Capstone (Yelp 4.8, Google 5.0, BBB A+ above the form), Northface (4.9 / A+ / 5.0 under hero), West Shore (4.8 Google, 4.8 BBB, 80,000+ reviews), Long Fence (Google 4.6 from 808 reviews), American Driveway (4.8 from 2,505 Google reviews in a Trustindex widget), Guardian (4.8 in the header). BrightLocal 2026: 68% of consumers require 4+ stars (31% require 4.5+), 47% will not use a business with fewer than 20 reviews, 74% only look at reviews from the last three months, 80% are likelier to use a business that responds to all reviews, 54% visit the business website after reading positive reviews. Implication: show the real Google rating with count and recency (live feed like Roof Tiger / Capstone), include a review that names a town, and respond to every review.

5. **Financing mentioned in the hero or value-prop strip, with its own page.** 8 of 10 sites. Wording that works: "Flexible Financing Options" (Northface hero bullet), "0% Financing for 15 Months*" (Long Fence), "$0 Down / 12 Months No Payments & No Interest" (West Shore), "check your options with no impact to your credit" (Guardian/Upgrade), "Affordable Financing" (American Driveway value prop), GoodLeap short "Apply Today" form (Capstone). For a $20k-80k hardscape ticket, a financing page with a monthly-payment example is as important as for roofing.

6. **Four-item trust/value-prop strip immediately under the hero.** Nicolock (50+ Years Family Owned, 100% US Made, Transferable Lifetime Warranty, Certified Pro Network), American Driveway (Free Same-Day Quotes, Affordable Financing, 10-Year Warranty, High-Quality Work), Long Fence (Free Estimates, 10% Off, 0% Financing, Warranties), Capstone hero bullets, Northface hero bullets. Alpha version: "20+ years in Cheshire", "ICPI & NCMA certified crews", "Unilock / Techo-Bloc / Belgard Authorized Contractor", "Workmanship warranty + financing".

7. **Real certifications and licence numbers, few and legible, with a one-line explainer.** GAF Master Elite with "What does that mean for you?" tooltip (Roof Tiger); licence numbers in footer (Long Fence MHIC, West Shore PA HIC, Guardian). Guardian's 20+ badge wall is the counter-example. For Alpha: CT HIC number, ICPI, NCMA, manufacturer authorised-contractor badges, Google rating, BBB if accredited.

8. **Service-area pages for each town, written with local evidence.** Northface (39 city pages), Brookscapes (3), Guardian (city lists), A-1 (10 locations), American Driveway (Service Area nav). Housecall Pro cites a contractor whose leads rose 50% after adding city pages (vendor). The audits show the failure mode: Northface's Albertville page and Brookscapes' Raleigh page swap only the town name and describe the city's population. The pattern that would work for Alpha: one page per town (Cheshire, Wallingford, Southington, Hamden, Meriden, Prospect, Wolcott...) with two or three real projects in that town, a review from that town, drive time from the yard, permit/HOA notes, and the same stepped form.

9. **Numbered process section ("what happens next").** Northface (five steps incl. "Chat With the Office", "Project Day"), Roof Tiger (five), Capstone (Contact, Free Inspection, Get Right To Work, Final Checks), Long Fence (three), A-1 (three), Gibbs ("We Plan. We Design. We Install."), The Garden Practice (six with durations). Reduces anxiety about deposits, timelines and disruption, which is acute for excavation-heavy hardscape work.

10. **Offers with a deadline and plain fine print, used sparingly.** West Shore (Black Friday + $1,000 off, ends 11/28), Guardian (two coupon cards expiring Nov 30, senior/military/first-responder discount), Long Fence (10% off with minimum purchase and expiry), Capstone (senior and military discounts), A-1 ("Save up to 70% vs replacement"). For a craft brand one seasonal offer is enough: "Book by [date] for spring installation and lock current material pricing" or "Free 3D design with any patio over X sq ft".

11. **Video of the owner or crew, and before/after or 3D proof.** Northface team video, Roof Tiger founder message, A-1 customer story video and filterable before/after gallery, Gibbs hero video, Pearl "View 3D Designs", Chet's and A-1 before/after sliders (ServiceTitan, WebCitz lists). Hook 2026 trends: video and before/after reels; WebFX claim video can lift conversion up to 80% (vendor).

12. **Call-back and scheduling alternatives to the form.** West Shore ("Get a Call Back", "Schedule online in 60 seconds"), American Driveway ("See appointment times instantly"), Guardian ("Book Online", 24/7 answering service), Blue Corona's 24/7 call answering and missed-call recovery (29% of calls flagged for recovery in their Arctic Air case, vendor). Invoca: 18% of weekday and 41% of weekend calls to home-services providers go unanswered; 75% hang up within 10 minutes on hold (vendor).

13. **Chat and text.** Rare on the ten audited sites (none had a visible live chat; all had SMS consent in forms). Hook lists chatbots as a 2026 trend; PipelineOn's channel split (calls 30-50%, chat 5-15%, forms 2-5%, citing Invoca loosely) is secondary and inconsistent. Treat text-us as a low-cost third contact mode rather than a primary lever.

14. **Speed and page weight.** Hook: 53% abandon mobile pages over 3 seconds (Google via Marketing Dive); conversion triples at 1s vs 5s loads (vendor); Blue Corona: 40% leave after 3 seconds, 1-second delay costs 7% (vendor). Audited builder sites (Nicolock Elementor 500 KB HTML, Belgard 1 MB, Framer 514 KB) are the cautionary cases; Hook's custom WordPress builds and Garden Architecture's Webflow (21 KB) are the light ones. Ship separate mobile image crops, WebP/AVIF, no slider plugins.

## Phone vs form: what the research actually supports
- Invoca's 2026 home-services benchmark (60M+ calls): 38% of human-answered calls are leads and 45% of those convert on the call; paid-search calls convert up to 48%. BIA/Kelsey via Invoca: calls convert to 10-15x more revenue than web leads; Forrester via Invoca: callers convert 30% faster. Google via Invoca: 40% of home-services consumers who call from search make a purchase. 62% of home-services customers called at some point in the journey (Invoca 2022).
- The widely repeated "calls convert 10-15x better than forms" line comes from secondary blogs (PipelineOn) with inconsistent form baselines (2-5% vs 10-15%); treat the direction as solid and the multiple as unverified.
- Practical reading for Alpha: make calling the fastest path on mobile (sticky bar, header), but keep the stepped form because large-ticket, considered purchases (patios, outdoor kitchens) are researched on desktop in the evening when nobody answers; add "Request a Call Back" as the bridge. Track both with call tracking and form attribution (median contractor sites convert 2-4% of sessions to a call or form; landscaping 3-6%, PipelineOn benchmark; Unbounce home-improvement median 3.3% via Pro Remodeler).

## Form length: what to take from the evidence
- Keep the first touch to 4-5 fields after a zero-typing qualifier (service type, town). West Shore (5 fields after 2 taps) and Roof Tiger (service > zip > contact) are the models; Nicolock's 11 required fields, Long Fence's full address and American Driveway's duplicate forms are the anti-models.
- Multi-step consistently beats single-step in published tests (+18% to +21% in the one large sample; larger claimed lifts are vendor-reported). Ask "what" and "where" before "who".
- Avoid "How did you hear about us", "Best time to reach you", full street address and budget on step one (Hook, and every audit here). A budget range is acceptable as an optional late step for pre-qualification (American Driveway's $2,500 minimum, Gibbs' published $12,000 minimum).
- Put a response promise and a short privacy/consent line next to the button; SMS consent language is now standard on all ten sites.

## Review display: what to take from the evidence
- Show the aggregate (rating + count + platform logo) in the header or hero strip and again above the form (Guardian, Capstone, West Shore, Long Fence, American Driveway).
- Show recent reviews, dated, from a live feed, with the reviewer's town and a staff name where possible (Guardian, Roof Tiger, American Driveway). BrightLocal 2026: 74% only consider reviews from the last three months; 47% need 20+ reviews; 68% need 4+ stars.
- Place a review or ratings strip before each CTA, not in one testimonial section at the bottom (FreshySites guidance; Capstone and Northface practice).
- Respond to every review (80% likelier to use a responding business; 50% put off by templated replies).

## Sticky mobile bars: consensus guidance
- Fixed bottom bar, two buttons maximum: "Call" (tel: link, phone icon) and "Free Estimate" (opens the stepped form), 48px tall, full width, high-contrast accent colour (PipelineOn, Hook). Desktop: sticky header with phone top-right at 18px+ and the primary CTA button.
- Confirmed in markup on West Shore Home (quote page) and strongly implied on Roof Tiger, Guardian and Gibbs; absent on A-1 and Capstone, both of which the audits flagged as a gap.
- Reported lifts range from +20% to +46% and 3x in anecdotes; none are controlled studies, so instrument Alpha's bar with call tracking from day one.
