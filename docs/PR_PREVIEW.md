# Dosage: local medication dilution SPA

## Preview

This is an actual Playwright capture of the phone calculation review—not a design rendering.

![Dosage calculation review](https://github.com/anicolao/dosage/raw/refs/heads/agent/initial-dosage-spa/docs/pr-preview.png)

## What changed

- Added a phone-first Svelte SPA for one-vial dilution arithmetic.
- Kept favourites, calculation history, and all user-created data in local browser storage.
- Separated vial and ordered-dose units with visible mg↔mcg dimensional conversion.
- Blocked conversion between mass and activity units.
- Rendered vial concentration, prepared concentration, conversion factor, and administration volume with locally bundled KaTeX and accessible MathML.
- Added generated container illustrations, product documentation, safety boundaries, and UX mockups.
- Added deterministic Playwright coverage with zero-pixel screenshot comparisons.

## E2E coverage

- mg vial → mcg order and reverse mcg vial → mg order;
- equivalent-dose invariants and detailed KaTeX equations;
- all 10/50/100/250/500/1000 mL containers;
- excessive-dose and impossible-final-volume blocking;
- non-convertible activity-unit handling;
- favourite and history persistence/deletion;
- acknowledgement requirements and no dose carry-forward;
- same-origin GET-only operation with no runtime fetch/XHR/beacon;
- corrupt-storage recovery without losing calculation capability;
- WCAG A/AA automated analysis, MathML, labels, focus, 44 px targets, 320 px reflow, phone and desktop visual baselines.

Each scenario includes a generated README and committed screenshots under [`tests/e2e`](../tests/e2e).

## Validation

```text
npm run check       # 0 errors, 0 warnings
npm run build       # production build succeeds
npm run test:e2e    # 6/6 Playwright projects pass
```

## Safety status

This remains an unvalidated prototype and is visibly labelled **not for patient care**. Clinical, human-factors, security, privacy, and regulatory release gates are documented but not claimed as complete.
