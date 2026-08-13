# REG-002 — Intended use and claims register

| Field | Value |
| --- | --- |
| Record ID | REG-002 |
| Status | Draft — not approved for labelling or promotion |
| Owner | Regulatory lead (unassigned) |
| Required approvers | Legal manufacturer, pharmacy, nursing/human factors, quality |
| Draft version/date | 0.1 / 2026-08-07 |

## 1. Proposed intended-use statement

> Dosage is a software arithmetic aid intended for trained nurses in Canada to
> calculate a volume in millilitres from a manually entered medication vial
> quantity, a manually entered vial volume, a manually entered or selected final
> prepared volume, and an already-authorized medication dose. Dosage displays
> the complete substituted arithmetic for independent review. It does not
> select, recommend, prescribe, validate, modify or assess the appropriateness
> of a dose, medication, route, rate, preparation method or treatment and is not
> a substitute for the medication order, authorized product information,
> pharmacy instructions, independent double-check requirements or institutional
> policy.

This text is copied from `AUTHORIZATION_PLAN.md` section 2.2. Any change requires
regulatory, pharmacy, nursing/human-factors and manufacturer review. English and
French wording must be clinically equivalent before national release.

## 2. Indication and user boundary

The proposed indication is arithmetic assistance during a bounded, one-vial
medication-preparation workflow after a dose has already been authorized. The
user is a trained nurse in a Canadian institution that has separately approved
the product, device/browser, medication/preparation scope, training and local
policy integration.

The product does not establish an indication for any disease, medication,
patient group or route. Those constraints must be approved as limitations, not
inferred from the existence of a numeric field.

## 3. Proposed contraindications and limitations

Until clinical owners approve objective evidence and enforceable controls, the
first product excludes paediatric/neonatal, emergency/resuscitation,
critical-care, high-alert, hazardous, investigational, continuous-infusion,
multi-vial, multi-step, compounded and reconstitution uses. It does not account
for overfill, displacement, withdrawal volume, dead space, stability,
compatibility, route, rate, patient weight, organ function, allergy, duplicate
therapy or institution-specific preparation rules.

The app may be unavailable because the device, browser, cache or storage is
unavailable or obsolete. The user must retain an institution-approved
non-software method and must not begin or continue a task when required inputs,
instructions, independent verification or product status are uncertain.

## 4. Exact prototype warning

All non-authorized builds must show, without dismissal:

> **Prototype only — not for patient care.**

Supporting copy may add verification instructions but must not weaken that
sentence. Removing it requires an approved release gate and authorized
distribution decision; classification advice alone is insufficient.

## 5. Claims register

| Claim ID | Controlled claim or topic | Status | Permitted context/condition |
| --- | --- | --- | --- |
| CLM-001 | Performs deterministic one-vial mg/mcg dilution arithmetic from manually entered values | Proposed | Only after calculation verification; prototype descriptions must disclose defects/status |
| CLM-002 | Displays the complete substituted arithmetic for independent review | Proposed | Requires numeric/display verification and representative-user comprehension evidence |
| CLM-003 | Stores optional favourites and history on the device only | Proposed | Requires schema/privacy/storage validation and no-network evidence |
| CLM-004 | Works offline after one successful online app-shell installation | Proposed | Requires supported-device, eviction, update, rollback and recovery evidence; no first-visit-offline implication |
| CLM-005 | Does not select or recommend a dose | Proposed | Product, UI, training and promotion must remain inside the defined perimeter |
| CLM-006 | Is a Health Canada-approved/authorized/cleared product | Prohibited | A classification response is not approval; use only an exact authorization statement counsel approves if one later exists |
| CLM-007 | Is safe, error-proof, verified, or prevents medication errors | Prohibited | Do not use; communicate bounded evidence and residual risks instead |
| CLM-008 | Checks, validates or confirms the medication order or clinical appropriateness | Prohibited | The ordered dose comes from an external authorized source |
| CLM-009 | Supports all medications, patients, settings, routes or preparation workflows | Prohibited | Use only the approved, enforced scope |
| CLM-010 | Replaces pharmacy instructions, product information, an independent double check or institutional policy | Prohibited | Always preserve external controls |
| CLM-011 | Sends no runtime/user data off the device | Proposed | Requires CSP, network-boundary and failure-path verification for the exact build |
| CLM-012 | Is installable directly from an iOS URL without user/institution action | Prohibited | Consumer iOS installation requires user confirmation; managed deployment requires institutional control |

## 6. Channel control

The intended use, limitations and approved claims must remain identical in
substance across the UI, manifest, IFU, training, repository README, website,
store/catalogue entry, procurement response, contract, demo and classification
request. Every channel needs an owner, version and review record. Screenshots or
prototype URLs must include the applicable prototype context.

## 7. Open decisions

- approve the proposed exclusions and an enforcement method for each;
- approve favourites/history and offline claims;
- define exact supported-device language and useful life;
- draft and independently review French intended-use, safety and limitation
  text; and
- approve a claims-monitoring process for public repository and preview copy.

## Approval

| Role | Name | Decision | Date/signature |
| --- | --- | --- | --- |
| Legal manufacturer | Unassigned | Pending | — |
| Regulatory lead | Unassigned | Pending | — |
| Pharmacy lead | Unassigned | Pending | — |
| Nursing/human-factors lead | Unassigned | Pending | — |
| Quality lead | Unassigned | Pending | — |
