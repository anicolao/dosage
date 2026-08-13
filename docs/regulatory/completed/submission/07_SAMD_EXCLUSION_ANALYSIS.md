# SUB-007 — SaMD exclusion analysis

> **INCOMPLETE / NOT APPROVED — GENERATED CLASSIFICATION-INQUIRY DOCUMENT.** This is not
> authorization, licensing, clearance, or permission for patient care. Edit
> `docs/regulatory/records/data/submission/SUB-007.yaml`; do not edit this generated file.

| Package control | Value |
| --- | --- |
| Document ID | `SUB-007` |
| Revision | 0.1 |
| Document status | **INCOMPLETE / NOT APPROVED** |
| Package readiness | **NOT READY** |
| Exact prototype baseline | `6b53fde87ff9b193b3c24f7bd93549746b4d6471` |
| Structured source / SHA-256 | `docs/regulatory/records/data/submission/SUB-007.yaml` / `65d43d39618f93833275f44ec0aed5aceb7ca99ee511977b87d61747c751c7dc` |
| Template / SHA-256 | `docs/regulatory/records/templates/submission.md.mustache` / `e8ca736dd37df3c77076e5355d01d1dcf34927304e42b852884b2fca7e14decd` |

Manufacturer's assessment of all four Health Canada exclusion criteria for the exact prototype. Criterion 3 is an explicit determination request.

## Package fields

| ID | Field | Value | Evidence | State |
| --- | --- | --- | --- | --- |
| `EXC-F01` | Current official guidance title/URL/version/access date | Guidance Document: Software as a Medical Device (SaMD): Definition and Classification; effective 2019-12-18; https://www.canada.ca/en/health-canada/services/drugs-health-products/medical-devices/application-information/guidance-documents/software-medical-device-guidance-document.html; content SHA-256 63b663a9bdb96e57e8bb036808e333131a6aa54d3d79341b601b6047f8459896; accessed 2026-08-13 | docs/regulatory/evidence/OFFICIAL-SOURCES/MANIFEST.json; refresh with npm run regulatory:sources on the submission day | Complete |
| `EXC-F02` | Current official classification-examples title/URL/version/access date | Guidance Document: Software as a Medical Device (SaMD): Classification Examples; effective 2019-12-18; updated 2022-11-15; https://www.canada.ca/content/dam/hc-sc/documents/services/drugs-health-products/medical-devices/application-information/guidance-documents/software-medical-device-guidance/examples/examples.pdf; content SHA-256 b7ca89ef726135bc8ea306c227cc362a84570037a68c70cadd802db16c93c48e; accessed 2026-08-13 | docs/regulatory/evidence/OFFICIAL-SOURCES/MANIFEST.json; refresh with npm run regulatory:sources on the submission day | Complete |

## 1. Criterion 1 — no image/IVD/signal processing

Proposed met. The exact prototype accepts manual text/selections only and has no camera, image, IVD, monitoring-device or signal-acquisition input.

## 2. Criterion 2 — displays or analyzes routinely used medical information

Proposed met, subject to pharmacy confirmation. It performs established dimensional arithmetic on manually entered vial-label facts, a selected final volume and an already-authorized ordered dose. It contains no drug library or novel patient-specific algorithm.

## 3. Criterion 3 — only supports decision making

Ambiguous and submitted for Health Canada determination. The prototype does not select, assess or recommend treatment, but the calculated mL may be acted on immediately or in the near term during medication preparation. Health Canada's guidance associates immediate/near-term action with driving clinical/patient management.

## 4. Criterion 4 — does not replace clinical judgement

Proposed met in functional concept. The user sees every substituted equation and must check each before the result is revealed. The prototype resembles Health Canada's published example of manually entered drug- label calculation that can be independently reviewed, but known numeric and usability limitations are disclosed and equivalence is not assumed.

## 5. Overall manufacturer position

Draft position for manufacturer/regulatory authorization: criteria 1 and 2 are proposed met from source/function facts; criterion 4 is proposed met in functional concept because every substituted equation is exposed for review; criterion 3 is not assumed met because the mL may be used immediately or in the near term. The request therefore asks Health Canada to verify exclusion rather than asserting a non-device conclusion.

## Classification decisions represented

| ID | Question | Position/decision | Rationale | Evidence | State |
| --- | --- | --- | --- | --- | --- |
| `EXC-D01` | Does the manufacturer conclude all four criteria are met, while requesting verification of criterion 3? | ⟦MISSING: SUB-007.decisions.EXC-D01.decision⟧ | ⟦MISSING: SUB-007.decisions.EXC-D01.rationale⟧ | ⟦MISSING: SUB-007.decisions.EXC-D01.evidence_ref⟧ | Open |

## Supporting evidence

| ID | Evidence | Reference | Status | State |
| --- | --- | --- | --- | --- |
| `EXC-E01` | Current official guidance and example response metadata/content hashes | docs/regulatory/evidence/OFFICIAL-SOURCES/MANIFEST.json; README.md | reviewed | Open |
| `EXC-E02` | Regulatory/counsel review of each criterion against exact facts | ⟦MISSING: SUB-007.evidence.EXC-E02.reference⟧ | missing | Open |

## Review and authorization

| Role | Review scope | Name / organization | Decision | Date | Signature reference | State |
| --- | --- | --- | --- | --- | --- | --- |
| Regulatory lead or qualified Canadian regulatory reviewer | Approve current four-criterion assessment | ⟦MISSING: SUB-007.approvals.1.name/organization⟧ | ⟦MISSING: SUB-007.approvals.1.decision⟧ | ⟦MISSING: SUB-007.approvals.1.date⟧ | ⟦MISSING: SUB-007.approvals.1.signature_ref⟧ | Open |
| Legal manufacturer | Adopt the assessment and explicit uncertainty as its position | ⟦MISSING: SUB-007.approvals.2.name/organization⟧ | ⟦MISSING: SUB-007.approvals.2.decision⟧ | ⟦MISSING: SUB-007.approvals.2.date⟧ | ⟦MISSING: SUB-007.approvals.2.signature_ref⟧ | Open |

## Document determination

**NOT READY**

Official source identity and the draft four-criterion position are complete. A qualified Canadian regulatory reviewer and the legal manufacturer must approve the current analysis and explicit criterion 3 uncertainty.

Required items still open:

- `SUB-007.approvals.1.date`
- `SUB-007.approvals.1.decision`
- `SUB-007.approvals.1.name`
- `SUB-007.approvals.1.organization`
- `SUB-007.approvals.1.signature_ref`
- `SUB-007.approvals.2.date`
- `SUB-007.approvals.2.decision`
- `SUB-007.approvals.2.name`
- `SUB-007.approvals.2.organization`
- `SUB-007.approvals.2.signature_ref`
- `SUB-007.decisions.EXC-D01.decision`
- `SUB-007.decisions.EXC-D01.evidence_ref`
- `SUB-007.decisions.EXC-D01.rationale`
- `SUB-007.evidence.EXC-E01.status`
- `SUB-007.evidence.EXC-E02.reference`
- `SUB-007.evidence.EXC-E02.status`
- `SUB-007.status`
