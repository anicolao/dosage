/-!
Executable recognition of the proposed strict decimal grammar.

Clinical magnitude, precision, and display bounds remain parameters because
CALC-001 has not yet approved their values. `parseAdmitted` can only construct
a value carrying proofs that it passed the supplied bounds.
-/

namespace Dosage

private def asciiDigit? : Char → Option Nat
  | '0' => some 0
  | '1' => some 1
  | '2' => some 2
  | '3' => some 3
  | '4' => some 4
  | '5' => some 5
  | '6' => some 6
  | '7' => some 7
  | '8' => some 8
  | '9' => some 9
  | _ => none

private structure DecimalScan where
  coefficient : Nat := 0
  scale : Nat := 0
  integerDigits : Nat := 0
  fractionalDigits : Nat := 0
  totalDigits : Nat := 0
  afterDot : Bool := false
  leadingZero : Bool := false
  deriving DecidableEq, Repr

private def scanChars : List Char → DecimalScan → Option DecimalScan
  | [], state =>
      if state.integerDigits = 0 then none
      else if state.afterDot && state.fractionalDigits = 0 then none
      else some state
  | c :: rest, state =>
      if c = '.' then
        if state.afterDot || state.integerDigits = 0 then none
        else scanChars rest { state with afterDot := true }
      else
        match asciiDigit? c with
        | none => none
        | some digit =>
            if !state.afterDot && state.integerDigits > 0 && state.leadingZero then none
            else
              let next := {
                state with
                coefficient := state.coefficient * 10 + digit
                scale := if state.afterDot then state.scale + 1 else state.scale
                integerDigits := if state.afterDot then state.integerDigits else state.integerDigits + 1
                fractionalDigits := if state.afterDot then state.fractionalDigits + 1 else state.fractionalDigits
                totalDigits := state.totalDigits + 1
                leadingZero := if state.integerDigits = 0 then digit = 0 else state.leadingZero
              }
              scanChars rest next

private def scanDecimal (raw : String) : Option DecimalScan :=
  scanChars raw.toList {}

def isStrictDecimal (raw : String) : Bool :=
  (scanDecimal raw).isSome

structure ParsedDecimal where
  raw : String
  coefficient : Nat
  scale : Nat
  totalDigits : Nat
  grammar : isStrictDecimal raw = true
  deriving DecidableEq, Repr

def parseDecimal (raw : String) : Option ParsedDecimal :=
  match h : scanDecimal raw with
  | none => none
  | some state =>
      some {
        raw
        coefficient := state.coefficient
        scale := state.scale
        totalDigits := state.totalDigits
        grammar := by simp [isStrictDecimal, h]
      }

theorem parseDecimal_sound (raw : String) (value : ParsedDecimal)
    (h : parseDecimal raw = some value) :
    value.raw = raw ∧ isStrictDecimal raw = true := by
  unfold parseDecimal at h
  split at h
  · contradiction
  · rename_i state hscan
    injection h with hvalue
    subst value
    exact ⟨rfl, by simp [isStrictDecimal, hscan]⟩

structure DecimalBounds where
  minimumCoefficient : Nat
  maximumCoefficient : Nat
  maximumScale : Nat
  maximumDigits : Nat
  deriving DecidableEq, Repr

structure AdmittedDecimal (bounds : DecimalBounds) where
  parsed : ParsedDecimal
  positive : 0 < parsed.coefficient
  minimum : bounds.minimumCoefficient ≤ parsed.coefficient
  maximum : parsed.coefficient ≤ bounds.maximumCoefficient
  scaleBound : parsed.scale ≤ bounds.maximumScale
  digitBound : parsed.totalDigits ≤ bounds.maximumDigits
  deriving DecidableEq, Repr

def parseAdmitted (bounds : DecimalBounds) (raw : String) : Option (AdmittedDecimal bounds) :=
  match parseDecimal raw with
  | none => none
  | some parsed =>
      if h : 0 < parsed.coefficient ∧
          bounds.minimumCoefficient ≤ parsed.coefficient ∧
          parsed.coefficient ≤ bounds.maximumCoefficient ∧
          parsed.scale ≤ bounds.maximumScale ∧
          parsed.totalDigits ≤ bounds.maximumDigits then
        some {
          parsed
          positive := h.1
          minimum := h.2.1
          maximum := h.2.2.1
          scaleBound := h.2.2.2.1
          digitBound := h.2.2.2.2
        }
      else none

theorem parseAdmitted_sound (bounds : DecimalBounds) (raw : String)
    (value : AdmittedDecimal bounds) (h : parseAdmitted bounds raw = some value) :
    value.parsed.raw = raw ∧
    isStrictDecimal raw = true ∧
    0 < value.parsed.coefficient ∧
    bounds.minimumCoefficient ≤ value.parsed.coefficient ∧
    value.parsed.coefficient ≤ bounds.maximumCoefficient ∧
    value.parsed.scale ≤ bounds.maximumScale ∧
    value.parsed.totalDigits ≤ bounds.maximumDigits := by
  simp only [parseAdmitted] at h
  split at h <;> try contradiction
  next parsed hParsed =>
    split at h <;> try contradiction
    next admitted =>
      have parsedSound := parseDecimal_sound raw parsed hParsed
      cases h
      exact ⟨parsedSound.1, parsedSound.2, admitted.1, admitted.2.1, admitted.2.2.1,
        admitted.2.2.2.1, admitted.2.2.2.2⟩

structure PositiveDecimal where
  coefficient : Nat
  scale : Nat
  positive : 0 < coefficient
  deriving DecidableEq, Repr

def AdmittedDecimal.toPositive {bounds : DecimalBounds}
    (value : AdmittedDecimal bounds) : PositiveDecimal := {
  coefficient := value.parsed.coefficient
  scale := value.parsed.scale
  positive := value.positive
}

def PositiveDecimal.scaleCoefficient (factor : Nat) (factorPositive : 0 < factor)
    (value : PositiveDecimal) : PositiveDecimal := {
  coefficient := factor * value.coefficient
  scale := value.scale
  positive := Nat.mul_pos factorPositive value.positive
}

theorem strict_parser_rejects_exponent : parseDecimal "1e3" = none := by native_decide
theorem strict_parser_rejects_upper_exponent : parseDecimal "1E3" = none := by native_decide
theorem strict_parser_rejects_plus : parseDecimal "+1" = none := by native_decide
theorem strict_parser_rejects_minus : parseDecimal "-1" = none := by native_decide
theorem strict_parser_rejects_whitespace : parseDecimal " 1" = none := by native_decide
theorem strict_parser_rejects_comma : parseDecimal "1,5" = none := by native_decide
theorem strict_parser_rejects_leading_dot : parseDecimal ".5" = none := by native_decide
theorem strict_parser_rejects_trailing_dot : parseDecimal "1." = none := by native_decide
theorem strict_parser_rejects_leading_zero : parseDecimal "01" = none := by native_decide
theorem strict_parser_rejects_multiple_dots : parseDecimal "1..0" = none := by native_decide

theorem strict_parser_accepts_zero : (parseDecimal "0").isSome = true := by native_decide
theorem strict_parser_accepts_decimal : (parseDecimal "1000.000").isSome = true := by native_decide

end Dosage
