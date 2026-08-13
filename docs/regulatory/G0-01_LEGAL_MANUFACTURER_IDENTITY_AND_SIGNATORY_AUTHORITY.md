# G0-01-FRM — Legal manufacturer identity and signatory authority

> **CONTROLLED TEMPLATE — NOT COMPLETED OR APPROVED.** Replace every
> `[ENTER ...]`, select every applicable decision and attach the cited evidence.
> A completed form supports G0-01; it does not by itself close G0, establish
> intellectual-property rights, determine classification or authorize patient
> care, submission or distribution.

## 1. Record control

| Field | Required entry |
| --- | --- |
| Record ID | `G0-01-FRM` |
| Record version | `[ENTER VERSION]` |
| Record status | Draft / In review / Approved / Superseded `[SELECT ONE]` |
| Product | `[ENTER CONTROLLED PRODUCT NAME AND PROPOSED VERSION]` |
| Repository | `[ENTER OWNER/REPOSITORY AND CANONICAL URL]` |
| Exact source baseline | `[ENTER FULL COMMIT SHA]` |
| Prepared by | `[ENTER NAME, ROLE AND ORGANIZATION]` |
| Preparation date | `[YYYY-MM-DD]` |
| Effective date | `[YYYY-MM-DD OR NOT EFFECTIVE]` |
| Supersedes | `[ENTER RECORD ID/VERSION OR NONE]` |
| Controlled evidence location | `[ENTER IMMUTABLE/AUDITABLE LOCATION]` |

The approved record and every attachment must be retained together. Corrections
after approval require a new revision, reason for change and reassessment of
G0/G1 and any later gate that relied on the former manufacturer or signatory.

## 2. Legal manufacturer identity

| Identity field | Required entry | Evidence ID |
| --- | --- | --- |
| Full legal name | `[ENTER EXACT REGISTERED NAME]` | `[EV-MFR-___]` |
| Entity type | Corporation / partnership / sole proprietorship / individual / other `[SPECIFY]` | `[EV-MFR-___]` |
| Jurisdiction of formation/registration | `[ENTER JURISDICTION]` | `[EV-MFR-___]` |
| Incorporation/registration number | `[ENTER NUMBER OR DOCUMENTED N/A]` | `[EV-MFR-___]` |
| Canada Revenue Agency business number, if applicable | `[ENTER NUMBER OR DOCUMENTED N/A]` | `[EV-MFR-___]` |
| Registered office address | `[ENTER COMPLETE ADDRESS]` | `[EV-MFR-___]` |
| Principal operating address | `[ENTER COMPLETE ADDRESS OR SAME]` | `[EV-MFR-___]` |
| Canadian regulatory correspondence address | `[ENTER COMPLETE ADDRESS]` | `[EV-MFR-___]` |
| General telephone/email | `[ENTER CONTROLLED CONTACT]` | `[EV-MFR-___]` |
| Website, if represented as official | `[ENTER URL OR NONE]` | `[EV-MFR-___]` |
| Trade/product names used | `[ENTER NAMES OR NONE]` | `[EV-MFR-___]` |

Attach a current official registry extract, certificate or equivalent evidence.
Record its issuing authority, retrieval date and, where available, verification
URL. A screenshot or repository profile alone is insufficient.

## 3. Manufacturer designation and responsibility

The authorized manufacturer officer must initial each statement or record a
specific exception. An exception is blocking unless the quality and regulatory
leads document why it does not affect G0.

| ID | Manufacturer statement | Initials / exception and action |
| --- | --- | --- |
| MFR-01 | The entity above designates itself as legal manufacturer of the exact proposed product and baseline identified in section 1. | `[ENTER]` |
| MFR-02 | It accepts accountability for the product definition, quality controls, regulatory representations and controlled classification correspondence made in its name. | `[ENTER]` |
| MFR-03 | It has or will obtain the personnel, contracts and practical control needed to maintain, correct, suspend distribution and support field action or recall. | `[ENTER]` |
| MFR-04 | It will not represent this prototype or classification request as Health Canada authorization or permission for patient care. | `[ENTER]` |
| MFR-05 | It will preserve the controlled records and objective evidence supporting gate decisions and regulatory correspondence. | `[ENTER]` |
| MFR-06 | It will ensure that changes to its identity, address, authority or product responsibility are assessed and controlled before further reliance on this record. | `[ENTER]` |
| MFR-07 | Ownership, contributor rights, GPL-3.0 obligations and distribution authority remain subject to G0-03/G0-04 and IP-001; this designation does not prejudge counsel's conclusion. | `[ENTER]` |

## 4. Authorized signatory

| Field | Required entry | Evidence ID |
| --- | --- | --- |
| Full legal name | `[ENTER NAME]` | `[EV-SIG-___]` |
| Title/office | `[ENTER TITLE]` | `[EV-SIG-___]` |
| Relationship to manufacturer | Director / officer / employee / agent / other `[SPECIFY]` | `[EV-SIG-___]` |
| Authority source | Bylaw / board resolution / delegation / power of attorney / statute / other `[SPECIFY]` | `[EV-SIG-___]` |
| Scope of authority | `[IDENTIFY GATE, PRODUCT, SUBMISSION AND CORRESPONDENCE AUTHORITY]` | `[EV-SIG-___]` |
| Effective date | `[YYYY-MM-DD]` | `[EV-SIG-___]` |
| Expiry/revocation condition | `[ENTER DATE/CONDITION OR NONE]` | `[EV-SIG-___]` |
| Signature method | Wet ink / controlled electronic signature `[DESCRIBE]` | `[EV-SIG-___]` |

Attach the executed resolution, delegation or equivalent evidence. If a sole
director, sole proprietor or individual signs their own designation, attach
objective registry evidence and an independent corporate/legal verification of
the authority basis; self-assertion alone does not close the record.

## 5. Accountable contacts and continuity

| Function | Primary person/contact | Delegate | Authority/appointment record |
| --- | --- | --- | --- |
| Legal manufacturer officer | `[ENTER]` | `[ENTER OR NONE]` | `[EV-___]` |
| Quality lead | `[ENTER OR PENDING G0-02]` | `[ENTER OR PENDING]` | `G0-02-FRM [VERSION]` |
| Software lead | `[ENTER OR PENDING G0-02]` | `[ENTER OR PENDING]` | `G0-02-FRM [VERSION]` |
| Regulatory correspondence owner | `[ENTER OR PENDING G1]` | `[ENTER OR PENDING]` | `[EV-___]` |
| Records custodian | `[ENTER]` | `[ENTER]` | `[EV-___]` |

Describe how controlled records, regulatory messages and product responsibility
remain available during absence, termination, corporate change or transfer:

`[ENTER CONTINUITY AND SUCCESSION ARRANGEMENT]`

## 6. Evidence register

| Evidence ID | Document/source | Issuer/custodian | Date/version | Verification performed | Controlled location |
| --- | --- | --- | --- | --- | --- |
| `EV-MFR-___` | `[ENTER]` | `[ENTER]` | `[ENTER]` | `[ENTER BY WHOM/WHEN]` | `[ENTER]` |
| `EV-SIG-___` | `[ENTER]` | `[ENTER]` | `[ENTER]` | `[ENTER BY WHOM/WHEN]` | `[ENTER]` |

Add rows as necessary. Sensitive registry or identity records may be retained in
an access-controlled quality repository rather than Git, but this form must
identify their immutable reference, custodian, access procedure and retention.

## 7. Open discrepancies and disposition

| ID | Missing, inconsistent or expiring item | Owner | Due date | Gate impact | Resolution evidence |
| --- | --- | --- | --- | --- | --- |
| `[MFR-GAP-___]` | `[ENTER OR STATE NONE AFTER REVIEW]` | `[ENTER]` | `[ENTER]` | Blocking / non-blocking `[JUSTIFY]` | `[ENTER]` |

G0-01 cannot be approved with an unresolved discrepancy affecting legal
identity, manufacturer designation, Canadian contact information or signatory
authority.

## 8. Review and approval

Each signature must identify the exact record version, source baseline and any
conditions. A GitHub approval, merge, checkbox or CI result is not a signature.

| Signatory | Required decision | Name/organization | Decision and conditions | Date | Signature/e-approval reference |
| --- | --- | --- | --- | --- | --- |
| Preparer | Information and evidence register are complete and internally consistent. | `[ENTER]` | `[ENTER]` | `[ENTER]` | `[ENTER]` |
| Independent identity/authority reviewer (corporate counsel, corporate secretary or equivalently qualified reviewer) | Official identity and signatory-authority evidence are authentic, current and sufficient for the stated scope. | `[ENTER]` | `[ENTER]` | `[ENTER]` | `[ENTER]` |
| Authorized manufacturer officer | Designates the entity as legal manufacturer and accepts section 3 responsibilities for the exact product/baseline. | `[ENTER]` | `[ENTER]` | `[ENTER]` | `[ENTER]` |
| Quality lead | Confirms completeness, discrepancy closure, evidence control and linkage to GATE-000; does not supply the legal identity conclusion. | `[ENTER]` | `[ENTER]` | `[ENTER]` | `[ENTER]` |

G0-01 and G0-02 may be approved as one coordinated packet. In that case, the
independent reviewer and manufacturer officer sign G0-01 first, the manufacturer
uses that verified authority to execute the G0-02 appointments, and the newly
effective quality lead then performs the G0-01 completeness countersign. All
signatures and both final dispositions are required before either form is cited
as gate-clearing evidence.

## 9. Gate-use determination

| Determination | Required entry |
| --- | --- |
| All required fields completed | Yes / No `[SELECT]` |
| All evidence verified and controlled | Yes / No `[SELECT]` |
| All required signatures attributable and valid | Yes / No `[SELECT]` |
| Blocking discrepancies | None / `[LIST]` |
| G0-01 disposition | Approved / Rejected / Conditional—blocks G0 `[SELECT]` |
| Exact approved record commit | `[ENTER FULL COMMIT SHA]` |
| GATE-000 updated by/date | `[ENTER NAME AND DATE]` |

Only an **Approved** disposition with no blocking discrepancy may be cited as
the G0-01 evidence in `GATE-000_CONTROLLED_PROTOTYPE.md`.
