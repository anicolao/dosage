# 01 — Product and intended use

> **DRAFT — NOT SUBMISSION READY.** REG-001 and REG-002 remain unapproved and
> control this summary.

| Control field | Placeholder |
| --- | --- |
| Legal manufacturer / regulatory contact | `[TBD]` |
| Frozen source commit / build / artifact digest | `[TBD AT G8]` |
| Clinical, regulatory and manufacturer approvals/signatures | `[TBD]` |
| Clinically reviewed French equivalent | `[TBD]` |
| Current legal/guidance citations | `[TBD — counsel/regulatory verification]` |

## Proposed product

Dosage is a static, installable web application performing deterministic,
one-vial `mg`/`mcg` dilution arithmetic locally on a supported device. Its
intended user is a trained nurse in Canada acting under an already-authorized
order and institution-approved policy. Product identity, platforms, deployment
model and exact exclusions remain subject to G1 approval in REG-001.

## Proposed intended-use statement

> Dosage is a software arithmetic aid intended for trained nurses in Canada to
> calculate a volume in millilitres from a manually entered medication vial
> quantity, a manually entered vial volume, a manually entered or selected final
> prepared volume, and an already-authorized medication dose. Dosage displays
> the complete substituted arithmetic for independent review. It does not
> select, recommend, prescribe, validate, modify or assess the appropriateness
> of a dose, medication, route, rate, preparation method or treatment and is not
> a substitute for the medication order, authorized product information,
> pharmacy instructions, independent double-check requirements or
> institutional policy.

## Workflow and boundaries

The user manually enters vial/order facts, selects an admitted final prepared
volume, reviews every substituted equation, and then may view the calculated
volume. Optional favourites/history and offline-after-install behaviour remain
conditional claims. The product has no drug library, patient model, dose/range
recommendation, route/rate logic, barcode/camera/OCR, clinical-system/device
interface, cloud account, telemetry or AI/ML.

The first-product exclusions proposed in REG-001/REG-002 include paediatric or
neonatal, emergency/resuscitation, critical-care, high-alert, hazardous,
investigational, continuous-infusion, multi-vial, multi-step, compounded and
reconstitution workflows. The clinical owners must approve both the exact list
and enforceable controls before this attachment is finalized.

## Referenced controlled records

- REG-001 — product definition and feature/platform boundaries;
- REG-002 — intended use, limitations and claims register; and
- SYS-001 — numbered requirements for the frozen reference product.
