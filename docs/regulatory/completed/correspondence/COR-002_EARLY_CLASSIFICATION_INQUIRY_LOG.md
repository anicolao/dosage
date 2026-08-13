# COR-002 — Early classification inquiry correspondence log

> **INCOMPLETE / NOT APPROVED.** This document is generated. Edit
> `docs/regulatory/records/data/submission/COR-002.yaml`, not this file. Missing required values are rendered as
> `⟦MISSING: ...⟧`; an incomplete generated document is not an approval.

| Control field | Value |
| --- | --- |
| Record ID | `COR-002` |
| Kind | correspondence |
| Revision | 0.1 |
| Status | **INCOMPLETE / NOT APPROVED** |
| Source baseline | `6b53fde87ff9b193b3c24f7bd93549746b4d6471` |
| Source data | `docs/regulatory/records/data/submission/COR-002.yaml` |
| Template | `docs/regulatory/records/templates/record.md.mustache` |
| Source-data SHA-256 | `cc8757cd343bd5b811f859653ba410b9dc65d9cd82c5fc55b1ca32d4bedd7729` |
| Template SHA-256 | `99f7fedc1d2cb5ba9edc70a721182801f48f96b538f91b43eaa6a6d9fba0328d` |

Submission-day routing, transmission, acknowledgement and response control for the early exact-prototype classification-verification request.

## Required record fields

| ID | Field | Value | Evidence | Required | State |
| --- | --- | --- | --- | --- | --- |
| `COR-F01` | Applicable official instruction title/URL/version/effective/access dates | Medical Device Establishment Licence application form instructions (FRM-0292); updated 2025-02-26; current before 2026-12-14 unless superseded; https://www.canada.ca/en/health-canada/services/drugs-health-products/compliance-enforcement/establishment-licences/forms/medical-device-establishment-licence-application-form-instructions-0292.html; accessed 2026-08-13. Pending transition checked: Medical Device Establishment Licence application instructions effective December 14, 2026; effective 2026-12-14; https://www.canada.ca/en/health-canada/services/drugs-health-products/compliance-enforcement/establishment-licences/forms/dec-medical-device-establishment-licence-application-form-instructions-0292.html. | docs/regulatory/evidence/OFFICIAL-SOURCES/MANIFEST.json; refresh with npm run regulatory:sources on the submission day | Yes | Complete |
| `COR-F02` | Verified primary address | meddevices-instrumentsmed@hc-sc.gc.ca, mechanically verified in the current FRM-0292 response captured 2026-08-13; must be refreshed on the actual submission day | docs/regulatory/evidence/OFFICIAL-SOURCES/MANIFEST.json; refresh with npm run regulatory:sources on the submission day | Yes | Complete |
| `COR-F03` | Outgoing sender/mailbox/date/time/time zone/message ID | ⟦MISSING: COR-002.required_fields.COR-F03.value⟧ | ⟦MISSING: COR-002.required_fields.COR-F03.evidence_ref⟧ | Yes | Open |
| `COR-F04` | Exact outgoing package digest | ⟦MISSING: COR-002.required_fields.COR-F04.value⟧ | ⟦MISSING: COR-002.required_fields.COR-F04.evidence_ref⟧ | Yes | Open |
| `COR-F05` | Health Canada acknowledgement/reference | ⟦MISSING: COR-002.required_fields.COR-F05.value⟧ | ⟦MISSING: COR-002.required_fields.COR-F05.evidence_ref⟧ | Yes | Open |

## 1. Routing control

Verify the then-current official classification-request instruction on the sending day. Record the pending 2026-12-14 FRM-0292 transition where applicable. Send one request to the designated primary address; do not duplicate it to older SaMD-guidance contacts unless redirected.

## 2. Correspondence chronology

⟦MISSING: COR-002.sections.2.body⟧

## 3. Health Canada response and controlling assumptions

⟦MISSING: COR-002.sections.3.body⟧

## Decisions

| ID | Question | Decision | Rationale | Evidence | State |
| --- | --- | --- | --- | --- | --- |
| `COR-D01` | Has every response/question been assigned, preserved and assessed for product/plan impact? | ⟦MISSING: COR-002.decisions.COR-D01.decision⟧ | ⟦MISSING: COR-002.decisions.COR-D01.rationale⟧ | ⟦MISSING: COR-002.decisions.COR-D01.evidence_ref⟧ | Open |

## Evidence register

| ID | Evidence | Reference | Status | Required | State |
| --- | --- | --- | --- | --- | --- |
| `COR-E01` | Exact outgoing message and delivery evidence | ⟦MISSING: COR-002.evidence.COR-E01.reference⟧ | missing | Yes | Open |
| `COR-E02` | Exact acknowledgement and complete response thread | ⟦MISSING: COR-002.evidence.COR-E02.reference⟧ | missing | Yes | Open |

## Approvals

| Role | Approval scope | Name / organization | Decision | Date | Signature or controlled approval reference | State |
| --- | --- | --- | --- | --- | --- | --- |
| Regulatory lead | Certify routing and correspondence log completeness | ⟦MISSING: COR-002.approvals.1.name/organization⟧ | ⟦MISSING: COR-002.approvals.1.decision⟧ | ⟦MISSING: COR-002.approvals.1.date⟧ | ⟦MISSING: COR-002.approvals.1.signature_ref⟧ | Open |
| Quality lead | Verify package/message identity and response impact control | ⟦MISSING: COR-002.approvals.2.name/organization⟧ | ⟦MISSING: COR-002.approvals.2.decision⟧ | ⟦MISSING: COR-002.approvals.2.date⟧ | ⟦MISSING: COR-002.approvals.2.signature_ref⟧ | Open |

## Change and reassessment triggers

- New outgoing/incoming correspondence or routing instruction

## Completion determination

**Generated determination:** NOT READY

This record is intentionally event-driven. Complete it only after IQ-002 by running the official-source refresh on the sending day, recording the exact transmitted package/message and preserving Health Canada's acknowledgement and response with attributable regulatory/quality authorization.

Required items still open:

- `COR-002.approvals.1.date`
- `COR-002.approvals.1.decision`
- `COR-002.approvals.1.name`
- `COR-002.approvals.1.organization`
- `COR-002.approvals.1.signature_ref`
- `COR-002.approvals.2.date`
- `COR-002.approvals.2.decision`
- `COR-002.approvals.2.name`
- `COR-002.approvals.2.organization`
- `COR-002.approvals.2.signature_ref`
- `COR-002.decisions.COR-D01.decision`
- `COR-002.decisions.COR-D01.evidence_ref`
- `COR-002.decisions.COR-D01.rationale`
- `COR-002.evidence.COR-E01.reference`
- `COR-002.evidence.COR-E01.status`
- `COR-002.evidence.COR-E02.reference`
- `COR-002.evidence.COR-E02.status`
- `COR-002.required_fields.COR-F03.evidence_ref`
- `COR-002.required_fields.COR-F03.value`
- `COR-002.required_fields.COR-F04.evidence_ref`
- `COR-002.required_fields.COR-F04.value`
- `COR-002.required_fields.COR-F05.evidence_ref`
- `COR-002.required_fields.COR-F05.value`
- `COR-002.sections.2.body`
- `COR-002.sections.3.body`
- `COR-002.status`

The generated determination is mechanical. It does not replace the required
human decision, signature, evidence review, or governing gate procedure.
