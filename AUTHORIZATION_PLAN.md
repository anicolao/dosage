# Health Canada classification-readiness and authorization plan

Plan date: 2026-08-13
Repository legacy review baseline: `3b4b63b` on `agent/history-review`
Early inquiry product baseline: `6b53fde87ff9b193b3c24f7bd93549746b4d6471`
Inputs reviewed: `CLAUDE_REVIEW.md`, `CODEX_REVIEW.md`, and
`CANADIAN_REGULATIONS.md`

> This is an implementation and regulatory planning document, not legal advice,
> a Health Canada decision, or permission for patient care. The current build
> remains an unvalidated prototype and must retain “not for patient care”
> labelling throughout this plan.

## 1. Target outcome and important boundary

The immediate outcome is a **classification-ready exact-prototype description and a
concise classification-support request** to Health Canada's Medical Devices
Directorate. The request will ask:

1. whether the defined Dosage reference product is outside the Medical Devices
   Regulations under Health Canada's four SaMD exclusion criteria; and
2. if it is a medical device, which class Health Canada considers appropriate.

This is not yet a Medical Device Licence (MDL) application. Health Canada says
that final risk classification is confirmed when it reviews a licence
application, if a licence is required. A classification-support response must
therefore be retained as regulatory planning advice, not marketed as approval,
clearance or authorization.

Do not delay the classification request until every clinical-release activity
is complete. MDSAP certification, a complete ISO 13485 system, summative
clinical usability validation, a penetration test, provincial procurement and
post-market operations are not prerequisites to asking the classification
question. They become required or strongly advisable after the route is known.

The product submitted for early classification verification is the functionality
implemented by the exact current prototype at `6b53fde`. Known implementation
defects do **not** need to be corrected before Health Canada can classify those
functions, but they must be candidly disclosed, the prototype must remain
unavailable for patient care, and no submission statement may imply that the
software is validated or safe. The positive-to-displayed-zero, accessibility,
stored-record, security and lifecycle defects remain mandatory remediation
before a clinical release. Any remediation that adds, removes or materially
changes a submitted function requires classification impact assessment.

## 2. Recommended submission strategy

Use one clearly bounded product—not several hypothetical variants—for the
initial request.

### 2.1 Exact inquiry-product scope

The inquiry product is package version `0.1.0` at full source commit
`6b53fde87ff9b193b3c24f7bd93549746b4d6471`. Its functionality is frozen by
`INQ-000_EXACT_PROTOTYPE_BASELINE.md`. The inquiry must describe what this code
actually does, including:

- intended user: a trained nurse working under an existing authorized
  medication order in a Canadian clinical setting;
- intended function: calculate a volume in mL using manually entered vial-label
  quantity/unit, vial volume, user-selected final prepared volume and manually
  entered already-authorized dose/unit;
- supported preparation: one vial, one final prepared volume, one ordered dose;
- units: `mg` and `mcg`, with explicit mg↔mcg conversion;
- output: the substituted concentration, conversion and administration-volume
  equations, followed by the calculated mL only after independent review;
- no dose, medication, concentration, route, rate or final-volume selection or
  recommendation;
- no determination that an order is correct, safe or clinically appropriate;
- no patient characteristics, drug database, product monograph database,
  protocol engine, range checking or clinical alerts;
- no barcode, camera, OCR, voice, EHR, pharmacy-system, pump or monitoring-device
  input;
- no cloud service, account, analytics, telemetry, crash upload or AI/ML;
- current local-only favourites and history implemented in browser
  `localStorage`, including their known validation limitations; and
- installable PWA operation after one successful online app-shell installation,
  with no first-visit-offline claim and the current cache-first service-worker
  behavior disclosed without claiming controlled rollback or eviction recovery.

Before IQ-001 closes, the manufacturer, pharmacy and nursing reviewers must
state the actual intended users/settings and every represented limitation.
Because the prototype does not technically enforce patient, medication or care-
setting exclusions, the package must not claim that proposed paper limitations
are implemented controls. Health Canada should be asked how those facts affect
criterion 3 and fallback classification. Technical enforcement and final
clinical limitations remain G1–G7 work.

### 2.2 Proposed intended-use text

Freeze one intended-use statement before changing code:

> Dosage is a software arithmetic aid intended for trained nurses in Canada to
> calculate a volume in millilitres from a manually entered medication vial
> quantity, a manually entered vial volume, a manually entered or selected final
> prepared volume, and an already-authorized medication dose. Dosage displays
> the complete substituted arithmetic for independent review. It does not
> select, recommend, prescribe, validate, modify or assess the appropriateness
> of a dose, medication, route, rate, preparation method or treatment and is not
> a substitute for the medication order, authorized product information,
> pharmacy instructions, independent double-check requirements or institutional
> policy.

Regulatory, nursing, pharmacy and human-factors owners must approve any change
to this text. The wording in the UI, README, IFU, website and classification
request must remain identical in substance.

### 2.3 Intended submission route

**Primary contact:** send the initial classification-support request to Health
Canada's Medical Devices Directorate at
`meddevices-instrumentsmed@hc-sc.gc.ca`. The current MDEL instructions, updated
2025-02-26, explicitly say to use that address to “make a classification
request.” Although the contact appears inside MDEL instructions, the direction
is specifically about determining whether a product is a medical device and its
class; it is not the separate MDEL application mailbox.

**Secondary contact:** the older 2019 SaMD guidance lists
`hc.devicelicensing-homologationinstruments.sc@canada.ca` for further clarity on
the interpretation of a specific classification rule. Do not use it for the
initial request and do not send duplicate requests. Use it only if the Medical
Devices Directorate redirects the request there or recommends a rule-
interpretation/pre-submission discussion.

This ordering reconciles `CANADIAN_REGULATIONS.md` and this plan. Verify that
the primary address and wording remain current on Canada.ca on the submission
day; if Health Canada has published a newer classification-request instruction,
follow it and record the source/date in the submission file.

**Dated transition alert:** Health Canada has already published a superseding
FRM-0292 titled “Medical Device Establishment Licence (MDEL) application:
instructions (effective December 14, 2026)” in connection with SOR/2026-110.
The future instructions are reference-only before that date. As retrieved on
2026-08-07, they retain `meddevices-instrumentsmed@hc-sc.gc.ca` as the
classification-support address, but the executor must not assume that the
reference copy remains unchanged. A request sent on or after 2026-12-14 must be
checked against the then-effective FRM-0292 and any implementation notices. The
same transition also requires the later MDEL/distribution analysis to account
for the amended foreign-distributor exemptions, supplier-information duties and
documented-procedure requirements.

Primary sources:

- [Health Canada SaMD definition and classification guidance](https://www.canada.ca/en/health-canada/services/drugs-health-products/medical-devices/application-information/guidance-documents/software-medical-device-guidance-document.html)
- [Health Canada SaMD classification examples](https://www.canada.ca/en/health-canada/services/drugs-health-products/medical-devices/application-information/guidance-documents/software-medical-device-guidance/examples.html)
- [MDEL instructions containing the classification-support route](https://www.canada.ca/en/health-canada/services/drugs-health-products/compliance-enforcement/establishment-licences/forms/medical-device-establishment-licence-application-form-instructions-0292.html)
- [Future FRM-0292 effective 2026-12-14](https://www.canada.ca/en/health-canada/services/drugs-health-products/compliance-enforcement/establishment-licences/forms/dec-medical-device-establishment-licence-application-form-instructions-0292.html)
- [SOR/2026-110 establishment-licence amendments](https://gazette.gc.ca/rp-pr/p2/2026/2026-06-17/html/sor-dors110-eng.html)

## 3. Two controlled paths

The early classification inquiry and later clinical authorization are separate.
The inquiry obtains regulatory direction before incurring the entire clinical-
release programme:

```text
G0-01 manufacturer/signatory authority + required role appointments
  → INQ-000 exact prototype facts and known limitations
    → IQ-001 intended use, clinical facts and exclusion/fallback analysis
      → generated SUB-000–SUB-009 package
        → IQ-002 independent audit and exact-package release
          → send once; control response in COR-002
            → select regulatory branch

In parallel or after response:
G0 → G1 → G2 → G3/G4/G5/G6 → G7 → G8 → G9 → G10 clinical-release readiness
```

IQ-001/IQ-002 do not close, waive or renumber G0–G10. G0–G10 continue to govern
implementation remediation and future clinical distribution. No inquiry
approval may be cited as validation, risk acceptance or patient-care authority.

## 4. Required roles and approvals

One person may fill more than one role in a small organization, but independent
verification of the calculation cannot be performed only by its implementer.

| Role | Accountable early-inquiry work |
| --- | --- |
| Legal manufacturer / executive owner | Own product name and intended purpose; provide Canadian contact; approve resources and submission; accept business risk. |
| Regulatory lead | Control intended use and claims; prepare exclusion/classification analysis; correspond with Health Canada; maintain regulatory decision log. |
| Quality lead | Control YAML/generated records, evidence, versions, approvals, audit findings and the exact outgoing package; preserve the distinction between inquiry and release evidence. |
| IP/commercialization counsel | Not an automatic inquiry blocker; advise if manufacturer authority or a factual representation is disputed. Full provenance/GPL/distribution advice remains G0/G1 work before commercialization. |
| Clinical pharmacy / medication-safety reviewer | Confirm formula source, routine-practice basis, worked example, immediate-use consequences and the accuracy of stated limits. |
| Nursing / human-factors reviewer | Confirm that the submitted user, setting, workflow, independent-review steps and immediate-use description are factually realistic; this is not summative validation. |
| Software lead | Confirm every function, architecture, limitation, screenshot and artifact statement against the exact source baseline. |
| Independent calculation verifier | Reproduce the submitted worked example and confirm the disclosed Number/formatting limitations; full G3/G7 verification follows later. |
| Security/privacy reviewer | Confirm current interface, network, localStorage and service-worker facts; full control approval remains G2/G6. |
| French clinical reviewer | Not required for an English classification inquiry unless Health Canada requests French or the submitted safety meaning relies on bilingual material; mandatory national-release work remains later. |

The classification package must show the legal manufacturer, not only an
individual GitHub user or repository name.

## 5. Exact sequence to classification inquiry and later authorization

### Early inquiry sequence — classify the exact current prototype

1. Complete G0-01 manufacturer identity/signatory authority and appoint the
   quality/software owners needed to make attributable records. Full G0 closure
   is not a prerequisite to the inquiry.
2. Fill `records/data/inquiry/INQ-000.yaml` and approve the exact prototype
   baseline, reproducible URL/artifact, current behavior and known limitations.
3. Fill `records/data/inquiry/IQ-001.yaml`; approve intended use, actual users/
   settings, limitations, formula/example, immediate-use facts, four-criterion
   analysis, published comparison and fallback classification proposal.
4. Fill `records/data/submission/SUB-000.yaml` through `SUB-009.yaml`, generating
   the matching Markdown with `npm run regulatory:build`.
5. Run `npm run regulatory:ready -- --record INQ-000 --record IQ-001` and the
   corresponding `SUB-*` records. Visible `MISSING` markers are submission
   blockers, not editorial notes.
6. Independently audit the exact package, verify current Health Canada routing,
   complete IQ-002, hash the attachments and obtain manufacturer authorization.
7. Send once and preserve transmission/acknowledgement/response in COR-002.
8. Continue G0–G10 according to Health Canada's response and clinical-release
   needs. Do not change submitted functionality without impact assessment.

### Structured record and generation control

YAML under `docs/regulatory/records/data/` is the editable audit source.
Mustache templates and `scripts/regulatory-records.mjs` generate deterministic
Markdown, completeness status and SHA-256 manifests under
`docs/regulatory/completed/`. Use:

```text
npm run regulatory:build
npm run regulatory:check
npm run regulatory:ready -- --record RECORD-ID
npm run regulatory:commit -- "Describe the completed evidence or decision"
```

`regulatory:commit` stages only YAML data and generated completed records and
refuses pre-existing staged files. A Git commit is an audit trail, not a human
signature. Sensitive evidence stays in the controlled quality repository and is
referenced by immutable ID. CI fails if generated documents drift from YAML.

### Full authorization sequence — unchanged G0–G10 controls

### Step 0 — Contain and baseline the prototype

**Dependencies:** none  
**Primary owner:** quality lead and software lead  
**Gate:** `G0 — controlled prototype`

1. Record `3b4b63b` as the reviewed legacy baseline and retain the three input
   review documents unchanged as design inputs.
2. Ensure every deployed preview shows “Prototype only — not for patient care.”
   Add an automated assertion for the warning.
3. Prevent public preview URLs from being presented as a clinical product.
   Access-control them or add `noindex` and prominent prototype identification.
4. Freeze additional units, calculations, integrations and clinical claims until
   the classification request is sent.
5. Open one controlled remediation record for every `CODEX_REVIEW.md` critical
   and high finding and the additional `CLAUDE_REVIEW.md` findings.
6. Create a release branch for the classification reference build. Do not use
   the GitHub Pages preview as the future clinical distribution channel.
7. Inventory the repository's copyright and contribution history, including
   author identity variants, work produced by employees/contractors and any
   copied or generated assets. Identify every person or entity that may hold
   copyright or other relevant rights.
8. Commission IP/commercialization counsel to determine whether the proposed
   legal manufacturer owns, is assigned, or has sufficient licence and
   contractual control over the complete product to modify, distribute,
   support, correct and recall it under its name. GPL-3.0 grants important
   permissions, so complete copyright ownership is not automatically required;
   the legal basis and obligations must nevertheless be explicit.

**Required records:**

- baseline revision and build hash;
- open-finding register with owner, severity and disposition;
- prototype distribution/access list; and
- signed `G0` approval.

### Step 1 — Establish controlled product documents before code changes

**Dependencies:** G0  
**Primary owner:** regulatory lead  
**Approvers:** manufacturer, pharmacy, nursing, quality  
**Gate:** `G1 — product definition frozen`

Create `docs/regulatory/` and the following controlled records:

| ID and file | Required content |
| --- | --- |
| `REG-001_PRODUCT_DEFINITION.md` | Product name/version, manufacturer, users, environment, workflow, inputs, outputs, formulas, supported platforms, feature list and explicit exclusions. |
| `REG-002_INTENDED_USE_AND_CLAIMS.md` | Approved intended use, indications, contraindications/limitations, claims register, prohibited claims and exact prototype warning. |
| `REG-003_CLASSIFICATION_QUESTION.md` | The four SaMD exclusion criteria, disputed criterion 3, non-device rationale, and fallback Class I/II/III questions. |
| `IP-001_OWNERSHIP_AND_LICENSING.md` | Git contributor/copyright inventory, assignments or licence basis, GPL-3.0 obligations, third-party licences/assets, trademark/product-name status, distribution-model analysis and counsel conclusion. |
| `SYS-001_SYSTEM_REQUIREMENTS.md` | Numbered user, safety, functional, accessibility, privacy, security, storage, availability and labelling requirements. |
| `ARC-001_ARCHITECTURE_AND_DATA_FLOW.md` | Component diagram, trust boundaries, local data, build/deployment path and proof that there is no runtime backend or medical-device signal input. |
| `TRC-001_TRACEABILITY_MATRIX.csv` | Hazard → requirement → implementation → verification → evidence status. Initially incomplete, then closed before G7. |

Actions required while producing them:

1. Resolve the contradiction in `VISION.md` about whether mg↔mcg conversion is
   supported. The controlled decision should be “supported and explicitly
   displayed” for the proposed reference product.
2. Separate current behaviour from future requirements in `README.md`,
   `VISION.md`, `MVP_DESIGN.md` and `MVP_UX_DESIGN.md`.
3. Preserve favourites and history as implemented features of the product
   boundary. Formalize their current workflow and local-only claim; do not add
   cloud sync, identity, sharing or new record functions. Safety remediation of
   storage validation/migration does not authorize feature expansion and must
   receive classification-impact assessment.
4. Approve the supported patient/care-setting/medication limitations described
   in section 2.1.
5. Remove or prohibit wording such as “safe,” “verified,” “prevents medication
   error,” “checks the order,” “approved,” or “for all medications.”
6. Define the exact supported browser/device matrix. At minimum, include the
   managed iOS/Safari and Android/Chromium combinations intended for the first
   institutional evaluation.
7. Approve the availability claim. This plan assumes the reference build is an
   installable PWA that works offline only after one successful online app-shell
   installation. Define cache integrity, update activation, rollback, storage
   eviction, recovery and supported-device requirements before G1; do not imply
   that a first visit works offline.
8. Complete `IP-001_OWNERSHIP_AND_LICENSING.md`. For every contemplated
   download, hosted deployment, institutional installation or modified build,
   record whether GPL conveyance occurs and the corresponding source, notice,
   licence-copy, modification-marking and any installation-information
   obligations. Confirm all dependency and media licences. If proprietary
   relicensing is contemplated, obtain the necessary assignments/permissions
   from every relevant copyright holder before relying on that model.
9. Confirm that the legal manufacturer has the practical and contractual
   authority to maintain the software, issue safety corrections and fulfil
   field-action obligations. Do not sign G1 until IP/commercialization counsel
   approves the ownership/licensing record or all identified gaps are resolved.

No code change may be approved after G1 unless it traces to a numbered
requirement or anomaly.

### Step 2 — Approve numeric, storage and risk specifications

**Dependencies:** G1  
**Primary owners:** pharmacy lead, software lead and quality lead  
**Gate:** `G2 — safety requirements approved`

Create:

- `CALC-001_NUMERIC_SPECIFICATION.md`;
- `RMF-001_PRELIMINARY_RISK_MANAGEMENT.md`;
- `VVP-001_VERIFICATION_PLAN.md`;
- `STO-001_LOCAL_DATA_SPECIFICATION.md`;
- `SEC-001_SECURITY_AND_PRIVACY_PLAN.md`; and
- `DEV-001_TOOLING_DECISION.md`.

#### 2.0 Development and verification tooling decision

The current repository has no unit-test dependency, `test:unit`/`test` script,
`tsconfig.json` or TypeScript domain module. Before Step 3, the software lead
must propose and the quality lead must approve `DEV-001_TOOLING_DECISION.md`.
It must specify:

1. TypeScript versus checked JSDoc at every safety-critical boundary. The
   recommended baseline is TypeScript domain/storage modules with a committed
   `tsconfig.json`; any alternative needs a documented equivalence rationale.
2. Unit-test runner and version. The recommended baseline is Vitest because the
   repository already uses Vite; any alternative must support deterministic
   headless execution and machine-readable reports.
3. Property-test library and reproducibility policy. The recommended baseline is
   `fast-check`, with failing seeds and shrunk counterexamples retained in the
   anomaly/test record.
4. Exact `package.json` scripts. At minimum, add:
   - `test:unit` for one deterministic non-watch run;
   - `test:unit:watch` for local development; and
   - `test`, defined explicitly rather than relying on an npm default. The
     recommended meaning is the unit suite; the controlled Step 7 command list
     remains the complete verification sequence.
5. Node version, package-lock policy, Svelte/Vite compatibility, test file
   convention, report location and CI invocation.
6. Static type-check, lint and formatting tools and which results are release
   blocking.
7. Test-oracle independence, coverage reporting and the rule that coverage
   percentage cannot substitute for requirement/corpus traceability.

The approved record must trace to changes in `package.json`, `package-lock.json`,
`tsconfig.json`, any Svelte/test configuration, CI and contributor instructions.
G2 cannot close while the commands used later in this plan are merely
hypothetical.

#### 2.1 Numeric specification decisions

The pharmacy lead must approve, before implementation:

1. Exact accepted decimal grammar. The proposed reference grammar is
   `^(?:0|[1-9][0-9]*)(?:\.[0-9]+)?$`: an unsigned base-10 value with a required
   leading digit, no unnecessary integer leading zero, and digits after any
   decimal point. It rejects `.5` in favour of `0.5`, and rejects exponent,
   comma, sign, whitespace, `Infinity`, `NaN` and locale-dependent separators.
   Any different clinically approved grammar must be recorded before coding.
2. Maximum digits, maximum decimal places, minimum positive magnitude and
   maximum magnitude for each input and output.
3. The numeric representation. Do not use unconstrained JavaScript `Number` as
   the safety argument. Select a bounded fixed-point or independently evaluated
   decimal implementation and document its precision, rounding and failure
   behaviour.
4. The closed unit set and exact scale ratio: only mg and mcg are accepted, and
   mg↔mcg is `1000`.
5. Order of operations chosen to avoid overflow-prone intermediates.
6. Blocking rules for blank, malformed, zero, negative, underflow, overflow,
   excessive precision, incompatible unit, final volume below vial volume,
   ordered amount exceeding available medication, and a result outside the
   approved measurable/display range.
7. Calculation precision versus display precision, rounding mode, significant
   digits, trailing zeros and wording that identifies rounding.
8. A rule that a positive result can never display or be reviewed as zero.
9. Exact formulas and the equivalence between the one-vial dose ceiling and
   administration volume not exceeding final volume.
10. Handling of final prepared volume versus nominal container volume, overfill,
    drug displacement and dead space. For the reference product, “handling”
    multi-vial use means defining how it is excluded, detected where feasible,
    rejected and labelled; it does **not** mean implementing multi-vial
    calculation support.

#### 2.2 Golden and adversarial corpus

The verification plan must include all cases in `MVP_DESIGN.md`, plus at least:

- `1e3`, `1E3`, `+1`, `-1`, `0`, blank, whitespace, comma decimal and multiple
  decimal points;
- the reproduced positive-to-zero case (`1000 mg`, `1 mL`, `1000 mL`, ordered
  `0.0000001 mg`);
- the reproduced overflow case using `1e308` or its rejected decimal form;
- values immediately below/at/above every input and result bound;
- exact mg/mcg equivalents in both directions;
- rejected activity and unknown units, including legacy saved records;
- final volume below/equal to/above vial volume;
- dose below/equal to/above available medication;
- values requiring no rounding and every permitted rounding boundary;
- independently calculated expected values; and
- properties: `Va × Cpd = D`, dose proportionality, mg/mcg equivalence, and
  vial-volume independence when final prepared volume is fixed.

#### 2.3 Preliminary hazard analysis

At minimum, assess the hazards listed in `CANADIAN_REGULATIONS.md`, including
wrong unit/decimal, arithmetic underflow/overflow, stale review, invalid saved
record, final-volume misunderstanding, clipped UI, unsupported workflow,
outdated build, tampering, storage failure and foreseeable use as a prescribing
or order-checking tool.

For each hazard, record sequence of events, hazardous situation, harm, severity,
probability assumptions, initial risk, design control, verification method,
residual risk and label control. Apply the control hierarchy: safe design first,
protective measure second, information for safety last.

### Step 3 — Refactor and correct the safety-critical calculation

**Dependencies:** G2  
**Primary owner:** software lead  
**Independent reviewer:** calculation verifier  
**Gate:** `G3 — calculation implementation verified`

#### 3.1 Create domain boundaries

Move safety-critical logic out of `src/App.svelte` into typed, pure modules. A
recommended structure is:

```text
src/lib/domain/decimal-input.ts
src/lib/domain/units.ts
src/lib/domain/calculation.ts
src/lib/domain/format.ts
src/lib/domain/result.ts
src/lib/storage/schema.ts
src/lib/storage/repository.ts
```

Use TypeScript or equivalently strict checked types at these boundaries. The UI
must receive a discriminated result such as `valid`, `incomplete`, `blocked` or
`warning`; it must never infer validity from a formatted string.

#### 3.2 Replace permissive browser parsing

1. Use text inputs with an appropriate `inputmode` instead of relying on
   `<input type="number">` behaviour that accepts exponents.
2. Preserve the exact original decimal string.
3. Parse only after grammar and magnitude validation.
4. Reject rather than normalize commas, exponent notation, signs, non-finite
   values and excess precision.
5. Validate every intermediate and final result against the numeric policy.

#### 3.3 Correct calculation and formatting

1. Use the approved decimal/fixed-point representation and bounded scale ratio.
2. Avoid multiplying a large amount into infinity before dividing it away.
3. Keep the exact calculation value separate from display formatting.
4. Produce the displayed equation and final result from the same validated
   calculation object.
5. Block an unrepresentable or too-small-to-display result.
6. Display any clinically approved rounding notice in the equation review and
   result.
7. Make unknown units incompatible by definition; never allow `null === null`
   to establish compatibility.

#### 3.4 Preserve and tighten the review gate

Retain the existing good controls:

- answer absent from the DOM/accessibility tree until all current equations are
  checked;
- any critical input change resets checks, review and acknowledgement;
- reopening a review starts with no checks; and
- a saved history calculation cannot bypass review.

Add tests proving that changing parsed-equivalent text, unit, volume or dose
still invalidates the review as specified. Do not make a checkbox or disclaimer
the primary arithmetic risk control.

#### 3.5 Correct unit-selector state

When vial-unit dimension changes, reset an incompatible ordered unit to blank.
Assert both DOM value and internal result state. The visible selector and domain
state must never disagree.

#### 3.6 Unit-level verification

Implement the runner, property library, type/configuration files and exact npm
scripts approved in `DEV-001_TOOLING_DECISION.md`. After that implementation,
the following commands must exist and run successfully:

```text
npm run test:unit
npm test
```

The unit suite must run the approved corpus, property tests, malformed-input
tests and exact regressions for every critical numeric finding. Require all
safety requirements to have passing tests; a general coverage percentage alone
is not an acceptance criterion.

The independent verifier must review the numeric specification, implementation,
test oracle and results and sign a conclusion. The implementer cannot be the
only person who determines expected values.

### Step 4 — Harden saved data and state transitions

**Dependencies:** G2 and the Step 3 domain types  
**Primary owner:** software lead  
**Gate:** `G4 — trusted state boundaries`

1. Define allowlisted favourite/history schemas with `schemaVersion`,
   `equationVersion`, bounded original decimal strings, units, supported final
   volumes, timestamps and stable identifiers.
2. Store source inputs as authoritative. Do not trust stored derived
   concentration or mL values.
3. On display/review, validate and recompute from source inputs under the
   recorded equation version. Define whether old versions are migrated,
   preserved read-only or deleted.
4. Validate each record independently. Quarantine only an invalid record and
   keep valid records available. Distinguish malformed data from unavailable
   storage.
5. Implement the approved retention cap and deletion behaviour. Record the
   decision in the privacy data flow.
6. Make saving one reviewed calculation idempotent so a double tap cannot create
   duplicates. Reset acknowledgement or disable the action after success.
7. Add undo for single-record deletion or another approved accidental-deletion
   control.
8. Test syntactically valid but structurally invalid records, unknown units,
   unsupported volumes, inconsistent derived values, partial arrays, corrupt
   JSON, future schema versions, migration, retention and storage unavailability.
9. If the final product uses `localStorage`, explicitly justify it. If it moves
   to IndexedDB, treat that as a designed migration and test transaction,
   rollback and corruption behaviour. A technology change alone is not a risk
   control.

### Step 5 — Make the interface representative, accessible and reviewable

**Dependencies:** G3; may overlap with Step 4 after domain interfaces stabilize  
**Primary owner:** software lead and human-factors lead  
**Gate:** `G5 — representative interface`

1. Split `App.svelte` after domain extraction into at least Mix,
   CalculationReview, Favourites and History components. Consolidate the two
   overlapping CSS passes into one mobile-first layout.
2. Remove unconditional global `overflow: hidden`. Allow document/panel
   scrolling when height, orientation, zoom, content or language requires it.
3. Pass the full workflow at 393×852 portrait, 852×393 landscape, 820×1180
   tablet, 1280×1000 desktop and 200% text size.
4. Ensure essential entered values are at least 16 CSS px, targets are at least
   44×44 px, target spacing is approved, focus is visible, text spacing does not
   clip and equations can wrap/read without losing meaning.
5. Add complete keyboard operation, modal focus trapping/return and no-keyboard-
   trap checks.
6. Add state-specific accessibility checks for incomplete/error calculation,
   calculation dialog, revealed result, storage error, empty/populated
   favourites and empty/populated history.
7. Test screen-reader output for equations, units, errors and review state.
8. Preserve the substituted formula and clearly distinguish final prepared
   volume from diluent added and nominal bag size.
9. Run formative sessions with representative nurses on the reference workflow.
   Classification readiness requires confirmation that the formula is actually
   independently reviewable; full summative validation remains a later release
   gate.
10. Produce stable screenshots only after this gate passes. Earlier mockups must
    be labelled historical and must not enter the dossier.

### Step 6 — Secure the reference build and delivery evidence

**Dependencies:** G3; may overlap with Steps 4 and 5  
**Primary owner:** security/privacy lead and software lead  
**Gate:** `G6 — controlled reference build`

1. Add a restrictive CSP appropriate to the static app. Default to self-only,
   prohibit unapproved connections, objects and framing, and document any
   unavoidable directive.
2. Strengthen privacy tests to deny `fetch`, XHR, `sendBeacon`, WebSocket and
   EventSource and to allowlist only the exact expected static assets.
3. Produce an SBOM for runtime and build dependencies with versions, sources,
   licences and known-vulnerability status.
4. Create a threat model covering calculation integrity, asset/dependency
   tampering, local-data disclosure/corruption, stale cache/build and
   availability.
5. Remove `static/images/dilution-containers.png` from the production bundle if
   it remains unused. Record whether KaTeX/font subsetting is deferred; size
   optimization must not remove accessible MathML or inspectability.
6. Set default GitHub Actions permissions to `contents: read`; grant write
   permissions only to the deploy job. Pin actions to reviewed commit SHAs.
7. Serialize the deployment mutation and run non-root base-path verification on
   every PR, including forks.
8. Add dependency review, secret scanning and static analysis appropriate to
   the repository.
9. Produce a deterministic production build with version/build identifier,
   dependency lock, build instructions and cryptographic hash.
10. Generate a version-bound app-shell cache, retain the active release until a
    replacement cache installs completely, and verify offline restart, update,
    rollback, storage eviction and recovery on the approved device/browser
    matrix. The service worker must never cache or transmit user records.
11. Document that GitHub Pages is a prototype demonstration channel, not the
    proposed controlled clinical distribution channel.

### Step 7 — Execute verification and close anomalies

**Dependencies:** G3, G4, G5 and G6  
**Primary owner:** quality lead  
**Gate:** `G7 — verified classification reference build`

Run against a clean checkout and locked dependencies:

```text
npm ci
npm run check
npm run test:unit
npm run build
PUBLIC_BASE_PATH=/dosage/classification npm run build
PUBLIC_BASE_PATH=/dosage/classification npm run check:base
npm run test:e2e
npm audit
```

Expand the E2E suite before G7 to cover:

- all approved calculation and error states;
- the full viewport/zoom matrix;
- Chromium and WebKit for the supported mobile/browser matrix;
- every review reset path;
- storage schema, migration, quarantine, retention and duplicate-save handling;
- exact zero-network behaviour across success, error, deletion, history review
  and reload;
- manifest/install metadata plus offline close/reopen, calculation, save,
  reload, history review, update, rollback and storage-eviction recovery;
- accessibility states, keyboard path and focus return; and
- prototype warning, version identifier and intended-use/limitation access.

The quality lead must:

1. map every test result into `TRC-001_TRACEABILITY_MATRIX.csv`;
2. record every failure as an anomaly rather than rerunning until green;
3. require root cause, impact assessment and regression evidence for each fixed
   safety anomaly;
4. prohibit release with any unresolved critical/high defect;
5. document the disposition and rationale for lower-severity findings; and
6. issue `VVR-001_VERIFICATION_REPORT.md` identifying the exact commit, build
   hash, environment, results, deviations and independent approvals.

The complete verification set must be rerun after any post-G7 code, dependency,
configuration or label change that can affect the evidence.

### Step 8 — Freeze the future clinical-release reference

**Dependencies:** G7  
**Primary owner:** quality and regulatory leads  
**Gate:** `G8 — dossier baseline frozen`

1. Assign the next controlled clinical-release candidate version and record
   commit/build hashes. Do not reuse the exact-prototype inquiry version.
2. Tag or otherwise immutably identify the source revision.
3. Archive the exact built artifact, SBOM, lockfile, verification report and
   screenshots.
4. Freeze the intended use, UI safety copy, feature list, formula, supported
   matrix and prototype warning.
5. Produce controlled electronic label/IFU content in English and independently
   clinically reviewed French. Its final status depends on the applicable
   authorization branch and is not established by the inquiry response.
6. Create a software version description explaining what changed from
   `3b4b63b`, every fixed review finding and every deferred item.
7. Prevent ordinary feature merges into the frozen branch. Any necessary change
   requires impact assessment, new build hash, affected verification rerun and
   dossier update.

## 6. Early classification-inquiry package assembly

Health Canada's July 2026 [application-content notice](https://www.canada.ca/en/health-canada/services/drugs-health-products/medical-devices/application-information/guidance-documents/expectations-information-submitted-class-iii-iv-licence-notice-industry.html)
asks Class III/IV applicants to submit concise, relevant summaries rather than
duplicative bulk material. Although this is a
classification-support request rather than a licence application, follow the
same discipline: send a clear core package and offer detailed records on
request. Do not send the entire repository or thousands of pages of raw test
output without being asked.

Any statutory pin-cite in the fallback analysis is a controlled verification
field, not permanent boilerplate. Regulatory counsel must compare it with the
current consolidated Medical Devices Regulations and current Health Canada
guidance when the attachment is approved and again before any later MDL filing.

The earlier Markdown-only `docs/regulatory/classification-request/` directory is
superseded for execution by structured YAML in
`docs/regulatory/records/data/submission/` and generated review documents in
`docs/regulatory/completed/submission/`. The current manifest is:

| Attachment | Content | Source/approver |
| --- | --- | --- |
| `00_COVER_LETTER.pdf` | Manufacturer/contact, purpose, reference version, concise classification questions and attachment list. | Regulatory; manufacturer signs. |
| `01_PRODUCT_AND_INTENDED_USE.pdf` | Product definition, intended use, users, setting, limitations, contraindications and claims. | Regulatory, pharmacy, nursing. |
| `02_WORKFLOW_AND_SCREENSHOTS.pdf` | Numbered end-to-end workflow with current reference-build screenshots, including equations, blocked errors and review reset. | Human factors, quality. |
| `03_ARCHITECTURE_AND_DATA_FLOW.pdf` | Component/data-flow diagram, manual inputs, local storage, no backend/signal/device integration, build/deployment description. | Software, security/privacy. |
| `04_CALCULATION_AND_WORKED_EXAMPLE.pdf` | Formula, actual Number/format behavior, independently reproduced example, current test/formal boundary and known numeric limitation. | Pharmacy, software and independent verifier. |
| `05_RISK_AND_KNOWN_LIMITATIONS.pdf` | Immediate-use severity, current conceptual safeguards, known defects and unclosed release controls. | Quality, pharmacy and nursing. |
| `06_ACTUAL_LABEL_AND_CLAIMS.pdf` | Actual English prototype warning/safety/claims text and prohibited claims; not final release labelling. | Regulatory and manufacturer. |
| `07_SAMD_EXCLUSION_ANALYSIS.pdf` | Evidence against each of the four exclusion criteria, with criterion 3 explicitly identified as ambiguous. | Regulatory counsel/lead. |
| `08_FALLBACK_CLASSIFICATION.pdf` | If regulated, analysis under SaMD significance/situation matrix and Rules 10(1), 10(2) and 12; explain why broad critical use could be Class III. | Regulatory counsel/lead. |
| `09_PACKAGE_MANIFEST_AND_CHANGE_BOUNDARY.pdf` | Exact source/artifact/attachment hashes and classification reassessment triggers. | Quality and regulatory. |

### 6.1 Exact exclusion analysis

The package must not assert a foregone non-device conclusion. It should state:

1. **Criterion 1 — met:** the software does not acquire/process medical images,
   IVDD data or signals. Inputs are manual.
2. **Criterion 2 — likely met:** the software applies established dimensional
   arithmetic to vial-label and already-authorized order information.
3. **Criterion 3 — requires Health Canada determination:** the software does not
   choose treatment, but the calculated mL may support immediate preparation or
   administration and could be characterized as driving clinical management.
4. **Criterion 4 — proposed met in functional concept:** the complete substituted
   basis is visible and checkable before result reveal. Disclose the absence of
   full conformance/formative evidence and the known Number/format limitations;
   do not claim that the current prototype is validated.

Compare the reference product directly with Health Canada's examples of simple
medical calculations and manually entered drug-dosing calculations that users
can independently review. Also explain material differences: Dosage calculates
administration volume for a prepared concentration and may be used immediately.

### 6.2 Exact questions to submit

Ask Health Canada to respond to these questions for this one frozen version:

1. Does the described reference product fall outside the definition of a
   medical device under the four SaMD exclusion criteria and the published
   simple/drug-calculation examples?
2. In particular, does calculating an administration volume from an
   already-authorized dose constitute merely supporting independent arithmetic,
   or does the immediate preparation context make it “drive clinical/patient
   management”?
3. If it is a medical device, which risk class and Schedule 1 rule(s) does
   Health Canada consider applicable to the stated intended use and excluded
   clinical situations?
4. Does Health Canada need any additional intended-use limitation or evidence
   to answer those questions?

Do not ask Health Canada to classify several future feature sets in the same
request. List planned integrations, drug logic, critical-care use, AI and cloud
only as excluded future changes that will receive a new assessment. Describe
offline-after-install operation as part of the frozen reference build and its
verified availability model.

### 6.3 Cover email source

`records/data/submission/SUB-000.yaml` is the controlled source for the cover
letter. The text below is illustrative only; populate the YAML with the exact
manufacturer, baseline, artifact and package facts and review the generated
document. Do not send this prose copy.

```text
Subject: Classification support request — Dosage medication-preparation
arithmetic software, exact prototype version 0.1.0

To the Medical Devices Directorate,

[Legal manufacturer] requests classification support for Dosage exact prototype
version 0.1.0 at source commit
6b53fde87ff9b193b3c24f7bd93549746b4d6471. Dosage is intended for trained nurses to perform
transparent arithmetic using manually entered vial-label information, a final
prepared volume and an already-authorized dose. It does not select or recommend
treatment. The complete basis of the result is displayed for independent
review.

The attached package defines the exact version, intended use, limitations,
workflow, architecture, calculation example, known defects and unclosed release
controls, actual prototype label/claims and our analysis of the four SaMD
exclusion criteria. Criterion 3 is the point on which we specifically request
Health Canada's interpretation because the output may be used in an immediate
medication-preparation workflow. This request does not claim that the prototype
has completed clinical validation.

Please confirm whether this product is outside the Medical Devices Regulations.
If it is a medical device, please advise which class and Schedule 1 rule(s) are
applicable. Please also advise whether this request should be redirected or
discussed in a pre-submission meeting.

No version of Dosage is being supplied for patient care while this request is
under review.

[Manufacturer and regulatory contact]
```

## 7. Future clinical-release dossier review and submission

This section governs any later formal application or remediated-product dossier
after the early inquiry response. It is not the route for IQ-002/COR-002 and is
not a prerequisite to the exact-prototype inquiry.

### Step 9 — Perform the future clinical-release/licence dossier audit

**Dependencies:** G8 and complete attachment manifest  
**Primary owner:** quality lead  
**Gate:** `G9 — formal dossier approved`

The auditor must verify:

- every screenshot comes from the frozen build;
- the feature list matches the executable software;
- every claim matches the intended-use record and draft label;
- no document says Health Canada approved/cleared/licensed the product;
- the equations and examples match the independently verified values;
- the risk summary discloses immediate-use severity and does not minimize
  criterion 3;
- the architecture accurately describes local storage and all network/build
  services;
- English and French safety statements are equivalent;
- the applicable application route, contact details, forms and source links are
  current on submission day;
- filenames, versions, dates, approvals and hashes are consistent; and
- deferred clinical-release work is not represented as completed.

Regulatory counsel must review the resulting classification decision and the
legal basis, application content and claims for the applicable branch. The legal
manufacturer signs the formal application/cover letter and G9 release record.

### Step 10 — Send and control future formal/licence correspondence

**Dependencies:** G9  
**Primary owner:** regulatory lead  
**Gate:** `G10 — formal submission acknowledged`

1. Select the applicable non-device, Class I/MDEL, Class II MDL, Class III MDL
   or additional-information route from the controlled Health Canada response
   and current law/guidance; do not assume the early-inquiry email is the later
   application channel.
2. If MDEL obligations are implicated, apply the version of FRM-0292 effective
   on the submission day, including the 2026-12-14 transition and SOR/2026-110.
   Record the instruction title/version, URL, access date and effective date.
3. Submit the exact G9-approved package through the then-current official route
   from the legal manufacturer's controlled regulatory account or mailbox.
4. Save the exact sent message, attachments and cryptographic hashes in the
   regulatory record.
5. Log the Health Canada acknowledgement, reference number, contact and every
   deadline.
6. Route every incoming question through one regulatory owner. Engineering and
   clinical staff may draft technical answers but must not send independent,
   inconsistent responses.
7. Answer only from controlled evidence. If an answer changes intended use,
   feature scope or risk analysis, reopen the affected gate and update the
   complete package.
8. Keep the reference build frozen and unavailable for patient care unless and
   until all applicable authorization and institutional release conditions are
   satisfied.

Health Canada may acknowledge, screen, request more information, impose terms or
reject an application. Record the exact wording and assumptions; do not
paraphrase it into a stronger claim or authorization.

## 8. Work deliberately deferred until after classification

The following are not prerequisites to the early IQ-002 classification request.
They remain mandatory clinical-release work where applicable:

- MDSAP certification and a complete ISO 13485 QMS;
- full IEC 62304 lifecycle records beyond the controlled reference-build set;
- complete ISO 14971 risk file and benefit-risk report;
- summative bilingual human-factors validation;
- full clinical evaluation and any required ITA/REB study;
- independent penetration test and production vulnerability-response operation;
- final bilingual e-label/IFU/training/support content;
- controlled clinical distribution, customer/version registry and recall test;
- complaint, incident, CAPA and post-market operations;
- province/territory privacy, nursing, pharmacy, accessibility and institutional
  approval; and
- product/cyber liability insurance and customer contracts.

Continue preparatory QMS, risk and security work while awaiting the response,
but do not commit to a Class II or Class III licence dossier until Health
Canada's classification direction is evaluated.

## 9. Authorization branches after Health Canada responds

### Branch A — Health Canada considers the reference product non-device software

1. Have regulatory counsel compare the response assumptions to the exact frozen
   build and intended use.
2. Issue `REG-004_CLASSIFICATION_DECISION.md` quoting the response accurately,
   listing its date, scope, assumptions and reassessment triggers.
3. Do not call the product Health Canada approved or licensed.
4. Complete all non-device clinical-release gates in
   `CANADIAN_REGULATIONS.md`, including calculation validation, summative human
   factors, privacy/security, bilingual labelling, controlled distribution,
   complaints/field correction and institutional approval.
5. Re-submit a classification question before adding any medical recommendation,
   patient logic, opaque algorithm, automation/integration, new critical-use
   claim or function that prevents independent review.

### Branch B — Health Canada considers it Class I SaMD

1. Record the applicable rule and intended-use boundaries.
2. Complete sections 10–20 safety/effectiveness objective evidence, label,
   establishment/distribution analysis and post-market procedures.
3. Determine with counsel whether the manufacturer/distributors require an
   MDEL; Class I does not receive an MDL.
4. Complete institutional and provincial gates before clinical distribution.

### Branch C — Health Canada considers it Class II SaMD

1. Establish the full ISO 13485 QMS and obtain a valid MDSAP certificate
   covering manufacture.
2. Complete software, risk, usability, clinical, cybersecurity and labelling
   evidence supporting sections 10–20.
3. Create the REP dossier and Class II MDL application, pay current fees and
   submit the required attestations, label and QMS certificate.
4. Do not advertise for sale, sell, import or clinically deploy until the MDL is
   issued and any terms/conditions are implemented.
5. Verify MDEL obligations for every importer/distributor.

### Branch D — Health Canada considers it Class III SaMD

1. Establish the full ISO 13485 design-and-manufacture QMS and obtain a valid
   MDSAP certificate.
2. Complete the full design history, ISO 14971 risk file, IEC 62304-appropriate
   lifecycle evidence, usability engineering file, cybersecurity submission,
   clinical evaluation and any required investigation.
3. Prepare the concise REP Class III dossier with the summaries and supporting
   evidence then required by the [Medical Devices Regulations](https://laws-lois.justice.gc.ca/eng/regulations/SOR-98-282/FullText.html).
   At this plan's snapshot, the Class III application content is set out in
   subsections 32(1) and 32(3); regulatory counsel must verify the current
   provisions, format and Health Canada guidance immediately before dossier
   planning and filing.
4. Obtain the MDL before sale/import or clinical deployment and operationalize
   all terms/conditions, significant-change control and annual summary-report
   obligations.
5. Verify MDEL obligations and complete institutional/provincial approvals.

### Branch E — Health Canada cannot determine classification from the package

1. Record the reason and each requested item.
2. Do not change the reference product merely to obtain a preferred class.
3. Supply focused additional evidence or request the recommended meeting.
4. Reopen the relevant gate if intended use, workflow, software or label changes.
5. If Health Canada says final classification will occur only through an MDL
   application, proceed conservatively under the class identified by regulatory
   counsel—Class III for unrestricted critical use—until Health Canada decides.

## 10. Finding-to-step coverage

| Review finding | Required step and closure evidence |
| --- | --- |
| Positive result can display as `0 mL`; overflow can enter review | Steps 2–3; numeric specification, strict decimal implementation, regression/property tests and independent verification. |
| Scientific notation and unsafe values accepted | Steps 2–3; exact grammar, text/inputmode fields and parser boundary tests. |
| No pure calculation module or unit tests | Step 3; typed domain modules and `test:unit`. |
| No unit-test runner/scripts or TypeScript configuration exists | Step 2.0 and Step 3.6; approved tooling decision, dependencies/configuration, package scripts and CI evidence. |
| Fixed-height layout clips zoom/landscape | Step 5; reflow implementation and viewport/200% evidence. |
| Persisted records are unvalidated and derived values trusted | Step 4; schemas, original strings, recomputation, versioning and quarantine tests. |
| Stale ordered-unit state | Step 3.5; state reset and DOM/domain test. |
| Duplicate history save | Step 4; idempotent save and double-tap test. |
| Coarse corruption handling | Step 4; per-key/per-record isolation and recovery tests. |
| Accessibility checks too narrow | Step 5 and Step 7; state, keyboard, focus, screen-reader and viewport evidence. |
| No CSP and incomplete network enforcement | Step 6; CSP, exact allowlist and all-API network tests. |
| Offline installation/update path requires controlled evidence | Steps 1, 6 and 7; approved availability claim, version-bound cache design, offline/update/rollback/eviction tests and recovery evidence. |
| CI has excessive permissions/deployment races | Step 6; least privilege, pinned actions, serialized deployment and fork base-path checks. |
| Single component/overlapping CSS | Steps 3 and 5; domain extraction, screen components and consolidated styles. |
| Unused asset/full KaTeX payload | Step 6; remove unused asset, risk-assess font subsetting without losing MathML. |
| Requirements contradict/drift from implementation | Step 1; controlled product/requirements records and traceability. |
| No formal risk, clinical, security or regulatory file | Steps 1–2 and dossier summaries; full clinical-release files continue after classification. |
| Prototype warning could drift | Steps 0 and 7; automated assertion and controlled claims record. |
| GPL-3.0, contributor rights and manufacturer authority are not established | Steps 0–1; contributor/title/licence inventory and counsel-approved `IP-001_OWNERSHIP_AND_LICENSING.md` before G1. |

### Findings that do not block the early classification inquiry

The reviews also identify useful maintenance work that does not materially
change the classification analysis. Record, prioritize and disposition it, but
do not delay IQ-002 solely for these items unless they make a submitted fact or
classification analysis inaccurate:

- align history pagination with favourites;
- optimize or subset KaTeX only after proving MathML and equation readability
  are preserved;
- clean up obsolete PR-preview URLs, sibling-repository documentation links and
  closed-preview directories;
- add `engines.node`, lint/format configuration and a Svelte configuration file;
- decide whether older design mockups remain useful design-history records or
  should move to archival/LFS storage; and
- reconcile aspirational Edit/New Mix/draft-preservation UX text by marking it
  future or removing it from the controlled reference requirements.

These items remain normal controlled changes. None may alter intended use,
calculation behaviour, independently reviewable equations, security boundary or
evidence without reopening the affected gate.

## 11. Early classification-inquiry definition of done

The package is ready to send only when every item below is true:

- [ ] Legal manufacturer and controlled regulatory contact are identified.
- [ ] INQ-000 identifies one exact source commit, executable artifact/URL,
  screenshots and every actual function/known limitation.
- [ ] Intended user, setting, represented purpose and limitations are signed and
  match the executable prototype; unimplemented exclusions are not called
  enforced controls.
- [ ] Current build remains clearly unavailable for patient care.
- [ ] Pharmacy confirms the formula/routine-practice source and an independent
  reviewer reproduces the worked example; current Number/formatting behavior is
  accurately disclosed.
- [ ] Nursing confirms the submitted workflow and immediate-use context are
  factually realistic; no claim of summative validation is made.
- [ ] Architecture, localStorage, service-worker, network and current English
  warning/claim descriptions match the exact prototype.
- [ ] Known defects and unclosed clinical-release controls are conspicuously
  disclosed without being represented as accepted risk.
- [ ] Four-criterion SaMD analysis candidly identifies criterion 3 ambiguity.
- [ ] Non-device and Class I/II/III alternatives are supported by the applicable
  Health Canada guidance and rules.
- [ ] Every required YAML value, evidence reference and approval is populated;
  `regulatory:ready` passes for INQ-000, IQ-001, IQ-002 and SUB-000–SUB-009.
- [ ] Every generated attachment matches YAML/template hashes and the exact
  package has an independent consistency/regulatory review.
- [ ] Health Canada contacts and source documents were rechecked on submission
  day.
- [ ] Legal manufacturer approved the exact sent package.

## 12. Practical schedule and sequencing constraints

With a dedicated software engineer plus part-time regulatory, quality, pharmacy,
nursing/human-factors and independent verification support, a reasonable
planning range is:

| Work | Planning range | Parallelism |
| --- | ---: | --- |
| Early exact-prototype inquiry (G0-01/roles, INQ-000, IQ-001/2, SUB package) | 2–6 weeks | Identity, clinical facts, screenshots, calculation and regulatory review can overlap. |
| Steps 0–1: containment and product definition | 1–3 weeks | Regulatory/clinical workshops can run together. |
| Step 2: numeric/risk/test specifications | 2–4 weeks | Security/privacy specification can run alongside numeric work. |
| Steps 3–6: implementation and hardening | 5–10 weeks | Storage, UI and security can overlap after domain interfaces stabilize. |
| Step 7: verification and anomaly closure | 2–5 weeks | Starts incrementally, but final run waits for all implementation gates. |
| Steps 8–9: freeze, dossier and audit | 1–3 weeks | Screenshots and final summaries wait for the frozen build. |
| Step 10: submission | 1 working day after approval | Response time is controlled by Health Canada and is not estimated here. |

These are planning ranges, not regulatory promises. Pharmacy availability,
numeric-policy decisions, formative-user findings and defects may extend the
critical path. Do not compress independent verification or skip a failed gate
to meet a target date.

## 13. Bottom line

The exact current prototype should be submitted for classification as a narrow,
transparent arithmetic aid, not as an unrestricted clinical dosing system. The
shortest defensible route is:

1. establish the manufacturer/signatory and accountable record owners;
2. freeze and accurately describe the exact `6b53fde` prototype, including
   known defects and absence of patient-care authorization;
3. approve the intended purpose, actual functional boundary, clinical facts,
   worked example, exclusion analysis and fallback position;
4. generate/audit one hashed package from YAML and send it once; and
5. ask Health Canada whether immediate medication-preparation use still fits
   the published exclusion for independently reviewable drug calculations.

Do not spend the time and money for a Class II/III licence application before
obtaining classification direction. The defective prototype may be the subject
of classification if the package is candid; it may not be supplied or described
as reliable for patient care. IQ-001/IQ-002 are the next gates. Clinical
authorization remains the separate G0–G10 programme.
