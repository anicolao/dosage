# IQ-001 — Classification inquiry product and analysis approval

> **INCOMPLETE / NOT APPROVED — GENERATED GATE RECORD.** Edit `docs/regulatory/records/data/inquiry/IQ-001.yaml`, then run
> `npm run regulatory:build`. This gate cannot close while any required value,
> accepted evidence, upstream dependency, or approval is missing.

| Gate control | Value |
| --- | --- |
| Gate | `IQ-001` |
| Revision | 0.1 |
| Mechanical readiness | **NOT READY** |
| Controlled status | **INCOMPLETE / NOT APPROVED** |
| Exact source baseline | `6b53fde87ff9b193b3c24f7bd93549746b4d6471` |
| Structured source / SHA-256 | `docs/regulatory/records/data/inquiry/IQ-001.yaml` / `f441d4f6deaab565058415c0eb0d97a1b551e43b296fd144dde78c2fa465a1ef` |
| Template / SHA-256 | `docs/regulatory/records/templates/gate.md.mustache` / `7b321ada55239b22972c0795527edcc0a4f635f907e28782762695dcf06194ac` |

IQ-001 is an early classification-inquiry gate, not clinical-release gate G1. It freezes enough exact product fact, intended/represented use and exclusion analysis for Health Canada to assess the current prototype. Closing IQ-001 does not approve patient care, commercialization, implementation quality or residual risk.

## Dependencies

- `Approved G0-01-FRM manufacturer identity and signatory authority`
- `Approved INQ-000 exact prototype baseline`

## Gate fields and exit criteria

| ID | Criterion | Recorded value | Evidence | Required | State |
| --- | --- | --- | --- | --- | --- |
| `IQ1-F01` | Manufacturer legal name/address and Canadian contact | ⟦MISSING: IQ-001.required_fields.IQ1-F01.value⟧ | ⟦MISSING: IQ-001.required_fields.IQ1-F01.evidence_ref⟧ | Yes | Open |
| `IQ1-F02` | Exact prototype full source commit | 6b53fde87ff9b193b3c24f7bd93549746b4d6471 | INQ-000 | Yes | Complete |
| `IQ1-F03` | Intended user and setting | ⟦MISSING: IQ-001.required_fields.IQ1-F03.value⟧ | ⟦MISSING: IQ-001.required_fields.IQ1-F03.evidence_ref⟧ | Yes | Open |
| `IQ1-F04` | Intended use and represented-purpose text | ⟦MISSING: IQ-001.required_fields.IQ1-F04.value⟧ | ⟦MISSING: IQ-001.required_fields.IQ1-F04.evidence_ref⟧ | Yes | Open |
| `IQ1-F05` | Exact inclusion and exclusion boundary | ⟦MISSING: IQ-001.required_fields.IQ1-F05.value⟧ | ⟦MISSING: IQ-001.required_fields.IQ1-F05.evidence_ref⟧ | Yes | Open |
| `IQ1-F06` | Current prototype limitations statement | ⟦MISSING: IQ-001.required_fields.IQ1-F06.value⟧ | ⟦MISSING: IQ-001.required_fields.IQ1-F06.evidence_ref⟧ | Yes | Open |

## 1. Gate boundary

IQ-001 approves the facts used for classification verification: exact functions, intended/represented use, manual-input and independent-review workflow, immediate-use context, four-criterion analysis, published comparison and fallback classification position. It does not approve the prototype's known implementation limitations for patient care.

## Controlled decisions

| ID | Decision required | Decision | Rationale | Evidence | State |
| --- | --- | --- | --- | --- | --- |
| `IQ1-D01` | Does the inquiry candidly ask Health Canada to resolve criterion 3 given immediate medication-preparation use? | ⟦MISSING: IQ-001.decisions.IQ1-D01.decision⟧ | ⟦MISSING: IQ-001.decisions.IQ1-D01.rationale⟧ | ⟦MISSING: IQ-001.decisions.IQ1-D01.evidence_ref⟧ | Open |
| `IQ1-D02` | Does the inquiry compare the exact prototype with Health Canada's independently reviewable drug-calculation example without claiming equivalence as a conclusion? | ⟦MISSING: IQ-001.decisions.IQ1-D02.decision⟧ | ⟦MISSING: IQ-001.decisions.IQ1-D02.rationale⟧ | ⟦MISSING: IQ-001.decisions.IQ1-D02.evidence_ref⟧ | Open |
| `IQ1-D03` | Does the fallback analysis propose and justify a class/rule if Health Canada considers the prototype SaMD? | ⟦MISSING: IQ-001.decisions.IQ1-D03.decision⟧ | ⟦MISSING: IQ-001.decisions.IQ1-D03.rationale⟧ | ⟦MISSING: IQ-001.decisions.IQ1-D03.evidence_ref⟧ | Open |

## Objective evidence

| ID | Evidence | Reference | Status | Required | State |
| --- | --- | --- | --- | --- | --- |
| `IQ1-E01` | Exact prototype baseline and discrepancy/known-limitation list | docs/regulatory/completed/inquiry/INQ-000_EXACT_PROTOTYPE_BASELINE.md | draft | Yes | Open |
| `IQ1-E02` | Approved intended use, function list, workflow and exclusion boundary | ⟦MISSING: IQ-001.evidence.IQ1-E02.reference⟧ | missing | Yes | Open |
| `IQ1-E03` | Pharmacy review of formula, worked example and routine-practice basis | ⟦MISSING: IQ-001.evidence.IQ1-E03.reference⟧ | missing | Yes | Open |
| `IQ1-E04` | Representative nurse review that the submitted workflow is factually realistic | ⟦MISSING: IQ-001.evidence.IQ1-E04.reference⟧ | missing | Yes | Open |
| `IQ1-E05` | Regulatory/counsel review of current guidance, four criteria, fallback rules and questions | ⟦MISSING: IQ-001.evidence.IQ1-E05.reference⟧ | missing | Yes | Open |

## Gate signatures

| Role | Scope | Name / organization | Decision | Date | Signature reference | State |
| --- | --- | --- | --- | --- | --- | --- |
| Legal manufacturer | Approve exact inquiry product, intended/represented use and classification questions | ⟦MISSING: IQ-001.approvals.1.name/organization⟧ | ⟦MISSING: IQ-001.approvals.1.decision⟧ | ⟦MISSING: IQ-001.approvals.1.date⟧ | ⟦MISSING: IQ-001.approvals.1.signature_ref⟧ | Open |
| Regulatory lead or qualified Canadian regulatory reviewer | Approve exclusion and fallback classification analysis against current official guidance | ⟦MISSING: IQ-001.approvals.2.name/organization⟧ | ⟦MISSING: IQ-001.approvals.2.decision⟧ | ⟦MISSING: IQ-001.approvals.2.date⟧ | ⟦MISSING: IQ-001.approvals.2.signature_ref⟧ | Open |
| Pharmacy or medication-safety reviewer | Approve formula, authoritative/routine-practice basis and worked example as factual inputs to classification | ⟦MISSING: IQ-001.approvals.3.name/organization⟧ | ⟦MISSING: IQ-001.approvals.3.decision⟧ | ⟦MISSING: IQ-001.approvals.3.date⟧ | ⟦MISSING: IQ-001.approvals.3.signature_ref⟧ | Open |
| Representative nurse or nursing/human-factors reviewer | Confirm that the submitted workflow and immediate-use description are factually realistic | ⟦MISSING: IQ-001.approvals.4.name/organization⟧ | ⟦MISSING: IQ-001.approvals.4.decision⟧ | ⟦MISSING: IQ-001.approvals.4.date⟧ | ⟦MISSING: IQ-001.approvals.4.signature_ref⟧ | Open |
| Software lead | Confirm every functional and architecture statement matches the exact source baseline | ⟦MISSING: IQ-001.approvals.5.name/organization⟧ | ⟦MISSING: IQ-001.approvals.5.decision⟧ | ⟦MISSING: IQ-001.approvals.5.date⟧ | ⟦MISSING: IQ-001.approvals.5.signature_ref⟧ | Open |
| Quality lead | Confirm record control, evidence trace, discrepancy disclosure and signature completeness | ⟦MISSING: IQ-001.approvals.6.name/organization⟧ | ⟦MISSING: IQ-001.approvals.6.decision⟧ | ⟦MISSING: IQ-001.approvals.6.date⟧ | ⟦MISSING: IQ-001.approvals.6.signature_ref⟧ | Open |

## Gate determination

**NOT READY**

IQ-001 is open. It may close before G1–G8 only after the exact-prototype facts, intended use, exclusions, analysis, clinical facts and required approvals are complete.

Blocking structured items:

- `IQ-001.approvals.1.date`
- `IQ-001.approvals.1.decision`
- `IQ-001.approvals.1.name`
- `IQ-001.approvals.1.organization`
- `IQ-001.approvals.1.signature_ref`
- `IQ-001.approvals.2.date`
- `IQ-001.approvals.2.decision`
- `IQ-001.approvals.2.name`
- `IQ-001.approvals.2.organization`
- `IQ-001.approvals.2.signature_ref`
- `IQ-001.approvals.3.date`
- `IQ-001.approvals.3.decision`
- `IQ-001.approvals.3.name`
- `IQ-001.approvals.3.organization`
- `IQ-001.approvals.3.signature_ref`
- `IQ-001.approvals.4.date`
- `IQ-001.approvals.4.decision`
- `IQ-001.approvals.4.name`
- `IQ-001.approvals.4.organization`
- `IQ-001.approvals.4.signature_ref`
- `IQ-001.approvals.5.date`
- `IQ-001.approvals.5.decision`
- `IQ-001.approvals.5.name`
- `IQ-001.approvals.5.organization`
- `IQ-001.approvals.5.signature_ref`
- `IQ-001.approvals.6.date`
- `IQ-001.approvals.6.decision`
- `IQ-001.approvals.6.name`
- `IQ-001.approvals.6.organization`
- `IQ-001.approvals.6.signature_ref`
- `IQ-001.decisions.IQ1-D01.decision`
- `IQ-001.decisions.IQ1-D01.evidence_ref`
- `IQ-001.decisions.IQ1-D01.rationale`
- `IQ-001.decisions.IQ1-D02.decision`
- `IQ-001.decisions.IQ1-D02.evidence_ref`
- `IQ-001.decisions.IQ1-D02.rationale`
- `IQ-001.decisions.IQ1-D03.decision`
- `IQ-001.decisions.IQ1-D03.evidence_ref`
- `IQ-001.decisions.IQ1-D03.rationale`
- `IQ-001.evidence.IQ1-E01.status`
- `IQ-001.evidence.IQ1-E02.reference`
- `IQ-001.evidence.IQ1-E02.status`
- `IQ-001.evidence.IQ1-E03.reference`
- `IQ-001.evidence.IQ1-E03.status`
- `IQ-001.evidence.IQ1-E04.reference`
- `IQ-001.evidence.IQ1-E04.status`
- `IQ-001.evidence.IQ1-E05.reference`
- `IQ-001.evidence.IQ1-E05.status`
- `IQ-001.required_fields.IQ1-F01.evidence_ref`
- `IQ-001.required_fields.IQ1-F01.value`
- `IQ-001.required_fields.IQ1-F03.evidence_ref`
- `IQ-001.required_fields.IQ1-F03.value`
- `IQ-001.required_fields.IQ1-F04.evidence_ref`
- `IQ-001.required_fields.IQ1-F04.value`
- `IQ-001.required_fields.IQ1-F05.evidence_ref`
- `IQ-001.required_fields.IQ1-F05.value`
- `IQ-001.required_fields.IQ1-F06.evidence_ref`
- `IQ-001.required_fields.IQ1-F06.value`
- `IQ-001.status`

A generated `READY` result is necessary but not sufficient: the accountable
gate owner must confirm the evidence and sign the governing decision.
