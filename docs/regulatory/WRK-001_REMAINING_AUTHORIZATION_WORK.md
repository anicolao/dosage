# WRK-001 — Remaining authorization and clinical-release work

> **DRAFT STATUS REGISTER — NO GATE IS CLOSED.** This is the consolidated
> remaining-work list after implementation of the Nix/Lean formal reference.
> It does not authorize implementation, submission, clinical evaluation,
> patient care or distribution. The cited controlled records govern if a
> summary here ever disagrees with them.

| Field | Value |
| --- | --- |
| Status date | 2026-08-13 |
| Product | Exact current prototype `0.1.0` at `6b53fde87ff9b193b3c24f7bd93549746b4d6471`; same feature scope for later release |
| Record owner | Quality lead (unassigned) |
| Source plan | `AUTHORIZATION_PLAN.md` |
| Inquiry state | INQ-000, IQ-001, IQ-002 and COR-002 open; SUB-000–SUB-009 incomplete |
| Clinical-release gate state | G0–G9 open; G10 not entered |
| Formal status | Nix/Lean core and CI implemented; independent approval and TypeScript conformance open |

## 1. Work completed technically but not approved

The branch contains the following review inputs and technical scaffolding:

- prototype warning/noindex containment, baseline/distribution/finding/IP
  inventories and G0 record;
- draft product, intended-use/claims, classification, architecture, system
  requirements, risk, numeric, storage, security, tooling and verification
  records;
- preliminary traceability covering 14 hazards, 59 requirements and all 23
  preliminary RMF controls;
- prospective G3–G9 gate records, VVR/release/label templates and a concise
  classification-request source package;
- pinned `flake.nix`/`flake.lock`, Lean 4.30.0/Lake 5.0.0 project, executable
  exact-ratio model, named proofs and canonical seed vectors;
- `npm run test:formal`, isolated `nix flake check`, and a separate green,
  least-privilege formal CI job; and
- an explicit source audit rejecting `sorry`, `admit` and user-defined Lean
  axioms;
- schema-validated YAML sources and deterministic generated Markdown/hash
  manifests for every G0–G10 gate, G0-01–G0-04 support record, early inquiry
  gate/correspondence record and SUB-000–SUB-009 attachment; and
- CI enforcement that generated regulatory documents cannot drift from their
  YAML sources and templates.

These are drafts or technical observations. No named legal manufacturer,
clinical approver, independent verifier, quality authority or regulatory owner
has signed them. Green CI is not gate approval.

## 2. Two critical paths and stop rules

The shortest credible classification path describes the current implementation
exactly and asks for direction before the full clinical-release programme:

```text
G0-01 manufacturer/signatory + accountable role appointments
  → INQ-000 exact source/artifact/function/limitation baseline
    → IQ-001 clinical facts and classification analysis
      → SUB-000–SUB-009 generated package
        → IQ-002 independent audit/manufacturer release
          → send once and control COR-002
```

Full G0–G10 closure is not a prerequisite to IQ-002. The inquiry package must
say that the prototype is unvalidated and unavailable for patient care, disclose
known defects, and avoid calling planned controls implemented. No new feature,
clinical logic, integration, cloud function, AI or automation may be added to
the inquiry baseline. A code change requires impact assessment and normally a
new INQ-000 baseline/package revision.

The separate clinical-release path remains:

```text
G0 people/rights/containment approval
  → G1 product and intended-use freeze
    → G2 clinical numeric/risk/storage/security/tooling approval
      → G3/G4/G5/G6 implementation and evidence
        → G7 controlled verification and trace closure
          → G8 immutable bilingual dossier baseline
            → G9 independent package audit
              → send once and control acknowledgement at G10
```

The next inquiry activity is to fill G0-01, the role appointments, INQ-000 and
IQ-001 with actual identities, evidence and attributable approvals. The next
clinical-release activity is human review and closure of G0, followed by G1 and
G2. Remaining implementation must not be represented as controlled G3+ work
until those dependencies close. Drafting tests, reviews and evidence structures
may continue, but their results are exploratory until the inputs are approved.

## 2.1 Early inquiry records still to complete

| ID | Remaining action | Required approval/evidence | Status |
| --- | --- | --- | --- |
| INQ-000 | Fill deployment/artifact URL and digest, reproduce every actual function, capture controlled screenshots, confirm current localStorage/service-worker/network facts, and disclose every known limitation. | Software factual review, quality review, manufacturer approval | YAML/generated draft; values and approvals open |
| IQ-001 | Approve actual user/setting/purpose, formula source/worked example, immediate-use consequences, criterion analysis, published comparator and fallback rule/class position. | Regulatory, pharmacy, nursing, software, independent calculation reviewer, manufacturer | YAML/generated draft; decisions/evidence/approvals open |
| SUB-000–009 | Replace all `MISSING` values; generate the exact cover, product, workflow, architecture, calculation, risk, actual-label, exclusion, fallback and package-boundary records. | Attachment-specific reviewers plus quality consistency review | Ten YAML/generated drafts; not ready |
| IQ-002 | Audit source/artifact/screenshots/claims/hashes/routing as one immutable package and authorize the exact outgoing set. | Independent auditor, regulatory lead, quality lead, manufacturer signatory | YAML/generated draft; not entered |
| COR-002 | Verify submission-day route, send only the IQ-002 package once, preserve delivery/acknowledgement/reference and control every response. | Regulatory lead and quality record review | YAML/generated draft; not entered |

Use `npm run regulatory:build` while filling records,
`npm run regulatory:ready -- --record RECORD-ID` as the mechanical completion
check, and `npm run regulatory:commit -- "message"` to commit only YAML and
generated outputs. Git provenance supplements but does not replace signatures.

## 3. G0 — Controlled prototype

| ID | Remaining action | Accountable role/evidence | Status |
| --- | --- | --- | --- |
| G0-01 | Complete and approve `G0-01_LEGAL_MANUFACTURER_IDENTITY_AND_SIGNATORY_AUTHORITY.md` with official identity, designation and signatory-authority evidence. | Authorized manufacturer officer, independent identity/authority reviewer, quality lead | Template present; names/evidence/signatures blocking |
| G0-02 | Complete both quality/software packets in `G0-02_ROLE_AUTHORITY_AND_COMPETENCE.md`, including appointments, authority, competence assessment, independence and training gaps. | Manufacturer officer, appointees, independent competence assessors, quality record reviewer | Template present; roles/evidence/signatures blocking |
| G0-03 | Complete and approve `G0-03_CONTRIBUTOR_AND_ASSET_PROVENANCE.md`; reconcile IP-000 identities, employment/contractor rights basis, history, copied/generated assets and third-party boundaries. | Contributors/rights holders, repository owner, software, quality, counsel, manufacturer | Template present; factual reconciliation/evidence/signatures open |
| G0-04 | Obtain IP/commercialization counsel's written conclusion on title/licence basis, GPL-3.0 obligations and manufacturer authority to modify, distribute, correct and recall. | Counsel opinion tied to exact product/distribution models | Not started/blocking |
| G0-05 | Review every public/stale preview and approve access, retention, warning and non-clinical presentation controls. | DST-001; quality/software approval | Draft/open |
| G0-06 | Assign every FND-001 finding owner/severity/disposition and confirm no item is closed by code or CI alone. | Quality-reviewed finding register | Open |
| G0-07 | Confirm legacy/current baselines, unchanged source reviews and exact candidate CI/deployment evidence. | BASE-001 and immutable run links/hashes | Review pending |
| G0-08 | Sign GATE-000 against one exact commit. | Manufacturer, quality, software signatures | Missing |

## 4. G1 — Product definition frozen

| ID | Remaining action | Accountable role/evidence | Status |
| --- | --- | --- | --- |
| G1-01 | Close G0. | Signed GATE-000 | Blocking |
| G1-02 | Approve intended users, care settings, patient/medication/preparation scope, final-volume meaning and all enforceable exclusions. | Regulatory, pharmacy, nursing/HF, manufacturer | Open |
| G1-03 | Formalize the current favourites/history feature and local-only claim exactly; do not add cloud sync, identity or new record functions. | Product/manufacturer, nursing/HF, privacy | Current feature fixed; controls/evidence open |
| G1-04 | Approve exact managed device, OS, browser/engine, assistive-technology and language matrix. | Software, HF/accessibility, security, institution | Open |
| G1-05 | Approve offline-after-install, cache/update/rollback/eviction/recovery/useful-life claim and non-software fallback. | Clinical, software, security, quality | Open |
| G1-06 | Approve REG-002 intended-use, limitation, contraindication, warning and permitted/prohibited claim text plus the English/French review plan. | Regulatory, pharmacy, nursing/HF, quality | Open |
| G1-07 | Approve criterion 3 ambiguity and fallback classification questions without presupposing Health Canada's answer. | Regulatory lead/counsel, manufacturer | Open |
| G1-08 | Complete IP-001 for hosted, downloaded, institutional and modified distribution models; reconcile dependencies/media/trademark obligations. | IP/commercialization counsel | Open/blocking |
| G1-09 | Approve all SYS-001 requirements, ARC-001 boundaries/no-interface claim and initial TRC-001 links. | Required G1 approvers | Draft/open |
| G1-10 | Sign GATE-001 against one exact commit. | Manufacturer, regulatory, pharmacy, nursing/HF, quality | Missing |

## 5. G2 — Safety requirements and tooling approved

### 5.1 Clinical numeric decisions

| ID | Remaining action | Required evidence/owner | Status |
| --- | --- | --- | --- |
| G2-N01 | Approve or revise the strict decimal grammar and semantic error ordering. | Pharmacy, software, HF, quality | Proposed/open |
| G2-N02 | Set field-specific minimum/maximum coefficient, magnitude, total-digit and decimal-scale limits. | Pharmacy rationale and independent verifier review | All values TBD/blocking |
| G2-N03 | Set minimum measurable/displayable positive mL and maximum administration-volume limits. | Pharmacy, nursing/HF, quality; device/workflow basis | TBD/blocking |
| G2-N04 | Approve exact bounded representation, normalization/cancellation, integer-size limits and overflow failure behavior. | Software and independent verifier design review | Proposed/open |
| G2-N05 | Approve only mg/mcg, exact 1000 ratio and final-volume closed set. | Pharmacy and nursing/HF | Proposed/open |
| G2-N06 | Approve formula, order of operations, one-vial ceiling, final-volume/vial-volume rule and excluded overfill/displacement/dead-space assumptions. | Pharmacy and independent calculation review | Proposed/open |
| G2-N07 | Select clinical rounding mode, precision/significant digits, trailing-zero policy, disclosure and below-threshold behavior. | Pharmacy, HF and independent verifier | Entire policy TBD/blocking |
| G2-N08 | Independently produce/approve the complete golden, adversarial, boundary and regression corpus. | Pharmacy/independent oracle; implementer cannot be sole source | Seed vectors only |

### 5.2 Risk, storage, security and privacy decisions

| ID | Remaining action | Required evidence/owner | Status |
| --- | --- | --- | --- |
| G2-R01 | Approve risk method, severity/probability scales, acceptability matrix, assumptions and control hierarchy. | Quality, clinical, security, manufacturer | Draft/open |
| G2-R02 | Review HZ-001–HZ-014 severities/sequences/harms, add missing hazards and assign control/evidence owners. | Multidisciplinary risk review | Preliminary only |
| G2-R03 | Estimate initial/residual risk when evidence permits; approve no risk merely because a control is planned. | Risk owners/manufacturer | Not assessed |
| G2-S01 | Decide storage technology and exact favourites/history schemas, identifiers, authoritative fields and equation-version policy. | Software, privacy, clinical, quality | IndexedDB proposal/open |
| G2-S02 | Set retention/caps, quarantine content/expiry, deletion/undo, legacy removal and migration/rollback behavior. | Privacy, HF, software, quality | Proposed values/open |
| G2-S03 | Approve device encryption/MDM, shared/lost-device, no-backup and institution-specific privacy assumptions. | Privacy/security/institution | Open |
| G2-C01 | Approve controlled host/channel, supported matrix, CSP/headers/network allowlist and privacy/log boundary. | Security/privacy, software, institution | Open |
| G2-C02 | Approve atomic app-shell update/activation/rollback/cache retention/database compatibility and recovery policy. | Security, software, quality | Draft/open |
| G2-C03 | Approve SBOM/provenance/vulnerability sources and thresholds, security-response targets and penetration-test timing. | Security, quality, manufacturer | Open |

### 5.3 Development, verification and formal-method decisions

| ID | Remaining action | Required evidence/owner | Status |
| --- | --- | --- | --- |
| G2-T01 | Run/approve the TypeScript, Vitest, fast-check, coverage, lint and formatting compatibility spike; commit exact dependencies/configurations. | Software/quality; licence/vulnerability review | Not implemented |
| G2-T02 | Add exact Node assertion, `engines` and `packageManager`; reconcile Nix Node/npm with CI and supported development environments. | Software/quality | Node major only |
| G2-T03 | Review Nixpkgs/Lean/Lake licences, closure/SBOM, update policy and four-platform claims; decide whether all declared systems require CI. | Security/IP/software/quality | Build passes macOS and Linux CI; review absent |
| G2-T04 | Independently review the Lean definitions, theorem statements, standard axiom boundary (`propext`, `Quot.sound`, `Classical.choice` where reported), parser coverage and canonical schema. | Formal-method reviewer and independent verifier | Unassigned/open |
| G2-T05 | Approve which Lean obligations are mandatory, which require strengthening, and whether Rocq Phase B is rejected/deferred/spiked. | Quality, software, independent verifier | CE5 approval open; Rocq excluded for now |
| G2-V01 | Fix exact unit/property/corpus counts, random seeds/replay, browser/device environments, retry/skip rules and acceptance criteria. | Quality, clinical, software, HF/security | Open |
| G2-V02 | Select independent oracle/verifier, controlled evidence repository, signature mechanism, retention period and report formats. | Quality/manufacturer | Unassigned/open |
| G2-V03 | Approve QMS-001 change/anomaly/release procedure and reconcile every Step 2 decision into SYS/RMF/TRC. | Quality and affected owners | Draft/open |
| G2-V04 | Sign GATE-002 against one exact, internally consistent commit. | Manufacturer, pharmacy, software, quality, HF, security, verifier | Missing |

## 6. Formal verification still remaining

The Lean implementation reduces risk in the pure arithmetic specification; it
does not complete formal verification of the product.

| ID | Remaining formal work | Dependency/evidence | Status |
| --- | --- | --- | --- |
| FV-01 | Parameterize the model with the clinically approved field/output bounds and prove parser admission/operation boundedness for the deployed integer representation. | G2-N02/N03/N04 | Blocked |
| FV-02 | Implement and prove the approved rounding/display/below-threshold algorithm, including trailing zeros and disclosure. | G2-N07 | Blocked; current type only prohibits shown zero |
| FV-03 | Strengthen parser proofs from executable representative rejection theorems to the independently approved exhaustive grammar/property statement. | Grammar approval and formal review | Open |
| FV-04 | Expand canonical vectors to the full approved corpus and every below/at/above bound, rounding boundary and error-priority combination. | G2 numeric decisions/oracle | Blocked |
| FV-05 | Build the pure TypeScript engine and `test:formal:conformance`; compare exact canonical decisions/results for every vector and generated case. | G3 engine | Not started/critical gap |
| FV-06 | Add property-driven Lean/TypeScript case generation with retained seed/path and anomaly capture. | DEV/VVP approval | Not started |
| FV-07 | Have an independent reviewer approve theorem adequacy, proof definitions, reported axioms, shared-assumption risk and the CLI/schema boundary. | Named verifier | Unassigned |
| FV-08 | Capture immutable Lean/Nix/source/vector/report hashes and axiom output in VVR-001; map every formal result into TRC-001. | G7 controlled run | Not executed |
| FV-09 | Decide whether Mathlib remains unnecessary and whether Rocq extraction would materially reduce residual implementation-divergence risk. | Post-G3 risk review | Deferred decision |

## 7. G3 — Calculation implementation verified

| ID | Remaining action | Evidence/status |
| --- | --- | --- |
| G3-01 | Add strict TypeScript configuration and pure decimal/unit/calculation/result/format modules outside `App.svelte`. | Not implemented |
| G3-02 | Implement the approved strict parser, checked exact `bigint`/decimal-rational arithmetic, structured errors and operation bounds. | Blocked by G2 |
| G3-03 | Implement approved exact/display separation and rounding without positive-to-zero output. | Blocked by G2 rounding decision |
| G3-04 | Integrate equations and result from one validated object; eliminate every parallel reactive arithmetic path. | Not started |
| G3-05 | Preserve/reverify result concealment, review resets, equivalent-text policy and DOM/domain unit-selector synchronization. | Prototype behavior only |
| G3-06 | Install/configure Vitest/fast-check/reporting and add complete unit/property/corpus/regression tests. | Not implemented |
| G3-07 | Implement TypeScript/Lean differential conformance and record every mismatch as an anomaly. | Lean side ready; TypeScript side absent |
| G3-08 | Independently review code, corpus, oracle and Lean boundary; disposition FND-C1/H2/A1/A2/A5/A11 and all anomalies. | Open findings |
| G3-09 | Update RMF/TRC with implemented controls/results and sign GATE-003 for one exact candidate. | No G3 candidate selected |

## 8. G4 — Trusted state boundaries

- Implement typed schema/repository modules with no direct UI storage access.
- Decide and implement IndexedDB or prove equivalent controls for retained
  `localStorage`.
- Treat original source inputs as authoritative; discard/recompute derived
  values through the exact G3 engine.
- Implement record-level validation/quarantine, future/legacy/equation-version
  policy and transactional/idempotent migrations.
- Implement idempotent save, retention/caps, accessible deletion safeguard,
  quota/unavailable/corrupt/evicted states and honest recovery messages.
- Prove user records never enter URLs, requests, logs, diagnostics or service-
  worker caches/messages.
- Complete unit/property/browser/migration/rollback/privacy evidence,
  disposition FND-H1/A3 and sign GATE-004.

## 9. G5 — Representative interface

- Extract Mix, CalculationReview, Favourites and History components and remove
  duplicate/conflicting layout passes.
- Remove unconditional overflow suppression and implement safe scrolling/
  reflow at every required viewport, orientation, 200% text/zoom and text-
  spacing condition.
- Meet approved size/spacing/focus/keyboard/modal/screen-reader/MathML/error
  behavior across every incomplete, error, review, result and storage state.
- Reconcile final-volume terminology, equations, limitations, local/offline
  wording and version/prototype identity with the approved label.
- Approve and execute a formative protocol with representative Canadian nurses;
  retain failures/deviations as anomalies and demonstrate independent review
  comprehension without calling the work summative validation.
- Close applicable interface/accessibility findings and create only then the
  exact-build screenshot manifest for the dossier.
- Sign GATE-005 for one exact source/build/evidence set.

## 10. G6 — Controlled reference build and security evidence

- Implement host-enforced restrictive CSP/supporting headers and full negative
  network-constructor/static-request allowlist tests.
- Complete threat model and qualified security review; perform or formally
  defer the independent penetration test under the approved risk decision.
- Generate machine-readable SBOM covering npm, Nix closure, actions, fonts and
  assets; complete licence/source/vulnerability disposition.
- Set default workflow permissions to `contents: read`, isolate deploy write,
  pin every remaining action to full SHA, serialize mutation and verify fork/
  non-root behavior. Existing E2E/deploy action pins and broad workflow-level
  permissions remain findings; the new formal job alone does not fix them.
- Add dependency review, secret scanning and approved static analysis with
  controlled thresholds/dispositions.
- Remove the unused dilution-container asset or justify it; decide KaTeX/font
  subsetting without losing MathML/licence/accessibility behavior.
- Produce two reproducible clean builds, full file hashes, provenance and
  visible source/cache/artifact identity reconciliation.
- Implement and test atomic digest-bound app-shell install, N→N+1 activation,
  rollback, open-client handling, corrupt/partial updates, cache/database
  compatibility, quota/eviction and recovery on the supported matrix.
- Define proposed controlled clinical host/operator while retaining GitHub
  Pages only as a prototype channel; sign GATE-006.

## 11. G7 — Controlled verification and anomaly closure

- Close G3–G6 and approve VVP-001/QMS-001 before the controlled run.
- Execute every locked install, static, unit/property, coverage, build,
  non-root, browser, accessibility, security, audit, formal and differential
  command from one clean immutable checkout.
- Capture exact tools/environments, commands, timestamps, seeds, totals,
  failures/skips/retries, logs/reports and artifact hashes outside transient CI.
- Assign an anomaly before rerunning every unexpected result; complete root
  cause, impact, correction, regression and independent disposition.
- Expand E2E to every calculation/error/review/storage/accessibility/network/
  offline/update/rollback/eviction state on the approved matrix.
- Close every applicable SYS/RMF/CALC/STO/SEC/finding/formal trace in TRC-001;
  no unexplained missing/not-run/failed evidence may remain.
- Issue and independently approve VVR-001. No critical/high anomaly may remain;
  all lower items require documented quality disposition.
- Sign GATE-007 for the exact source/artifact/report/archive hashes.

## 12. G8 — Immutable future clinical-release baseline

- Assign/freeze the next controlled clinical-release candidate, full commit/tag, artifact/app-shell
  manifest and every source/dependency/evidence hash in REL-001.
- Archive source, lockfiles, Nix inputs, SBOM, VVR/raw evidence, TRC/anomalies,
  threat/security records and controlled screenshots under approved retention,
  access, backup and integrity controls.
- Finish the English label/IFU from approved REG-002/RMF evidence.
- Obtain a qualified human French translation and separate French clinical-
  equivalence review; no machine-generated placeholder may enter the baseline.
- Complete exact-build label/reflow/offline verification and software version/
  finding/deferred-work summary relative to `3b4b63b`.
- Protect the frozen branch/baseline and require impact assessment/new hashes/
  affected reruns for every later change; sign GATE-008.

## 13. G9/G10 — Future formal dossier, routing and correspondence

- Select the applicable post-response non-device, MDEL, Class II/III MDL or
  additional-information route; do not reuse the inquiry email as an assumed
  licence-application route.
- Populate the applicable formal dossier only from approved records and the
  exact G8 build; remove every placeholder and generate controlled outputs with
  tool/version/hash records.
- Verify current consolidated law/guidance and every statutory pin-cite with
  regulatory counsel at approval and submission.
- Independently audit version/hash consistency, screenshots, equations,
  examples, risk/claims, criterion 3 ambiguity, bilingual equivalence,
  IP/manufacturer authority and deferred-work accuracy.
- Obtain manufacturer/regulatory/counsel/quality G9 signatures for the exact
  package digest.
- On the send day, verify the current official route and, when MDEL is relevant,
  the then-effective FRM-0292 including the known 2026-12-14 transition.
- Send one approved package through the applicable verified route; archive the
  exact submission, attachments, delivery, acknowledgement/reference and deadlines.
- Control every response through the G10 correspondence record; reopen affected scope/gates rather
  than paraphrasing Health Canada's position into a stronger conclusion.

## 14. Work after the classification response

The regulatory lead/counsel must preserve the exact Health Canada response and
choose the applicable branch in AUTHORIZATION_PLAN section 9:

- non-device: document rationale/conditions/change triggers and complete all
  non-device clinical-release controls;
- Class I: complete establishment/distribution/MDEL and applicable post-market
  obligations before sale/import/distribution;
- Class II: complete the applicable quality-system/MDSAP and Medical Device
  Licence route before distribution;
- Class III: obtain counsel-confirmed classification/rule analysis and prepare
  the substantially larger evidence/licence package; or
- indeterminate: answer requested facts/evidence under change control and seek
  a meeting or formal application route as advised.

No branch may treat classification support as approval or clinical-use
authorization.

## 15. Clinical-release work deliberately not retired by classification

Before any patient-care release, complete or confirm applicability of:

- full lifecycle/QMS records, configuration/document control and supplier
  controls appropriate to the determined route;
- complete ISO 14971-style risk file, residual/overall benefit-risk review and
  control-introduced hazard assessment;
- summative bilingual human-factors validation and clinical evaluation;
- any required investigational testing/REB/institutional governance;
- independent penetration testing and production vulnerability monitoring/
  disclosure/incident operation;
- final bilingual e-label/IFU, training, support and accessibility evidence;
- controlled hosting/distribution, customer/institution/version registry,
  update/rollback/end-of-support and recall effectiveness tests;
- complaint, incident, CAPA, safety communication, field correction/recall and
  Canadian reporting processes with current timelines/contacts;
- federal/provincial/territorial privacy, nursing, pharmacy, accessibility,
  procurement and institutional approvals; and
- insurance, contracts, support staffing and legal manufacturer operational
  capacity.

## 16. Completion rule for this register

Quality updates this record after every approved decision or verified work
item. An item moves to complete only with its cited objective evidence and
approval, not because a related commit merged. Any new intended use, feature,
unit, integration, medication/patient logic, cloud flow, AI/ML behavior or field
signal adds work and reopens the affected gate/risk/dossier records.
