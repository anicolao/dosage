# GATE-001 — Product definition frozen

| Field | Value |
| --- | --- |
| Gate | G1 — product definition frozen |
| Status | Open — not approved; G0 dependency remains open |
| Primary owner | Regulatory lead (unassigned) |
| Required approvers | Legal manufacturer, pharmacy, nursing/human factors, quality |
| Record version/date | 0.1 / 2026-08-07 |

This record inventories G1 review material. Drafting downstream records does
not waive G0 and does not authorize code changes, patient care or submission.

## Exit checklist

| Requirement | Evidence | Status |
| --- | --- | --- |
| G0 controlled prototype approved | `GATE-000_CONTROLLED_PROTOTYPE.md` | Blocking — open |
| Product/workflow/inputs/outputs/platforms/features/exclusions defined | `REG-001_PRODUCT_DEFINITION.md` | Draft; material decisions open |
| Intended use, limitations and claims frozen | `REG-002_INTENDED_USE_AND_CLAIMS.md` | Draft; French/clinical review absent |
| Classification question and fallback framed | `REG-003_CLASSIFICATION_QUESTION.md` | Draft; counsel/manufacturer review absent |
| Ownership/licensing basis approved | `IP-001_OWNERSHIP_AND_LICENSING.md` | Blocking — counsel conclusion absent |
| Numbered system requirements approved | `SYS-001_SYSTEM_REQUIREMENTS.md` | Draft; not frozen |
| Architecture/data flow and no-interface claim approved | `ARC-001_ARCHITECTURE_AND_DATA_FLOW.md` | Draft; verification incomplete |
| Initial hazard traceability established | `TRC-001_TRACEABILITY_MATRIX.csv` | Initial/incomplete; must close at G7 |
| mg/mcg contradiction resolved in product documents | `VISION.md`, REG-001, SYS INP-002 | Draft edit made; quality/clinical approval pending |
| Current behavior separated from target requirements | `README.md`, `VISION.md`, `MVP_DESIGN.md`, `MVP_UX_DESIGN.md` | Draft edit made; review pending |
| Favourites/history disposition approved | REG-001 section 4 | Open |
| Supported device/browser matrix approved | REG-001 section 5 | Open |
| Offline/update/eviction/recovery claim approved | REG-001 section 5; SYS AVL requirements | Open |

## Decisions required to close G1

1. Name the legal manufacturer and every accountable approver.
2. Approve or revise the exact intended use and all enforced exclusions.
3. Decide whether favourites and history ship in the reference product.
4. Approve exact device/browser/OS versions and the availability claim.
5. Approve an English/French label and clinical-review plan.
6. Obtain IP/commercialization counsel's written rights/GPL conclusion.
7. Approve all SYS-001 requirements and initial TRC-001 hazard links.

## Approval record

The gate remains open unless each decision identifies the exact approved commit
and every required approver signs.

| Role | Name | Decision | Date/signature | Approved commit |
| --- | --- | --- | --- | --- |
| Legal manufacturer | Unassigned | Pending | — | — |
| Regulatory lead | Unassigned | Pending | — | — |
| Pharmacy lead | Unassigned | Pending | — | — |
| Nursing/human-factors lead | Unassigned | Pending | — | — |
| Quality lead | Unassigned | Pending | — | — |
