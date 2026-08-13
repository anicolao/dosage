# SUB-001 — Exact product and intended use

> **INCOMPLETE / NOT APPROVED — GENERATED CLASSIFICATION-INQUIRY DOCUMENT.** This is not
> authorization, licensing, clearance, or permission for patient care. Edit
> `docs/regulatory/records/data/submission/SUB-001.yaml`; do not edit this generated file.

| Package control | Value |
| --- | --- |
| Document ID | `SUB-001` |
| Revision | 0.1 |
| Document status | **INCOMPLETE / NOT APPROVED** |
| Package readiness | **NOT READY** |
| Exact prototype baseline | `6b53fde87ff9b193b3c24f7bd93549746b4d6471` |
| Structured source / SHA-256 | `docs/regulatory/records/data/submission/SUB-001.yaml` / `b57c02c29ff29e8ac4461089daa2bec495a115ca3eab802fae4fccc17e1137ca` |
| Template / SHA-256 | `docs/regulatory/records/templates/submission.md.mustache` / `e8ca736dd37df3c77076e5355d01d1dcf34927304e42b852884b2fca7e14decd` |

Product/intended-use description for the exact executable prototype, not the later target architecture or an authorized clinical release.

## Package fields

| ID | Field | Value | Evidence | State |
| --- | --- | --- | --- | --- |
| `PRD-F01` | Legal manufacturer | ⟦MISSING: SUB-001.required_fields.PRD-F01.value⟧ | ⟦MISSING: SUB-001.required_fields.PRD-F01.evidence_ref⟧ | Open |
| `PRD-F02` | Intended user | ⟦MISSING: SUB-001.required_fields.PRD-F02.value⟧ | ⟦MISSING: SUB-001.required_fields.PRD-F02.evidence_ref⟧ | Open |
| `PRD-F03` | Intended care setting | ⟦MISSING: SUB-001.required_fields.PRD-F03.value⟧ | ⟦MISSING: SUB-001.required_fields.PRD-F03.evidence_ref⟧ | Open |
| `PRD-F04` | Exact intended-use statement | ⟦MISSING: SUB-001.required_fields.PRD-F04.value⟧ | ⟦MISSING: SUB-001.required_fields.PRD-F04.evidence_ref⟧ | Open |
| `PRD-F05` | Exact enforceable exclusions | ⟦MISSING: SUB-001.required_fields.PRD-F05.value⟧ | ⟦MISSING: SUB-001.required_fields.PRD-F05.evidence_ref⟧ | Open |

## 1. Exact included functions

The prototype includes manual entry of medication display name, vial amount/unit/volume and ordered dose/unit; six final prepared volume selections; mg/mcg conversion; dilution arithmetic; substituted equation review before result reveal; acknowledgement before history save; localStorage favourites and history; English UI; installable manifest; offline app-shell cache; and visible version/source identity.

## 2. Exact absent functions

There is no drug library, patient model, dose selection/range check, route or rate recommendation, order verification, barcode, camera, OCR, EHR, pharmacy, pump, medical-signal, account, cloud sync, telemetry, analytics, crash upload or AI/ML function.

## 3. Represented-use limits

The UI states “Prototype only — not for patient care,” tells the user the app does not recommend a dose, requires verification against the order, vial label, pharmacy guidance and local policy, warns to verify overfill and preparation method, and says local policy controls measurable volume and rounding. The submitted intended-use and exclusions must not contradict any actual function or foreseeable immediate-use workflow.

## Classification decisions represented

| ID | Question | Position/decision | Rationale | Evidence | State |
| --- | --- | --- | --- | --- | --- |
| `PRD-D01` | Are favourites, history and offline installation included in the classified product? | ⟦MISSING: SUB-001.decisions.PRD-D01.decision⟧ | ⟦MISSING: SUB-001.decisions.PRD-D01.rationale⟧ | ⟦MISSING: SUB-001.decisions.PRD-D01.evidence_ref⟧ | Open |
| `PRD-D02` | Does the intended use candidly state immediate or near-term medication-preparation use? | ⟦MISSING: SUB-001.decisions.PRD-D02.decision⟧ | ⟦MISSING: SUB-001.decisions.PRD-D02.rationale⟧ | ⟦MISSING: SUB-001.decisions.PRD-D02.evidence_ref⟧ | Open |

## Supporting evidence

| ID | Evidence | Reference | Status | State |
| --- | --- | --- | --- | --- |
| `PRD-E01` | Approved exact prototype baseline | docs/regulatory/completed/inquiry/INQ-000_EXACT_PROTOTYPE_BASELINE.md | draft | Open |
| `PRD-E02` | Clinical review of intended users/settings/exclusions | ⟦MISSING: SUB-001.evidence.PRD-E02.reference⟧ | missing | Open |

## Review and authorization

| Role | Review scope | Name / organization | Decision | Date | Signature reference | State |
| --- | --- | --- | --- | --- | --- | --- |
| Legal manufacturer | Approve represented purpose and exact product boundary | ⟦MISSING: SUB-001.approvals.1.name/organization⟧ | ⟦MISSING: SUB-001.approvals.1.decision⟧ | ⟦MISSING: SUB-001.approvals.1.date⟧ | ⟦MISSING: SUB-001.approvals.1.signature_ref⟧ | Open |
| Regulatory lead | Approve intended-use wording for classification | ⟦MISSING: SUB-001.approvals.2.name/organization⟧ | ⟦MISSING: SUB-001.approvals.2.decision⟧ | ⟦MISSING: SUB-001.approvals.2.date⟧ | ⟦MISSING: SUB-001.approvals.2.signature_ref⟧ | Open |
| Pharmacy reviewer | Confirm formula/preparation purpose and limits are factually accurate | ⟦MISSING: SUB-001.approvals.3.name/organization⟧ | ⟦MISSING: SUB-001.approvals.3.decision⟧ | ⟦MISSING: SUB-001.approvals.3.date⟧ | ⟦MISSING: SUB-001.approvals.3.signature_ref⟧ | Open |
| Nursing reviewer | Confirm user/setting/workflow and immediate-use facts | ⟦MISSING: SUB-001.approvals.4.name/organization⟧ | ⟦MISSING: SUB-001.approvals.4.decision⟧ | ⟦MISSING: SUB-001.approvals.4.date⟧ | ⟦MISSING: SUB-001.approvals.4.signature_ref⟧ | Open |

## Document determination

**NOT READY**

⟦MISSING: SUB-001.completion_statement⟧

Required items still open:

- `SUB-001.approvals.1.date`
- `SUB-001.approvals.1.decision`
- `SUB-001.approvals.1.name`
- `SUB-001.approvals.1.organization`
- `SUB-001.approvals.1.signature_ref`
- `SUB-001.approvals.2.date`
- `SUB-001.approvals.2.decision`
- `SUB-001.approvals.2.name`
- `SUB-001.approvals.2.organization`
- `SUB-001.approvals.2.signature_ref`
- `SUB-001.approvals.3.date`
- `SUB-001.approvals.3.decision`
- `SUB-001.approvals.3.name`
- `SUB-001.approvals.3.organization`
- `SUB-001.approvals.3.signature_ref`
- `SUB-001.approvals.4.date`
- `SUB-001.approvals.4.decision`
- `SUB-001.approvals.4.name`
- `SUB-001.approvals.4.organization`
- `SUB-001.approvals.4.signature_ref`
- `SUB-001.completion_statement`
- `SUB-001.decisions.PRD-D01.decision`
- `SUB-001.decisions.PRD-D01.evidence_ref`
- `SUB-001.decisions.PRD-D01.rationale`
- `SUB-001.decisions.PRD-D02.decision`
- `SUB-001.decisions.PRD-D02.evidence_ref`
- `SUB-001.decisions.PRD-D02.rationale`
- `SUB-001.evidence.PRD-E01.status`
- `SUB-001.evidence.PRD-E02.reference`
- `SUB-001.evidence.PRD-E02.status`
- `SUB-001.required_fields.PRD-F01.evidence_ref`
- `SUB-001.required_fields.PRD-F01.value`
- `SUB-001.required_fields.PRD-F02.evidence_ref`
- `SUB-001.required_fields.PRD-F02.value`
- `SUB-001.required_fields.PRD-F03.evidence_ref`
- `SUB-001.required_fields.PRD-F03.value`
- `SUB-001.required_fields.PRD-F04.evidence_ref`
- `SUB-001.required_fields.PRD-F04.value`
- `SUB-001.required_fields.PRD-F05.evidence_ref`
- `SUB-001.required_fields.PRD-F05.value`
- `SUB-001.status`
