"use client";

import { useMemo, useState } from "react";
import { ProjectCard } from "@/components/blocks/Cards";
import type { ProjectSummary } from "@/lib/types";

/** Filterable project grid (filters mirror the services). */
export function ProjectGrid({ projects }: { projects: ProjectSummary[] }) {
  const filters = useMemo(() => {
    const map = new Map<string, string>();
    for (const p of projects) for (const s of p.services || []) map.set(s.slug, s.title);
    return [...map.entries()].sort((a, b) => a[1].localeCompare(b[1]));
  }, [projects]);
  const [active, setActive] = useState("all");
  const shown = active === "all" ? projects : projects.filter((p) => p.services?.some((s) => s.slug === active));
  return (
    <>
      <div className="flex flex-wrap gap-x-6 gap-y-2 border-b border-line pb-5" role="group" aria-label="Filter projects by service">
        <Chip active={active === "all"} onClick={() => setActive("all")}>All ({projects.length})</Chip>
        {filters.map(([slug, title]) => (
          <Chip key={slug} active={active === slug} onClick={() => setActive(slug)}>{title}</Chip>
        ))}
      </div>
      <div className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2" aria-live="polite">
        {shown.map((p, i) => (<ProjectCard key={p.slug} project={p} priority={i < 3} />))}
      </div>
      {shown.length === 0 && <p className="mt-8 text-stone-500">No projects in this category yet.</p>}
    </>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button type="button" onClick={onClick} aria-pressed={active} className={`py-1 text-[15px] transition-colors ${active ? "text-ink underline decoration-1 underline-offset-[6px]" : "text-muted hover:text-ink"}`}>
      {children}
    </button>
  );
}
