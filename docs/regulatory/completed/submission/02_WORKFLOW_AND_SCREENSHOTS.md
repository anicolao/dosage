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
| Structured source / SHA-256 | `docs/regulatory/records/data/submission/SUB-002.yaml` / `fbacb6d2dae85c5d848e352aabb10170edf225373ac2a0624953b9d8422b5016` |
| Template / SHA-256 | `docs/regulatory/records/templates/submission.md.mustache` / `e8ca736dd37df3c77076e5355d01d1dcf34927304e42b852884b2fca7e14decd` |

Representative evidence of every material user-visible function in the exact prototype. Captures must retain version, warning, equations and safety copy.

## Package fields

| ID | Field | Value | Evidence | State |
| --- | --- | --- | --- | --- |
| `WFL-F01` | Capture artifact/environment/operator/date | Automated Playwright capture; no human operator; Playwright Chromium; captured 2026-08-13; fixed clock 2026-08-13T10:00:00-04:00; en-CA; America/Toronto; 393x852 CSS pixels at device scale factor 1 | docs/regulatory/evidence/SUB-002/capture-plan.json; MANIFEST.json | Complete |
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

### Capture 1 — Blank Mix screen and prototype identity

![Blank Mix screen and prototype identity](../../evidence/SUB-002/screenshots/01-blank-mix.png)

Initial Mix screen showing the persistent non-clinical warning, v0.1.0 · 6b53fde build identity, manual fields, closed final-volume choices and local-only navigation.

Workflow steps: 1, 2, 3, 4. PNG 393×852; SHA-256 `eece9cfdec376a22ef104e453d9b9bf7cea14a582e49a113b6f8a42d49913c8f`.

### Capture 2 — Complete inputs with answer hidden

![Complete inputs with answer hidden](../../evidence/SUB-002/screenshots/02-complete-inputs-answer-hidden.png)

Worked-example inputs are complete, but no administration volume appears before equation review.

Workflow steps: 2, 3, 4, 6. PNG 393×852; SHA-256 `bb11ce9da750d7300d5f55b0fa9fb4becf6932b46bd6227e2f5cf35ac3004996`.

### Capture 3 — Mandatory substituted-equation review

![Mandatory substituted-equation review](../../evidence/SUB-002/screenshots/03-equation-review.png)

The review dialog displays vial, prepared, mg-to-mcg conversion and administration equations; every step must be checked before completion.

Workflow steps: 6. PNG 393×852; SHA-256 `34ac80e7975c02c2d921db899ec4d6f8ad61529e177fcb36fa6849bbe86e0adf`.

### Capture 4 — Result revealed after completed review

![Result revealed after completed review](../../evidence/SUB-002/screenshots/04-result-revealed.png)

After all equations are checked, the prototype reveals 10 mL and requires a separate acknowledgement before history can be saved.

Workflow steps: 7. PNG 393×852; SHA-256 `92b5c93ba2ac9085317cce432bd7e2ef22da16ca9c184096cb7b69c028fbc518`.

### Capture 5 — External-check acknowledgement

![External-check acknowledgement](../../evidence/SUB-002/screenshots/05-result-acknowledged.png)

The user acknowledges checking the order, vial unit, ordered-dose unit and final prepared volume; the save action is then enabled.

Workflow steps: 7. PNG 393×852; SHA-256 `d4ecd4db1467a69a4886356c519f8afdfb9f7e26067518f0a9bea1827b9ba92e`.

### Capture 6 — Order above one vial is blocked

![Order above one vial is blocked](../../evidence/SUB-002/screenshots/06-one-vial-block.png)

An ordered dose greater than the converted amount available in one vial produces a blocking error and no actionable result.

Workflow steps: 5. PNG 393×852; SHA-256 `4616744a701f3b62d0f38394b70f27e0f729aa1a1fe1c38683b3bea9e79dd068`.

### Capture 7 — Final volume below vial volume is blocked

![Final volume below vial volume is blocked](../../evidence/SUB-002/screenshots/07-final-volume-block.png)

A 51 mL vial volume with a 50 mL final prepared volume produces a blocking error and no actionable result.

Workflow steps: 5. PNG 393×852; SHA-256 `c9fba3bb8755db9acca1b3e222af76e571af91554e5b7d6857d377cdb6fbde36`.

### Capture 8 — Favourite stores vial facts only

![Favourite stores vial facts only](../../evidence/SUB-002/screenshots/08-favourites-local-record.png)

Favourites are labelled stored on this device only and retain medication/vial facts without an ordered dose.

Workflow steps: 8. PNG 393×852; SHA-256 `ebcdb29b19a39f2bcbd6628bd4e8ccc3875160d3a61cff8d54a6b299be558564`.

### Capture 9 — Saved calculation in local history

![Saved calculation in local history](../../evidence/SUB-002/screenshots/09-history-local-record.png)

Mix history is labelled stored on this device only, warns that it is not a medication order, and displays the source inputs and result.

Workflow steps: 8. PNG 393×852; SHA-256 `ad91dd1b69af9b48c72776d7361af195b6c285c93ef5ad086289cc67ea687534`.

### Capture 10 — History re-review resets equation checks

![History re-review resets equation checks](../../evidence/SUB-002/screenshots/10-history-rereview.png)

Opening a saved mix restores inputs into mandatory equation review with every check reset and the result concealed.

Workflow steps: 8. PNG 393×852; SHA-256 `0d3807ac653e630014514b5231c929d58bc9cc1a651f71d65516bb89c6d8b35d`.

### Capture 11 — Corrupt local storage does not block calculation

![Corrupt local storage does not block calculation](../../evidence/SUB-002/screenshots/11-storage-unavailable.png)

A corrupt favourites record disables persistence, displays a recovery warning and leaves the reviewed calculation available.

Workflow steps: 5, 8. PNG 393×852; SHA-256 `cd95fcf1fe7ae7115980d1d96d56521336944a54ebd0e675d9c0548f3fe9e1bc`.

### Capture 12 — Installed app shell reopened offline

![Installed app shell reopened offline](../../evidence/SUB-002/screenshots/12-offline-reopen.png)

After a successful online app-shell installation and service-worker control, a new page opens offline with the prototype identity and calculator available.

Workflow steps: 1, 8. PNG 393×852; SHA-256 `eece9cfdec376a22ef104e453d9b9bf7cea14a582e49a113b6f8a42d49913c8f`.

Captions, workflow mapping, dimensions and individual hashes are also recorded in [the controlled evidence index](../../evidence/SUB-002/README.md).

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
