import type { Testimonial } from "@/lib/types";

/** Google reviews shown on the live site (name, text and avatar as published there). */
const GOOGLE = "https://g.co/kgs/kn3zykP";
const t = (i: number, name: string, quote: string, avatar: string, extra: Partial<Testimonial> = {}): Testimonial => ({
  _id: `testimonial-${i}`,
  name,
  quote,
  rating: 5,
  source: "Google",
  sourceUrl: GOOGLE,
  avatar: { src: `/images/reviews/${avatar}.webp`, alt: name, width: 160, height: 160 },
  order: i * 10,
  ...extra,
});

export const testimonials: Testimonial[] = [
  t(1, "Jodi Simons", "I highly recommend Alpha Hardscapes. Sebastian is reliable, friendly, has reasonable prices, and cares about the quality of his work. He patiently answered all of my questions and completed the work exactly as he said.", "review-image-13", { featured: true }),
  t(2, "Kurt", "Sebastian is not just a mason, he's a craftsman. He's done two jobs for us. His bidding is competitive and accurate (no change orders), he understands what needs to be done and does it right.", "review-image-3", { featured: true }),
  t(3, "Beverly Beichner", "Sebastian did an excellent job on my project. He was thorough, completed the job on time. Communicated every step of the way. Would highly recommend.", "review-image-4", { featured: true }),
  t(4, "mjscads", "Sebastian did an awesome job. He was prompt, professional, and very tidy. The work turned out awesome. We will be utilizing his services further in the future. Highly recommend!", "review-image-1"),
  t(5, "Philip Madonna", "Sebastian showed up a day or two later and we discussed some options and he gave me a quote that was right in the ball park. We agreed on the price and the rest is history.", "review-image-12"),
  t(6, "Christopher Trombly", "Sebastian and his team were amazing, both at building a beautiful patio for us, and at replacing the overgrowth in our back yard with a lovely lawn.", "review-image-11", { featured: true }),
  t(7, "Byron Perez", "Sebastian and his team were great, the walkway came out looking beautiful. We are very happy with the job and end result. I will definitely recommend Alpha Hardscapes.", "review-image-2", { featured: true }),
  t(8, "Tina Bailey-Cusimano", "I highly recommend this business and if I could, I'd leave ten stars for Alpha Hardscapes! The customer service was second to none! Sebastian was not only knowledgeable and professional, but also friendly and attentive to our needs.", "review-image-14", { featured: true }),
  t(9, "Rodney Moore", "These gentlemen did amazing work in my backyard. They were extremely professional and gave great guidance on how to maintain my lawn. I look forward to working with them again on future projects!", "review-image-15"),
  t(10, "Edward Emerson", "I highly recommend Alpha Hardscapes. We hired Alpha to replace an existing decorative wall along our driveway as well as a walkway and steps to our front entry. From our first impression, when they arrived on time, to the finished work, everything was first class.", "review-image-16"),
];
