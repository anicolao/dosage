# SUB-009 — Package manifest and version/change boundary

> **INCOMPLETE / NOT APPROVED — GENERATED CLASSIFICATION-INQUIRY DOCUMENT.** This is not
> authorization, licensing, clearance, or permission for patient care. Edit
> `docs/regulatory/records/data/submission/SUB-009.yaml`; do not edit this generated file.

| Package control | Value |
| --- | --- |
| Document ID | `SUB-009` |
| Revision | 0.1 |
| Document status | **INCOMPLETE / NOT APPROVED** |
| Package readiness | **NOT READY** |
| Exact prototype baseline | `6b53fde87ff9b193b3c24f7bd93549746b4d6471` |
| Structured source / SHA-256 | `docs/regulatory/records/data/submission/SUB-009.yaml` / `fa12283b95ae807ed8bf0bf64e305ffcb8088ade5788f0e1c3d00a719deca01e` |
| Template / SHA-256 | `docs/regulatory/records/templates/submission.md.mustache` / `e8ca736dd37df3c77076e5355d01d1dcf34927304e42b852884b2fca7e14decd` |

Exact attachment, source, artifact and change boundary for the classification inquiry. Later implementation remediation may proceed without adding or materially changing submitted functionality unless reassessed.

## Package fields

| ID | Field | Value | Evidence | State |
| --- | --- | --- | --- | --- |
| `MAN-F01` | Generated package manifest and digest location | docs/regulatory/completed/MANIFEST.json; its current deterministic SHA-256 is recorded by docs/regulatory/completed/COMPLETENESS.md and must be frozen after final approvals | scripts/regulatory-records.mjs; docs/regulatory/completed/COMPLETENESS.md | Complete |
| `MAN-F02` | Exact source commit | 6b53fde87ff9b193b3c24f7bd93549746b4d6471 | INQ-000 | Complete |
| `MAN-F03` | Exact executable artifact or URL/digest | docs/regulatory/evidence/INQ-000/dosage-0.1.0-6b53fde.zip; SHA-256 8322e6ea7aca435796245a26a796ef5a4508a09b4733642768ae100a63a34442 | docs/regulatory/evidence/AUTOMATED-FACTS.json | Complete |
| `MAN-F04` | Exact screenshot archive/digest | 12 PNG captures under docs/regulatory/evidence/SUB-002/screenshots/; archive SHA-256 96251e9737a40a662d722778d565489ecf4f18753df6e74abe3968f9245778f8 | docs/regulatory/evidence/SUB-002/MANIFEST.json | Complete |

## 1. Attachment register

Include generated SUB-000 through SUB-009, controlled screenshots/worked example, and only those supporting artifacts explicitly listed in the final manifest. Every attachment needs a filename, revision and SHA-256.

## 2. Permitted post-inquiry remediation

Safety, correctness, accessibility, security, privacy, test and lifecycle remediation may replace defective implementation while retaining the exact submitted functions and represented purpose. Each change requires impact assessment against the classification facts and must not make the package misleading.

## 3. Classification reassessment triggers

Reassess before adding/removing/materially changing inputs, formulas, outputs, review behavior, local records, offline behavior, users/settings, claims, drug/patient logic, recommendations, alerts, integrations, signals, AI/ML or cloud functions; or after Health Canada identifies a controlling assumption.

## Classification decisions represented

| ID | Question | Position/decision | Rationale | Evidence | State |
| --- | --- | --- | --- | --- | --- |
| `MAN-D01` | Does the manifest identify the exact package IQ-002 authorized? | ⟦MISSING: SUB-009.decisions.MAN-D01.decision⟧ | ⟦MISSING: SUB-009.decisions.MAN-D01.rationale⟧ | ⟦MISSING: SUB-009.decisions.MAN-D01.evidence_ref⟧ | Open |

## Supporting evidence

| ID | Evidence | Reference | Status | State |
| --- | --- | --- | --- | --- |
| `MAN-E01` | Current deterministic manifests; final independent acceptance occurs at IQ-002 | docs/regulatory/completed/MANIFEST.json; docs/regulatory/completed/COMPLETENESS.md; docs/regulatory/evidence/AUTOMATED-FACTS.json; docs/regulatory/evidence/SUB-002/MANIFEST.json | draft | Open |

## Review and authorization

| Role | Review scope | Name / organization | Decision | Date | Signature reference | State |
| --- | --- | --- | --- | --- | --- | --- |
| Quality lead | Approve exact attachment identity and change-control boundary | ⟦MISSING: SUB-009.approvals.1.name/organization⟧ | ⟦MISSING: SUB-009.approvals.1.decision⟧ | ⟦MISSING: SUB-009.approvals.1.date⟧ | ⟦MISSING: SUB-009.approvals.1.signature_ref⟧ | Open |
| Regulatory lead | Approve classification reassessment triggers | ⟦MISSING: SUB-009.approvals.2.name/organization⟧ | ⟦MISSING: SUB-009.approvals.2.decision⟧ | ⟦MISSING: SUB-009.approvals.2.date⟧ | ⟦MISSING: SUB-009.approvals.2.signature_ref⟧ | Open |

## Document determination

**NOT READY**

Source, executable and screenshot identities are generated. The package manifest will continue changing as human approvals are filled; quality and regulatory authorization must freeze its final digest at IQ-002.

Required items still open:

- `SUB-009.approvals.1.date`
- `SUB-009.approvals.1.decision`
- `SUB-009.approvals.1.name`
- `SUB-009.approvals.1.organization`
- `SUB-009.approvals.1.signature_ref`
- `SUB-009.approvals.2.date`
- `SUB-009.approvals.2.decision`
- `SUB-009.approvals.2.name`
- `SUB-009.approvals.2.organization`
- `SUB-009.approvals.2.signature_ref`
- `SUB-009.decisions.MAN-D01.decision`
- `SUB-009.decisions.MAN-D01.evidence_ref`
- `SUB-009.decisions.MAN-D01.rationale`
- `SUB-009.evidence.MAN-E01.status`
- `SUB-009.status`
