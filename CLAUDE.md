# Veda Portal - CLAUDE.md

A digital gateway to explore India's Great Knowledge Traditions — the 18 Mahavidyas.

## Project Overview

**Veda Portal** is a browsing and educational platform for Vedic knowledge traditions, built with the same patterns as the Modern AI Pro class-platform.

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS 4 (dark theme)
- **Language**: TypeScript

## Development Commands

```bash
npm install           # Install dependencies
npm run dev           # Start dev server at http://localhost:3000
npm run build         # Production build
npm run lint          # Run ESLint
```

## Directory Structure

```
veda-portal/
├── app/
│   ├── page.tsx                          # Home page
│   ├── layout.tsx                        # Root layout
│   ├── globals.css                       # Global styles
│   └── library/
│       ├── page.tsx                      # Library browsing page
│       ├── [categoryId]/
│       │   ├── page.tsx                  # Category listing
│       │   └── [vidyaId]/
│       │       └── page.tsx              # Individual vidya detail
│       └── explainers/
│           └── mahavidyas/
│               └── page.tsx              # Interactive overview
├── components/
│   └── MahavidyasDiagram.tsx             # Interactive 18 Mahavidyas diagram
├── content/
│   └── vidyas.ts                         # All vidya data and helpers
└── package.json
```

## Content Structure

The 18 Mahavidyas are organized into 4 categories:

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
/library/vedas                       # 4 Vedas
/library/vedangas                    # 6 Vedangas
/library/upavedas                    # 4 Upavedas
/library/darshanas                   # 4 Darshanas
/library/[category]/[vidya]          # Individual vidya detail
/library/explainers/mahavidyas       # Interactive overview diagram
```

## Adding New Content

To add a new vidya or modify existing content, edit `content/vidyas.ts`:

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

## Relationship to Class Platform

This project follows the same patterns as `modernaipro/class-platform`:
- Similar library browsing structure
- Same dark theme aesthetic
- Interactive explainer components
- Category-based filtering
