# Get Involved

Hey, you! Thanks for coming to this project. Read [PROJECT-VISION.md](PROJECT-VISION.md) first. Then read this page — it is the **contribution protocol**: the status tags tell you where the holes are, and what a valid PR looks like.

## First, the one organizing principle

> **The corpus is organized by ŚĀKHĀ, not by LAYER.**

There is no such thing as "an Āraṇyaka" in this repo. There is the **Taittirīya Āraṇyaka** — the Āraṇyaka *of* the Taittirīya śākhā of the Kṛṣṇa Yajurveda, at `sources/vedas/yajurveda/krishna/taittiriya/aranyaka/`. Layer is a child of śākhā, never a peer of it. Every śākhā-blind corpus (GRETIL, DCS, TITUS, VedaWeb) flattens this dimension; preserving it is the point of this project. PRs that place a text by layer instead of śākhā will be asked to re-place it. (Kṛṣṇa/Śukla is an organizational tier **above** śākhā, Yajurveda only. The Atharvaveda has **no** āraṇyaka — do not create one.)

## The status enum — where the holes are

Every śākhā carries a `_status.yaml`; every layer within it carries a status:

| Value | The claim being made |
|---|---|
| `enumerated` | We know it exists. **That is the entire claim.** |
| `sourced` | Editions / manuscripts / tools identified |
| `structured` | Broken down to praśna / anuvāka / mantra |
| `voiced` | Written up with depth and a usable treatment |

**A valid contribution advances one node exactly one step**, with evidence:

- `enumerated → sourced`: name the edition/manuscript/digital corpus, its provenance, and its license. Add it to the śākhā's `_status.yaml` `sources:` list (and the file itself if redistributable).
- `sourced → structured`: break the text to praśna/anuvāka/mantra following the Prisma schema (`prisma/schema.prisma`); the filesystem `path` is the join key and must match exactly. Record the **korvai** (the tradition's own pada-count checksum) where the tradition supplies it.
- `structured → voiced`: write the deep treatment — layered readings with receipts, per the vision's translation-view layers.

Nearly everything is `enumerated` today. **That is correct for year one** — the honesty is in saying so.

## The two disciplines that gate every PR

1. **Never invent content to fill a node.** An empty directory with an honest `_status.yaml` is a *finding*. A confident overview on a hollow node teaches the reader something false. If you didn't do the work, don't claim the status.
2. **Contested is EARNED, not assumed.** Node tiers are `settled` / `multi_traditional` / `contested`. Genuinely contested hinge facts number ~5–6 corpus-wide (Sarasvatī, soma, the horse, Vedic geography, Indus script, Ṛgveda dating). Marking a node `contested` because resolving it is hard will trip CI (`scripts/check-contested.mjs`) past 12. If the tradition itself disagrees, that's `multi_traditional` — **name the lineages**.

And in all cases: **every claim ships with its source.** Edition, page, ācārya, recording — something a reader can check.

## Ways to contribute

1. **Advance a node one step** (see above) — the highest-value contribution, always.
2. **Verify with the tradition** — if you have access to Ghanapāṭhis or ācāryas, error-correct texts and attributions; the model never adjudicates correctness, people do.
3. **Recording infrastructure** — the manifest/consent/storage pipeline in [`recordings/README.md`](recordings/README.md). Audio never enters git.
4. **Stories on-ramp** — itihāsa/purāṇa material (no svara, no recension hell) that brings families in before the mantra layer is ready.
5. **Engineering** — audio/text/svara alignment, entity linking, search, the evidence-bundle views. See [todos.md](todos.md).
6. **Feedback** — especially where a page asserts something without receipts, or where `contested` is being used as a shrug.
7. **Spread the word.**
