# Dosage Lean reference model

This directory contains the executable Phase A formal reference for the
calculation kernel proposed in `CALCULATION_ENGINE_PLAN.md`. It is verification
evidence for review, not evidence that the clinical specification, deployed
TypeScript application, user interface, or product is approved.

## Reproducible commands

From the repository root:

```text
nix develop
cd formal/lean
lake build
lake exe dosage-reference vectors
```

Or run the isolated derivation:

```text
nix flake check --print-build-logs
```

The flake lock and explicit assertion select Lean 4.30.0. `lean-toolchain`
records the corresponding upstream toolchain identity for Lean-aware editors;
the build and CI executable come from Nix rather than an unmanaged `elan`
installation. The Lake manifest currently has no third-party Lean packages.

## Modules and checked boundary

| Module | Executable definition/proof boundary |
| --- | --- |
| `Dosage.Decimal` | ASCII-only proposed decimal grammar; exact coefficient/scale scan; parameterized positive magnitude/scale/digit admission; representative forbidden-form proofs. |
| `Dosage.Units` | Closed `mg`/`mcg` type, exact microgram factors, and rejection of activity/unknown/mixed-case/empty units. |
| `Dosage.Calculation` | Exact positive ratio, final-volume and one-vial decisions, denominator/positivity proofs, formula identity, mg/mcg invariance, dose proportionality, one-vial equivalence, vial-volume independence, and determinism. |
| `Dosage.Rounding` | A reference-display type that cannot contain numeric zero; it deliberately does not choose the still-unapproved clinical rounding policy. |
| `Dosage.Properties` | Machine-checked examples, including the `0.0000001 mL` regression, and visible `#print axioms` output for the named theorems. |
| `Dosage.ReferenceCli` | Versioned canonical exact-ratio seed vectors for later differential conformance. |

There are no `sorry`/`admit` declarations or user-defined axioms. The build
rejects any such source and prints the axiom dependencies of the reviewed
theorems. Some proofs created using Lean's
standard simplifier/extensional equality report `propext`, `Quot.sound`, and
`Classical.choice`; several arithmetic/safety theorems report no axioms. These
are part of the declared Lean proof boundary and require independent review.

## What this proves

For the executable model and its positive admitted-input types:

- admitted decimal values carry grammar, positivity, magnitude, scale, and
  digit-bound evidence supplied by an explicit bounds record;
- only `mg` and `mcg` can inhabit the medication-unit input type;
- the administration-volume denominator and numerator are positive;
- equivalent mg/mcg representations yield equivalent exact ratios;
- scaling an ordered dose scales the exact result proportionally;
- the one-vial ceiling is equivalent to administration volume not exceeding
  final prepared volume;
- changing vial volume alone cannot change the administration-volume formula;
- the exact calculation satisfies its cross-multiplied formula identity; and
- a positive exact ratio cannot produce numeric zero through the formal
  reference-display type.

The executable examples independently reduce the quarter-vial same-unit and
cross-unit cases to `25/1`, the one-vial boundary to `100/1`, and the known tiny
positive result to `1/10000000`.

## What remains unproved

CALC-001 still leaves clinical minimum/maximum values, digit/scale limits,
measurable output, rounding mode, display precision, trailing-zero policy, and
below-threshold wording open. The model therefore makes admission bounds
explicit parameters and does not invent a clinical rounding algorithm.

The proofs do not establish that:

- the proposed formulas or bounds are clinically appropriate;
- the current Svelte/JavaScript calculation conforms to this model;
- browser integer limits, storage, review state, rendering, accessibility, or
  service-worker behavior conform;
- the generated vectors form the independently approved clinical corpus; or
- passing Lean establishes Health Canada classification, authorization, or
  suitability for patient care.

Those gaps remain controlled work in G2, G3, G5, G7, VVP-001, and the remaining
work register. TypeScript/Lean differential testing becomes meaningful only
after the pure TypeScript calculation engine exists.
