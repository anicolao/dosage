# Dosage: local medication dilution SPA

## Preview

This is an actual Playwright capture of the phone calculation review—not a design rendering.

**Live PR preview:** https://anicolao.github.io/dosage/pr1/

![Dosage calculation review](https://github.com/anicolao/dosage/raw/refs/heads/agent/initial-dosage-spa/docs/pr-preview.png)

![No-scroll simultaneous KaTeX review](https://github.com/anicolao/dosage/raw/refs/heads/agent/initial-dosage-spa/tests/e2e/001-cross-unit-calculation/screenshots/001-simultaneous-calculation-review-phone.png)

![Regenerated flexible IV bags](https://github.com/anicolao/dosage/raw/refs/heads/agent/initial-dosage-spa/tests/e2e/002-containers-and-validation/screenshots/000-all-supported-containers-phone.png)

![Filled favourite star on the main screen](https://github.com/anicolao/dosage/raw/refs/heads/agent/initial-dosage-spa/tests/e2e/003-local-records/screenshots/000-favourite-saved-phone.png)

![Six-record favourites page](https://github.com/anicolao/dosage/raw/refs/heads/agent/initial-dosage-spa/tests/e2e/003-local-records/screenshots/003-full-favourites-page-phone.png)

## What changed

- Added a phone-first Svelte SPA for one-vial dilution arithmetic.
- Kept favourites, calculation history, and all user-created data in local browser storage.
- Separated vial and ordered-dose units with visible mg↔mcg dimensional conversion.
- Blocked conversion between mass and activity units.
- Rendered vial concentration, prepared concentration, conversion factor, and administration volume with locally bundled KaTeX and accessible MathML.
- Added generated container illustrations, product documentation, safety boundaries, and UX mockups.
- Regenerated the IV icon family from the supplied bag reference: every bag now has flexible seams, a concave top, and twin ports, while the 500 mL silhouette is measurably wider than the other bags.
- Removed the baked-in syringe tile background and validated transparent alpha at all four image corners.
- Added a main-screen favourite toggle whose star fills gold, changes label, and exposes `aria-pressed="true"` whenever the current vial facts are saved.
- Expanded favourites to six compact records per page, with paging controls shown only when a seventh record exists.
- Added deterministic Playwright coverage with zero-pixel screenshot comparisons.
- Reworked the calculator into a fixed-height, no-scroll phone layout with explicit mg/1 mL/mcg defaults, paged saved records, and a simultaneous KaTeX review panel whose single-line formulas must each be checked before the answer is revealed.
- Added PR-gated E2E and GitHub Pages preview deployment under `/pr<PR number>/`.
- Licensed the public project under GNU GPL v3.0.

## E2E coverage

- mg vial → mcg order and reverse mcg vial → mg order;
- equivalent-dose invariants and detailed KaTeX equations;
- all 10/50/100/250/500/1000 mL containers;
- transparent syringe corners with no rectangular image background;
- pixel-level verification that the 500 mL IV-bag silhouette is wider than every other bag icon;
- excessive-dose and impossible-final-volume blocking;
- non-convertible activity-unit handling;
- favourite and history persistence/deletion, including the filled-star main-screen state, six-record favourite pages, and seven-record pagination;
- acknowledgement requirements and no dose carry-forward;
- explicit mg/1 mL/mcg defaults, no final-volume default, value-preserving unit changes, and answer gating until every review step is checked;
- same-origin GET-only operation with no runtime fetch/XHR/beacon;
- corrupt-storage recovery without losing calculation capability;
- WCAG A/AA automated analysis, MathML, labels, focus, 44 px targets, 320 px reflow, phone and desktop visual baselines.
- zero document/dialog overflow at 393×852, 320×852, and desktop viewports.

Each scenario includes a generated README and committed screenshots under [`tests/e2e`](https://github.com/anicolao/dosage/tree/agent/initial-dosage-spa/tests/e2e).

## Validation

```text
npm run check       # 0 errors, 0 warnings
npm run build       # production build succeeds
npm run check:base  # deployment assets stay under the configured Pages path
npm run test:e2e    # 6/6 Playwright projects pass
```

## Safety status

This remains an unvalidated prototype and is visibly labelled **not for patient care**. Clinical, human-factors, security, privacy, and regulatory release gates are documented but not claimed as complete.
