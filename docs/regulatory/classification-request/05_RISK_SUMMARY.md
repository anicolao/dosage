# 05 — Risk summary

> **DRAFT — NOT SUBMISSION READY.** RMF-001 is preliminary and unapproved;
> residual risks and overall benefit-risk acceptability have not been decided.

| Control field | Placeholder |
| --- | --- |
| Legal manufacturer / regulatory contact | `[TBD]` |
| Frozen source commit / build / artifact digest | `[TBD AT G8]` |
| Quality, clinical, regulatory approvals/signatures | `[TBD]` |
| French review | `[TBD — clinically equivalent safety content]` |
| Current legal/standard citations | `[TBD — counsel/quality verification]` |

## Preliminary risk picture

The output may be used in immediate medication preparation, so a wrong or
misunderstood result could contribute to serious injury or death. This fact is
material to criterion 3 and must not be minimized. RMF-001 currently identifies
14 preliminary hazards; probability, acceptability and residual-risk decisions
remain blocked by missing clinical scope, implementation and verification.

| Hazard group | RMF-001 IDs | Proposed control themes; not yet verified |
| --- | --- | --- |
| Wrong input, unit, arithmetic, rounding or final-volume interpretation | HZ-001, HZ-002, HZ-005 | Closed inputs/units, exact engine, bounds, explicit equations, pharmacy-approved physical model |
| Stale review or invalid persisted data | HZ-003, HZ-004 | Review invalidation, schema validation, recomputation, quarantine |
| UI/accessibility and automation bias | HZ-006, HZ-011 | Safe presentation, scope/claim controls, representative-user validation |
| Unsupported patient/medication/workflow | HZ-007 | Enforceable exclusions, institutional policy and training |
| Availability, update, browser and storage failure | HZ-008, HZ-013 | Atomic update, version status, fallback and recovery |
| Supply-chain, interface and privacy compromise | HZ-009, HZ-010, HZ-012 | Provenance, restrictive network boundary, minimization and privacy controls |
| Ownership/licensing blocks lifecycle action | HZ-014 | Manufacturer authority and counsel-approved distribution/correction process |

## Residual uncertainties and exclusions

No control is closed merely because it is specified or a prototype test exists.
TRC-001 and VVR-001 must show exact-build verification and anomaly disposition;
clinical owners must approve the intended use, enforcement of exclusions and
representative-use evidence. The final attachment must state all residual
uncertainties and the approved exclusions from REG-001/REG-002 verbatim in
substance. Classification support does not itself make residual risk acceptable.
