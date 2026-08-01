# Ṛgveda Saṃhitā — accented text

**Source.** sanskritdocuments.org `doc_veda/r01`–`r10`, encoded by sanskritdocuments
volunteers from ITRANS source. Accented Devanāgarī — the site describes the files as
"with anudātta and svarita vedic accents" and sampling confirms it.

**Licence.** The mūla text is public domain. Typesetting or encoding a public-domain text
creates no new copyright. The volunteers' encoding carries sanskritdocuments' personal-study
notice, recorded here as provenance rather than honoured as a restriction on the text.
**Attribution is owed regardless** — credit sanskritdocuments.org and its volunteer encoders.

This replaces `Entire Rig Veda Samhita.pdf` (ed. R. L. Kashyap, SAKSI), which is on the
do-not-ingest list and is RC4-encrypted.

**Verified on ingest (2026-08-01).**

| Check | Result |
|---|---|
| Verses parsed | **10552 / 10,552** |
| Per-hymn counts vs Anukramaṇī | **all 1,028 hymns agree** |
| Svara marks | 175,308 |
| Verses carrying no accent | 0 |

The per-hymn check is the load-bearing one. The Anukramaṇī is an *independent* witness to
the verse count, so agreement across all 1,028 hymns means the text is aligned to canonical
addresses — not merely that it parsed.

**Format.** `mandala-N.json` = `{ "<sukta>": ["<verse 1>", "<verse 2>", …] }`, in
address order, accents intact.

Regenerate: `node scripts/ingest-rv-samhita.mjs`
