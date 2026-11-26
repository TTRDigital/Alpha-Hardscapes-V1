// Screenshots every page that shows images or videos (from staging), with a numbered box on each
// image / video: green = same photo as the live page, orange = updated (new or replaced).
const { chromium } = require("playwright");
const fs = require("fs");
const [, , invPath, outDir, base] = process.argv;
const inv = JSON.parse(fs.readFileSync(invPath, "utf8"));
fs.mkdirSync(outDir, { recursive: true });

const pages = inv.pages.filter((r) => r.items.some((i) => !i.status.startsWith("Share")));
pages.push({ path: "/patios-walkways/", title: "Season-end ad page", items: inv.items.filter((i) => i.file.startsWith("/patios-walkways/images/")).map((i) => ({ file: i.file, role: "Image on the ad page", status: "Same as live", alt: "" })), removed: [], static: true });

(async () => {
  const b = await chromium.launch();
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
  const results = {};
  for (const r of pages) {
    const p = await ctx.newPage();
    try {
      await p.goto(base + r.path, { waitUntil: "load", timeout: 90000 });
      await p.addStyleTag({ content: "*,*::before,*::after{animation:none!important;transition:none!important} .reveal{opacity:1!important;transform:none!important}" });
      await p.evaluate(() => document.querySelectorAll("img").forEach((i) => (i.loading = "eager")));
      const H = await p.evaluate(() => document.documentElement.scrollHeight);
      for (let y = 0; y < H; y += 700) { await p.evaluate((y) => window.scrollTo(0, y), y); await p.waitForTimeout(90); }
      await p.evaluate(() => window.scrollTo(0, 0));
      await p.evaluate(() => Promise.race([Promise.all([...document.images].filter((i) => !i.complete).map((i) => new Promise((r) => { i.onload = i.onerror = r; }))), new Promise((r) => setTimeout(r, 15000))]));
      await p.waitForTimeout(800);
      const items = r.items.map((it, k) => ({ n: k + 1, file: it.file, status: it.status })).filter((it) => !it.status.startsWith("Share"));
      const marks = await p.evaluate(({ items, isStatic }) => {
        const keyOf = (el) => {
          if (el.tagName === "VIDEO") {
            const poster = el.getAttribute("poster");
            if (poster) return [new URL(poster, location.href).pathname.replace(/-poster\.webp$/, ".mp4"), new URL(poster, location.href).pathname];
            return ["/images/brand/hero.mp4"];
          }
          const s = el.currentSrc || el.src || "";
          const u = new URL(s, location.href);
          if (u.pathname.startsWith("/_next/image")) return [decodeURIComponent(u.searchParams.get("url") || "")];
          return [u.pathname];
        };
        const scope = isStatic ? document.body : document.querySelector("main");
        const els = [...scope.querySelectorAll("img, video")].map((el) => ({ el, keys: keyOf(el) }));
        // Home banner: the still image and the video share one area
        const used = new Set();
        const clipOf = (el) => {
          let r = el.getBoundingClientRect(); let a = el.parentElement;
          while (a && a !== document.body) {
            const cs = getComputedStyle(a);
            if (/(auto|scroll|hidden)/.test(cs.overflowX)) { const pr = a.getBoundingClientRect(); const l = Math.max(r.left, pr.left), t = Math.max(r.top, pr.top), rr = Math.min(r.right, pr.right), bb = Math.min(r.bottom, pr.bottom); r = { left: l, top: t, right: rr, bottom: bb, width: rr - l, height: bb - t }; if (r.width <= 4 || r.height <= 4) return null; }
            a = a.parentElement;
          }
          return r;
        };
        const out = [];
        for (const it of items) {
          // A video's still image shares the video's box (the still shows until the video plays)
          const still = /-poster\.webp$/.test(it.file);
          const hit = still ? els.find((e) => e.keys.includes(it.file)) : els.find((e) => !used.has(e.el) && e.keys.includes(it.file));
          if (!hit) { out.push({ n: it.n, found: false }); continue; }
          if (!still) used.add(hit.el);
          const r = clipOf(hit.el);
          const carousel = hit.el.closest("[aria-roledescription=carousel]");
          if (!r) { out.push({ n: it.n, found: true, hidden: true, carousel: !!carousel }); if (carousel) { carousel.dataset.hiddenNums = (carousel.dataset.hiddenNums ? carousel.dataset.hiddenNums + "," : "") + it.n; } continue; }
          const box = { x: r.left + scrollX, y: r.top + scrollY, w: r.width, h: r.height };
          out.push({ n: it.n, found: true, hidden: false, box, status: it.status, video: hit.el.tagName === "VIDEO" || /\.mp4$/.test(it.file) });
        }
        // Draw
        const layer = document.createElement("div");
        layer.style.cssText = "position:absolute;left:0;top:0;width:100%;height:0;z-index:2147483647;pointer-events:none";
        document.body.appendChild(layer);
        const color = (s) => (s === "Same as live" ? "#16a34a" : "#ea580c");
        const placed = [];
        for (const m of out.filter((m) => m.box)) {
          const { x, y, w, h } = m.box;
          const c = color(m.status);
          const d = document.createElement("div");
          d.style.cssText = `position:absolute;left:${x + 3}px;top:${y + 3}px;width:${Math.max(w - 6, 10)}px;height:${Math.max(h - 6, 10)}px;border:5px solid ${c};border-radius:10px;box-shadow:0 0 0 2px #fff`;
          // badges at the same spot (banner video + still) sit side by side
          const same = placed.filter((q) => Math.abs(q.x - x) < 2 && Math.abs(q.y - y) < 2).length;
          const badge = document.createElement("div");
          badge.textContent = (m.video ? "▶ " : "") + m.n;
          badge.style.cssText = `position:absolute;left:${x + 10 + same * 74}px;top:${y + 10}px;min-width:34px;height:34px;padding:0 9px;border-radius:17px;background:${c};color:#fff;font:700 18px/34px system-ui,sans-serif;text-align:center;box-shadow:0 0 0 3px #fff`;
          placed.push({ x, y });
          layer.appendChild(d); layer.appendChild(badge);
        }
        for (const c of document.querySelectorAll("[aria-roledescription=carousel][data-hidden-nums]")) {
          const r = c.getBoundingClientRect();
          const nums = c.dataset.hiddenNums.split(",").map(Number);
          const lab = document.createElement("div");
          const range = nums.length > 2 ? `${nums[0]}–${nums[nums.length - 1]}` : nums.join(", ");
          lab.textContent = `+ ${range} further along this carousel (swipe / arrows)`;
          lab.style.cssText = `position:absolute;left:${r.left + scrollX + r.width - 420}px;top:${r.bottom + scrollY - 46}px;width:410px;padding:6px 10px;border-radius:8px;background:#111;color:#fff;font:600 15px/1.3 system-ui,sans-serif;text-align:center`;
          layer.appendChild(lab);
        }
        return out;
      }, { items, isStatic: !!r.static });
      const name = (r.path === "/" ? "home" : r.path.replace(/^\/|\/$/g, "").replace(/\//g, "__"));
      await p.screenshot({ path: `${outDir}/${name}.png`, fullPage: true });
      results[r.path] = { file: `${name}.png`, marks, title: r.title };
      const missing = marks.filter((m) => !m.found).map((m) => m.n);
      console.log(r.path, "marked", marks.filter((m) => m.box).length, "in carousel", marks.filter((m) => m.hidden).length, missing.length ? `NOT FOUND ${missing}` : "");
    } catch (e) {
      console.log(r.path, "ERROR", e.message.slice(0, 120));
    }
    await p.close();
  }
  fs.writeFileSync(`${outDir}/marks.json`, JSON.stringify(results));
  await b.close();
})();
