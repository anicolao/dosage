# Structured regulatory records

This directory is the editable source for mechanically generated review and
approval records in `docs/regulatory/completed/`. YAML changes and their
generated Markdown outputs are committed together, providing an attributable
Git history without pretending that a commit is a regulatory signature.

## Commands

```text
npm run regulatory:build
npm run regulatory:check
npm run regulatory:ready -- --record IQ-001
npm run regulatory:commit -- "Record manufacturer evidence"
```

- `regulatory:build` validates every YAML file, writes deterministic Markdown,
  and creates `MANIFEST.json` plus `COMPLETENESS.md`.
- `regulatory:check` fails when committed generated files differ from the YAML
  and templates. It does not write.
- `regulatory:ready` fails if all selected records are not marked `approved`
  with every required value, accepted evidence and required approval complete.
  Repeat `--record ID` to select records; omitting it checks every record.
- `regulatory:commit` builds and stages only `records/data/` and `completed/`,
  refuses unrelated staged files, and creates a Git commit with the supplied
  message. It permits incomplete review iterations; use `regulatory:ready`
  before claiming a gate or submission document is complete.

## Filling a record

Use `null` for a blank. Never use invented names, dates, signatures, evidence
or a placeholder string such as `TBD`; the generator renders null required
values as visible `⟦MISSING: ...⟧` markers. Set evidence to `accepted` only after
the named reviewer has verified the controlled reference. Set record status to
`approved` only after all required signatures exist.

Approval references may point to an access-controlled electronic-signature or
quality system. Sensitive personnel, identity, contract and legal evidence
should not be committed to the public repository; commit its immutable ID,
custodian and verification result instead.

## Determinism and audit trail

Generated output contains no wall-clock timestamp. The manifest records SHA-256
digests for every YAML source, template and generated Markdown file. The
generator refuses absolute or parent-traversing output paths, duplicate record
IDs and outputs, unknown schema fields, and invalid approval states.

The Git commit identifies who changed the YAML and generated record. It does
not replace the attributable signatures required inside the record.
