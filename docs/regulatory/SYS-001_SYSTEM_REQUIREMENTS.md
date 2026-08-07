# SYS-001 — System requirements

| Field | Value |
| --- | --- |
| Record ID | SYS-001 |
| Status | Draft — G0/G1 open; requirements not approved |
| Owner | Software lead (unassigned) |
| Required approvers | Legal manufacturer, regulatory, pharmacy, nursing/human factors, quality, security/privacy |
| Target | `0.2.0-classification` reference product |
| Draft version/date | 0.1 / 2026-08-07 |

“Shall” below denotes the proposed reference-product requirement, not evidence
that the current prototype conforms. The evidence column is a preliminary
repository observation. CALC-001, STO-001, SEC-001 and VVP-001 will refine these
requirements after G2 without weakening an approved safety boundary.

## 1. Intended use and labelling

| ID | Proposed requirement | Preliminary evidence/status |
| --- | --- | --- |
| USE-001 | The product shall be limited to the intended user, setting and workflow approved in REG-001/REG-002. | Draft definition only; clinical approval absent |
| USE-002 | The product shall accept an already-authorized ordered dose only and shall not select, recommend, validate or modify it. | UI wording present; foreseeable-use validation absent |
| USE-003 | The product shall enforce and disclose every approved patient, medication, setting and preparation exclusion. | Exclusions proposed; no enforcement yet |
| LAB-001 | Every non-authorized build shall display “Prototype only — not for patient care.” on every screen. | Implemented; E2E 001/006 |
| LAB-002 | Every build shall display package version and source revision in a consistent header location. | Implemented; build identity tests exist |
| LAB-003 | Approved intended use, limitations, residual risks, support and version-matched instructions shall be available during offline use. | Not implemented as controlled IFU |
| LAB-004 | User-facing safety information shall be available in approved English and clinically equivalent French for national release. | French absent |
| LAB-005 | Product and promotional text shall use only approved claims in REG-002. | Claims register draft; channel control absent |

## 2. Inputs, calculation and output

| ID | Proposed requirement | Preliminary evidence/status |
| --- | --- | --- |
| INP-001 | The calculation shall use only manually entered/selected values and shall expose no medical-device signal, barcode, OCR, EHR, pharmacy, pump or monitoring interface. | Current architecture appears conforming; controlled proof pending |
| INP-002 | Vial and ordered-dose unit inputs shall each accept exactly `mg` or `mcg`. | Implemented and E2E covered |
| INP-003 | Final prepared volume shall be exactly one of 10, 50, 100, 250, 500 or 1000 mL. | Implemented and E2E covered |
| INP-004 | Required decimal inputs shall retain original text and pass the grammar, precision and magnitude bounds approved in CALC-001 before conversion. | Not implemented |
| INP-005 | Unknown, activity, legacy or malformed units shall be rejected and shall never become compatible by missing/null state. | UI closed set present; storage validation absent |
| CAL-001 | The engine shall calculate vial concentration, prepared concentration, explicit mg/mcg conversion and administration volume using pharmacy-approved formulas. | Current reactive arithmetic present; approval absent |
| CAL-002 | The calculation shall use a bounded exact representation and approved order of operations; every intermediate and output shall be validated. | Not implemented; critical finding FND-C1 |
| CAL-003 | A valid positive result shall never be displayed or reviewed as zero, non-finite or unrepresentable. | Known nonconformance FND-C1 |
| CAL-004 | The engine shall block a final prepared volume below vial volume. | Implemented; E2E covered |
| CAL-005 | The engine shall block an ordered dose above the amount available from one vial and all unsupported multi-vial use. | Implemented for current numeric path; exact verification pending |
| CAL-006 | Exact calculation values shall remain separate from approved display rounding, and every rounding decision shall be disclosed as specified. | Not implemented |
| CAL-007 | Equation operands and final display shall derive from one validated calculation result. | Current UI formats reactive values separately; target absent |
| CAL-008 | Invalid, incomplete, unsupported or out-of-policy input shall produce no actionable mL in the visual or accessibility tree. | Partially implemented/E2E; adversarial boundary incomplete |
| CAL-009 | The product shall perform no dose-range, medication, route, rate, compatibility, stability or clinical-appropriateness check. | Current implementation appears conforming |

## 3. Independent review and state transitions

| ID | Proposed requirement | Preliminary evidence/status |
| --- | --- | --- |
| REV-001 | A calculated mL shall be absent until every currently applicable substituted equation is individually checked. | Implemented and E2E covered |
| REV-002 | Opening or reopening equation review shall start with every equation unchecked. | Implemented and E2E covered |
| REV-003 | Any approved critical input edit shall revoke equation checks, revealed result and acknowledgement. | Implemented for current paths; equivalent-text policy open |
| REV-004 | A history record shall reopen as editable, unconfirmed input and shall not bypass current validation/review. | Implemented; record schema validation absent |
| REV-005 | A favourite shall never store or restore an ordered dose or completed review. | Implemented; schema validation absent |
| REV-006 | Wording and interaction shall not imply that completing in-app review makes the order or result clinically correct. | Draft claims/UX; human-factors evidence absent |

## 4. Local data and privacy

| ID | Proposed requirement | Preliminary evidence/status |
| --- | --- | --- |
| STO-001 | Favourites and history shall conform to versioned approved schemas at every read/write boundary. | Not implemented; FND-H1 |
| STO-002 | Persisted derived values shall not be authoritative; records shall be revalidated and recalculated on reopen. | Not implemented consistently |
| STO-003 | Corrupt, future, unknown or incompatible records shall be rejected/quarantined without disabling valid records or changing a calculation. | Current coarse recovery nonconforming |
| STO-004 | Migrations, retention, deletion, clear-all and recovery shall be deterministic, tested and disclosed. | Incomplete |
| STO-005 | No patient, clinician, facility, encounter, room, order identifier or free-text clinical note shall be requested or stored. | Current data model/E2E appear conforming |
| STO-006 | The UI shall explain that local records are device/browser data with no cloud backup and may be deleted or evicted. | Partial screen wording; complete label absent |
| PRV-001 | The product shall have no account, analytics, telemetry, advertising, crash upload, cloud sync or runtime third-party content. | Current code/network test partially supports |
| PRV-002 | Normal and failure-path operation shall make no unapproved network request after installation. | Current test incomplete relative to target contract |

## 5. Security, availability and configuration

| ID | Proposed requirement | Preliminary evidence/status |
| --- | --- | --- |
| SEC-001 | The release shall enforce an approved restrictive CSP and an explicit runtime network allowlist. | CSP absent; FND-H5/FND-A9 |
| SEC-002 | Dependencies and bundled assets shall be locked, inventoried in an SBOM, licence-reviewed and vulnerability-monitored. | npm lock exists; SBOM/process absent |
| SEC-003 | Verification jobs for untrusted PR code shall have least privilege and shall be separated from privileged deployment. | Current workflow has broad permissions; FND-H3 |
| SEC-004 | Build/release provenance shall tie source, lockfiles, tools, artifact digest, version and displayed revision together. | Version/revision present; artifact provenance incomplete |
| SEC-005 | Unauthorized modification, dependency compromise and corrupted app assets shall be addressed by threat controls and verification. | Threat model absent |
| AVL-001 | After one successful online app-shell installation, the approved supported release shall complete all defined workflows offline. | Basic service worker/E2E present; full matrix incomplete |
| AVL-002 | The product shall not imply that a first visit works offline. | README currently explicit |
| AVL-003 | Cache installation/update shall be atomic; failed updates shall preserve a usable approved prior release and local records. | Design intent; multi-release evidence absent |
| AVL-004 | Storage eviction, cache corruption, rollback, recall, end-of-support and recovery behaviour shall be specified, tested and labelled. | Absent/incomplete |
| AVL-005 | A controlled clinical distribution channel shall identify deployed institution, version, contact and lifecycle state. | No clinical channel; public previews only |
| CFG-001 | Production builds shall fail unless a source revision is available or explicitly supplied by controlled CI. | Implemented in Vite config |
| CFG-002 | E2E builds shall use the explicit fixture revision `e2eha5h` and shall never be treated as release evidence. | Implemented/documented |

## 6. Accessibility and human factors

| ID | Proposed requirement | Preliminary evidence/status |
| --- | --- | --- |
| ACC-001 | The product shall meet WCAG 2.2 AA requirements applicable to the complete supported workflow. | Partial automated evidence only |
| ACC-002 | Every critical state shall reflow and remain operable at required portrait, landscape, tablet, desktop and 200% text/zoom conditions without hidden content. | Known nonconformance FND-C2 |
| ACC-003 | Controls shall expose correct name/role/value, visible focus, keyboard/switch operation, sufficient target size and non-colour state. | Partial E2E/axe evidence |
| ACC-004 | Errors shall identify the field/problem and remove stale actionable output from visual and accessibility trees. | Partially implemented |
| HFE-001 | Representative Canadian nurses shall validate all critical tasks, foreseeable misuse, interruptions, device conditions and safety wording against predetermined criteria. | Not performed |
| HFE-002 | Human-factors evidence shall demonstrate comprehension of final prepared volume, mg/mcg conversion, equation review, unsupported use and local/offline limitations. | Not performed |

## 7. Quality and regulatory lifecycle

| ID | Proposed requirement | Preliminary evidence/status |
| --- | --- | --- |
| QMS-001 | Every released change shall trace from approved need/hazard through requirement, implementation, verification, anomaly disposition and release approval. | Initial TRC-001 incomplete |
| QMS-002 | Known anomalies shall remain open until objective evidence and quality approval support closure. | FND-001 established |
| QMS-003 | Complaints, incidents, vulnerabilities, CAPA, safety communication, field action and recall shall have assigned controlled processes before clinical release. | Processes absent |
| REG-001 | Classification, licence/MDEL route and jurisdictional obligations shall be resolved before clinical distribution or claims. | Classification request not ready/sent |
| REG-002 | The exact approved release shall carry version-matched bilingual labels/IFU and manufacturer/contact information. | Absent |

## 8. Approval and change control

No requirement is frozen while G1 is open. After approval, a change to intended
use, unit set, formulas, input/output, supported population/workflow, platform,
storage, network, offline behaviour or claim requires impact assessment and
reapproval of affected requirements, risks and evidence.

| Role | Name | Decision | Date/signature |
| --- | --- | --- | --- |
| Legal manufacturer | Unassigned | Pending | — |
| Regulatory lead | Unassigned | Pending | — |
| Pharmacy lead | Unassigned | Pending | — |
| Nursing/human-factors lead | Unassigned | Pending | — |
| Security/privacy lead | Unassigned | Pending | — |
| Quality lead | Unassigned | Pending | — |
