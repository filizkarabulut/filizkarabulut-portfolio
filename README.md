# Filiz Karabulut — Portfolio

Personal portfolio site. The homepage is a sticker-covered MacBook lid seen from
above; each sticker scrolls to a section (About, Experience, Projects, Leadership,
Education, Contact) or links out to GitHub / LinkedIn. Projects open as
macOS-style windows with short case studies.

**Live:** https://filizkarabulut.com

## Tech stack

- **Next.js 16** (App Router, Turbopack)
- **React 19**
- **TypeScript**
- **Tailwind CSS v4**
- **next/font** (Space Grotesk, Inter, JetBrains Mono)
- Deployed on **Vercel**

## Getting started

```bash
npm install
npm run dev     # http://localhost:3000
```

Other scripts:

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint    # ESLint
```

### Environment variables

None. The site is fully static content with no secrets, API keys, or
environment variables required to build or run.

## Project structure

```
src/
  app/          # App Router routes, root layout, global styles
  components/   # UI components (stickers, windows, case studies, command palette)
  data/
    portfolio.ts  # Single source of truth: all copy, links, and content
  hooks/        # Small React hooks
  lib/          # Navigation + sticker-image helpers
public/
  stickers/     # Sticker artwork (one file per sticker id)
  resume.pdf    # Résumé linked from the header
```

Almost all content lives in [`src/data/portfolio.ts`](src/data/portfolio.ts);
components only render that data.

## Deployment

Deployed on [Vercel](https://vercel.com). Pushing to the default branch triggers
a production deploy; pull requests get preview deployments. No environment
variables are configured.

## License

The **code** in this repository is licensed under the [MIT License](LICENSE).

The **content** — including the text/copy, the résumé, the sticker artwork and
logos, and the overall visual design — is **not** licensed for reuse and remains
© Filiz Karabulut. Third-party logos (e.g. Vanderbilt, VandyHacks, AMPLIFY) are
the property of their respective owners. Please don't copy the site as your own
portfolio; feel free to learn from the code.
