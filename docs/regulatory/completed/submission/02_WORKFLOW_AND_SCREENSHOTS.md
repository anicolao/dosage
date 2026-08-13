# SUB-002 — Exact workflow and controlled screenshots

> **INCOMPLETE / NOT APPROVED — GENERATED CLASSIFICATION-INQUIRY DOCUMENT.** This is not
> authorization, licensing, clearance, or permission for patient care. Edit
> `docs/regulatory/records/data/submission/SUB-002.yaml`; do not edit this generated file.

| Package control | Value |
| --- | --- |
| Document ID | `SUB-002` |
| Revision | 0.1 |
| Document status | **INCOMPLETE / NOT APPROVED** |
| Package readiness | **NOT READY** |
| Exact prototype baseline | `6b53fde87ff9b193b3c24f7bd93549746b4d6471` |
| Structured source / SHA-256 | `docs/regulatory/records/data/submission/SUB-002.yaml` / `b9c1892b731d96b4996e0ce45d85b41df856c9ff45342dbdd3680f6cb5ffb964` |
| Template / SHA-256 | `docs/regulatory/records/templates/submission.md.mustache` / `e8ca736dd37df3c77076e5355d01d1dcf34927304e42b852884b2fca7e14decd` |

Representative evidence of every material user-visible function in the exact prototype. Captures must retain version, warning, equations and safety copy.

## Package fields

| ID | Field | Value | Evidence | State |
| --- | --- | --- | --- | --- |
| `WFL-F01` | Capture artifact/environment/operator/date | Automated Playwright Chromium capture on 2026-08-13; fixed clock 2026-08-13T10:00:00-04:00; en-CA; America/Toronto; 393×852 CSS pixels; device scale factor 1; no human operator | docs/regulatory/evidence/SUB-002/capture-plan.json; MANIFEST.json | Complete |
| `WFL-F02` | Controlled screenshot archive digest | 96251e9737a40a662d722778d565489ecf4f18753df6e74abe3968f9245778f8 | docs/regulatory/evidence/SUB-002/MANIFEST.json | Complete |
| `WFL-F03` | Worked-example inputs | Example medication; 10 mg in 1 mL; 50 mL final prepared volume; 2000 mcg ordered dose; expected prepared concentration 0.2 mg/mL = 200 mcg/mL and expected administration volume 10 mL | captures 02–05; tests/submission/02-workflow-and-screenshots.spec.ts | Complete |

## 1. Numbered actual workflow

1. Launch and observe prototype warning plus version/revision.
2. Optionally enter a medication name and enter vial amount, mg/mcg unit and vial volume.
3. Select 10, 50, 100, 250, 500 or 1000 mL as final prepared volume.
4. Enter the already-authorized ordered dose and mg/mcg unit.
5. Observe incomplete, invalid, final-volume-below-vial or above-one-vial blocking where applicable.
6. Open calculation review, inspect and individually check every substituted equation.
7. Complete review to reveal mL; acknowledge external checks before saving history.
8. Demonstrate edit reset, favourite reuse, saved-history re-review, deletion and offline reopen.

## 2. Required captures

The following uncropped captures are generated and verified by `npm run regulatory:screenshots:check`. The machine-readable manifest records the exact source baseline, build command, browser environment, viewport, per-file SHA-256 and built-artifact file-manifest digest. The exact prototype has no About screen; version and prototype status are captured in the persistent header/banner instead. Playwright cannot capture browser installation chrome, so installability is verified from manifest metadata and service-worker control while capture 12 demonstrates a new offline page after app-shell installation.

1. [Blank Mix and prototype identity](../../evidence/SUB-002/screenshots/01-blank-mix.png)
2. [Complete inputs with answer hidden](../../evidence/SUB-002/screenshots/02-complete-inputs-answer-hidden.png)
3. [Mandatory substituted-equation review](../../evidence/SUB-002/screenshots/03-equation-review.png)
4. [Result revealed after review](../../evidence/SUB-002/screenshots/04-result-revealed.png)
5. [External-check acknowledgement](../../evidence/SUB-002/screenshots/05-result-acknowledged.png)
6. [One-vial blocking error](../../evidence/SUB-002/screenshots/06-one-vial-block.png)
7. [Final-volume blocking error](../../evidence/SUB-002/screenshots/07-final-volume-block.png)
8. [Favourite stores vial facts only](../../evidence/SUB-002/screenshots/08-favourites-local-record.png)
9. [Saved calculation in history](../../evidence/SUB-002/screenshots/09-history-local-record.png)
10. [History re-review resets checks](../../evidence/SUB-002/screenshots/10-history-rereview.png)
11. [Storage-unavailable recovery state](../../evidence/SUB-002/screenshots/11-storage-unavailable.png)
12. [Installed app shell reopened offline](../../evidence/SUB-002/screenshots/12-offline-reopen.png)

Captions, workflow mapping, dimensions and individual hashes are in [the controlled evidence index](../../evidence/SUB-002/README.md).

## Classification decisions represented

| ID | Question | Position/decision | Rationale | Evidence | State |
| --- | --- | --- | --- | --- | --- |
| `WFL-D01` | Do screenshots and captions represent only the exact source baseline? | Yes — mechanically verified; pending attributable approval | The dedicated build injects the frozen full source revision, every capture asserts the visible v0.1.0/6b53fde identity, and Playwright verifies the described state before comparing the committed image pixel-for-pixel. | tests/submission/02-workflow-and-screenshots.spec.ts; docs/regulatory/evidence/SUB-002/MANIFEST.json | Complete |

## Supporting evidence

| ID | Evidence | Reference | Status | State |
| --- | --- | --- | --- | --- |
| `WFL-E01` | Controlled screenshot archive | docs/regulatory/evidence/SUB-002/screenshots/; archive SHA-256 96251e9737a40a662d722778d565489ecf4f18753df6e74abe3968f9245778f8 | reviewed | Open |
| `WFL-E02` | Screenshot-to-workflow/test trace | docs/regulatory/evidence/SUB-002/capture-plan.json; tests/submission/02-workflow-and-screenshots.spec.ts; docs/regulatory/evidence/SUB-002/README.md | reviewed | Open |

## Review and authorization

| Role | Review scope | Name / organization | Decision | Date | Signature reference | State |
| --- | --- | --- | --- | --- | --- | --- |
| Software lead | Confirm captures match the exact source baseline and actual behavior | ⟦MISSING: SUB-002.approvals.1.name/organization⟧ | ⟦MISSING: SUB-002.approvals.1.decision⟧ | ⟦MISSING: SUB-002.approvals.1.date⟧ | ⟦MISSING: SUB-002.approvals.1.signature_ref⟧ | Open |
| Nursing reviewer | Confirm captions accurately explain the real workflow without implying validation | ⟦MISSING: SUB-002.approvals.2.name/organization⟧ | ⟦MISSING: SUB-002.approvals.2.decision⟧ | ⟦MISSING: SUB-002.approvals.2.date⟧ | ⟦MISSING: SUB-002.approvals.2.signature_ref⟧ | Open |
| Quality lead | Approve capture identity, completeness and archive control | ⟦MISSING: SUB-002.approvals.3.name/organization⟧ | ⟦MISSING: SUB-002.approvals.3.decision⟧ | ⟦MISSING: SUB-002.approvals.3.date⟧ | ⟦MISSING: SUB-002.approvals.3.signature_ref⟧ | Open |

## Document determination

**NOT READY**

All repository-derived workflow fields and controlled captures are complete. Submission readiness now requires named software, nursing and quality reviewers to accept this evidence and provide attributable authorization.

Required items still open:

- `SUB-002.approvals.1.date`
- `SUB-002.approvals.1.decision`
- `SUB-002.approvals.1.name`
- `SUB-002.approvals.1.organization`
- `SUB-002.approvals.1.signature_ref`
- `SUB-002.approvals.2.date`
- `SUB-002.approvals.2.decision`
- `SUB-002.approvals.2.name`
- `SUB-002.approvals.2.organization`
- `SUB-002.approvals.2.signature_ref`
- `SUB-002.approvals.3.date`
- `SUB-002.approvals.3.decision`
- `SUB-002.approvals.3.name`
- `SUB-002.approvals.3.organization`
- `SUB-002.approvals.3.signature_ref`
- `SUB-002.evidence.WFL-E01.status`
- `SUB-002.evidence.WFL-E02.status`
- `SUB-002.status`
