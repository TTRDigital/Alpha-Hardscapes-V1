import type { Service } from "@/lib/types";
import { img } from "./images.ts";
import { pt } from "./pt.ts";

/**
 * Built-in services. The copy comes from the live site's service pages
 * (walkway-patio, retaining walls, stone, wall block, outdoor kitchens, fire
 * features, pools, decks, outdoor living packages, stone steps, chimneys,
 * thinstone, repairs, landscaping and seasonal clean-up), edited for the new
 * structure. Seeded into Sanity by `npm run seed`.
 */
const svc = (s: Omit<Service, "_id"> & { slug: string }): Service => ({ _id: `service-${s.slug}`, ...s });

export const services: Service[] = [
  svc({
    slug: "paver-patios-walkways",
    title: "Paver Patios & Walkways",
    shortTitle: "Patios & Walkways",
    category: "hardscaping",
    order: 10,
    featured: true,
    excerpt: "Custom paver and natural stone patios, walkways and garden paths with a properly compacted base, built for Connecticut freeze-thaw winters.",
    eyebrow: "Patios & walkways",
    heading: "Paver patios and walkways built for New England living",
    heroImage: img("/images/gallery/patio-1804.webp", "Paver patio with a round stone fire pit behind a Connecticut home"),
    intro:
      "A professionally designed patio or walkway changes how you use your yard. Alpha Hardscapes designs and installs custom paver patios, bluestone and fieldstone walkways, garden paths and front entries for homeowners across New Haven, Hartford and Fairfield Counties. Every surface starts with excavation, grading and a compacted stone base so it stays level through Connecticut winters.",
    highlights: [
      { title: "Base preparation done right", text: "Excavation, geotextile, compacted crushed stone and polymeric sand, the steps that keep pavers from heaving or settling.", icon: "ruler" },
      { title: "Drainage and grading", text: "We pitch every patio away from the house and solve wet spots before the first paver is set.", icon: "shield" },
      { title: "Materials for every style", text: "Techo-Bloc and Unilock pavers, bluestone, fieldstone, granite borders and clay brick.", icon: "patio" },
      { title: "Clean, tidy job sites", text: "A small crew, clear communication and a yard left clean at the end of each day.", icon: "check" },
    ],
    body: pt(`
## Patios and walkways that stand up to Connecticut weather
Connecticut patios need to do more than look good. Material selection, base preparation, grading and drainage decide whether a surface still looks new after ten winters. We build each patio and walkway on a properly compacted base with edge restraints, so the pavers stay tight and level year after year.

## Popular materials and design options
- Bluestone patios and walkways with natural edging for Colonial and Cape-style homes
- Fieldstone paths that suit traditional, rustic and wooded properties
- Concrete pavers from Techo-Bloc and Unilock in large-format, cobble and plank styles
- Granite or contrasting paver borders that frame the space and hide cuts
- Clay brick for classic front entries and herringbone details
- Sitting walls, steps, lighting and planting beds that tie the patio into the yard

## What is included in a patio or walkway project
1. A free on-site consultation to measure the space, talk through how you will use it and look at drainage.
2. A written estimate with the layout, materials and a realistic schedule.
3. Excavation to the right depth, a compacted crushed-stone base and bedding sand.
4. Paver or stone installation with edge restraints, cuts and borders.
5. Polymeric sand, compaction, clean-up and a final walk-through with maintenance tips.
`),
    gallery: [
      img("/images/gallery/patio-1805.webp", "Large paver patio with fire pit and lawn"),
      img("/images/gallery/walkway-0909.webp", "Paver walkway with a dark border leading to a front door"),
      img("/images/gallery/g-IMG_0195.webp", "Red clay brick patio behind a Colonial home"),
      img("/images/gallery/patio-techo-bloc-lafayette-pat.webp", "Techo-Bloc patio with a built-in grill and sitting wall"),
      img("/images/gallery/g-nHCknubs.webp", "Bluestone walkway between a stone wall and a lawn"),
      img("/images/gallery/walkway-2935.webp", "Curved paver walkway with a contrasting border"),
    ],
    materials: ["Techo-Bloc pavers", "Unilock pavers", "Bluestone", "Fieldstone", "Clay brick", "Granite borders"],
    faqs: [
      { question: "What materials do you offer for patios and walkways?", answer: "We install concrete pavers (Techo-Bloc, Unilock and Cambridge), natural bluestone and fieldstone, clay brick and granite. During the estimate we bring samples and show you projects built with each material so you can compare the look, cost and maintenance." },
      { question: "How long does installation take?", answer: "Most walkways are finished in two to four days and most patios in one to two weeks, depending on size, access and the features included. We give you a schedule with the estimate and keep you updated if weather changes it." },
      { question: "Can you fix drainage or grading problems at the same time?", answer: "Yes. Wet spots, water against the foundation and sloped yards are common in Connecticut. We grade the base, add drainage where needed and can combine the patio with a retaining wall or steps." },
      { question: "Do you offer free consultations?", answer: "Yes. We visit the property, measure, listen to how you want to use the space and send a written estimate at no cost." },
      { question: "Is your work under warranty?", answer: "We stand behind our workmanship. Ask us for the written warranty terms for your project when you receive your estimate." },
    ],
    seo: { title: "Paver Patios & Walkways in Cheshire, CT | Alpha Hardscapes", description: "Custom paver and natural stone patios and walkways in New Haven, Hartford and Fairfield Counties, CT. Proper base prep, drainage and clean installation. Free estimates." },
  }),
  svc({
    slug: "retaining-walls",
    title: "Retaining Walls",
    shortTitle: "Retaining Walls",
    category: "masonry",
    order: 20,
    featured: true,
    excerpt: "Natural stone and wall-block retaining walls that hold back slopes, stop erosion and add usable, level space to your yard.",
    eyebrow: "Retaining walls",
    heading: "Retaining walls that hold their ground",
    heroImage: img("/images/gallery/g-IMG_6896.webp", "Block retaining wall with a fence along the top edge of a yard"),
    intro:
      "Retaining walls do more than hold back soil. They protect foundations, manage runoff, reshape sloped lots and create flat space for patios, lawns and planting beds. Alpha Hardscapes builds natural stone and engineered wall-block retaining walls across Connecticut, with the drainage and base work that keeps them straight for decades.",
    highlights: [
      { title: "Stop erosion", text: "Walls hold back soil and manage runoff that would otherwise wash out beds and undermine hardscapes.", icon: "shield" },
      { title: "Improve drainage", text: "Gravel backfill, perforated drain pipe and weep holes relieve water pressure behind the wall.", icon: "wall" },
      { title: "Gain usable space", text: "Terraces and tiered walls turn a slope into level lawn, patio or garden.", icon: "ruler" },
      { title: "Natural stone or wall block", text: "Fieldstone and granite for a timeless look, or interlocking block systems for clean modern lines.", icon: "hammer" },
    ],
    body: pt(`
## Natural stone retaining walls
Natural stone walls use fieldstone, granite or quarried wall stone to support soil on sloped or uneven ground. They create flat areas for garden beds, patios and paths and suit Connecticut's historic homes and wooded lots. Each wall is built on a compacted stone footing with gravel backfill and drainage so water never builds up behind it.

## Wall-block retaining walls
Wall blocks are interlocking concrete units engineered for retaining walls. They go up faster than mortared stone, come in textures and colours that match modern pavers and can be reinforced with geogrid for taller walls. We use them for soil stabilisation on sloped properties, tiered garden beds, driveway edges and patio seating walls.

## Why a well-built wall matters in Connecticut
- Freeze-thaw cycles push on any wall without proper drainage; ours include gravel backfill and drain pipe
- Clay soils and heavy rain add pressure, so the base and batter (lean) are sized to the wall height
- Walls over four feet or near a structure may need engineering and a permit; we handle both
- A sound wall adds value, usable space and curb appeal

## Our retaining wall process
1. On-site assessment of the slope, soil and drainage, with a free written estimate.
2. Material selection: natural stone, wall block or a mix with stone caps.
3. Excavation and a compacted crushed-stone footing below frost concerns.
4. Course-by-course construction with backfill, drainage and geogrid where required.
5. Caps, clean-up and a final walk-through.
`),
    gallery: [
      img("/images/gallery/retaining-wall-0313.webp", "Natural stone retaining wall at the edge of a lawn"),
      img("/images/gallery/g-mOp5JaWQ.webp", "Tiered block retaining wall with a railing above a pool area"),
      img("/images/gallery/g-SNvrib4k.webp", "Long block retaining wall with a black aluminium fence on top"),
      img("/images/gallery/retaining-wall-stoneyard-stone-veneer-b.webp", "Stone veneer retaining wall beside a lawn"),
      img("/images/gallery/retaining-wall-0282.webp", "Retaining wall under construction with stone base"),
      img("/images/services/stone-walls-image-1.webp", "Stone retaining wall with steps and plantings"),
    ],
    materials: ["Fieldstone", "Granite wall stone", "Techo-Bloc and Unilock wall systems", "Stone veneer over block", "Bluestone and granite caps"],
    faqs: [
      { question: "How long does it take to build a retaining wall?", answer: "Small garden walls take two to three days. Larger structural walls with drainage, geogrid and tiers take one to two weeks. We give a schedule with the estimate." },
      { question: "What is the best material for my retaining wall?", answer: "Natural stone gives a timeless look and suits older homes; wall block is cost-effective, consistent and ideal for modern designs and taller engineered walls. We will show both at the site visit and recommend what fits your slope, budget and style." },
      { question: "How do I know if I need a retaining wall?", answer: "If soil washes onto your patio or driveway, a slope is hard to mow, water pools against the house or you want a level area for a patio or lawn, a retaining wall is usually the answer." },
      { question: "Will a retaining wall add value to my home?", answer: "Yes. A well-built wall protects your property, creates usable space and improves curb appeal, all of which buyers notice." },
      { question: "Do you repair leaning or failing walls?", answer: "Yes. We assess whether the wall can be repaired or should be rebuilt with proper drainage, and we explain the options and costs before any work starts." },
    ],
    seo: { title: "Retaining Walls in Cheshire & New Haven County, CT | Alpha Hardscapes", description: "Natural stone and wall-block retaining walls built with proper drainage and base preparation. Serving New Haven, Hartford and Fairfield Counties, CT. Free estimates." },
  }),
  svc({
    slug: "stone-steps",
    title: "Stone Steps & Front Entries",
    shortTitle: "Stone Steps",
    category: "masonry",
    order: 30,
    featured: true,
    excerpt: "Bluestone and granite steps, landings and front entries that are safe, level and built on a solid base.",
    eyebrow: "Steps & entries",
    heading: "Natural stone steps that make a safe, lasting entrance",
    heroImage: img("/images/gallery/g-IMG_0680.webp", "Thick bluestone treads on a front entry with a paver landing"),
    intro:
      "Alpha Hardscapes designs and installs natural stone steps across Connecticut for front entries, patios and sloped yards. Each set of steps is engineered for stability, with a reinforced base and correct rise and run, and finished to blend with your walkway, retaining wall or patio.",
    highlights: [
      { title: "Engineered for stability", text: "Compacted base, proper grading and solid treads so steps never rock or settle.", icon: "steps" },
      { title: "Durable natural stone", text: "Thermal bluestone, granite and fieldstone chosen for strength in freeze-thaw conditions.", icon: "shield" },
      { title: "Integrated design", text: "Steps that connect cleanly with walkways, patios, walls and lighting.", icon: "design" },
    ],
    body: pt(`
## Front entry steps and landings
A front entry is the first thing visitors see. We rebuild crumbling concrete and brick steps with bluestone treads, granite risers or paver veneer, add a landing sized for the door and tie it into a new walkway.

## Steps through sloped yards and gardens
Fieldstone slab steps, bluestone treads on a block base and lit garden steps turn a slope into a path you can use at night. We set each tread on compacted stone so it stays level.

## Materials
- Thermal and natural-cleft bluestone treads
- Granite steps and risers
- Fieldstone slab steps for woodland paths
- Paver or stone veneer on a block core
- Low-voltage step lighting and railings
`),
    gallery: [
      img("/images/gallery/stairs-3183.webp", "Bluestone front steps with a paver landing at a white house"),
      img("/images/gallery/stairs-0320.webp", "Bluestone treads set into a lawn slope"),
      img("/images/gallery/stairs-1752.webp", "Garden steps lit with low-voltage lights at night"),
      img("/images/gallery/stairs-1898.webp", "Front entry steps with a railing and paver walkway"),
      img("/images/gallery/stairs-5525.webp", "Stone front steps with an iron railing"),
      img("/images/gallery/stairs-32f9.webp", "Bluestone treads on brick risers beside a paver patio"),
    ],
    materials: ["Thermal bluestone", "Granite", "Fieldstone slabs", "Stone veneer"],
    faqs: [
      { question: "What materials are used for stone steps?", answer: "Most front entries use thermal bluestone treads with granite or veneered risers. Garden and slope steps often use fieldstone slabs or bluestone on a block base. We match the stone to your walkway and home." },
      { question: "Are natural stone steps durable in winter?", answer: "Yes. Dense stone like bluestone and granite handles freeze-thaw cycles and salt far better than poured concrete, and a compacted base keeps the steps from shifting." },
      { question: "Can new steps connect to my existing patio or walkway?", answer: "Yes. We design the steps to meet existing surfaces at the right height and can extend or rebuild the walkway so everything matches." },
    ],
    seo: { title: "Natural Stone Steps in Connecticut | Alpha Hardscapes", description: "Bluestone, granite and fieldstone steps and front entries built on a solid base. Serving Cheshire and New Haven, Hartford and Fairfield Counties, CT." },
  }),
  svc({
    slug: "outdoor-kitchens",
    title: "Outdoor Kitchens",
    shortTitle: "Outdoor Kitchens",
    category: "outdoor-living",
    order: 40,
    featured: true,
    excerpt: "Masonry outdoor kitchens with built-in grills, counters, bars and storage, designed as part of a complete patio.",
    eyebrow: "Outdoor kitchens",
    heading: "Outdoor kitchens built, designed and engineered for your backyard",
    heroImage: img("/images/services/custom-outdoor-kitchens-connecticut-stone-patio-design.webp", "Stone outdoor kitchen with a built-in grill on a paver patio"),
    intro:
      "Alpha Hardscapes designs and builds custom outdoor kitchens for homeowners throughout New Haven, Hartford and Fairfield Counties. Every kitchen is built on site with reinforced masonry, built-in grills, stone or concrete counters and the storage, seating and lighting that make it a place you actually cook and gather.",
    highlights: [
      { title: "Layouts planned for how you entertain", text: "Grill, prep, bar and seating placed for traffic flow and the view, not just the wall.", icon: "kitchen" },
      { title: "Masonry that lasts", text: "Reinforced block cores with stone or paver veneer that resist cracking in Connecticut winters.", icon: "shield" },
      { title: "Part of a complete design", text: "Matching patios, sitting walls, fire features and lighting so the space works as one.", icon: "design" },
    ],
    body: pt(`
## What we build
- Straight, L-shaped and island kitchens with built-in gas or charcoal grills
- Granite, bluestone or concrete countertops and raised bars
- Pizza ovens, side burners, refrigerators, sinks and storage doors
- Stone, thin-stone veneer or paver-faced bases to match your patio
- Pergolas, lighting and seating walls

## Built for Connecticut weather
Freeze-thaw winters and humid summers test every outdoor structure. We build on a proper footing with reinforced block, flash and seal counters, and use appliances rated for outdoor use so the kitchen holds up season after season.
`),
    gallery: [
      img("/images/services/custom-outdoor-kitchens-connecticut-backyard-landscape.webp", "Outdoor kitchen with pergola on a backyard patio"),
      img("/images/gallery/patio-techo-bloc-lafayette-pat.webp", "Patio with a built-in grill and sitting wall"),
      img("/images/services/alphahardscapes-image-2.webp", "Outdoor kitchen with stone countertops"),
    ],
    materials: ["Granite and bluestone counters", "Stone veneer", "Techo-Bloc and Unilock wall units", "Stainless outdoor appliances"],
    faqs: [
      { question: "What appliances can be included in an outdoor kitchen?", answer: "Built-in grills, side burners, pizza ovens, outdoor refrigerators, sinks, storage drawers and bar seating. We plan the gas, water and electrical runs with you before construction." },
      { question: "Are outdoor kitchens built for long-term durability?", answer: "Yes. We use reinforced masonry, flashed and sealed counters and outdoor-rated appliances so the kitchen resists cracking, moisture and surface wear." },
      { question: "How is the layout decided?", answer: "We start with your patio dimensions, the path from the house and how you like to cook and entertain, then place the grill, prep space and seating so the kitchen feels natural to use." },
    ],
    seo: { title: "Custom Outdoor Kitchens in Connecticut | Alpha Hardscapes", description: "Masonry outdoor kitchens with built-in grills, counters and bars, designed with your patio. Serving New Haven, Hartford and Fairfield Counties, CT. Free estimates." },
  }),
  svc({
    slug: "fire-pits-fireplaces",
    title: "Fire Pits & Outdoor Fireplaces",
    shortTitle: "Fire Features",
    category: "outdoor-living",
    order: 50,
    featured: true,
    excerpt: "Wood and gas fire pits and masonry fireplaces that extend your patio season from April to November.",
    eyebrow: "Fire features",
    heading: "Fire pits and outdoor fireplaces, durable and refined",
    heroImage: img("/images/gallery/fire-pit-2254.webp", "Round stone fire pit on a paver patio with seating"),
    intro:
      "Alpha Hardscapes designs and builds outdoor fire features in Connecticut that make a backyard usable on cool evenings. We build masonry fire pits and fireplaces, wood-burning or gas, engineered to handle seasonal weather and placed to fit your patio, seating and views.",
    highlights: [
      { title: "Placed for comfort", text: "Fire features sized and positioned for seating, smoke and safe clearances.", icon: "fire" },
      { title: "Weather-resistant masonry", text: "Reinforced block, fire-rated liners and stone or paver veneer that handle freeze-thaw cycles.", icon: "shield" },
      { title: "Matches your hardscape", text: "Built with the same stone and pavers as your patio, walls and kitchen.", icon: "design" },
    ],
    body: pt(`
## Fire pits
Round or square masonry fire pits with a steel or firebrick liner, built on a compacted base and finished in wall block, natural stone or veneer. Wood-burning or natural gas and propane with a hidden key valve.

## Outdoor fireplaces
Full-height masonry fireplaces with a firebox, chimney and hearth, often paired with seating walls and a covered patio. A fireplace draws smoke up and away, so it suits smaller patios and spaces close to the house.

## Safety and codes
We follow Connecticut fire clearance guidelines and manufacturer specifications for gas appliances, and we will tell you if a permit is needed for your town.
`),
    gallery: [
      img("/images/gallery/fire-pit-1804.webp", "Fire pit at the centre of a large paver patio"),
      img("/images/gallery/fire-pit-2883.webp", "Fire pit patio surrounded by lawn"),
      img("/images/gallery/patio-6034.webp", "Paver patio with a square fire pit"),
      img("/images/services/outdoor-fire-features-connecticut-masonry-fireplace.webp", "Masonry outdoor fireplace on a stone patio"),
    ],
    materials: ["Wall block kits", "Natural stone", "Firebrick liners", "Gas burner inserts"],
    faqs: [
      { question: "What types of fire features do you build?", answer: "Wood-burning and gas fire pits, outdoor fireplaces, fire tables and seating walls around them, all built in masonry to match your patio." },
      { question: "Are outdoor fire features safe for residential properties?", answer: "Yes, when built with the right liner, base and clearances from structures and overhangs. We design to Connecticut guidelines and manufacturer specifications." },
      { question: "Do fire features need maintenance?", answer: "Very little. Clear ash from wood pits, cover gas burners in winter and have the masonry checked for joints every few years." },
    ],
    seo: { title: "Fire Pits & Outdoor Fireplaces in Connecticut | Alpha Hardscapes", description: "Masonry fire pits and outdoor fireplaces, wood or gas, built for Connecticut patios and backyards. Serving New Haven, Hartford and Fairfield Counties. Free estimates." },
  }),
  svc({
    slug: "pool-patios",
    title: "Pool Patios & Surrounds",
    shortTitle: "Pool Patios",
    category: "outdoor-living",
    order: 60,
    featured: true,
    excerpt: "Paver and bluestone pool decks, coping, retaining walls and fencing that turn a pool into a complete backyard.",
    eyebrow: "Pools & pool patios",
    heading: "Pool patios and surrounds that finish the backyard",
    heroImage: img("/images/gallery/g-IMG_8957.webp", "Rectangular pool with bluestone coping and a paver surround"),
    intro:
      "From the patio around an existing pool to the full build-out of a new one, Alpha Hardscapes handles the hardscape that makes a pool feel finished: paver and bluestone decks, coping, raised walls, steps, fencing and the planting beds around them. We work across New Haven, Hartford and Fairfield Counties.",
    highlights: [
      { title: "Slip-resistant surfaces", text: "Textured pavers and thermal bluestone that stay cool and grip when wet.", icon: "pool" },
      { title: "Drainage planned in", text: "Decks pitched away from the pool with channel drains where needed.", icon: "shield" },
      { title: "Walls, steps and fences", text: "Retaining walls for sloped lots, stone steps and code-compliant pool fencing.", icon: "wall" },
    ],
    body: pt(`
## Pool deck and coping
We install paver, travertine and bluestone pool decks with matching bullnose coping. Large-format pavers in light colours keep the surface cooler underfoot and handle salt and chlorine.

## Making the yard work around the pool
Many Connecticut lots slope. We build retaining walls to create the level pad, steps to connect the house and lawn, and plant beds, fire features and outdoor kitchens so the pool is part of a whole outdoor living space.

## New pool projects
We also partner on new in-ground and on-ground pool installations, handling excavation, base, the surrounding hardscape and the final grading so you deal with one team.
`),
    gallery: [
      img("/images/gallery/pool-1249.webp", "Kidney-shaped pool with a paver surround"),
      img("/images/gallery/pool-9420.webp", "Pool with a black aluminium fence and paver deck"),
      img("/images/gallery/g-mOp5JaWQ.webp", "Tiered retaining wall and railing above a pool"),
      img("/images/gallery/g-IMG_2566.webp", "Raised paver patio around a pool under construction"),
      img("/images/gallery/fence-att.webp", "Pool with a white fence and gazebo"),
    ],
    materials: ["Techo-Bloc and Unilock pavers", "Thermal bluestone coping", "Travertine", "Aluminium pool fencing"],
    faqs: [
      { question: "Do you need a permit for a pool patio?", answer: "A patio alone usually does not, but pools, pool fencing and retaining walls often do. We check the requirements in your town and handle the paperwork." },
      { question: "What is the best time of year to build?", answer: "Spring and fall are ideal for hardscape work. Booking a winter consultation gets you on the schedule before the season fills." },
      { question: "What surface is best around a pool?", answer: "Light-coloured, textured pavers or thermal bluestone. They stay cooler, resist slipping and handle pool chemicals. We bring samples to the site visit." },
    ],
    seo: { title: "Pool Patios & Surrounds in Connecticut | Alpha Hardscapes", description: "Paver and bluestone pool decks, coping, retaining walls and fencing in New Haven, Hartford and Fairfield Counties, CT. Free estimates from Alpha Hardscapes." },
  }),
  svc({
    slug: "decks",
    title: "Decks",
    shortTitle: "Decks",
    category: "outdoor-living",
    order: 70,
    excerpt: "Composite and wood decks that connect the house to the patio, with railings, stairs and lighting.",
    eyebrow: "Decks",
    heading: "Custom decks that connect your home to the yard",
    heroImage: img("/images/services/new-haven-ct-modern-composite-backyard-deck.webp", "Modern composite deck behind a Connecticut home"),
    intro:
      "Alpha Hardscapes builds custom decks in Cheshire and across Connecticut that pair with our patios, steps and outdoor kitchens. From multi-level composite decks to simple wood platforms, we handle design, material selection, footings, railings and finishing.",
    highlights: [
      { title: "Composite or wood", text: "Low-maintenance composite boards or classic pressure-treated and cedar decking.", icon: "deck" },
      { title: "Built to code", text: "Proper footings, ledger flashing and railings, with permits handled for you.", icon: "shield" },
      { title: "Deck plus patio", text: "Stairs down to a paver patio or fire pit so the whole yard flows together.", icon: "design" },
    ],
    body: pt(`
## Deck options
- Composite decking (Trex, TimberTech) with hidden fasteners and aluminium railings
- Pressure-treated and cedar decks
- Multi-level decks with stairs to a patio
- Built-in benches, planters, privacy screens and low-voltage lighting

## Why build your deck with a hardscape contractor
A deck rarely stands alone. We design the deck, the stairs, the paver landing and the patio below as one plan, so the materials, heights and drainage all work together.
`),
    gallery: [
      img("/images/services/new-haven-ct-elevated-wood-deck-focus.webp", "Elevated wood deck with stairs"),
    ],
    faqs: [
      { question: "Does a deck add value to a house?", answer: "Yes. A well-built deck is one of the outdoor projects with the strongest return, especially when it connects to a patio and makes the yard easier to use." },
      { question: "Composite or wood?", answer: "Composite costs more up front but needs no staining and resists rot. Wood is less expensive and can be refinished. We will price both for your layout." },
    ],
    seo: { title: "Custom Deck Builders in Connecticut | Alpha Hardscapes", description: "Composite and wood decks designed with your patio and steps. Serving Cheshire and New Haven, Hartford and Fairfield Counties, CT." },
  }),
  svc({
    slug: "outdoor-living-packages",
    title: "Outdoor Living Packages",
    shortTitle: "Outdoor Living",
    category: "outdoor-living",
    order: 80,
    excerpt: "Design-and-build packages that pair a patio with a fire pit, outdoor kitchen, pool surround or retaining wall in one plan.",
    eyebrow: "Design + build",
    heading: "Complete outdoor living spaces, planned and built by one team",
    heroImage: img("/images/gallery/patio-1258.webp", "Paver patio with fire pit behind a yellow house"),
    intro:
      "Our outdoor living packages streamline the planning of a full backyard: a custom patio paired with the features you want, from fire pits and outdoor kitchens to pool surrounds, walls, steps and lighting. One plan, one estimate, one crew.",
    highlights: [
      { title: "One plan for the whole yard", text: "Patio, walls, steps, kitchen, fire feature and planting designed together.", icon: "design" },
      { title: "Phased when you want", text: "Build the patio now and add the kitchen or fire feature later, on a plan that already allows for it.", icon: "clock" },
      { title: "Clear investment ranges", text: "We explain what drives cost so you can choose the package that fits.", icon: "check" },
    ],
    body: pt(`
## Typical packages
- **Patio + fire pit:** a paver patio with a built-in fire pit and seating wall
- **Patio + outdoor kitchen:** a cooking and dining patio with grill island and bar
- **Pool surround:** deck, coping, walls, steps and fencing around a new or existing pool
- **Front entry:** walkway, steps, landing and planting beds
- **Full backyard:** patio, kitchen, fire feature, walls, lighting and landscaping

## How it works
1. Free consultation and site measurements.
2. A layout and material plan with an estimate for each phase.
3. Construction by our own crew, with one point of contact.
4. Final walk-through and maintenance guidance.
`),
    gallery: [
      img("/images/gallery/patio-2077.webp", "Patio with outdoor furniture and lawn"),
      img("/images/gallery/g-1000004169.webp", "Pool patio with stone steps and retaining wall"),
    ],
    faqs: [
      { question: "Can a project be built in phases?", answer: "Yes. Many clients build the patio first and add a kitchen, fire feature or lighting later. We plan the base, utilities and layout so later phases fit without rework." },
    ],
    seo: { title: "Outdoor Living Design-Build Packages, CT | Alpha Hardscapes", description: "Patio, fire pit, outdoor kitchen and pool surround packages designed and built by one team across New Haven, Hartford and Fairfield Counties, CT." },
  }),
  svc({
    slug: "chimneys",
    title: "Chimney Installation & Repair",
    shortTitle: "Chimneys",
    category: "masonry",
    order: 90,
    excerpt: "Masonry chimney builds, rebuilds, repointing, crowns, caps and flashing for Connecticut homes.",
    eyebrow: "Chimneys",
    heading: "Chimney installation and repair, safe and durable",
    heroImage: img("/images/services/professional-chimney-installation-repair-connecticut-brick-exterior.webp", "Brick chimney on a Connecticut roof"),
    intro:
      "Alpha Hardscapes delivers professional chimney installation and repair across Connecticut. Our masonry team builds new chimneys and restores existing ones with reinforced materials that stand up to freeze-thaw cycles and moisture, with attention to structure, ventilation and code.",
    highlights: [
      { title: "Full builds and rebuilds", text: "New masonry chimneys, structural rebuilds, liner installation and crown repairs.", icon: "chimney" },
      { title: "Weather-resistant materials", text: "Brick, stone and concrete chosen to resist moisture and temperature swings.", icon: "shield" },
      { title: "Code-compliant work", text: "Proper flashing, clearances and ventilation standards on every job.", icon: "check" },
    ],
    body: pt(`
## Chimney services
- New masonry chimney construction
- Rebuilding deteriorated chimneys above the roofline
- Repointing and tuckpointing mortar joints
- Crown repair and replacement, caps and flashing
- Stone or thin-stone veneer over existing chimneys
- Waterproofing

## Signs you need chimney repair
Crumbling or missing mortar, white staining, loose bricks, a cracked crown, water in the firebox or rust on the damper all point to a chimney that needs attention before winter.
`),
    gallery: [img("/images/services/professional-chimney-installation-repair-connecticut-roof-flashing.webp", "Chimney with new roof flashing")],
    faqs: [
      { question: "What is included in chimney installation and repair?", answer: "Full masonry builds, structural rebuilds, liner installation, crown repairs, repointing, caps and flashing. We assess the chimney and give a written scope with the estimate." },
      { question: "How do I know if my chimney needs repair?", answer: "Look for crumbling mortar, loose or spalling bricks, a cracked crown, water stains inside or rust on the damper. Any of these mean moisture is getting in." },
      { question: "Can chimney work be done in winter?", answer: "Masonry needs temperatures above freezing to cure. We schedule most chimney work from spring to late fall and can protect the chimney in the meantime." },
    ],
    seo: { title: "Chimney Installation & Repair in Connecticut | Alpha Hardscapes", description: "Masonry chimney builds, rebuilds, repointing, crowns and flashing across New Haven, Hartford and Fairfield Counties, CT. Free estimates." },
  }),
  svc({
    slug: "stone-veneer",
    title: "Thin Stone Veneer",
    shortTitle: "Stone Veneer",
    category: "masonry",
    order: 100,
    excerpt: "Natural thin-stone veneer for foundations, walls, chimneys, fireplaces and outdoor kitchens.",
    eyebrow: "Thinstone",
    heading: "Thin stone veneer, refined and durable",
    heroImage: img("/images/services/expert-thinstone-installation-connecticut-home-facade.webp", "Stone veneer on a home facade"),
    intro:
      "Alpha Hardscapes installs natural thin stone veneer across Connecticut to give walls, foundations, chimneys, fireplaces and kitchen islands the look of full stone without the weight. Each installation uses a proper moisture barrier, lath and bonding system so the stone stays put through Connecticut winters.",
    highlights: [
      { title: "Full-stone look, lighter weight", text: "Natural thin veneer over prepared substrates, inside or out.", icon: "veneer" },
      { title: "Interior and exterior", text: "Fireplaces, feature walls, foundations, columns and facades.", icon: "design" },
      { title: "Weather-resistant installation", text: "Moisture barriers and reinforced bonding to prevent shifting and cracking.", icon: "shield" },
    ],
    body: pt(`
## Where thin stone veneer works
- Exposed foundations and retaining-wall faces
- Chimneys and outdoor fireplaces
- Interior fireplace surrounds and feature walls
- Outdoor kitchen islands and bars
- Columns, pillars and entry walls

## Installation
We prepare the substrate with a weather-resistive barrier and lath, apply a scratch coat, set each stone in mortar and finish the joints to your preferred style: tight dry-stack or grouted.
`),
    gallery: [img("/images/services/expert-thinstone-installation-connecticut-fireplace-wall.webp", "Interior fireplace wall with stone veneer")],
    faqs: [
      { question: "Can thinstone be used indoors and outdoors?", answer: "Yes. The same natural veneer suits exterior walls, chimneys and foundations as well as interior fireplaces and feature walls." },
      { question: "Is thinstone durable in Connecticut weather?", answer: "Installed over a proper moisture barrier with the right mortar, natural thin veneer handles freeze-thaw cycles and moisture for decades." },
    ],
    seo: { title: "Thin Stone Veneer Installation in Connecticut | Alpha Hardscapes", description: "Natural thin-stone veneer for foundations, chimneys, fireplaces and walls, installed with proper moisture barriers. New Haven, Hartford and Fairfield Counties, CT." },
  }),
  svc({
    slug: "paver-repair-maintenance",
    title: "Paver Repair & Maintenance",
    shortTitle: "Repairs",
    category: "maintenance",
    order: 110,
    excerpt: "Re-levelling sunken pavers, repointing, polymeric sand, cleaning and sealing to bring older hardscapes back.",
    eyebrow: "Repair & maintenance",
    heading: "Restore your patio, walkway, steps and walls",
    heroImage: img("/images/services/alphahardscapes-image-9.webp", "Stone patio in a residential backyard"),
    intro:
      "Hardscapes are built to last, but years of weather, moisture and settling lead to sunken pavers, loose mortar, cracked steps and weeds in the joints. Alpha Hardscapes repairs and maintains brick, stone and paver work across Connecticut so it looks and performs like new.",
    highlights: [
      { title: "Re-levelling and resetting", text: "Lift sunken or heaved pavers, rebuild the base and reset them flush.", icon: "repair" },
      { title: "Repointing and tuckpointing", text: "Replace deteriorated mortar in steps, walls and chimneys.", icon: "hammer" },
      { title: "Cleaning and sealing", text: "Pressure washing, polymeric sand and sealer that stop weeds and stains.", icon: "check" },
    ],
    body: pt(`
## Repair services
- Re-levelling sunken or heaved pavers and rebuilding the base beneath them
- Replacing cracked or broken pavers and stones
- Repointing mortar joints in steps, walls, veneer and chimneys
- Repairing leaning or bulging retaining walls
- Fixing drainage that caused the damage in the first place

## Maintenance services
- Pressure washing and stain removal
- Re-sanding joints with polymeric sand
- Sealing pavers and natural stone
- Seasonal inspections for older hardscapes

## Why repair early
Small problems grow. A loose step becomes a safety hazard, open joints let water into the base and a leaning wall gets more expensive to fix every winter.
`),
    gallery: [
      img("/images/services/masonry-2.webp", "Masonry repair work on a stone wall"),
      img("/images/services/masonry-3.webp", "Repointed brick steps"),
    ],
    faqs: [
      { question: "Can you repair just part of my patio?", answer: "Yes. We lift the affected area, fix the base and reset the same pavers so the repair blends in. If the pavers are discontinued we will source the closest match." },
      { question: "How often should pavers be sealed?", answer: "Every three to five years, depending on sun, traffic and the sealer used. We clean and re-sand the joints before sealing." },
    ],
    seo: { title: "Paver Repair & Maintenance in Connecticut | Alpha Hardscapes", description: "Re-levelling, repointing, cleaning and sealing for patios, walkways, steps and walls across New Haven, Hartford and Fairfield Counties, CT." },
  }),
  svc({
    slug: "landscaping",
    title: "Landscaping",
    shortTitle: "Landscaping",
    category: "landscaping",
    order: 120,
    excerpt: "Planting beds, lawns, mulch, edging and garden design that finish your hardscape and suit the Connecticut climate.",
    eyebrow: "Landscaping",
    heading: "Landscaping that completes your outdoor space",
    heroImage: img("/images/gallery/bed-3061.webp", "Planting beds and a stone sitting wall beside a house"),
    intro:
      "We design and install landscapes that complement your patio, walkway and walls and perform well in Connecticut's seasons: planting layouts, garden beds, lawns, mulch, edging and seasonal colour for homes and businesses across New Haven, Hartford and Fairfield Counties.",
    highlights: [
      { title: "Design and installation", text: "Front and back yard redesigns, planting plans and garden beds.", icon: "plant" },
      { title: "Plants that thrive here", text: "Native and low-maintenance selections suited to Connecticut soil and winters.", icon: "leafcheck" },
      { title: "Lawn and garden enhancements", text: "Mulching, sod, edging, raised beds, decorative stone and soil preparation.", icon: "design" },
    ],
    body: pt(`
## Residential landscaping
- Custom landscape design and planting plans
- Plant selection and installation: trees, shrubs, perennials and pollinator gardens
- Lawn installation, sod and grading
- Mulch, edging, decorative stone and raised beds
- Seasonal colour and ongoing maintenance plans

## Commercial landscaping
Entrance plantings, beds and seasonal upkeep that keep a business property welcoming, with maintenance scheduled around your hours.

## Landscaping with hardscaping
Because we build the patio, walls and steps too, the planting is designed with them from the start: beds that soften a wall, trees placed for shade over the patio and lawns graded to drain.
`),
    gallery: [
      img("/images/gallery/bed-0084.webp", "Front lawn planting bed with mulch"),
      img("/images/gallery/bed-2823.webp", "Planting beds along a driveway"),
      img("/images/gallery/g-1000006326.webp", "Front yard landscaping with colourful shrubs"),
      img("/images/gallery/g-1000004931.webp", "Walkway with trimmed hedges and lawn"),
    ],
    faqs: [
      { question: "Do you offer landscape maintenance?", answer: "Yes. We offer seasonal clean-ups, pruning, mulching and bed refreshes for the landscapes we install and for existing properties." },
      { question: "Can you landscape around a new patio?", answer: "Yes, and it is the best time to do it. We design the beds, lawn and lighting with the hardscape so everything is graded and planted once." },
    ],
    seo: { title: "Landscaping in New Haven & Fairfield County, CT | Alpha Hardscapes", description: "Landscape design, planting, lawns, mulch and seasonal colour that complement your patio and walls. Serving New Haven, Hartford and Fairfield Counties, CT." },
  }),
  svc({
    slug: "seasonal-cleanup",
    title: "Seasonal Clean-Up, Leaf & Snow Removal",
    shortTitle: "Seasonal Services",
    category: "maintenance",
    order: 130,
    excerpt: "Spring and fall clean-ups, leaf removal, bed preparation and winter snow removal for Southern Connecticut properties.",
    eyebrow: "Seasonal services",
    heading: "Prepare your property for every season",
    heroImage: img("/images/services/seasonal-cleanup-fall.webp", "Fall leaves raked on a lawn"),
    intro:
      "Each season brings its own work: leaves in autumn, snow in winter, bed preparation in spring. Alpha Hardscapes provides seasonal clean-up across Southern Connecticut to keep your lawn, beds and hardscapes healthy and looking their best all year.",
    highlights: [
      { title: "Spring clean-up", text: "Debris removal, bed edging, mulch, pruning and lawn preparation.", icon: "plant" },
      { title: "Fall clean-up and leaf removal", text: "Leaf collection, final mowing, bed cut-backs and winter preparation.", icon: "leaf" },
      { title: "Snow removal", text: "Driveway and walkway clearing for residential and small commercial properties.", icon: "snow" },
    ],
    body: pt(`
## Spring clean-up
Clear winter debris, cut back perennials, edge and mulch beds, prune shrubs and prepare the lawn for the season.

## Fall clean-up and leaf removal
Remove leaves from lawns, beds and hardscapes before they smother grass and stain pavers, cut back plants and leave the property ready for winter.

## Snow removal
Plowing and shovelling of driveways, walkways and steps for homes and small businesses in our service area, with care taken around paver surfaces.
`),
    gallery: [
      img("/images/services/seasonal-cleanup-spring.webp", "Spring garden clean-up"),
      img("/images/services/seasonal-cleanup-winter.webp", "Snow being cleared from a walkway"),
    ],
    faqs: [
      { question: "Can snow removal damage pavers?", answer: "Plow blades and metal shovels can scratch pavers. We use rubber-edged blades and plastic shovels on hardscapes and recommend calcium-based de-icers instead of rock salt." },
    ],
    seo: { title: "Seasonal Clean-Up, Leaf & Snow Removal, CT | Alpha Hardscapes", description: "Spring and fall clean-ups, leaf removal and snow removal for homes and businesses across New Haven, Hartford and Fairfield Counties, CT." },
  }),
];

/** Resolve the related services for a service (by slug) at render time. */
export function withRelated(service: Service): Service {
  const related: Record<string, string[]> = {
    "paver-patios-walkways": ["retaining-walls", "stone-steps", "fire-pits-fireplaces"],
    "retaining-walls": ["paver-patios-walkways", "stone-steps", "landscaping"],
    "stone-steps": ["paver-patios-walkways", "retaining-walls", "stone-veneer"],
    "outdoor-kitchens": ["paver-patios-walkways", "fire-pits-fireplaces", "outdoor-living-packages"],
    "fire-pits-fireplaces": ["paver-patios-walkways", "outdoor-kitchens", "outdoor-living-packages"],
    "pool-patios": ["retaining-walls", "paver-patios-walkways", "outdoor-living-packages"],
    decks: ["paver-patios-walkways", "stone-steps", "outdoor-living-packages"],
    "outdoor-living-packages": ["outdoor-kitchens", "fire-pits-fireplaces", "pool-patios"],
    chimneys: ["stone-veneer", "paver-repair-maintenance", "fire-pits-fireplaces"],
    "stone-veneer": ["chimneys", "retaining-walls", "outdoor-kitchens"],
    "paver-repair-maintenance": ["paver-patios-walkways", "retaining-walls", "seasonal-cleanup"],
    landscaping: ["paver-patios-walkways", "seasonal-cleanup", "retaining-walls"],
    "seasonal-cleanup": ["landscaping", "paver-repair-maintenance", "paver-patios-walkways"],
  };
  const slugs = related[service.slug] || [];
  return { ...service, relatedServices: slugs.map((s) => services.find((x) => x.slug === s)!).filter(Boolean) };
}
