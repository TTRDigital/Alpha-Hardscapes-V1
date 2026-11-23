"use client";

import { useEffect } from "react";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID?.trim() || "GTM-PNTJLP8M";
const TTR_SITE_KEY = process.env.NEXT_PUBLIC_TTR_SITE_KEY?.trim() || "";
const TTR_OS_URL = (process.env.NEXT_PUBLIC_TTR_OS_URL?.trim() || "https://portal.ttrdigitalmarketing.com").replace(/\/$/, "");
/** Staging and previews do not send analytics unless this is set to 1 (so test visits do not count). */
const ON_STAGING = process.env.NEXT_PUBLIC_TRACKING_ON_STAGING === "1";

function addScript(src: string, id: string) {
  if (document.getElementById(id)) return;
  const s = document.createElement("script");
  s.id = id;
  s.src = src;
  s.async = true;
  document.head.appendChild(s);
}

/**
 * Google Tag Manager (same container as the live site, GA4 runs inside it) and the TTR OS
 * tracker. Both load after the page has painted and the browser is idle, so they never slow
 * down the first view.
 */
export function Tracking() {
  useEffect(() => {
    const production = /(^|\.)alphahardscapes\.com$/.test(window.location.hostname);
    if (!production && !ON_STAGING) return;
    const run = () => {
      if (GTM_ID) {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
        addScript(`https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(GTM_ID)}`, "gtm");
      }
      if (TTR_SITE_KEY) addScript(`${TTR_OS_URL}/api/site/script/${encodeURIComponent(TTR_SITE_KEY)}`, "ttr-os");
    };
    const idle = (cb: () => void) => ("requestIdleCallback" in window ? window.requestIdleCallback(cb, { timeout: 3000 }) : setTimeout(cb, 1500));
    const start = () => idle(run);
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });
    return () => window.removeEventListener("load", start);
  }, []);
  return null;
}
