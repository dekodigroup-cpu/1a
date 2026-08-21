# Ross Law Office, PLLC — Legacy by Design

A 3D, editorial landing page for [Ross Law Office, PLLC](https://rosslawoffice.net/) of
384 Court Street, West Point, Mississippi. Dark, cinematic, and built around one
job: getting a family to book a Family Wealth Planning Session.

React 18 · Vite 5 · TypeScript · Tailwind CSS 3 · `lucide-react` for icons.
Nothing else — no UI kit, no animation library, no 3D library.

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # typecheck + production bundle into dist/
npm run preview
```

## The 3D

`src/components/webgl/Rings3D.tsx` is a hand-written WebGL renderer — no three.js.
It raymarches a signed-distance scene in a single fragment shader: a brass core
inside three orbiting rings, standing on a polished floor that reflects them,
lit by a warm key and an oxblood fill with soft shadows, ambient occlusion and
one reflection bounce. The camera drifts slowly and leans toward the pointer,
and the dolly opens up on narrow viewports so the rings never crop on a phone.

It is metaphor, not decoration: a plan is layers of protection around what
matters, and you can see straight through to the middle.

Three things keep it from ever being a liability:

- **Adaptive quality** — frame cost is measured over the first dozen frames. Too
  slow, and it drops to 60% internal resolution; still too slow, and it stops
  and hands over to a static gradient field.
- **No WebGL, no problem** — the same static field renders if context creation fails.
- **Reduced motion** — one still frame is drawn and held; nothing animates.

Elsewhere the depth is CSS: `perspective` + `preserve-3d` on the plan cards and
attorney portraits (`usePointerTilt`), with inner layers pushed apart on Z and a
glare that tracks the pointer, and scroll-driven lean on the process plate
(`useParallax`).

## Editing the site

| What | Where |
| --- | --- |
| Every word on the page | `src/lib/content.ts` |
| Photographs | `public/photos/` — see the shot list in [`public/photos/README.md`](public/photos/README.md) |
| Photo slots and crops | `src/lib/photos.ts` |
| Colour tokens | `tailwind.config.js` (classes) and `src/lib/theme.ts` (values) |
| Type, animation primitives | `src/index.css` |

### Colour

The palette lives in two places that must agree: `tailwind.config.js` for the
utility classes, and `src/lib/theme.ts` for the handful of spots that need a
value rather than a class (the mist transitions, the canvas fallback). `navy`
is the brand blue — change that one hex in both files and every section, scrim
and gradient follows. The shader carries its own copy of `NAVY` and `INK` as
`vec3` literals at the top of `src/components/webgl/Rings3D.tsx`; the comment
next to each gives the hex it came from.

### Photographs

The site uses the firm's own photography and nothing else — no stock, no
generated imagery. Six slots are wired up; drop the files into `public/photos/`
with the names listed there and they appear. Until a file exists the layout
holds and renders a quiet typographic plate in its place, so the page is never
broken and never silently substitutes something generic.

### The booking form

Set `VITE_FORM_ENDPOINT` (see `.env.example`) to any endpoint that accepts a
`multipart/form-data` POST — Formspree, Netlify Forms, Basin, your own handler.
With it unset the form tells the visitor to phone the office rather than
pretending a submission went through.

## Reading the live site

`npm run scrape -- <url>` drives a real browser over a site and writes
everything needed to rebuild or review it into `scrape/` (gitignored):

- `report.md` — pages, palette and fonts at a glance
- `palette.json` / `palette.html` — every colour the site actually paints,
  ranked by how much of the page it covers, as data and as swatches
- `pages/<slug>.md` — title, meta, headings and body copy per page
- `images/` — every image the site loads, at full resolution
- `shots/` — full-page desktop and mobile screenshots

```bash
npx playwright install chromium     # once
npm run scrape -- https://rosslawoffice.net
```

Set `PLAYWRIGHT_CHROMIUM_PATH` to reuse an existing Chromium, and
`SCRAPE_MAX_PAGES` to change the 25-page crawl cap.

Note this needs outbound network access to the target host. In a sandboxed
Claude Code environment that is governed by the environment's network policy,
not by the tooling here.

## Copy

The copy is a draft written from publicly available information about the firm.
It states fees, timelines and probate figures, and it speaks in Stephen S. Ross's
voice in the Q&A — all of which needs the firm's review and sign-off before this
goes live, both for accuracy and for Mississippi attorney-advertising rules. The
standard disclaimers are already in the footer and under the form.
