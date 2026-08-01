# Fetched scans

Large public-domain page-image PDFs pulled from Archive.org and similar. **The files are
gitignored; only `_manifest.yaml` is committed** — the same rule `recordings/` uses, and for the
same reason: a public repo should not carry gigabytes of scans that are one `wget` away.

The manifest is the artefact. It records, per file: identifier, edition, volume/coverage, byte
size, page count, whether the OCR text layer is real, and a checksum. That is what makes the
fetch reproducible without shipping the payload.

⚠ **The DLI empty-text-layer trap**: many `in.ernet.dli.*` items ship a `_djvu.txt` of ~139 bytes.
The item is images only. Always measure the text layer; never infer it from the file's presence.
