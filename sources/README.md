# Source material

Public-domain and open-license source texts for the corpus. See [`../PROJECT-VISION.md`](../PROJECT-VISION.md) for the mission this serves.

## The one organizing principle

> **The corpus is organized by ŚĀKHĀ, not by LAYER.**

There is no such thing as "an Āraṇyaka." There is the **Taittirīya Āraṇyaka** — the Āraṇyaka *of* the Taittirīya śākhā of the Kṛṣṇa Yajurveda. Layer (saṃhitā / brāhmaṇa / āraṇyaka / upaniṣad) is a **child of śākhā, never a peer of it**. This is the dimension that śākhā-blind corpora (GRETIL, DCS, TITUS, VedaWeb) flatten, and it is exactly what this project must not flatten.

```
sources/vedas/
  _reference/            # cross-cutting PDFs (pronunciation, surveys) — apparatus about the corpus, not corpus
  rigveda/{shakala, bashkala}/
  yajurveda/
    krishna/{taittiriya, maitrayani, katha, kapishthala}/   # Krishna/Shukla is an organizational
    shukla/{madhyandina, kanva}/                            # tier ABOVE shakha — Yajurveda only
  samaveda/{kauthuma, ranayaniya, jaiminiya}/
  atharvaveda/{shaunaka, paippalada}/                       # NO aranyaka layer — deliberate
```

Each śākhā directory contains layer subdirectories (`samhita/`, `brahmana/`, `aranyaka/`, `upanishad/`, `apparatus/`) **only where the layer exists**, and a `_status.yaml` describing exactly what we know and hold.

## The gaps are data

A śākhā that is attested-but-lost still gets a directory and a `_status.yaml`. **An empty directory with an honest status is a finding, not a to-do.**

## The status enum (used everywhere)

| Value | Means |
|---|---|
| `enumerated` | We know it exists. **That is the entire claim.** |
| `sourced` | Editions / manuscripts / tools identified |
| `structured` | Broken down to praśna / anuvāka / mantra |
| `voiced` | Written up with depth and a usable treatment |

Right now nearly everything is `enumerated` — **that is correct for year one.** The honesty is in saying so.

## Embedded texts live once

Many Upaniṣads are the closing sections of Āraṇyakas (Bṛhadāraṇyaka = end of Śatapatha; Taittirīya Up. = TA 7–9; Mahānārāyaṇa = TA 10; Aitareya, Kena embedded). An embedded text lives **in its home layer** and is cross-referenced from elsewhere — never duplicated, never double-counted.

## Provenance and licensing caveats

- Prefer copyright-expired or explicitly open sources. Record the edition in the śākhā's `_status.yaml` `sources:` list.
- The repo-level `sources/LICENSE` (CC-BY-SA 4.0) covers **our original compilation and metadata**, not third-party PDFs — each PDF carries its own status.

### The mūla text is public domain, whatever the PDF says

The Vedic corpus is ancient and out of copyright everywhere. **Typesetting a public-domain text
does not create a new copyright in it.** In the US there is no protection for typeface or
typographical arrangement, *Feist* forecloses "sweat of the brow," and *Bridgeman* forecloses
slavish reproduction of a public-domain work. India has no separate published-edition right
either. A restrictive notice on a reset of a PD text does not attach to the text.

**What does belong to an editor**, and must be treated as theirs: an original introduction,
preface, editorial notes, commentary, translation, or index bound in the same volume.

So: record the notice verbatim, classify the **mūla text** as `public-domain`, and note the
apparatus separately. Two distinct objects in one file.

- **Worked case — settled**: `Taittiriya-Brahmanam.pdf` carries *"for personal use only — not for
  commercial printing/distribution."* The volume contains **no translation and no commentary** —
  it is the received text, typeset. There is therefore nothing in the file that copyright attaches
  to. **Treated as public domain and used accordingly.** The notice is recorded for provenance,
  not honoured as a restriction.
- **The genuine edge case**: a true *critical* edition — manuscript collation, apparatus criticus,
  conjectural emendation — involves original editorial judgement, and some jurisdictions protect
  scholarly editions specifically. Flag those in `notes` rather than assuming either way.
- **Attribution is separate from licensing, and is not optional.** These editions are usually the
  work of individual scholars doing it as seva. Credit the editor and the edition by name in
  `_status.yaml`, always — that costs nothing and is owed regardless of what the law requires.
- `unorganised-collection/` holds material not yet attributable to a śākhā or edition. Attribution work moves files out of it; nothing ships from it.
