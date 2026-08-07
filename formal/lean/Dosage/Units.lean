/-! Closed medication-unit model. -/

namespace Dosage

inductive MedicationUnit where
  | mg
  | mcg
  deriving DecidableEq, Repr

namespace MedicationUnit

def parse : String → Option MedicationUnit
  | "mg" => some .mg
  | "mcg" => some .mcg
  | _ => none

def microgramFactor : MedicationUnit → Nat
  | .mg => 1000
  | .mcg => 1

theorem microgramFactor_positive (unit : MedicationUnit) :
    0 < unit.microgramFactor := by
  cases unit <;> decide

theorem parse_closed (raw : String) (unit : MedicationUnit)
    (h : parse raw = some unit) : raw = "mg" ∨ raw = "mcg" := by
  by_cases hmg : raw = "mg"
  · exact Or.inl hmg
  by_cases hmcg : raw = "mcg"
  · exact Or.inr hmcg
  simp [parse] at h

theorem rejects_activity : parse "units" = none := by native_decide
theorem rejects_unknown : parse "g" = none := by native_decide
theorem rejects_mixed_case : parse "MG" = none := by native_decide
theorem rejects_empty : parse "" = none := by native_decide

end MedicationUnit
end Dosage
