# Open issues

Things known to be wrong or unfinished, with enough detail to act on later. Newest first.

---

## 0. The standing goal: retire the machine label, one record at a time

Every note carries `kind: machine | edited`. **Machine is the default and the honest one** —
a record is promoted only when a human has read it against the sources and is named, with a
date and a source list. It does not travel to neighbours.

Promoted so far:

| record | reviewed |
|---|---|
| RV 1.1 | 2026-08-02 — title, context paragraph, register, the ṛtvij/hotṛ/purohita levels; **re-read end to end the same day** (below) |
| `/topic/priests` | 2026-08-02 — framing, table, typography, the three-levels correction |
| `/standards` | 2026-08-02 — the public statement of the editorial standard |

**The RV 1.1 whole-document pass** found six things that reading fields separately had
missed, which is the argument for doing it this way on every promotion:

1. **A rendering defect, not a prose one.** `para()` turns every single `\n` into a `<br>`,
   and the prose of ṛcs 3, 5, 6, 8 and 9 was hard-wrapped in the JSON. Half the verses
   rendered with breaks mid-sentence and half did not. Verse blocks are now **exactly three
   lines** — Devanāgarī, IAST, prose — and that invariant is worth asserting in a check.
   Audited corpus-wide: RV 1.1 is the only record with verse blocks, so nothing else is hit.
2. **"The Veda opens at the fire and closes at the fire"** — the naming rule says Agni. In
   the flagship record, in the first paragraph.
3. **One sentence in three places.** "Eight ṛcs name what he does. The ninth asks only that
   he be close" stood in the synthesis, at ṛc 9, and in *where it lives*. Kept at ṛc 9.
4. **Two ṛcs carried no reading at all** — 3 and 7 were translation only, against the
   every-verse-carries rule. ṛc 3 now runs deepest in the sūkta.
5. **I broke the zero-names rule while fixing something else** — attributing Sāyaṇa at ṛc 4
   and the translators at ṛc 3 read as exactly the seminar the rule exists to prevent. Both
   moved to *how it has been read*.
6. **The masthead contradicted the prose.** The note says *Madhucchandas Ṛṣi*; the masthead
   printed the raw Anukramaṇī string `vaiśvāmitro madhucchandāḥ`, and a reader had no way to
   see they were the same person. `rsiDisplay()` now capitalises and resolves `-āḥ` → `-as`
   corpus-wide. It deliberately does **not** append "Ṛṣi": Indra, Urvaśī, Saramā and the
   Paṇis stand in that column as speakers of dialogue hymns, and suffixing every entry would
   state something false about thirty-odd sūktas to tidy the rest.

Still machine: 190 sūkta notes in maṇḍala 1, 10 in maṇḍala 2, the maṇḍala 1 overview, and the
seven topic analyses (yajña, adhvara, ṛta, rayi, poṣa, yaśas, aṅgiras).

The intent is not to relabel in bulk. Each promotion should be **a deeper pass**, not a
signature — the RV 1.1 pass produced four corrections that no amount of relabelling would
have found.

---

## 0a. THE THREE LENSES — every note needs re-lensing

**The governing architecture, set 2026-08-02.** A sūkta page is three panels written for
three different readers, and **a sentence in the wrong lens is a defect even when it is
true**. Full statement in `COMMENTARY-STANDARD.md` and at `/standards`.

| lens | field | reader | register |
|---|---|---|---|
| 1 | `synthesis` | the curious learner | gentle, contextual, conveys the grandeur. **No grammar apparatus.** |
| 2 | `practice` | the practitioner | strongly Hindu, sampradāyas named, wider dharmic corpus. **No Western scholarship.** |
| 3 | `disagreements` | the analytical reader | analytical, dry, slightly irreverent. The **only** home of Wilson, Griffith, Eggeling and the grammar. |

Done: **RV 1.1 only.** Both failure modes were live in it and both were mine — the ṛc 3
case-arc (accusative → nominative → instrumental → vocative) had been written straight into
lens 1, and Eggeling with an SBE volume number sat in the middle of lens 2, where it stops a
practitioner cold. Both moved to lens 3, which is where they are genuinely good.

**Still to do: every other record.** Two greps, run across all 201 records 2026-08-02:

```
lens 1 must not match:  accusative|nominative|instrumental|vocative|subjunctive|√|cognate|genitive|locative
lens 2 must not match:  Wilson|Griffith|Eggeling|Geldner|SBE|Müller|Macdonell
```

| check | hits |
|---|---|
| grammar apparatus in lens 1 | **17** — 1.5, 1.7, 1.14, 1.16, 1.17, 1.19, 1.20, 1.28, 1.29, 1.30, 1.48, 1.55, + 5 more |
| Western scholarship in lens 2 | **0** |

Smaller than expected, and the reason is that the machine drafts were written from the two
English translations and never had the morphology to leak in the first place. The 17 are
mostly hand-additions. **The greps are necessary and nowhere near sufficient**: they cannot
see a lens-1 paragraph that merely *reads* like a seminar without using a case name, and
they cannot see what is missing from lens 2 at all. Lens 2 needs the wider corpus actively
brought **in** — Gītā, Upaniṣads, dharmaśāstra, the sampradāyas — and no grep reports an
absence.

---

## 0b. "gods" → "devas" across the rest of the corpus

Done in RV 1.1 only, deliberately — scalpel, not sweep. The rule is in the standard.

Still to do: the other 200 sūkta notes, the maṇḍala 1 overview, the topic analyses and
`/topic/priests`. It is a string replace **plus judgment** in three places:

- **singular vs plural** — RV 1.1.5 is *devo devebhiḥ*, "the deva comes bringing the devas".
  A blind replace produced "the god comes, bringing the devas" and lost the pairing.
- **quotations** — Wilson's and Griffith's wording must stay theirs inside quotes.
- ***deva* as a common noun** — some verses use it of Agni himself ("the god who is ṛtvij"),
  where "deva" reads oddly in English apposition.

Related and not yet written: the **deva topic page** should carry the question of whether the
devas are many or one, with 1.164.46 quoted and the readings named rather than resolved.
That is where "divinity" properly belongs.

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

## 6. Levels of priestly vocabulary must not be flattened

**Fixed in RV 1.1 and /topic/priests; audit the rest.**

*Ṛtvij*, *hotṛ* and *purohita* were written as three parallel "offices", and as "three of the
sixteen priests". Both are wrong. They sit at different levels:

| term | what it is |
|---|---|
| **ṛtvij** | the GENERAL word for an officiant — covers all sixteen, is not one of them |
| **hotṛ** | a particular office among the sixteen, and the Ṛgveda's own |
| **purohita** | not among the sixteen at all — a position of PRECEDENCE, the one placed in front; the household or royal chaplain |

So RV 1.1.1 places Agni in the rite at three levels at once: an officiant at all, that
specific officiant, and the one at their head. Saying "three of the sixteen" collapses a
real distinction the verse is making.

Not yet audited: every other note that names these terms together, and the `hotṛ`,
`ṛtvij` and `purohita` topic pages, which have no written analysis yet and should carry
this distinction when they get one.

---

## 7. Curated reference pages have no home in the navigation

**Partly addressed.** `/standards` is now linked from the provenance footer of every sūkta
note — which is the right door for it, since that is where a reader is already asking who
wrote this. `/topic/priests` and `/topic/fires` are still reachable only from the RV 1.1 note
and from each other, not from anywhere a reader would look first.

The topic index is a lemma search and cannot surface a hand-written page; a single link
bolted to the front of it was removed as neither search nor a scheme.

Needed: an organising schema for curated reference pages — standards, priests, fires, and
whatever follows (metres, the ritual year, the śākhās). Probably a small set of named
collections rather than a flat list.

---

## 8. `data/chunks.json` is 54.78 MB and in git

Past GitHub's 50 MB recommendation; warns on every push. It is a generated search index and
should probably not be tracked at all.
