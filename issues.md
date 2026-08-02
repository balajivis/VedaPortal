# Open issues

Things known to be wrong or unfinished, with enough detail to act on later. Newest first.

---

## 1. Register: the primary text still reads from outside the tradition

**Status: rule written, worked examples done (RV 1.1, 1.114), holistic pass NOT done.**

The `synthesis` / `practice` / `title` fields are what a reciter reads first. They must read
from inside the tradition — as scripture of a living faith, and as one of the oldest,
largest and best-preserved poems of the ancient world. Not fawning, not inventing cosmic
significance the text does not claim, and **not the Victorian outside lens**.

Audited across all 201 records, primary fields only:

| pattern | count | note |
|---|---:|---|
| `transactional` / `bargain` | 12 | **most are the notes arguing AGAINST that reading** — 1.33's practice pushes back explicitly. A mechanical fix would delete the defence with the offence. |
| outsider framing (`merely`, `the redactors`, `nothing more than`) | 20 | |
| condescension (`strange`, `odd`, `curious`, `unlike anything`) | 13 | |
| `superstition` | 1 | 1.53 |
| `religion` / `mythology` / `pantheon` | 14 | **fixed** — rule now in the standard: say *dharma* |
| developmental chronology (`later becomes`, `develops into`) | 26 raw | 6 real, now fixed; the rest are innocent English ("a throw not yet made") |

**These cannot be fixed by substitution.** They need rewriting sentence by sentence, which
means either agents working from `COMMENTARY-STANDARD.md` § REGISTER, or a human pass.

### Reverence — the standard to hold
More reverence to the gods than the notes currently carry: not devotional excess, but the
regard due to a tradition that kept these gods alive for thousands of years, and to poets who
were inspired enough to make that possible. Concretely:

- Let epithets carry their weight rather than being reduced to job descriptions. *Purohita*
  is an office and an honour, not a role in a workflow.
- Avoid the faint rationalist edge — "the god who is **actually** present", "the rite is not
  a symbol, it is the **mechanism**". Say what the hymn says.
- Do not explain the tradition to the reader who lives in it.

### Worked examples to copy
- **RV 1.1** — title `Agni, Lord of the Yajña — Be to Us as a Father to His Son`.
- **RV 1.114** — rewritten on distribution rather than development; see issue 2.

### Next
Do the deity-hymn openers by hand first — 1.1, 1.32, 1.113, 1.114, 2.33 — then let agents
apply the pattern outward across the rest.

---

## 2. No presupposed chronology — rule written, spot-fixed only

Do not write that a deity, word or practice *becomes*, *develops into*, or is a *precursor
of* anything, and do not call one part of the corpus earlier or later than another. The
tradition does not hold the Vedas in chronological sequence.

The failure is usually factual too. "For a deity who becomes Śiva, the Ṛgvedic base is very
small" was written of Rudra — but Rudra is sparse in the **Ṛgveda Saṃhitā** and abundant in
the **Yajurveda**, where the Śatarudriya is among the largest single addresses to any deity
in the Veda. The honest statement is about **distribution across the corpus**.

Fixed so far: 1.114 (rewritten), plus `later becomes` at 1.22, 1.53, 1.55, 1.60, 1.83, 1.128.
Not yet audited: maṇḍala 2, and the `disagreements` fields (where chronology is *allowed*,
but should be attributed rather than stated flat).

---

## 3. Maṇḍala 2 is 10 of 43

2.1–2.6 and 2.23–2.26 are written and merged. Both agents that were writing it died — one
stalled with no progress for 600s, one on a closed connection — each **after** gathering
sources and while writing.

Still to write: **2.7–2.22 and 2.27–2.43** (33 sūktas), including 2.12 (`sa janāsa indraḥ`)
and 2.33, the longest of only three sūktas addressed wholly to Rudra.

Mitigation for the relaunch: smaller ranges, and instruct agents to write each file the
moment it is finished rather than batching to the end.

---

## 4. Apparatus defects found and recorded, not repaired

All are in the **witnesses**, not our parsing, except where noted. Each is recorded in the
affected note so no reader compares translations by verse number.

| where | defect |
|---|---|
| wisdomlib 1.12.7 | page carries v7's opening clause spliced onto **v8's body**; drops *satyadharman*, *amīvacātana* |
| Griffith 1.24 | 14 rows for 15 verses; vv3–4 merged, numbering trails by one thereafter |
| Griffith 1.73 | 9 rows for 10, shifted by one from the start — **possibly our parser** |
| Griffith 1.91 | 22 rows for 23; v17 merges two; v23 absent |
| Griffith 1.164 | misaligned from v34 (v33/v34 merged) |
| Griffith 1.178 | vv4–5 merged, v5 empty |
| Griffith 1.190 | offset throughout, no v8 |
| Griffith 1.179 | printed in Latin; divisions do not align with the padapāṭha |
| padapāṭha 1.15.3 | reads `grāvaḥ` where the saṃhitā has गनावो and the lemma is *gnāvat* |

**1.65–1.70 are not a defect.** Both translators merge pairs of ṛcs there because the metre
is *virāṭ* — 5 English units for the tradition's 10. 1.149 is also virāṭ and is **not**
halved, so the metre alone does not force it.

---

## 5. Topic index: same word split across two lemmas

`uṣā` and `uṣas` are separate topic pages; the morphology lemmatises the same goddess two
ways, so her occurrences are divided. Likely true of other pairs. A merge pass needs
judgment about which pairs are genuinely the same word rather than a blanket rule.

Related: `viśvedevā` is devatā of 86 sūktas but shows **zero** verse occurrences, because the
morphology splits the compound into `viśva` + `deva`. The page states this rather than
showing an empty chart. `bhāratī` has the same problem.

---

## 6. Curated reference pages have no home in the navigation

`/topic/priests` (the sixteen ṛtviks) exists and is reachable only if you know the URL. The
topic index is a lemma search and cannot surface a hand-written page; a single link bolted to
the front of it was removed as neither search nor a scheme.

Needed: an organising schema for curated reference pages — priests, and whatever follows
(metres, the ritual year, the śākhās). Probably a small set of named collections rather than
a flat list.

---

## 7. `data/chunks.json` is 54.78 MB and in git

Past GitHub's 50 MB recommendation; warns on every push. It is a generated search index and
should probably not be tracked at all.
