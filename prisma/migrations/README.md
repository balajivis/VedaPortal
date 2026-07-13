# Migrations

`20260713000000_add_corpus_schema` is **purely additive** — it creates the corpus hierarchy (Veda → Shakha → Layer → Kanda → Prashna → Anuvaka → Panchati? → Mantra, plus Viniyoga and MantraLink) and touches nothing in the pre-existing `User` / `Document` tables. No existing content is lost.

The database predates migration tracking (it was created with `prisma db push`). Before the first `prisma migrate deploy` on an existing database, baseline it:

```bash
npx prisma migrate resolve --applied 20260713000000_add_corpus_schema   # only if you applied it via db push
# or, to apply fresh:
npx prisma migrate deploy
```

Every corpus row carries `status` (ENUMERATED → SOURCED → STRUCTURED → VOICED), `tier` (SETTLED / MULTI_TRADITIONAL / CONTESTED), `korvai` (the tradition's own pada-count checksum), and `path` — the canonical filesystem path under `sources/vedas/`, which is **the join key between repo and DB**. Keep them in exact agreement.
