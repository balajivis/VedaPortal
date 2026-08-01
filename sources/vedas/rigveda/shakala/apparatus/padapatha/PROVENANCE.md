# Ṛgveda Śākala — padapāṭha

**Source.** GRETIL, `sa_RgvedasaMhitApadapATha`, input by the Sansknet project, TEI-encoded
by GRETIL. Licence CC-BY-SA. Verse-keyed `RV_m,s.v`.

**Coverage.** 10552 verses — every one of the 10,552 ṛcs we hold.

**⚠ Two limits, measured on the source:**

| | |
|---|---|
| Script | **IAST roman**, not Devanāgarī (0 chars in U+0900–097F) |
| Accent | **none** — 0 marks over 2.3 MB |

The second matters. The padapāṭha is exactly where each word's *independent* accent is
visible before sandhi obscures it, and this witness has dropped it. So this serves word
division and lemma work, **not** the accent argument. An accented Devanāgarī padapāṭha
exists — the VSM Poona critical edition prints one (see `sources/_fetched/rv-sayana-poona`),
and detlef108.de has another — and joining one of those is separate later work.

Because of the script mismatch this does **not** replace the Devanāgarī mūla tokens, which
stay marked `machine-split` until an accented Devanāgarī padapāṭha is joined.

Regenerate: `node scripts/ingest-rv-padapatha.mjs`
