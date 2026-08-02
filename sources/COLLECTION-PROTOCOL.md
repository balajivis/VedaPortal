# Collection Protocol — how source material enters this repo

For the *organizing principle* (śākhā-first, the status enum, embedded texts, the gaps-are-data
rule) read [`README.md`](README.md) first. **This document is the acquisition protocol**: the
record every collector fills, the rules that bind them, and the current work packets.

It applies identically to a human collector and to an agent. There is one schema.

---

## 1. The record

One record per **node**, where a node = `śākhā → layer` (or `śākhā → apparatus → kind`).
Example: *Taittirīya Saṃhitā* is one node; *Taittirīya Brāhmaṇa* is another.

| Field | What goes in it |
|---|---|
| `node_path` | the canonical path under `sources/vedas/` — **this is the primary key** |
| `veda` | rigveda / yajurveda / samaveda / atharvaveda |
| `organization` | krishna / shukla — **Yajurveda only**, else `null` |
| `shakha` | taittiriya, shakala, kauthuma, … |
| `layer` | samhita / brahmana / aranyaka / upanishad / apparatus |
| `edition` | editor, publisher, year — as printed, not as guessed |
| `url` | where it lives. **A link that opens.** |
| `script` | devanagari-unicode / devanagari-legacy-font / transliteration / roman |
| `svara_source?` | **yes / no / partial** + how you checked |
| `svara_verified?` | `pending — BV`. **Never edit this field.** |
| `text_layer` | unicode / legacy-encoding / scanned-no-text / mixed |
| `license` | public-domain / CC-BY / CC-BY-SA / copyright-link-only / unknown |
| `status` | found-complete / found-partial / not-found |
| `where_i_looked` | the sources tried. **Mandatory when `not-found`.** |
| `notes` | gaps, mangled pages, attribution doubts, anything that would mislead later |
| `date_logged` | ISO date |

### The hand-off seam

`svara_source?` is the collector's — *does an accented source exist, and where?*
`svara_verified?` is BV's — *are those svaras correct?* — settled against the Ghanapāṭhi, on its
own clock. **The two never merge, and a collector never touches the second.** Collection and
verification must not block each other.

---

## 2. Binding rules

1. **Link, don't host** — for genuinely copyrighted work (modern translations, commentary,
   scholarship). Record the URL only. *A folder of pirated PDFs is worse than nothing.*
   **But do not mistake a typeset PD text for copyrighted work.** See rule 9.
2. **`not-found` is a real answer.** "I looked in these six places and it is not online" is worth
   more than a guess. A missing accented edition **is** the kind of hole this project exists to
   find (Register P5). Log it with `where_i_looked` and move on.
3. **Never invent content to fill a field.** Empty + honest beats filled + hollow.
4. **Absence is encoded by absence.** The Atharvaveda has no āraṇyaka. Do not create the node.
5. **Verify the file is what it claims.** Open it. Confirm it is the right text, in the right
   script, and — for an accented source — that the marks are visibly there.
6. **Record the edition, not the impression.** "Chaukhamba, ed. X, 1934" is data.
   "looks like a standard edition" is not.
7. **Attribution doubt goes in `notes`, never silently into `shakha`.** Several PDFs already in
   this repo carry *"attribution to Kauthuma unverified."* Keep that habit.
8. **Do not edit another packet's `_status.yaml`.** Write to
   `sources/_collection/<packet-id>.yaml` (staging). Merges into `_status.yaml` happen in one
   pass, by one hand, after review.
9. **The mūla text is public domain, whatever the PDF says.** Typesetting a PD text creates no
   new copyright — no US protection for typeface or typographical arrangement, *Feist* forecloses
   "sweat of the brow," *Bridgeman* forecloses slavish reproduction of a PD work, and India has
   no separate published-edition right. A restrictive notice on a reset of an ancient text does
   not attach to the text. **Record the notice verbatim in `notes`; classify the mūla text as
   `public-domain`.** What genuinely belongs to an editor is original apparatus — introduction,
   notes, commentary, translation, index — so note that separately where it exists. A true
   *critical* edition (manuscript collation, apparatus criticus, conjectural emendation) is the
   real edge case: flag it, don't adjudicate it. **This rule widens the candidate set** — do not
   discard an accented edition on a restrictive notice alone.
10. **Credit the editor and edition by name, always.** Attribution is owed independently of what
    licensing requires. Most of these editions are individual scholars' seva.
11. ⭐ **A resource absent from a rendered page is not an absent resource. PROBE.** This rule was
    written after it invalidated six records at once. vedicheritage.gov.in appeared to host audio
    for two śākhās; it actually serves **191 Jaiminīya MP4s**, invisible because `<video src="">`
    is populated at runtime by JavaScript. They surfaced only under direct HTTP probing.
    - Check for the API, JSON/XML endpoint, OAI-PMH interface, or predictable media/IIIF URL
      pattern **behind** a JS front end before declaring a collection dark.
    - Where items are serially numbered, **walk the index to its 404 boundary** to get true
      extent rather than trusting a stated count.
    - **Read item-level detail records, not collection summaries.** Recension, śākhā and date
      routinely sit one level below where a search result stops. A 1969 Folkways LP was dismissed
      here as "recension not stated" when the recension was in the item notes.
    - A dead `#` link or an empty container proves nothing without an HTTP probe of the path.
    - **An unprobed negative is a lower-confidence negative — mark it as such.** Do not delete a
      retracted finding; record the retraction in place. *The packet's value depends on its
      negatives being trustworthy.*
    - ⭐ **Assume a bulk path exists that the website does not advertise.** Measured across the
      five major digital holders, **four have one**: GRETIL indexes files it no longer serves
      (nine 404s in one subject area alone); SARIT serves through a broken web app while its
      **TEI-P5 sits on GitHub**; Muktabodha advertises open repos that 404 mid-migration; DCS
      renders only in JavaScript but publishes everything as CoNLL-U. **Check the GitHub
      organisation, the raw file tree, and the Zenodo/OAI record before believing a dead site.**
      This rule alone recovered a 4.6 MB sūtra-level TEI edition that had been logged `not-found`.
    - ⚠ **A zero-result query is a claim about the query, not the collection.** `query=paippalada`
      returns nothing in India's national manuscript database; **`query=Paippal` returns three.**
      Before recording any absence, retry with: a **truncated stem**, IAST *and* bare-ASCII
      spellings, common romanisation variants (`ai`/`ay`, `v`/`b`, `sh`/`ṣ`/`s`, doubled
      consonants), Devanāgarī, and regional-script forms. This near-published a false finding
      about the exact text the project cares most about.

---

## 3. How to test a PDF before logging it

A file is not a source until you know what is inside it. Two minutes with `pdftotext` — and
**always sample the FRONT and a page deep in the BODY**, because one reading alone lies in both
directions (see the warning below).

```bash
for R in "-l 40" "-f 100 -l 140"; do echo -n "$R  "; pdftotext $R "file.pdf" - | python3 -c "
import sys,re; t=sys.stdin.read()
dev=len(re.findall(r'[ऀ-ॿ]',t))
acc=len(re.findall(r'[॒॑᳐-᳹]',t))
dig=len(re.findall(r'[0-9०-९]',t))
print(f'chars={len(t)} devanagari={dev} svara={acc} digits={dig}')"; done
```

> ### ⚠ Measure the FRONT and the MIDDLE. A single 40-page test fails in BOTH directions.
>
> Two real traps, and they are mirror images:
>
> - **False PASS.** Three Google scans returned `chars=2991` at 40 pages, which reads as a healthy
>   text layer. **All 2991 characters were the Google boilerplate page.** Pages 100–140 returned
>   41 chars. The books are images.
> - **False FAIL.** Keith's *Aitareya Āraṇyaka* measures as dead at 40 pages — Latin front matter run
>   through a Devanāgarī OCR model — and is **clean at page 100.**
>
> A book's first forty pages are title, series, preface and contents — the least representative
> pages in it. **Judge on the body.**

> ### ⚠ And measure the SIDECAR, not only the PDF.
>
> All three *Vedic Variants* PDFs report **40 chars over 40 pages** — dead by any reading. Their
> Archive.org sidecar `_djvu.txt` is real and complete. Measuring the PDF alone would have logged
> the whole set as `scanned-no-text`.
>
> **Always check `<id>_djvu.txt`, `_hocr.html` and `_abbyy.gz` before recording a text-layer
> verdict.** hOCR is worth preferring anyway: it carries page, line and word bounding boxes that
> `_djvu.txt` discards — which is what makes marginal labels recoverable at all.

| Reading | Means | `text_layer` |
|---|---|---|
| devanagari high, svara high | accented Unicode — **the target** | `unicode` |
| devanagari high, svara 0, digits high | **numeric notation** — not unaccented. Kauthuma Sāma, and Rāṇāyanīya in some editions | `unicode` |
| devanagari high, svara 0, digits 0 | ⚠ **check the śākhā before judging** — see below | `unicode` |
| devanagari 0, chars high | **legacy 8-bit Devanāgarī font** — recoverable by codepage remap, *not* OCR | `legacy-encoding` |
| chars ≈ 0 over many pages | pure scan | `scanned-no-text` |

### ⚠ Notation is per-śākhā. Three Sāmaveda branches, three incompatible answers.

| Śākhā | How melody is written |
|---|---|
| **Kauthuma** | svara-aṅka **digits** above the syllables |
| **Rāṇāyanīya** | digits, **or** varga-paribhāṣā letters, by edition |
| **Jaiminīya** | ⭐ **nothing at all** — no accent marks, no digits |

The Jaiminīya gāna is printed with **no notation whatsoever** — confirmed for both the Kerala
Devanāgarī and the Paravastu Telugu editions. The melody lives in written-out vowel
prolongations, in stobhas, and in oral transmission. It was never notated; this is not a
defective edition.

> **So a Jaiminīya source reading `svara=0, digits=0` is CORRECT, not broken.** Judging it by
> the Kauthuma expectation would reject a good text. **For Jaiminīya, the recording IS the
> text** — audio is not supplementary to that śākhā, it is the primary carrier, and a text-only
> record of it is incomplete by definition.

Record what the source actually does in `notes`. Never infer a notation system from the Veda.

**The legacy-encoding case matters.** It looks like failure and is not: the accents are present,
the encoding is simply pre-Unicode. Remapping is hours of work. Do not send it to OCR.

---

## 4. Seed sources

Starting points, not limits. The hard cells are exactly where a collector's skill is worth spending.

| For | Go here first |
|---|---|
| **Machine-readable Sanskrit** | GRETIL (CC-BY via Zenodo) · DCS (morphologically tagged, sandhi-split) · VedaWeb 2.0 (TEI-P5, APIs) · TITUS / SARIT |
| **Accented Devanāgarī** | sanskritdocuments.org/sanskrit/veda · **sanskritweb.net (Subramania Sarma)** · Svādhyāya Maṇḍalaṁ editions |
| **Anukramaṇī · Prātiśākhya · Kalpa** | Archive.org (Bibliotheca Indica), GRETIL, Muktabodha |
| **Recitation audio** | vedicheritage.gov.in (IGNCA) — *check terms* |
| **Print editions (PD)** | Archive.org — Sāyaṇa, Eggeling, Keith, Griffith, Macdonell, Bloomfield, Wilson |

⛔ **Do not ingest**: Kashyap/SAKSI, Jamison–Brereton, Aurobindo (Ashram Trust asserts rights).
Reference by citation only.

---

## 5. Work packets

Coverage at time of writing: **6 of 50 nodes sourced.** Three of the six target śākhās
(Mādhyandina, Kāṇva, Śaunaka) hold nothing; the apparatus tier holds nothing.

| ID | Packet | Unblocks |
|---|---|---|
| **P0-a** | Machine-readable sweep — GRETIL · DCS · VedaWeb · TITUS. **Anukramaṇī first** (ṛṣi · devatā · chandas per hymn) | The Anukramaṇī validation harness — build-order #1, currently blocked |
| **P0-b** | Font-remap `Entire Rig Veda Samhita.pdf` from legacy encoding to Unicode | An accented RV Saṃhitā without OCR |
| **P1-a** | sanskritweb / Sarma / Svādhyāya Maṇḍalaṁ sweep across all 13 śākhās | Highest yield per hour; Taittirīya Saṃhitā kāṇḍas 2–7 the priority hole |
| **P1-b** | The three empty target śākhās — Mādhyandina, Kāṇva, Śaunaka, all layers | Two-thirds of target scope |
| **P2-a** | Endangered set — Jaiminīya, Kaṭha, Maitrāyaṇī, Rāṇāyanīya, Bāṣkala, Kapiṣṭhala. **`not-found` is the deliverable** | The śākhās on nobody else's build plan |
| **P2-b** | Apparatus tier — Prātiśākhyas, Kalpa/Śrauta-sūtras, remaining Anukramaṇīs | Structural annotation |

---

*Built to be torn apart. Amend the schema when a packet proves it wrong — but amend it here, once,
not per-packet.*
