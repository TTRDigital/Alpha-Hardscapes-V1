import type { FaqItem } from "@/lib/types";

export function FaqList({ items, className = "" }: { items: FaqItem[]; className?: string }) {
  if (!items?.length) return null;
  return (
    <div className={`divide-y divide-ink/10 ${className}`}>
      {items.map((f, i) => (
        <details key={i} className="faq group py-1">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-4 text-left text-[17px] font-bold text-ink">
            <span>{f.question}</span>
            <span className="faq-icon mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-stone-200 text-lg leading-none text-ink transition-transform" aria-hidden="true">+</span>
          </summary>
          <p className="pb-5 pr-10 text-[16px] leading-relaxed text-stone-700">{f.answer}</p>
        </details>
      ))}
    </div>
  );
}

export function faqJsonLd(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
  };
}
