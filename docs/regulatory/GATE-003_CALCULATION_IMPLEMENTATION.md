# GATE-003 — Calculation implementation verified

| Field | Value |
| --- | --- |
| Gate | G3 — calculation implementation verified |
| Status | **Open — not approved; G0, G1 and G2 remain open** |
| Primary owner | Software lead (unassigned) |
| Independent reviewer | Calculation verifier (unassigned) |
| Required approvers | Pharmacy lead, software lead, independent calculation verifier and quality lead |
| Required reviewer | Nursing/human-factors lead for review-state and displayed-result behavior |
| Controlled record revision | `[TBD — exact commit containing approved record]` |
| Record version/date | 0.1 / 2026-08-07 |
| Effective date | None |

This is a prospective decision record for AUTHORIZATION_PLAN.md Step 3. It is
not an approval to implement an unapproved numerical policy and is not evidence
that the current prototype calculation is correct. A template, a code commit,
an approving pull-request review or green CI—individually or together—cannot
close G3. Closure requires the exact controlled inputs, candidate identity,
objective evidence, independent conclusion, anomaly disposition and signatures
specified below.

Closing G3 verifies only the calculation/domain implementation and its review-
state controls for the approved reference scope. It does not close G4–G10,
validate the complete user interface, approve classification or authorize
patient care.

## 1. Gate candidate identity

Every field below shall identify one immutable candidate. A result produced
from another commit, lockfile, toolchain, test corpus or configuration is not
G3 evidence unless quality documents equivalence before the gate decision.

| Controlled field | Required value/evidence | Current state |
| --- | --- | --- |
| G2 approval | Signed `GATE-002_SAFETY_REQUIREMENTS.md` and its exact approved commit | Missing; G2 open |
| Candidate source | Full Git commit and clean-worktree record | Not assigned |
| Package identity | `package.json` version and displayed source revision | Not assigned |
| Dependency identity | `package-lock.json` digest and installed dependency inventory | Not assigned |
| Toolchain identity | Approved Node/npm/Nix or immutable environment versions from DEV-001 | Not assigned |
| Configuration identity | TypeScript, Vitest, property, lint, formatting, Svelte and build configuration digests | Not assigned |
| Numeric specification | Approved CALC-001 version/commit | Draft; decisions and bounds open |
| Verification inputs | Approved VVP-001 version, corpus revision, property seeds/generators and oracle revision | Draft/open |
| Evidence bundle | Immutable location/digest for reports, logs, reviews and anomaly records | Not assigned |

The gate record shall be updated with these values without overwriting the
history of an earlier candidate. A superseded candidate remains traceable and
is marked rejected or withdrawn.

## 2. Exact entry criteria

Controlled Step 3 implementation may begin only after all of the following are
true. Test scaffolding may exist earlier, but its results are exploratory.

| ID | Entry criterion | Required evidence | Status |
| --- | --- | --- | --- |
| G3-EN-01 | G0 and G1 are signed for the exact product scope. | Signed GATE-000/GATE-001 records and approved commits | Blocking — open |
| G3-EN-02 | G2 is signed and every CALC-001 decision, clinical bound, formula, rounding/display rule, error priority and one-vial/final-volume rule is explicit. | Signed GATE-002 and CALC-001; no `TBD` or open numerical decision | Blocking — open |
| G3-EN-03 | SYS-001 calculation/input/review requirements and RMF-001 controls RC-NUM-01–05 and RC-REV-01–02 agree with CALC-001. | Approved document revisions and consistency review | Blocking — draft |
| G3-EN-04 | DEV-001 fixes exact language, compiler, unit/property runner, package/configuration, report, deterministic-seed and provisioning choices. | Signed DEV-001 plus reviewed lock/configuration compatibility evidence | Blocking — draft |
| G3-EN-05 | VVP-001 fixes the golden/adversarial corpus, property generators/run counts/seeds, independent oracle, environments, evidence retention and anomaly procedure. | Signed VVP-001 and controlled test-data revision | Blocking — draft |
| G3-EN-06 | The implementer and independent verifier are named, competent and sufficiently independent; the verifier did not solely author the production engine and oracle. | Role/competency and independence records | Blocking — unassigned |
| G3-EN-07 | Every relevant FND-001/TRC-001 item has a requirement, control, planned test and owner before code changes are accepted. | Reviewed FND-001 and TRC-001 snapshot | Blocking — incomplete |
| G3-EN-08 | The implementation branch/candidate policy prevents an unapproved build from being mistaken for a clinical build. | Branch/release control and prototype-label evidence | Pending quality confirmation |

Failure of one entry criterion cannot be waived by additional test coverage.
If a controlled input changes during implementation, work pauses for documented
impact assessment and affected reapproval before its output becomes evidence.

## 3. Required implementation controls

The exact implementation may differ from the suggested filenames in the plan,
but it shall satisfy every control below and preserve a reviewable separation
of concerns.

| ID | Required implementation outcome | Traces to |
| --- | --- | --- |
| G3-IM-01 | Safety-critical parsing, closed units, calculation, structured result and formatting are typed, pure domain modules outside `App.svelte`; browser/UI values enter as `unknown` or raw text and cannot bypass validation. | INP-002–005; CAL-001–008; DEV-001 |
| G3-IM-02 | Numeric fields are text inputs with approved `inputmode`; exact original strings are preserved and are admitted only after grammar, precision and magnitude validation. Browser number parsing is not the acceptance boundary. | CALC-001 sections 3–4; RC-NUM-01 |
| G3-IM-03 | Commas, exponents, signs, whitespace, non-finite values, excess digits/scale, zero and every out-of-bound value fail closed with the approved structured outcome. No silent normalization occurs. | INP-004; CAL-002; CAL-008 |
| G3-IM-04 | Only `mg` and `mcg` exist in the domain unit type, with exact 1000:1 conversion. Unknown/activity/legacy units cannot become compatible through null/missing state. | INP-002; INP-005; RC-NUM-02 |
| G3-IM-05 | The approved bounded exact representation and order of operations validate all denominators, intermediates and outputs without JavaScript `Number` overflow/underflow as the safety argument. | CAL-002; RC-NUM-03 |
| G3-IM-06 | Final prepared volume, available one-vial quantity, unsupported multi-vial behavior and the approved measurable/output range are enforced before any actionable result exists. | CAL-004; CAL-005; CALC-001 sections 6–8 |
| G3-IM-07 | Exact calculation, display formatting, substituted equations, rounding disclosure and revealed result are produced from one validated result object. A positive result cannot display/review as zero or a non-finite/unrepresentable value. | CAL-003; CAL-006; CAL-007; RC-NUM-04 |
| G3-IM-08 | UI code handles explicit `incomplete`, `blocked`, `warning` and `valid`-equivalent states and never infers validity from a string, truthiness, DOM state or formatter output. | CAL-008; ARC-001 target boundary |
| G3-IM-09 | Result is absent from the visual and accessibility trees until every current substituted equation is checked; opening/reopening starts unchecked. | REV-001; REV-002; RC-REV-01 |
| G3-IM-10 | Every approved critical edit—including parsed-equivalent raw-text edits when DEC-NUM-012 is approved—revokes equation checks, revealed result and acknowledgement. | REV-003; RC-REV-02 |
| G3-IM-11 | Unit-selector DOM state and domain state agree. Any now-incompatible ordered unit resets to an explicit incomplete/blank state rather than retaining a hidden value. | INP-005; AUTHORIZATION_PLAN 3.5 |
| G3-IM-12 | The engine performs no dose recommendation/range, medication, route, rate, compatibility, stability or clinical-appropriateness check and does not expand multi-vial scope. | USE-002; CAL-009; REG-001/REG-002 |
| G3-IM-13 | Production dependencies/configuration match approved DEV-001 records; no test-only or formal oracle implementation is imported into the production calculation path. | DEV-001; SEC-002; QMS-001 |

Code review shall trace each control to named modules, tests and anomalies. A
comment stating that a control is implemented is not evidence of its behavior.

## 4. Required verification and review evidence

The controlled run uses a clean checkout, approved locked dependencies and the
candidate in section 1. Reports shall record exact commands, versions, exit
codes, test totals, seeds/paths, failures, skips/retries and timestamps.

| ID | Evidence required for G3 | Acceptance condition |
| --- | --- | --- |
| G3-EV-01 | Architecture/design review of typed module boundaries and UI/result interfaces | Software and independent reviewer confirm all G3-IM controls are assigned and no parallel calculation path remains |
| G3-EV-02 | Static/type/lint/format/Svelte reports under DEV-001 | Every release-blocking command succeeds; no unapproved suppression or generated-code exclusion |
| G3-EV-03 | `npm run test:unit` and `npm test` reports, including JUnit output | Deterministic non-watch commands exist, execute the approved suite and succeed; report generation itself succeeds |
| G3-EV-04 | Complete CALC-001 golden, boundary and adversarial corpus | Every case has an ID, requirement/hazard trace, independent expected outcome and passing candidate result |
| G3-EV-05 | Property-test report and replay manifest | Approved properties/generators/run counts pass; seed and path are retained; every discovered counterexample is an anomaly even after correction |
| G3-EV-06 | Exact regressions for FND-C1 and every critical numeric finding | Positive-to-zero, overflow-prone and related root causes are corrected with boundary/regression evidence, not masked or accepted by formatting |
| G3-EV-07 | Review/state-transition unit and browser tests | Every input/unit/final-volume/dose/equivalent-text transition resets the approved state; result remains absent until complete current review |
| G3-EV-08 | Closed-unit/selector tests | DOM and domain state agree; activity, `units`, unknown, mixed-case, blank and legacy values fail as specified |
| G3-EV-09 | Differential/formal report, only if the approved G2 scope selects CE5 or another formal control | Approved theorems/axioms and every TypeScript/reference vector agree; any mismatch is an anomaly. Formal work is not silently made mandatory or omitted after G2. |
| G3-EV-10 | Independent calculation-verification report | Verifier reviews CALC-001, representation, code, oracle, equations, rounding and results and signs an explicit pass/fail conclusion |
| G3-EV-11 | Pharmacy review of formula, units, boundaries, displayed equations/result and corpus | Pharmacy lead confirms implementation matches the approved clinical arithmetic contract; this does not approve a dose/order |
| G3-EV-12 | Traceability/anomaly package | TRC-001 maps every applicable requirement/control to implementation and result; FND-001 and test anomalies have controlled dispositions |
| G3-EV-13 | Candidate change/configuration review | Quality confirms source diff, dependency/config changes, build identity and evidence all describe the same candidate |

Coverage is a review aid. No percentage, including 100%, substitutes for a
missing requirement, missing boundary case, failed independent oracle or open
anomaly. Watch-mode output, developer-local screenshots and CI logs whose
candidate identity is ambiguous are not controlled evidence.

## 5. Findings, deviations and residual-risk handoff

Every failed assertion, type/build failure, calculation discrepancy, unexpected
property counterexample, skipped required case, report-generation failure or
environment deviation receives an anomaly identifier before rerun. Its record
shall include root cause, affected requirements/hazards/versions, impact,
correction, regression evidence and independent review.

FND-C1 and any other critical/high calculation or review-state finding remain
open until quality and the required technical/clinical reviewer accept objective
closure evidence. G3 prohibits unresolved critical/high anomalies. Lower-
severity anomalies require documented risk impact, rationale, owner, target or
acceptance, and quality approval; “tests are green now” is not a disposition.

G3 supplies implemented-control evidence to RMF-001 but does not by itself
accept residual or overall risk. Any new hazard or control introduced by the
refactor is added to RMF-001, SYS-001 and TRC-001 before gate closure.

## 6. Unresolved decisions and blockers

| Decision/blocker | Required resolution | Current state |
| --- | --- | --- |
| All CALC-001 DEC-NUM-001–012 items | Named approvers, values and rationale | Open; blocks G2/G3 |
| Field/input/output bounds and measurable range | Exact clinical values and boundary corpus | `TBD`; blocks implementation evidence |
| Exact display/rounding/below-threshold policy | One approved deterministic rule and wording | Open |
| Exact representation limits/canonicalization | Approved TypeScript/formal design and overflow proof/test boundary | Open |
| Error set/order and UI presentation | Approved domain ordering plus HF presentation decision | Open |
| Equivalent-text reset behavior | Approve DEC-NUM-012 and test every critical field | Open |
| DEV-001 tools/packages/configuration | Compatibility, licences/security, exact locks and signatures | Open |
| Independent oracle/verifier | Named independent person and approved corpus source | Open |
| Property counts/seeds/generator boundaries | Fixed in VVP-001/DEV-001 | Open |
| Formal CE5 scope | Explicit approve/defer decision; no silent substitution for testing | Open |

These decisions are expected to close at G2. If any remains open when this
record is presented, G3 is automatically rejected without weighing other
evidence.

## 7. Exact exit criteria and determination

G3 closes only when the quality lead verifies and records **all** of the
following for the one candidate in section 1:

1. every G3 entry criterion is satisfied and its upstream approval is still
   effective;
2. every G3-IM control is implemented without an unapproved alternate path;
3. every G3-EV item required by the approved scope is present, internally
   consistent, independently reviewed where specified and passing;
4. CALC-001/SYS-001/RMF-001/TRC-001 and actual code/tests agree, with no
   unexplained requirement or implementation;
5. the complete approved corpus and properties pass under the controlled
   environment, including FND-C1 and all critical/high regressions;
6. no required test is skipped, retried away, weakened, rebaselined to the
   implementation output or masked by formatting;
7. the independent calculation verifier signs a positive conclusion and the
   pharmacy lead confirms the approved arithmetic contract;
8. no critical/high anomaly remains open and every lower anomaly has an
   approved disposition;
9. the evidence bundle and traceability entries identify the exact candidate,
   dependencies, configuration, reports and reviewers; and
10. every required approver signs the exact candidate commit below.

The determination is indivisible: there is no “conditionally closed” state.
If evidence or a signature is missing, status remains **Open**. Rejection shall
identify the blocking items and candidate; it shall not overwrite prior data.

## 8. Approval record

| Role | Name | Decision | Date/signature | Approved candidate commit | Evidence reference |
| --- | --- | --- | --- | --- | --- |
| Software lead | Unassigned | Pending | — | — | — |
| Pharmacy lead | Unassigned | Pending | — | — | — |
| Independent calculation verifier | Unassigned | Pending | — | — | — |
| Nursing/human-factors reviewer | Unassigned | Pending | — | — | — |
| Quality lead / gate authority | Unassigned | Pending | — | — | — |

No row may be completed by a bot or inferred from GitHub approval/check status.
Electronic signatures must be attributable, controlled and linked to the exact
candidate and evidence bundle.

## 9. Reopening and change control

After closure, quality shall reopen G3 before accepting any change to:

- decimal grammar, input/output bounds, units, conversion ratio, formula,
  operation order, exact representation, error priority, one-vial/final-volume,
  rounding/display or positive-never-zero behavior;
- domain/result/format types, calculation code, browser parsing boundary,
  review/reset state machine, selector synchronization or actionable-result
  accessibility behavior;
- runtime/test/compiler/property/formal dependencies, lockfiles, toolchain,
  configuration, generator/oracle/corpus or controlled seed set;
- intended use, supported medication/workflow/population/platform when it can
  affect calculation requirements or risk;
- a storage/equation migration that invokes or changes the calculation engine;
  or
- an anomaly, complaint, vulnerability or field signal that questions any G3
  assumption, control or evidence.

The impact assessment identifies affected requirements/hazards/evidence and
whether the whole gate or a justified subset is rerun. Any calculation,
representation, oracle or approved clinical-policy change requires the complete
applicable numeric corpus, property and independent-verification rerun. The
new candidate receives a new evidence bundle and signatures; an old green run
or approval never transfers automatically.
