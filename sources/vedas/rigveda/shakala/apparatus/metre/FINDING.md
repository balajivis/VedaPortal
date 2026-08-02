# Vedic metre cannot be counted from any transmitted text

**Measured 2026-08-01, corpus-wide, 9,594 ṛcs with a known metre shape.**

| Counted from | ṛcs that scan exactly |
|---|---|
| **saṃhitā-pāṭha** (as transmitted) | 2,865 — **29.9%** |
| **padapāṭha** (sandhi resolved) | 3,115 — **32.5%** |

Switching to the padapāṭha **fixes 1,705 verses and breaks 1,455** — a net gain of 250, or 2.6
points. It is not the fix it looks like.

## Why

Sandhi contracts vowels the metre requires separate. RV 9.62.1c is printed
*viśvāny abhi saubhagā* and counts **7**; the metre wants *viśvāni abhi saubhagā*, which is **8**.
Hence Gāyatrī scanning as 8+8+7 = 23 against a canonical 24.

The padapāṭha resolves sandhi **at word boundaries** but does not perform the *internal* vowel
restoration the metre needs (semivowel → vowel: `-ya-` → `-ia-`), and it *adds* syllables of its
own through resolved compounds and `iti` repetitions. So it trades one error class for another:
the saṃhitā's dominant delta is **−1** (3,193 ṛcs); the padapāṭha's spreads to **−1 (1,672) and
+1 (1,574)**.

> **Neither transmitted text is the metrical text.** A metrically restored edition is a distinct
> third recension of the same corpus — which is precisely why van Nooten & Holland made one.

## Consequences

1. **The build plan's Stage 2b — "metre classifier … deterministic; a weekend build" — is
   optimistic.** Counting akṣaras is deterministic. Counting *the syllables the metre wants* is
   not, because it requires restoration the transmitted text does not carry.
2. **Do not report a computed count as the metre.** The count is ours and measured; the shape is
   the tradition's and canonical. They are two claims from two sources and must render as two
   rows. `23 syllables · 8+8+8` asserts a contradiction as a fact.
3. **The 68.3% non-exact rate in `metre.json` is not 68.3% bad data.** It is the expected
   signature of counting a sandhi-applied text. Treat `delta = −1` as normal, not suspect.
4. **`padas()` correctly refuses to lineate a verse that does not scan.** Keep that. A forced
   pāda break asserts a structure the text does not have.

## What would fix it

**Acquire van Nooten & Holland, *Rig Veda: a metrically restored text*, HOS 50, 1994.** Note it is
1994 and therefore **in copyright** — the underlying text is ancient, but their restoration is
original editorial judgement and is theirs. Reference, do not ingest, unless a licence is
obtained. Until then the honest position is the one now displayed: show the measured count, show
the canonical shape, and show that they disagree.
