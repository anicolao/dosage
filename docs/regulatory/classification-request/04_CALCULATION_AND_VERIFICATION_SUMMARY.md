# 04 — Calculation and verification summary

> **DRAFT — NOT SUBMISSION READY.** The numeric policy is unapproved and no
> independent verification report has been issued.

| Control field | Placeholder |
| --- | --- |
| Legal manufacturer / regulatory contact | `[TBD]` |
| Frozen source commit / build / artifact digest | `[TBD AT G8]` |
| Pharmacy and independent-verifier approvals/signatures | `[TBD]` |
| French review | `[TBD OR APPROVED N/A RATIONALE]` |
| Current legal/guidance citations | `[TBD — regulatory verification]` |
| VVR-001 identifier / approval / archive hash | `[TBD AFTER G7]` |

## Proposed arithmetic boundary

For vial amount `A`, vial volume `Vv`, final prepared volume `Vf`, ordered dose
`D`, and exact unit scale `S(mcg)=1`, `S(mg)=1000`:

```text
available amount in ordered units = A × S(vial unit) / S(ordered unit)
prepared concentration            = available / Vf
administration volume Va          = D / prepared concentration
```

Only closed `mg`/`mcg` units and an approved one-vial, positive, bounded decimal
domain are proposed. The result and displayed equations must come from one exact
validated result object. CALC-001 controls grammar, bounds, representation,
rounding, measurable-volume decisions, invariants and rejection behaviour; its
open decisions must not be resolved in this attachment.

## Verification summary to complete

| Evidence area | Required source | Status/result |
| --- | --- | --- |
| Pharmacy-approved formulas and golden values | CALC-001 controlled corpus | `[TBD]` |
| Parser, unit, boundary and arithmetic tests | VVP-001 / VVR-001 | `[TBD]` |
| Property and metamorphic tests | VVP-001 / VVR-001 | `[TBD]` |
| Independent implementation/differential comparison | VVP-001 / VVR-001 | `[TBD]` |
| Browser review/reset/error workflows | VVP-001 / VVR-001 | `[TBD]` |
| Formal proof correspondence, if used | CALCULATION_ENGINE_PLAN.md / VVR-001 | `[TBD; optional strategy is not evidence]` |
| Deviations/anomalies and disposition | VVR-001 / FND-001 | `[TBD]` |

Do not insert production-engine outputs as independent expected values. The
final summary must identify test counts, environments, oracle independence,
unresolved anomalies and the exact evidence archive without claiming that
tests establish clinical appropriateness.
