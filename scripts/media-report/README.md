# Media report (PDF)

Makes the "Images and videos: what is used and where" PDF: every image and video, the pages it
appears on (with links), and a screenshot of each page with every image and video boxed and
numbered (green = same as the live page, orange = updated).

```bash
node scripts/media-inventory.mjs path/to/live-seed.json          # docs/media-inventory.json + .md
node scripts/media-report/mark-screenshots.cjs docs/media-inventory.json marked https://alpha-hardscapes-v1.vercel.app
python3 scripts/media-report/build-pdf.py . marked out/Alpha-Hardscapes-images-and-videos.pdf
```

Needs Playwright with Chromium, Python with reportlab, pypdf and Pillow, and the DejaVu fonts.
