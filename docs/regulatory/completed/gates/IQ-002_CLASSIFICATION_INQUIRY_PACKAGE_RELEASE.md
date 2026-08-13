# IQ-002 — Classification inquiry package release

> **INCOMPLETE / NOT APPROVED — GENERATED GATE RECORD.** Edit `docs/regulatory/records/data/inquiry/IQ-002.yaml`, then run
> `npm run regulatory:build`. This gate cannot close while any required value,
> accepted evidence, upstream dependency, or approval is missing.

| Gate control | Value |
| --- | --- |
| Gate | `IQ-002` |
| Revision | 0.1 |
| Mechanical readiness | **NOT READY** |
| Controlled status | **INCOMPLETE / NOT APPROVED** |
| Exact source baseline | `6b53fde87ff9b193b3c24f7bd93549746b4d6471` |
| Structured source / SHA-256 | `docs/regulatory/records/data/inquiry/IQ-002.yaml` / `e994cb0e748310059945fcf519a68e5042cb47a9b1bd30ae354ae6f7c21013ee` |
| Template / SHA-256 | `docs/regulatory/records/templates/gate.md.mustache` / `7b321ada55239b22972c0795527edcc0a4f635f907e28782762695dcf06194ac` |

IQ-002 authorizes one exact hashed classification-verification package to be sent once. It is a narrow pre-submission audit and does not replace G7–G9 for a future clinical release or licence application.

## Dependencies

- `Approved IQ-001`
- `All required SUB-000 through SUB-008 documents mechanically ready and approved`

## Gate fields and exit criteria

| ID | Criterion | Recorded value | Evidence | Required | State |
| --- | --- | --- | --- | --- | --- |
| `IQ2-F01` | Exact package manifest SHA-256 | ⟦MISSING: IQ-002.required_fields.IQ2-F01.value⟧ | ⟦MISSING: IQ-002.required_fields.IQ2-F01.evidence_ref⟧ | Yes | Open |
| `IQ2-F02` | Recipient instruction title, URL, version/effective date and access date | Medical Device Establishment Licence application form instructions (FRM-0292); updated 2025-02-26; current before 2026-12-14 unless superseded; https://www.canada.ca/en/health-canada/services/drugs-health-products/compliance-enforcement/establishment-licences/forms/medical-device-establishment-licence-application-form-instructions-0292.html; accessed 2026-08-13. Pending transition checked: Medical Device Establishment Licence application instructions effective December 14, 2026; effective 2026-12-14; https://www.canada.ca/en/health-canada/services/drugs-health-products/compliance-enforcement/establishment-licences/forms/dec-medical-device-establishment-licence-application-form-instructions-0292.html. | docs/regulatory/evidence/OFFICIAL-SOURCES/MANIFEST.json; refresh with npm run regulatory:sources on the submission day | Yes | Complete |
| `IQ2-F03` | Primary recipient address verified on submission day | meddevices-instrumentsmed@hc-sc.gc.ca, mechanically verified in the current FRM-0292 response captured 2026-08-13; must be refreshed on the actual submission day | docs/regulatory/evidence/OFFICIAL-SOURCES/MANIFEST.json; refresh with npm run regulatory:sources on the submission day | Yes | Complete |
| `IQ2-F04` | Authorized sending mailbox and sender | ⟦MISSING: IQ-002.required_fields.IQ2-F04.value⟧ | ⟦MISSING: IQ-002.required_fields.IQ2-F04.evidence_ref⟧ | Yes | Open |

## 1. Narrow audit scope

Verify manufacturer/contact identity, exact source baseline, intended use, feature and workflow accuracy, screenshots, formula/example, four-criterion analysis, fallback classification, known limitations, current official citations, internal consistency and absence of approval/clinical-use claims. Preserve the exact outgoing message and attachments.

## Controlled decisions

| ID | Decision required | Decision | Rationale | Evidence | State |
| --- | --- | --- | --- | --- | --- |
| `IQ2-D01` | Is this exact package approved to send once as a classification-verification request? | ⟦MISSING: IQ-002.decisions.IQ2-D01.decision⟧ | ⟦MISSING: IQ-002.decisions.IQ2-D01.rationale⟧ | ⟦MISSING: IQ-002.decisions.IQ2-D01.evidence_ref⟧ | Open |

## Objective evidence

| ID | Evidence | Reference | Status | Required | State |
| --- | --- | --- | --- | --- | --- |
| `IQ2-E01` | Generated submission completeness report and package manifest | docs/regulatory/completed/COMPLETENESS.md; MANIFEST.json | draft | Yes | Open |
| `IQ2-E02` | Independent package consistency review findings and closure evidence | ⟦MISSING: IQ-002.evidence.IQ2-E02.reference⟧ | missing | Yes | Open |
| `IQ2-E03` | Submission-day Health Canada routing verification | ⟦MISSING: IQ-002.evidence.IQ2-E03.reference⟧ | missing | Yes | Open |

## Gate signatures

| Role | Scope | Name / organization | Decision | Date | Signature reference | State |
| --- | --- | --- | --- | --- | --- | --- |
| Independent package reviewer | Audit exact generated package for factual and internal consistency | ⟦MISSING: IQ-002.approvals.1.name/organization⟧ | ⟦MISSING: IQ-002.approvals.1.decision⟧ | ⟦MISSING: IQ-002.approvals.1.date⟧ | ⟦MISSING: IQ-002.approvals.1.signature_ref⟧ | Open |
| Regulatory lead | Approve current citations, questions, route and correspondence controls | ⟦MISSING: IQ-002.approvals.2.name/organization⟧ | ⟦MISSING: IQ-002.approvals.2.decision⟧ | ⟦MISSING: IQ-002.approvals.2.date⟧ | ⟦MISSING: IQ-002.approvals.2.signature_ref⟧ | Open |
| Quality lead | Release the exact hashed package after all blocking findings close | ⟦MISSING: IQ-002.approvals.3.name/organization⟧ | ⟦MISSING: IQ-002.approvals.3.decision⟧ | ⟦MISSING: IQ-002.approvals.3.date⟧ | ⟦MISSING: IQ-002.approvals.3.signature_ref⟧ | Open |
| Legal manufacturer | Authorize transmission of the exact package and representations | ⟦MISSING: IQ-002.approvals.4.name/organization⟧ | ⟦MISSING: IQ-002.approvals.4.decision⟧ | ⟦MISSING: IQ-002.approvals.4.date⟧ | ⟦MISSING: IQ-002.approvals.4.signature_ref⟧ | Open |

## Gate determination

**NOT READY**

IQ-002 remains open until the exact generated submission package is complete, independently audited, submission-day routing is recorded and the legal manufacturer authorizes transmission.

Blocking structured items:

- `IQ-002.approvals.1.date`
- `IQ-002.approvals.1.decision`
- `IQ-002.approvals.1.name`
- `IQ-002.approvals.1.organization`
- `IQ-002.approvals.1.signature_ref`
- `IQ-002.approvals.2.date`
- `IQ-002.approvals.2.decision`
- `IQ-002.approvals.2.name`
- `IQ-002.approvals.2.organization`
- `IQ-002.approvals.2.signature_ref`
- `IQ-002.approvals.3.date`
- `IQ-002.approvals.3.decision`
- `IQ-002.approvals.3.name`
- `IQ-002.approvals.3.organization`
- `IQ-002.approvals.3.signature_ref`
- `IQ-002.approvals.4.date`
- `IQ-002.approvals.4.decision`
- `IQ-002.approvals.4.name`
- `IQ-002.approvals.4.organization`
- `IQ-002.approvals.4.signature_ref`
- `IQ-002.decisions.IQ2-D01.decision`
- `IQ-002.decisions.IQ2-D01.evidence_ref`
- `IQ-002.decisions.IQ2-D01.rationale`
- `IQ-002.evidence.IQ2-E01.status`
- `IQ-002.evidence.IQ2-E02.reference`
- `IQ-002.evidence.IQ2-E02.status`
- `IQ-002.evidence.IQ2-E03.reference`
- `IQ-002.evidence.IQ2-E03.status`
- `IQ-002.required_fields.IQ2-F01.evidence_ref`
- `IQ-002.required_fields.IQ2-F01.value`
- `IQ-002.required_fields.IQ2-F04.evidence_ref`
- `IQ-002.required_fields.IQ2-F04.value`
- `IQ-002.status`

A generated `READY` result is necessary but not sufficient: the accountable
gate owner must confirm the evidence and sign the governing decision.
