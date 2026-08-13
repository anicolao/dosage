# 07 — SaMD exclusion analysis

> **DRAFT — NOT SUBMISSION READY OR A LEGAL/CLASSIFICATION CONCLUSION.**

| Control field | Placeholder |
| --- | --- |
| Legal manufacturer / regulatory contact | `[TBD]` |
| Frozen source commit / build / artifact digest | `[TBD AT G8]` |
| Regulatory-counsel/lead approvals/signatures | `[TBD]` |
| French review | `[TBD OR APPROVED N/A RATIONALE]` |
| Current guidance, legal citations and retrieval dates | `[TBD — verify at approval and submission]` |

This analysis applies only to the exact product and intended use approved in
REG-001 and REG-002. It must be reconciled to the then-current Health Canada
SaMD definition/classification guidance and examples before G9.

| Exclusion criterion | Draft analysis | Evidence/decision still required |
| --- | --- | --- |
| 1. Does not acquire/process medical images, IVD data or signals | **Proposed met.** Inputs are intended to be manual; no clinical/device signal interface is in scope. | Frozen-source/built-artifact interface and network evidence under ARC-001/SEC-001 |
| 2. Displays/analyzes information normally used in practice | **Proposed likely met.** The product applies established dimensional arithmetic to vial-label facts and an already-authorized order. | Pharmacy-approved formula, scope, authoritative basis and independent verification under CALC-001/VVR-001 |
| 3. Supports rather than replaces the professional's decision | **Ambiguous — Health Canada determination requested.** The product does not choose or assess treatment, but its mL output may be used immediately in medication preparation and may be characterized as driving clinical/patient management. | Approved real workflow/exclusions, representative-use evidence and Health Canada's interpretation; a checkbox or disclaimer is not dispositive |
| 4. Makes the basis available for independent review | **Strong in concept, not yet demonstrated.** Substituted equations are intended to be visible before the result. | Correct engine and unified equation/result model, independent exact-build verification and comprehension evidence |

## Provisional rationale and material distinction

Manual inputs, transparent deterministic arithmetic, no treatment selection,
and a fully exposed basis resemble published simple and manually entered
drug-calculation examples. The material distinction is that Dosage calculates
an administration volume for a prepared concentration and the result may be
used immediately. The package must foreground that fact and must not assert a
foregone non-device outcome.

## Requested determination

Use the four questions in `00_COVER_LETTER.md`. Future clinical integrations,
drug/patient logic, alerts, critical-use expansion, multi-vial/infusion
workflows, AI/ML and cloud capabilities are excluded changes requiring a new
assessment, not alternative products included in this request.

Controlled sources: REG-003 (classification question), REG-001/REG-002
(product and claims), ARC-001 (architecture), CALC-001/VVP-001/VVR-001
(calculation evidence), and RMF-001 (immediate-use severity).
