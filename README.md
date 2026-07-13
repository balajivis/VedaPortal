# VedaPortal

> **The Vedas are recited with total fidelity and almost no comprehension. Comprehension exists, partially, among people who cannot recite. Reattaching the two is the mission.**

A digital gateway to India's Great Knowledge Traditions — a śākhā-first Vedic corpus with recordings, layered readings, and evidence you can click. Read [PROJECT-VISION.md](PROJECT-VISION.md) for the full mission and method; [get-involved.md](get-involved.md) to contribute.

ॐ सह नाववतु । सह नौ भुनक्तु । सह वीर्यं करवावहै । तेजस्वि नावधीतमस्तु मा विद्विषावहै । ॐ शान्तिः शान्तिः शान्तिः ॥

## What's here

| Path | What it is |
|---|---|
| `app/`, `components/`, `lib/`, `prisma/`, `scripts/` | The Next.js portal and corpus schema |
| `sources/` | Source texts, organized **by śākhā, never by layer** — see [`sources/README.md`](sources/README.md) |
| `content/` | The 18 Mahāvidyā taxonomy and site content |
| `recordings/` | Recording architecture + manifests — **audio never lives in git** ([`recordings/README.md`](recordings/README.md)) |

## Licensing — three layers, three licenses

| Layer | License | File |
|---|---|---|
| **Code** (`app/`, `components/`, `lib/`, `scripts/`, `prisma/`) | GPL-3.0 | [`LICENSE`](LICENSE) |
| **Content / data** (`sources/`, `content/`, `data/`) — our original compilation, metadata, and writing | CC-BY-SA 4.0 | [`sources/LICENSE`](sources/LICENSE), [`content/LICENSE`](content/LICENSE) |
| **Recordings** | **Pending** — a separate explicit grant negotiated with the reciters; nothing is distributable until it exists | [`recordings/LICENSE`](recordings/LICENSE) |

Third-party PDFs under `sources/` carry their own terms — see the provenance caveats in [`sources/README.md`](sources/README.md). The recordings license and the consent form the scholars sign must say the same thing.

## Development

```bash
npm install
npm run dev            # http://localhost:3000
npm run build
node scripts/check-contested.mjs   # contested-node tripwire (also runs in CI)
```

## The disciplines (short form)

1. **Śākhā-first.** There is no "an Āraṇyaka" — there is the Taittirīya Āraṇyaka *of* the Taittirīya śākhā. Layer is a child of śākhā.
2. **The gaps are data.** A lost śākhā gets a directory and an honest `_status.yaml`.
3. **Never invent content to fill a node.** `enumerated` — "we know it exists" — is a complete, honest claim.
4. **Contested is a finding, not a fallback.** ~5–6 genuinely contested nodes corpus-wide; CI trips past 12.
5. **AI generates, tradition verifies.** Every reading ships with its receipts.
6. **`main` history is the provenance record.** Never squashed, never force-pushed.
