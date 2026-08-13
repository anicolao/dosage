# SUB-005 — Classification-relevant risk and known limitations

> **INCOMPLETE / NOT APPROVED — GENERATED CLASSIFICATION-INQUIRY DOCUMENT.** This is not
> authorization, licensing, clearance, or permission for patient care. Edit
> `docs/regulatory/records/data/submission/SUB-005.yaml`; do not edit this generated file.

| Package control | Value |
| --- | --- |
| Document ID | `SUB-005` |
| Revision | 0.1 |
| Document status | **INCOMPLETE / NOT APPROVED** |
| Package readiness | **NOT READY** |
| Exact prototype baseline | `6b53fde87ff9b193b3c24f7bd93549746b4d6471` |
| Structured source / SHA-256 | `docs/regulatory/records/data/submission/SUB-005.yaml` / `2bcbd9920735e614a456005191d62442bdd914960e7a4d62bca57930bc920031` |
| Template / SHA-256 | `docs/regulatory/records/templates/submission.md.mustache` / `e8ca736dd37df3c77076e5355d01d1dcf34927304e42b852884b2fca7e14decd` |

Candid classification-relevant hazard and limitation summary. This is not a completed risk-management file or residual-risk acceptance.

## Package fields

| ID | Field | Value | Evidence | State |
| --- | --- | --- | --- | --- |
| `RSK-F01` | Intended clinical context and worst credible consequence | ⟦MISSING: SUB-005.required_fields.RSK-F01.value⟧ | ⟦MISSING: SUB-005.required_fields.RSK-F01.evidence_ref⟧ | Open |
| `RSK-F02` | Prototype containment while inquiry is pending | ⟦MISSING: SUB-005.required_fields.RSK-F02.value⟧ | ⟦MISSING: SUB-005.required_fields.RSK-F02.evidence_ref⟧ | Open |

## 1. Classification-relevant risk

A wrong or misunderstood mL result used in immediate medication preparation could contribute to serious injury or death. This consequence is central to criterion 3 and fallback classification. Transparent arithmetic and external verification may reduce reliance but do not erase immediate use or establish acceptable residual risk.

## 2. Known prototype limitations

Known limitations include permissive browser/Number input and arithmetic, positive values that may display as zero after six-decimal formatting, no approved numeric bounds or clinical rounding rule, weak stored-record validation and trust of stored derived values, no complete migration or recovery control, incomplete accessibility/usability evidence, no CSP or final SBOM/security review, incomplete update/rollback proof, public prototype hosting and no final bilingual label/IFU.

## 3. Existing conceptual safeguards

Current UI safeguards include closed mg/mcg selectors, six final-volume choices, finite-positive checks, final-volume and one-vial blocking, visible substituted equations, check-every-step gating, edit reset, acknowledgement, warnings, no patient-information prompt, and persistent prototype status. These are implementation facts, not verified residual- risk controls.

## Classification decisions represented

| ID | Question | Position/decision | Rationale | Evidence | State |
| --- | --- | --- | --- | --- | --- |
| `RSK-D01` | Are known defects and immediate-use severity stated without minimization? | ⟦MISSING: SUB-005.decisions.RSK-D01.decision⟧ | ⟦MISSING: SUB-005.decisions.RSK-D01.rationale⟧ | ⟦MISSING: SUB-005.decisions.RSK-D01.evidence_ref⟧ | Open |

## Supporting evidence

| ID | Evidence | Reference | Status | State |
| --- | --- | --- | --- | --- |
| `RSK-E01` | Quality/clinical review of hazard and limitation completeness | ⟦MISSING: SUB-005.evidence.RSK-E01.reference⟧ | missing | Open |

## Review and authorization

| Role | Review scope | Name / organization | Decision | Date | Signature reference | State |
| --- | --- | --- | --- | --- | --- | --- |
| Quality lead | Approve honest distinction between current facts and unclosed risk controls | ⟦MISSING: SUB-005.approvals.1.name/organization⟧ | ⟦MISSING: SUB-005.approvals.1.decision⟧ | ⟦MISSING: SUB-005.approvals.1.date⟧ | ⟦MISSING: SUB-005.approvals.1.signature_ref⟧ | Open |
| Pharmacy reviewer | Confirm clinical consequence and calculation hazards | ⟦MISSING: SUB-005.approvals.2.name/organization⟧ | ⟦MISSING: SUB-005.approvals.2.decision⟧ | ⟦MISSING: SUB-005.approvals.2.date⟧ | ⟦MISSING: SUB-005.approvals.2.signature_ref⟧ | Open |
| Nursing reviewer | Confirm workflow/reliance and immediate-use risk description | ⟦MISSING: SUB-005.approvals.3.name/organization⟧ | ⟦MISSING: SUB-005.approvals.3.decision⟧ | ⟦MISSING: SUB-005.approvals.3.date⟧ | ⟦MISSING: SUB-005.approvals.3.signature_ref⟧ | Open |

## Document determination

**NOT READY**

⟦MISSING: SUB-005.completion_statement⟧

Required items still open:

- `SUB-005.approvals.1.date`
- `SUB-005.approvals.1.decision`
- `SUB-005.approvals.1.name`
- `SUB-005.approvals.1.organization`
- `SUB-005.approvals.1.signature_ref`
- `SUB-005.approvals.2.date`
- `SUB-005.approvals.2.decision`
- `SUB-005.approvals.2.name`
- `SUB-005.approvals.2.organization`
- `SUB-005.approvals.2.signature_ref`
- `SUB-005.approvals.3.date`
- `SUB-005.approvals.3.decision`
- `SUB-005.approvals.3.name`
- `SUB-005.approvals.3.organization`
- `SUB-005.approvals.3.signature_ref`
- `SUB-005.completion_statement`
- `SUB-005.decisions.RSK-D01.decision`
- `SUB-005.decisions.RSK-D01.evidence_ref`
- `SUB-005.decisions.RSK-D01.rationale`
- `SUB-005.evidence.RSK-E01.reference`
- `SUB-005.evidence.RSK-E01.status`
- `SUB-005.required_fields.RSK-F01.evidence_ref`
- `SUB-005.required_fields.RSK-F01.value`
- `SUB-005.required_fields.RSK-F02.evidence_ref`
- `SUB-005.required_fields.RSK-F02.value`
- `SUB-005.status`
