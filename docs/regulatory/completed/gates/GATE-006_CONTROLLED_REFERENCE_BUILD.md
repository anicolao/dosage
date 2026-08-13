# GATE-006 — Controlled reference build

> **INCOMPLETE / NOT APPROVED — GENERATED GATE RECORD.** Edit `docs/regulatory/records/data/gates/GATE-006.yaml`, then run
> `npm run regulatory:build`. This gate cannot close while any required value,
> accepted evidence, upstream dependency, or approval is missing.

| Gate control | Value |
| --- | --- |
| Gate | `GATE-006` |
| Revision | 0.1 |
| Mechanical readiness | **NOT READY** |
| Controlled status | **INCOMPLETE / NOT APPROVED** |
| Exact source baseline | `⟦MISSING: GATE-006.source_baseline⟧` |
| Structured source / SHA-256 | `docs/regulatory/records/data/gates/GATE-006.yaml` / `31aa0269bbeab9a79fa057cf3bd139ca7341a50dd0a273bb184b108d38c7e013` |
| Template / SHA-256 | `docs/regulatory/records/templates/gate.md.mustache` / `7b321ada55239b22972c0795527edcc0a4f635f907e28782762695dcf06194ac` |

Full G6 completion record governed by docs/regulatory/GATE-006_CONTROLLED_REFERENCE_BUILD.md.

## Dependencies

- `GATE-003`

## Gate fields and exit criteria

| ID | Criterion | Recorded value | Evidence | Required | State |
| --- | --- | --- | --- | --- | --- |
| `G6-F01` | Exact source/build/artifact/provenance identity | ⟦MISSING: GATE-006.required_fields.G6-F01.value⟧ | ⟦MISSING: GATE-006.required_fields.G6-F01.evidence_ref⟧ | Yes | Open |
| `G6-F02` | CSP/network/threat/security evidence | ⟦MISSING: GATE-006.required_fields.G6-F02.value⟧ | ⟦MISSING: GATE-006.required_fields.G6-F02.evidence_ref⟧ | Yes | Open |
| `G6-F03` | SBOM/licence/vulnerability/CI provenance evidence | ⟦MISSING: GATE-006.required_fields.G6-F03.value⟧ | ⟦MISSING: GATE-006.required_fields.G6-F03.evidence_ref⟧ | Yes | Open |
| `G6-F04` | Offline install/update/rollback/eviction/recovery evidence | ⟦MISSING: GATE-006.required_fields.G6-F04.value⟧ | ⟦MISSING: GATE-006.required_fields.G6-F04.evidence_ref⟧ | Yes | Open |

## 1. Controlled-build and security determination

⟦MISSING: GATE-006.sections.1.body⟧

## Controlled decisions

| ID | Decision required | Decision | Rationale | Evidence | State |
| --- | --- | --- | --- | --- | --- |
| `G6-D01` | Is one reproducible controlled build suitable for G7 verification? | ⟦MISSING: GATE-006.decisions.G6-D01.decision⟧ | ⟦MISSING: GATE-006.decisions.G6-D01.rationale⟧ | ⟦MISSING: GATE-006.decisions.G6-D01.evidence_ref⟧ | Open |

## Objective evidence

| ID | Evidence | Reference | Status | Required | State |
| --- | --- | --- | --- | --- | --- |
| `G6-E01` | Exact-build security/supply-chain/offline/determinism evidence | ⟦MISSING: GATE-006.evidence.G6-E01.reference⟧ | missing | Yes | Open |

## Gate signatures

| Role | Scope | Name / organization | Decision | Date | Signature reference | State |
| --- | --- | --- | --- | --- | --- | --- |
| Security/privacy lead | Approve security/privacy evidence | ⟦MISSING: GATE-006.approvals.1.name/organization⟧ | ⟦MISSING: GATE-006.approvals.1.decision⟧ | ⟦MISSING: GATE-006.approvals.1.date⟧ | ⟦MISSING: GATE-006.approvals.1.signature_ref⟧ | Open |
| Software lead | Approve build/provenance/offline lifecycle | ⟦MISSING: GATE-006.approvals.2.name/organization⟧ | ⟦MISSING: GATE-006.approvals.2.decision⟧ | ⟦MISSING: GATE-006.approvals.2.date⟧ | ⟦MISSING: GATE-006.approvals.2.signature_ref⟧ | Open |
| Quality lead | Verify evidence/anomalies and close G6 | ⟦MISSING: GATE-006.approvals.3.name/organization⟧ | ⟦MISSING: GATE-006.approvals.3.decision⟧ | ⟦MISSING: GATE-006.approvals.3.date⟧ | ⟦MISSING: GATE-006.approvals.3.signature_ref⟧ | Open |

## Gate determination

**NOT READY**

⟦MISSING: GATE-006.completion_statement⟧

Blocking structured items:

- `GATE-006.approvals.1.date`
- `GATE-006.approvals.1.decision`
- `GATE-006.approvals.1.name`
- `GATE-006.approvals.1.organization`
- `GATE-006.approvals.1.signature_ref`
- `GATE-006.approvals.2.date`
- `GATE-006.approvals.2.decision`
- `GATE-006.approvals.2.name`
- `GATE-006.approvals.2.organization`
- `GATE-006.approvals.2.signature_ref`
- `GATE-006.approvals.3.date`
- `GATE-006.approvals.3.decision`
- `GATE-006.approvals.3.name`
- `GATE-006.approvals.3.organization`
- `GATE-006.approvals.3.signature_ref`
- `GATE-006.completion_statement`
- `GATE-006.decisions.G6-D01.decision`
- `GATE-006.decisions.G6-D01.evidence_ref`
- `GATE-006.decisions.G6-D01.rationale`
- `GATE-006.evidence.G6-E01.reference`
- `GATE-006.evidence.G6-E01.status`
- `GATE-006.required_fields.G6-F01.evidence_ref`
- `GATE-006.required_fields.G6-F01.value`
- `GATE-006.required_fields.G6-F02.evidence_ref`
- `GATE-006.required_fields.G6-F02.value`
- `GATE-006.required_fields.G6-F03.evidence_ref`
- `GATE-006.required_fields.G6-F03.value`
- `GATE-006.required_fields.G6-F04.evidence_ref`
- `GATE-006.required_fields.G6-F04.value`
- `GATE-006.sections.1.body`
- `GATE-006.source_baseline`
- `GATE-006.status`

A generated `READY` result is necessary but not sufficient: the accountable
gate owner must confirm the evidence and sign the governing decision.
