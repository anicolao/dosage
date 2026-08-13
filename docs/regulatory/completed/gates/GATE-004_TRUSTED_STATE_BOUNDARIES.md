# GATE-004 — Trusted state boundaries

> **INCOMPLETE / NOT APPROVED — GENERATED GATE RECORD.** Edit `docs/regulatory/records/data/gates/GATE-004.yaml`, then run
> `npm run regulatory:build`. This gate cannot close while any required value,
> accepted evidence, upstream dependency, or approval is missing.

| Gate control | Value |
| --- | --- |
| Gate | `GATE-004` |
| Revision | 0.1 |
| Mechanical readiness | **NOT READY** |
| Controlled status | **INCOMPLETE / NOT APPROVED** |
| Exact source baseline | `⟦MISSING: GATE-004.source_baseline⟧` |
| Structured source / SHA-256 | `docs/regulatory/records/data/gates/GATE-004.yaml` / `eac7a1e0379dba567d40cf9972e7d739a65a0fecf928d74ced2fea41a582251d` |
| Template / SHA-256 | `docs/regulatory/records/templates/gate.md.mustache` / `7b321ada55239b22972c0795527edcc0a4f635f907e28782762695dcf06194ac` |

Full G4 completion record governed by docs/regulatory/GATE-004_TRUSTED_STATE_BOUNDARIES.md.

## Dependencies

- `GATE-002`
- `GATE-003`

## Gate fields and exit criteria

| ID | Criterion | Recorded value | Evidence | Required | State |
| --- | --- | --- | --- | --- | --- |
| `G4-F01` | Exact storage/state candidate commit/build | ⟦MISSING: GATE-004.required_fields.G4-F01.value⟧ | ⟦MISSING: GATE-004.required_fields.G4-F01.evidence_ref⟧ | Yes | Open |
| `G4-F02` | Versioned schemas/recomputation/migration/failure behavior | ⟦MISSING: GATE-004.required_fields.G4-F02.value⟧ | ⟦MISSING: GATE-004.required_fields.G4-F02.evidence_ref⟧ | Yes | Open |
| `G4-F03` | Retention/deletion/privacy/offline compatibility | ⟦MISSING: GATE-004.required_fields.G4-F03.value⟧ | ⟦MISSING: GATE-004.required_fields.G4-F03.evidence_ref⟧ | Yes | Open |

## 1. State-boundary implementation and anomaly disposition

⟦MISSING: GATE-004.sections.1.body⟧

## Controlled decisions

| ID | Decision required | Decision | Rationale | Evidence | State |
| --- | --- | --- | --- | --- | --- |
| `G4-D01` | Are all persisted values untrusted and safely validated/recomputed for one exact candidate? | ⟦MISSING: GATE-004.decisions.G4-D01.decision⟧ | ⟦MISSING: GATE-004.decisions.G4-D01.rationale⟧ | ⟦MISSING: GATE-004.decisions.G4-D01.evidence_ref⟧ | Open |

## Objective evidence

| ID | Evidence | Reference | Status | Required | State |
| --- | --- | --- | --- | --- | --- |
| `G4-E01` | Schema/property/migration/corruption/recovery/privacy/browser evidence | ⟦MISSING: GATE-004.evidence.G4-E01.reference⟧ | missing | Yes | Open |

## Gate signatures

| Role | Scope | Name / organization | Decision | Date | Signature reference | State |
| --- | --- | --- | --- | --- | --- | --- |
| Software lead | Approve state/storage implementation | ⟦MISSING: GATE-004.approvals.1.name/organization⟧ | ⟦MISSING: GATE-004.approvals.1.decision⟧ | ⟦MISSING: GATE-004.approvals.1.date⟧ | ⟦MISSING: GATE-004.approvals.1.signature_ref⟧ | Open |
| Security/privacy lead | Approve local-data/privacy controls | ⟦MISSING: GATE-004.approvals.2.name/organization⟧ | ⟦MISSING: GATE-004.approvals.2.decision⟧ | ⟦MISSING: GATE-004.approvals.2.date⟧ | ⟦MISSING: GATE-004.approvals.2.signature_ref⟧ | Open |
| Quality lead | Verify evidence/anomalies and close G4 | ⟦MISSING: GATE-004.approvals.3.name/organization⟧ | ⟦MISSING: GATE-004.approvals.3.decision⟧ | ⟦MISSING: GATE-004.approvals.3.date⟧ | ⟦MISSING: GATE-004.approvals.3.signature_ref⟧ | Open |

## Gate determination

**NOT READY**

⟦MISSING: GATE-004.completion_statement⟧

Blocking structured items:

- `GATE-004.approvals.1.date`
- `GATE-004.approvals.1.decision`
- `GATE-004.approvals.1.name`
- `GATE-004.approvals.1.organization`
- `GATE-004.approvals.1.signature_ref`
- `GATE-004.approvals.2.date`
- `GATE-004.approvals.2.decision`
- `GATE-004.approvals.2.name`
- `GATE-004.approvals.2.organization`
- `GATE-004.approvals.2.signature_ref`
- `GATE-004.approvals.3.date`
- `GATE-004.approvals.3.decision`
- `GATE-004.approvals.3.name`
- `GATE-004.approvals.3.organization`
- `GATE-004.approvals.3.signature_ref`
- `GATE-004.completion_statement`
- `GATE-004.decisions.G4-D01.decision`
- `GATE-004.decisions.G4-D01.evidence_ref`
- `GATE-004.decisions.G4-D01.rationale`
- `GATE-004.evidence.G4-E01.reference`
- `GATE-004.evidence.G4-E01.status`
- `GATE-004.required_fields.G4-F01.evidence_ref`
- `GATE-004.required_fields.G4-F01.value`
- `GATE-004.required_fields.G4-F02.evidence_ref`
- `GATE-004.required_fields.G4-F02.value`
- `GATE-004.required_fields.G4-F03.evidence_ref`
- `GATE-004.required_fields.G4-F03.value`
- `GATE-004.sections.1.body`
- `GATE-004.source_baseline`
- `GATE-004.status`

A generated `READY` result is necessary but not sufficient: the accountable
gate owner must confirm the evidence and sign the governing decision.
