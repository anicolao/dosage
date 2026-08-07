# CALC-001 — Numeric specification

| Field | Value |
| --- | --- |
| Record ID | CALC-001 |
| Status | **Draft — unapproved; G1 and G2 remain open** |
| Owner | Clinical pharmacy / medication-safety lead (unassigned) |
| Technical owner | Software lead (unassigned) |
| Required approvers | Clinical pharmacy, software, independent calculation verifier, quality |
| Related records | REG-001, REG-002, SYS-001, RMF-001, VVP-001, DEV-001, TRC-001 |
| Target | `0.2.0-classification` reference product |
| Draft version/date | 0.1 / 2026-08-07 |

This record proposes the numerical contract for the bounded one-vial `mg`/`mcg`
reference product. It is not an approved clinical specification, does not
authorize implementation, and is not evidence that the prototype conforms.
Every item marked **Open** blocks G2. Passing tests against this draft would not
make the underlying clinical choices approved.

## 1. Scope and governing safety principles

The calculation accepts manually transcribed values from an already-authorized
medication order and vial label. It performs arithmetic only. It does not
select, validate or modify a dose and does not model a drug, route, patient,
infusion rate, compatibility, stability, overfill, displacement, dead space or
preparation protocol.

The numerical design shall follow these proposed principles:

1. Original input text is retained; no value is first interpreted by
   JavaScript `Number`, an HTML number control, or locale-dependent parsing.
2. Syntax, precision and magnitude are checked before conversion into an exact
   bounded representation.
3. Units are a closed type containing only `mg` and `mcg`.
4. Every denominator, intermediate result and final result is validated.
5. Exact calculation and display formatting are separate operations.
6. The substituted equation and revealed result are two views of the same
   validated calculation object.
7. A positive exact result can never be displayed or reviewed as zero. If it
   cannot be represented safely under the approved display policy, the
   calculation is blocked and no actionable mL value is exposed.
8. Unsupported multi-vial use is rejected or otherwise prevented; it is not a
   capability of this product.

These principles refine SYS-001 requirements INP-002–INP-005 and
CAL-001–CAL-009 and are preliminary controls for TRC-001 hazards HZ-001,
HZ-002, HZ-004, HZ-005, HZ-007 and HZ-011.

## 2. Approval decisions

| Decision ID | Topic | Proposed disposition | Status and required approver |
| --- | --- | --- | --- |
| DEC-NUM-001 | Decimal grammar | Use the grammar and semantic rules in section 3 | **Open** — pharmacy, software and quality |
| DEC-NUM-002 | Input precision and magnitude | Define field-specific digit, scale, minimum and maximum limits before implementation | **Open / values TBD** — pharmacy and independent verifier |
| DEC-NUM-003 | Output/measurable range | Define minimum non-zero displayable/measurable mL and maximum permitted mL | **Open / values TBD** — pharmacy, nursing/human factors and quality |
| DEC-NUM-004 | Exact representation | Use bounded decimal inputs and normalized rational calculation values backed by checked integers; proposed details in section 4 | **Open** — software, independent verifier and quality |
| DEC-NUM-005 | Unit set and ratio | Admit only `mg` and `mcg`; exactly `1 mg = 1000 mcg` | **Open** — pharmacy |
| DEC-NUM-006 | Final prepared volumes | Retain the closed set `10, 50, 100, 250, 500, 1000 mL` | **Open** — pharmacy and nursing/human factors |
| DEC-NUM-007 | Rounding and display | Approve mode, precision/significant digits, trailing-zero policy, threshold and disclosure wording | **Open / policy TBD** — pharmacy, nursing/human factors and independent verifier |
| DEC-NUM-008 | Below-threshold result | Block, or use a clinically approved non-zero less-than expression; never show zero | **Open** — pharmacy and nursing/human factors |
| DEC-NUM-009 | Error ordering | Return all applicable structured errors in the stable order proposed in section 8 | **Open** — pharmacy, software and human factors |
| DEC-NUM-010 | Container concepts | Treat selected final prepared volume as total final volume; exclude overfill, displacement and dead-space modelling | **Open** — pharmacy |
| DEC-NUM-011 | Multi-vial behavior | Reject an ordered dose above one vial's available amount; label all multi-vial preparation as unsupported | **Open** — pharmacy and human factors |
| DEC-NUM-012 | Equivalent text edits | Any edit to a critical raw input revokes review, including numerically equivalent text | **Recommended; open** — pharmacy, human factors and quality |

No boundary placeholder may be replaced by an implementation default. The
named owners must approve the actual value and its clinical rationale.

## 3. Decimal input contract

### 3.1 Proposed lexical grammar

The proposed grammar is:

```text
^(?:0|[1-9][0-9]*)(?:\.[0-9]+)?$
```

It denotes an unsigned, base-10, non-exponent decimal with a required leading
digit and at least one digit after a decimal point. It permits trailing
fractional zeros while rejecting unnecessary integer leading zeros. Raw text
must be preserved for review and change detection; a separate canonical exact
value may remove trailing fractional zeros.

| Input example | Lexical decision | Rationale |
| --- | --- | --- |
| `0`, `0.0`, `1`, `1.25`, `1000.000` | Grammar accepts | Positivity and approved bounds are separate semantic checks |
| `.5` | Reject | Required leading digit; user must enter `0.5` |
| `01`, `00.5` | Reject | Unnecessary integer leading zero |
| `1.`, `1..0` | Reject | Missing or multiple fractional portions |
| `1e3`, `1E3` | Reject | Exponent notation is outside the controlled grammar |
| `+1`, `-1` | Reject | Signs are outside the unsigned grammar |
| ` 1`, `1 `, blank | Reject/incomplete | No implicit trimming or whitespace interpretation |
| `1,5`, `1,000` | Reject | No locale decimal or grouping separators |
| `NaN`, `Infinity`, `∞` | Reject | Not decimal values |

Blank is an `incomplete` state while editing, not a numeric zero. Copy/paste
uses the same grammar as typed input and performs no silent cleanup.

### 3.2 Proposed semantic checks

After lexical acceptance, the engine shall:

1. count total digits and fractional digits without numeric conversion;
2. apply the approved field-specific limits;
3. convert the string into the exact representation;
4. reject exact zero for vial amount, vial volume and ordered dose;
5. apply the approved minimum positive and maximum magnitude; and
6. retain both raw text and canonical exact value.

| Field | Unit/domain | Minimum positive | Maximum | Total digits | Decimal places |
| --- | --- | --- | --- | --- | --- |
| Vial amount (`A`) | `mg` or `mcg` | **TBD** | **TBD** | **TBD** | **TBD** |
| Vial volume (`Vv`) | mL | **TBD** | **TBD** | **TBD** | **TBD** |
| Ordered dose (`D`) | `mg` or `mcg` | **TBD** | **TBD** | **TBD** | **TBD** |
| Administration volume (`Va`) | mL exact result | greater than zero; clinical minimum **TBD** | **TBD** | Derived bound **TBD** | Display policy **TBD** |

The selected final prepared volume (`Vf`) is not free-form: it is proposed to
be exactly one member of `{10, 50, 100, 250, 500, 1000}` mL. All limits above
are G2 blockers and require rationales tied to supported vials, orders,
containers and measurable administration devices. HTML control attributes are
not authoritative validation.

## 4. Proposed exact representation

### 4.1 Parsed decimals

Represent each accepted decimal as a non-negative integer mantissa `m` and
decimal scale `s`:

```text
value = m / 10^s
```

Normalize by removing trailing decimal zeros while preserving the original
text separately. The deployed implementation is proposed to use checked,
bounded `bigint` operations, subject to DEV-001 approval of browser support,
serialization boundaries and dependency/tooling policy.

### 4.2 Calculated values

Represent exact calculated values as a normalized positive rational pair
`n/d`, where `n` and `d` are bounded positive integers and their greatest common
divisor has been removed. This preserves exact results such as one third until
the separately approved display operation. Each multiplication, scale
conversion and common-denominator operation must check the approved bit/digit
bound before proceeding. Exceeding that bound returns `NUMERIC_RANGE`, never a
floating-point approximation.

The maximum integer/rational size, cancellation strategy and serialized
canonical form are **TBD** and block G2. The formal model and TypeScript engine
must use algebraically equivalent definitions, and VVP-001 must test their
conformance. Neither this proposal nor use of `bigint` is by itself a safety
argument.

## 5. Units and dimensional rules

The admitted medication unit type is closed:

```text
MedicationUnit = Mg | Mcg
scale(Mg)  = 1000  // mcg per mg
scale(Mcg) = 1     // mcg per mcg
```

The parser/storage/UI boundary must reject activity units, legacy `units`
values, empty/unknown strings and all future units until a controlled change is
approved. Two unknown values must never become compatible through a shared
`null`, empty or fallback representation. mL is used only for volume and cannot
enter a medication-unit field.

Unit conversion is exact multiplication/division by the integer ratio 1000. No
converted medication value may be formatted and reparsed for calculation.

## 6. Formulas and invariants

For exact positive values `A` (vial amount), `Vv` (vial volume), `Vf` (final
prepared volume), `D` (ordered dose), vial unit `Uv` and order unit `Ud`:

```text
available in ordered unit = A × scale(Uv) / scale(Ud)
vial concentration        = A / Vv                  [Uv/mL]
prepared concentration    = A / Vf                  [Uv/mL]
prepared concentration    = available / Vf          [Ud/mL]
administration volume Va  = D × Vf × scale(Ud)
                            ----------------------    [mL]
                            A × scale(Uv)
```

Implementations shall reduce factors before multiplication where possible and
must check every operation against the approved bound. The last expression is
preferred over overflow-prone conversion intermediates, but both must be
proved algebraically equivalent over the admitted domain.

Proposed invariants, each requiring pharmacy and independent-verifier approval:

- `A > 0`, `Vv > 0`, `Vf > 0`, `D > 0`, and every denominator is non-zero;
- `Vf >= Vv`; equality is admitted and `Vf < Vv` is blocked;
- `D <= available`; equality is admitted and `D > available` is blocked as
  requiring more than one vial;
- for a valid calculation, `Va > 0` and `Va <= Vf`;
- `Va × (available / Vf) = D` exactly;
- multiplying `D` by an admitted positive factor multiplies `Va` by the same
  factor while the result remains within all bounds;
- equivalent `mg` and `mcg` quantities produce the same exact `Va`; and
- changing `Vv` alone does not change `Va` when `A`, `Vf`, `D`, `Uv` and `Ud`
  remain fixed, although it changes vial concentration and can affect the
  `Vf >= Vv` admission rule.

## 7. One-vial and container behavior

The reference product models exactly one vial amount `A`. If `D > available`,
the engine returns `MULTI_VIAL_UNSUPPORTED` and exposes no actionable volume.
If `D = available`, the exact result is `Vf` and remains a one-vial boundary
case. The product shall not add vial counts, split preparation across vials or
suggest an alternative workflow.

This control detects an order that exceeds the entered vial amount. It cannot
detect a user who has already combined multiple vials and enters their summed
amount as if it were one vial. The UI/IFU must identify the one-vial assumption,
and representative-use validation must test comprehension; RMF-001 retains the
foreseeable-misuse risk until those controls are validated.

`Vf` means total final prepared volume, not diluent added and not nominal
container label volume. The engine does not adjust for overfill, drug
displacement, withdrawal loss or dead space. The pharmacy lead must either
approve these exclusions and their enforcement/wording or revise the product
scope before G2.

## 8. Structured outcomes and blocking rules

The domain boundary shall return one of `incomplete`, `blocked`, or `valid`; it
shall never return a guessed/default mL value. A blocked or incomplete state
must contain no display model that could expose an actionable result in either
the visual or accessibility tree.

Proposed stable error order:

| Order | Code | Condition |
| --- | --- | --- |
| 1 | `REQUIRED` | A required raw value is blank or unit/final-volume selection is absent |
| 2 | `DECIMAL_SYNTAX` | Raw decimal violates section 3.1, including sign/exponent/whitespace/locale forms |
| 3 | `DECIMAL_PRECISION` | Digit or decimal-place limit exceeded |
| 4 | `INPUT_RANGE` | Zero, below-minimum or above-maximum input |
| 5 | `UNIT_UNSUPPORTED` | Unit is not exactly `mg` or `mcg` |
| 6 | `FINAL_VOLUME_UNSUPPORTED` | Final volume is outside the approved closed set |
| 7 | `FINAL_VOLUME_BELOW_VIAL` | `Vf < Vv` |
| 8 | `MULTI_VIAL_UNSUPPORTED` | `D > available` from the entered one-vial amount |
| 9 | `NUMERIC_RANGE` | Checked intermediate/exact representation exceeds its approved bound |
| 10 | `RESULT_RANGE` | Positive exact result is outside the approved measurable/display range |
| 11 | `INTERNAL_INVARIANT` | A state believed valid violates a denominator, sign, dimension or consistency invariant |

All applicable errors should be returned in this order for deterministic
presentation and testing. The final error set, user wording, focus behavior and
whether presentation shows one or multiple errors remain open human-factors
decisions. `INTERNAL_INVARIANT` must fail closed and be controlled as an
anomaly; it must never be rewritten as zero.

## 9. Display and rounding policy

The exact rational result is authoritative. Display text is derived once from
that result and reused in the equation review, revealed result, accessibility
name and any persisted presentation snapshot. Persisted derived output is never
authoritative on reopen.

The following are **TBD and block G2**:

- rounding mode;
- fixed decimal places versus significant digits;
- maximum displayed precision;
- clinically meaningful trailing zeros;
- minimum measurable/displayable non-zero mL;
- maximum displayable mL;
- wording/symbol for a result below an approved threshold;
- disclosure text when a value has been rounded; and
- whether the equation shows the exact rational, an approved sufficiently
  precise decimal, or both.

Whatever policy is approved shall satisfy:

1. no positive exact `Va` is rendered as `0`, `0.0`, `0.000000`, `-0`, an empty
   value, a non-finite value or another actionable zero equivalent;
2. if ordinary rounding would produce zero, return `RESULT_RANGE` or the
   specifically approved non-zero less-than presentation;
3. the equation and final result use the same display decision and disclose
   rounding consistently;
4. formatting is deterministic and locale-independent for the reference
   calculation record; and
5. displayed precision is never represented as measurement precision the
   product has not established.

## 10. Required golden, boundary and adversarial corpus

VVP-001 shall assign each test a controlled ID, independent expected result,
author and approver. Expected values must be calculated independently of the
production engine. Formal/reference generation may expand the corpus but
cannot be the only clinical oracle.

### 10.1 Proposed exact examples

These examples check proposed formulas; they are not approved golden evidence.

| Corpus ID | Inputs (`A`, `Vv`, `Vf`, `D`) | Units (`Uv` → `Ud`) | Proposed exact outcome |
| --- | --- | --- | --- |
| CALC-G-001 | `1`, `1`, `100`, `0.1` | mg → mg | `Va = 10 mL` |
| CALC-G-002 | `1`, `1`, `100`, `100` | mg → mcg | `Va = 10 mL` |
| CALC-G-003 | `1000`, `1`, `100`, `0.1` | mcg → mg | `Va = 10 mL` |
| CALC-G-004 | `1000`, `1`, `100`, `100` | mcg → mcg | `Va = 10 mL` |
| CALC-G-005 | `1`, `1`, `100`, `1` | mg → mg | `Va = 100 mL`; exact one-vial ceiling |
| CALC-G-006 | `1000`, `1`, `1000`, `0.0000001` | mg → mg | `Va = 0.0000001 mL`; must never display as zero; final disposition depends on DEC-NUM-003/008 |

CALC-G-006 is the reproduced positive-to-zero regression. The overflow
regression must include raw `1e308` (lexical rejection) and an expanded decimal
whose length is immediately beyond the approved bound (precision/range
rejection). A clinically valid maximum-bound case must demonstrate exact
calculation without an unchecked multiply-by-1000 overflow path.

### 10.2 Required categories

| Category | Minimum controlled cases |
| --- | --- |
| Grammar | Every accepted/rejected example in section 3.1; empty, whitespace, newline, comma, multiple points, signs, exponent, `NaN`, `Infinity` and Unicode lookalikes |
| Field boundaries | Immediately below, exactly at and immediately above every approved digit, scale, minimum and maximum boundary for `A`, `Vv`, `D` and `Va` |
| Units | Same-unit mg and mcg; exact equivalents in both directions; activity, `units`, mL, blank, unknown, mixed-case and legacy stored-unit rejection |
| Final volume | Every allowed value; unknown values; `Vf` below, equal to and above `Vv` |
| One vial | `D` below, equal to and immediately above `available`; attempts to encode or restore multi-vial state |
| Arithmetic | Exact integer and non-terminating rational outputs; reducible factors; maximum checked intermediate; zero-denominator defense |
| Display | No-rounding cases and immediately below/at/above every approved rounding and result threshold; positive-to-zero regression; trailing-zero and disclosure decisions |
| State/storage | Original text retained; equivalent-text edit behavior; malformed/unknown/future saved values are blocked and derived output is recalculated |
| Existing behavior | Every arithmetic example in MVP_DESIGN.md and the browser suite, reviewed for consistency with the approved scope |

### 10.3 Required properties

Property tests shall generate only from the approved bounded domain and retain
the seed and minimized counterexample for every failure:

- formula identity `Va × (available / Vf) = D`;
- strict positivity and denominator safety;
- `mg`/`mcg` conversion invariance;
- dose proportionality where both cases remain admitted;
- one-vial equivalence `D <= available` if and only if `Va <= Vf`;
- vial-volume independence subject to `Vf >= Vv`;
- parser soundness and deterministic canonicalization;
- deterministic structured outcome and display decision; and
- positive-never-zero display safety.

## 11. Verification and traceability

| Specification area | SYS-001 | TRC-001 | Required evidence owner |
| --- | --- | --- | --- |
| Grammar/bounds | INP-004, CAL-002, CAL-008 | HZ-001, HZ-002 | Independent verifier; pharmacy corpus approval |
| Closed units/conversion | INP-002, INP-005, CAL-001 | HZ-001, HZ-004, HZ-007 | Pharmacy and independent verifier |
| Formula/one-vial rules | CAL-001, CAL-004, CAL-005, CAL-009 | HZ-001, HZ-005, HZ-007, HZ-011 | Pharmacy |
| Exact representation | CAL-002, CAL-003, CAL-007 | HZ-002 | Software and independent verifier |
| Display/rounding | CAL-003, CAL-006, CAL-007, CAL-008 | HZ-002, HZ-005, HZ-006 | Pharmacy and human factors |
| Review/edit behavior | REV-001–REV-003 | HZ-003 | Quality and human factors |

VVP-001 must define the controlled commands, oracle independence, test/report
locations and acceptance criteria. TRC-001 remains open until every approved
requirement and risk control maps to implementation and passing evidence for
the exact release revision.

## 12. Gate blockers, approval and change control

G2 cannot close until:

- G1 product scope and intended use are approved;
- all DEC-NUM items have an explicit disposition;
- every TBD boundary and rounding/display value has a clinical rationale;
- pharmacy approves formulas, units, one-vial/container assumptions and the
  independently calculated corpus;
- software and the independent verifier approve the representation and
  checked-operation limits;
- nursing/human factors approves critical wording and presentation rules;
- RMF-001 links the resulting controls and remaining risks; and
- quality approves the record and its bidirectional traceability.

After approval, a change to grammar, bounds, representation, units, scale,
formula, final-volume set, one-vial rule, error ordering, display/rounding,
threshold or canonical schema requires documented impact assessment and
reapproval of affected requirements, risks, proofs and tests.

| Role | Name | Decision | Date/signature | Approved version/commit |
| --- | --- | --- | --- | --- |
| Clinical pharmacy / medication-safety lead | Unassigned | Pending | — | — |
| Software lead | Unassigned | Pending | — | — |
| Independent calculation verifier | Unassigned | Pending | — | — |
| Nursing/human-factors lead | Unassigned | Pending | — | — |
| Quality lead | Unassigned | Pending | — | — |
