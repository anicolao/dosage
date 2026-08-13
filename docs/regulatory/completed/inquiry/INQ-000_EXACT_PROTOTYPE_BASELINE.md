# INQ-000 — Exact prototype classification-inquiry baseline

> **INCOMPLETE / NOT APPROVED.** This document is generated. Edit
> `docs/regulatory/records/data/inquiry/INQ-000.yaml`, not this file. Missing required values are rendered as
> `⟦MISSING: ...⟧`; an incomplete generated document is not an approval.

| Control field | Value |
| --- | --- |
| Record ID | `INQ-000` |
| Kind | prototype baseline |
| Revision | 0.1 |
| Status | **INCOMPLETE / NOT APPROVED** |
| Source baseline | `6b53fde87ff9b193b3c24f7bd93549746b4d6471` |
| Source data | `docs/regulatory/records/data/inquiry/INQ-000.yaml` |
| Template | `docs/regulatory/records/templates/record.md.mustache` |
| Source-data SHA-256 | `df7a26b67812255ff13c7aaebc010aa665f99b5b9e26c44f1ec11a1d6ceca419` |
| Template SHA-256 | `99f7fedc1d2cb5ba9edc70a721182801f48f96b538f91b43eaa6a6d9fba0328d` |

This record freezes the software functionality proposed for the early Health Canada classification-verification request. The intended inquiry product is exactly the executable prototype at the identified source commit, without silently substituting the later TypeScript, exact-arithmetic, IndexedDB, security, accessibility or bilingual target design.

## Required record fields

| ID | Field | Value | Evidence | Required | State |
| --- | --- | --- | --- | --- | --- |
| `INQ-F01` | Product name | Dosage | package.json; src/App.svelte | Yes | Complete |
| `INQ-F02` | Package version | 0.1.0 | package.json at source baseline | Yes | Complete |
| `INQ-F03` | Exact full source commit | 6b53fde87ff9b193b3c24f7bd93549746b4d6471 | Git commit and BASE-001 | Yes | Complete |
| `INQ-F04` | User-visible build identity | v0.1.0 plus first seven characters of the supplied or Git source revision | vite.config.js; src/App.svelte | Yes | Complete |
| `INQ-F05` | Executable review URL or archived artifact | ⟦MISSING: INQ-000.required_fields.INQ-F05.value⟧ | ⟦MISSING: INQ-000.required_fields.INQ-F05.evidence_ref⟧ | Yes | Open |
| `INQ-F06` | Intended requester/manufacturer | ⟦MISSING: INQ-000.required_fields.INQ-F06.value⟧ | ⟦MISSING: INQ-000.required_fields.INQ-F06.evidence_ref⟧ | Yes | Open |

## 1. Actual calculation inputs and validation

The prototype optionally accepts a medication display name, and requires vial amount, vial unit, vial volume, one selected final prepared volume, ordered dose and ordered-dose unit. Vial and ordered units are closed UI select options `mg` and `mcg`. Final prepared volume is exactly one of 10, 50, 100, 250, 500 or 1000 mL.

Numeric controls are HTML `type=number`, `min=0`, `step=any` fields. Svelte converts their values with JavaScript `Number`. The prototype requires finite positive vial amount, vial volume and dose, blocks final prepared volume below vial volume, and blocks ordered dose greater than the unit-converted amount available in one vial. It does not implement the proposed strict decimal grammar, precision/magnitude limits or bounded exact representation.

## 2. Actual calculation and display

The prototype computes vial concentration as amount divided by vial volume, prepared concentration as amount divided by final prepared volume, exact unit scaling in concept through factors 1000 for mg and 1 for mcg, and administration volume as ordered dose divided by prepared concentration in ordered units. Runtime arithmetic is IEEE-754 JavaScript `Number`, not the Lean rational reference or proposed TypeScript engine.

Display uses `Intl.NumberFormat('en-CA', { maximumFractionDigits: 6 })`. The UI says to use local policy for measurable volume and rounding. This behavior can round a positive result to zero and is a known unresolved limitation; no clinical rounding rule is implemented.

## 3. Actual review workflow

Before revealing the result, the prototype displays substituted vial concentration, prepared concentration, optional mg/mcg conversion, and volume-to-administer equations in a modal. The user must individually check every applicable equation and complete review. Input changes reset review, checked steps and acknowledgement. After reveal, the user must acknowledge checking the order, units and final prepared volume before saving history.

## 4. Actual local records

Favourites and history are implemented in browser `localStorage` keys `dosage.favourites.v2` and `dosage.history.v2`. Favourites store medication name and vial facts but not ordered dose. History stores source facts plus derived concentrations and administration volume and is capped at the newest 100 writes. Data is parsed as arrays and filtered only for allowed units; versioned schema validation, record isolation, recomputation, migration and retention controls proposed for the later product are not implemented.

## 5. Actual installation, offline and network behavior

The prototype is a static Svelte web application with a relative-scope web manifest. A generated service worker precaches the built app shell, serves cached navigation and assets cache-first, fetches same-origin in-scope cache misses and deletes prior app-shell caches with the same scope prefix on activation. A first visit requires the host. There is no application backend, account, telemetry, analytics, cloud sync, medical-device signal, barcode, OCR, EHR, pharmacy or pump interface in the source baseline.

## 6. Actual screens, language and warnings

The prototype includes Mix, Favourites and History screens; English UI only; an installable icon/manifest; responsive styling; and a persistent “Prototype only — not for patient care” banner. It displays version/revision in the header. Medication name warns against patient information. It does not include a French UI or final controlled label/IFU.

## 7. Known limitations disclosed for classification

The inquiry will disclose the Number/rounding defect, permissive numeric admission, incomplete local-record validation, limited accessibility evidence, absent CSP/SBOM/production channel, incomplete update/rollback proof, absent representative-user validation and absence of final bilingual labelling. These limitations prevent patient-care reliance but do not change the functions Health Canada is asked to classify.

## Decisions

| ID | Question | Decision | Rationale | Evidence | State |
| --- | --- | --- | --- | --- | --- |
| `INQ-D01` | Is the classified product limited to the exact current prototype functions? | Yes | The manufacturer intends to ship the same functions and asks Health Canada to classify those functions. Later safety corrections may change implementation quality but may not add, remove or materially change a function without classification impact assessment. | Exact source baseline and generated inquiry package | Complete |
| `INQ-D02` | Are future target controls represented as current functionality? | No | Proposed exact arithmetic, TypeScript boundaries, IndexedDB, hardening and validation are development plans and are expressly separated from the current prototype facts. | CALC-001; STO-001; SEC-001; DEV-001; this record | Complete |

## Evidence register

| ID | Evidence | Reference | Status | Required | State |
| --- | --- | --- | --- | --- | --- |
| `INQ-E01` | Repository source at the full inquiry baseline | Git commit 6b53fde87ff9b193b3c24f7bd93549746b4d6471 | reviewed | Yes | Open |
| `INQ-E02` | Current Playwright behavior and screenshot suite | tests/e2e/ at the inquiry baseline | reviewed | Yes | Open |
| `INQ-E03` | Controlled screenshots and reproducible prototype access/artifact | ⟦MISSING: INQ-000.evidence.INQ-E03.reference⟧ | missing | Yes | Open |

## Approvals

| Role | Approval scope | Name / organization | Decision | Date | Signature or controlled approval reference | State |
| --- | --- | --- | --- | --- | --- | --- |
| Software lead | Confirm this is a complete and accurate description of the exact executable baseline | ⟦MISSING: INQ-000.approvals.1.name/organization⟧ | ⟦MISSING: INQ-000.approvals.1.decision⟧ | ⟦MISSING: INQ-000.approvals.1.date⟧ | ⟦MISSING: INQ-000.approvals.1.signature_ref⟧ | Open |
| Quality lead | Confirm source/evidence control and disclosed limitation completeness | ⟦MISSING: INQ-000.approvals.2.name/organization⟧ | ⟦MISSING: INQ-000.approvals.2.decision⟧ | ⟦MISSING: INQ-000.approvals.2.date⟧ | ⟦MISSING: INQ-000.approvals.2.signature_ref⟧ | Open |
| Legal manufacturer | Freeze these exact functions as the subject of the classification inquiry | ⟦MISSING: INQ-000.approvals.3.name/organization⟧ | ⟦MISSING: INQ-000.approvals.3.decision⟧ | ⟦MISSING: INQ-000.approvals.3.date⟧ | ⟦MISSING: INQ-000.approvals.3.signature_ref⟧ | Open |

## Change and reassessment triggers

- Addition, removal or material change of an input, calculation, output, workflow or local-record function
- Change to intended user, care setting, immediate-use context or represented purpose
- Addition of a drug library, patient logic, recommendation, alert, integration, signal or cloud function
- Change that makes an inquiry screenshot, architecture statement or known-limitation disclosure inaccurate

## Completion determination

**Generated determination:** NOT READY

The baseline is mechanically described but remains unapproved until a reproducible artifact/URL and controlled screenshots are recorded and the named software, quality and manufacturer reviewers sign.

Required items still open:

- `INQ-000.approvals.1.date`
- `INQ-000.approvals.1.decision`
- `INQ-000.approvals.1.name`
- `INQ-000.approvals.1.organization`
- `INQ-000.approvals.1.signature_ref`
- `INQ-000.approvals.2.date`
- `INQ-000.approvals.2.decision`
- `INQ-000.approvals.2.name`
- `INQ-000.approvals.2.organization`
- `INQ-000.approvals.2.signature_ref`
- `INQ-000.approvals.3.date`
- `INQ-000.approvals.3.decision`
- `INQ-000.approvals.3.name`
- `INQ-000.approvals.3.organization`
- `INQ-000.approvals.3.signature_ref`
- `INQ-000.evidence.INQ-E01.status`
- `INQ-000.evidence.INQ-E02.status`
- `INQ-000.evidence.INQ-E03.reference`
- `INQ-000.evidence.INQ-E03.status`
- `INQ-000.required_fields.INQ-F05.evidence_ref`
- `INQ-000.required_fields.INQ-F05.value`
- `INQ-000.required_fields.INQ-F06.evidence_ref`
- `INQ-000.required_fields.INQ-F06.value`
- `INQ-000.status`

The generated determination is mechanical. It does not replace the required
human decision, signature, evidence review, or governing gate procedure.
