# Recordings — architecture and manifest format

Recordings of complete Saṃhitā recitations will run to **tens of gigabytes**. Git cannot un-grow.

## The rule

> **Audio lives in object storage. Git tracks the manifest, never the blob.**

- No audio binaries in git. **No git-lfs either** — the manifest pattern below is the architecture.
- Audio goes to object storage (S3 / Backblaze B2 / equivalent) under access control.
- Git holds **what diffs**: the map, the text, the metadata, the code.
- `.gitignore` blocks common audio extensions as a backstop.

## The manifest

Each recorded corpus node gets a `_recordings.yaml` next to its texts, e.g. `sources/vedas/yajurveda/krishna/taittiriya/samhita/_recordings.yaml`:

```yaml
- id: tai-sam-1-1-anuvaka-1
  path: yajurveda/krishna/taittiriya/samhita/kanda-1/prashna-1/anuvaka-1
  patha: pada                   # samhita | pada | krama | jata | ghana
  reciter: "<name>"
  lineage: "<parampara>"
  recorded: 2026-12-XX
  location: "Chennai gathering"
  uri: "s3://vedaportal-audio/..."
  sha256: "..."
  duration_sec: 0
  consent_ref: "consent/2026-12/<id>.pdf"
  license: "<pending — see recordings/LICENSE>"
```

A template lives at [`_recordings.template.yaml`](_recordings.template.yaml).

## Non-negotiables

1. **Every recording carries `consent_ref` and `lineage`.** A recording without provenance is worth a fraction of one with it.
2. **`path` matches the corpus path exactly** — same join key as the Prisma schema and the `sources/` tree.
3. **`sha256` is computed at ingest** and verified on every download. The manifest is the integrity record.
4. **`license` stays "pending" until the reciter grant is written** (see [`LICENSE`](LICENSE) in this directory). The consent form and the license must say the same thing.
