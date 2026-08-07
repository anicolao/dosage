# Codex repository review

Review date: 2026-08-07  
Reviewed revision: `3b4b63b` on `agent/history-review`  
Scope: application code, local persistence, tests, generated test documentation, build configuration, GitHub Actions deployment, and the product/MVP/UX documents.

## Executive assessment

This repository is a thoughtful, unusually well-documented prototype. Its strongest feature is not the arithmetic itself but the safety interaction around it: the answer remains absent until every substituted equation has been checked, any critical edit revokes the review, favourites never restore an ordered dose, and history review starts unconfirmed. Those rules are visible in the code and asserted in end-to-end tests.

The repository is not ready for clinical use, a pilot, or an “MVP complete” claim. The UI says this clearly, and the design documents correctly list the missing clinical, regulatory, human-factors, security, and offline release gates. In addition to those acknowledged future gates, this review found two present implementation defects that should be treated as blockers even for further product evaluation:

1. the numeric parser and formatter can turn a valid positive result into a displayed `0 mL`, and can let overflowing intermediate arithmetic reach review; and
2. the global no-scroll layout clips content at 200% text size and in phone landscape.

Both failures were reproduced against the built application, not inferred only from source.

The right next step is to freeze feature work briefly, extract and harden the calculation core, add pure numeric tests, validate persisted records at the boundary, and make the layout reflow or scroll under constrained height/zoom. Once those foundations exist, the remaining prototype-to-MVP work can proceed with much lower risk.

## What is working well

### Safety state is explicit and conservative

- `criticalChange()` clears `reviewed`, `checkedSteps`, `acknowledged`, and stale notices (`src/App.svelte:164-169`). Every critical input path calls it.
- The answer is not merely covered before review; it is absent from the rendered result branch and accessibility tree (`src/App.svelte:425-457`). The tests assert this absence.
- `allStepsChecked` is derived from the currently applicable calculation steps, and `completeCalculationReview()` refuses to advance unless all of them are checked (`src/App.svelte:88`, `297-302`). This correctly handles three-step same-unit and four-step converted calculations.
- Opening or reopening calculation details clears all equation checks (`src/App.svelte:292-295`). History review also clears review and acknowledgement before switching screens (`src/App.svelte:258-274`).
- Favourites store vial-label facts but not the ordered dose or final volume, and loading one resets both (`src/App.svelte:181-225`). This matches an important safety principle in the product documents.
- A dose greater than the medication available in one vial is blocked before a result can be reviewed (`src/App.svelte:46-56`). Algebraically, that also ensures the administration volume cannot exceed the final volume for the current one-vial model.

### The arithmetic is inspectable

- Vial concentration, prepared concentration, unit conversion, and administration volume are shown as substituted equations rather than opaque output (`src/App.svelte:64-87`).
- Vial and ordered-dose units are separate inputs. Mass and activity are separate dimensions, so the UI cannot intentionally convert between `units` and mass (`src/App.svelte:154-162`, `403-421`).
- KaTeX is locally bundled and emits MathML as well as visual HTML (`src/App.svelte:145-151`). The accessibility test asserts the MathML is present.
- “Final prepared volume” is used consistently in the primary workflow, and the product documentation explains that this is not the same as volume of diluent added.

### Privacy and prototype boundaries are handled honestly

- The shipped app has no account, API, telemetry, analytics, remote fonts, or remote runtime assets.
- The UI requests no patient, order, encounter, room, or free-text notes. The E2E suite verifies the narrow input surface.
- User-created data is stored only in version-named local-storage keys. Tests assert the exact keys written and exercise reload/deletion behavior.
- The README and in-app banner repeatedly say that this is an unvalidated prototype and is not for patient care. The README does not falsely claim installed offline support.
- When storage becomes unavailable, the calculation remains usable and persistence actions are disabled rather than failing the entire app (`src/App.svelte:101-127`, `587-590`).

### The E2E harness is strong for a prototype

- Playwright uses a fixed locale, timezone, scale factor, reduced motion, software rendering flags, no retries, and zero-pixel screenshot tolerance (`playwright.config.ts:3-55`).
- The helper runs semantic assertions before screenshots, waits for local images/fonts, checks viewport overflow, and generates the scenario README from the assertions (`tests/e2e/helpers/test-step-helper.ts:65-119`).
- Tests cover both directions of mg/mcg conversion, same-unit calculations, activity units, all supported final volumes, one-vial limits, local persistence, corruption of stored JSON, network behavior, axe analysis, target sizes, and phone/desktop screenshots.
- The new history-review path is particularly well guarded: the test verifies every restored input, zero checked equations, a disabled completion action, and no revealed result.
- The full suite currently passes: 6/6 Playwright projects.

### Build and delivery have useful safeguards

- The Vite base is environment-configurable, and the deployment check scans the built HTML/CSS/JS for root-relative paths that escape the configured GitHub Pages subpath (`vite.config.js:4-10`, `scripts/verify-base-paths.mjs`).
- CI uses `npm ci`, runs `svelte-check`, runs the complete browser suite, uploads the report on failure, and deploys same-repository PR previews only after tests pass.
- The dependency tree is small. At review time, `npm audit` reported zero vulnerabilities across production and development dependencies, and `npm outdated --json` returned no outdated top-level packages.

## Critical findings

### C1. Numeric validation and display can produce an actionable `0 mL` from a positive calculation

Relevant code: `src/App.svelte:33-63`, `129-150`, `353`, `408`  
Relevant requirements: `MVP_DESIGN.md:53-65`, `VISION.md:65`, `MVP_DESIGN.md:225`

The design requires strict decimal parsing, rejection of exponential notation and unsafe numbers, preservation of the unrounded calculation, at most six significant decimal places, and an indication when display rounding occurred. The implementation instead:

- accepts anything the browser’s number input and `Number(...)` accept, including exponential notation;
- checks only that the three directly parsed inputs are finite and positive;
- does not check whether conversion factors, concentrations, or the final administration volume remain finite and positive;
- formats with `maximumFractionDigits: 6` without an explicit significant-precision policy or rounding disclosure; and
- uses the formatted value inside the review equations, so display rounding affects the proof the user is asked to verify.

Reproduced examples against the production build:

- Entering `1e3` in “Amount in vial” is accepted and makes the calculation reviewable, despite the explicit rule that exponential notation is blocked.
- For `1000 mg` in `1 mL`, prepared to `1000 mL`, with an ordered dose of `0.0000001 mg`, the mathematical result is `0.0000001 mL`. The review equation renders the ordered dose as `0 mg`, renders the result as `0 mL`, and completing review displays `0 mL`.
- For `1e308 mg` in `1 mL`, prepared to `1000 mL`, with an ordered dose of `1 mg`, `amountInBaseUnit = amount * 1000` overflows even though a same-unit calculation should algebraically cancel that factor. The converted concentration becomes infinity and the reviewed result is displayed as `0 mL`.

This is the highest-priority defect in the repository because a plausible code path can replace a positive value with zero while still presenting a completed review state.

Remediation:

1. Extract strict parsing and calculation into a pure module with an explicit result type such as `{ ok, value, errors, warnings, display }`.
2. Define the permitted decimal grammar, maximum input precision, minimum/maximum magnitude, and intermediate numeric policy in code. Reject exponent notation, commas, non-finite values, underflow, overflow, and a result that cannot be represented/displayed without becoming zero.
3. Avoid overflow-prone intermediates. For mass conversion, calculate with a bounded scale ratio or a decimal representation rather than first multiplying a potentially large value by 1000.
4. Validate every intermediate and the final result with `Number.isFinite(...)` and policy bounds, not only the input conversions.
5. Separate calculation precision from presentation. Keep the unrounded value, apply the clinically approved significant/decimal precision policy, and disclose any rounded display as the design requires.
6. Add pure example and property tests before changing the UI. Include the complete corpus in `MVP_DESIGN.md:211-225`, boundary values around every policy limit, equivalent decimal spellings, underflow/overflow, and values that would otherwise format as zero.
7. Have a second qualified reviewer independently verify the numeric policy and corpus before any pilot claim.

### C2. The fixed-height, globally hidden-overflow layout fails required zoom and landscape states

Relevant code: `src/App.svelte:725-855`  
Relevant requirements: `MVP_UX_DESIGN.md:130-139`, `MVP_DESIGN.md:186`, `208`, `VISION.md:87`

The app globally sets `html`, `body`, `.app-shell`, `main`, and screen sections to fixed viewport heights with hidden overflow. This makes the tested 393×852 composition visually tidy, but it prevents recovery when content needs more space.

Reproduced against the production build:

- At a 393×852 viewport with the root text size doubled to simulate 200% text zoom, `.app-shell` needed 871 px inside an 852 px box, and the main section/form needed 390 px of width inside 369 px. The overflow is clipped because scrolling is disabled.
- At an 852×393 phone-landscape viewport, the Mix section needed 467 px of height inside 242 px and the form needed 436 px inside 211 px. More than half of the workflow is inaccessible.

The current automated suite covers 393×852, a width-only change to 320×852, and 1280×1000. It does not cover phone landscape, tablet, or 200% text zoom even though those are explicit requirements.

Remediation:

1. Treat “no scroll at the target portrait viewport” as an optimization, not a global invariant.
2. Allow document or panel scrolling whenever height is constrained, text is enlarged, content wraps, or orientation is landscape.
3. Add height/orientation media queries and test with actual browser zoom/text scaling where possible. Do not depend only on width breakpoints.
4. Add the documented 852×393 landscape and 820×1180 tablet projects, plus a 200% text-zoom/reflow project.
5. Test all primary states at zoom: blank, error, review dialog, revealed result/acknowledgement, populated favourites, and populated history.
6. Revisit the requirement that every equation must remain on one visual line. Accessibility and readable size should win over a no-scroll presentation rule when those goals conflict.

## High-priority findings

### H1. Persisted records are parsed but not schema-validated

Relevant code: `src/App.svelte:101-117`, `212-225`, `235-274`, `517-570`

`read()` checks only that parsed JSON is an array. Individual records are trusted. This creates several failure modes:

- unsupported or missing final volumes can enter state through history even though the UI offers an allowlist;
- unknown units can enter state; two unknown units both map to `null`, so `unitDimension(vialUnit) === unitDimension(orderedUnit)` can evaluate true;
- malformed strings can reach KaTeX through `mathUnit()` and then `{@html renderMath(...)}`;
- history displays stored derived concentrations and administration volumes without recomputing or checking them against the stored inputs; and
- a well-formed but old/incomplete record can render `undefined`, `NaN`, or misleading historical output.

KaTeX’s default trust policy reduces direct HTML-injection risk, and ordinary Svelte interpolation escapes strings, but that is not a substitute for validating the domain model. A malformed KaTeX expression can also throw because `throwOnError` is enabled.

Remediation:

- Define explicit favourite and history schemas with allowlisted keys/units/volumes, bounded decimal strings, valid IDs/timestamps, `schemaVersion`, and `equationVersion`.
- Validate each record independently at load. Quarantine or drop only the invalid record and preserve valid data from both collections.
- Recompute derived values from validated original inputs for display/review. Do not treat stored computed numbers as authoritative.
- Ensure unknown units are incompatible by definition; never allow `null === null` to mean compatible.
- Add tests for syntactically valid but structurally invalid records, unknown/future schema versions, partial arrays, unsupported final volumes, and deliberately inconsistent stored results.

### H2. The safety-critical calculation has no pure module or unit/property tests

Relevant code: most of `src/App.svelte:1-313`  
Relevant requirement: `MVP_DESIGN.md:53`, `225`

All parsing, unit policy, calculation, formatting, persistence, and view state live in a single 855-line Svelte component. The arithmetic is tested only through Chromium and the DOM. That makes boundary exploration slow and leaves correctness coupled to rendering and CSS.

The design already calls for the right architecture: a pure, unit-tested calculation module and property tests. Implement that before adding units or workflows. Recommended boundaries:

- `src/lib/decimal-input.*`: grammar, normalization, bounds, and preserved input text;
- `src/lib/calculation.*`: unit dimensions/scales, concentrations, final volume, and typed errors;
- `src/lib/format.*`: clinically reviewed display policy and rounding disclosure;
- `src/lib/storage.*`: schemas, migrations, retention, and quarantine;
- smaller Svelte components for Mix, CalculationReview, Favourites, and History.

The UI should consume a validated calculation result rather than rebuilding safety rules through many reactive statements.

### H3. CI grants write permissions to the job that executes pull-request code

Relevant code: `.github/workflows/verify-and-deploy.yml:15-18`, `23-47`

The workflow grants `contents: write` and `pull-requests: write` at workflow scope. The E2E job checks out and executes repository-controlled scripts (`npm ci`, package lifecycle behavior, Vite, Playwright) with those permissions. GitHub downgrades tokens for normal fork PRs, and the deploy job correctly excludes forks, but same-repository PR branches still receive broader credentials than tests need.

Remediation:

- Set workflow/default permissions to `contents: read`.
- Give the deploy job only the exact write permissions it requires (`contents: write` and `pull-requests: write`).
- Pin third-party actions, especially `peaceiris/actions-gh-pages`, to reviewed commit SHAs rather than mutable tags. Consider SHA pinning official actions too.
- Add dependency-review and secret-scanning controls appropriate to the repository’s intended risk level.

### H4. The documented product requirements contain a direct unit-conversion contradiction

`VISION.md:44-46` says the MVP supports explicit mg↔mcg conversion, and the rest of the code/design/tests implement it. `VISION.md:54`, however, says the MVP “does not convert between mg and mcg inside a calculation.” This is a safety-relevant requirements contradiction, not cosmetic wording.

Correct the sentence and review all normative documents for one source of truth. For a clinical product, requirement IDs and traceability from hazard → requirement → implementation → test would be more reliable than repeating prose across VISION, MVP design, UX design, README, and generated preview documents.

### H5. CSP, offline installation, migrations, and recovery remain release blockers

> Status update (2026-08-07): the repository now includes a manifest, generated versioned app-shell service worker, install icons, base-path checks, and a dedicated offline close/reopen calculation-and-history test. CSP, schema migration, multi-release update/rollback, eviction recovery, and the intended iOS/device matrix remain open.

Relevant code: `index.html`, `package.json`, `playwright.config.ts:13`  
Relevant requirements: `MVP_DESIGN.md:121-137`, `190-194`, `227-236`

These are mostly acknowledged prototype gaps, but they should remain explicit blockers:

- no Content Security Policy is shipped;
- default visual tests deliberately block service workers, while the dedicated offline project enables them;
- no multi-release update/rollback, storage-eviction, or intended-iOS-matrix scenario exists;
- there is no IndexedDB schema/migration/transaction layer;
- malformed JSON disables persistence instead of quarantining the affected record and recovering valid records; and
- no bundled recovery path exists for a failed cache installation or evicted app shell.

The README now limits the offline claim to a successfully installed app shell and names the remaining eviction/device caveats. Its “Privacy promise” also says the shipped MVP must enforce a restrictive CSP, which is still absent. Keep wording precise so the current prototype is never mistaken for a clinically validated release.

## Medium-priority findings

### M1. Unit-selector DOM state can diverge from application state

`selectVialUnit()` changes only `vialUnit` (`src/App.svelte:171-174`). If `orderedUnit` is `mcg` and the vial changes to `units`, the re-rendered select visibly becomes blank because `mcg` is no longer an option, but the variable can remain `mcg` until the user chooses `units`. The compatibility guard blocks the result, so this does not currently reveal an answer, but the visible field and internal validation state disagree.

Reset an incompatible ordered unit to `''` as part of the vial-unit transition. Add a test that checks both the selector and the resulting incomplete/error state.

### M2. A saved mix can be added repeatedly

After `saveMix()` succeeds, `reviewed` and `acknowledged` remain true and the button remains enabled (`src/App.svelte:235-255`). A double tap or repeated tap creates duplicate history records. Disable while saving, reset acknowledgement after success, or make the save idempotent for the current reviewed state.

### M3. Corruption handling is coarse-grained

One malformed JSON string in favourites causes the shared `onMount` catch to set `storageAvailable = false` before history is read (`src/App.svelte:101-109`). Valid history becomes unavailable, and all future persistence is disabled even though local storage itself may still work. The UX document says corrupt records are isolated; the current behavior isolates the whole persistence feature.

Handle access failure separately from parse/schema failure. Recover each key independently and offer a clear action to remove/quarantine invalid records.

### M4. The privacy test does not implement the full documented network contract

Relevant test: `tests/e2e/004-privacy-and-recovery/004-privacy-and-recovery.spec.ts:11-63`  
Relevant requirement: `MVP_DESIGN.md:190-194`

The test instruments fetch, XHR, and `sendBeacon`, but not WebSocket or EventSource. It allows every same-origin GET rather than allowlisting the expected document/assets. A dynamically created image or other element could make an unexpected same-origin request and still pass.

Instrument/deny WebSocket and EventSource, fail on runtime requests not in a built-asset allowlist, and cover error, deletion, clear-all, history review, and reload paths as the design specifies.

### M5. Accessibility automation covers only a narrow state set

- Axe runs on the calculation journey, not populated/empty favourites, populated/empty history, blocking errors, storage errors, or confirmation dialogs.
- The keyboard check presses Tab once; it does not complete the workflow, verify dialog trapping/return, or exercise the history-review path whose opener is removed before `showModal()` runs.
- 44 px targets are checked, but the UX document also asks for 8 px separation. Volume cards use a 3 px gap in the compact layout (`src/App.svelte:766`).
- Entered values use `.98rem` (15.68 px at the default root) despite the design minimum of 16 CSS px, while several essential labels/cautions are around 10.5–12 px (`src/App.svelte:752-787`).
- The design asks for screen-reader, switch, 200% zoom, portrait, and landscape support; current automation is only a partial proxy.

Add state-based axe checks, a full keyboard path, focus return assertions, text-spacing/zoom tests, and representative assistive-technology/manual testing before pilot.

### M6. Test coverage is excellent in depth but narrower than the documented matrix

`playwright.config.ts` defines 393×852 Chromium for all journeys and 1280×1000 Chromium only for the responsive journey. A test dynamically checks 320×852. Missing documented coverage includes 852×393 landscape, 820×1180 tablet, 200% zoom, the critical calculation across the full matrix, offline/service-worker behavior, migration, retention by age, and property tests.

Only Chromium is used. That is adequate for deterministic prototype screenshots, but an intended phone product should eventually include WebKit/Safari behavior, particularly for native dialog, number inputs, local storage, installed PWA behavior, and viewport/safe-area handling.

### M7. The workflow can race GitHub Pages deployments

Workflow concurrency is grouped by `github.ref` (`verify-and-deploy.yml:19-21`), so two different PRs have different groups and can deploy concurrently to the same `gh-pages` branch with `keep_files: true`. Serialize only the deployment mutation across refs, or use an artifact-based Pages deployment model that avoids competing branch pushes.

Other workflow gaps:

- non-root base-path verification runs only in the deploy job, so fork PRs skip it and can merge a path break that fails only after merge;
- preview directories are not cleaned up when PRs close;
- preview paths and URLs hardcode the repository name;
- the PR-comment lookup reads only the first page of comments and can create duplicates on long threads.

### M8. The component and CSS need decomposition

`App.svelte` combines domain rules, storage, navigation, all screens, the dialog, and two overlapping generations of CSS. Rules at `607-724` establish a conventional responsive layout, then rules at `725-855` override much of it into the fixed-height instrument panel. There are also small duplicates such as consecutive `.caution` rules (`666-667`).

This is workable at the current size but makes safety review harder because a domain change and visual change share the same file. Extract the domain/storage modules first, then components, then consolidate CSS into a single mobile-first rule set with explicit constrained-height behavior.

### M9. History trusts stored derived numbers and lacks a durable audit schema

The persisted object omits several fields described in the design (`schemaVersion`, `equationVersion`, `updatedAt`, and the documented field names), and calculated values are stored as JavaScript numbers (`src/App.svelte:235-250`). History then displays those stored values (`557-570`), while review silently recalculates from inputs. A record can therefore show one result in History and another after Review if it is stale or malformed.

Store original validated decimal strings and version metadata. Recompute for display under the recorded equation version, or make migrations explicit. If history is an audit aid, the application needs to explain whether a record represents the original calculation engine or the current one after an update.

### M10. Destructive record actions are inconsistent

Clear-all history has a scope/no-recovery confirmation, but single-record history and favourite deletion are immediate. Given compact 44 px adjacent actions, an Undo affordance would be safer and friendlier than adding a confirmation to every deletion.

## Lower-priority cleanup and efficiency notes

### Bundle and repository assets

- The production build is about 2.0 MB uncompressed. `static/images/dilution-containers.png` contributes 371 KB and is copied to production even though only `MVP_UX_DESIGN.md` references it. Move design-only assets out of `static/`.
- Importing all of `katex.min.css` causes the build to emit many KaTeX font variants the limited equation vocabulary does not use. The JS bundle is about 321 KB and the CSS about 50 KB before compression. Investigate supported font subsetting or a smaller, accessible math-rendering approach, but do not trade away MathML or inspectability merely for bundle size.
- Four older/newer mockup PNGs occupy about 4.3 MB in the repository. That is acceptable for design history, but identify canonical versus superseded assets and consider Git LFS or pruning if binary history grows.

### Documentation drift

- README says the repository has “an explicit future E2E strategy,” but the E2E suite is already implemented and is central to CI.
- `docs/PR_PREVIEW.md` hardcodes URLs to `agent/initial-dosage-spa`; those links are historical and fragile after branch deletion.
- Several docs link to sibling paths such as `../food` and `../games/jaipur`, which are not self-contained repository references.
- UX says favourites have an Edit action, but the UI has Use and Delete only (`MVP_UX_DESIGN.md:96`, `src/App.svelte:523-526`).
- UX describes a “New mix” action and local draft preservation, neither of which exists yet.
- UX requires incomplete-field focus/error-summary behavior, but the current form has no submit/blur validation state for incomplete data.
- UX’s specified volume helper copy is more explicit than the implemented one-line caution.

Separate “current prototype behavior” from “normative MVP requirement” more mechanically. A small implementation-status table would prevent aspirational UX text from being read as shipped functionality.

### Developer experience

- Add a root `engines.node` field matching the real Vite requirement. README currently says Node 20 or newer, but the installed Vite dependency requires a more specific modern range and CI uses Node 24.
- Add linting/formatting and a conventional `npm test`/unit-test script. `svelte-check` is valuable but not a general lint or domain-test tool.
- Add a Svelte config file to remove the recurring “no Svelte config found” build warning and make preprocessing/compiler choices explicit.
- Consider TypeScript or strongly typed JSDoc for persisted records and calculation results. The highest value is at domain boundaries, not necessarily converting every Svelte line at once.

## Requirements/release-gap matrix

| Area | Current evidence | Status before MVP/pilot |
| --- | --- | --- |
| Core happy-path arithmetic | E2E examples for supported containers and unit directions | Strong prototype coverage |
| Numeric grammar/bounds/rounding | Permissive `Number`; verified zero/overflow defects | Blocked |
| Review/acknowledgement gate | Central reset plus strong E2E assertions | Good, preserve during refactor |
| Favourites/history safety | Dose clearing and history re-review tested | Partial; schemas/migrations/integrity missing |
| Local-only operation | No current runtime service; partial network instrumentation | Good prototype evidence; strengthen enforcement |
| CSP | Not shipped | Blocked |
| Installed offline use/update | No manifest/service worker/offline test | Blocked |
| Accessibility/reflow | Axe and fixed-view tests pass; zoom/landscape fail | Blocked |
| Browser/device coverage | Chromium portrait + desktop | Partial |
| Clinical/human-factors validation | Explicitly not completed | Blocked |
| Hazard traceability/independent verification | Described, not produced | Blocked |
| Regulatory/security release work | Described, not completed | Blocked |

## Recommended remediation order

### Phase 1: prevent incorrect numeric output

1. Freeze additional calculation features.
2. Approve the numeric input/display policy.
3. Extract a pure calculation module with typed errors.
4. Add the documented corpus, boundary tests, and property tests.
5. Fix strict parsing, all intermediate finite checks, underflow/overflow, significant-digit formatting, and rounding disclosure.
6. Add regression tests for the exact reproduced `0 mL` cases.

### Phase 2: harden state boundaries

1. Add record schemas/versioning and per-record quarantine.
2. Recompute/verify stored derived values.
3. Fix unit-selector state synchronization.
4. Make saving idempotent for one reviewed calculation.
5. Define retention and migration behavior before changing storage technology.

### Phase 3: restore reflow and accessibility resilience

1. Remove global hidden overflow as an unconditional rule.
2. Support phone landscape, tablet, text zoom, and small-height screens.
3. Expand axe, keyboard, focus, text-spacing, and target-separation tests.
4. Conduct manual screen-reader and representative-clinician formative testing.

### Phase 4: secure and complete the delivery boundary

1. Minimize GitHub Actions permissions and serialize deployments.
2. Add CSP and exact network-request enforcement.
3. Add manifest/service worker/update behavior and a serial offline test.
4. Add migration/recovery tests and a rollback plan.
5. Pin actions and establish dependency/SBOM/vulnerability procedures.

### Phase 5: reduce maintenance cost

1. Split domain, storage, and screens out of `App.svelte`.
2. Consolidate CSS and remove stale/dead rules.
3. Stop shipping design-only assets and evaluate KaTeX subsetting.
4. Reconcile documentation contradictions and mark every feature as current, planned, or release-gated.

## Verification performed for this review

- Inspected every tracked text/code/config file and the generated scenario structure.
- `npm run check`: 0 errors and 0 warnings.
- `npm run build`: successful.
- Non-root build plus `npm run check:base`: successful for `/dosage/pr2/`.
- `npm run test:e2e`: 6/6 Playwright projects passed.
- `npm audit`: zero known vulnerabilities in the installed dependency tree.
- `npm outdated --json`: no outdated top-level packages reported.
- Reproduced scientific-notation acceptance, positive-result-to-zero formatting, overflow-to-zero review, 200% text clipping, and phone-landscape clipping with one-off Playwright probes against the built app.

Passing current tests is meaningful evidence for the intended happy paths, but it does not negate the reproduced edge failures. The most valuable characteristic of this codebase is its explicit safety model; the next work should bring parsing, arithmetic, persistence boundaries, layout, and CI permissions up to the same standard.
