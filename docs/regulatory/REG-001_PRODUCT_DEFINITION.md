# REG-001 — Product definition

| Field | Value |
| --- | --- |
| Record ID | REG-001 |
| Status | Draft — G0 open; not approved or frozen |
| Owner | Regulatory lead (unassigned) |
| Required approvers | Legal manufacturer, pharmacy lead, nursing/human-factors lead, quality lead |
| Proposed product version | `0.2.0-classification` |
| Draft version | 0.1 |
| Draft date | 2026-08-07 |

## 1. Product identity

**Proposed name:** Dosage

**Legal manufacturer:** Unassigned. A GitHub repository owner is not a legal
manufacturer. The manufacturer's legal name, registered address, Canadian
regulatory contact, support contact and authority over the product must be
approved before G1.

**Product type:** A static, installable web application that performs bounded,
deterministic one-vial dilution arithmetic locally on a supported device.

**Intended user:** A trained nurse in Canada acting under an existing authorized
medication order and applicable pharmacy/institutional policy.

**Proposed environment:** A Canadian clinical preparation setting on an
institutionally approved and supported mobile device. It may be personally or
institutionally managed only if the institution approves that deployment model.
No patient-care environment is authorized by this draft.

## 2. Intended workflow

1. The nurse reads the vial label and an already-authorized medication order.
2. The nurse optionally enters a medication display name and manually enters
   the vial amount, vial unit and vial volume.
3. The nurse manually selects the total final prepared volume.
4. The nurse manually enters the ordered dose and its unit.
5. The product validates the bounded input set and calculates only if admitted.
6. The product displays every substituted equation for independent review.
7. The nurse checks each equation before the calculated mL is revealed.
8. The nurse verifies the result against external authoritative information and
   institutional policy; optional local save does not authorize administration.

The product is an arithmetic aid. It is not the medication order, a prescribing
system, an order verifier, a drug reference, a preparation protocol or a
replacement for required independent double checks.

## 3. Inputs, formulas and outputs

### 3.1 Inputs

| Input | Proposed admitted values |
| --- | --- |
| Medication display name | Optional display label; not used in calculation; no patient/order identifier or free-text note |
| Vial amount | Positive decimal satisfying the future approved CALC-001 grammar and bounds |
| Vial medication unit | Exactly `mg` or `mcg` |
| Vial volume | Positive decimal mL satisfying CALC-001 |
| Final prepared volume | Exactly 10, 50, 100, 250, 500 or 1000 mL |
| Ordered dose | Positive decimal satisfying CALC-001; copied from an already-authorized order |
| Ordered-dose unit | Exactly `mg` or `mcg` |

The exact numeric grammar, magnitude, precision and display limits remain open
G2 decisions. Current permissive JavaScript-number behaviour is not the target.

### 3.2 Formulas

Let `A` be vial amount, `Vv` vial volume, `Vf` final prepared volume, `D`
ordered dose, and `S(mcg)=1`, `S(mg)=1000`:

```text
vial concentration Cv = A / Vv
prepared concentration Cp = A / Vf
prepared concentration in ordered units Cpd = (A × S(vial unit) / S(order unit)) / Vf
administration volume Va = D / Cpd
```

The implementation must use the algebraically equivalent, bounded exact form
approved in CALC-001. This notation is the clinical formula, not authorization
to preserve the current overflow-prone order of operations.

### 3.3 Outputs

- original vial concentration;
- prepared concentration;
- explicit mg/mcg conversion when the units differ;
- fully substituted administration-volume equation;
- calculated volume in mL only after the equation review gate; and
- optional local favourite/history record, subject to STO-001.

No output states that a dose, preparation, route, rate or result is clinically
appropriate.

## 4. Reference-product feature set

| Feature | Classification reference target | Current prototype at branch base |
| --- | --- | --- |
| One-vial mg/mcg calculation | Included | Present, but known numeric defects block reliance |
| Independent equation review | Included | Present; comprehension not clinically validated |
| Six final-volume choices | Included | Present |
| Favourites | Included, pending clinical/privacy approval | Present in `localStorage`; schema controls incomplete |
| History | Included, pending clinical/privacy approval | Present in `localStorage`; schema/retention controls incomplete |
| Installable/offline app shell | Included after one successful online installation | Manifest/service worker present; lifecycle/device matrix incomplete |
| English UI | Included | Present |
| French UI/label/IFU | Required target for national deployment | Absent |
| Accounts/cloud/telemetry | Excluded | Absent |
| Clinical or device integrations | Excluded | Absent |

G1 must affirmatively decide whether favourites and history remain. If either is
removed, its UI, code, storage, requirements and claims must be removed before
the dossier is frozen.

## 5. Proposed platforms and availability claim

The only proposed availability claim is:

> After one successful online installation of the complete app shell, the
> supported release can perform its defined local workflows offline, subject to
> supported-browser storage eviction, update and managed-device controls. A
> first visit while offline is not supported.

The supported matrix is not approved. Before G1 closes, the nursing, software,
security and quality leads must name exact managed iOS/iPadOS Safari and Android
Chromium versions, device classes, viewport/zoom expectations, support period,
installation method and storage/update prerequisites. Desktop support must be
either enumerated or expressly excluded.

## 6. Proposed first-product exclusions

Pending clinical approval and enforceable controls, exclude:

- paediatric and neonatal use;
- emergency/resuscitation and critical-care use;
- high-alert, hazardous and investigational medications;
- continuous infusions, infusion-rate calculation and pump programming;
- multi-vial, multi-step, compounded and reconstitution workflows;
- weight-, body-surface-area-, renal- or hepatic-function calculations;
- routes, concentrations or preparations outside an institution-approved list;
- dose selection, range checking, order verification or clinical alerts; and
- use where overfill, displacement, withdrawal volume, dead space, stability or
  compatibility must be determined by the product.

These are proposed scope controls, not yet approved contraindications. G1 must
decide how each is enforced and labelled; a paper-only restriction that
contradicts foreseeable use is insufficient.

## 7. Explicitly absent capabilities

There is no patient model, drug/monograph database, protocol engine, medication
recommendation, route/rate selection, barcode, camera, OCR, voice, EHR,
pharmacy-system, pump, monitoring-device signal, cloud service, account,
analytics, telemetry, crash upload or AI/ML component.

## 8. Open G1 decisions

- legal manufacturer identity and product-name/trademark disposition;
- exact patient, care-setting, medication and preparation limitations;
- favourites/history inclusion and retention basis;
- exact supported platform/device matrix and useful life;
- exact availability/update/eviction/recovery claim;
- English/French release and review plan; and
- pharmacy/nursing confirmation that the formulas and workflow accurately
  represent the bounded intended use.

## Approval

| Role | Name | Decision | Date/signature | Approved commit |
| --- | --- | --- | --- | --- |
| Legal manufacturer | Unassigned | Pending | — | — |
| Regulatory lead | Unassigned | Pending | — | — |
| Pharmacy lead | Unassigned | Pending | — | — |
| Nursing/human-factors lead | Unassigned | Pending | — | — |
| Quality lead | Unassigned | Pending | — | — |
