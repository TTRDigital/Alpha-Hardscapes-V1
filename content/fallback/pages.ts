import type { AboutPage, HomePage, Page } from "@/lib/types";
import { img } from "./images.ts";
import { pt } from "./pt.ts";
import legal from "./legal.data.ts";

export const homePage: HomePage = {
  eyebrow: "Hardscaping & masonry · Cheshire, Connecticut",
  heading: "Patios, walkways and walls built to last.",
  subheading:
    "Hardscaping, masonry and outdoor living for homes across New Haven, Hartford and Fairfield Counties. One crew, one point of contact, a free on-site estimate.",
  heroImage: img("/images/brand/hero-poster.webp", "Lit pool, paver patio and fire pit behind a Connecticut home at dusk"),
  heroVideoUrl: "/images/brand/hero.mp4",
  reelVideoUrl: "/images/brand/reel-vertical.mp4",
  reelPosterUrl: "/images/brand/reel-vertical-poster.webp",
  trustPoints: ["Free on-site estimates", "Fully insured", "Based in Cheshire, CT"],
  stats: [
    { value: "20+", label: "years of combined experience" },
    { value: "5.0", label: "star Google rating" },
    { value: "3", label: "counties served" },
  ],
  servicesHeading: "What we build",
  servicesText: "Designed together and built by the same crew, from the first stone to the final walk-through.",
  projectsHeading: "Recent projects",
  projectsText: "Real work from Connecticut yards, photographed on site.",
  aboutHeading: "A small, hands-on crew led by its founder",
  aboutText:
    "We are a small, hands-on crew from Cheshire. The person who walks your property and writes the estimate is the person who builds it, so every base, edge and joint is done the way we would want it at our own homes.",
  aboutImage: img("/images/people/sebastian-cutout.webp", "Sebastian Ullrich, founder of Alpha Hardscapes"),
  whyHeading: "Why Connecticut homeowners choose Alpha Hardscapes",
  whyItems: [
    { title: "Craftsmanship you can see", text: "Tight joints, straight borders and clean cuts on every patio, walkway and wall.", icon: "hammer" },
    { title: "Base work done right", text: "Excavation, compacted stone and drainage are where most hardscapes fail. We never skip them.", icon: "ruler" },
    { title: "Fully insured", text: "Liability coverage for every job, with a certificate of insurance on request.", icon: "shield" },
    { title: "Local expertise", text: "We know Connecticut soils, freeze-thaw winters, drainage problems and the materials that perform here.", icon: "map" },
    { title: "Clear communication", text: "A written estimate, a realistic schedule and updates while we work.", icon: "phone" },
    { title: "On time, every time", text: "An efficient process and a dedicated crew keep your project on schedule.", icon: "clock" },
  ],
  processHeading: "How a project works",
  processText: "Five steps from the first call to the final walk-through, with no surprises along the way.",
  processSteps: [
    { title: "Free consultation", text: "We visit your property, listen to your goals, review the site and recommend the best approach for your budget." },
    { title: "Design and materials", text: "We sketch the layout, bring samples and help you choose pavers, stone and features that fit your home." },
    { title: "Written proposal", text: "A clear proposal with scope, timeline and cost, so you know exactly what to expect." },
    { title: "Construction", text: "Our own crew builds the project with careful base preparation and keeps you updated throughout." },
    { title: "Final walk-through", text: "We review every detail with you, leave the site clean and share maintenance tips." },
  ],
  reviewsHeading: "What our clients say",
  areasHeading: "Where we work",
  areasText: "Based in Cheshire and serving homeowners throughout New Haven County, Hartford County and Fairfield County, Connecticut.",
  faqHeading: "Common questions",
  seo: {
    title: "Hardscaping & Masonry Contractor, Cheshire CT | Alpha Hardscapes",
    description: "Paver patios, walkways, retaining walls, stone steps, outdoor kitchens and fire pits across New Haven, Hartford and Fairfield Counties, CT. Free estimates.",
  },
};

export const aboutPage: AboutPage = {
  heading: "The hardscaping and masonry experts of Southern Connecticut",
  intro:
    "Alpha Hardscapes is a Cheshire-based hardscaping, paver and masonry company serving New Haven, Hartford and Fairfield Counties. We design and build custom outdoor spaces, from front entries and patios to retaining walls, outdoor kitchens and pool surrounds, for homeowners and businesses who want work that lasts.",
  heroImage: img("/images/gallery/g-IMG_1601.webp", "Paver patio with a stone wall built by Alpha Hardscapes"),
  founderName: "Sebastian Ullrich",
  founderTitle: "Founder & owner",
  founderImage: img("/images/people/sebastian-cutout.webp", "Sebastian Ullrich, founder of Alpha Hardscapes, in an Alpha Hardscapes shirt"),
  founderBio: pt(`
Sebastian's passion for hardscaping began early in his career, working hands-on in the field and learning the craftsmanship and attention to detail that exceptional outdoor spaces demand. His dedication to quality, customer satisfaction and thoughtful design has made Alpha Hardscapes a trusted name across New Haven County, Hartford County and Fairfield County.

Sebastian is still on site for every project. The person who walks your property and writes your estimate is the person who builds the job and does the final walk-through with you.
`),
  values: [
    { title: "Expert craftsmanship", text: "Attention to detail and high-quality materials, so every project is built to last.", icon: "hammer" },
    { title: "Personalised service", text: "We work directly with you to bring your vision to life, with tailored solutions for every property.", icon: "design" },
    { title: "Reliable and on time", text: "We value your time and finish each project on schedule without compromising quality.", icon: "clock" },
    { title: "Comprehensive services", text: "Patios, walkways, walls, steps, outdoor kitchens, fire pits, pools, chimneys and landscaping from one team.", icon: "check" },
  ],
  body: pt(`
## Our landscaping and paver expertise
We do not just build outdoor spaces; we craft lasting environments that enhance both the look and the function of your property. With years of experience and a deep respect for the craft, we turn ordinary yards and business exteriors into places people want to spend time, using concrete pavers, brick and natural stone chosen for each project.

## Masonry services
Stone and brick masonry, retaining walls, steps, chimneys, stone veneer, concrete work and paver restoration.

## Landscaping services
Custom landscape design, garden installation and planting, mulching and edging, lawn installation, seasonal clean-ups and maintenance.
`),
  seo: { title: "About Alpha Hardscapes | Hardscaping & Masonry in Cheshire, CT", description: "Meet Sebastian Ullrich and the Cheshire-based Alpha Hardscapes crew building patios, walkways, retaining walls and steps across Southern Connecticut." },
};

export const pages: Page[] = (legal as unknown as Page[]).map((p) => ({ ...p }));
