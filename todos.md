# Todos

Aligned to [PROJECT-VISION.md](PROJECT-VISION.md). Ordered — depth over breadth, ship the lesson not the index.

## Now (foundation)

1. **Answer the WRONG question in writing** (Vision §4.1): what would make us say a proposed reading is wrong? Decides scholarship vs. theology. Blocks all semantic work.
2. **Recording readiness**: schema, recording rig checklist, and consent language for the annual scholar-gathering window (Dec/Jan). This year's job is to *learn how to record it*, not to get it perfect.
3. **Node-tier data model**: add `tier: 'settled' | 'multiple-readings' | 'contested'` to knowledge nodes, visible to the reader. Enforce the tripwire — contested stays ~5–6 nodes, alarm past a dozen.

## Next (territory, not more map)

4. **One deep node end-to-end** — pick one vidya/entity and build it to full depth (every occurrence, layered readings, receipts) as the template. No new stub nodes until one node is deep.
5. **Stories on-ramp**: itihāsa/purāṇa track (no svara, no recension issues) so families have something usable before the mantra layer is ready.
6. **Evidence-bundle rendering**: a proposed reading displays its receipts — occurrences, recension disagreements, viniyoga, ācārya's comment, and where evidence underdetermines.

## Later (the instrument)

7. Aligned audio + text + svara pipeline from consented recordings.
8. Entity resolution + linking across the corpus (the clickable knowledge graph).
9. Distributional-semantics tooling: occurrence bundles per lexeme (śākhā, metrical position, viniyoga context, collocates, cognates).
10. The six-layer translation view (Vision §6): pada gloss · viniyoga · traditional commentary · academic reading · nested/distributional reading · conflicts flagged.

---

## Backlog — source texts for the 18 Mahāvidyās

The library's taxonomy is inherited and correct, but most nodes have no source text behind them.

> **⚠ The live coverage table is `sources/_library.yaml`, rendered at `/sources`.** It is the
> single source of truth and it moves — Mīmāṃsā and Dharmaśāstra went from empty to sourced on
> 2026-08-01. The table below is the snapshot that opened the work; **read the YAML for current
> state**, and amend it there, not here.

Snapshot as of 2026-08-01 (6 nodes with nothing at all; several partial):

| # | Vidyā | Source text | State |
|---|---|---|---|
| 1–4 | **Ṛg · Sāma · Yajus · Atharva** | 13 śākhās | ✅ **44 sourced nodes** |
| 5 | Śikṣā | Prātiśākhyas (RV·TS·AV·SV) sourced; **the Śikṣā texts themselves are not** | ◐ partial |
| 6 | **Vyākaraṇa** | Pāṇini *Aṣṭādhyāyī*, Patañjali *Mahābhāṣya*, *Kāśikā* | ✗ **none** |
| 7 | Chandas | metre labels via the mirrored Anukramaṇī (38 chandas); **Piṅgala's *Chandaḥśāstra* absent** | ◐ partial |
| 8 | Nirukta | GRETIL complete, all 14 adhyāyas verified; Sarup PD | ✅ have |
| 9 | **Jyotiṣa** | *Vedāṅga Jyotiṣa* (Lagadha) | ✗ **none** |
| 10 | Kalpa | Śrauta/Gṛhya/Śulba across all four Vedas; RV + AV machine-readable | ✅ have |
| 11 | **Āyurveda** | Caraka, Suśruta, Vāgbhaṭa | ✗ **none** |
| 12 | **Dhanurveda** | *Dhanurveda-saṃhitā*; Agni Purāṇa 249–252 | ✗ **none** |
| 13 | **Gāndharvaveda** | *Nāṭyaśāstra*, *Saṅgīta-ratnākara* | ✗ **none** |
| 14 | **Arthaśāstra** | Kauṭalya | ✗ none — **but on SARIT** |
| 15 | Purāṇa | Bhāgavata only, of eighteen | ◐ thin |
| 16 | **Nyāya** | Gautama's *Nyāyasūtra*, Vātsyāyana | ✗ none — **Nyāyamañjarī on SARIT** |
| 17 | Mīmāṃsā | Jaimini · Śabara · Kumārila · Prabhākara — identified, **not fetched** | ◐ identified |
| 18 | **Dharmaśāstra** | Manu, Yājñavalkya, the Dharmasūtras | ✗ none — **Manusmṛti on SARIT** |

### ⭐ The route for most of the bottom half is SARIT

Packet P0-a told us to **drop SARIT from the Vedic packets** — it holds zero saṃhitā, brāhmaṇa or
āraṇyaka, verified by enumerating all 121 paths and 88 XML files. But its actual holdings are
**exactly this layer**: Manusmṛti, Kauṭalya, Nyāyamañjarī, Vākyapadīya, Patañjalayogaśāstra,
Ratnakīrti/Jñānaśrīmitra, Tantravārttika, Skandapurāṇa. **TEI-P5, CC-BY-SA-3.0, on GitHub.**

⚠ Its web app is broken — reach the corpus at `github.com/sarit/SARIT-corpus`, not through the
site. That is how the sūtra-level Tantravārttika was recovered after being logged `not-found`.

### Guardrails that attach to specific nodes here

- **Āyurveda (#11) — DECIDED 2026-08-01: acquire and display the source texts, with a disclaimer.**
  Consistent with the standing position: *research yes, aggressively; product claims no.* The
  classical text is scholarship. What stays forbidden is the **claim**, not the **text**.

  ⚠ **But apply the Stage-4 rule, not a footer.** The project's own finding on translations is
  that *"structural mitigations work; disclaimers don't — screenshots travel while disclaimers
  don't."* A page-footer notice on a Caraka passage fails the same way. Port the four mitigations
  verbatim:
  1. **Never render a preparation standalone** — source text always adjacent, as Sanskrit is
     always adjacent to a translation.
  2. **The notice sits inline, per passage** — not in a preface, not in a footer.
  3. **Mark it in the text, not the chrome**, so it survives a screenshot.
  4. **Tier-badge it** like any other node, and tag rasa-śāstra / bhasma passages distinctly from
     the rest of the corpus.

  The hard floor that does not move: **no dosage, no procedure rendered as actionable steps, and
  no medical claim on any family-facing surface, ever.** Documented lead, mercury and arsenic
  poisoning from marketed bhasmas is well attested — display the text as a historical document,
  never as an instruction.
- **Vyākaraṇa (#6)** is rhetorically load-bearing beyond its content: the Kanchi *Veda
  Samrakṣaṇam* framing leads with the **Mahābhāṣya** — *"knowledge of the Vedas is complete only
  when the meaning is learnt."* That is the sentence the whole institutional approach rests on,
  and the text it comes from is not in the corpus.
- **Purāṇa (#15)** is the stories on-ramp (todo #5). One of eighteen is thin for a node whose
  job is to bring families in the door before the mantra layer is ready.
