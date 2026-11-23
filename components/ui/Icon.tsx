import type { SVGProps } from "react";

/** Inline line icons (no icon library). Names match the Sanity `icon` field options. */
const PATHS: Record<string, string> = {
  patio: "M3 10h18M3 14h18M7 6v12M12 6v12M17 6v12M4 6h16v12H4z",
  wall: "M3 7h18M3 12h18M3 17h18M8 7v5M14 7v5M11 12v5M17 12v5M5 12v5M3 7v10h18V7z",
  steps: "M4 20h4v-4h4v-4h4V8h4M4 20V16h4",
  kitchen: "M4 12h16v8H4zM6 12V8h12v4M9 8V5M15 8V5M8 16h2M14 16h2",
  fire: "M12 3c1 3 4 4 4 8a4 4 0 0 1-8 0c0-2 1-3 1-3s0 2 2 2c0-3-1-4 1-7zM6 19c2 2 10 2 12 0",
  pool: "M4 15c2-1 4-1 6 0s4 1 6 0 3-1 4 0M4 19c2-1 4-1 6 0s4 1 6 0 3-1 4 0M8 15V5a2 2 0 0 1 4 0M14 15V5a2 2 0 0 1 4 0",
  deck: "M3 11h18M3 15h18M5 11V7l7-4 7 4v4M6 15v5M18 15v5M10 11v4M14 11v4",
  chimney: "M9 21V9h6v12M9 9V5h6v4M7 9h10M4 21h16M3 13l9-9",
  veneer: "M3 5h8v5H3zM13 5h8v5h-8zM3 14h5v5H3zM10 14h11v5H10zM8 10h8v4H8z",
  repair: "M14 4l6 6-9 9H5v-6zM12 6l6 6M5 19l-2 2",
  leaf: "M5 19C5 9 11 5 20 4c-1 9-5 15-15 15zM5 19c3-4 6-7 10-10",
  snow: "M12 3v18M3 12h18M6 6l12 12M18 6L6 18",
  plant: "M12 21v-9M12 12c-4 0-7-3-7-7 4 0 7 3 7 7zM12 12c4 0 7-3 7-7-4 0-7 3-7 7zM5 21h14",
  design: "M4 4h16v16H4zM4 12h16M12 4v16M8 8h8v8H8",
  check: "M20 6L9 17l-5-5",
  shield: "M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6zM9 12l2 2 4-4",
  clock: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 7v5l3 2",
  star: "M12 3l2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L12 17.3 6.4 20.2l1.1-6.2L3 9.6l6.2-.9z",
  map: "M12 21s-7-6-7-11a7 7 0 0 1 14 0c0 5-7 11-7 11zM12 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
  phone: "M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z",
  ruler: "M3 17L17 3l4 4L7 21zM7 13l2 2M10 10l2 2M13 7l2 2",
  hammer: "M14 4l6 6-2 2-6-6zM12 6L4 14l6 6 8-8M5 15l4 4",
  truck: "M3 7h11v9H3zM14 10h4l3 3v3h-7zM7 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM17 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
  leafcheck: "M5 19C5 9 11 5 20 4c-1 9-5 15-15 15zM9 13l2 2 4-4",
  arrow: "M5 12h14M13 6l6 6-6 6",
  menu: "M4 7h16M4 12h16M4 17h16",
  close: "M6 6l12 12M18 6L6 18",
  mail: "M4 6h16v12H4zM4 7l8 6 8-6",
  quote: "M7 11h3V7H6v5c0 3-1 4-3 5v2c4-1 4-4 4-8zM18 11h3V7h-4v5c0 3-1 4-3 4v2c4-1 4-4 4-7z",
  facebook: "M15 3h3v4h-3a1 1 0 0 0-1 1v3h4l-1 4h-3v6h-4v-6H7v-4h3V8a5 5 0 0 1 5-5z",
  instagram: "M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zM12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM17.5 6.5h.01",
  google: "M21 12.2c0-.7-.1-1.3-.2-1.9H12v3.7h5.1c-.2 1.2-.9 2.2-1.9 2.9v2.4h3.1c1.8-1.7 2.7-4.1 2.7-7.1zM12 21c2.6 0 4.7-.9 6.3-2.3l-3.1-2.4c-.8.6-1.9.9-3.2.9-2.5 0-4.6-1.7-5.3-3.9H3.5v2.5C5.1 18.9 8.3 21 12 21zM6.7 13.3A5.4 5.4 0 0 1 6.4 12c0-.5.1-.9.3-1.3V8.2H3.5A9 9 0 0 0 3 12c0 1.4.3 2.8.5 3.8l3.2-2.5zM12 6.6c1.4 0 2.6.5 3.6 1.4l2.7-2.7C16.7 3.8 14.6 3 12 3 8.3 3 5.1 5.1 3.5 8.2l3.2 2.5c.7-2.2 2.8-4.1 5.3-4.1z",
};

export function Icon({ name, className = "h-5 w-5", ...rest }: { name: string } & SVGProps<SVGSVGElement>) {
  const d = PATHS[name] ?? PATHS.check;
  const filled = name === "star" || name === "google" || name === "facebook";
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill={filled ? "currentColor" : "none"} stroke={filled ? "none" : "currentColor"} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" {...rest}>
      <path d={d} />
    </svg>
  );
}
