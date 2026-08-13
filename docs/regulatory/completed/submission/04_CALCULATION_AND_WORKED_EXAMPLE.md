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
| Structured source / SHA-256 | `docs/regulatory/records/data/submission/SUB-004.yaml` / `0b5fd37404c18717aa5309701ad4b2b2d0cec773369c4736c19c523e626db1ca` |
| Template / SHA-256 | `docs/regulatory/records/templates/submission.md.mustache` / `e8ca736dd37df3c77076e5355d01d1dcf34927304e42b852884b2fca7e14decd` |

Formula, actual Number/formatting implementation, independently reproducible example and current evidence. Formal work is disclosed but not misrepresented as proof that the prototype implements the Lean model.

## Package fields

| ID | Field | Value | Evidence | State |
| --- | --- | --- | --- | --- |
| `CAL-F01` | Authoritative formula source | ⟦MISSING: SUB-004.required_fields.CAL-F01.value⟧ | ⟦MISSING: SUB-004.required_fields.CAL-F01.evidence_ref⟧ | Open |
| `CAL-F02` | Worked-example inputs and mechanically reproduced expected values | Example medication; 10 mg in 1 mL; 50 mL final prepared volume; 2000 mcg ordered dose; vial concentration 10 mg/mL; prepared concentration 0.2 mg/mL = 200 mcg/mL; administration volume 10 mL | docs/regulatory/evidence/AUTOMATED-FACTS.json; SUB-002 captures 02–05 | Complete |
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

For A=10 mg, Vv=1 mL, Vf=50 mL and D=2000 mcg:

1. Vial concentration: 10 mg ÷ 1 mL = 10 mg/mL.
2. Prepared concentration: 10 mg ÷ 50 mL = 0.2 mg/mL.
3. Unit conversion: 0.2 mg/mL × 1000 mcg/mg = 200 mcg/mL.
4. Administration volume: 2000 mcg ÷ 200 mcg/mL = 10 mL.

Playwright observes these substituted equations and the concealed/revealed 10 mL output in SUB-002. The automated reproduction is not the required independent pharmacy/calculation authorization.

## 4. Current verification evidence and boundary

Existing Playwright tests exercise representative same/cross-unit paths, one-vial blocking, six volumes, review state, local records, privacy, responsiveness and offline installation. Lean proves properties of a separate exact-rational reference model. No differential conformance test proves the JavaScript prototype equivalent to that model. Neither test suite proves clinical appropriateness.

## Classification decisions represented

| ID | Question | Position/decision | Rationale | Evidence | State |
| --- | --- | --- | --- | --- | --- |
| `CAL-D01` | Does the worked example independently reproduce every displayed equation and result? | Mechanically reproduced; independent human verification pending | The repository facts script calculates the four expected values without importing application calculation code, and Playwright observes the corresponding equations/result. The named independent verifier must still review the formula source, units and arithmetic. | docs/regulatory/evidence/AUTOMATED-FACTS.json; docs/regulatory/evidence/SUB-002/ | Complete |

## Supporting evidence

| ID | Evidence | Reference | Status | State |
| --- | --- | --- | --- | --- |
| `CAL-E01` | Pharmacy-authoritative formula basis | ⟦MISSING: SUB-004.evidence.CAL-E01.reference⟧ | missing | Open |
| `CAL-E02` | Mechanically independent worked-example reproduction; awaiting named verifier acceptance | docs/regulatory/evidence/AUTOMATED-FACTS.json; scripts/regulatory-facts.mjs | reviewed | Open |
| `CAL-E03` | Current automated-test and Lean evidence summary | tests/e2e/; formal/lean/README.md | reviewed | Open |

## Review and authorization

| Role | Review scope | Name / organization | Decision | Date | Signature reference | State |
| --- | --- | --- | --- | --- | --- | --- |
| Pharmacy reviewer | Approve formula basis and worked example as routine-practice facts | ⟦MISSING: SUB-004.approvals.1.name/organization⟧ | ⟦MISSING: SUB-004.approvals.1.decision⟧ | ⟦MISSING: SUB-004.approvals.1.date⟧ | ⟦MISSING: SUB-004.approvals.1.signature_ref⟧ | Open |
| Independent calculation verifier | Independently reproduce example and verify disclosed implementation limits | ⟦MISSING: SUB-004.approvals.2.name/organization⟧ | ⟦MISSING: SUB-004.approvals.2.decision⟧ | ⟦MISSING: SUB-004.approvals.2.date⟧ | ⟦MISSING: SUB-004.approvals.2.signature_ref⟧ | Open |
| Software lead | Confirm implementation description matches source | ⟦MISSING: SUB-004.approvals.3.name/organization⟧ | ⟦MISSING: SUB-004.approvals.3.decision⟧ | ⟦MISSING: SUB-004.approvals.3.date⟧ | ⟦MISSING: SUB-004.approvals.3.signature_ref⟧ | Open |

## Document determination

**NOT READY**

The implementation description, worked-example arithmetic and automated test references are complete. A pharmacy-authoritative formula source, named independent verifier and the three attributable approvals remain required.

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
- `SUB-004.evidence.CAL-E01.reference`
- `SUB-004.evidence.CAL-E01.status`
- `SUB-004.evidence.CAL-E02.status`
- `SUB-004.evidence.CAL-E03.status`
- `SUB-004.required_fields.CAL-F01.evidence_ref`
- `SUB-004.required_fields.CAL-F01.value`
- `SUB-004.required_fields.CAL-F03.evidence_ref`
- `SUB-004.required_fields.CAL-F03.value`
- `SUB-004.status`
