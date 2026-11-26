"""Builds the media report PDF: every image and video, where it appears (with page links),
and marked screenshots of each page. Usage: python3 build_pdf.py <repo> <marked-dir> <out.pdf>"""
import json, os, sys, io, datetime
from PIL import Image
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.units import mm
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (BaseDocTemplate, Frame, PageTemplate, Paragraph, Spacer, Table, TableStyle,
                                Image as RLImage, PageBreak, NextPageTemplate, KeepTogether, Flowable)
from reportlab.pdfgen import canvas as rlcanvas
from pypdf import PdfReader, PdfWriter

Image.MAX_IMAGE_PIXELS = None
REPO, MARKED, OUT = sys.argv[1], sys.argv[2], sys.argv[3]
WORK = os.path.join(os.path.dirname(OUT) or ".", "pdfwork")
os.makedirs(WORK, exist_ok=True)
STAGING = "https://alpha-hardscapes-v1.vercel.app"
LIVE = "https://alphahardscapes.com"
inv = json.load(open(os.path.join(REPO, "docs/media-inventory.json")))
marks = json.load(open(os.path.join(MARKED, "marks.json"))) if os.path.exists(os.path.join(MARKED, "marks.json")) else {}

pdfmetrics.registerFont(TTFont("Sans", "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"))
pdfmetrics.registerFont(TTFont("Sans-Bold", "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"))
from reportlab.lib.fonts import addMapping
addMapping("Sans", 0, 0, "Sans"); addMapping("Sans", 1, 0, "Sans-Bold")

INK = colors.HexColor("#22241f"); MUTED = colors.HexColor("#56574f"); LINE = colors.HexColor("#dcd5c7")
GREEN = colors.HexColor("#16a34a"); ORANGE = colors.HexColor("#ea580c"); BLUE = colors.HexColor("#2563eb"); PAPER = colors.HexColor("#f6f4ee")
LIME = colors.HexColor("#adce39")

ss = {
    "h1": ParagraphStyle("h1", fontName="Sans-Bold", fontSize=20, leading=25, textColor=INK, spaceAfter=6),
    "h2": ParagraphStyle("h2", fontName="Sans-Bold", fontSize=14, leading=18, textColor=INK, spaceBefore=6, spaceAfter=6),
    "h3": ParagraphStyle("h3", fontName="Sans-Bold", fontSize=10.5, leading=14, textColor=INK, spaceBefore=8, spaceAfter=4),
    "p": ParagraphStyle("p", fontName="Sans", fontSize=9.5, leading=13.5, textColor=MUTED),
    "small": ParagraphStyle("small", fontName="Sans", fontSize=7.6, leading=10, textColor=MUTED),
    "cell": ParagraphStyle("cell", fontName="Sans", fontSize=7.6, leading=9.8, textColor=INK),
    "cellm": ParagraphStyle("cellm", fontName="Sans", fontSize=7.2, leading=9.2, textColor=MUTED),
    "big": ParagraphStyle("big", fontName="Sans-Bold", fontSize=26, leading=31, textColor=INK),
    "hdr": ParagraphStyle("hdr", fontName="Sans-Bold", fontSize=7.6, leading=9.8, textColor=colors.white),
    "num": ParagraphStyle("num", fontName="Sans-Bold", fontSize=18, leading=20, textColor=INK),
}
esc = lambda s: (s or "").replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")
link = lambda url, text=None: f'<link href="{url}" color="#2563eb"><u>{esc(text or url)}</u></link>'
kb = lambda n: f"{n/1e6:.1f} MB" if n > 1e6 else f"{round(n/1024)} KB"
STATUS_COLOR = {"Same as live": GREEN, "Updated": ORANGE}

def thumb(file, w=300, h=225):
    """Small JPEG thumbnail of a public file (videos use their still)."""
    src = os.path.join(REPO, "public", file.lstrip("/"))
    if file.endswith(".mp4"):
        src = src.replace(".mp4", "-poster.webp")
        if not os.path.exists(src):
            src = os.path.join(REPO, "public/images/brand/hero-poster.webp") if "hero.mp4" in file else None
    if not src or not os.path.exists(src) or file.endswith((".svg", ".ico")):
        return None
    out = os.path.join(WORK, "t_" + file.strip("/").replace("/", "_") + ".jpg")
    if not os.path.exists(out):
        im = Image.open(src).convert("RGB"); im.thumbnail((w, h)); im.save(out, quality=72)
    return out

def page_frame_doc(path, pagesize=A4, footer=""):
    doc = BaseDocTemplate(path, pagesize=pagesize, leftMargin=16*mm, rightMargin=16*mm, topMargin=16*mm, bottomMargin=16*mm,
                          title="Alpha Hardscapes: images and videos", author="TTR Digital Marketing")
    def deco(c, d):
        c.saveState(); c.setFont("Sans", 7); c.setFillColor(MUTED)
        c.drawString(16*mm, 9*mm, "Alpha Hardscapes website: images and videos" + (f"  ·  {footer}" if footer else ""))
        c.restoreState()
    doc.addPageTemplates([PageTemplate(id="a4", frames=[Frame(16*mm, 16*mm, pagesize[0]-32*mm, pagesize[1]-32*mm, id="f")], onPage=deco)])
    return doc

def table(rows, widths, header=True, zebra=True, extra=None):
    t = Table(rows, colWidths=widths, repeatRows=1 if header else 0)
    st = [("VALIGN", (0, 0), (-1, -1), "TOP"), ("LEFTPADDING", (0, 0), (-1, -1), 4), ("RIGHTPADDING", (0, 0), (-1, -1), 4),
          ("TOPPADDING", (0, 0), (-1, -1), 3), ("BOTTOMPADDING", (0, 0), (-1, -1), 3), ("LINEBELOW", (0, 0), (-1, -1), 0.3, LINE)]
    if header: st += [("BACKGROUND", (0, 0), (-1, 0), INK), ("TEXTCOLOR", (0, 0), (-1, 0), colors.white)]
    t.setStyle(TableStyle(st + (extra or [])))
    return t

class Swatch(Flowable):
    def __init__(self, color, label, w=8, h=8):
        super().__init__(); self.color, self.label, self.w, self.h = color, label, w, h
    def wrap(self, aw, ah): return (aw, 12)
    def draw(self):
        c = self.canv; c.setStrokeColor(self.color); c.setLineWidth(2.2); c.roundRect(0, 1, 18, 10, 2, stroke=1, fill=0)
        c.setFont("Sans", 9); c.setFillColor(INK); c.drawString(26, 2.5, self.label)

H = lambda t, s="cell": Paragraph(t, ss[s])
pages = [r for r in inv["pages"] if any(not i["status"].startswith("Share") for i in r["items"])]
if os.environ.get("LIMIT"): pages = pages[: int(os.environ["LIMIT"])]
noimg = [r for r in inv["pages"] if r not in pages]
items_by_file = {i["file"]: i for i in inv["items"]}
total_same = sum(1 for r in inv["pages"] for i in r["items"] if i["status"] == "Same as live")
total_upd = sum(1 for r in inv["pages"] for i in r["items"] if i["status"] == "Updated")
removed_all = [x for r in inv["pages"] for x in r["removed"]]
from collections import Counter
why = Counter(x["why"] for x in removed_all)
removed_unique = {x["file"]: x["why"] for x in removed_all}

# ---------------- Part A: cover, how to read, summary, videos ----------------
def part_a(path):
    doc = page_frame_doc(path); s = []
    s += [Spacer(1, 30*mm), H("Alpha Hardscapes website", "h2"), H("Images and videos: what is used and where", "big"), Spacer(1, 6*mm),
          H(f"Every image and video on the new website, page by page, with links and a marked screenshot of each page. "
            f"Screenshots are of the staging site, {link(STAGING + '/', STAGING.replace('https://',''))}, as of {datetime.date.today().strftime('%B %-d, %Y')}. "
            f"After launch, every page keeps the same address on {link(LIVE + '/', 'alphahardscapes.com')}.", "p"), Spacer(1, 10*mm)]
    c = inv["counts"]
    kpi = [[H(str(c["realPhotos"]), "num"), H(str(c["videos"]), "num"), H(str(total_same), "num"), H(str(total_upd), "num"), H(str(len(removed_unique)), "num")],
           [H("real job photos in use", "small"), H("videos", "small"), H("placements same as live", "small"), H("placements updated", "small"), H("live images taken out", "small")]]
    s.append(table(kpi, [33*mm]*5, header=False, extra=[("LINEBELOW", (0, 0), (-1, -1), 0, colors.white), ("BACKGROUND", (0, 0), (-1, -1), PAPER)]))
    s += [Spacer(1, 10*mm), H("How to read the marked screenshots", "h2"),
          Swatch(GREEN, "Green box: the same photo or video as on this page of the live site"), Spacer(1, 3),
          Swatch(ORANGE, "Orange box: updated. A new photo, or one that replaced an AI or stock image"), Spacer(1, 6),
          H("Each box has a number that matches the table for that page. A number with “▶” is a video. A black label under a photo row "
            "means more photos further along that carousel (visitors swipe or use the arrows). The share image is the picture "
            "Facebook, texts and Google show for a link to the page; it is not shown on the page itself.", "p"),
          Spacer(1, 4*mm), H("Rules followed", "h3"),
          H("Only Alpha's own job photos are used (no AI renders or stock). Every photo has descriptive alt text. Pages keep their "
            "live addresses and words. Reviews show as text only (no reviewer pictures).", "p"),
          PageBreak()]
    # Summary
    s += [H("Summary", "h1"), H("What is on the site", "h2")]
    rows = [[H("What", "hdr"), H("Files", "hdr"), H("Where", "hdr")],
            [H("Real job photos (patios, walls, steps, walkways, pools, fire pits)"), H(str(c["realPhotos"] - c["beforeAfter"] - 1)), H("Page photos, section photos, carousels, the gallery, blog")],
            [H("Before-and-after photos"), H(str(c["beforeAfter"])), H("Service pages and ad pages")],
            [H("Sebastian's photo"), H("1"), H("Author page")],
            [H("Videos"), H(str(c["videos"])), H("Home banner, home crew reel, pool page")],
            [H("Video stills (show until a video plays)"), H(str(c["videoStills"])), H("With each video")],
            [H("Share images (link previews)"), H(str(c["shareImages"])), H("One per page, made from the page photo; not shown on pages")],
            [H("Ad page images, unchanged"), H(str(c["adPage"])), H("/patios-walkways/ (static ad page, kept exactly as live)")],
            [H("Logos and icons"), H(str(c["logosIcons"])), H("Header, footer, browser tab, phone home screen")],
            [H("Files not used anywhere"), H(str(c["unused"])), H("Listed at the end (safe to delete)")]]
    s.append(table(rows, [80*mm, 18*mm, 80*mm]))
    s += [Spacer(1, 6*mm), H("Images taken out compared with the live site", "h2"),
          H(f"{len(removed_unique)} different images from the live pages are not on the new site ({len(removed_all)} placements across "
            f"{sum(1 for r in inv['pages'] if r['removed'])} pages). Each page's section lists them.", "p"), Spacer(1, 3)]
    wu = Counter(removed_unique.values())
    s.append(table([[H("Reason", "hdr"), H("Images", "hdr"), H("Placements", "hdr")]] + [[H(k), H(str(wu[k])), H(str(why[k]))] for k in why], [110*mm, 30*mm, 38*mm]))
    s.append(PageBreak())
    # Videos
    s += [H("Videos", "h1"), H("All three videos, their stills, and where they play.", "p"), Spacer(1, 4)]
    for v in [i for i in inv["items"] if i["kind"] == "Video"]:
        t = thumb(v["file"], 360, 360)
        img = RLImage(t, width=46*mm, height=46*mm * Image.open(t).size[1] / Image.open(t).size[0]) if t else H("")
        uses = "<br/>".join(f"{link(STAGING + u['page'], 'Home page (/)' if u['page'] == '/' else u['page'])}: {esc(u['role'])}" for u in v["uses"])
        desc = {"/images/brand/hero.mp4": "Home banner background video (the clip from the live home page banner; aerial view of a lit pool patio). Plays muted behind the main heading, loads after the page has painted.",
                "/images/brand/reel-vertical.mp4": "Alpha's own crew reel (crew in Alpha shirts cutting and laying pavers, ends on the Alpha logo). Shown right after the home banner, plays muted while on screen, with pause and sound buttons.",
                "/images/site/pool-project.mp4": "Pool project video from the live pool page (converted from the live .mov file for the web)."}.get(v["file"], "")
        info = H(f"<b>{esc(v['file'])}</b><br/>{esc(desc)}<br/><br/><b>Size:</b> {esc(v['dims'])}, {kb(v['size'])}<br/><b>From the live site:</b> {esc(v['from'])}<br/><b>Used on:</b><br/>{uses}", "cell")
        s.append(KeepTogether([table([[img, info]], [52*mm, 126*mm], header=False), Spacer(1, 4*mm)]))
    doc.build(s)

# ---------------- Part C: one section per page ----------------
def screenshot_pages(c, r, shot):
    im = Image.open(os.path.join(MARKED, shot)).convert("RGB")
    W = 960; im = im.resize((W, round(im.size[1] * W / im.size[0])))
    tmp = os.path.join(WORK, shot.replace(".png", ".jpg")); im.save(tmp, quality=50, optimize=True, progressive=True)
    pw = A4[0]; scale = pw / W; strip = 34
    max_px = int((14000 - strip) / scale)  # PDF page height limit
    for k, top in enumerate(range(0, im.size[1], max_px)):
        part = im.crop((0, top, W, min(im.size[1], top + max_px)))
        pth = tmp if (k == 0 and part.size[1] == im.size[1]) else tmp.replace(".jpg", f"_{k}.jpg")
        if pth != tmp: part.save(pth, quality=50, optimize=True, progressive=True)
        ph = part.size[1] * scale + strip
        c.setPageSize((pw, ph))
        c.setFillColor(INK); c.rect(0, ph - strip, pw, strip, stroke=0, fill=1)
        c.setFillColor(colors.white); c.setFont("Sans-Bold", 9.5)
        c.drawString(12, ph - 21, f"Marked screenshot: {r['path']}" + (f"  (part {k+1})" if top or part.size[1] < im.size[1] else ""))
        c.setFont("Sans", 8); url = STAGING + r["path"]
        c.drawRightString(pw - 12, ph - 21, url); c.linkURL(url, (pw - 260, ph - strip, pw, ph), relative=0)
        c.drawImage(pth, 0, 0, width=pw, height=part.size[1] * scale)
        c.showPage()

def part_page(r, path):
    shot = marks.get(r["path"], {}).get("file") if r["path"] in marks else None
    m = {x["n"]: x for x in marks.get(r["path"], {}).get("marks", [])}
    doc = page_frame_doc(path, footer=r["path"]); s = []
    s.append(H(esc(r["title"] or r["path"]), "h1"))
    s.append(H(f"<b>Staging:</b> {link(STAGING + r['path'])}<br/><b>Live address after launch:</b> {link(LIVE + r['path'])}" + ("<br/>This page is not indexed by search engines (thank-you or ad page)." if r.get("noindex") else ""), "p"))
    vis = [(k + 1, i) for k, i in enumerate(r["items"]) if not i["status"].startswith("Share")]
    same = sum(1 for _, i in vis if i["status"] == "Same as live"); upd = len(vis) - same
    s += [Spacer(1, 3), H(f"<b>{len(vis)}</b> image and video placements: <font color='#16a34a'><b>{same} same as live</b></font>, <font color='#ea580c'><b>{upd} updated</b></font>"
                          + (f", and <b>{len(r['removed'])}</b> live images taken out." if r["removed"] else "."), "p"), Spacer(1, 4)]
    rows = [[H("#", "hdr"), H("Status", "hdr"), H("What and where on the page", "hdr"), H("File", "hdr"), H("Alt text", "hdr")]]
    ext = []
    for n, i in vis:
        mk = m.get(n, {})
        where = esc(i["role"]) + (" <i>(further along the carousel)</i>" if mk.get("hidden") else "")
        col = STATUS_COLOR.get(i["status"], MUTED)
        rows.append([H(f"<b>{'▶ ' if i['file'].endswith('.mp4') else ''}{n}</b>"), H(f"<font color='{col.hexval().replace('0x', '#')}'><b>{i['status']}</b></font>"), H(where), H(esc(i["file"].replace("/images/site/", "")), "cellm"), H(esc(i["alt"]), "cellm")])
    s.append(table(rows, [9*mm, 21*mm, 62*mm, 46*mm, 40*mm]))
    og = next((i for i in r["items"] if i["status"].startswith("Share")), None)
    if og: s += [Spacer(1, 4), H(f"<b>Share image (link preview):</b> {esc(og['file'])}", "small")]
    if r["removed"]:
        s += [H("Taken out compared with the live page", "h3")]
        s.append(table([[H("Live file", "hdr"), H("Why", "hdr")]] + [[H(esc(x["file"].replace("/wp-content/uploads/", "")), "cellm"), H(esc(x["why"]), "cellm")] for x in r["removed"]], [100*mm, 78*mm]))
    if not shot: s += [Spacer(1, 6), H("No screenshot for this page.", "small")]
    doc.build(s)
    if shot:
        c = rlcanvas.Canvas(path.replace(".pdf", "_shot.pdf")); screenshot_pages(c, r, shot); c.save()

# ---------------- Part D: every file, with thumbnails ----------------
def part_d(path):
    doc = page_frame_doc(path, footer="every file"); s = [H("Every file", "h1"),
        H("All image and video files on the site with a thumbnail, what each one is, and the pages it appears on (share images are listed by page).", "p"), Spacer(1, 4)]
    groups = [("Videos and their stills", lambda i: i["kind"] in ("Video", "Video still")),
              ("Real job photos", lambda i: i["kind"].startswith("Real job photo") or i["kind"].startswith("Owner")),
              ("Logos and icons", lambda i: i["kind"] == "Logo / icon"),
              ("Ad page images (static /patios-walkways/ page, unchanged)", lambda i: i["kind"].startswith("Ad page")),
              ("Share images (link previews, one per page)", lambda i: i["kind"].startswith("Share"))]
    for title, f in groups:
        its = [i for i in inv["items"] if f(i) and i["uses"]]
        s.append(H(f"{title} ({len(its)})", "h2"))
        cells = []
        for i in its:
            t = thumb(i["file"])
            img = RLImage(t, width=40*mm, height=40*mm * Image.open(t).size[1] / Image.open(t).size[0]) if t else H("(icon)", "small")
            pgs = sorted({u["page"] for u in i["uses"]})
            pl = ", ".join(link(STAGING + p, p) if p.startswith("/") else esc(p) for p in pgs[:6]) + (f" +{len(pgs)-6} more" if len(pgs) > 6 else "")
            txt = H(f"<b>{esc(i['file'].split('/')[-1])}</b><br/>{esc(i['kind'])} · {esc(i['dims'])} · {kb(i['size'])}"
                    + (f"<br/>Alt: {esc(i['alt'])}" if i["alt"] else "") + (f"<br/>From live: {esc(i['from'].replace('/wp-content/uploads/', ''))}" if i["from"] else "")
                    + f"<br/>On: {pl}", "cellm")
            cells.append([img, txt])
        rows = []
        for k in range(0, len(cells), 2):
            a = cells[k]; b = cells[k + 1] if k + 1 < len(cells) else [H(""), H("")]
            rows.append([a[0], a[1], b[0], b[1]])
        if rows:
            s.append(table(rows, [42*mm, 47*mm, 42*mm, 47*mm], header=False))
    unused = inv["unused"]
    s += [H(f"Files not used anywhere ({len(unused)})", "h2"), H("Older copies kept from earlier work; nothing on the site uses them, so they can be deleted.", "p")]
    s.append(table([[H("File", "hdr")]] + [[H(esc(u))] for u in unused], [178*mm]))
    doc.build(s)

# ---------------- build parts, then contents with page numbers, then merge ----------------
parts = []
a = os.path.join(WORK, "A.pdf"); part_a(a); parts.append(("Cover, summary and videos", a, None))
page_parts = []
for r in pages:
    pth = os.path.join(WORK, "P_" + (r["path"].strip("/").replace("/", "__") or "home") + ".pdf")
    part_page(r, pth)
    files = [pth] + ([pth.replace(".pdf", "_shot.pdf")] if os.path.exists(pth.replace(".pdf", "_shot.pdf")) else [])
    page_parts.append((r, files))
# static ad page (not in the page content: it is a fixed file)
ad = {"path": "/patios-walkways/", "title": "Season-end ad page (static file, kept exactly as live)", "noindex": True, "removed": [],
      "items": [{"file": i["file"], "role": "Image on the ad page", "status": "Same as live", "alt": ""} for i in inv["items"] if i["kind"].startswith("Ad page")]}
pth = os.path.join(WORK, "P_patios-walkways.pdf"); part_page(ad, pth)
page_parts.append((ad, [pth] + ([pth.replace(".pdf", "_shot.pdf")] if os.path.exists(pth.replace(".pdf", "_shot.pdf")) else [])))
d = os.path.join(WORK, "D.pdf"); part_d(d)

count = lambda f: len(PdfReader(f).pages)
def build_contents(path, start_numbers):
    doc = page_frame_doc(path, footer="contents"); s = [H("Contents", "h1"), H("Pages with images or videos, in site order. Page numbers refer to this PDF.", "p"), Spacer(1, 3)]
    rows = [[H("Page", "hdr"), H("Same", "hdr"), H("Updated", "hdr"), H("Taken out", "hdr"), H("PDF page", "hdr")]]
    for (r, _), n in zip(page_parts, start_numbers):
        vis = [i for i in r["items"] if not i["status"].startswith("Share")]
        rows.append([H(f"<b>{esc(r['title'] or r['path'])}</b><br/>{link(STAGING + r['path'], r['path'])}", "cell"), H(str(sum(i['status'] == 'Same as live' for i in vis))),
                     H(str(sum(i['status'] == 'Updated' for i in vis))), H(str(len(r["removed"]))), H(str(n))])
    s.append(table(rows, [110*mm, 16*mm, 18*mm, 18*mm, 16*mm]))
    s += [H(f"Pages with no images ({len(noimg)})", "h2"), H("These pages show text only (thank-you pages, legal pages and blog lists without posts). Each still has a share image.", "p"), Spacer(1, 3)]
    s.append(table([[H("Page", "hdr"), H("Share image", "hdr")]] + [[H(f"{esc(r['title'])}<br/>{link(STAGING + r['path'], r['path'])}"), H(esc(next((i['file'] for i in r['items']), '')), "cellm")] for r in noimg], [110*mm, 68*mm]))
    s += [Spacer(1, 6), H(f"Every file (thumbnails): PDF page {start_numbers[-1] + sum(count(f) for f in page_parts[-1][1])}", "p")]
    doc.build(s)

na = count(a)
cpath = os.path.join(WORK, "C.pdf")
build_contents(cpath, [0] * len(page_parts)); nc = count(cpath)
starts, cur = [], na + nc + 1
for _, files in page_parts:
    starts.append(cur); cur += sum(count(f) for f in files)
build_contents(cpath, starts)
assert count(cpath) == nc

w = PdfWriter()
for f in [a, cpath]:
    for p in PdfReader(f).pages: w.add_page(p)
w.add_outline_item("Cover, summary and videos", 0); w.add_outline_item("Contents", na)
for (r, files), st in zip(page_parts, starts):
    for f in files:
        for p in PdfReader(f).pages: w.add_page(p)
    w.add_outline_item(r["path"], st - 1)
dstart = len(w.pages)
for p in PdfReader(d).pages: w.add_page(p)
w.add_outline_item("Every file (thumbnails)", dstart)
w.add_metadata({"/Title": "Alpha Hardscapes website: images and videos", "/Author": "TTR Digital Marketing"})
w.compress_identical_objects(remove_duplicates=True, remove_unreferenced=True)
with open(OUT, "wb") as fh: w.write(fh)
print("pages", len(w.pages), "size", os.path.getsize(OUT))
