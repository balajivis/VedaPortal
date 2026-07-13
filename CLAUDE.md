# Veda Portal - CLAUDE.md

A digital gateway to India's Great Knowledge Traditions — the 18 Mahavidyas — in service of one mission: **reattaching Vedic recitation to comprehension.** Read [PROJECT-VISION.md](PROJECT-VISION.md) before making content or product decisions; it is the source of truth for scope and discipline.

## The mission in one sentence

> The Vedas are recited with total fidelity and almost no comprehension. Comprehension exists, partially, among people who cannot recite. Reattaching the two is the mission.

## Non-negotiables (binding for all agents, every session)

| Rule | Why |
|---|---|
| **NEVER squash, rebase-flatten, or force-push `main` history.** | The commit log is the multi-year provenance record. It is evidence, not bookkeeping. |
| **No audio binaries in git. No git-lfs.** | Recordings run to tens of GB; audio lives in object storage, git tracks `_recordings.yaml` manifests only (see `recordings/README.md`). `.gitignore` blocks audio extensions as backstop. |
| **Filesystem path and Prisma schema agree exactly.** | The `path` field *is* the join key between `sources/vedas/` and the DB. Two sources of truth = permanent reconciliation debt. |
| **Never invent content to fill a node.** | Empty + honest status beats confident + hollow. This is the project's core discipline. |

## The corpus is organized by ŚĀKHĀ, not by LAYER

There is no such thing as "an Āraṇyaka" — there is the **Taittirīya Āraṇyaka** of the Taittirīya śākhā of the Kṛṣṇa Yajurveda. Layer (saṃhitā/brāhmaṇa/āraṇyaka/upaniṣad) is a **child of śākhā, never a peer**. Consequences:

- `sources/vedas/` is śākhā-first: `veda/[organization/]shakha/layer/`. Never create a top-level layer directory.
- **Kṛṣṇa/Śukla is an organizational tier ABOVE śākhā, Yajurveda only.** It is not itself a śākhā.
- **The Atharvaveda has no āraṇyaka.** Do not create the directory; absence is encoded by absence.
- **Embedded texts live once, in their home layer**, cross-referenced — never duplicated (Bṛhadāraṇyaka = end of Śatapatha; Taittirīya Up. = TA 7–9; Mahānārāyaṇa = TA 10).
- **The gaps are data.** Attested-but-lost śākhās get a directory and an honest `_status.yaml`. That is a finding, not a to-do.

### The status enum (used everywhere, at every level)

`enumerated` (we know it exists — that is the entire claim) → `sourced` (editions identified) → `structured` (broken to praśna/anuvāka/mantra) → `voiced` (deep usable treatment). **This must be visible in the UI**: a reader who sees `enumerated` learns something true; a confident overview on a hollow node teaches something false. Nearly everything is `enumerated` today, and that is correct for year one.

### Tier discipline

Every node carries `tier`: `settled` / `multi_traditional` (name the lineages) / `contested`. Contested is **earned, not assumed** — ~5–6 hinge facts corpus-wide. `scripts/check-contested.mjs` (CI) warns past 6 and fails past 12.

## Content discipline (binding for all agents)

1. **AI generates, tradition verifies.** Never present model output as a verified reading. "Correct" is defined by traditional scholars, not the model.
2. **Every reading ships with its receipts** — occurrences, sources, disagreements, and where the evidence underdetermines the answer. No confident assertions without an evidence bundle.
3. **We show what is disputed. We do not show what we haven't done the work on. "Contested" is a FINDING, not a fallback.** Contested nodes are rare (~5–6 corpus-wide: Sarasvatī, soma, the horse, Vedic geography, Indus script, Ṛgveda dating). If you're tempted to mark something contested to avoid research, do the research or leave it unmarked.
4. **Depth over breadth.** Do not add new stub nodes/vidyas/pages. Deepen existing ones. Ship the lesson, not the index.
5. **No advocacy.** Out of scope: adjudicating the civilizational/origins debate or producing legitimacy claims for any camp. Show named readings side by side instead.
6. **Node tiers are reader-visible**: `settled` · `multiple-readings` · `contested`. When adding entity/content data, tag the tier.

## Tech Stack

- **Framework**: Next.js 15 (App Router) + React 19
- **Styling**: Tailwind CSS 4 (dark theme)
- **Language**: TypeScript
- **Database**: Prisma 6 (`prisma/schema.prisma`) — auth, uploaded docs
- **Search**: local chunk index (`data/chunks.json`, built by `scripts/build-index.mjs`)

## Development Commands

```bash
npm install           # Install dependencies
npm run dev           # Start dev server at http://localhost:3000
npm run build         # Production build
npm run lint          # Run ESLint
```

## Directory Structure

```
VedaPortal/
├── app/
│   ├── page.tsx                          # Home page
│   ├── layout.tsx                        # Root layout
│   ├── library/                          # 18 Mahavidyas browsing
│   │   ├── page.tsx
│   │   ├── [categoryId]/page.tsx
│   │   ├── [categoryId]/[vidyaId]/page.tsx
│   │   └── explainers/mahavidyas/page.tsx
│   ├── practices/                        # Practices browsing
│   │   ├── page.tsx
│   │   ├── [categoryId]/page.tsx
│   │   └── [categoryId]/[practiceId]/page.tsx
│   ├── search/page.tsx                   # Corpus search UI
│   ├── docs/page.tsx                     # Uploaded source documents
│   ├── login/page.tsx                    # Auth
│   └── api/                              # auth, docs, search routes
├── components/
│   └── MahavidyasDiagram.tsx             # Interactive 18 Mahavidyas diagram
├── content/
│   ├── vidyas.ts                         # 18 Mahavidyas data + helpers
│   └── practices.ts                      # Practices data
├── data/chunks.json                      # Search index
├── prisma/schema.prisma                  # User/Document + corpus hierarchy (Veda→Shakha→Layer→…→Mantra)
├── scripts/                              # build-index, extract-pdfs, process-upload, create-admin, check-contested
├── sources/                              # Source texts — ŚĀKHĀ-FIRST (see sources/README.md)
│   └── vedas/{rigveda,yajurveda,samaveda,atharvaveda}/…/_status.yaml
├── recordings/                           # Recording architecture + manifest template — audio NEVER in git
├── LICENSE                               # Code: GPL-3.0 (content: CC-BY-SA 4.0 in sources/ + content/; recordings: pending)
├── PROJECT-VISION.md                     # Mission — source of truth
├── todos.md                              # Build order (mission-aligned)
└── get-involved.md                       # Contribution protocol (status enum + tier discipline)
```

## Content Structure

The 18 Mahavidyas are organized into 4 categories — an **inherited** taxonomy (keep it; do not invent a new IA):

| Category | Sanskrit | Count | Description |
|----------|----------|-------|-------------|
| **Core Sacred Texts** | चतुर्वेद | 4 | The Four Vedas |
| **Vedic Disciplines** | वेदाङ्ग | 6 | The Six Limbs |
| **Applied Sciences** | उपवेद | 4 | Practical sciences |
| **Foundational Wisdom** | दर्शन | 4 | Philosophy & ethics |

## Design System

- **Theme**: Dark mode (zinc-950 background)
- **Accent**: Amber (amber-500, amber-400) for primary actions
- **Category Colors**:
  - Vedas: Amber (amber-400)
  - Vedangas: Emerald (emerald-400)
  - Upavedas: Sky (sky-400)
  - Darshanas: Purple (purple-400)
- **Cards**: Category-colored backgrounds with matching borders

## Key Routes

```
/                                    # Home page
/library                             # Browse all 18 vidyas
/library/[category]                  # vedas | vedangas | upavedas | darshanas
/library/[category]/[vidya]          # Individual vidya detail
/library/explainers/mahavidyas       # Interactive overview diagram
/practices                           # Practices catalog
/practices/[category]/[practice]     # Individual practice
/search                              # Corpus search
/docs                                # Source documents
/login                               # Auth
```

## Adding New Content

**Default to deepening, not adding** (Content discipline #4). To modify content, edit `content/vidyas.ts` or `content/practices.ts`:

```typescript
{
  id: 'vidya-id',
  name: 'English Name',
  sanskrit: 'संस्कृत नाम',
  description: 'Short description',
  fullDescription: 'Detailed description...',
  keyTopics: ['Topic 1', 'Topic 2'],
  sources: ['Source 1', 'Source 2'],
  relatedTo: ['other-vidya-id']
}
```

When writing `fullDescription` or lesson content: cite sources, present traditional and academic readings as named layers, and never flatten a disagreement into a single confident answer.

## Relationship to Class Platform

This project follows the same patterns as `modernaipro/class-platform`:
- Similar library browsing structure
- Same dark theme aesthetic
- Interactive explainer components
- Category-based filtering
