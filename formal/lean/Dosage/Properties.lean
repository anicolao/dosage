import Dosage.Decimal
import Dosage.Units
import Dosage.Calculation
import Dosage.Rounding

/-! Machine-checked examples and theorem/axiom audit surface. -/

namespace Dosage

def positive (coefficient scale : Nat) (h : 0 < coefficient) : PositiveDecimal := {
  coefficient
  scale
  positive := h
}

def exampleInput : CalculationInput := {
  vialAmount := positive 500 0 (by decide)
  vialUnit := .mg
  vialVolume := positive 10 0 (by decide)
  finalVolume := 100
  finalVolumePositive := by decide
  orderedDose := positive 125 0 (by decide)
  orderedUnit := .mg
}

theorem example_exact_result :
    (administrationVolume exampleInput).canonicalPair = (25, 1) := by native_decide

theorem example_cross_unit_result :
    (administrationVolume (asEquivalentOrderedMcg exampleInput)).canonicalPair = (25, 1) := by
  native_decide

theorem example_one_vial_boundary :
    oneVialAdmitted { exampleInput with orderedDose := positive 500 0 (by decide) } := by
  unfold oneVialAdmitted
  native_decide

theorem example_multi_vial_rejected :
    ¬ oneVialAdmitted { exampleInput with orderedDose := positive 501 0 (by decide) } := by
  unfold oneVialAdmitted
  native_decide

theorem example_final_volume_admitted : finalVolumeAtLeastVial exampleInput := by
  unfold finalVolumeAtLeastVial
  native_decide

theorem example_calculation_valid :
    calculate exampleInput = .valid (administrationVolume exampleInput) := by
  native_decide

def tinyPositiveInput : CalculationInput := {
  vialAmount := positive 1000 0 (by decide)
  vialUnit := .mg
  vialVolume := positive 1 0 (by decide)
  finalVolume := 1000
  finalVolumePositive := by decide
  orderedDose := positive 1 7 (by decide)
  orderedUnit := .mg
}

theorem tiny_positive_exact_result :
    (administrationVolume tinyPositiveInput).canonicalPair = (1, 10000000) := by
  native_decide

#print axioms parseAdmitted_sound
#print axioms MedicationUnit.parse_closed
#print axioms denominator_nonzero
#print axioms administration_positive
#print axioms administration_identity
#print axioms valid_decision_positive
#print axioms ordered_mg_mcg_invariance
#print axioms vial_mg_mcg_invariance
#print axioms dose_proportionality
#print axioms one_vial_iff_volume_at_most_final
#print axioms vial_volume_independence
#print axioms shown_value_ne_zero
#print axioms positive_result_cannot_reference_display_zero

end Dosage
