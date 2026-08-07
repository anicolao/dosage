# RMF-001 — Preliminary risk-management plan and hazard analysis

| Field | Value |
| --- | --- |
| Record ID | RMF-001 |
| Status | **Draft — unapproved; not a complete ISO 14971 risk file** |
| Owner | Quality lead (unassigned) |
| Clinical risk owner | Clinical pharmacy / medication-safety lead (unassigned) |
| Required approvers | Legal manufacturer, regulatory, pharmacy, nursing/human factors, software, security/privacy, quality |
| Related records | REG-001, REG-002, SYS-001, CALC-001, STO-001, SEC-001, VVP-001, TRC-001, FND-001 |
| Target | `0.2.0-classification` reference product |
| Draft version/date | 0.1 / 2026-08-07 |

This is a preliminary, ISO 14971-style planning record for classification
readiness. It neither asserts conformity with ISO 14971 nor concludes that any
risk is acceptable. G1 is open, risk roles are unassigned, probability and
acceptability criteria are unapproved, controls are largely unimplemented, and
no qualified person has accepted residual or overall risk. The prototype
remains **not for patient care**.

## 1. Purpose and boundaries

The purpose is to establish a repeatable method, identify the currently known
hazards, propose a control hierarchy, and expose the human decisions and
evidence needed before G2 and later gates can close. The analysis covers the
proposed one-vial `mg`/`mcg` arithmetic aid, its local saved data, installable
offline web delivery, supported browser/device, labelling and foreseeable use.

It does not yet cover a final legal manufacturer, approved medication list,
patient population, care setting, platform matrix, useful life, production
process, complaint history or post-market data. Those omissions prevent a
complete risk estimate and benefit-risk determination.

Risk management does not validate clinical policy. The pharmacy and nursing
owners must approve the intended workflow, formulas, exclusions, severity
rationales and foreseeable-use analysis. The legal manufacturer remains
responsible for accepting the plan and final residual/overall risk.

## 2. Proposed method

For each hazard, the controlled file shall:

1. identify the hazard and foreseeable initiating events;
2. document the sequence of events and hazardous situation;
3. identify plausible harms and the worst credible harm for the approved
   scope;
4. estimate severity and probability before controls using approved criteria;
5. evaluate initial risk against approved acceptability criteria;
6. select controls in order: inherent safe design, protective measures, then
   information for safety;
7. translate each control into a requirement and verification method;
8. verify implementation and validate user-dependent controls;
9. estimate and evaluate residual risk, including risks introduced by controls;
10. disclose applicable residual risk in approved labelling; and
11. evaluate overall residual risk against the documented clinical benefit.

The analysis is updated when a requirement, hazard, anomaly, complaint,
security issue, platform, clinical scope, deployment model or regulatory
assumption changes. TRC-001 provides the bidirectional hazard-to-evidence index;
this document remains the risk rationale. FND-001 anomalies cannot be closed by
editing a risk score.

## 3. Proposed, unapproved risk-estimation criteria

### 3.1 Severity scale

| Level | Proposed definition | Examples requiring clinical confirmation |
| --- | --- | --- |
| S1 — Negligible | No injury; transient inconvenience with no clinical intervention | Re-entry delay with an immediately available safe fallback |
| S2 — Minor | Temporary, reversible injury or delay requiring little or no professional intervention | Minor transient effect detected before administration |
| S3 — Serious | Reversible injury requiring professional intervention, monitoring, or extended care; or material privacy harm | Medication error requiring treatment without permanent impairment |
| S4 — Critical | Life-threatening injury, permanent impairment, or urgent intervention needed to prevent either | Serious preparation/administration error detected only after exposure |
| S5 — Catastrophic | Death or multiple catastrophic injuries | Fatal medication error |

These are conservative proposals, not clinical determinations. The pharmacy
and nursing/human-factors leads must approve the definitions and the severity
assigned to every hazardous situation. Severity must not be reduced merely
because an external double check is expected.

### 3.2 Probability scale

| Level | Proposed qualitative definition | Quantitative threshold |
| --- | --- | --- |
| P1 — Improbable | Not expected during the product lifetime but credible | **TBD** |
| P2 — Remote | Could occur rarely | **TBD** |
| P3 — Occasional | Could occur sometimes in the intended population/workflow | **TBD** |
| P4 — Probable | Expected repeatedly across deployed use | **TBD** |
| P5 — Frequent | Expected often or under ordinary use | **TBD** |
| P-U — Unknown | Evidence is insufficient for a defensible estimate | Not applicable; risk cannot be accepted |

Probability must address the complete sequence to harm, with assumptions and
data sources recorded. Repository tests, absence of complaints from a
prototype, a warning, or reliance on a careful nurse are not occurrence data.
Until representative-use and reliability evidence exists, this draft uses
`P-U`.

### 3.3 Proposed risk-evaluation rule

This rule is a working proposal only:

| Initial/residual combination | Proposed evaluation |
| --- | --- |
| Any `P-U` | Not estimable; cannot be accepted |
| S5 at any probability | Unacceptable; reduce risk as far as possible and require documented benefit-risk review |
| S4/P2–P5, S3/P3–P5, S2/P4–P5, S1/P5 | Unacceptable |
| S4/P1, S3/P1–P2, S2/P1–P3, S1/P4 | Review required; accept only after further reduction is shown impracticable and benefit-risk is favourable |
| S1/P1–P3 | Potentially acceptable after verified controls and quality approval |

The legal manufacturer and quality lead must approve or replace the matrix,
including quantitative probability thresholds and the policy for reducing risk
as far as possible. No row in section 6 is accepted under this draft.

## 4. Risk-control hierarchy and control register

Warnings, acknowledgements, equation checkboxes and instructions are not
sufficient primary controls where validation, a closed type, exact arithmetic,
state invalidation, schema enforcement or deployment control is feasible.

| Control ID | Level | Proposed control | Requirement/source |
| --- | --- | --- | --- |
| RC-NUM-01 | Inherent safe design | Strict decimal grammar, field-specific bounds, original-text retention and fail-closed parsing | CALC-001; INP-004; CAL-008 |
| RC-NUM-02 | Inherent safe design | Closed `mg`/`mcg` type and exact 1000:1 conversion; reject activity, unknown and legacy units | CALC-001; INP-002; INP-005 |
| RC-NUM-03 | Inherent safe design | Bounded exact calculation, checked intermediates and structured error results | CALC-001; CAL-002 |
| RC-NUM-04 | Inherent safe design | Separate exact/display values; positive result never renders as zero; rounding disclosed | CALC-001; CAL-003; CAL-006; CAL-007 |
| RC-NUM-05 | Inherent safe design | Enforce final-volume/vial-volume and one-vial ceilings; expose no result for unsupported multi-vial use | CALC-001; CAL-004; CAL-005 |
| RC-REV-01 | Protective measure | Reveal result only after all substituted equations are reviewed | REV-001; REV-002 |
| RC-REV-02 | Inherent safe design | Revoke review, result and acknowledgement on every approved critical transition | REV-003; CALC-001 DEC-NUM-012 |
| RC-STO-01 | Inherent safe design | Versioned schemas at read/write boundaries; quarantine invalid/future records independently | STO-001–STO-004 |
| RC-STO-02 | Inherent safe design | Revalidate raw inputs and recalculate; never trust persisted derived values | STO-002; REV-004; REV-005 |
| RC-SCP-01 | Inherent safe design | Restrict capabilities and enforce approved patient/medication/workflow scope where feasible | USE-001–USE-003; CAL-009 |
| RC-SCP-02 | Protective measure | Controlled institutional allowlist, deployment, training and access | AVL-005; REG-001 |
| RC-HFE-01 | Inherent safe design | Reflowing, accessible critical content and unambiguous input/equation/result presentation | ACC-001–ACC-004 |
| RC-HFE-02 | Protective measure | Representative-user validation of final-volume, conversion, interruption and misuse scenarios | HFE-001; HFE-002 |
| RC-AVL-01 | Inherent safe design | Atomic versioned app-shell updates, fail-safe rollback and validated offline workflow | AVL-001; AVL-003; AVL-004 |
| RC-AVL-02 | Protective measure | Visible build identity, lifecycle status, recall/end-of-support and institutional fallback | LAB-002; LAB-003; AVL-005 |
| RC-SEC-01 | Inherent safe design | Restrictive CSP/network allowlist and no unapproved runtime interface or third-party request | SEC-001; INP-001; PRV-001; PRV-002 |
| RC-SEC-02 | Protective measure | Locked dependencies, SBOM, provenance, least-privilege CI and security testing | SEC-002–SEC-005 |
| RC-PRV-01 | Inherent safe design | Do not collect patient/clinician/facility/order identifiers or free-text notes | STO-005; PRV-001 |
| RC-PRV-02 | Protective measure | Defined retention/deletion/recovery and managed-device privacy controls | STO-004; STO-006 |
| RC-LAB-01 | Information for safety | Approved intended use, contraindications, one-vial/final-volume assumptions, residual risks and fallback, available offline and bilingually | LAB-003–LAB-005; REG-002 |
| RC-LAB-02 | Information for safety | Non-authorized builds always display “Prototype only — not for patient care.” | LAB-001 |
| RC-QMS-01 | Protective measure | Controlled findings, change review, verification traceability, complaint/CAPA/recall and release approval | QMS-001–QMS-003 |
| RC-IP-01 | Protective measure | Manufacturer authority, contributor/asset rights, GPL process and ability to correct/distribute/recall | IP-001; SEC-002; REG-002 |

Control IDs are proposed. They must be baselined in TRC-001 after quality
approval. Current prototype behavior may partially resemble a control, but it
is not accepted control evidence until the approved requirement is implemented
and verified on the identified release.

## 5. Probability and use assumptions that remain open

No occurrence probabilities can be assigned until at least the following are
approved or measured:

- exact intended population, medication/preparation list, care settings and
  frequency/duration of use;
- user training, required independent double-check and institutional fallback;
- supported device/browser/managed-device matrix and useful life;
- numeric boundaries, measurable volume assumptions and preparation devices;
- formative and summative observations for transcription, interruption,
  confirmation bias, time pressure and exclusion comprehension;
- software reliability, storage/cache/update failure and security test results;
- deployment population and field/complaint data; and
- probability of harm given a wrong, unavailable, stale or disclosed result.

External policies may reduce the probability of harm only if their availability
and effectiveness are established for the intended environment. They are not a
substitute for feasible product design controls.

## 6. Preliminary hazard analysis

Every probability is `P-U`, so every initial risk is **not estimable and not
acceptable**. Severity is a conservative proposal for clinical review, not a
signed conclusion.

### HZ-001 — Wrong unit, decimal or copied value produces a wrong volume

- **Sequence and hazardous situation:** The user transcribes a vial quantity,
  vial volume, final volume, ordered dose or unit incorrectly; or pasted text is
  silently interpreted (exponent, sign, locale separator, whitespace, excessive
  precision). The engine admits a different value, and the user reviews or acts
  on an incorrect mL result.
- **Plausible harm:** underdose, overdose, ineffective therapy, toxicity,
  delayed treatment, serious injury or death.
- **Initial estimate:** proposed S5 / P-U; not estimable or acceptable.
- **Controls:** RC-NUM-01, RC-NUM-02, RC-NUM-03, RC-REV-01, RC-HFE-02 and
  RC-LAB-01. Human-factors work must include transcription, copy/paste,
  interruption and thousand-fold `mg`/`mcg` scenarios.
- **Verification:** CALC-001 grammar/boundary/golden/property corpus,
  independent pharmacy calculations, UI/accessibility error tests and
  representative-use scenarios.
- **Residual risk:** not estimated; numeric bounds, controls and user evidence
  are absent. Confirmation bias and source-label/order transcription remain
  foreseeable even after correct parsing.
- **Information for safety:** approved manual-entry, source-verification,
  unit/conversion and external-independent-check instructions; wording TBD.

### HZ-002 — Underflow, overflow, precision loss or rounding gives an incorrect or zero result

- **Sequence and hazardous situation:** Unbounded IEEE-754 parsing/arithmetic or
  an overflow-prone conversion loses information; display rounding converts a
  positive result into `0 mL`; the rounded equation appears to substantiate it.
- **Plausible harm:** incorrect administration volume causing underdose,
  overdose, delay, serious injury or death.
- **Initial estimate:** proposed S5 / P-U; not estimable or acceptable. FND-C1
  demonstrates that the initiating defect exists in the prototype.
- **Controls:** RC-NUM-03 and RC-NUM-04 as primary design controls, plus
  RC-REV-01 only after both are correct. RC-LAB-02 contains prototype exposure
  but does not remediate the defect.
- **Verification:** exact regression for `0.0000001 mL` and large-value
  overflow, all representation/display boundaries, property and differential
  formal-reference tests, and independent calculation review.
- **Residual risk:** not estimated; CALC-001 boundaries/rounding remain TBD and
  the exact engine is not implemented. This hazard blocks G2/G3 and any
  patient-care release.
- **Information for safety:** rounding/threshold disclosure and limitations
  only after approval; out-of-policy values must be blocked rather than warned.

### HZ-003 — A stale review remains accepted after an input changes

- **Sequence and hazardous situation:** A user checks equations, then changes a
  calculation-critical value or restores/edits state without the review gate
  resetting. A result appears reviewed even though its inputs differ.
- **Plausible harm:** action on an unchecked wrong volume, causing medication
  error, serious injury or death.
- **Initial estimate:** proposed S5 / P-U; not estimable or acceptable.
- **Controls:** RC-REV-02 and RC-REV-01; central typed state transitions; proposed
  reset on every raw critical edit including numerically equivalent text.
- **Verification:** transition-model unit/property tests for every field and
  state, history/favourite reopen tests, browser tests and interruption-focused
  usability validation.
- **Residual risk:** not estimated. Current browser coverage is preliminary;
  DEC-NUM-012 and complete transition/state evidence are open.
- **Information for safety:** explain that the in-app equation review is not an
  order check or substitute for required independent checks.

### HZ-004 — Invalid, inconsistent or obsolete saved data supplies an actionable calculation

- **Sequence and hazardous situation:** Malformed, future, legacy or partially
  corrupted local data bypasses the current input/unit/final-volume contract;
  or a stale stored derived result is displayed instead of recalculation.
- **Plausible harm:** wrong or misleading volume, unavailable valid records,
  delayed preparation, serious injury or death.
- **Initial estimate:** proposed S5 / P-U; not estimable or acceptable. FND-H1
  identifies absent schema validation.
- **Controls:** RC-STO-01, RC-STO-02, RC-NUM-01, RC-NUM-02 and RC-REV-02.
- **Verification:** schema/migration/corruption property tests, legacy/activity
  unit and unsupported-volume cases, failure isolation, recalculation
  invariants, and browser recovery scenarios.
- **Residual risk:** not estimated; STO-001 is not approved or implemented.
- **Information for safety:** local-data limits, deletion/eviction and recovery
  behavior in the IFU; invalid data must not be made actionable by a warning.

### HZ-005 — Final prepared volume is misunderstood

- **Sequence and hazardous situation:** The user interprets `Vf` as diluent
  added or nominal container volume, or assumes overfill, displacement, dead
  space or withdrawal loss is accounted for. The arithmetic can be internally
  correct for the entered value but wrong for the actual preparation.
- **Plausible harm:** incorrect concentration/volume, underdose, overdose,
  serious injury or death.
- **Initial estimate:** proposed S5 / P-U; not estimable or acceptable.
- **Controls:** RC-NUM-05, RC-HFE-01, RC-HFE-02, RC-SCP-01 and RC-LAB-01. Safe
  design must make “total final prepared volume” unambiguous and enforce the
  approved container concept; labels alone require justification.
- **Verification:** pharmacy workflow analysis, below/equal/above vial-volume
  tests, comprehension tests with realistic containers and exclusion/misuse
  scenarios.
- **Residual risk:** not estimated; final-volume concept, overfill/displacement
  treatment and supported preparations remain unapproved.
- **Information for safety:** explicit total-final-volume definition and
  excluded physical factors, with bilingual wording TBD.

### HZ-006 — Clipped, inaccessible or ambiguous UI hides safety information or causes input/review error

- **Sequence and hazardous situation:** Zoom, landscape, assistive technology,
  small targets, contrast, time pressure or ambiguous wording hides an error,
  unit, equation, limitation or result. The user enters or acts on the wrong
  value. FND-C2 confirms clipped prototype states.
- **Plausible harm:** medication error, delay, serious injury or death.
- **Initial estimate:** proposed S5 / P-U; not estimable or acceptable.
- **Controls:** RC-HFE-01 and RC-HFE-02 as primary controls, supported-platform
  restrictions, RC-LAB-01 and RC-QMS-01.
- **Verification:** WCAG 2.2 AA audit, reflow/zoom/orientation/assistive-
  technology matrix, critical-state screenshots/semantics, and representative
  nurse usability validation under interruptions/time pressure.
- **Residual risk:** not estimated; known critical layout defect and missing
  representative-use evidence block acceptance.
- **Information for safety:** supported device/browser/accessibility conditions
  and fallback; warnings cannot justify clipped critical content.

### HZ-007 — Product is used for an unsupported patient, medication, setting or workflow

- **Sequence and hazardous situation:** Broad numeric inputs and public access
  encourage paediatric/neonatal, critical-care, high-alert, hazardous,
  investigational, infusion, multi-vial, compounded, reconstitution or other
  excluded use. The result omits clinically necessary factors.
- **Plausible harm:** inappropriate preparation or administration, serious
  injury or death.
- **Initial estimate:** proposed S5 / P-U; not estimable or acceptable.
- **Controls:** RC-SCP-01 and RC-SCP-02, RC-NUM-05, RC-HFE-02, RC-LAB-01 and
  claims/channel control in REG-002. Where a restriction can be enforced by
  design or institutional configuration, labelling alone is insufficient.
- **Verification:** foreseeable-use analysis, scope-enforcement tests, label and
  channel audit, medication/workflow simulation and representative misuse
  scenarios.
- **Residual risk:** not estimated; exclusions and enforcement methods await G1
  clinical approval. Summed multi-vial amount remains a known detection limit.
- **Information for safety:** exact contraindications/limitations and no
  prescribing/order/rate claims, in approved English and French.

### HZ-008 — Outdated, partially updated, evicted or unavailable app is used during a clinical task

- **Sequence and hazardous situation:** Service-worker/cache update fails,
  storage is evicted, a recalled/obsolete version remains installed, or a first
  offline visit is attempted. The user receives unavailable, mixed-version or
  obsolete behavior during preparation.
- **Plausible harm:** action on a known-defective version, inconsistent
  instructions, delay, abandonment of a safe process, serious injury or death.
- **Initial estimate:** proposed S5 / P-U; not estimable or acceptable.
- **Controls:** RC-AVL-01, RC-AVL-02, RC-SCP-02, RC-QMS-01 and version-matched
  offline RC-LAB-01.
- **Verification:** two-release atomic update/rollback, mixed-asset prevention,
  offline success/failure/deletion, eviction/recall/end-of-support simulation,
  version/artifact audit and institutional fallback exercise.
- **Residual risk:** not estimated; supported matrix, lifecycle and operational
  process are absent.
- **Information for safety:** first-visit limitation, storage/update
  prerequisites, lifecycle status, fallback and support contact.

### HZ-009 — Unauthorized source, dependency or build change alters safety behavior

- **Sequence and hazardous situation:** Excessive CI privilege, compromised
  dependency, unreviewed source, build substitution or corrupted asset changes
  parsing/calculation/labelling while retaining trusted appearance.
- **Plausible harm:** systematically wrong result or hidden warning leading to
  serious injury/death; loss of trusted availability.
- **Initial estimate:** proposed S5 / P-U; not estimable or acceptable.
- **Controls:** RC-SEC-02, RC-SEC-01, RC-QMS-01, build identity/provenance and
  controlled deployment.
- **Verification:** threat model, least-privilege CI tests, lock/SBOM/licence and
  vulnerability review, reproducible artifact/digest checks, static/secret
  scans and risk-based penetration testing.
- **Residual risk:** not estimated; SEC-001 and supply-chain evidence are
  incomplete and FND-H3 remains open.
- **Information for safety:** verified version/lifecycle/status and reporting
  contact; security controls must not rely primarily on user detection.

### HZ-010 — Local records reveal sensitive clinical context or persist unexpectedly

- **Sequence and hazardous situation:** Medication names and preparation history
  on a shared/unmanaged device are viewed by another person, retained beyond
  expectation, included in a device backup, or exposed through an unapproved
  network path.
- **Plausible harm:** privacy breach, stigma, employment/personal consequences,
  loss of trust and associated clinical delay.
- **Initial estimate:** proposed S3 / P-U; not estimable or acceptable pending
  privacy/legal review. Scope may change with actual fields and deployment.
- **Controls:** RC-PRV-01, RC-PRV-02, RC-SEC-01, RC-SCP-02 and removal of
  favourites/history if no justified, approved retention model exists.
- **Verification:** data-flow/inventory review, local-only and zero-network tests
  on all paths, retention/deletion/backup/eviction testing, managed-device
  assessment and privacy/usability review.
- **Residual risk:** not estimated; provincial/institutional privacy context and
  storage specification are open.
- **Information for safety:** plain-language local-storage, backup, shared-device,
  deletion and no-cloud limitations; wording TBD.

### HZ-011 — Software is misunderstood as prescribing, order checking or clinical approval

- **Sequence and hazardous situation:** Names, confirmation UI, equation checks,
  promotional language or repeated successful use creates automation bias. A
  nurse treats the output as validating the order, medication, route, rate or
  preparation and omits authoritative checks.
- **Plausible harm:** clinically inappropriate treatment or medication error,
  serious injury or death.
- **Initial estimate:** proposed S5 / P-U; not estimable or acceptable.
- **Controls:** RC-SCP-01, RC-HFE-01, RC-HFE-02, RC-LAB-01, RC-LAB-02 and
  controlled claims/channel review. Confirmation wording must not imply
  clinical correctness.
- **Verification:** UI/IFU/training/site/manifest claim audit, comprehension and
  foreseeable-misuse testing, workflow observation and institutional review.
- **Residual risk:** not estimated; intended use, warnings and user evidence are
  unapproved. Disclaimers alone do not close automation-bias risk.
- **Information for safety:** exact arithmetic-aid boundary and requirement to
  use authorized order/product/pharmacy/institutional sources.

### HZ-012 — Unexpected interface or runtime network path invalidates the local-only architecture

- **Sequence and hazardous situation:** A future interface, injected asset,
  library, service worker or failure path transmits local context, consumes
  untrusted data or changes the calculation while the product is represented as
  manual-input/no-backend software.
- **Plausible harm:** wrong calculation, privacy breach, unavailable product,
  loss of classification/clinical controls, serious injury or death in the
  worst calculation-alteration case.
- **Initial estimate:** proposed S5 / P-U; not estimable or acceptable.
- **Controls:** RC-SEC-01, RC-SEC-02, RC-PRV-01, architecture/interface change
  control and RC-QMS-01.
- **Verification:** source and built-artifact interface inventory; CSP and
  request allowlist tests covering fetch/XHR/WebSocket/EventSource/beacon,
  navigation, worker and failure paths; penetration/privacy review.
- **Residual risk:** not estimated; restrictive CSP, complete network contract
  and exact-build evidence are absent.
- **Information for safety:** approved local-only claim and breach/support
  contact only after evidence; the user is not the primary network monitor.

### HZ-013 — Storage or browser failure removes information or prevents recovery

- **Sequence and hazardous situation:** Local storage, cache, browser, device or
  font fails; one corrupt record disables valid records; the app becomes
  unusable or loses history during a task without a clear safe recovery.
- **Plausible harm:** delay, repeated/transcription error, reliance on memory or
  unsafe workaround; potentially critical injury depending on context.
- **Initial estimate:** proposed S4 / P-U; not estimable or acceptable. The
  emergency/critical-care exclusion must be approved and validated before it
  may affect severity/probability assumptions.
- **Controls:** RC-STO-01, RC-STO-02, RC-AVL-01, RC-AVL-02, RC-SCP-02 and
  institutional fallback. Calculation must remain independent of optional
  saved data where safe.
- **Verification:** storage-denial/quota/corruption/eviction and font/browser
  failure injection, key isolation, recovery, zero-network operation and
  representative fallback simulation.
- **Residual risk:** not estimated; storage/recovery specification and supported
  deployment evidence are open.
- **Information for safety:** records are optional local conveniences without
  cloud backup; do not rely on history as the authoritative order/result.

### HZ-014 — Rights or ownership gap prevents correction, distribution or recall

- **Sequence and hazardous situation:** The purported manufacturer lacks clear
  authority or fails GPL/contributor/asset obligations, impairing its ability
  to modify, supply source/notices, distribute a correction, support a build or
  execute a recall. Users remain on an unsafe or unsupported version.
- **Plausible harm:** prolonged exposure to a defect or unavailable correction,
  leading indirectly to serious injury/death; legal and supply interruption.
- **Initial estimate:** proposed S5 / P-U for the worst safety consequence; the
  quality/regulatory owner must also track non-safety legal/business impacts.
- **Controls:** RC-IP-01, RC-QMS-01, RC-SEC-02, manufacturer authority and
  supplier/distribution records.
- **Verification:** counsel opinion, contributor/asset/licence evidence audit,
  GPL notice/source process exercise, correction/recall authority review and
  distribution-model assessment.
- **Residual risk:** not estimated; IP-001 counsel conclusion and legal
  manufacturer identity block G1.
- **Information for safety:** licence/source notices and accurate manufacturer,
  support and lifecycle identity; labelling cannot cure missing authority.

## 7. Preliminary hazard coverage check

| Regulatory concern | Hazard coverage |
| --- | --- |
| Wrong vial amount/unit/volume/final volume/ordered dose; decimal/exponent/locale/copy-paste | HZ-001, HZ-005 |
| `mg`/`mcg` thousand-fold error; activity/unknown units | HZ-001, HZ-004 |
| Underflow, overflow, floating-point loss, unsafe rounding | HZ-002 |
| Stale review and persisted invalid/inconsistent data | HZ-003, HZ-004 |
| Overfill, displacement, dead space, multiple-vial assumptions and measurable range | HZ-002, HZ-005, HZ-007 |
| Unsupported medication, route, population, care setting or prescribing/rate use | HZ-007, HZ-011 |
| Transcription, interruption, automation bias and time pressure | HZ-001, HZ-003, HZ-006, HZ-011 |
| Accessibility, clipping, vision/colour and touch error | HZ-006 |
| Browser/OS/font/service-worker/cache/storage failure; outdated/recall/unavailable build | HZ-008, HZ-013 |
| Tampering, dependency/build compromise and unexpected interfaces | HZ-009, HZ-012 |
| Local-history privacy exposure | HZ-010, HZ-012 |
| Ownership/licence prevents lifecycle action | HZ-014 |

This coverage table does not show completeness. Hazard discovery must continue
through architecture analysis, threat modelling, clinical workflow analysis,
formative use studies, verification anomalies and post-market inputs.

## 8. Verification, residual-risk and benefit-risk blockers

No risk control is considered verified merely because a code path or E2E test
currently exists. VVP-001 must define objective acceptance criteria, exact
build identity, test independence, anomaly disposition and report location.
User-dependent controls require representative-user validation, not only
software tests. TRC-001 must ultimately map each hazard through approved
controls/requirements to implementation, passing verification and residual-risk
approval.

Residual-risk evaluation is blocked by:

- open G1 intended-use, manufacturer, platform and exclusion decisions;
- unapproved severity/probability/acceptability criteria;
- CALC-001 boundary, representation, rounding and measurable-volume decisions;
- unapproved storage, security/privacy, verification and tooling records;
- known critical/high findings, including FND-C1, FND-C2, FND-H1, FND-H2,
  FND-H3 and FND-H5;
- absent representative nurse/pharmacy workflow and human-factors evidence;
- absent implementation and independent verification of most controls;
- absent production/deployment reliability and occurrence data; and
- no legal manufacturer or qualified risk-acceptance signatures.

An overall benefit-risk conclusion is also blocked. The proposed benefit is a
transparent, reproducible arithmetic aid that may reduce manual calculation
burden while retaining equation review. Its magnitude, users, clinical context
and evidence are not established. Until benefit and residual risks are
supported and approved, this record cannot conclude that benefits outweigh
risks. A classification response would not supply that conclusion.

## 9. G2 exit requirements and later lifecycle work

For the preliminary G2 record, at minimum:

- G1 is closed and the approved product scope is reflected here;
- named owners approve the method, scales, acceptability matrix and every
  severity rationale;
- CALC-001, STO-001, SEC-001, VVP-001 and DEV-001 are approved and their
  controls are traced;
- all known hazards and foreseeable misuse from clinical/architecture/security
  reviews are entered with owners;
- each proposed control is assigned to an approved requirement and verification
  method; and
- no initial risk is marked accepted merely because implementation is planned.

Later gates must add implemented-control evidence, residual-risk estimates,
control-introduced hazards, representative-user validation, anomaly closure,
production/post-production collection methods, overall benefit-risk review and
the legal manufacturer's signed risk-management report. Classification
readiness does not authorize clinical release.

## 10. Approval and change control

A change to intended use, clinical exclusions, medication/unit/formula,
numeric/storage/display behavior, UI/review workflow, platform, offline/update
behavior, network/interface, dependency/build/distribution model, evidence or
new anomaly reopens the affected hazards and controls. Security incidents,
calculation discrepancies, rounding-to-zero, unit-conversion error, invalid
saved record reaching review, serious accessibility failure or outdated/recall
use require immediate documented risk and release assessment.

| Role | Name | Decision | Date/signature | Approved version/commit |
| --- | --- | --- | --- | --- |
| Legal manufacturer | Unassigned | Pending | — | — |
| Regulatory lead | Unassigned | Pending | — | — |
| Clinical pharmacy / medication-safety lead | Unassigned | Pending | — | — |
| Nursing/human-factors lead | Unassigned | Pending | — | — |
| Software lead | Unassigned | Pending | — | — |
| Security/privacy lead | Unassigned | Pending | — | — |
| Independent calculation verifier | Unassigned | Pending | — | — |
| Quality lead | Unassigned | Pending | — | — |
