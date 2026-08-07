# GATE-005 — Representative interface

| Field | Value |
| --- | --- |
| Gate | G5 — representative interface |
| Status | Open — draft gate record; not approved or executed |
| Primary owners | Software lead and nursing/human-factors lead (unassigned) |
| Required approvers | Nursing/human factors, pharmacy, software and quality |
| Supporting reviewers | Accessibility specialist, regulatory lead and French clinical reviewer as applicable |
| Target | `0.2.0-classification` reference product |
| Record version/date | 0.1 / 2026-08-07 |
| Effective date | None |

G5 confirms that the classification-reference interface is representative,
accessible and supports independent review of the arithmetic. It does not
authorize patient care, establish summative clinical usability validation,
close G7, or show that Health Canada has accepted the classification rationale.
A passing CI run or code commit alone cannot close this gate.

## 1. Entry criteria

Work may be prepared in parallel after domain interfaces stabilize, but the
controlled G5 evaluation cannot begin until all applicable entries are met.

| Entry criterion | Required evidence | Current status |
| --- | --- | --- |
| G3 calculation implementation verified | Signed `GATE-003` record, exact engine/API baseline and no unresolved critical/high calculation anomaly | Open; G3 record/evidence absent |
| Relevant G4 state interfaces stable | Approved storage/review-state interfaces or documented scope showing they cannot invalidate evaluation | Open; STO-001 is draft |
| Intended use and workflow frozen | Approved REG-001/REG-002, feature disposition, limitations and claims | Open; G1 remains open |
| Interface requirements approved | Approved SYS-001 ACC/HFE/REV/LAB/USE requirements and applicable RMF-001 controls | Open; drafts only |
| Verification methods controlled | Approved VVP-001 methods, environments, anomaly and evidence-retention rules | Open; VVP-001 is draft |
| Supported matrix fixed | Exact device, OS, browser/engine, orientation, language, zoom/text and assistive-technology combinations | Open; G1 decision absent |
| Representative build identified | Exact source commit, package version, visible revision and build/artifact digest | Not selected |
| Evaluation protocol approved | Predetermined tasks, success criteria, sample rationale, inclusion criteria, consent/privacy, facilitation and analysis plan | Not created |
| Representative participants available | Canadian nurses matching the intended users and clinical setting, with relevant workflow experience | Unassigned |
| Known anomalies reviewed | Current FND/anomaly list with no undisclosed condition that invalidates evaluation | Open |

Running informal demonstrations before these entries are complete may produce
design input, but those sessions must be labelled exploratory and cannot be
retrospectively represented as the controlled G5 evaluation.

## 2. Implementation-review exit criteria

The software and human-factors leads must jointly confirm the following against
the exact candidate build:

| Criterion | Required evidence | Gate status |
| --- | --- | --- |
| Domain/presentation separation | Mix, CalculationReview, Favourites and History are separated from the pure calculation/storage boundaries; UI cannot infer validity from formatted text | Not evaluated |
| Maintainable component structure | `App.svelte` decomposition and one reviewed mobile-first layout/CSS strategy; duplicated conflicting layout rules removed | Not evaluated |
| Scroll/reflow behavior | No unconditional global `overflow: hidden`; document/panel scrolling remains available when height, orientation, zoom, content or language requires it | Not evaluated |
| Equation-review integrity | Substituted formula and operands come from the validated calculation result; mL remains absent until required review is complete | Not evaluated |
| Terminology | Final prepared volume is consistently distinguished from diluent added, nominal container/bag volume, overfill and displacement | Not evaluated |
| Scope/claim visibility | Intended-use perimeter, exclusions, prototype warning, local/offline limits and version identity are available in the required states | Not evaluated |
| Stored-record interaction | Favourites/history cannot restore a dose, review completion or authoritative derived result and cannot bypass current validation | Not evaluated |
| Language consistency | Every language included in the candidate conveys clinically equivalent safety meaning and fits without clipping/ambiguity | Open; French implementation/review absent |

Source review, semantic DOM inspection and state-transition evidence must trace
these rows to SYS-001/RMF-001/TRC-001. Visual similarity to a mockup is not
evidence of the interaction or safety-state criteria.

## 3. Required viewport, zoom and text evidence

The complete approved workflow—not only the initial form—must pass at:

| Configuration | Required states and evidence | Status |
| --- | --- | --- |
| 393×852 portrait | All entry, error, review, result, storage and navigation states; screenshots plus semantic/layout assertions | Not run |
| 852×393 landscape | Same full state set; scroll and focus behavior during the calculation dialog | Not run |
| 820×1180 tablet | Same full workflow and populated list states | Not run |
| 1280×1000 desktop | Same full workflow and keyboard path | Not run |
| 200% text/zoom | Complete critical workflow without lost content, function or meaning | Not run |
| 320 CSS px reflow where applicable | No two-dimensional scrolling except content that intrinsically requires it; equations remain readable/operable | Not run |
| Approved text-spacing override | No clipping, overlap, truncation or hidden control/status | Not run |

For each configuration, evidence must identify device/browser/engine, OS,
viewport, device scale, locale, zoom/text settings and build identity. A test
that asserts there is no page scrolling is not sufficient and may conflict with
the requirement to allow scrolling when content cannot fit.

Essential entered values must be at least 16 CSS px. Active targets must be at
least 44×44 CSS px, with target-spacing exceptions explicitly reviewed. Focus
must remain visible, equations must wrap/read without losing mathematical
meaning, and fixed/sticky content must not obscure safety content or controls.

## 4. Accessibility-state exit criteria

Automated WCAG 2.2 A/AA analysis is required for, but cannot alone accept, each
critical state:

- incomplete calculation and each approved field/error class;
- calculation-review dialog before, during and after individual checks;
- revealed result and acknowledgement/save state;
- calculation changed after review/result reveal;
- storage unavailable, corrupt-record isolation and recovery messaging;
- empty and populated favourites, including pagination if retained;
- empty and populated history, reopen and deletion;
- offline-ready, update/recovery and unavailable states that are in scope; and
- intended-use/limitations, prototype warning and version information.

Manual evidence must cover:

1. complete keyboard and approved switch-control operation;
2. logical focus order, visible focus and no keyboard trap;
3. modal initial focus, containment, Escape/back behavior and focus return;
4. accessible names, roles, values, groups, field-error association and live
   status announcements;
5. error changes and stale-result removal from both visual and accessibility
   trees;
6. non-colour communication of validation/review/result state;
7. accessible MathML/equivalent equation output, unit pronunciation and reading
   order; and
8. approved screen-reader output for equations, conversions, errors, review
   state, result reveal and local/offline limitations.

The exact VoiceOver/Safari, TalkBack/Chromium and any desktop screen-reader
versions remain an open supported-matrix decision. Browser emulation does not
replace checks on the approved managed device/assistive-technology combinations.

## 5. Representative-nurse formative evidence

The nursing/human-factors lead must issue an approved protocol before sessions.
The protocol and report must include:

- a justified participant count and sampling strategy rather than an arbitrary
  convenience number;
- inclusion/exclusion criteria showing participants represent the intended
  Canadian nurse users, clinical experience, device familiarity and language
  populations claimed by the reference product;
- evaluator independence/conflict disclosure, standardized training, session
  environment, device/build identity and permitted assistance;
- consent, privacy, recording, note-handling and retention controls with no
  patient information;
- predetermined task success, critical-error, close-call, assistance,
  comprehension and abandonment criteria;
- raw observation record, deviations, participant characteristics in
  de-identified aggregate, analysis and every resulting anomaly; and
- nursing/HF, pharmacy and quality review of conclusions and remediation.

At minimum, each representative workflow must assess whether the participant
can, without leading prompts:

1. recognize the product as arithmetic support for an already-authorized dose,
   not prescribing, order checking or clinical approval;
2. enter and independently compare vial facts, final prepared volume and dose;
3. understand and verify same-unit and mg↔mcg substituted equations;
4. distinguish final prepared volume from diluent added, nominal bag volume,
   overfill, displacement and dead space;
5. recognize one-vial and other approved unsupported-use boundaries;
6. detect/correct an entry error and understand review reset after a critical
   edit or history reopen;
7. explain what checking every equation and seeing mL does—and does not—mean;
8. understand favourites/history as local unconfirmed inputs and know how to
   delete/recover from unavailable storage; and
9. understand first-online installation, offline limitations, version identity
   and the institution's non-software fallback.

The report must show that the substituted arithmetic is actually available for
independent review and that no unresolved use error undermines the proposed
classification-reference rationale. Failed or ambiguous sessions are retained
as anomalies; changing the script, coaching the participant or discarding a
session requires a documented deviation.

This is formative evidence for classification readiness. It is not the later
summative clinical usability validation required before clinical release.

## 6. Controlled screenshot and evidence set

Stable dossier screenshots may be generated only after all other G5 exit
criteria pass. The screenshot manifest must identify exact build/commit,
package and displayed versions, viewport/device/browser, locale, state, source
scenario, file digest and requirement/risk links. It must include the input,
substituted equation review, revealed result, applicable limitations and
version/prototype status without implying approval.

Earlier mockups, exploratory screenshots and snapshots from `e2eha5h` must be
labelled historical/test-fixture material and excluded from the dossier. CI
artifacts are convenience copies; the approved evidence set follows VVP-001's
controlled retention and integrity rules.

## 7. Gate exit checklist

| Exit requirement | Planned record/evidence | Status |
| --- | --- | --- |
| All entry criteria approved | Signed prerequisite/gate records and candidate manifest | Open |
| Representative UI implementation reviewed | Architecture/source/UI review report | Not produced |
| Exact viewport/zoom/text matrix passed | Version-bound automated/manual report | Not run |
| All critical accessibility states passed | Axe, manual keyboard/focus/reflow and AT reports | Not run |
| Screen-reader equation/unit/error/review output accepted | Version-bound AT transcripts/observations | Not run |
| Representative Canadian nurse formative protocol completed | Approved protocol, consent/privacy record and session evidence | Not started |
| Independent review and limitation comprehension demonstrated | Formative evaluation report | Not produced |
| Every use/accessibility finding dispositioned | Anomaly records, regression evidence and quality decisions | Open |
| Traceability updated through G5 | TRC-001 implementation/verification/evidence-status updates | Open; TRC remains incomplete until G7 |
| Stable dossier screenshot set controlled | Screenshot manifest and digests | Not produced |
| Required approvals identify exact baseline | Section 10 signatures and immutable source/build identity | Pending |

No critical/high interface, accessibility or use-related anomaly may remain
open. Lower-severity anomalies require documented risk impact, rationale,
planned disposition and quality/clinical approval. G5 does not close TRC-001;
later Step 6/7 results must still be added before traceability closes at G7.

## 8. Open decisions

- exact supported device/OS/browser/assistive-technology and language matrix;
- favourites/history inclusion and their representative tasks;
- approved patient, setting, medication and preparation exclusions;
- participant sampling/count, recruitment sites and evaluator independence;
- quantitative/qualitative formative acceptance criteria;
- target-spacing exceptions, long-equation presentation and permitted scrolling;
- French UI timing and whether French formative work is required for the
  classification reference or explicitly deferred with regulatory rationale;
- accessibility specialist and controlled evidence repository/retention; and
- which G4 behavior must be final before each formative workflow can run.

These decisions must be resolved in their controlling records; a gate signature
cannot silently fill them in.

## 9. Reopening rules

After G5 approval, impact assessment reopens all or part of this gate for a
change to intended use, claims, exclusions, supported users/settings/language,
input/unit/final-volume set, formula/equation/display policy, review-state
behavior, stored-record workflow, component/DOM semantics, focus/modal behavior,
navigation, layout/CSS/fonts, safety copy, target size, supported device/browser/
assistive technology, offline/update messaging or evidence tooling.

A calculation/storage/security change that alters an observable state also
reopens affected G5 evidence. A bug fix does not preserve approval automatically:
quality and nursing/HF must document the affected tasks/states, rerun scope and
whether new screenshots or formative work are required.

## 10. Approval record

The gate remains open unless every required approver identifies and signs the
same exact source commit, built-artifact digest, requirement/risk baseline,
accessibility report, formative report and screenshot manifest.

| Role | Name | Decision | Date/signature | Approved source/build |
| --- | --- | --- | --- | --- |
| Nursing/human-factors lead | Unassigned | Pending | — | — |
| Pharmacy lead | Unassigned | Pending | — | — |
| Software lead | Unassigned | Pending | — | — |
| Quality lead | Unassigned | Pending | — | — |
| Accessibility specialist/reviewer | Unassigned | Pending review | — | — |
| French clinical reviewer, if in candidate scope | Unassigned | Pending | — | — |
