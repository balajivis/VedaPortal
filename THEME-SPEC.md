# Theme Spec — dark and editorial

Two themes, one rule. This document says which is which and why, so the boundary
is a decision rather than a mood.

---

## The rule

> ### **Dark when you are CHOOSING. Editorial when you are READING.**

Not "high engagement vs peaceful reading" — that axis breaks immediately, because a
contested verse with six apparatus rows is the most demanding thing on the site and
it must be editorial. The distinction is **orientation vs. sustained attention on a
text.**

Internal names, and they are ours (`modern_etic`), not the tradition's:

| Theme | Name | You are… |
|---|---|---|
| Dark | **anukramaṇī mode** | finding your place — the index |
| Editorial | **pāṭha mode** | in the text itself |

A reader should be able to predict the switch after crossing it once.

---

## Why editorial for text — and it is not taste

**Svara marks halate on dark grounds.** Light type on dark optically blooms; fine
strokes spread and thicken. Vedic accents are hairlines sitting *both* above the
headline (udātta U+0951, and the Vedic Extensions U+1CD0–1CFF) and below the
baseline (anudātta U+0952). Dark is measurably worse at the one thing this project
cannot afford to render wrong.

Add that the Brāhmaṇa is long prose and sustained reading on dark is more fatiguing
in daylight, and the reading layer wants paper on the merits.

---

## The map

### Dark — `bg-zinc-950`, the existing app shell

| Surface | Route |
|---|---|
| Home / the 18 Mahāvidyā map | `/` |
| Category and vidyā browsing | `/library`, `/library/[categoryId]` |
| Practices catalogue | `/practices/*` |
| Search and results | `/search` |
| Source documents | `/docs` |
| Auth | `/login` |
| **Coverage / śākhā survival map** | *(new)* — see below |

### Editorial — `.ed-root .vd-root`, paper

| Surface | Route |
|---|---|
| Depth 1 — the woven topical read | `/read/[topic]` |
| Depth 2 — the anchored source | `/text/[corpus]/[ref]` |
| Narrative-index cards (Naciketas, Sudās…) | `/story/[entry]` |
| Vidyā detail once it carries real text | `/library/[categoryId]/[vidyaId]` |
| Lessons and long-form essays | `/essay/[slug]` |

### The one deliberate crossover

**The coverage map stays dark** even though it is where the honest `enumerated` /
`sourced` / `structured` / `voiced` data lives. It is a map, not a text — you read
it to decide where to go. It is also where the project's honesty is most visible at
a glance: 44 sourced against 29 enumerated across 74 nodes, and which branches are
`living`, `endangered`, `fragmentary`, `rediscovered`, `lost`.

That turns the entry point from a promise into an instrument, which is the same move
the reading layer makes when it shows its seams — one level up.

---

## Implementation

**No layout refactor.** `editorial.css` defines every token on `.ed-root`, not
`:root` — deliberately, and the upstream comment explains that it shields the
subtree from a hostile `globals.css`. It is already defensive against exactly our
situation: dark `<body>`, different font stack.

So the dark shell in `app/layout.tsx` stays untouched. A reading page wraps itself:

```tsx
import { vedicFontsClass } from '@/components/editorial/vedic-fonts'

<div className={vedicFontsClass}>
  <div className="ed-root vd-root">
    …
  </div>
</div>
```

`vedicFontsClass` must sit on the same element as (or an ancestor of) `.vd-root` —
the `next/font` CSS variables are scoped to the element carrying the className, and
resolving them at `:root` yields empty values and hands the cascade back to the dark
body font.

---

## What must NOT change across the boundary

These carry meaning, so they must mean the same thing in both themes.

| | |
|---|---|
| **Tier badges** | `settled` · `multiple readings` · `contested`. If `contested` looks different in dark and paper, the tier discipline leaks. |
| **Status badges** | `enumerated` · `sourced` · `structured` · `voiced` — and `enumerated` keeps its dashed border in both. |
| **Canonical addresses** | `RV 3.53.12` is the spine. Same monospace, same casing, same tracking, everywhere. |
| **Machine marking** | Machine output is marked *in the text* in both themes, never in a footer. Screenshots travel; disclaimers don't. |

**The four category colours do not survive the crossing.** Amber, emerald, sky and
purple are tuned for `zinc-950`; on `#F4F2EC` they go muddy or garish. A mapped
light-mode palette is required — an inverted background is not enough.

---

## Token reference

Dark tokens live in `app/globals.css` (`:root`). Editorial tokens live in
`components/editorial/editorial.css` (`.ed-root`). Vedic additions live in
`components/editorial/vedic.css` (`.vd-root`) and are kept separate so
`editorial.css` stays diffable against its upstream in `class-platform`.

| Role | Dark | Editorial |
|---|---|---|
| Ground | `#09090b` | `#F4F2EC` |
| Ink | `#fafafa` | `#0B0B0C` |
| Accent | `#f59e0b` amber | `#8B2E1F` rust |
| Rule | `#27272a` | `#D8D6D0` |
| Muted | `#a1a1aa` | `#6B6B6B` |

Tier and status hues are defined once in `vedic.css` and are drawn from the
editorial "sparing-use" accents (`--ed-good`, `--ed-warn`, `--ed-teal`) so they sit
inside the palette rather than beside it.

---

## Type

| Stack | Face | Used for |
|---|---|---|
| `--ed-serif` | Newsreader | headings, prose, ledes |
| `--ed-sans` | Inter Tight | UI chrome |
| `--ed-mono` | JetBrains Mono | addresses, badges, eyebrows |
| `--vd-deva` | Noto Serif Devanāgarī → Adishila → Siddhanta | **the mantra line** |
| `--vd-tamil` / `--vd-malayalam` / `--vd-kannada` / `--vd-grantha` | Noto Serif / Sans | script switcher |

**`line-height: 2.05` on `.vd-mantra-text` is not negotiable downward.** Marks stack
above and below; at the 1.4–1.6 that suits Latin prose, accents from adjacent lines
collide.

**Latin OpenType features must not reach Indic.** `editorial.css` sets
`font-feature-settings: "ss01","onum","liga"` on `.ed-root`; `.vd-mantra-text` resets
it to `normal`.

### The font decision is not final

Noto Serif Devanāgarī is the default because its licensing and coverage are safest,
**but its Vedic Extensions support is patchy** and that is the block that matters.
`vedic-fonts.ts` exports `TEST_VEDIC_ACCENTS` — three real strings from the accented
Aitareya Upaniṣad, including U+1CDA VEDIC TONE DOUBLE SVARITA on `एवा᳚ग्र`.

Render them at 22px and 34px. If a mark is missing, doubled, tofu-boxed, or collides
with the headline, the face has failed. Siddhanta and Adishila are the fallbacks
built for Vedic; Murty Sanskrit is the best-looking option if the licence permits.

---

*Built to be torn apart. The rule is the load-bearing part; the route lists will drift.*
