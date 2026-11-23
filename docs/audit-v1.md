# Audit: alpha-hardscapes-v1.vercel.app (23 November 2026)

Every URL in the sitemap (67 pages) was loaded in Chromium at desktop (1440px, 2x) and phone (390px, 3x) size, and scrolled so lazy images loaded. Each page was checked for status code, console errors, failed requests, broken images, images rendered below their sharp resolution, missing alt text, H1 count, title and description length, canonical, horizontal overflow and a tap-to-call link.

## Passed

| Check | Result |
|---|---|
| Pages returning 200 | 134 of 134 page loads |
| Broken images | 0 |
| Images without alt | 0 |
| Pages with exactly one H1 | all |
| Horizontal scroll on phones | none |
| Tap-to-call link on every page | yes |
| Canonical URLs | all point at https://alphahardscapes.com |
| JavaScript errors | none (the only console errors were the 404s below) |

## Found and fixed

| Issue | Fix |
|---|---|
| Photos encoded at 1800px / quality 80 | Re-encoded every photo at its full original size (up to 2560px) at quality 88; the image optimizer now serves quality 85 (90 for portraits and small sources). |
| Founder photo was a 200px thumbnail shown at 460px | Replaced with the 637px original. No larger photo exists on the old site or in the Drive image library; a new headshot is on the client checklist. |
| Hero used a still photo, not the live site's background video | The home hero now plays the same clip as alphahardscapes.com (hero.mp4, with its poster frame) on desktop and phone, muted and looped; it stays on the poster for visitors who prefer reduced motion. |
| Vertical crew reel from the live site not used | Shown beside "Why Connecticut homeowners choose Alpha Hardscapes" with play controls, with Sebastian's badge. |
| Service heroes built from 666 to 940px illustrations, stretched to 1440px | Outdoor kitchens, stone veneer and Avon now use real 2560px job photos. Pages whose only image is small (decks, chimneys, repairs, seasonal) use a contained hero that never stretches the image. |
| Before/after halves (about 500px) stretched to 770px and still carrying the collage's printed "BEFORE/AFTER" strip | Re-cropped to the photo only and capped near native size. |
| Blog banners were 1200x630 copies upscaled from 1536x512 | Now the 1536x512 originals (1920x1080 for the retaining-wall post), shown at their real proportions. |
| Block retaining wall project cover was 800x600 | Cover switched to the 2560px photo of the same wall. |
| 404s from links inside blog posts (/blog/west-hartford/, old root-level post URLs, three posts that were never published) | 20 links repointed to live pages, matching 301 redirects added, and a test now fails the build if any internal content link breaks. |
| 15 titles over 65 characters and 8 descriptions over 165 | Shortened. Generated titles drop the brand suffix when it would push them over 65; a test enforces the limits on built-in content. |

## Still open (needs the client)

- A high-resolution headshot of Sebastian (at least 1600px).
- Real photos for decks, chimneys and seasonal services (those pages still use the old illustrations, now shown small).
- The hero video is the live site's 1094x720 clip. A 1920x1080 or 4K export of the same footage would make the hero sharper on large screens.
