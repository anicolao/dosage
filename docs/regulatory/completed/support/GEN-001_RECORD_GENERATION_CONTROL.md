# GEN-001 — Structured regulatory record generation control

> **IN REVIEW / NOT APPROVED.** This document is generated. Edit
> `docs/regulatory/records/data/support/GEN-001.yaml`, not this file. Missing required values are rendered as
> `⟦MISSING: ...⟧`; an incomplete generated document is not an approval.

| Control field | Value |
| --- | --- |
| Record ID | `GEN-001` |
| Kind | support |
| Revision | 0.1 |
| Status | **IN REVIEW / NOT APPROVED** |
| Source baseline | `6b53fde87ff9b193b3c24f7bd93549746b4d6471` |
| Source data | `docs/regulatory/records/data/support/GEN-001.yaml` |
| Template | `docs/regulatory/records/templates/record.md.mustache` |
| Source-data SHA-256 | `856cc5b75bf89de281c924ffd1822f0e13ba6c9725563e19e1ef1c5397d12ec3` |
| Template SHA-256 | `99f7fedc1d2cb5ba9edc70a721182801f48f96b538f91b43eaa6a6d9fba0328d` |

This record defines the deterministic source-to-document control used for classification-inquiry, gate, evidence and correspondence records. It is a tooling control, not a regulatory approval or electronic-signature system.

## Required record fields

| ID | Field | Value | Evidence | Required | State |
| --- | --- | --- | --- | --- | --- |
| `GEN-F01` | Structured source format | YAML validated by docs/regulatory/records/record.schema.json | package.json and package-lock.json | Yes | Complete |
| `GEN-F02` | Generated output root | docs/regulatory/completed/ | scripts/regulatory-records.mjs | Yes | Complete |
| `GEN-F03` | Routine audit commit scope | docs/regulatory/records/data/ and docs/regulatory/completed/ only | regulatory:commit implementation | Yes | Complete |

## 1. Control boundary

YAML is the editable record source. Mustache templates control stable presentation. Generated Markdown and MANIFEST.json are deterministic and committed beside their YAML. Git records changes, but required human signatures remain attributable controlled references within each record.

## 2. Incomplete-record behavior

Build permits incomplete review drafts and renders conspicuous missing markers. The ready command fails until selected records are approved and every required value, evidence acceptance and signature is populated.

## Decisions

| ID | Question | Decision | Rationale | Evidence | State |
| --- | --- | --- | --- | --- | --- |
| `GEN-D01` | Which dependency boundary provides the generator tooling? | Node packages are locked in package-lock.json; native/system tools remain governed by Nix where applicable. | YAML, schema validation and Mustache rendering are JavaScript build dependencies and belong in package.json. | package.json; package-lock.json; CALCULATION_ENGINE_PLAN.md | Complete |

## Evidence register

| ID | Evidence | Reference | Status | Required | State |
| --- | --- | --- | --- | --- | --- |
| `GEN-E01` | Generator source, JSON Schema, templates and command documentation | scripts/regulatory-records.mjs; docs/regulatory/records/ | reviewed | Yes | Open |

## Approvals

| Role | Approval scope | Name / organization | Decision | Date | Signature or controlled approval reference | State |
| --- | --- | --- | --- | --- | --- | --- |
| Quality lead | Approve the generator as a controlled record-production process | ⟦MISSING: GEN-001.approvals.1.name/organization⟧ | ⟦MISSING: GEN-001.approvals.1.decision⟧ | ⟦MISSING: GEN-001.approvals.1.date⟧ | ⟦MISSING: GEN-001.approvals.1.signature_ref⟧ | Open |

## Change and reassessment triggers

- Schema, template, generator, hashing or completeness-rule change
- Change to evidence retention, approval identity or signature mechanism

## Completion determination

**Generated determination:** NOT READY

This tooling record remains in review until the appointed quality lead has verified the process and approved its use.

Required items still open:

- `GEN-001.approvals.1.date`
- `GEN-001.approvals.1.decision`
- `GEN-001.approvals.1.name`
- `GEN-001.approvals.1.organization`
- `GEN-001.approvals.1.signature_ref`
- `GEN-001.evidence.GEN-E01.status`
- `GEN-001.status`

The generated determination is mechanical. It does not replace the required
human decision, signature, evidence review, or governing gate procedure.
