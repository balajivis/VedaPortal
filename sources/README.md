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
- **Known caveat**: `Taittiriya-Brahmanam.pdf` is marked *"for personal use only — not for commercial printing/distribution."* It is retained as a working reference; replace with a clean-licensed edition before any redistribution claim. The repo-level `sources/LICENSE` (CC-BY-SA 4.0) covers **our original compilation and metadata**, not third-party PDFs — each PDF carries its own status.
- `unorganised-collection/` holds material not yet attributable to a śākhā or edition. Attribution work moves files out of it; nothing ships from it.
