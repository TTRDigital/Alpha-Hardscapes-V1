import type { Faq } from "@/lib/types";

/** The live site's FAQ page, lightly edited. */
const f = (i: number, category: string, question: string, answer: string, showOnHome = false): Faq => ({ _id: `faq-${i}`, question, answer, category, showOnHome, order: i * 10 });

export const faqs: Faq[] = [
  f(1, "General", "What types of services do you offer?", "Hardscaping and masonry: paver patios, walkways, retaining walls, stone steps, outdoor kitchens, fire pits and fireplaces, pool patios, decks, chimneys and stone veneer. We also offer landscaping, seasonal clean-ups and paver repair and maintenance.", true),
  f(2, "Process & timeline", "How long does a typical project take?", "Walkways and small repairs take a few days; patios, retaining walls and outdoor kitchens usually take one to three weeks depending on size, materials and weather. You get a schedule with your estimate and updates throughout.", true),
  f(3, "Pricing & payment", "Do you offer free estimates?", "Yes. We visit the property, measure, discuss materials and send a written, no-obligation estimate at no cost.", true),
  f(4, "Pricing & payment", "Do you offer financing options?", "Yes, financing is available for customers who qualify. Ask us when you request your estimate and we will walk you through the options."),
  f(5, "Process & timeline", "How do I get started with a project?", "Call (475) 227-6896 or send the estimate form. We will schedule a consultation, discuss your ideas and develop a plan, and we stay with you from design through installation."),
  f(6, "Materials", "Are your materials environmentally friendly?", "We use permeable paver options, locally quarried stone and native plants wherever they suit the project, and we recycle excavated material where possible."),
  f(7, "Service area", "What areas do you serve?", "We are based in Cheshire and work throughout New Haven County, Hartford County and Fairfield County, Connecticut.", true),
  f(8, "General", "Are your services customisable?", "Every project is designed for the property and the homeowner. We bring samples, sketch layouts with you and adjust the plan until it fits your needs and budget."),
  f(9, "General", "Are you insured?", "Yes. Alpha Hardscapes is fully insured, and a certificate of insurance is available on request.", true),
  f(10, "Maintenance", "Can you help with paver repairs?", "Yes. We re-level sunken pavers, replace broken ones, repoint mortar joints and repair leaning walls, then fix the drainage that caused the problem."),
  f(11, "Materials", "What materials do you use for paver projects?", "Concrete pavers from Techo-Bloc, Unilock and Cambridge, natural bluestone, fieldstone and granite, and clay brick, all installed on a compacted crushed-stone base."),
  f(12, "General", "Do you build pools and pool patios?", "Yes. We build pool patios, coping, retaining walls and fencing around new and existing pools, and partner on new in-ground and on-ground pool installations."),
  f(13, "Maintenance", "Can you help with seasonal clean-up?", "Yes. We offer spring and fall clean-ups, leaf removal, bed preparation and winter snow removal across Southern Connecticut."),
  f(14, "Maintenance", "Do you offer maintenance after the installation is complete?", "Yes. We offer ongoing maintenance for landscapes and hardscapes: seasonal clean-ups, re-sanding and sealing pavers, and repointing masonry."),
  f(15, "Pricing & payment", "What forms of payment do you accept?", "Wire transfer, check, credit card and cash. Financing is available for customers who qualify."),
];
