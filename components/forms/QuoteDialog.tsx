"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import type { FormDef } from "@/lib/types";
import { LeadForm } from "./LeadForm";
import { Icon } from "@/components/ui/Icon";

type Ctx = { open: (formKey?: string) => void };
const QuoteCtx = createContext<Ctx>({ open: () => {} });
export const useQuote = () => useContext(QuoteCtx);

/** The live site's quote pop-up: each button opens its own form (same fields, same thank-you page). */
export function QuoteProvider({ forms, heading, children }: { forms: FormDef[]; heading: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDialogElement>(null);
  const [form, setForm] = useState<FormDef | null>(null);
  const open = useCallback(
    (key?: string) => {
      const f = forms.find((x) => x.formKey === key) || forms.find((x) => x.formKey.split(":")[0] === key?.split(":")[0]) || forms.find((x) => x.formKey === "377:d854bea") || forms[0];
      setForm(f || null);
    },
    [forms],
  );
  useEffect(() => {
    if (form && ref.current && !ref.current.open) ref.current.showModal();
  }, [form]);
  return (
    <QuoteCtx.Provider value={{ open }}>
      {children}
      <dialog
        ref={ref}
        aria-labelledby="quote-title"
        onClose={() => setForm(null)}
        onClick={(e) => { if (e.target === ref.current) ref.current?.close(); }}
        className="m-auto max-h-[92dvh] w-[min(640px,calc(100vw-24px))] overflow-y-auto rounded-[24px] bg-white p-0 text-ink shadow-2xl backdrop:bg-basalt/70 backdrop:backdrop-blur-sm"
      >
        {form && (
          <div className="p-6 sm:p-9">
            <div className="mb-6 flex items-start justify-between gap-6">
              <p id="quote-title" className="h-lg !text-[2.1rem] text-ink">{heading}</p>
              <button type="button" onClick={() => ref.current?.close()} className="-mr-2 -mt-1 flex h-10 w-10 items-center justify-center rounded-full text-ink ring-1 ring-ink/15 hover:bg-paper" aria-label="Close">
                <Icon name="close" className="h-5 w-5" />
              </button>
            </div>
            <LeadForm key={form.formKey} form={form} />
          </div>
        )}
      </dialog>
    </QuoteCtx.Provider>
  );
}

export function QuoteButton({ formKey, className, children }: { formKey?: string; className?: string; children: React.ReactNode }) {
  const { open } = useQuote();
  return (
    <button type="button" className={className} onClick={() => open(formKey)}>
      {children}
    </button>
  );
}
