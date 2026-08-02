# Plan — recitation and spoken commentary, one sūkta at a time

**Status: planned, not started. Nothing here is committed to and no audio exists in the
repository.** Written 2026-08-02 so the work has a shape before it begins.

The reading layer is now built out for maṇḍala 1 — 191 sūktas with text, padapāṭha,
morphology, Sāyaṇa, two translations and an editorial note each. What it has no sound.

Two distinct pieces of audio belong on a sūkta page, and they must not be confused with each
other:

| | what it is | who makes it | licence |
|---|---|---|---|
| **recitation** | the sūkta chanted | a reciter in a paramparā | a grant from that reciter — see [`LICENSE`](LICENSE) |
| **commentary** | Balaji's spoken reading of the sūkta | Balaji | ours to give |

---

## 1. Recitation, cut to the sūkta

**The unit is the sūkta.** Existing recordings are almost never cut that way — they run by
anuvāka, by adhyāya, by whole-sitting, or by liturgical set (Namakam, Puruṣa Sūktam). A
reader on `/text/rv/1.1` needs 1.1 and nothing else, so the cutting is the work.

### The sequence

1. **Inventory what is available and under what terms.** `_external-audio.yaml` already holds
   what has been found, LINK ONLY, never mirrored. That file records the vedamu.org set and
   states plainly that its crawl was partial. Extend it before cutting anything.
2. **Get the grant first, not last.** `recordings/LICENSE` says the licence is *pending* and
   that no recording may be published until an explicit grant exists, saying the same thing
   as the consent form the reciter signs. **Cutting audio we may not publish is wasted work
   and worse — it creates a library that invites publishing it.** So: grant, then cut.
3. **Cut to sūkta boundaries** against the text we hold. The Anukramaṇī gives the verse count
   for every sūkta, so a cut can be checked: a file claiming RV 1.1 should contain nine ṛcs.
   A recitation that runs continuously across a sūkta boundary needs a judgment call recorded
   in the manifest, not a silent split.
4. **Register each cut in `_recordings.yaml`** beside the text, per the format in
   [`README.md`](README.md). Every entry carries `consent_ref`, `lineage`, `patha`
   (saṃhitā / pada / krama / jaṭā / ghana), `sha256` and `license`. **A recording without
   provenance is worth a fraction of one with it.**
5. **Audio to object storage. Never to git.** The manifest is what git tracks. This is not
   negotiable and no exception is small enough to be worth it — a saṃhitā runs to tens of
   gigabytes and git cannot un-grow.

### What has to be recorded per cut, beyond the existing manifest fields

- `sukta`: the canonical address, e.g. `1.1` — the join key to everything else
- `verses_expected` / `verses_heard`: so a bad cut is detectable rather than assumed good
- `cut_from`: which source file and at what offsets, so the cut can be redone
- `boundary_note`: where the source ran across a boundary and a judgment was made

---

## 2. Balaji's spoken commentary

A short spoken reading of each sūkta, in Balaji's own voice. Not a reading-aloud of the
written note — a different register, and one the page cannot supply.

### The voice

**Respect for the traditions that carry this work, in the plural.** The Ṛgveda is read by
several living lineages and by scholars who disagree with all of them. The spoken commentary
should sound like someone who knows that and has no interest in flattening it.

Concretely, and consistent with the written standard in
[`COMMENTARY-STANDARD.md`](../sources/vedas/rigveda/shakala/samhita/commentary/COMMENTARY-STANDARD.md):

- **Name a reading to whoever holds it.** "Sāyaṇa takes it this way; the Nirukta another" is
  the register. "The correct meaning is…" is not.
- **Where the tradition holds more than one reading, say both and stop.** Sāyaṇa gives *hotṛ*
  two derivations without choosing between them; the commentary should not choose either.
- **Speak as dharma, not as religion or mythology.** Say *yajña*, *ṛta*, *saṃskāra*. Do not
  translate the tradition into a comparative category to make it legible.
- **No presupposed chronology.** Not "this later becomes"; the Vedas are not held in
  sequence. Where something also stands elsewhere in the corpus, say where it stands.
- **Do not explain the tradition to the reader who lives inside it**, and do not perform
  devotion either. Describe, with regard.

### Format

- Roughly 2–4 minutes per sūkta — long enough to carry the note's substance, short enough to
  be listened to before reciting.
- Recorded per sūkta so it stays aligned with the text, not in long sessions to be cut later.
- Same manifest discipline as the recitation: object storage, `sha256`, an entry in the
  manifest. It is ours to license, but it still never enters git.

---

## 3. What the page does with them

Two players on a sūkta page, clearly distinguished, neither auto-playing:

- **recitation** — attributed to the reciter and the paramparā, with the *pāṭha* named. A
  reader should always know whether they are hearing saṃhitā-pāṭha or a permuted recitation.
- **spoken commentary** — attributed to Balaji, and marked as commentary rather than as
  recitation. A listener must never be unclear which one is scripture.

Where a sūkta has no recitation yet, the page says so rather than hiding the absence — the
same rule the text layer already follows: **empty and honest beats confident and hollow.**

---

## Open questions, to settle before starting

1. **Which recitation, and from whom?** The grant is the gating item and it is a relationship,
   not a download.
2. **Which pāṭha?** Saṃhitā-pāṭha is what most listeners expect; the permuted pāṭhas are the
   greater feat and the greater rarity. Possibly both, marked.
3. **Śākala throughout?** The text layer is Śākala. A recitation from another śākhā against
   Śākala text would be a mismatch, and it needs saying if it happens.
4. **Order of work** — all 191 sūktas of maṇḍala 1, or the ones a reader reaches for first
   (1.1, 1.32, 1.113, 1.164)? The second gets something usable sooner.
5. **Does the spoken commentary wait for the written note to be edited?** RV 1.1 is edited and
   reviewed; the rest are machine-drafted. Recording commentary against an unreviewed note
   would put a voice behind text nobody has checked.
