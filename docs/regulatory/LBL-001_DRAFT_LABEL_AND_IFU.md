# LBL-001 — Draft classification label and instructions for use

> **DRAFT STRUCTURE — NOT CLINICALLY REVIEWED, TRANSLATED, APPROVED OR RELEASED.**
> Bracketed fields are mandatory decisions, not text to expose to users. Do not
> generate or infer French safety content from this template.

| Control field | Value |
| --- | --- |
| Legal manufacturer / address | `[TBD]` |
| Product / reference version | Dosage / `0.2.0-classification` (proposed) |
| Frozen source / artifact / label digest | `[TBD AT G8]` |
| English source revision / approval | `[TBD]` |
| Qualified French translator / source revision | `[TBD — HUMAN TRANSLATION REQUIRED]` |
| Independent French clinical reviewer / approval | `[TBD]` |
| Regulatory/support/safety contacts | `[TBD]` |
| Status/effective date | Draft / none |

## 1. Labelling boundary

This record is the proposed controlled source for version-matched user safety
information included in the application, offline app shell and classification
package. It must use only approved REG-001/REG-002 content and evidence for the
exact G8 build. It is not final market labelling, training, institutional
policy, a medical order or proof of Health Canada authorization.

Until a later authorized distribution gate explicitly replaces it, every
screen and every copy of these instructions must retain:

> **Prototype only — not for patient care.**

## 2. Exact-build identification

The final rendered label/IFU must expose and be verified against:

| Item | Approved user-facing value | Controlled source/evidence |
| --- | --- | --- |
| Product name and version | `[TBD]` | G8 release manifest |
| Source revision | `[TBD FULL HASH; DISPLAYED SHORT HASH]` | G8/VVR-001 identity evidence |
| Legal manufacturer and address | `[TBD]` | Manufacturer/legal record |
| Support and safety contact | `[TBD]` | Approved operating process |
| Issue/effective/superseded date | `[TBD]` | Label change history |
| Intended distribution/status statement | `[TBD — MUST NOT IMPLY AUTHORIZATION]` | Regulatory approval |

The UI, web-app manifest, offline copy, printable/electronic instructions,
screenshots and dossier summary must agree. A stale or mismatched label blocks
G8.

## 3. English master content awaiting approval

### 3.1 Intended use

`[TBD — COPY THE APPROVED REG-002 INTENDED USE VERBATIM IN SUBSTANCE; INCLUDE
TRAINED USER, ALREADY-AUTHORIZED DOSE, MANUAL INPUTS, ONE-VIAL MG/MCG ARITHMETIC,
FINAL PREPARED VOLUME AND INDEPENDENT REVIEW.]`

### 3.2 Intended users, environment and prerequisites

`[TBD — APPROVED NURSING ROLE/COMPETENCE, CARE SETTINGS, TRAINING, SUPPORTED
MANAGED DEVICES/BROWSERS, REQUIRED PRODUCT INFORMATION/ORDER AND INSTITUTIONAL
DOUBLE-CHECK/FALLBACK.]`

### 3.3 Contraindications, limitations and excluded uses

The approved text must address, without relying on a disclaimer as the only
control:

- no prescribing, dose selection, dose-range/order/clinical-appropriateness
  checking or recommendation;
- no activity units, multi-vial/infusion/continuous-rate workflow, drug/patient
  logic, device signals, EHR/pharmacy/pump integration or cloud processing;
- approved medication, patient, route, preparation, concentration, final-
  volume, magnitude, precision and measurable-output boundaries;
- one-vial quantity ceiling and the distinction between final prepared volume,
  diluent added, nominal container volume, overfill, displacement and dead
  space; and
- required external product information, pharmacy instructions, independent
  double check and non-software fallback.

Exact approved wording: `[TBD FROM REG-002/CALC-001/RMF-001]`.

### 3.4 Calculation and independent-review workflow

The version-matched instructions must show the approved sequence:

1. confirm the task is within intended use and all external source information
   is current and authorized;
2. enter the exact vial amount/unit, vial volume, final prepared volume and
   ordered amount/unit without prohibited normalization;
3. resolve every blocked/error state before proceeding;
4. independently compare each substituted equation and input with its source;
5. check every current equation; understand that any critical edit revokes the
   review and result;
6. use the revealed mL result only within the approved workflow and required
   institutional controls; and
7. retain the non-software calculation/preparation process when the app,
   storage, network installation or supported device is unavailable.

Final equation examples, screenshots and wording: `[TBD — MUST COME FROM THE
G5/G7/G8 EXACT BUILD AND INDEPENDENTLY VERIFIED CORPUS]`.

### 3.5 Warnings, error states and residual uncertainty

`[TBD — APPROVED REG-002/RMF-001 WARNINGS, INCLUDING INPUT/UNIT/PRECISION/
MAGNITUDE, ONE-VIAL/FINAL-VOLUME, ROUNDING/MEASURABILITY, UNSUPPORTED WORKFLOW,
STALE BUILD, STORAGE/OFFLINE/UPDATE AND ACCESSIBILITY/FALLBACK INFORMATION.]`

The text must explain that equation checking confirms only that the displayed
arithmetic reflects current entries. It does not validate the order, source
data, drug, preparation, clinical appropriateness or institutional policy.

### 3.6 Local favourites and history, if retained

`[TBD FROM APPROVED G1/STO-001/SEC-001 — AUTHORITATIVE SOURCE FIELDS,
RECOMPUTATION/REVIEW, DEVICE-ONLY LIMITS, RETENTION/DELETION, SHARED/LOST DEVICE,
UNAVAILABLE/CORRUPT/EVICTED STORAGE AND NO BACKUP/EXPORT CLAIM.]`

Saved data must never be described as a verified order or result. UI copy must
use the approved “Stored on this device only” language without overstating the
absence of host access logs or other browser/institution metadata.

### 3.7 Installation, offline use, update and recovery

`[TBD FROM APPROVED REG-001/SEC-001/VVR-001 — FIRST ONLINE INSTALLATION,
SUPPORTED HOME-SCREEN/INSTITUTIONAL STEPS, OFFLINE-READY STATUS, UPDATE/
ACTIVATION/ROLLBACK, STORAGE EVICTION, RECOVERY, END OF SUPPORT/RECALL AND
NON-SOFTWARE FALLBACK.]`

Do not claim first-visit offline operation, uninterrupted availability or
direct iOS home-screen installation from a URL without user/institution action.

### 3.8 Support, discrepancy and safety reporting

`[TBD — VERSION-MATCHED SUPPORT HOURS/CONTACT, INFORMATION TO RECORD WITHOUT
PATIENT DATA, STOP-USE/FALLBACK INSTRUCTION, VULNERABILITY/PRIVACY/SAFETY
ESCALATION AND APPLICABLE INSTITUTIONAL REPORTING.]`

Classification-stage contact text must not imply that clinical complaint,
incident, CAPA, field-action or recall operations already exist when QMS-003
remains open.

## 4. French translation and independent clinical review

French content: `[TBD — DO NOT MACHINE-FILL]`.

The qualified translator works from the final approved English revision. A
different qualified French-speaking pharmacy/nursing reviewer assesses
clinical equivalence, terminology, units/equations, warnings, limitations,
fallback and comprehension. Differences are corrected in the controlled
master; they are not accepted through an annotation or disclaimer.

| Review item | Translator evidence | Independent clinical review | Status |
| --- | --- | --- | --- |
| Source revision and translation method | `[TBD]` | `[TBD]` | Not started |
| Intended use/users/settings | `[TBD]` | `[TBD]` | Not started |
| Units/formula/examples | `[TBD]` | `[TBD]` | Not started |
| Limitations/warnings/fallback | `[TBD]` | `[TBD]` | Not started |
| Offline/storage/update/support | `[TBD]` | `[TBD]` | Not started |
| Exact-build fit/reflow/accessibility | `[TBD]` | `[TBD]` | Not started |

## 5. Channel and exact-build verification

Before G8/G9, verify the approved meaning across UI, offline IFU, manifest,
repository/public prototype copy, screenshots, training draft, package
attachment 06 and any procurement/demo material. Each channel must identify
an owner, revision, exact build and evidence result.

| Channel/state | English revision/result | French revision/result | Exact-build evidence | Owner/approval |
| --- | --- | --- | --- | --- |
| UI: input, error, review and result | `[TBD]` | `[TBD]` | `[TBD]` | `[TBD]` |
| Favourites/history and storage failure | `[TBD]` | `[TBD]` | `[TBD]` | `[TBD]` |
| Offline/install/update/recovery | `[TBD]` | `[TBD]` | `[TBD]` | `[TBD]` |
| Offline electronic IFU | `[TBD]` | `[TBD]` | `[TBD]` | `[TBD]` |
| Classification attachment 06 | `[TBD]` | `[TBD]` | `[TBD]` | `[TBD]` |

## 6. Approval and change control

No approval row may be completed until all bracketed clinical/safety fields are
resolved and exact-build verification is complete. Any change to intended use,
scope, formula, units, numeric/display rules, workflow, storage, platform,
offline lifecycle, residual risk, manufacturer/contact, translation or
executable presentation reopens affected label review and G8/G9.

| Role | Name | Decision | Date/signature | Approved revision/build/digest |
| --- | --- | --- | --- | --- |
| Legal manufacturer | Unassigned | Pending | — | — |
| Regulatory lead | Unassigned | Pending | — | — |
| Pharmacy lead | Unassigned | Pending | — | — |
| Nursing/human-factors lead | Unassigned | Pending | — | — |
| Quality lead | Unassigned | Pending | — | — |
| Qualified French translator | Unassigned | Pending | — | — |
| Independent French clinical reviewer | Unassigned | Pending | — | — |
