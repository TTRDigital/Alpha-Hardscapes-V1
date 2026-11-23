import type { ServiceArea } from "@/lib/types";
import { img } from "./images.ts";
import { pt } from "./pt.ts";

/**
 * Built-in service areas: the three counties and the town pages the live site
 * had (Avon, Berlin, Farmington, Glastonbury, Southington, West Hartford) plus
 * Cheshire, the home town. More towns can be added in Sanity > Service areas.
 */
const county = (x: Omit<ServiceArea, "_id" | "kind">): ServiceArea => ({ _id: `area-${x.slug}`, kind: "county", ...x });
const town = (countySlug: string, countyName: string, x: Omit<ServiceArea, "_id" | "kind" | "county">): ServiceArea => ({
  _id: `area-${x.slug}`,
  kind: "town",
  county: { name: countyName, slug: countySlug },
  ...x,
});

const NH = ["New Haven County", "new-haven-county"] as const;
const HC = ["Hartford County", "hartford-county"] as const;

export const areas: ServiceArea[] = [
  county({
    slug: "new-haven-county",
    name: "New Haven County",
    order: 10,
    heading: "Hardscaping and masonry contractor in New Haven County, CT",
    intro:
      "Alpha Hardscapes is based in Cheshire, in the heart of New Haven County. From the coastal towns of Branford, Guilford and Madison to Hamden, Wallingford and Southington, we build paver patios, walkways, retaining walls, steps and outdoor living spaces designed for the county's mix of coastal exposure, clay soils and freeze-thaw winters.",
    image: img("/images/gallery/patio-1258.webp", "Paver patio with fire pit behind a Connecticut home"),
    towns: ["Bethany", "Branford", "Cheshire", "East Haven", "Guilford", "Hamden", "Madison", "Meriden", "Middlebury", "Milford", "New Haven", "North Branford", "North Haven", "Northford", "Orange", "Oxford", "Prospect", "Southbury", "Wallingford", "West Haven", "Wolcott", "Woodbridge"],
    mapQuery: "New Haven County, CT",
    highlights: [
      { title: "Local, not a franchise", text: "Our crew lives and works in New Haven County, so we know the soils, the permit offices and the suppliers.", icon: "map" },
      { title: "Built for the climate", text: "Compacted bases, drainage and materials chosen for coastal salt and inland frost.", icon: "shield" },
      { title: "Code-compliant construction", text: "Walls, steps and fire features built to town requirements, with permits handled.", icon: "check" },
    ],
    body: pt(`
## Building outdoor spaces across New Haven County
New Haven County is a region of lively town centres, historic neighbourhoods and scenic shoreline. From the spacious lots of Orange and Woodbridge to the close-knit streets of Cheshire and Hamden and the coastal homes of Branford and Guilford, each town has its own style, and we design to it: bluestone and fieldstone for Colonials and Capes, large-format pavers for contemporary homes, and sea-salt-tolerant materials near the water.

## What we build here
- Paver and natural stone patios, walkways and front entries
- Retaining walls, sitting walls and terraces for sloped lots
- Stone steps and landings
- Outdoor kitchens, fire pits and outdoor fireplaces
- Pool patios, coping and fencing
- Chimney repair, stone veneer and paver restoration
- Landscaping and seasonal clean-ups
`),
    faqs: [
      { question: "What services does a masonry contractor in New Haven County provide?", answer: "Brickwork, stone installation, concrete, retaining walls, patios, steps, chimneys and structural repairs. Alpha Hardscapes delivers all of these for homes and commercial properties across the county." },
      { question: "How do you handle New Haven County's weather?", answer: "We build on compacted crushed-stone bases with drainage, use freeze-thaw-rated pavers and stone, and grade every surface to shed water, so the work resists cracking, heaving and settling." },
      { question: "When should I hire a masonry contractor?", answer: "For new patios, walls or steps, for structural repairs, or when ageing masonry starts to crumble. We evaluate the site and recommend repair or replacement." },
    ],
    seo: { title: "Hardscaping & Masonry Contractor in New Haven County, CT | Alpha Hardscapes", description: "Paver patios, walkways, retaining walls, steps and outdoor living across New Haven County, CT, from a Cheshire-based crew. Free estimates." },
  }),
  county({
    slug: "hartford-county",
    name: "Hartford County",
    order: 20,
    heading: "Professional masonry and hardscape contractor in Hartford County, CT",
    intro:
      "Hartford County pairs historic suburbs with modern estates, and we serve both: the elegant properties of West Hartford and Glastonbury, the family neighbourhoods of Avon, Farmington and Southington, and the classic streets of Berlin and Simsbury. Alpha Hardscapes brings precision and durable materials to every patio, wall and entry we build here.",
    image: img("/images/gallery/g-IMG_8957.webp", "Pool with bluestone coping and paver surround"),
    towns: ["Avon", "Berlin", "Bristol", "Farmington", "Glastonbury", "Manchester", "New Britain", "Newington", "Plainville", "Rocky Hill", "Simsbury", "South Windsor", "Southington", "West Hartford", "Wethersfield"],
    mapQuery: "Hartford County, CT",
    highlights: [
      { title: "Comprehensive masonry", text: "Brickwork, natural stone, retaining walls and concrete structures designed for long-term durability.", icon: "wall" },
      { title: "Built for New England weather", text: "Installation methods and materials that resist cracking, shifting and surface wear.", icon: "shield" },
      { title: "Clean, detailed finishes", text: "Precise base preparation, balanced layouts and consistent joints.", icon: "check" },
    ],
    body: pt(`
## Masonry and hardscaping across Hartford County
Hartford County offers a mix of scenic suburbs, historic charm and upscale modern living. We create premium hardscapes and outdoor living spaces tailored to each community, from the estates of West Hartford and Glastonbury to the family-friendly neighbourhoods of Avon and Farmington and the classic streets of Simsbury and South Windsor.

## Why hire a professional masonry contractor
- Structural integrity: walls, walkways and stone structures built with proper reinforcement and weight distribution
- Lower maintenance: drainage, mortar selection and stone placement that prevent water intrusion and surface damage
- Curb appeal: patios, steps and stone accents that make outdoor spaces usable and add value
`),
    faqs: [
      { question: "What services does a masonry contractor in Hartford County provide?", answer: "Brickwork, stone installation, retaining walls, concrete features, patios, walkways, steps and masonry repairs, all designed for local conditions and long-term performance." },
      { question: "Why is professional installation important?", answer: "Proper base preparation, reinforcement and material selection prevent the premature cracking and settling that improper installation causes." },
      { question: "How long do masonry projects last?", answer: "Built on the right base with drainage, patios, walls and steps last decades with minimal upkeep." },
    ],
    seo: { title: "Masonry & Hardscape Contractor in Hartford County, CT | Alpha Hardscapes", description: "Patios, walkways, retaining walls and stone work for Avon, Farmington, Glastonbury, Southington, West Hartford and across Hartford County, CT. Free estimates." },
  }),
  county({
    slug: "fairfield-county",
    name: "Fairfield County",
    order: 30,
    heading: "Hardscaping and masonry in Fairfield County, CT",
    intro:
      "With coastal charm, historic neighbourhoods and modern living, Fairfield County is one of Connecticut's most sought-after areas. Alpha Hardscapes serves Fairfield, Westport, Easton, Weston, Monroe, Trumbull and Shelton with custom patios, walkways, walls, steps and outdoor living spaces that match the character of each property.",
    image: img("/images/gallery/g-IMG_1601.webp", "Paver patio with a stone wall"),
    towns: ["Bridgeport", "Easton", "Fairfield", "Monroe", "Newtown", "Shelton", "Stratford", "Trumbull", "Weston", "Westport"],
    mapQuery: "Fairfield County, CT",
    highlights: [
      { title: "Designs that fit the home", text: "Bluestone and fieldstone for historic properties, large-format pavers for modern ones.", icon: "design" },
      { title: "Coastal-ready materials", text: "Salt-tolerant stone and pavers with drainage for shoreline lots.", icon: "shield" },
      { title: "One crew, start to finish", text: "Design, permits, construction and clean-up from a single team.", icon: "check" },
    ],
    body: pt(`
## Crafting outdoor excellence in Fairfield County
We are dedicated to delivering exceptional landscaping and masonry across Fairfield County, from waterfront homes in Fairfield and Westport to the wooded lots of Easton, Weston and Monroe. Every project starts with a site visit and a written estimate.

## Services in Fairfield County
- Paver and natural stone patios and walkways
- Retaining walls and garden walls
- Stone steps and front entries
- Outdoor kitchens, fire pits and fireplaces
- Pool patios and surrounds
- Chimney repair and stone veneer
- Landscaping and seasonal services
`),
    faqs: [
      { question: "Do you serve all of Fairfield County?", answer: "We focus on the eastern and central towns: Fairfield, Westport, Easton, Weston, Monroe, Trumbull, Shelton, Stratford and Newtown. Contact us for other locations and we will confirm availability." },
    ],
    seo: { title: "Hardscaping & Masonry in Fairfield County, CT | Alpha Hardscapes", description: "Custom patios, walkways, retaining walls, steps and outdoor living for Fairfield, Westport, Trumbull, Shelton and across Fairfield County, CT. Free estimates." },
  }),

  town(NH[1], NH[0], {
    slug: "cheshire",
    name: "Cheshire",
    order: 40,
    heading: "Hardscaping, paver and masonry contractor in Cheshire, CT",
    intro:
      "Alpha Hardscapes is based in Cheshire. Our own town is where most of our patios, walkways, retaining walls and steps are built, from the Colonials off Route 10 to newer homes near the Farmington Canal trail. If you are a Cheshire homeowner, you have probably walked past our work.",
    image: img("/images/gallery/patio-1804.webp", "Paver patio with fire pit in Cheshire, CT"),
    mapQuery: "Cheshire, CT",
    neighborhoods: ["Cheshire Village", "Mixville", "West Cheshire", "Brooksvale", "Cheshire Street", "Mount Sanford"],
    highlights: [
      { title: "Your local contractor", text: "We are minutes away for site visits, follow-ups and quick repairs.", icon: "map" },
      { title: "Cheshire soils and slopes", text: "Experience with the town's ledge, clay pockets and sloped lots that need proper drainage.", icon: "shield" },
      { title: "Permits and setbacks", text: "We know when the Cheshire Building Department requires a permit for walls, pools and fire features.", icon: "check" },
    ],
    body: pt(`
## Patios, walkways and walls for Cheshire homes
Cheshire's housing ranges from 18th-century Colonials along the historic district to contemporary homes in the newer subdivisions, and our work matches both: bluestone walkways and fieldstone walls for older houses, large-format pavers and clean-lined block walls for newer ones.

## Common Cheshire projects
- Front entries: new bluestone steps, landings and paver walkways
- Backyard patios with fire pits and seating walls
- Retaining walls that turn sloped yards into level lawns and patios
- Pool patios and coping
- Repairs to heaved walkways and leaning walls after hard winters
`),
    faqs: [
      { question: "Do I need a permit for a patio in Cheshire?", answer: "A ground-level patio usually does not need a permit, but retaining walls over a certain height, pools, pool fences and some fire features do. We confirm with the Cheshire Building Department and handle the application." },
      { question: "How quickly can you visit a Cheshire property?", answer: "Usually within a few days of your call. Because we are based in town, scheduling an estimate is quick." },
    ],
    seo: { title: "Hardscaping & Masonry Contractor in Cheshire, CT | Alpha Hardscapes", description: "Cheshire-based paver patio, walkway, retaining wall and stone step contractor. See our local projects and get a free estimate from Alpha Hardscapes." },
  }),
  town(HC[1], HC[0], {
    slug: "southington",
    name: "Southington",
    order: 50,
    heading: "Paver patios, walkways and retaining walls in Southington, CT",
    intro:
      "Southington sits next door to Cheshire, and we build patios, walkways, retaining walls and steps there every season. Alpha Hardscapes delivers stone, brick and concrete construction for Southington homes that is structurally sound and built to handle Connecticut's freeze-thaw winters.",
    image: img("/images/gallery/walkway-0909.webp", "Paver walkway with a dark border"),
    mapQuery: "Southington, CT",
    neighborhoods: ["Plantsville", "Marion", "Milldale", "Downtown Southington"],
    highlights: [
      { title: "Minutes from our shop", text: "Fast site visits and follow-up from a crew based in neighbouring Cheshire.", icon: "map" },
      { title: "Built for the weather", text: "Reinforced bases and drainage that keep walls and patios from heaving.", icon: "shield" },
      { title: "Detail-oriented craftsmanship", text: "Clean alignment, tight joints and consistent finishes.", icon: "check" },
    ],
    body: pt(`
## Masonry and hardscaping for Southington homes
From Plantsville to Marion, Southington has a mix of ranches, Colonials and newer homes on sloped lots. We build patios with proper drainage, retaining walls that manage runoff and front entries that lift curb appeal.
`),
    faqs: [
      { question: "What services do you provide in Southington?", answer: "Paver patios and walkways, retaining walls, stone steps, outdoor kitchens, fire pits, pool patios, chimney repair and landscaping." },
      { question: "How does masonry hold up in Southington's climate?", answer: "We use reinforced materials, compacted bases and drainage so the work resists freeze-thaw cycles and moisture." },
    ],
    seo: { title: "Hardscaping & Masonry Contractor in Southington, CT | Alpha Hardscapes", description: "Paver patios, walkways, retaining walls and steps for Southington, CT homes. Free estimates from Alpha Hardscapes, based in nearby Cheshire." },
  }),
  town(HC[1], HC[0], {
    slug: "avon",
    name: "Avon",
    order: 60,
    heading: "Skilled masonry and hardscape contractor in Avon, CT",
    intro:
      "Alpha Hardscapes is a skilled masonry contractor serving Avon, CT with durable stone, brick and concrete construction for residential properties. Our team delivers structurally sound patios, walls, steps and outdoor features designed to withstand Connecticut's seasonal conditions while enhancing curb appeal.",
    image: img("/images/services/skilled-masonry-contractor-avon-ct-complete-hardscape-design.webp", "Hardscape design for an Avon, CT home"),
    mapQuery: "Avon, CT",
    highlights: [
      { title: "Comprehensive residential masonry", text: "Brickwork, natural stone, retaining walls, patios and structural masonry planned for stability and drainage.", icon: "wall" },
      { title: "Construction for seasonal weather", text: "Reinforced materials and proven methods that prevent cracking and settling.", icon: "shield" },
      { title: "Detail-oriented craftsmanship", text: "Secure mortar joints, clean alignment and visually consistent finishes.", icon: "check" },
    ],
    body: pt(`
## Why hire a skilled masonry contractor in Avon
- Structural stability: walls, steps, chimneys and hardscape elements built to safely support weight and resist movement
- Weather resistance: installations that manage drainage and prevent water infiltration
- Property appeal: durable brick and stone features that improve curb appeal and outdoor function
`),
    faqs: [
      { question: "What services does a masonry contractor in Avon provide?", answer: "Brick installation, stonework, concrete construction, retaining walls, patios, steps and structural masonry repairs for residential properties." },
      { question: "How does masonry hold up in Avon's climate?", answer: "Masonry in Avon must withstand freeze-thaw cycles and moisture. We use reinforced materials and proper installation techniques for long-term performance." },
      { question: "When should I hire a masonry contractor in Avon?", answer: "When building new hardscape features, repairing damaged brickwork or upgrading outdoor structures." },
    ],
    seo: { title: "Masonry & Hardscape Contractor in Avon, CT | Alpha Hardscapes", description: "Skilled masonry contractor in Avon, CT delivering durable brick and stone patios, walls and steps. Free estimates from Alpha Hardscapes." },
  }),
  town(HC[1], HC[0], {
    slug: "farmington",
    name: "Farmington",
    order: 70,
    heading: "Masonry and hardscape contractor in Farmington, CT",
    intro:
      "Alpha Hardscapes builds paver patios, walkways, retaining walls and stone steps for Farmington homeowners, from the historic village to Unionville and the newer neighbourhoods along the Farmington River valley.",
    image: img("/images/gallery/stairs-3183.webp", "Bluestone front steps and paver landing"),
    mapQuery: "Farmington, CT",
    neighborhoods: ["Farmington Village", "Unionville", "Oakland Gardens"],
    highlights: [
      { title: "Historic-home sensitivity", text: "Bluestone, fieldstone and brick details that suit Farmington's older homes.", icon: "design" },
      { title: "Slope and drainage expertise", text: "Terraced walls and graded patios for hillside lots.", icon: "wall" },
      { title: "One crew from estimate to clean-up", text: "Clear communication and a tidy site every day.", icon: "check" },
    ],
    body: pt(`
## Hardscaping for Farmington properties
Farmington's river-valley lots and historic village homes call for careful material choices and drainage. We build front entries, patios, walls and steps that respect the character of the home and perform through New England winters.
`),
    faqs: [
      { question: "What services do you offer in Farmington?", answer: "Paver patios and walkways, retaining walls, stone steps, outdoor kitchens, fire features, pool patios, chimney repair and landscaping." },
    ],
    seo: { title: "Masonry & Hardscape Contractor in Farmington, CT | Alpha Hardscapes", description: "Paver patios, walkways, retaining walls and stone steps for Farmington, CT homes. Free estimates from Alpha Hardscapes." },
  }),
  town(HC[1], HC[0], {
    slug: "glastonbury",
    name: "Glastonbury",
    order: 80,
    heading: "Hardscaping and masonry contractor in Glastonbury, CT",
    intro:
      "Glastonbury's estates and family homes deserve hardscapes built to match. Alpha Hardscapes designs and installs patios, outdoor kitchens, fire features, retaining walls and front entries across Glastonbury and South Glastonbury.",
    image: img("/images/gallery/patio-techo-bloc-lafayette-pat.webp", "Techo-Bloc patio with built-in grill"),
    mapQuery: "Glastonbury, CT",
    neighborhoods: ["South Glastonbury", "Addison", "Buckingham", "Hopewell"],
    highlights: [
      { title: "Premium materials", text: "Techo-Bloc, Unilock, bluestone and granite for high-end results.", icon: "patio" },
      { title: "Complete outdoor living", text: "Patios, kitchens, fire features and lighting designed as one plan.", icon: "kitchen" },
      { title: "Built to last", text: "Compacted bases, drainage and reinforced walls.", icon: "shield" },
    ],
    body: pt(`
## Outdoor living in Glastonbury
We design complete backyard spaces for Glastonbury homes: paver patios with outdoor kitchens and fire pits, pool surrounds, terraced walls for hillside lots and front entries in natural stone.
`),
    faqs: [
      { question: "Do you build outdoor kitchens in Glastonbury?", answer: "Yes. Masonry outdoor kitchens with built-in grills, counters and bars are among our most requested Glastonbury projects, usually as part of a new patio." },
    ],
    seo: { title: "Hardscaping & Masonry Contractor in Glastonbury, CT | Alpha Hardscapes", description: "Patios, outdoor kitchens, fire features, retaining walls and front entries for Glastonbury, CT homes. Free estimates from Alpha Hardscapes." },
  }),
  town(HC[1], HC[0], {
    slug: "west-hartford",
    name: "West Hartford",
    order: 90,
    heading: "Skilled masonry contractor in West Hartford, CT",
    intro:
      "Alpha Hardscapes provides skilled masonry and hardscaping in West Hartford: custom patios, walkways, retaining walls and stone features tailored to each property, from the historic streets near West Hartford Center to Bishops Corner and Elmwood.",
    image: img("/images/gallery/g-IMG_7234.webp", "Curved paver walkway through a lawn"),
    mapQuery: "West Hartford, CT",
    neighborhoods: ["West Hartford Center", "Bishops Corner", "Elmwood", "Blue Back Square area"],
    highlights: [
      { title: "Custom masonry solutions", text: "Patios, walkways, retaining walls and outdoor features designed for each property.", icon: "design" },
      { title: "Weather-resistant construction", text: "Materials and methods that handle freeze-thaw cycles and moisture.", icon: "shield" },
      { title: "Clean, consistent finishes", text: "Precise joints and balanced layouts.", icon: "check" },
    ],
    body: pt(`
## Masonry for West Hartford homes
West Hartford's older homes often have brick and bluestone details worth matching. We build front entries, patios and garden walls that complement them, and we repair ageing steps, walls and chimneys.
`),
    faqs: [
      { question: "What services does a masonry contractor in West Hartford provide?", answer: "Patio installation, walkways, retaining walls, stone features, steps, chimney repair and masonry restoration." },
    ],
    seo: { title: "Masonry & Hardscape Contractor in West Hartford, CT | Alpha Hardscapes", description: "Custom patios, walkways, retaining walls and stone features for West Hartford, CT. Free estimates from Alpha Hardscapes." },
  }),
  town(HC[1], HC[0], {
    slug: "berlin",
    name: "Berlin",
    order: 100,
    heading: "Masonry and hardscape contractor in Berlin, CT",
    intro:
      "Alpha Hardscapes serves Berlin and Kensington with paver patios, walkways, retaining walls, stone steps and repairs built for the town's mix of older homes and newer developments.",
    image: img("/images/gallery/retaining-wall-0313.webp", "Natural stone retaining wall"),
    mapQuery: "Berlin, CT",
    neighborhoods: ["Kensington", "East Berlin", "Worthington Ridge"],
    highlights: [
      { title: "Local crew", text: "A short drive from Cheshire for quick site visits.", icon: "map" },
      { title: "Durable materials", text: "Pavers and stone rated for Connecticut winters.", icon: "shield" },
      { title: "Repairs and new builds", text: "From re-levelling an old walkway to a full backyard patio.", icon: "repair" },
    ],
    body: pt(`
## Hardscaping in Berlin and Kensington
We build front entries, backyard patios, retaining walls and steps across Berlin, and we repair the walkways and walls that Connecticut winters have heaved or cracked.
`),
    faqs: [
      { question: "Do you work in Kensington and East Berlin?", answer: "Yes. We serve all of Berlin, including Kensington and East Berlin." },
    ],
    seo: { title: "Masonry & Hardscape Contractor in Berlin, CT | Alpha Hardscapes", description: "Paver patios, walkways, retaining walls and steps for Berlin and Kensington, CT. Free estimates from Alpha Hardscapes." },
  }),
];
