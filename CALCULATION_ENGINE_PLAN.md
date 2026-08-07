# Calculation engine implementation and formal-verification plan

Status: draft for review; intentionally not part of the version-labelling PR
Repository baseline: `552fa82` (`package.json` version `0.1.0`)
Decision owner: legal manufacturer
Technical owners: software lead and independent calculation verifier
Clinical approver: pharmacy lead

## 1. Objective

Replace the arithmetic and validation currently embedded in `src/App.svelte`
with a small, typed, pure and independently verifiable calculation engine. The
engine must implement the approved numeric specification, return structured
results rather than UI-ready guesses, and prevent the known cases where
JavaScript number parsing, overflow or formatting can turn a valid positive
quantity into an actionable `0 mL` result.

Formal methods will be applied to the bounded calculation domain, not to the
entire Svelte application. Lean is the proposed first tool for an executable
reference specification and machine-checked proofs. Rocq extraction remains a
separate, gated option if the project later decides that the deployed browser
calculation must be generated from the proved definition.

This plan supplements, and does not replace:

- pharmacy approval of formulas, limits and rounding policy;
- independent test-oracle review;
- unit, property, integration and browser testing;
- human-factors and clinical validation;
- security, accessibility, persistence and deployment verification; and
- the controlled records and gates in `AUTHORIZATION_PLAN.md`.

## 2. Current baseline and motivating defects

The current component:

- parses medication amount, vial volume and ordered dose with `Number(...)`;
- uses IEEE-754 arithmetic for conversion and concentration intermediates;
- checks the direct inputs for positivity and finiteness but not every
  intermediate or final value;
- formats results with at most six decimal places; and
- uses formatted values in the equations that the user is asked to review.

The repository review reproduced at least two critical failures:

1. A positive `0.0000001 mL` result is displayed and reviewed as `0 mL`.
2. A large input can overflow during a multiply-by-1000 intermediate and then
   produce a displayed `0 mL`, even where the algebraically simplified result
   would be representable.

The calculation engine must close these defects by construction and retain
explicit regression tests for them.

## 3. Scope

### 3.1 In scope

- Strict decimal-string grammar and preservation of original input text.
- Input precision and magnitude bounds.
- Exact representation of permitted decimal quantities.
- A closed unit model containing only `mg` and `mcg`.
- Exact `mg`/`mcg` scale conversion.
- Vial concentration, prepared concentration and administration volume.
- Final-prepared-volume and one-vial constraints.
- Detection of invalid, incomplete, unsupported and out-of-policy results.
- Clinically approved display rounding and disclosure.
- Structured equation inputs derived from the same calculation result.
- Pure unit and property tests.
- An executable formal reference model and defined proof obligations.
- Differential conformance testing between the formal reference and the
  deployed TypeScript engine.

### 3.2 Out of scope

- Recommending, prescribing, checking or adjusting an ordered dose.
- Multi-vial preparation support. Inputs requiring more than one vial are
  rejected and labelled as unsupported.
- Drug-specific compatibility, stability, overfill, dead-space or displacement
  recommendations.
- Patient data, body-weight dosing, infusion-rate calculations or device-signal
  input.
- Formal proof of Svelte, the DOM, CSS, browsers, local storage, deployment,
  accessibility or clinical suitability.

## 4. Required decisions before implementation

G2 in `AUTHORIZATION_PLAN.md` must approve the following before the engine API
is frozen:

1. Accepted unsigned decimal grammar, including the treatment of leading and
   trailing zeros.
2. Maximum total digits, decimal places and magnitude for every input.
3. Minimum and maximum permissible administration volume.
4. Internal exact-decimal representation and maximum intermediate size.
5. Approved final prepared volumes and whether they remain a closed allowlist.
6. Exact rounding mode, displayed precision, trailing-zero policy and wording
   used when rounding occurs.
7. Whether a result below the measurable/display threshold is blocked or shown
   using an approved less-than expression.
8. Treatment of drug displacement, container overfill and dead space.
9. Error priority where more than one rule fails.
10. Whether equivalent textual edits invalidate an existing review.

These decisions belong in `CALC-001_NUMERIC_SPECIFICATION.md`. The code and
formal model must cite numbered requirements from that controlled record; this
draft does not silently decide clinical policy.

## 5. Proposed domain architecture

```text
raw form strings
      │
      ▼
decimal-input.ts ── grammar, bounds, exact decimal value
      │
      ▼
units.ts ───────── dimensions and exact scale ratios
      │
      ▼
calculation.ts ─── formula, constraints, structured result
      │
      ├──────────── equation model
      │
      ▼
format.ts ───────── approved rounding and disclosure
      │
      ▼
Svelte presentation and review state
```

Recommended files:

```text
src/lib/domain/decimal-input.ts
src/lib/domain/units.ts
src/lib/domain/calculation.ts
src/lib/domain/format.ts
src/lib/domain/result.ts
src/lib/domain/*.test.ts
formal/lean/Dosage/Decimal.lean
formal/lean/Dosage/Units.lean
formal/lean/Dosage/Calculation.lean
formal/lean/Dosage/Rounding.lean
formal/lean/Dosage/Properties.lean
formal/lean/Dosage/ReferenceCli.lean
formal/lean/lakefile.toml
formal/lean/lean-toolchain
tests/formal-conformance/generated-vectors.json
tests/formal-conformance/conformance.test.ts
```

The UI must receive a discriminated result. A proposed shape is:

```ts
type CalculationState =
  | { kind: 'incomplete'; missing: Field[] }
  | { kind: 'blocked'; errors: CalculationError[] }
  | { kind: 'valid'; calculation: ExactCalculation; display: DisplayModel };
```

Formatted text must never be used to infer validity. Stored derived numbers
must never become the authoritative source for a reopened calculation.

## 6. Numeric model

### 6.1 Representation

Use a bounded exact-decimal or fixed-point representation approved under G2.
One suitable model is an integer mantissa plus a non-negative decimal scale,
normalized without converting through JavaScript `Number`:

```text
value = mantissa / 10^scale
```

The TypeScript implementation may use bounded `bigint` internally if its
browser support, serialization boundary and explicit magnitude checks are
approved. An evaluated decimal library is another option. No implementation
may rely on unconstrained IEEE-754 behaviour as its correctness argument.

The formal specification should use natural/integer arithmetic and rational
relationships. It must separately prove that approved input bounds keep the
chosen deployed representation within its implementation limits.

### 6.2 Units

Define units as a closed type rather than arbitrary strings:

```text
Unit = Mg | Mcg
massScale(Mg) = 1000 mcg
massScale(Mcg) = 1 mcg
```

Activity units and every other unknown unit are invalid and must be rejected
before calculation. Unknown values must never become compatible because they
both map to a null or missing value.

### 6.3 Formula

For compatible units, define the available amount in the ordered unit as:

```text
available = vialAmount × scale(vialUnit) / scale(orderedUnit)
```

Define administration volume using an exact rational form selected to avoid
avoidable overflow:

```text
administrationVolume =
  orderedDose × finalPreparedVolume × scale(orderedUnit)
  / (vialAmount × scale(vialUnit))
```

Vial volume is used to report vial concentration and to enforce that final
prepared volume is not below the entered vial volume. When final prepared
volume is fixed, vial volume does not alter the administration-volume formula.

All divisions require a proved non-zero denominator. Rounding occurs only in
the display layer after the exact result and policy bounds are known.

## 7. Formal-verification strategy

### 7.1 Phase A — Lean reference specification

Lean is initially a development and verification dependency, not a browser
runtime dependency. Implement the same closed input types, parser, formula,
validation decisions and display policy as executable Lean definitions.

The Lean project must:

- compile with a pinned toolchain;
- avoid unreviewed axioms in the calculation proofs;
- expose the axioms used by the proof environment in CI;
- build an executable command-line oracle that accepts and emits a versioned,
  canonical data format;
- generate or verify the controlled conformance corpus; and
- fail CI when any theorem, reference vector or interface contract changes
  without an approved update.

The first proof obligations are:

1. Parser soundness: every accepted string denotes one permitted positive
   decimal within the approved bounds.
2. Parser rejection: forbidden exponent, sign, whitespace, comma and malformed
   forms cannot produce a calculation value.
3. Closed-unit safety: only `mg` and `mcg` can enter a calculation; activity
   and unknown units are rejected.
4. Denominator safety: a valid calculation never divides by zero.
5. Positivity: a valid administration volume is strictly positive.
6. Display safety: a valid positive result cannot be displayed as zero.
7. Conversion invariance: equivalent mg and mcg quantities yield equal exact
   administration volumes.
8. Dose proportionality within the admitted domain.
9. One-vial equivalence: the ordered-dose ceiling is equivalent to
   administration volume not exceeding final prepared volume.
10. Vial-volume independence when the final prepared volume is fixed.
11. Boundedness: admitted inputs and approved operations cannot exceed the
    selected deployed numeric representation.
12. Determinism: identical validated inputs produce identical structured
    results and display decisions.

Proofs establish conformance to the formal specification. They do not establish
that the specification is clinically correct; pharmacy approval and independent
calculation review remain required.

### 7.2 TypeScript conformance boundary

The initial production engine remains TypeScript. Therefore, Lean proofs alone
do not prove the TypeScript implementation. Close as much of that gap as
practical by:

- generating approved vectors and boundary cases from the Lean model;
- comparing TypeScript and Lean canonical results in CI;
- using property tests with retained seeds and minimized counterexamples;
- testing every G2 boundary immediately below, at and above the limit;
- retaining exact regressions for every calculation anomaly; and
- independently reviewing both implementations for unwanted shared
  assumptions.

The conformance format must contain original input strings, parsed canonical
values, units, exact rational output, decision/error codes, display output and
rounding disclosure. It must have its own schema version.

### 7.3 Phase B decision — Rocq extraction

Do not add Rocq to the production path during Phase A. After the Lean/TypeScript
engine is complete, record a decision on whether implementation divergence is
still an unacceptable residual risk.

If extraction is approved, run a time-boxed Rocq spike that:

1. expresses the same approved specification and core proofs;
2. extracts only the pure kernel to OCaml;
3. compiles that kernel to JavaScript or WebAssembly;
4. defines a narrow, typed and versioned TypeScript boundary;
5. measures bundle size, startup behaviour, browser compatibility and failure
   handling; and
6. documents the trusted chain from Rocq through extraction, OCaml compilation,
   JavaScript/WebAssembly compilation, Vite and the browser.

Adopt extraction only if the safety benefit exceeds the added build,
cybersecurity, support and lifecycle burden. The Svelte UI, parsing boundary and
display integration still require conventional verification.

## 8. Dependency and toolchain policy

All required installed dependencies must be reproducible from repository
configuration. No gate may depend on an undocumented global npm package, an
ad-hoc `opam` switch, a developer's unmanaged `elan` installation, or a
manually downloaded binary.

Use the following ownership rule:

| Dependency type | Provisioning source | Lock/control record |
| --- | --- | --- |
| Svelte/Vite application libraries | `package.json` | `package-lock.json` |
| TypeScript, Vitest, fast-check and JS reporting tools | `devDependencies` in `package.json` | `package-lock.json` |
| Any approved JavaScript decimal library | `dependencies` in `package.json` | `package-lock.json`, SBOM and library evaluation |
| Node.js, Git and other command-line/system tools | Nix development/build definition | pinned `flake.lock` or equivalent Nix input lock |
| Lean compiler and Lake executable | Nix development/build definition | pinned Nix input plus committed `lean-toolchain` |
| Lean source libraries, if any | committed Lake configuration | `lake-manifest.json` with reviewed revisions |
| Rocq, OCaml, Dune and JS/Wasm extraction tools, only if Phase B is approved | Nix development/build definition | pinned Nix inputs; no unmanaged `opam` environment |
| Playwright JS API | `devDependencies` in `package.json` | `package-lock.json` |
| Browser/system libraries needed by controlled tests | Nix or the documented CI image | pinned Nix inputs or immutable CI runner record |

Practical rules:

- JavaScript packages are added with exact review of `package.json` and the
  resulting lockfile; CI continues to use `npm ci`.
- Non-JavaScript executables and native libraries are exposed through Nix.
- The Nix shell and CI must report the same controlled major tool versions.
- If a tool cannot be represented in Nix, stop and approve an equivalent
  reproducible provisioning method before using it; do not silently install it
  globally.
- Toolchain additions require licence review, SBOM inclusion, vulnerability
  monitoring and documented update procedures.
- The formal model should start without a large library dependency where
  practical. Adding Mathlib or another proof library requires a specific
  benefit, pinned revision and review of the larger maintenance surface.

The authorization branch now contains `flake.nix`/`flake.lock`, a Lean 4.30.0
Lake project, executable reference model, proof modules, canonical vectors and
`npm run test:formal`. They were added by explicit product-owner direction and
run in an isolated Nix check and CI job. This technical implementation does not
approve DEV-001 or CALC-001, close G2/CE5, or establish TypeScript conformance.
Clinical bounds/rounding, independent formal review and the pure TypeScript
engine/differential suite remain open.

## 9. Implementation sequence and gates

### CE0 — Freeze requirements and tooling

- Approve `CALC-001_NUMERIC_SPECIFICATION.md`.
- Approve `DEV-001_TOOLING_DECISION.md`.
- Assign requirement and hazard identifiers.
- Select exact-decimal representation and test tools.
- Approve the Nix/package dependency split above.

Exit: pharmacy, quality, software and independent-verifier signatures.

### CE1 — Establish the TypeScript domain boundary

- Add TypeScript configuration and pure domain modules.
- Add discriminated result and closed unit types.
- Add deterministic Vitest and fast-check commands.
- Keep the existing UI behaviour behind the new boundary only where it is
  already safe; critical defects must not be preserved for compatibility.

Exit: modules compile and the initial approved corpus runs without the DOM.

### CE2 — Implement strict parsing and exact arithmetic

- Preserve input strings.
- Implement grammar and policy bounds before numeric conversion.
- Implement exact unit conversion and formula.
- Validate every intermediate and final policy condition.
- Implement structured error codes with approved priority.

Exit: golden, adversarial, boundary and property suites pass.

### CE3 — Implement display policy

- Separate exact values from displayed strings.
- Implement approved rounding and trailing-zero rules.
- Block or specially represent below-display-threshold results.
- Produce equation operands from the same validated result.

Exit: no admitted positive value can render as zero; every rounding decision is
traceable and tested.

### CE4 — Integrate the UI and storage

- Replace reactive arithmetic in `App.svelte` with the pure engine.
- Reset review state on every approved critical transition.
- Validate persisted records and recompute derived values.
- Keep unsupported units and workflows blocked.

Exit: unit, integration, storage and browser tests pass with no bypass of the
review gate.

### CE5 — Add the Lean reference and proofs

**Implementation status:** Technically implemented for the specification-
independent core on the authorization branch. Regulatory/quality approval,
clinical parameterization, independent review and TypeScript differential
conformance remain open, so the CE5 exit is not achieved.

- Add the Nix-provided Lean/Lake toolchain and pinned project configuration.
- Implement executable definitions and proof obligations.
- Generate the controlled conformance corpus.
- Add proof and differential-conformance jobs to CI.

Exit: all theorems check, the independent verifier approves the specification,
and TypeScript agrees with the reference corpus.

### CE6 — Independent verification and release evidence

- Execute all controlled verification commands from a clean checkout.
- Record tool versions, dependency locks, seeds, proof environment, results and
  anomalies.
- Map every requirement, risk control, theorem and test into the traceability
  matrix.
- Review residual risks and every unresolved anomaly.

Exit: G3/G7 records are approved as applicable. Passing formal proofs alone do
not authorize clinical release.

## 10. Required test corpus

At minimum include:

- every case in the existing design and E2E suite;
- `1e3`, `1E3`, signs, commas, whitespace, empty strings, multiple decimal
  points and excess digits;
- zero, smallest permitted positive value, maximum permitted value and the
  immediate values on either side of every boundary;
- the reproduced `0.0000001 mL` positive-to-zero case;
- the reproduced large-value conversion-overflow case;
- equivalent mg/mcg quantities in both directions;
- same-unit mass calculations;
- every activity and unknown unit rejection case;
- final prepared volume below, equal to and above vial volume;
- dose below, equal to and above available vial contents;
- exact and inexact display-rounding boundaries;
- results below, equal to and above the measurable/display threshold; and
- persisted records with inconsistent, missing, unknown or future-version
  fields.

Expected values must be independently calculated and approved. Generating many
cases from the implementation under test is not an independent oracle.

## 11. Change control

After the engine is approved, any change to the following reopens the affected
requirements, proofs and tests:

- input grammar or numeric bounds;
- unit set, dimension or scale;
- formula or order of operations;
- allowed final volumes;
- rounding or display policy;
- error priority;
- exact-decimal implementation or library;
- formal toolchain, axioms, extraction or compiler path;
- conformance schema; or
- browser/runtime support matrix.

The visible application version and Git revision identify the build under test,
but version labelling is not a substitute for controlled release records and
artifact hashes.

## 12. Completion criteria

The calculation-engine work is complete only when:

1. Every numeric requirement and related hazard has implementation and
   verification evidence.
2. Strict parsing and exact arithmetic replace the current `Number` path.
3. No accepted positive calculation can display or be reviewed as zero.
4. All approved examples, boundaries, properties and regressions pass.
5. The Lean reference proofs and conformance suite pass from the pinned
   environment, or a signed decision explains why formal work was stopped.
6. The independent calculation verifier approves the specification, oracle,
   implementation and results.
7. Toolchains and installed dependencies are reproducible through Nix or
   `package.json`/lockfiles as appropriate.
8. The traceability matrix and verification report contain the exact tested
   version, Git revision, dependency locks, proof-tool versions and anomaly
   disposition.
