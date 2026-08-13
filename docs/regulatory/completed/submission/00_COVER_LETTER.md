# SUB-000 — Classification-verification request cover letter

> **INCOMPLETE / NOT APPROVED — GENERATED CLASSIFICATION-INQUIRY DOCUMENT.** This is not
> authorization, licensing, clearance, or permission for patient care. Edit
> `docs/regulatory/records/data/submission/SUB-000.yaml`; do not edit this generated file.

| Package control | Value |
| --- | --- |
| Document ID | `SUB-000` |
| Revision | 0.1 |
| Document status | **INCOMPLETE / NOT APPROVED** |
| Package readiness | **NOT READY** |
| Exact prototype baseline | `6b53fde87ff9b193b3c24f7bd93549746b4d6471` |
| Structured source / SHA-256 | `docs/regulatory/records/data/submission/SUB-000.yaml` / `1921e9c58dcd35c8221eb1337047f09ad8bb77a850f835e9d365e34b28680ef6` |
| Template / SHA-256 | `docs/regulatory/records/templates/submission.md.mustache` / `e8ca736dd37df3c77076e5355d01d1dcf34927304e42b852884b2fca7e14decd` |

Draft cover letter asking Health Canada whether the exact Dosage prototype is outside the medical-device definition and, if not, which class and rule apply.

## Package fields

| ID | Field | Value | Evidence | State |
| --- | --- | --- | --- | --- |
| `COV-F01` | Legal manufacturer name and address | ⟦MISSING: SUB-000.required_fields.COV-F01.value⟧ | ⟦MISSING: SUB-000.required_fields.COV-F01.evidence_ref⟧ | Open |
| `COV-F02` | Regulatory contact and controlled coordinates | ⟦MISSING: SUB-000.required_fields.COV-F02.value⟧ | ⟦MISSING: SUB-000.required_fields.COV-F02.evidence_ref⟧ | Open |
| `COV-F03` | Submission date | ⟦MISSING: SUB-000.required_fields.COV-F03.value⟧ | ⟦MISSING: SUB-000.required_fields.COV-F03.evidence_ref⟧ | Open |
| `COV-F04` | Exact package manifest digest | ⟦MISSING: SUB-000.required_fields.COV-F04.value⟧ | ⟦MISSING: SUB-000.required_fields.COV-F04.evidence_ref⟧ | Open |
| `COV-F05` | Verified recipient address | ⟦MISSING: SUB-000.required_fields.COV-F05.value⟧ | ⟦MISSING: SUB-000.required_fields.COV-F05.evidence_ref⟧ | Open |

## 1. Request

`[LEGAL MANUFACTURER]` requests classification verification for the exact Dosage prototype identified by the source commit above. The software is intended to provide trained nurses with transparent medication dilution arithmetic from manually entered vial-label facts, a selected final prepared volume and an already-authorized ordered dose. It does not select or recommend a medication or dose. Every substituted equation must be checked before the calculated mL is revealed.

The manufacturer asks whether the exact prototype meets all four Health Canada clinical-decision-support exclusion criteria. The request specifically asks Health Canada to determine whether immediate or near-term use in medication preparation means the output drives clinical/patient management despite the transparent arithmetic and independent review. If it is SaMD, the manufacturer requests the applicable class and Schedule 1 rule(s).

## 2. Questions

1. Does the exact prototype fall outside the definition of a medical device under all four SaMD exclusion criteria and the published manually entered, independently reviewable drug-calculation example?
2. Does immediate medication-preparation use prevent criterion 3 from being met?
3. If regulated, what class and current Schedule 1 rule(s) apply to the exact intended/represented use?
4. What additional fact, limitation or evidence would Health Canada require?

## 3. Status disclaimer

The identified prototype is not being supplied for patient care. The manufacturer will not represent classification advice as a medical device licence, establishment licence, market authorization or safety approval.

## Classification decisions represented

| ID | Question | Position/decision | Rationale | Evidence | State |
| --- | --- | --- | --- | --- | --- |
| `COV-D01` | Is the exact package authorized to send once? | ⟦MISSING: SUB-000.decisions.COV-D01.decision⟧ | ⟦MISSING: SUB-000.decisions.COV-D01.rationale⟧ | ⟦MISSING: SUB-000.decisions.COV-D01.evidence_ref⟧ | Open |

## Supporting evidence

| ID | Evidence | Reference | Status | State |
| --- | --- | --- | --- | --- |
| `COV-E01` | IQ-002 package-release decision | ⟦MISSING: SUB-000.evidence.COV-E01.reference⟧ | missing | Open |

## Review and authorization

| Role | Review scope | Name / organization | Decision | Date | Signature reference | State |
| --- | --- | --- | --- | --- | --- | --- |
| Regulatory lead | Approve recipient questions and current route | ⟦MISSING: SUB-000.approvals.1.name/organization⟧ | ⟦MISSING: SUB-000.approvals.1.decision⟧ | ⟦MISSING: SUB-000.approvals.1.date⟧ | ⟦MISSING: SUB-000.approvals.1.signature_ref⟧ | Open |
| Legal manufacturer signatory | Sign and authorize the exact request | ⟦MISSING: SUB-000.approvals.2.name/organization⟧ | ⟦MISSING: SUB-000.approvals.2.decision⟧ | ⟦MISSING: SUB-000.approvals.2.date⟧ | ⟦MISSING: SUB-000.approvals.2.signature_ref⟧ | Open |

## Document determination

**NOT READY**

⟦MISSING: SUB-000.completion_statement⟧

Required items still open:

- `SUB-000.approvals.1.date`
- `SUB-000.approvals.1.decision`
- `SUB-000.approvals.1.name`
- `SUB-000.approvals.1.organization`
- `SUB-000.approvals.1.signature_ref`
- `SUB-000.approvals.2.date`
- `SUB-000.approvals.2.decision`
- `SUB-000.approvals.2.name`
- `SUB-000.approvals.2.organization`
- `SUB-000.approvals.2.signature_ref`
- `SUB-000.completion_statement`
- `SUB-000.decisions.COV-D01.decision`
- `SUB-000.decisions.COV-D01.evidence_ref`
- `SUB-000.decisions.COV-D01.rationale`
- `SUB-000.evidence.COV-E01.reference`
- `SUB-000.evidence.COV-E01.status`
- `SUB-000.required_fields.COV-F01.evidence_ref`
- `SUB-000.required_fields.COV-F01.value`
- `SUB-000.required_fields.COV-F02.evidence_ref`
- `SUB-000.required_fields.COV-F02.value`
- `SUB-000.required_fields.COV-F03.evidence_ref`
- `SUB-000.required_fields.COV-F03.value`
- `SUB-000.required_fields.COV-F04.evidence_ref`
- `SUB-000.required_fields.COV-F04.value`
- `SUB-000.required_fields.COV-F05.evidence_ref`
- `SUB-000.required_fields.COV-F05.value`
- `SUB-000.status`
