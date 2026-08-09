# G0-02-FRM — Quality and software lead authority and competence

> **CONTROLLED TEMPLATE — NOT COMPLETED OR APPROVED.** Complete one role
> packet in this form for the quality lead and one for the software lead. Attach
> objective appointment, qualification, training and assessment evidence. A
> completed form supports G0-02; it does not by itself close G0 or authorize
> clinical use, implementation, release or submission.

## 1. Record control

| Field | Required entry |
| --- | --- |
| Record ID | `G0-02-FRM` |
| Record version | `[ENTER VERSION]` |
| Record status | Draft / In review / Approved / Superseded `[SELECT ONE]` |
| Product and proposed version | `[ENTER]` |
| Repository and exact source baseline | `[ENTER OWNER/REPOSITORY AND FULL COMMIT SHA]` |
| Legal manufacturer | `[ENTER EXACT NAME FROM G0-01-FRM]` |
| G0-01 evidence reference | `[ENTER RECORD VERSION/COMMIT AND APPROVAL STATE]` |
| Record owner | `[ENTER NAME/ROLE]` |
| Preparation date | `[YYYY-MM-DD]` |
| Effective date | `[YYYY-MM-DD OR NOT EFFECTIVE]` |
| Review/renewal date | `[YYYY-MM-DD AND TRIGGER]` |
| Controlled evidence location | `[ENTER IMMUTABLE/AUDITABLE LOCATION]` |

Complete sections 2–6 separately for each appointee. Duplicate the tables or
maintain separately signed annexes if the evidence is access restricted. The
approved form must retain the evidence references and signed conclusions.

G0-01 and G0-02 may be executed as one coordinated packet to avoid circular
approval. Before any appointment is signed, G0-01's independent reviewer must
verify the manufacturer identity and signatory authority and the authorized
manufacturer officer must accept the manufacturer designation. After accepting
appointment, the quality lead completes G0-01's quality countersign. Both final
forms must then be approved against the same product/source baseline.

## 2. Appointee and relationship

| Field | Quality lead | Software lead |
| --- | --- | --- |
| Full legal name | `[ENTER]` | `[ENTER]` |
| Organization/employer | `[ENTER]` | `[ENTER]` |
| Title | `[ENTER]` | `[ENTER]` |
| Employee/contractor/officer/other | `[ENTER]` | `[ENTER]` |
| Contact | `[ENTER CONTROLLED CONTACT]` | `[ENTER CONTROLLED CONTACT]` |
| Start/effective date | `[ENTER]` | `[ENTER]` |
| End/renewal condition | `[ENTER]` | `[ENTER]` |
| Contract/appointment evidence ID | `[EV-ROL-___]` | `[EV-ROL-___]` |
| Proposed delegate/deputy | `[ENTER OR NONE WITH RATIONALE]` | `[ENTER OR NONE WITH RATIONALE]` |

## 3. Authority granted by the legal manufacturer

### 3.1 Quality lead

The manufacturer must grant, and the quality lead must accept, authority to:

| ID | Required quality authority | Granted? | Limitation/escalation path |
| --- | --- | --- | --- |
| QA-A01 | Administer G0–G10, enforce entry/exit criteria and withhold or reopen a gate when evidence or approval is incomplete. | Yes / No | `[ENTER]` |
| QA-A02 | Establish and control document revisions, objective evidence, approval/signature records, access, backup, retention and audit history. | Yes / No | `[ENTER]` |
| QA-A03 | Assign identifiers and accountable owners for findings, changes, anomalies and deviations, and prevent deletion or silent replacement of original evidence. | Yes / No | `[ENTER]` |
| QA-A04 | Require impact assessment, containment, root cause, regression evidence, traceability and qualified specialist review. | Yes / No | `[ENTER]` |
| QA-A05 | Approve or reject finding/anomaly dispositions and record closure within the approved risk and QMS procedures. | Yes / No | `[ENTER]` |
| QA-A06 | Stop a controlled run, build, release, dossier freeze or submission when safety, quality, independence or evidence requirements are unmet. | Yes / No | `[ENTER]` |
| QA-A07 | Enforce separation of implementation, independent verification and final approval, including escalation of conflicts to the manufacturer. | Yes / No | `[ENTER]` |
| QA-A08 | Escalate clinical, regulatory, legal, privacy, security and residual-risk decisions to the authorized specialist or legal manufacturer rather than deciding outside competence. | Yes / No | `[ENTER]` |
| QA-A09 | Have direct access to the authorized manufacturer officer and report quality concerns without retaliation or schedule override. | Yes / No | `[ENTER]` |
| QA-A10 | Verify exact commits/builds/evidence and sign quality determinations without being compelled to approve based only on PR status or green CI. | Yes / No | `[ENTER]` |

Any `No` is blocking unless the manufacturer, independent assessor and quality
lead document an equivalent control that preserves the same decision authority.

### 3.2 Software lead

| ID | Required software authority | Granted? | Limitation/escalation path |
| --- | --- | --- | --- |
| SW-A01 | Control the approved architecture, domain/storage interfaces, source, configuration and build/release implementation. | Yes / No | `[ENTER]` |
| SW-A02 | Enforce branch, dependency, toolchain, build-identity and deployment controls for exact candidates. | Yes / No | `[ENTER]` |
| SW-A03 | Require technical review and verification before accepting implementation changes. | Yes / No | `[ENTER]` |
| SW-A04 | Stop or roll back a build/deployment when integrity, security, availability or calculation behavior is uncertain. | Yes / No | `[ENTER]` |
| SW-A05 | Preserve source/build provenance, SBOM/lockfile information, test environments and reproducible evidence. | Yes / No | `[ENTER]` |
| SW-A06 | Escalate clinical, quality, regulatory, security, privacy and legal decisions rather than deciding outside competence. | Yes / No | `[ENTER]` |
| SW-A07 | Provide quality and independent reviewers access to the source, tooling, logs and evidence needed to reproduce conclusions. | Yes / No | `[ENTER]` |

## 4. Competence criteria and objective evidence

A job title or self-declaration is insufficient. The assessor must evaluate
education, training, skills and experience against the assigned work, identify
gaps and decide whether supervision or additional specialist support is needed.

### 4.1 Quality lead competence assessment

| ID | Required capability | Objective evidence ID | Assessor finding |
| --- | --- | --- | --- |
| QA-C01 | Medical-device or comparably controlled safety-software quality principles appropriate to the proposed Canadian product lifecycle. | `[EV-CMP-___]` | Competent / gap `[ENTER]` |
| QA-C02 | Document, record, configuration, change, anomaly, deviation and release control. | `[EV-CMP-___]` | `[ENTER]` |
| QA-C03 | Risk-management process, control hierarchy, traceability and residual-risk escalation without substituting for clinical judgment. | `[EV-CMP-___]` | `[ENTER]` |
| QA-C04 | Verification planning, objective-evidence review, reproducibility, independence and test/anomaly integrity. | `[EV-CMP-___]` | `[ENTER]` |
| QA-C05 | Software lifecycle concepts sufficient to assess commits, builds, dependencies, CI, formal evidence and configuration records. | `[EV-CMP-___]` | `[ENTER]` |
| QA-C06 | Intended-use, classification and Canadian regulatory-document controls sufficient to identify when regulatory expertise is required. | `[EV-CMP-___]` | `[ENTER]` |
| QA-C07 | Audit-ready approval, electronic-signature, retention, access and revision practices. | `[EV-CMP-___]` | `[ENTER]` |
| QA-C08 | Product-specific training on the calculation boundary, prototype restrictions, gate plan and prohibited clinical claims. | `[EV-TRN-___]` | `[ENTER]` |
| QA-C09 | Ability and organizational standing to challenge schedule/product pressure and exercise stop/withhold authority. | `[EV-CMP-___]` | `[ENTER]` |

### 4.2 Software lead competence assessment

| ID | Required capability | Objective evidence ID | Assessor finding |
| --- | --- | --- | --- |
| SW-C01 | TypeScript/JavaScript and Svelte application architecture relevant to this repository. | `[EV-CMP-___]` | Competent / gap `[ENTER]` |
| SW-C02 | Exact/bounded numeric implementation, validation boundaries, typed error/result modeling and calculation verification. | `[EV-CMP-___]` | `[ENTER]` |
| SW-C03 | Browser storage, migration, offline/service-worker lifecycle and safe failure/recovery behavior. | `[EV-CMP-___]` | `[ENTER]` |
| SW-C04 | Secure static-web delivery, dependency/supply-chain controls, reproducible builds and artifact identity. | `[EV-CMP-___]` | `[ENTER]` |
| SW-C05 | Unit, property, integration, E2E, accessibility and differential/formal conformance testing. | `[EV-CMP-___]` | `[ENTER]` |
| SW-C06 | Controlled software lifecycle, change impact, traceability, anomaly handling and evidence preservation. | `[EV-CMP-___]` | `[ENTER]` |
| SW-C07 | Product-specific training on intended scope, prototype restrictions, numeric risks and escalation boundaries. | `[EV-TRN-___]` | `[ENTER]` |

## 5. Training and gap-closure plan

| Gap/training ID | Role | Required activity and acceptance method | Trainer/assessor | Due date | Blocks appointment? | Completion evidence |
| --- | --- | --- | --- | --- | --- | --- |
| `[TRN-___]` | `[ENTER]` | `[ENTER COURSE, MENTORED EXERCISE, EXAM OR REVIEW]` | `[ENTER]` | `[ENTER]` | Yes / No `[JUSTIFY]` | `[ENTER OR OPEN]` |

An appointment cannot become effective with an open gap that prevents the
person from safely exercising a required authority. Non-blocking development
actions need an owner, due date, supervision and reassessment trigger.

## 6. Independence, conflicts and combined roles

| Question | Quality lead | Software lead |
| --- | --- | --- |
| Other project/manufacturer roles held | `[ENTER]` | `[ENTER]` |
| Employment, financial or delivery-pressure conflict | `[ENTER]` | `[ENTER]` |
| Work products they implement or author | `[ENTER]` | `[ENTER]` |
| Decisions they must not solely approve | `[ENTER]` | `[ENTER]` |
| Independent reviewer used for those decisions | `[ENTER]` | `[ENTER]` |
| Escalation when independence is questioned | `[ENTER]` | `[ENTER]` |

Required controls:

- the requester/implementer may not self-approve final disposition;
- the calculation implementer may not be sole author/approver of the expected-
  value corpus, formal specification and final calculation conclusion;
- the dossier author may not be the sole G9 auditor; and
- if the manufacturer and proposed quality lead are the same natural person,
  an independent qualified assessor must sign the quality competence and
  independence conclusions and the record must identify external escalation.

Independence conclusion and rationale:

`[ENTER ASSESSOR'S ROLE-COMBINATION ANALYSIS AND CONTROLS]`

## 7. Evidence register

| Evidence ID | Evidence type/document | Person covered | Issuer/custodian | Date/version | Assessor verification | Controlled location |
| --- | --- | --- | --- | --- | --- | --- |
| `EV-ROL-___` | Appointment/contract/role description | `[ENTER]` | `[ENTER]` | `[ENTER]` | `[ENTER]` | `[ENTER]` |
| `EV-CMP-___` | CV, qualification, work sample or assessment | `[ENTER]` | `[ENTER]` | `[ENTER]` | `[ENTER]` | `[ENTER]` |
| `EV-TRN-___` | Training and assessed completion | `[ENTER]` | `[ENTER]` | `[ENTER]` | `[ENTER]` | `[ENTER]` |

Sensitive personnel records may remain outside Git. Record an immutable
reference, custodian, access procedure and retention period here.

## 8. Appointment and approval signatures

Signatures must identify this exact version and source baseline. The competence
assessor must be qualified for the role assessed and cannot be the appointee
whose competence they conclude upon.

| Signatory | Required decision | Name/organization | Decision and conditions | Date | Signature/e-approval reference |
| --- | --- | --- | --- | --- | --- |
| Authorized manufacturer officer | Grants the quality lead authorities in QA-A01–QA-A10 and approves independence/escalation controls. | `[ENTER]` | `[ENTER]` | `[ENTER]` | `[ENTER]` |
| Quality lead appointee | Accepts the appointment, duties, stop authority, competence limits and conflict controls. | `[ENTER]` | `[ENTER]` | `[ENTER]` | `[ENTER]` |
| Independent quality competence assessor | Finds the quality lead competent for the stated scope, or lists blocking conditions. | `[ENTER]` | `[ENTER]` | `[ENTER]` | `[ENTER]` |
| Authorized manufacturer officer | Grants the software lead authorities in SW-A01–SW-A07 and approves escalation controls. | `[ENTER]` | `[ENTER]` | `[ENTER]` | `[ENTER]` |
| Software lead appointee | Accepts the appointment, duties, competence limits and conflict controls. | `[ENTER]` | `[ENTER]` | `[ENTER]` | `[ENTER]` |
| Independent software competence assessor | Finds the software lead competent for the stated scope, or lists blocking conditions. | `[ENTER]` | `[ENTER]` | `[ENTER]` | `[ENTER]` |
| Quality record reviewer | Confirms evidence control, required signatures, gap disposition and linkage to GATE-000 without assessing their own competence. | `[ENTER]` | `[ENTER]` | `[ENTER]` | `[ENTER]` |

## 9. Gate-use determination

| Determination | Required entry |
| --- | --- |
| Quality lead appointed, competent and authorized | Yes / No `[SELECT]` |
| Software lead appointed, competent and authorized | Yes / No `[SELECT]` |
| Required independence controls implemented | Yes / No `[SELECT]` |
| Blocking competence/training gaps | None / `[LIST]` |
| G0-02 disposition | Approved / Rejected / Conditional—blocks G0 `[SELECT]` |
| Exact approved record commit | `[ENTER FULL COMMIT SHA]` |
| GATE-000 updated by/date | `[ENTER NAME AND DATE]` |

Only an **Approved** disposition with both appointments effective and no
blocking competence or independence gap may be cited as G0-02 evidence.

## 10. Reassessment triggers

Reassess and revise this record after a role, authority, employer, material
conflict, procedure, intended use, classification route or required competence
changes; after an audit or anomaly questions performance; or at the review date
in section 1. Suspension or vacancy of either role reopens affected gate and
release decisions until an authorized competent replacement is effective.
