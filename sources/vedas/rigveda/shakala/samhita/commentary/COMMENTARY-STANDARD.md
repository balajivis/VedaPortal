# Sūkta commentary — the standard

RV 1.1, 1.2 and 1.3 are the worked examples. Read all three in
`commentary-mandala-1.json` before writing anything. This file exists because that
standard was arrived at through a dozen corrections, and each rule below is one of
them.

## The goal, which governs every rule here

This is **a living manual a Hindu refers to for guidance and inspiration** — not a
philology paper and not a linguistic curiosity. The reader is an educated Hindu who
may already recite some of this and wants to understand what they are saying and why
it bears on their life. Scholarship is here to make the notes *trustworthy*, never to
be the point.

A note that reads like a seminar has failed even if every sentence in it is true.

## Record shape

```json
"<sūkta>": {
  "title": "…",
  "synthesis": "…",
  "practice": "…",
  "disagreements": "…",
  "cross_refs": ["3.59"],
  "kind": "machine",
  "model": "claude-opus-5",
  "generated": "2026-08-01",
  "witnesses": ["wilson-1866", "griffith-1896", "sayana-via-wilson"],
  "saw_sanskrit": true,
  "weighted": "wilson",
  "title_kind": "machine-suggested"
}
```

Paragraphs are separated by `\n\n`. `*term*` renders as italic Sanskrit.
`[[3.59]]` renders as a link to that sūkta — use it whenever you name another hymn.

## The four fields

### `title`
What **this** sūkta does, stated so it lands. Under ~52 characters where possible.

- ❌ `The Fire That Carries` — could head any of the 236 Agni hymns. A title that
  fits two hundred sūktas is not doing its job.
- ❌ `The Cup Goes Round Until Ṛta Is Named` — invented a cup passed round a circle.
  **The text has no such image.** Strength must come from accuracy, never from
  imagery the hymn does not supply.
- ❌ `Agni Named Four Times for His Office, Then Asked to Come Close as a Father` —
  accurate but reads like a museum label.
- ❌ `Fire Given Every Title…` / `Four Guests Called, and a River…` — the first
  describes Agni instead of naming him; the second leaves the four guests unnamed
  when naming them is exactly what tells a reader whether this hymn concerns them.
- ✅ `Agni Given Every Title, Then Asked to Be a Father`
- ✅ `Come and Drink — Vāyu, Indra, and the Keepers of Ṛta`
- ✅ `Welcoming Four Guests — Aśvins, Indra, Viśvedevāḥ, Sarasvatī`

**Name the deities in the title.** A reader scanning 191 rows is looking for who a
hymn is to. Titles carrying the names are how the index becomes usable.

### `synthesis` — 450–650 words
The hymn in **its own voice**, narrative, verse by verse.

- **ZERO names.** No "Sāyaṇa notes", no "Wilson has", no "Griffith gives". Every
  attribution goes in `disagreements`. Name-dropping in the body is what makes a
  manual read like a seminar. *Check your draft: the words Sāyaṇa, Wilson and
  Griffith must not appear.*
- **Every verse carries.** The commonest failure is spending three paragraphs on
  verses 1 and 9 and disposing of 2–8 in a clause. If a hymn has 12 verses, a reader
  should finish knowing what each of the 12 did.
- **Keep the Sanskrit** where a Hindu reader already has the vocabulary — *purohita*,
  *hotā*, *ṛtvij*, *yajña*, *ṛta*, *dhī*, *namas*, *kratu*, *dakṣa*, *rayi*, *vāja*,
  *barhis*, *svasti*. These are not glosses for a stranger; they are the words the
  reciter is already saying. Give the sense once, in apposition, then use the term.
- **Never a translator's calque.** Write *Viśvedevāḥ*, never "All-Gods". *Aśvinau*,
  *mitrāvaruṇau*, *maruts*, *ādityas* — use what the tradition uses.
- **Name the deity, do not describe him.** Write **Agni**, not "the fire" / "the
  flame" / "the god of fire". Agni is a name a Hindu reader has; "the fire" turns a
  person into an object and reads as though the tradition needs explaining from
  outside. Same for **Sūrya** not "the sun god", **Vāyu** not "the wind", **Uṣas**
  not "the dawn goddess", **Soma**, **Indra**, **Varuṇa**. Use "the fire" only where
  the hymn genuinely means the physical fire on the hearth rather than the god — and
  even then prefer *the āhavanīya*, *the hearth fire*, or simply Agni.
- **Look for the spine.** The best notes find the thing running underneath: *dhī*
  threading RV 1.3 from v2 to v12; `indra ā yāhi` opening three consecutive verses;
  *ṛta* three times in one line of 1.2.8. Read the padapāṭha to find these — they are
  invisible in the English.

### `practice` — "where it lives", 200–450 words
Why this hymn bears on a life now. This is what the reader came for.

Legitimate material: the deity's place in living observance (saṃskāras, sandhyā,
pūjā, festivals); what the hymn says about its **own** use; vocabulary the reader
meets elsewhere (*ṛtu* in the saṅkalpa, *dhī* behind *dhyāna*); and **counted facts
from the corpus itself** — these are the strongest thing available:

> 36 sūktas are ascribed to *mitrāvaruṇau*; exactly one, [[3.59]], to Mitra alone.
> Agni opens eight of the ten maṇḍalas. Sarasvatī has 16 sūktas against 69 for the
> Aśvins.

Count such things yourself from `apparatus/anukramani/Mandala_*.txt`. Do not assert
frequency without counting.

**Do not invent ritual claims.** Agni as witness of the saṃskāras is fact; a specific
liturgical sequence you are unsure of is not. No devotional register, no debunking
register — describe.

### `disagreements` — "how it has been read", 120–250 words
All attribution lives here: Sāyaṇa's positions **and** the translators'. Quote
briefly so the reader sees the difference rather than taking your word for it. Sāyaṇa
belongs here too — gathered, not sprinkled through the body.

## Sources, and the order to read them

| | |
|---|---|
| `samhita/text/mandala-1.json` | accented Devanāgarī |
| `apparatus/padapatha/padapatha-mandala-1.json` | word division, sandhi resolved — **read this** |
| `apparatus/grammar/grammar-mandala-1.json` | per-word lemma + morphology |
| `samhita/translations/wilson-mandala-1.json` | Wilson 1866 — follows Sāyaṇa, weight toward it |
| `samhita/translations/griffith-mandala-1.json` | Griffith 1896 — independent, Victorian |
| `samhita/commentary/sayana/sayana-mandala-1.json` | Sāyaṇa's bhāṣya, verse-addressed |
| `apparatus/anukramani/Mandala_1.txt` | `sūkta.verses.ṛṣi.devatā.chandas` |

**Verify before you claim.** Repetitions, word-threads and shared epithets must be
checked in the padapāṭha, not inferred from the English. Two real traps already hit:
a regex missed `ṛtāvṛdhau` because of the macron, and `dadhiṣva` was nearly counted
as a *dhī* form when it is from √dhā. When a claim rests on a form, look at it.

## Honesty rules — these are not negotiable

1. **AI generates, tradition verifies.** Nothing here is a verified reading. Never
   write as though it were.
2. **Never invent content to fill a node.** If the occasion of a hymn is unclear from
   the evidence, say it is unclear. "We do not know from this" is a correct answer.
3. Do not resolve a genuine ambiguity into a confident answer. Where Sāyaṇa offers
   two derivations, keep both.
4. If Wilson and Griffith diverge, that divergence is usually the most informative
   thing available — record it in `disagreements` with both readings named.
