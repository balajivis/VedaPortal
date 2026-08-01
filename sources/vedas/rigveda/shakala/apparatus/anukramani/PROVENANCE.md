# Anukramaṇī — Ṛgveda Śākala

Per-hymn **ṛṣi · devatā · chandas** for all 1,028 hymns. The tradition's own labelled dataset,
and the held-out validation set for embedding/clustering work: if Sanskrit-space clusters recover
these devatā assignments, the embedding captured something real — **verified with zero English.**

## Source

`github.com/mahesh-ak/WSC2023` — Akavarapu & Bhattacharya, IIT Kanpur, World Sanskrit Conference 2023.
**Apache-2.0** (upstream licence retained as `LICENSE.upstream-Apache-2.0`).
Mirrored at commit `cdc249d5e880c9d3667a59d13d9a6fc6ed80d826`, 2026-08-01.

**Mirrored deliberately.** It is the only machine-readable Anukramaṇī located anywhere: GRETIL has
zero hits for "anukram"; VedaWeb carries Geldner's hymn *addressees* (a devatā proxy, no ṛṣi, no
metre); DCS has nothing at hymn level. A single upstream repo is a single point of failure.

## Format

Period-delimited, one header row per file, one row per hymn:

```
hymn.verses.seer.divinity.meter
1.9.vaiśvāmitro madhucchandāḥ.agniḥ.gāyatrī
```

Where devatā or chandas shifts mid-hymn, the field carries parenthesised verse ranges — so
**split on `.` with maxsplit=3**, never naively; ranges contain periods.

```
53.24.gāthino viśvāmitraḥ.(1)indrāparvatau,(2-14)indraḥ,(15-16)sasarparī vāk,…
```
*(RV 3.53 — the project's worked anchor. Note the composite deity structure the Anukramaṇī records.)*

## Verified on ingest (2026-08-01)

| Check | Result |
|---|---|
| Hymn count | **1028 / 1028** |
| Per-maṇḍala | 191·43·62·58·87·75·104·103·114·191 — **all canonical** |
| Verse-count column sum | **10,552** — matches the canonical ṛc count exactly |
| Malformed rows (maxsplit=3) | **0** |
| Distinct ṛṣi / devatā / chandas | 337 / ~212 / ~38 |

## Known defects — code around these, they are not blockers

- **RV 8.31** omits the ṛṣi field (4 fields, not 5).
- `jagatiī` misspelling, 7 rows.
- Transliteration is IAST-like; normalise before joining to other sources.

## Cross-check available

Sanskrit Wikisource holds a complete, clean **Bṛhaddevatā** under CC-BY-SA-4.0 — a second
traditional devatā assignment. With Geldner's addressees that gives **three independent
labellings**, which is a materially better validation set than one.

⚠ The **Sarvānukramaṇī itself** has no clean digital text anywhere — only dirty OCR of Macdonell
1886 with systematic र्वा→वै corruption. Do not use it as ground truth without repair.
