# VedaPortal — Vision & Mission

To participate in the project go [here](get-involved.md)
<table><tr>
<td>
ॐ सह नाववतु | <br>
सह नौ भुनक्तु | <br>
सह वीर्यं करवावहै । <br>
तेजस्वि नावधीतमस्तु मा विद्विषावहै । <br>
ॐ शान्तिः शान्तिः शान्तिः ॥ <br>
  </td>
<td>
Together may we two Move (in our Studies), <br>
Together may we two Relish (our Studies), <br>
Together may we perform (our Studies) with Vigour, <br>
May what has been Studied by us be filled with the Brilliance (of Understanding, leading to Knowledge);
May it Not give rise to Hostility (due to lack of Understanding), <br>
Peace, Peace, Peace.
  </td>
</tr>
</table>

## 1. The thesis, in one sentence

> **The Vedas are recited with total fidelity and almost no comprehension. Comprehension exists, partially, among people who cannot recite. The two have come apart — and reattaching them is the mission.**

Everything else in this project — the corpus, the recordings, the AI, the click-outs — is **instrumentation in service of that one sentence.**

This is not "the Vedas need a better translation." Translations exist. This is: *nothing currently uses the chanting to increase knowledge.* Millions chant. The chanting produces no understanding. That gap is the work.

## 2. Why this hasn't been done — and why it can be now

Every prior approach was **limited by an inability to see the whole corpus at once, with the tradition in the room.**

| | Method | The binding constraint |
|---|---|---|
| **Sāyaṇa** | Verse-by-verse, ritual-exegetical | Could not hold the whole corpus in view. Human memory. *A genius with the tools of his time.* |
| **Western philology** (Müller → Geldner → Jamison–Brereton) | Corpus-wide, but from outside | No viniyoga, no svara, no living tradition. *Reading a score having never heard it played.* |
| **The living tradition** | Total internal knowledge, exact | **Siloed by śākhā.** The Taittirīya master does not cross-reference the Kauthuma. |
| **Spiritual readings** (Aurobindo et al.) | Coherent worldview | Imported, not derived. Not accountable to the individual verse. |

**That constraint is now gone.** Corpus-wide computation + inside-the-tradition access + a network of ācāryas in the loop is a combination that has never existed.

## 3. The method (not the aspiration)

"A new, more holistic meaning" is the exact sentence spoken by every New-Age reinterpreter. It is an aspiration, not a method. The method is:

### 3.1 Nested context — meaning is constrained at every scale

> **mantra ← anuvāka ← praśna ← kāṇḍa ← śākhā ← Veda ← corpus**

A verse is read *inside* its section, inside its praśna, inside the surrounding concepts. Nobody has done this systematically because nobody could hold all the scales at once. **This is compositional, and it is computable.**

### 3.2 Distributional meaning — the full evidence bundle for a word

Not "what does *ṛta* mean in this verse." Rather: *ṛta* occurs N times, across these śākhās, in these metrical positions, in these viniyoga contexts, with these svara patterns, alongside these collocates, with these Indo-European cognates — **and the meaning is what survives all of that at once.**

- Sāyaṇa couldn't (no corpus-wide view).
- Geldner couldn't (no viniyoga, no svara).
- The ācārya can't (siloed by śākhā).
- **An AI alone can't** — it would confabulate. *(AI generates, never verifies.)*

**Nobody has done distributional semantics on the complete Vedic corpus with a living tradition adjudicating.** That is not "another translation." **That is a new instrument.**

### 3.3 The linked knowledge graph — context you can click

A passing reference to Indra slaying Vṛtra should be **clickable**: myth, geography, history, ritual, cognates. The verse becomes a node in a network. (This is entity resolution and linking — different engineering from §3.1–3.2.)

### 3.4 Why it is never done — and why that is a feature

**An instrument gets sharper as the corpus grows.** Every new śākhā recorded improves every prior reading. Every ācārya consulted tightens the adjudication. It is inherently never-done, by design.

## 4. The firewall that separates this from apologetics

> **The AI does not produce meanings. It produces the evidence bundle from which a meaning can be argued.**

Every proposed reading ships with its receipts: here are the 47 occurrences · here are the three recensions that disagree · here is the viniyoga · here is what the ācārya said · **here is where the evidence underdetermines the answer.** Anyone can rerun it and reach a different conclusion.

**That is what makes it an instrument rather than a revelation** — and it is the only version that survives both peer review and the tradition.

### 4.1 The open question that must be answered in writing

> **What would make us say a proposed reading is WRONG?**

- *"The tradition rejects it"* → coherent, but that makes this a **theological** project.
- *"The distributional evidence doesn't support it"* → that is **scholarship**, and it means being willing to publish readings the tradition dislikes.

Most projects of this kind never answer this, and that is exactly why they fail. `[OPEN]`

## 5. Controversy is shown, not hidden

**We do not put the Vedas in a white room.**

> **Neutrality is not the absence of a position. It is making the disagreement itself legible.**

Refusing to show controversy is not neutral — it is a hidden edit. Showing *"Sarasvatī: here are the three readings, here's who holds each, here's what would settle it"* is more honest than either camp's confident answer. And it is *better teaching*: a learner who discovers that *soma* has four readings, and that the evidence underdetermines the answer, has been taught **how the tradition and the evidence actually stand.**

### 5.1 Node tiers (visible to the reader)

| Tier | Meaning | Example | Frequency |
|---|---|---|---|
| **Settled** | The corpus settles it | Vṛtra is the demon Indra slays | The vast majority |
| **Multiple traditional readings** | The tradition itself disagrees; named lineages | Sāyaṇa vs. another ācārya | Normal and healthy — not a scandal |
| **Genuinely contested** | The hinge facts | Sarasvatī · soma · the horse · Vedic geography · Indus script · Ṛgveda dating | **RARE. ~5–6 nodes. It must STAY rare.** |

### 5.2 The discipline

> **We show what is disputed. We do not show what we haven't done the work on.**
> **"Contested" is a FINDING, not a fallback.**

The failure mode to watch: once a "controversies" panel exists, everything drifts into it — flagging is easier than resolving. Six months later 40% of the corpus is "disputed" and we have built a **shrug engine**. **Tripwire: if the contested-node count climbs past ~a dozen, that is not the world being complicated. That is the team getting lazy.**

## 6. The product — what a family actually touches

**The click-out layer, tiered:**

| Node type | What the click shows |
|---|---|
| **Internal** (Vṛtra, Agni, the three fires) | The corpus itself. Every occurrence. Confident. |
| **Bounded-contested** (soma, the Bharatas) | Layered readings; disagreement flagged |
| **Hinge** (Sarasvatī, the horse, Vedic geography) | Tiered, both camps shown, **no adjudication**. The tier tag is visible to the reader. |

**The translation view — layers, not an answer:**

1. Pada-by-pada gloss (the words, honestly)
2. **Viniyoga — where/when/why the mantra is used** ← *nobody has this at scale*
3. Traditional commentary (Sāyaṇa; the ācārya's reading)
4. Academic reading (the philological reconstruction)
5. **The nested/distributional reading** (§3 — the new instrument)
6. **Where they conflict** — flagged, not resolved

**Stories ≠ mantras.** *Itihāsa/purāṇa* is a different corpus: vastly easier — no svara, no recension hell, no translation minefield. It is the **on-ramp** that brings families in the door long before the mantra layer is ready. **Do not let it wait behind the hard thing.**

### 6.1 Where the portal is today — the honest read

The site has the **18 Mahāvidyā taxonomy**, and that is the right information architecture, because it is **inherited, not invented**. Keep it.

But **it is currently a map with no territory.** Every node is an overview plus a Key-Topics list. Fine as v0 — but eighteen stubs is breadth, and breadth is the trap.

> **Build order: a distinctive teaching VOICE, poured into the map's STRUCTURE, standing on the corpus's SUBSTRATE.**

The unit to scale is the deep, usable lesson (the proof-of-concept was a 50-page book on the Upanayanam that people actually used) — **not more nodes.**

## 7. The substrate — recordings and text

The corpus substrate is built from: recordings of complete Saṃhitā recitations by traditional scholars (multiple śākhās, gathered annually), aligned audio + text + svara from consenting Ghanapāṭhis, and public-domain texts (see [`sources/`](sources/README.md)). The scarce resource is not money — **it is the annual recording window and the ages of the senior scholars.** Recording fidelity now, perfection later.

## 8. Guardrails

1. **AI generates, tradition verifies.** "Correct" is defined by the Ghanapāṭhi, never the model.
2. **Contested is a finding, not a fallback.** (§5.2)
3. **Motivation is orthogonal to truth.** Out of scope: adjudicating the civilizational debate or producing legitimacy claims for any camp. *The value is the rigor; it evaporates the moment this becomes advocacy.*
4. **Separate the clocks.** Text age ≠ community-arrival age ≠ mechanism.
5. **Depth over breadth.** Breadth + cross-linkage is right for *discovery* and wrong for *shipping*. **Ship the lesson, not the index.**
6. **Every reading ships with its receipts.** No assertion without its evidence bundle.

## 9. Open questions

- **§4.1 — what makes a reading WRONG?** The single most important unanswered question. Decides whether this is scholarship or theology.
- **Who is the family-facing product FOR?** The founding community / the diaspora parent / an eventual learning community? These diverge fast.
- **Does the click-out ever leave Vedic ground?** *Vṛtra → Ṛgveda* is unimpeachable. *Vṛtra → Verethragna → the Avesta* is the comparative layer — thrilling, and the moment it appears in a family product, the product has taken a position on Indo-Iranian origins whether we meant to or not.

---

*Built to be torn apart.*
