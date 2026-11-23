import type { FaqItem } from "@/lib/types";

export function FaqList({ items, className = "" }: { items: FaqItem[]; className?: string }) {
  if (!items?.length) return null;
  return (
    <div className={`border-t border-line ${className}`}>
      {items.map((f, i) => (
        <details key={i} className="faq group border-b border-line">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-8 py-6 text-left text-[17px] font-medium tracking-[-0.01em] text-ink">
            <span>{f.question}</span>
            <span className="faq-icon mt-0.5 text-[22px] font-light leading-none text-muted transition-transform duration-200" aria-hidden="true">+</span>
          </summary>
          <p className="max-w-3xl pb-7 pr-10 text-[16px] leading-relaxed text-muted">{f.answer}</p>
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
