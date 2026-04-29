# 괜찮아 Box

> _Gwaenchana Box · It’s Okay Box_
>
> _Share a failure. Receive a little courage._

A digital extension of our **vending-machine-style prototype** — a physical
Design Thinking artifact targeting social comparison stress among Korean
university students. Instead of snacks or drinks, students drop in a failure
story and take out an anonymous one from someone else.

This site is what students reach when they scan the QR code on the physical
box. It mirrors the same exchange digitally — _share a failure, receive a
little courage_.

This site is what students reach when they scan the QR code on the physical
machine. It mirrors the same exchange digitally — _leave one story, take one story_.

---

## What it does

- **Share** — write a failure story anonymously (what happened / how it felt /
  what helped, with a category and an optional "show as recovery story" flag).
- **Read** — browse other students' stories filtered by category, with a vending
  window that drops a random story when you press it.
- **Recovery Shelf** — a slightly more hopeful view of stories where someone
  found a way forward.
- **Support reactions** — _I relate · You're not alone · Thank you for sharing ·
  This helped me_. No likes, no rankings, no profiles.

in your browser via `localStorage`. No backend, no auth, no
analytics, no tracking.

## Stack

- Vite + React 19 + TypeScript (strict)
- Tailwind CSS v4 (CSS-first `@theme`)
- Motion (CSS-only here, kept lightweight)
- Google Fonts: **Fraunces** (display, variable SOFT axis), **Manrope** (body),
  **JetBrains Mono** (small labels and stamps)

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
```

```bash
npm run build    # type-check + production build to dist/
npm run preview  # preview the built site
```

Requires Node 20 or newer.

## Deploy to Vercel

This repo includes `vercel.json` so Vercel can deploy it as a static Vite app:

- Framework preset: `Vite`
- Install command: `npm ci`
- Build command: `npm run build`
- Output directory: `dist`

After pushing the repo, import it in Vercel and deploy. The config also rewrites
all routes to `index.html`, which keeps the React app working on page refreshes.

## Project structure

```
src/
├── App.tsx                       state + section routing + handlers
├── main.tsx
├── index.css                     Tailwind v4 @theme, base, animations
├── types.ts                      Story, ReactionCounts, Category, SectionKey
├── data/sampleStories.ts         10 preloaded student-tone sample stories
├── lib/
│   ├── categories.ts             8 category definitions
│   ├── id.ts                     time-based id generator
│   └── storage.ts                load/save user stories + reaction overrides
└── components/
    ├── Header.tsx                sticky desktop top nav
    ├── BottomNav.tsx             sticky mobile bottom nav
    ├── HeroSection.tsx           landing hero + insight cards
    ├── VendingIllustration.tsx   inline-SVG vending machine
    ├── ShareStorySection.tsx     share flow + post-submit success state
    ├── StoryForm.tsx             form fields + validation
    ├── StoriesSection.tsx        filter + grid + sticky machine-window panel
    ├── StoryCard.tsx             single story card
    ├── CategoryFilter.tsx        category pills
    ├── SupportReactionButtons.tsx four reaction pills with +1 ping
    ├── RandomStoryPanel.tsx      the "machine window" + drop animation
    ├── RecoverySection.tsx       hopeful shelf view
    ├── AboutSection.tsx          project explanation + how it works + safety
    ├── SafetyNotice.tsx          crisis-resource block
    ├── Footer.tsx
    └── ToastContext.tsx          tiny toast system + useToast hook
```

## Data model

```ts
interface Story {
  id: string;
  category: Category;
  event: string;
  feeling: string;
  recovery: string; // '' if none
  isRecoveryStory: boolean;
  createdAt: string; // ISO
  reactions: {
    relate: number;
    notAlone: number;
    thankYou: number;
    helped: number;
  };
  source: "sample" | "user";
}
```

Sample stories live in `src/data/sampleStories.ts`. User submissions are stored
in `localStorage` under `failmate.userStories.v1` (legacy key kept for
compatibility). Reaction counts persist through `failmate.reactionOverrides.v1`
so refreshing the page keeps your support gestures visible.

## How this connects to the physical prototype

The physical 괜찮아 Box is a vending-machine-style prototype that sits where
students gather. They write a story on a card, slide it into the box, and pull
a different student’s card out from the receive slot. The website is the same
exchange in pocket form: scan the QR sticker on the box, drop a story, receive
one back.

To deploy and link the QR:

1. Push to a host (Vercel, Netlify, GitHub Pages, etc.).
2. Generate a QR for the deployed URL with any free generator (e.g. qr.io).
3. Print and stick it to the box where students would normally find a
   product label.

Both surfaces share the same goal: making hidden failure visible, anonymous,
and supportive — so students stop assuming everyone else is one step ahead.

## Design notes

- Palette is intentionally warm — soft cream background, paper white cards,
  matcha green for primary actions, soft red for emotional accents (the red
  balls echo the ones inside the physical machine).
- The cabinet, slot, and receive button on the home page are not stock art —
  they’re hand-built with inline SVG to match the cardboard prototype’s lines.
- Copy avoids clinical / corporate language. Reactions are framed as _support
  gestures_, not likes.
- No usernames, profiles, follower counts, or rankings. Stories are numbered
  (`#001`, `#002`, …) and that's the only identity they get.

## Privacy & safety

- Nothing leaves the device. No accounts, no analytics, no network calls beyond
  the static asset fetch.
- A safety notice is shown on the About page reminding visitors that this is a
  student prototype, not professional counseling, with a pointer to trusted
  people, campus counseling, or emergency support.
- Each story has a "Report" link (prototype-only — shows a confirmation toast).

## Disclaimer

Built as a student prototype for a Design Thinking class (Project #2: Create a
Prototype). Not a clinical or counseling product.
