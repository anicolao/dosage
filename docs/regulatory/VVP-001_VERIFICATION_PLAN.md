# VVP-001 — Verification plan

| Field | Value |
| --- | --- |
| Record ID | VVP-001 |
| Status | Draft — G0/G1/G2 open; not approved or executed |
| Owner | Quality lead (unassigned) |
| Technical owner | Software lead (unassigned) |
| Required approvers | Quality, pharmacy, security/privacy, nursing/human factors and independent software/calculation verifier |
| Target | `0.2.0-classification` reference product |
| Source baseline | Authorization branch based on `552fa82`; exact approved source/build pending |
| Draft version/date | 0.1 / 2026-08-07 |

This plan defines prospective verification. Existing checks are observations,
not G3/G7 evidence, and a green CI run does not authorize patient care. The
plan cannot be approved until the intended use, requirements, numeric policy,
risk controls, tooling and supported platform matrix are approved at the
applicable gates.

## 1. Objectives and scope

Verification will determine, with traceable objective evidence, whether the
specified reference build implements approved requirements and risk controls.
It covers:

- strict numeric parsing, exact calculation, units, bounds and display policy;
- review-state transitions and local-record trust boundaries;
- component/integration and full browser workflows;
- privacy/network, security, build and supply-chain controls;
- accessibility, responsive layout and defined assistive-technology checks;
- offline install, update, rollback, eviction and recovery behaviour;
- Lean proof obligations and TypeScript/Lean differential conformance if CE5
  proceeds; and
- evidence identity, anomalies, independence and requirement traceability.

This document does not establish clinical validity, approve the numeric rules,
replace representative-user validation, or prove that the intended use is
outside the Medical Devices Regulations.

## 2. Verification levels and responsibility

| Level | Purpose | Primary executor | Required independence/review |
| --- | --- | --- | --- |
| Static/type | Reject type, Svelte and lint defects before execution | Software developer/CI | Code reviewer; quality reviews configuration |
| Unit | Verify pure parser, units, calculation, formatting and result decisions | Software developer/CI | Independent verifier reviews design, cases and failures |
| Property | Explore bounded invariants and boundary combinations reproducibly | Software developer/CI | Pharmacy/verifier approves generators and properties |
| Storage/integration | Verify schemas, migrations, quarantine, recomputation and state transitions | Software developer/CI | Independent review of fixtures and expected outcomes |
| E2E | Verify observable supported-browser workflows and safety states | Software/test lead | Nursing/HF reviews critical tasks; quality witnesses G7 run |
| Accessibility | Verify automation plus manual keyboard, zoom, screen-reader and state checks | Accessibility/HF tester | Representative-user results reviewed by nursing/HF |
| Security/privacy | Verify CSP/network boundaries, supply chain, threat controls and build provenance | Security/privacy lead | Independent penetration test is deferred beyond classification unless risk requires earlier work |
| Formal | Check approved Lean definitions/theorems and axioms | Formal-methods implementer/CI | Independent verifier reviews specification and proof boundary |
| Differential | Compare canonical Lean and TypeScript decisions/results | Software/formal CI | Independent review for shared-assumption risk |
| Clinical oracle | Recalculate golden values and confirm formula/rules | Pharmacy lead or delegate | Must not be solely the production implementation author |

One person may execute several non-independent activities, but the calculation
implementer cannot solely author and approve the expected-value corpus, formal
specification and final conclusion.

## 3. Preconditions and controlled inputs

### 3.1 Entry to test development

Test scaffolding may be drafted while gates are open, but no result is release
evidence until:

- REG-001, REG-002, SYS-001 and relevant RMF-001 requirements are baselined;
- CALC-001 defines grammar, bounds, formula, order of operations, rounding,
  error priority and approved unit/final-volume sets;
- STO-001 and SEC-001 define the storage and security acceptance criteria;
- DEV-001 is approved and its exact tool versions are locked; and
- each case has requirement/risk identifiers and an independently reviewable
  expected result.

### 3.2 Entry to the controlled G7 run

G3, G4, G5 and G6 must be closed. The run uses:

- a clean checkout at an immutable commit;
- `npm ci` from the reviewed lockfile and the approved Nix/CI environment;
- an artifact built from that checkout with displayed version/revision matching
  the source and recorded artifact digest;
- approved test data, formal vectors, configuration and report schemas;
- no unexplained local files or uncommitted changes; and
- an anomaly register containing every known failure and deviation.

## 4. Current and proposed commands

| Activity | Current command/status | Required controlled command/status |
| --- | --- | --- |
| Locked JS install | `npm ci` exists | Retain; record npm/Node, lock hash and install log |
| Svelte check | `npm run check` → `svelte-check` | Extend with approved `tsconfig`; release blocking |
| TypeScript compiler | No command/configuration | `npm run typecheck`; release blocking |
| Lint | No dependency/script | `npm run lint`; zero warnings; release blocking |
| Formatting check | No dependency/script | `npm run format:check`; CI/merge blocking |
| Unit/property/integration | No dependency/script | `npm run test:unit`; deterministic, non-watch, report-producing |
| Unit coverage | No dependency/script | `npm run test:unit:coverage`; advisory plus completeness review |
| npm default test | Missing | `npm test` explicitly aliases controlled unit suite |
| Production build | `npm run build` | Retain with controlled source revision and artifact hash |
| Non-root build | supported through `PUBLIC_BASE_PATH` | `PUBLIC_BASE_PATH=/dosage/classification npm run build` then matching `check:base` |
| E2E | `npm run test:e2e` builds with `e2eha5h` and runs Playwright | Retain for test-fixture runs; add a separate version-bound reference-build path for G7 |
| Dependency audit | `npm audit` available but not in scripts/CI | Run with report captured and approved severity/disposition policy |
| Formal proofs | Not configured | `npm run test:formal` inside approved pinned Nix/Lean environment |
| Differential | Not configured | `npm run test:formal:conformance` against versioned canonical vectors |

The Step 7 minimum sequence is:

```text
npm ci
npm run check
npm run lint
npm run format:check
npm run test:unit
npm run build
PUBLIC_BASE_PATH=/dosage/classification npm run build
PUBLIC_BASE_PATH=/dosage/classification npm run check:base
npm run test:e2e
npm audit
```

Add the coverage, formal and differential commands when their approved controls
exist. `e2eha5h` is an obviously test-oriented fixture and cannot identify the
classification artifact; G7 must bind an additional E2E run to the actual
source revision without masking or normalizing it.

## 5. Environments and supported matrix

The exact managed-device/browser matrix is a G1 decision. Until approved, the
following is a minimum planning matrix, not a claim of support:

| Environment | Planned coverage | Open control |
| --- | --- | --- |
| Node/tooling | Node 24 currently used in GitHub Actions | Pin through Nix or immutable runner record; record npm/OS/architecture |
| Unit/formal | Approved Nix shell/CI image, timezone and locale fixed | Configuration absent |
| Chromium mobile | 393×852 portrait and 852×393 landscape | Current phone coverage is Chromium portrait only |
| WebKit/iOS proxy | Approved WebKit plus testing on supported managed iOS/Safari devices | Absent; browser emulation alone is insufficient evidence |
| Android/Chromium | Approved managed device/OS/browser combinations | Exact versions/devices unassigned |
| Tablet | 820×1180 and approved orientations | Absent |
| Desktop | 1280×1000 | Current limited E2E coverage exists |
| Zoom/text | 200% zoom/text spacing and 320 CSS px reflow where applicable | Current narrow-layout checks are partial |
| Offline lifecycle | Installed online, close/reopen offline, two-release update/rollback, eviction/recovery | Current single-release Chromium evidence is partial |
| Assistive technology | Approved VoiceOver/Safari and TalkBack/Chromium combinations plus keyboard/switch path | Exact versions and testers unassigned |

Each report records device model, OS/build, browser/engine version, viewport,
display scale, language/locale, assistive technology, connection/offline state
and deviations. Cloud browser labels without exact versions are insufficient.

## 6. Numeric unit and property verification

CALC-001 will assign exact expected outcomes and error codes. At minimum the
controlled corpus includes:

- all current MVP design and browser examples;
- same-unit and both-direction mg/mcg conversions;
- `1e3`, `1E3`, signs, whitespace, comma, multiple decimal points, blank,
  zero, leading-zero and excess-precision/magnitude cases;
- values immediately below, at and above every input, intermediate, result and
  display boundary;
- the positive `0.0000001 mL` result previously rendered as `0 mL`;
- overflow-prone large input and multiply-by-1000 cases;
- final volume below/equal/above vial volume;
- dose below/equal/above available one-vial amount;
- all approved exact/inexact rounding and trailing-zero boundaries;
- activity, unknown and legacy-unit rejection; and
- malformed/corrupt/future persisted records.

Properties, bounded to CALC-001's admitted domain, include:

1. parser acceptance denotes exactly one permitted canonical decimal;
2. forbidden grammar never reaches calculation;
3. a valid result is finite, positive and cannot display as zero;
4. `Va × Cpd = D` in exact rational terms;
5. dose proportionality where both values remain admitted;
6. equivalent mg/mcg inputs yield the same exact volume;
7. dose-at-available equals final prepared volume and values above are blocked;
8. administration volume is independent of vial volume when final prepared
   volume and medication amounts are fixed; and
9. identical validated inputs produce identical result/error/display models.

Fast-check generators use only explicit bounds. A controlled run uses an
approved minimum run count per property, stable regression seeds and a recorded
generated seed. Failure records retain the seed, replay path and minimized
counterexample. A rerun is additional evidence, not a replacement for the
failure.

## 7. Integration and state-transition verification

Test without the full browser where practical:

- every discriminated result (`incomplete`, `blocked`, `valid`, and any
  approved warning) and exhaustive UI mapping;
- all critical-field transitions, including parsed-equivalent textual edits,
  unit changes, volume changes and restored records;
- revocation of equation checks, result reveal and acknowledgement;
- favourite schema allowlist, omission of ordered dose/review state and
  deterministic duplicate policy;
- history schema allowlist, recomputation of derived values and no bypass of
  current review;
- migrations from each supported version and rejection/quarantine of unknown,
  future, corrupt and mixed-validity records;
- isolated storage read/write/quota failures and calculation availability; and
- rendering-equation operands from the same validated calculation object.

No fixture may bypass the public parser/schema boundary merely to reach a green
path unless that internal behaviour is the explicit subject of the test.

## 8. Browser workflow verification

Expand Playwright coverage to include every approved calculation/error state,
review reset route, storage transition and supported viewport/browser. Critical
paths include fresh calculation, review, reveal, acknowledge, save, reopen,
edit and delete; interrupted/reloaded variants; and empty/populated/error local
records.

E2E assertions must verify absence as well as presence: an actionable mL must
not exist in the visual or accessibility tree before valid review; blocked or
changed input must remove stale results; prohibited fields/interfaces/claims
must remain absent. Screenshots supplement semantic assertions and are updated
only under controlled review.

The installed-app sequence must verify first-online installation, offline
close/reopen, calculation, save/reload/history review, update from release N to
N+1, interrupted update, rollback, cache/storage eviction and recovery. The
service worker must not cache or transmit local user records.

## 9. Security and privacy verification

After SEC-001 approval, verification includes:

- CSP syntax and browser-enforced denial of unapproved scripts, connections,
  frames and objects;
- instrumentation/denial of `fetch`, XHR, `sendBeacon`, WebSocket and
  EventSource on success, error, save, delete, history, reload and offline paths;
- exact allowlisting of expected same-origin static requests;
- source and built-artifact search for runtime endpoints, device-signal or
  medical-system interfaces, secrets and unexpected dynamic code;
- dependency/SBOM/licence/vulnerability review with recorded dispositions;
- static analysis and secret scanning;
- build provenance, reproducibility comparison, version/hash match and artifact
  digest;
- local-data corruption/disclosure/failure injection; and
- threat-model control tests for tampering, stale cache, dependency compromise
  and unauthorized build substitution.

`npm audit` alone is not a security conclusion. Its database timestamp,
severity results, applicability, exploitability and disposition are recorded.
Any suppression or accepted vulnerability requires security and quality
approval.

## 10. Accessibility and human-factors verification

Automated axe checks cover every critical state and approved browser, but are
supplemented by manual verification of:

- full keyboard/switch order, visible focus, modal trap and focus return;
- name/role/value, error association and status announcement;
- equations, units, conversion, review checks and hidden-result semantics with
  approved screen readers;
- 200% zoom/text size, text-spacing override, portrait/landscape reflow and no
  obscured safety content;
- target size/spacing, non-colour cues and interruption/recovery; and
- empty/populated/error favourites and history states.

Nursing/HF defines predetermined formative tasks for representative Canadian
nurses: distinguish final prepared volume from diluent/container volume,
interpret mg/mcg conversion and equations, identify unsupported use, explain
the independent double-check boundary, and understand local/offline limits.
Formative findings are anomalies/design inputs, not summative clinical-release
validation. Full summative validation remains post-classification unless the
classification strategy or risk analysis requires it earlier.

## 11. Formal and differential verification

If CE5 is approved, the Lean job must:

- use the committed `lean-toolchain`, Lake manifest and pinned Nix environment;
- compile the executable definitions and all named proof obligations;
- report the axioms on which each safety theorem depends;
- fail for unapproved `sorry`, admitted theorem, changed vector/schema or
  theorem failure;
- emit a versioned canonical oracle containing original strings, canonical
  values, units, exact rational output, decisions/error codes, display and
  rounding disclosure; and
- bind outputs to specification/tool/source revisions.

The differential suite compares TypeScript and Lean for every approved golden,
boundary, regression and generated case. It compares exact canonical values and
decision codes rather than tolerant floating-point strings. Any divergence is
an anomaly even if the visible browser output happens to match.

Formal proofs show conformance to the formal specification within their stated
assumptions. They do not prove that pharmacy selected the correct formula or
bounds, that TypeScript matches Lean without differential evidence, or that the
interface is clinically usable. Rocq extraction is excluded unless the separate
Phase B decision in `CALCULATION_ENGINE_PLAN.md` is approved.

## 12. Evidence capture and retention

For each controlled run, VVR-001 or its attachments record:

- run ID, start/end timestamps and executor/witness;
- exact commit, tag/version, displayed revision and artifact SHA-256;
- repository status and hashes of lockfiles/configuration/test data;
- Node/npm/Nix/OS/architecture/browser/formal-tool versions;
- exact commands, relevant environment, seed/path and exit codes;
- test totals, assertions, failures, skips/retries and coverage by file/branch;
- JUnit, Playwright HTML/traces/screenshots, accessibility results, security
  reports, SBOM/audit, proof/axiom logs and differential output;
- deviations, anomalies and approved dispositions; and
- independent review/signatures.

CI artifacts are convenience copies, not the sole quality record. The current
30-day Playwright retention is insufficient for the classification record.
Quality must copy the immutable evidence set and manifest into the controlled
quality repository for at least the product/classification-record retention
period selected under the QMS, with access control, backup, integrity checks
and retrievability. The final retention duration remains a regulatory/QMS
decision and blocks approval of this section.

Secrets, patient data and uncontrolled identifiers must not appear in reports.
Generated evidence is read-only after approval; a correction creates a new
version with an audit trail.

## 13. Anomaly and deviation handling

Every unexpected failure, timeout, crash, flake, proof divergence, missing
report, skipped test or environment deviation receives an anomaly ID before
rerun. The record includes reproduction, requirement/risk links, severity,
root cause, affected versions/evidence, correction, regression and independent
disposition.

- Critical/high safety or security anomalies block G7.
- Lower-severity anomalies require documented rationale and quality approval.
- Retries are disabled in the controlled run. A known environmental retry must
  be pre-approved and both attempts retained.
- Quarantine, `.skip`, `.only`, changed tolerance, regenerated oracle or
  snapshot update cannot conceal a failure.
- A post-G7 code, dependency, test/configuration or safety-label change triggers
  documented impact analysis and rerun of all affected verification.

## 14. Traceability and completion criteria

Before G7 closes, every applicable SYS-001 requirement, RMF-001 risk control,
CALC-001 rule, STO-001 rule, SEC-001 control, formal theorem and open finding
must map to implementation and an identified result in
`TRC-001_TRACEABILITY_MATRIX.csv`. Traceability is updated throughout Steps
3–7 and is **closed at G7**, not at G5. Missing, failed or not-run evidence is
visible and cannot be represented as covered by a broad E2E scenario.

The controlled run passes only when:

1. all entry criteria are met and the source/build identity is consistent;
2. every required command exits successfully with all expected reports;
3. the approved environment/browser/device matrix has complete results;
4. all numeric cases/properties and risk-control tests pass;
5. formal/differential obligations pass or a signed, risk-assessed decision
   explicitly removes or defers them without contradicting approved
   requirements;
6. no critical/high anomaly remains open and all others are approved;
7. traceability has no unexplained gap; and
8. the independent verifier, quality lead and applicable clinical/security/HF
   approvers sign VVR-001.

## 15. Approval and execution record

The following remain open: exact clinical oracle, numeric/property counts,
supported devices/browsers/assistive technologies, toolchain compatibility,
evidence repository/retention duration, formal CE5 decision and named
independent personnel. This document cannot close G2 until those decisions and
the companion Step 2 specifications are approved.

| Role | Name | Decision | Date/signature |
| --- | --- | --- | --- |
| Quality lead | Unassigned | Pending | — |
| Software lead | Unassigned | Pending | — |
| Pharmacy lead | Unassigned | Pending | — |
| Security/privacy lead | Unassigned | Pending | — |
| Nursing/human-factors lead | Unassigned | Pending | — |
| Independent verifier | Unassigned | Pending | — |
