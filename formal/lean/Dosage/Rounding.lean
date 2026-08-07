import Dosage.Calculation

/-!
Safety boundary for the still-unapproved display policy.

The type makes displaying numeric zero impossible. It does not select the
clinical rounding mode, precision, or below-threshold rule that remains open in
CALC-001.
-/

namespace Dosage

structure PositiveDisplayValue where
  text : String
  coefficient : Nat
  positive : 0 < coefficient
  deriving DecidableEq, Repr

inductive DisplayDecision where
  | blocked (reason : String)
  | shown (value : PositiveDisplayValue)
  deriving DecidableEq, Repr

def safeExactReferenceDisplay (ratio : ExactRatio) : DisplayDecision :=
  .shown {
    text := toString ratio.numerator ++ "/" ++ toString ratio.denominator ++ " mL"
    coefficient := ratio.numerator
    positive := ratio.numeratorPositive
  }

theorem shown_value_ne_zero (value : PositiveDisplayValue) :
    value.coefficient ≠ 0 := Nat.ne_of_gt value.positive

theorem shown_decision_nonzero (decision : DisplayDecision)
    (value : PositiveDisplayValue) (h : decision = .shown value) :
    value.coefficient ≠ 0 := by
  cases h
  exact shown_value_ne_zero value

theorem positive_result_cannot_reference_display_zero (ratio : ExactRatio) :
    ∃ value : PositiveDisplayValue,
      safeExactReferenceDisplay ratio = .shown value ∧ value.coefficient ≠ 0 := by
  refine ⟨{
    text := toString ratio.numerator ++ "/" ++ toString ratio.denominator ++ " mL"
    coefficient := ratio.numerator
    positive := ratio.numeratorPositive
  }, rfl, ?_⟩
  exact Nat.ne_of_gt ratio.numeratorPositive

end Dosage
