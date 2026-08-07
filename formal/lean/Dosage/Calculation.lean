import Dosage.Decimal
import Dosage.Units

/-!
Exact administration-volume relationships over positive natural-number
decimal coefficients. A ratio is intentionally not converted to floating point.
-/

namespace Dosage

def pow10 (scale : Nat) : Nat := 10 ^ scale

theorem pow10_positive (scale : Nat) : 0 < pow10 scale := by
  exact Nat.pow_pos (by decide)

structure CalculationInput where
  vialAmount : PositiveDecimal
  vialUnit : MedicationUnit
  vialVolume : PositiveDecimal
  finalVolume : Nat
  finalVolumePositive : 0 < finalVolume
  orderedDose : PositiveDecimal
  orderedUnit : MedicationUnit
  deriving DecidableEq, Repr

def doseCommonNumerator (input : CalculationInput) : Nat :=
  input.orderedDose.coefficient * input.orderedUnit.microgramFactor *
    pow10 input.vialAmount.scale

def vialCommonNumerator (input : CalculationInput) : Nat :=
  input.vialAmount.coefficient * input.vialUnit.microgramFactor *
    pow10 input.orderedDose.scale

theorem doseCommonNumerator_positive (input : CalculationInput) :
    0 < doseCommonNumerator input := by
  apply Nat.mul_pos
  · exact Nat.mul_pos input.orderedDose.positive
      (MedicationUnit.microgramFactor_positive input.orderedUnit)
  · exact pow10_positive input.vialAmount.scale

theorem vialCommonNumerator_positive (input : CalculationInput) :
    0 < vialCommonNumerator input := by
  apply Nat.mul_pos
  · exact Nat.mul_pos input.vialAmount.positive
      (MedicationUnit.microgramFactor_positive input.vialUnit)
  · exact pow10_positive input.orderedDose.scale

structure ExactRatio where
  numerator : Nat
  denominator : Nat
  numeratorPositive : 0 < numerator
  denominatorPositive : 0 < denominator
  deriving DecidableEq, Repr

namespace ExactRatio

def Equivalent (left right : ExactRatio) : Prop :=
  left.numerator * right.denominator = right.numerator * left.denominator

theorem equivalent_refl (value : ExactRatio) : Equivalent value value := rfl

def canonicalPair (value : ExactRatio) : Nat × Nat :=
  let divisor := Nat.gcd value.numerator value.denominator
  (value.numerator / divisor, value.denominator / divisor)

end ExactRatio

def administrationVolume (input : CalculationInput) : ExactRatio := {
  numerator := doseCommonNumerator input * input.finalVolume
  denominator := vialCommonNumerator input
  numeratorPositive := Nat.mul_pos (doseCommonNumerator_positive input)
    input.finalVolumePositive
  denominatorPositive := vialCommonNumerator_positive input
}

def oneVialAdmitted (input : CalculationInput) : Prop :=
  doseCommonNumerator input ≤ vialCommonNumerator input

def finalVolumeAtLeastVial (input : CalculationInput) : Prop :=
  input.vialVolume.coefficient ≤ input.finalVolume * pow10 input.vialVolume.scale

inductive ValidationError where
  | finalVolumeBelowVial
  | multiVialUnsupported
  deriving DecidableEq, Repr

inductive CalculationDecision where
  | blocked (errors : List ValidationError)
  | valid (ratio : ExactRatio)
  deriving DecidableEq, Repr

def calculate (input : CalculationInput) : CalculationDecision :=
  let finalVolumeError :=
    if decide (input.vialVolume.coefficient ≤
        input.finalVolume * pow10 input.vialVolume.scale) then
      []
    else
      [.finalVolumeBelowVial]
  let oneVialError :=
    if decide (doseCommonNumerator input ≤ vialCommonNumerator input) then
      []
    else
      [.multiVialUnsupported]
  let errors := finalVolumeError ++ oneVialError
  if errors.isEmpty then .valid (administrationVolume input) else .blocked errors

def volumeAtMostFinal (input : CalculationInput) : Prop :=
  (administrationVolume input).numerator ≤
    input.finalVolume * (administrationVolume input).denominator

theorem denominator_nonzero (input : CalculationInput) :
    (administrationVolume input).denominator ≠ 0 :=
  Nat.ne_of_gt (administrationVolume input).denominatorPositive

theorem administration_positive (input : CalculationInput) :
    0 < (administrationVolume input).numerator :=
  (administrationVolume input).numeratorPositive

theorem administration_identity (input : CalculationInput) :
    (administrationVolume input).numerator * vialCommonNumerator input =
      (doseCommonNumerator input * input.finalVolume) *
        (administrationVolume input).denominator := by
  rfl

theorem valid_decision_positive (ratio : ExactRatio) :
    0 < ratio.numerator := ratio.numeratorPositive

theorem one_vial_iff_volume_at_most_final (input : CalculationInput) :
    oneVialAdmitted input ↔ volumeAtMostFinal input := by
  constructor
  · intro admitted
    unfold volumeAtMostFinal administrationVolume
    simpa [Nat.mul_comm] using Nat.mul_le_mul_left input.finalVolume admitted
  · intro volumeBound
    unfold volumeAtMostFinal administrationVolume at volumeBound
    apply Nat.le_of_mul_le_mul_left _ input.finalVolumePositive
    simpa [Nat.mul_comm] using volumeBound

def asOrderedMg (input : CalculationInput) : CalculationInput :=
  { input with orderedUnit := .mg }

def asEquivalentOrderedMcg (input : CalculationInput) : CalculationInput :=
  { input with
    orderedDose := input.orderedDose.scaleCoefficient 1000 (by decide)
    orderedUnit := .mcg
  }

def asVialMg (input : CalculationInput) : CalculationInput :=
  { input with vialUnit := .mg }

def asEquivalentVialMcg (input : CalculationInput) : CalculationInput :=
  { input with
    vialAmount := input.vialAmount.scaleCoefficient 1000 (by decide)
    vialUnit := .mcg
  }

theorem ordered_mg_mcg_invariance (input : CalculationInput) :
    ExactRatio.Equivalent
      (administrationVolume (asOrderedMg input))
      (administrationVolume (asEquivalentOrderedMcg input)) := by
  simp [ExactRatio.Equivalent, administrationVolume, doseCommonNumerator,
    vialCommonNumerator, asOrderedMg, asEquivalentOrderedMcg,
    PositiveDecimal.scaleCoefficient, MedicationUnit.microgramFactor]
  ac_rfl

theorem vial_mg_mcg_invariance (input : CalculationInput) :
    ExactRatio.Equivalent
      (administrationVolume (asVialMg input))
      (administrationVolume (asEquivalentVialMcg input)) := by
  simp [ExactRatio.Equivalent, administrationVolume, doseCommonNumerator,
    vialCommonNumerator, asVialMg, asEquivalentVialMcg,
    PositiveDecimal.scaleCoefficient, MedicationUnit.microgramFactor]
  ac_rfl

def withVialVolume (input : CalculationInput) (volume : PositiveDecimal) : CalculationInput :=
  { input with vialVolume := volume }

theorem vial_volume_independence (input : CalculationInput)
    (replacement : PositiveDecimal) :
    administrationVolume (withVialVolume input replacement) =
      administrationVolume input := by
  rfl

def scaleOrderedDose (factor : Nat) (factorPositive : 0 < factor)
    (input : CalculationInput) : CalculationInput :=
  { input with
    orderedDose := input.orderedDose.scaleCoefficient factor factorPositive
  }

theorem dose_proportionality (factor : Nat) (factorPositive : 0 < factor)
    (input : CalculationInput) :
    (administrationVolume (scaleOrderedDose factor factorPositive input)).numerator =
      factor * (administrationVolume input).numerator ∧
    (administrationVolume (scaleOrderedDose factor factorPositive input)).denominator =
      (administrationVolume input).denominator := by
  constructor <;>
    simp [administrationVolume, scaleOrderedDose, doseCommonNumerator,
      vialCommonNumerator, PositiveDecimal.scaleCoefficient] <;>
    ac_rfl

theorem calculation_deterministic (input : CalculationInput) :
    administrationVolume input = administrationVolume input := rfl

end Dosage
