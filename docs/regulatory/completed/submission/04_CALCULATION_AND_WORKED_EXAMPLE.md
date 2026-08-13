# SUB-004 — Exact calculation and worked example

> **INCOMPLETE / NOT APPROVED — GENERATED CLASSIFICATION-INQUIRY DOCUMENT.** This is not
> authorization, licensing, clearance, or permission for patient care. Edit
> `docs/regulatory/records/data/submission/SUB-004.yaml`; do not edit this generated file.

| Package control | Value |
| --- | --- |
| Document ID | `SUB-004` |
| Revision | 0.1 |
| Document status | **INCOMPLETE / NOT APPROVED** |
| Package readiness | **NOT READY** |
| Exact prototype baseline | `6b53fde87ff9b193b3c24f7bd93549746b4d6471` |
| Structured source / SHA-256 | `docs/regulatory/records/data/submission/SUB-004.yaml` / `4f4856e4777b02d43c65fc0ea794f6e77814d228a3a76bb30128197e9aed49f1` |
| Template / SHA-256 | `docs/regulatory/records/templates/submission.md.mustache` / `e8ca736dd37df3c77076e5355d01d1dcf34927304e42b852884b2fca7e14decd` |

Formula, actual Number/formatting implementation, independently reproducible example and current evidence. Formal work is disclosed but not misrepresented as proof that the prototype implements the Lean model.

## Package fields

| ID | Field | Value | Evidence | State |
| --- | --- | --- | --- | --- |
| `CAL-F01` | Authoritative formula source | ⟦MISSING: SUB-004.required_fields.CAL-F01.value⟧ | ⟦MISSING: SUB-004.required_fields.CAL-F01.evidence_ref⟧ | Open |
| `CAL-F02` | Approved worked-example inputs and expected values | ⟦MISSING: SUB-004.required_fields.CAL-F02.value⟧ | ⟦MISSING: SUB-004.required_fields.CAL-F02.evidence_ref⟧ | Open |
| `CAL-F03` | Independent calculation reviewer | ⟦MISSING: SUB-004.required_fields.CAL-F03.value⟧ | ⟦MISSING: SUB-004.required_fields.CAL-F03.evidence_ref⟧ | Open |

## 1. Actual formula

Let A be vial amount, Vv vial volume, Vf selected final prepared volume, D ordered dose, and unit factor S(mg)=1000, S(mcg)=1:

- vial concentration = A / Vv
- prepared concentration = A / Vf
- prepared concentration in ordered units = (A × S(vial unit) / S(ordered unit)) / Vf
- administration volume mL = D / prepared concentration in ordered units

The prototype blocks Vf < Vv and D greater than one vial's converted available amount.

## 2. Actual implementation and rounding disclosure

Inputs are converted with JavaScript Number and operations use IEEE-754 arithmetic. All displayed numbers use en-CA Intl.NumberFormat with no more than six fractional digits. No clinically approved rounding or measurable- volume rule is implemented; the UI delegates these to local policy. The known positive-to-displayed-zero risk is disclosed.

## 3. Worked example

⟦MISSING: SUB-004.sections.3.body⟧

## 4. Current verification evidence and boundary

Existing Playwright tests exercise representative same/cross-unit paths, one-vial blocking, six volumes, review state, local records, privacy, responsiveness and offline installation. Lean proves properties of a separate exact-rational reference model. No differential conformance test proves the JavaScript prototype equivalent to that model. Neither test suite proves clinical appropriateness.

## Classification decisions represented

| ID | Question | Position/decision | Rationale | Evidence | State |
| --- | --- | --- | --- | --- | --- |
| `CAL-D01` | Does the worked example independently reproduce every displayed equation and result? | ⟦MISSING: SUB-004.decisions.CAL-D01.decision⟧ | ⟦MISSING: SUB-004.decisions.CAL-D01.rationale⟧ | ⟦MISSING: SUB-004.decisions.CAL-D01.evidence_ref⟧ | Open |

## Supporting evidence

| ID | Evidence | Reference | Status | State |
| --- | --- | --- | --- | --- |
| `CAL-E01` | Pharmacy-authoritative formula basis | ⟦MISSING: SUB-004.evidence.CAL-E01.reference⟧ | missing | Open |
| `CAL-E02` | Independently calculated worked-example sheet | ⟦MISSING: SUB-004.evidence.CAL-E02.reference⟧ | missing | Open |
| `CAL-E03` | Current automated-test and Lean evidence summary | tests/e2e/; formal/lean/README.md | reviewed | Open |

## Review and authorization

| Role | Review scope | Name / organization | Decision | Date | Signature reference | State |
| --- | --- | --- | --- | --- | --- | --- |
| Pharmacy reviewer | Approve formula basis and worked example as routine-practice facts | ⟦MISSING: SUB-004.approvals.1.name/organization⟧ | ⟦MISSING: SUB-004.approvals.1.decision⟧ | ⟦MISSING: SUB-004.approvals.1.date⟧ | ⟦MISSING: SUB-004.approvals.1.signature_ref⟧ | Open |
| Independent calculation verifier | Independently reproduce example and verify disclosed implementation limits | ⟦MISSING: SUB-004.approvals.2.name/organization⟧ | ⟦MISSING: SUB-004.approvals.2.decision⟧ | ⟦MISSING: SUB-004.approvals.2.date⟧ | ⟦MISSING: SUB-004.approvals.2.signature_ref⟧ | Open |
| Software lead | Confirm implementation description matches source | ⟦MISSING: SUB-004.approvals.3.name/organization⟧ | ⟦MISSING: SUB-004.approvals.3.decision⟧ | ⟦MISSING: SUB-004.approvals.3.date⟧ | ⟦MISSING: SUB-004.approvals.3.signature_ref⟧ | Open |

## Document determination

**NOT READY**

⟦MISSING: SUB-004.completion_statement⟧

Required items still open:

- `SUB-004.approvals.1.date`
- `SUB-004.approvals.1.decision`
- `SUB-004.approvals.1.name`
- `SUB-004.approvals.1.organization`
- `SUB-004.approvals.1.signature_ref`
- `SUB-004.approvals.2.date`
- `SUB-004.approvals.2.decision`
- `SUB-004.approvals.2.name`
- `SUB-004.approvals.2.organization`
- `SUB-004.approvals.2.signature_ref`
- `SUB-004.approvals.3.date`
- `SUB-004.approvals.3.decision`
- `SUB-004.approvals.3.name`
- `SUB-004.approvals.3.organization`
- `SUB-004.approvals.3.signature_ref`
- `SUB-004.completion_statement`
- `SUB-004.decisions.CAL-D01.decision`
- `SUB-004.decisions.CAL-D01.evidence_ref`
- `SUB-004.decisions.CAL-D01.rationale`
- `SUB-004.evidence.CAL-E01.reference`
- `SUB-004.evidence.CAL-E01.status`
- `SUB-004.evidence.CAL-E02.reference`
- `SUB-004.evidence.CAL-E02.status`
- `SUB-004.evidence.CAL-E03.status`
- `SUB-004.required_fields.CAL-F01.evidence_ref`
- `SUB-004.required_fields.CAL-F01.value`
- `SUB-004.required_fields.CAL-F02.evidence_ref`
- `SUB-004.required_fields.CAL-F02.value`
- `SUB-004.required_fields.CAL-F03.evidence_ref`
- `SUB-004.required_fields.CAL-F03.value`
- `SUB-004.sections.3.body`
- `SUB-004.status`
