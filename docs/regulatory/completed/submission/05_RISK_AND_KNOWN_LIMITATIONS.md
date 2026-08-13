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
| Structured source / SHA-256 | `docs/regulatory/records/data/submission/SUB-005.yaml` / `7fbe585a4d6245c91fd94780188e1a5d54f22ae1e53084cc0db81a1360abb2a3` |
| Template / SHA-256 | `docs/regulatory/records/templates/submission.md.mustache` / `e8ca736dd37df3c77076e5355d01d1dcf34927304e42b852884b2fca7e14decd` |

Candid classification-relevant hazard and limitation summary. This is not a completed risk-management file or residual-risk acceptance.

## Package fields

| ID | Field | Value | Evidence | State |
| --- | --- | --- | --- | --- |
| `RSK-F01` | Intended clinical context and worst credible consequence | Proposed for clinical authorization: immediate or near-term medication preparation by a trained nurse; an incorrect or misunderstood mL used for a critical/high-alert medication could contribute to serious injury or death | RMF-001; CANADIAN_REGULATIONS.md; pharmacy/nursing approvals below | Complete |
| `RSK-F02` | Prototype containment while inquiry is pending | Persistent Prototype only — not for patient care banner; noindex/nofollow/noarchive metadata; not represented or supplied as clinically validated; public review channel remains a known containment limitation | src/App.svelte; index.html; BASE-001; DST-001; automated screenshots | Complete |

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

The known source/review limitations, current safeguards and proposed worst credible consequence are drafted. Quality, pharmacy and nursing reviewers must confirm completeness and authorize the clinical characterization.

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
- `SUB-005.decisions.RSK-D01.decision`
- `SUB-005.decisions.RSK-D01.evidence_ref`
- `SUB-005.decisions.RSK-D01.rationale`
- `SUB-005.evidence.RSK-E01.reference`
- `SUB-005.evidence.RSK-E01.status`
- `SUB-005.status`
