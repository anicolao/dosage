# MVP design

Document status: target design requirements. Except where a paragraph says
“current” or “implements,” these statements are planned release controls rather
than verified behaviour. Controlled approval and traceability are maintained in
`docs/regulatory/`.

## 1. Release boundary

The MVP target is an installable, phone-first Svelte PWA that performs one-vial
dilution arithmetic fully on-device. The repository currently contains an
installable SPA prototype with an offline app-shell cache; clinical deployment
is explicitly out of scope until the release gates in this document are met.

### Supported calculation

Inputs:

- medication display name: optional for calculation, required to save a favourite;
- medication amount in the vial: positive decimal;
- vial medication unit: `mg` or `mcg`, initially `mg`;
- vial volume: positive decimal mL, initially `1`;
- final prepared volume: exactly `10`, `50`, `100`, `250`, `500`, or `1000` mL;
- ordered dose: positive decimal;
- ordered-dose unit: `mg` or `mcg`, initially `mcg`.

Outputs:

- original vial concentration in the vial unit/mL;
- prepared concentration in both vial and ordered-dose units/mL when conversion is required;
- calculated volume to administer in mL;
- substituted equation and timestamp when saved.

The selected container volume means final prepared volume, not “volume of diluent added.” The product must not attempt to account for labelled bag overfill, displacement, dead space, or institutional preparation technique.

## 2. Equations and numeric policy

Let:

- `A` = medication amount in the vial;
- `Ua` = vial medication unit;
- `Vv` = vial volume in mL;
- `Vf` = final prepared volume in mL;
- `D` = ordered dose;
- `Ud` = ordered-dose unit;
- `S(u)` = scale from unit `u` to the base unit (`S(mcg)=1`, `S(mg)=1000`).

Then:

```text
vial concentration Cv = A / Vv
prepared concentration Cp = A / Vf
prepared concentration in ordered units Cpd = (A × S(Ua) / S(Ud)) / Vf
volume to administer Va = D / Cpd
```

Mg and mcg are compatible and conversion is shown explicitly. Activity units are outside the supported product scope and must not be accepted from the UI or restored records.

`Vv` is shown for label verification and vial concentration. It does not change `Cp` when `Vf` is explicitly the total final volume.

Implementation stores numeric input strings as entered and computes with JavaScript numbers only after strict parsing. Production calculation code must be isolated as a pure, unit-tested module. Display may use at most six significant decimal places without adding a trailing zero; the review screen must retain the substituted equation and identify when display rounding occurred. The MVP does not choose syringe-graduation or institutional rounding rules.

### Blocking validation

No actionable result is shown when:

- any required number is blank, non-numeric, infinite, zero, or negative;
- either medication unit is outside the supported `mg`/`mcg` set;
- exponential notation, comma decimals, or more than the approved precision is entered;
- the ordered dose exceeds the total medication amount available from one vial;
- the calculated administration volume exceeds the final prepared volume;
- final prepared volume is less than vial volume;
- the result overflows the numeric policy or cannot be represented safely.

Potentially unusual but mathematically valid values receive a non-blocking “verify carefully” state only if a clinically governed threshold has been approved. The MVP will not invent generic clinical limits.

## 3. Primary workflow

1. Open directly to **Mix** with vial unit `mg`, vial volume `1 mL`, and ordered-dose unit `mcg`; medication name, amount, ordered dose, and final prepared volume remain unset.
2. Enter a medication name and vial label values, or load a favourite.
3. Choose a visual final-volume card.
4. Enter the ordered dose.
5. Once inputs are complete, open **Review calculation**; the answer remains absent from the calculator.
6. Inspect the vial concentration, prepared concentration, unit conversion when required, and substituted administration equation together in one no-scroll panel; every formula is presented on one uninterrupted line and must be individually checked.
7. After all visible checks are selected, choose **Complete review** to reveal the calculated mL.
8. Confirm “I checked the order, vial unit, ordered-dose unit, and final prepared volume.”
9. Save locally or discard. Changing any critical input revokes review, hides the answer, and clears confirmation.

Loading a favourite never restores a previous ordered dose. Reviewing a history item restores its saved calculation inputs, returns to Mix, and immediately opens the calculation-review dialog. Every equation check, result-revealed state, and acknowledgement starts cleared, so a saved result cannot bypass the current review gate.

## 4. Local data design

No patient field exists.

### Favourite

```text
id                  random local identifier
name                user-entered medication display name
medicationAmount    original decimal string
vialUnit            mg | mcg
vialVolumeMl        original decimal string
createdAt           local ISO timestamp
updatedAt           local ISO timestamp
schemaVersion       integer
```

### Mix record

```text
id                  random local identifier
medicationName      optional display name
medicationAmount    original decimal string
vialUnit            mg | mcg
vialVolumeMl        original decimal string
finalVolumeMl       supported integer
orderedDose         original decimal string
orderedUnit         mg | mcg
preparedConcentrationInVialUnit computed decimal string
preparedConcentrationInOrderedUnit computed decimal string
administrationVolumeMl computed decimal string
equationVersion     fixed identifier
createdAt           local ISO timestamp
schemaVersion       integer
```

Records contain no patient, clinician, facility, order, encounter, room, or free-text note identifier. History defaults to a product-approved retention cap (proposal: 100 records or 30 days, whichever removes a record first) and supports single-record deletion and “clear all” with confirmation.

The production PWA should prefer IndexedDB for explicit migrations and transactions. The basic prototype uses `localStorage` to demonstrate the interaction. Data is neither encrypted by the web app nor recoverable after browser/site-data deletion; device encryption and managed-device policy are external controls.

## 5. Privacy and offline architecture

The production artifact is a static Svelte build with all JavaScript, fonts, icons, illustrations, and help content bundled. There is no application server.

Required controls:

- no analytics, telemetry, advertising, remote logging, cloud sync, or user account;
- no remote font, CDN, URL preview, external image, or runtime package fetch;
- restrictive CSP with `default-src 'self'`, no `connect-src` destinations, and only the minimum directives needed by the compiled app;
- the generated service worker precaches versioned app-shell assets, not user data, and retains the active release until the replacement cache installs successfully;
- update UI never destroys or migrates data without a tested, reversible migration;
- exports, sharing, clipboard copy, camera, barcode scanning, and OS notifications are out of MVP scope;
- privacy tests instrument `fetch`, XHR, WebSocket, `sendBeacon`, and browser requests and fail on use.

“Works offline” means a previously installed/loaded production release completes all supported flows after restart in airplane mode. A first visit without the app shell already present cannot work offline and must not be described otherwise.

The current prototype build implements that app-shell cache and exercises an
offline close/reopen, calculation, save, reload, and history-review path in a
dedicated service-worker-enabled browser project. Browser storage eviction,
update/rollback behaviour across two distinct releases, and the full supported
iOS/device matrix still require controlled verification before clinical use.

## 6. Safety and regulatory work products

Before clinical use, maintain:

- an intended-use statement and jurisdiction-specific regulatory classification memo;
- ISO 14971-style hazard analysis and risk-control traceability;
- IEC 62304-appropriate lifecycle and software-safety classification analysis where applicable;
- IEC 62366-1/FDA-aligned usability engineering file with critical-task analysis;
- calculation requirements, unit corpus, boundary corpus, and independent verification evidence;
- security threat model, dependency inventory/SBOM, update and vulnerability process;
- formative and summative usability protocols using representative clinicians and environments;
- release, rollback, complaint, incident, and post-market procedures as required.

Health Canada states that intended use is central to whether software is SaMD, while FDA’s January 2026 [CDS FAQ](https://www.fda.gov/medical-devices/software-medical-device-samd/clinical-decision-support-software-frequently-asked-questions-faqs) notes that routine medical calculations can still be device functions even where enforcement discretion may apply. These are planning signals, not a classification decision.

## 7. End-to-end testing strategy

This strategy intentionally combines two neighbouring project patterns:

- From [`../food/E2E_GUIDE.md`](../food/E2E_GUIDE.md): Playwright as the executable source of truth, deterministic software rendering, a unified `TestStepHelper.step()` that runs assertions then captures a numbered baseline, generated per-scenario README walkthroughs, and zero-pixel visual tolerance.
- From [`../games/jaipur/tests/e2e/helpers/test-step-helper.ts`](../games/jaipur/tests/e2e/helpers/test-step-helper.ts): metadata-backed walkthroughs, viewport overflow and unintended-control-overlap checks, mouse/caret stabilization, project-qualified screenshot names, and docs generated from only one canonical project to avoid parallel writes.
- From [`../games/jaipur/playwright.config.ts`](../games/jaipur/playwright.config.ts): explicit viewport projects; fixed locale/timezone/device scale; reduced motion; GPU/font-rendering stabilization; and no retries hiding failures.

### Harness contract

`tests/e2e/` will contain one numbered directory per user journey:

```text
tests/e2e/
  helpers/test-step-helper.ts
  fixtures.ts
  001-basic-calculation/
    001-basic-calculation.spec.ts
    README.md
    screenshots/
```

Every visible checkpoint uses the unified step helper. A step must:

1. run semantic assertions before the screenshot;
2. assert the app reports `data-status="local"`;
3. assert no element marked `data-e2e-layout` escapes its viewport;
4. assert enabled controls do not overlap;
5. hide caret, move pointer away, disable animation, and await local fonts/images;
6. compare a stable viewport checkpoint with `maxDiffPixels: 0`;
7. record the same assertions in the scenario README.

Use Chromium with software-rendering flags, `deviceScaleFactor: 1`, `locale: en-CA`, `timezoneId: America/Toronto`, a fixed clock, and deterministic identifiers. The core matrix is 393×852 phone, 852×393 phone landscape, 820×1180 tablet, and 1280×1000 desktop. Phone runs all journeys; the full viewport matrix runs responsive/accessibility and the critical basic-calculation journey.

Tests run in isolated browser contexts that begin with fresh storage. They run four workers after proving there is no cross-test state. Retries remain zero. Arbitrary sleeps are forbidden: tests wait on semantic UI state. Snapshot updates are a deliberate, reviewable command and generated images are committed.

### Privacy and offline enforcement

Before navigation, install browser hooks that throw on `fetch`, XMLHttpRequest, WebSocket, EventSource, and `navigator.sendBeacon`. Playwright also listens to every request and allows only the loopback document and same-origin static assets. Any third-party or write request fails the test.

Default visual tests block service workers for determinism. A separate serial offline project allows the production service worker and tests this sequence: load online from loopback, wait for the explicit cache-ready state, close the context, set offline, relaunch, calculate, save, reload, and review history. It also verifies a pending app update does not corrupt local records.

### Required scenarios

| ID | Journey | Essential assertions |
| --- | --- | --- |
| 001 | Basic 10 mg / 50 mL / 2000 mcg | requested unit/volume defaults; prepared concentration `0.2 mg/mL = 200 mcg/mL`; all equations visible and individually checked; result `10 mL` only after completed review |
| 002 | Every supported container | exact choices `10, 50, 100, 250, 500, 1000`; correct image, selected state, and calculation |
| 003 | Blocking validation | blank, zero, negative, malformed, excessive dose, final volume below vial volume, and unsafe-number cases expose no actionable result |
| 004 | Unit conversion | vial and order units are independent; `2 mg` equals `2000 mcg`; mg↔mcg conversion is visible; only mg and mcg are offered or restored; switching either unit preserves entered numbers but resets review/confirmation |
| 005 | Favourite lifecycle | save, reload, edit, delete; loading clears dose and confirmation; persists after reload |
| 006 | History lifecycle | save only after acknowledgement; chronological review; delete one; confirmed clear all; no patient fields |
| 007 | Privacy | zero unexpected requests across mix, favourite, history, reload, error, and clear flows |
| 008 | Offline installed use | app and local records work after browser restart while offline |
| 009 | Responsive and accessible | no overflow/overlap; 200% zoom; keyboard path; focus visible; names/roles/values; reduced motion |
| 010 | Recovery and migration | malformed local record is quarantined without changing a calculation; supported schema migration preserves values |

### Minimum deterministic calculation corpus

| Vial | Final volume | Ordered dose | Expected prepared concentration | Expected mL |
| --- | ---: | ---: | ---: | ---: |
| 10 mg in 1 mL | 10 mL | 2000 mcg | 1 mg/mL = 1000 mcg/mL | 2 mL |
| 10 mg in 1 mL | 50 mL | 2000 mcg | 0.2 mg/mL = 200 mcg/mL | 10 mL |
| 10 mg in 1 mL | 100 mL | 2000 mcg | 0.1 mg/mL = 100 mcg/mL | 20 mL |
| 10 mg in 1 mL | 250 mL | 2000 mcg | 0.04 mg/mL = 40 mcg/mL | 50 mL |
| 10 mg in 1 mL | 500 mL | 2000 mcg | 0.02 mg/mL = 20 mcg/mL | 100 mL |
| 10 mg in 1 mL | 1000 mL | 2000 mcg | 0.01 mg/mL = 10 mcg/mL | 200 mL |
| 500 mcg in 1 mL | 50 mL | 125 mcg | 10 mcg/mL | 12.5 mL |
| 0.5 mg in 1 mL | 50 mL | 125 mcg | 0.01 mg/mL = 10 mcg/mL | 12.5 mL |

The calculation module also needs property tests: for valid positive inputs, `Va × Cpd = D` within the defined decimal tolerance; doubling `D` doubles `Va`; equivalent doses expressed in mg and mcg produce the same `Va`; changing `Vv` alone does not change `Va` when `Vf` remains an explicit final volume.

## 8. Definition of done for MVP

- All functional and E2E scenarios pass with reviewed zero-diff screenshots.
- A second qualified person independently verifies the calculation requirements and corpus.
- No production request leaves the app origin, including during failure paths.
- The installed production build passes the offline restart scenario.
- Storage migration, retention, deletion, and corruption recovery are tested.
- WCAG 2.2 AA automated checks pass and representative clinicians complete critical tasks in usability validation.
- Hazard controls are traced to requirements and verification evidence.
- Regulatory, privacy, security, and clinical owners approve the intended use and release.
