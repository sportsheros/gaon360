# GAON 360

**मेरा गाँव • मेरी पहचान • हमारा भविष्य** — *Know Your Village. Build Your Future.*

Phase 1: a static, bilingual (Hindi/English) village vision & development website with an interactive 3D village.
The full product requirements are in [CLAUDE.md](CLAUDE.md).

**Author:** Jeet Beniwal · Powered by MediBook

## Tech stack

React 19 · Vite · TypeScript · Tailwind CSS v4 · Framer Motion · Three.js + React Three Fiber + drei · React Router · i18next · Lucide icons

## Getting started

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # type-check + production build into dist/
npm run preview   # serve the production build
```

## Project structure

```text
src/
├── components/     Navbar, Footer, Hero, Village3D, Statistics, VisionCards, Roadmap,
│                   CareerRoadmap, AIPlaceholder, Search, Contact, common/
├── pages/          Home, Village, Vision, Development, Education, Youth, Seniors,
│                   Women, Farmers (share FocusPage), Manifesto, About, Contact, NotFound
├── data/           Static data – village.ts, vision.ts, roadmap.ts, manifesto.ts, contact.ts, navigation.ts
├── locales/        hi.json, en.json – all page text
├── hooks/          useSeo, useLocalized, useMediaQuery
├── services/       dataService.ts – swap to API calls in Phase 2
└── utils/          search.ts – client-side search over locale content
```

## Editing content

| What | Where |
| --- | --- |
| Village name, district, population & other numbers | `src/data/village.ts` |
| 3D landmark facts (students, teachers…) | `landmarks` in `src/data/village.ts` |
| Manifesto points (priority / timeline) | `src/data/manifesto.ts` + text in `manifesto.items` in locales |
| Phone, WhatsApp, email, social links | `src/data/contact.ts` |
| Any visible text (Hindi / English) | `src/locales/hi.json`, `src/locales/en.json` – keep keys identical |
| Candidate details | `about` section in locales; photo → `public/images/` |
| Gallery photos | `public/images/` and the `<figure>` in `src/pages/Village.tsx` |
| Site URL for canonical/OG tags | `SITE_URL` in `src/hooks/useSeo.ts` and `index.html` |

> All values currently in the repo (students, seniors, farmers, youth counts, 3D landmark facts, phone, candidate) are **placeholders**.
> Replace them with verified information, and have the final election content reviewed against applicable election rules before publishing.

## Features

- **3D village** – procedurally built (no heavy model download), rotate/zoom/pan, clickable landmarks with info cards,
  reduced detail and no shadows on mobile, rendering pauses when off-screen, keyboard-accessible list of places, WebGL fallback.
- **Bilingual** – Hindi default, language saved in the browser, `<html lang>` updated.
- **Search** – header button, `/` or `Ctrl+K`; matches Hindi and English content.
- **AI assistant placeholder** – static FAQ panel ("GAON AI जल्द उपलब्ध होगा").
- **Suggestion poll** – nothing is stored; the selection can be shared via WhatsApp.
- **SEO** – per-page title, description, Open Graph, canonical URL.
- **Accessibility** – skip link, focus-trapped dialogs, visible focus, reduced-motion support, 44px touch targets.
- **Performance** – every page except Home is code-split; Three.js loads lazily only with the 3D view.

## Deployment

Any static host works. SPA fallbacks are included for Vercel (`vercel.json`) and Netlify (`public/_redirects`).

## Roadmap

Phase 1 Static website → Phase 2 Backend + DB (FastAPI, PostgreSQL) → Phase 3 Citizen platform → Phase 4 AI assistant (RAG) → Phase 5 Complete digital village.
