# Classification-support request source package

> **DRAFT — NOT SUBMISSION READY.** These Markdown files are controlled source
> templates, not submitted documents and not evidence of Health Canada approval,
> clearance, authorization or classification. Do not convert or send them until
> G8 is frozen and G9 is signed.

## Package control

| Field | Value |
| --- | --- |
| Legal manufacturer | `[TBD — legal name and address]` |
| Regulatory contact | `[TBD — name, role, controlled mailbox, phone]` |
| Reference version | `0.2.0-classification` (proposed; not frozen) |
| Source commit / build / artifact digest | `[TBD AT G8]` |
| English approval / French review | `[TBD — named approvers and dates]` |
| Regulatory-counsel review and current citations | `[TBD — verify on approval and submission dates]` |
| Manufacturer signature / G9 approval | `[TBD]` |

The attachments summarize, rather than replace, the controlled records in
`docs/regulatory/`. If a summary disagrees with an approved source record, the
source record controls and the attachment must be corrected before G9.

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

`GATE-009_DOSSIER_AUDIT.md` controls the independent audit.
`COR-001_CLASSIFICATION_CORRESPONDENCE_LOG.md` controls routing and later
correspondence. The PDF names above are outputs to be generated only from
approved sources; no PDF is present in this directory.

## Assembly rules

1. Replace every bracketed placeholder from controlled evidence; never infer a
   name, signature, date, build hash, translation or legal conclusion.
2. Verify the exact build, screenshots, calculations and attachment hashes as
   one immutable G8 baseline.
3. Preserve criterion 3 as an explicit Health Canada determination request.
4. Verify current Health Canada instructions and legal pin-cites on submission
   day, including the known 2026-12-14 FRM-0292 transition.
5. Send only after the legal manufacturer signs the cover letter and G9 record.
