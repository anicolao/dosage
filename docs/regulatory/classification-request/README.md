# Classification-support request source package

> **LEGACY PROSE SCAFFOLD — DO NOT EXECUTE OR SEND.** The structured sources in
> `../records/data/submission/` and generated review copies in
> `../completed/submission/` supersede these files for the exact-prototype early
> inquiry. This directory remains as design-history input until formally
> archived or reconciled.

> The contents below document the earlier proposed `0.2.0-classification` plan.
> They are not current fillable sources, submitted documents, evidence of
> approval, or a prerequisite to IQ-002.

## Package control

| Field | Value |
| --- | --- |
| Historical status | Superseded proposal; never approved or sent |
| Historical reference version | `0.2.0-classification` (proposed only) |
| Current execution source | `../records/data/submission/` |
| Current generated review package | `../completed/submission/` |

The manifest below is retained only to explain the design-history relationship
between the old files. It does not define the current attachment set.

## Manifest

| Source | Intended submission artifact | Primary controlled sources | Required completion |
| --- | --- | --- | --- |
| `00_COVER_LETTER.md` | `00_COVER_LETTER.pdf` | REG-001–003 | Manufacturer identity, contact, frozen hashes, signature |
| `01_PRODUCT_AND_INTENDED_USE.md` | `01_PRODUCT_AND_INTENDED_USE.pdf` | REG-001, REG-002, SYS-001 | G1 clinical/regulatory approval |
| `02_WORKFLOW_AND_SCREENSHOTS.md` | `02_WORKFLOW_AND_SCREENSHOTS.pdf` | REG-001, SYS-001, VVP-001 | Frozen-build captures and human-factors/quality approval |
| `03_ARCHITECTURE_AND_DATA_FLOW.md` | `03_ARCHITECTURE_AND_DATA_FLOW.pdf` | ARC-001, SEC-001, STO-001 | Exact-build architecture/network evidence |
| `04_CALCULATION_AND_VERIFICATION_SUMMARY.md` | `04_CALCULATION_AND_VERIFICATION_SUMMARY.pdf` | CALC-001, VVP-001, VVR-001 when issued | Approved numeric policy and independent verification |
| `05_RISK_SUMMARY.md` | `05_RISK_SUMMARY.pdf` | RMF-001, TRC-001 | Risk-control verification and residual-risk decisions |
| `06_LABEL_AND_CLAIMS.md` | `06_LABEL_AND_CLAIMS.pdf` | REG-002, LAB/IFU records when issued | Approved English and clinically equivalent French |
| `07_SAMD_EXCLUSION_ANALYSIS.md` | `07_SAMD_EXCLUSION_ANALYSIS.pdf` | REG-003, ARC-001 | Counsel review; current guidance/citations |
| `08_FALLBACK_CLASSIFICATION.md` | `08_FALLBACK_CLASSIFICATION.pdf` | REG-003, RMF-001 | Counsel-approved current rule/significance analysis |
| `09_VERSION_AND_CHANGE_SUMMARY.md` | `09_VERSION_AND_CHANGE_SUMMARY.pdf` | BASE-001, FND-001, G8 release record | Frozen hashes, defect dispositions, archived evidence |

For the current early inquiry, `IQ-002` controls the independent package audit
and release and `COR-002` controls routing and correspondence. No PDF is present
in this legacy directory.

## Historical assembly rules — superseded

1. Replace every bracketed placeholder from controlled evidence; never infer a
   name, signature, date, build hash, translation or legal conclusion.
2. Verify the exact build, screenshots, calculations and attachment hashes as
   one immutable G8 baseline.
3. Preserve criterion 3 as an explicit Health Canada determination request.
4. Verify current Health Canada instructions and legal pin-cites on submission
   day, including the known 2026-12-14 FRM-0292 transition.
5. Do not execute these rules; use the structured record instructions in
   `../records/README.md`.
