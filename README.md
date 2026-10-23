# Filiz Karabulut — portfolio

An interactive portfolio: the homepage is your sticker-covered MacBook lid seen
from above. Most stickers open a macOS-style window with that section's content;
the GitHub and LinkedIn stickers link straight to your profiles in a new tab.

## Editing the site

Everything lives in **one file**: [`src/data/portfolio.ts`](src/data/portfolio.ts).

- `sections` — the content shown inside each window (headings, lists, links,
  tags, meta rows, notes, and `todo:` placeholders).
- `stickers` — the clickable stickers: id, label, image path, size tier, shape,
  color, rotation, desktop + mobile positions, and either which section each
  opens (`opens`) or an external URL (`href`) for link stickers.
- `siteName`, `tagline` — the header name and one-line tagline.
- `contactEmail`, `githubUrl`, `linkedinUrl`, `resumeUrl` — contact details and
  profile/file links (the GitHub & LinkedIn stickers and the header Résumé link
  all read from these).

Components only render this data, so you never need to touch them to update
content. Drop sticker images into `public/stickers/` and fill in the `todo:`
entries.

## Development

```bash
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint
```

## Sticker images

Put one file per sticker in `public/stickers/`, named by its **id** (the `id`
field in `portfolio.ts`). **The extension doesn't matter** — `fk.svg`, `fk.png`,
`fk.webp`, and `fk.jpg` are all found automatically, so you can just drop in or
overwrite a file with no code change. **Any sticker whose file is missing renders
as a labeled placeholder**, so you can add art one at a time.

| File (any extension) | Sticker | Recommended | Min size |
|---|---|---|---|
| `fk.*`         | `{ FK }` (centerpiece) | SVG or transparent PNG | 800×800 |
| `amplify.*`    | AMPLIFY        | SVG or transparent PNG | 600×600 |
| `spiq.*`       | SpIQ           | SVG or transparent PNG | 600×600 |
| `vandyhacks.*` | VandyHacks     | SVG or transparent PNG | 600×600 |
| `vanderbilt.*` | Vanderbilt     | SVG or transparent PNG | 600×600 |
| `ai.*`         | AI / neural net | SVG or transparent PNG | 500×500 |
| `valiant.*`    | Ask VALIANT    | SVG or transparent PNG | 500×500 |
| `vuit.*`       | VUIT / IT      | SVG or transparent PNG | 500×500 |
| `git-commit.*` | git commit tag | SVG or transparent PNG | 800×320 (wide) |
| `violin.*`     | Violin         | SVG or transparent PNG | 400×400 |
| `hiking.*`     | Hiking / mountains | SVG or transparent PNG | 400×400 |
| `film.*`       | Film           | SVG or transparent PNG | 400×400 |

Notes:
- **One file per id.** If both `fk.svg` and `fk.png` exist, `.svg` wins — delete
  the one you don't want so the right logo shows.
- **Transparent background recommended.** The white "die-cut" outline, soft
  shadow, and vinyl sheen are added in CSS around the shape, so a shaped
  (non-rectangular) transparent logo looks best; a solid rectangular image still
  works, it just reads as a square sticker.
- **SVG is sharpest** at any size; transparent PNG/WebP at the size above also
  works. Square art for circle/rounded stickers; the `git-commit` "tag" sticker
  should be wide (~2.6:1).
- To change a sticker's id, size, shape, color, rotation, or position, edit the
  matching entry in `portfolio.ts` (placement lives in `lidPlacement`).

## Résumé

The header Résumé link opens `public/resume.pdf` in a new tab. Add that file to
`public/` (or change `resumeUrl` in `portfolio.ts`) — until then the link 404s.

## Still TODO (content placeholders in `portfolio.ts`)

Each appears in the UI as a dashed "TODO:" box until you replace it.

- **About** — personal intro (2–3 sentences).
- **AMPLIFY** — internship dates, description, 2–4 highlights, tech tags.
- **SpIQ** — your role, what it does / how it works, tech tags, demo + Devpost +
  GitHub links.
- **VandyHacks (Leadership)** — term, description of your role & the org,
  impact highlights, site link.
- **Education** — relevant coursework, honors/activities (GPA optional).
- **AI** — what draws you to AI (2–4 sentences).
- **Ask VALIANT** — description, tech tags, live + GitHub links.
- **VUIT** — your title, dates, description, tech tags.
- **Projects** — any additional projects; real GitHub URL.
- **Off the clock** — a line or two each for violin, hiking, and film.
- **Profiles** — set `githubUrl` and `linkedinUrl` (used by both the stickers and
  the Contact window; email is already set).
- **Résumé** — add `public/resume.pdf`.
