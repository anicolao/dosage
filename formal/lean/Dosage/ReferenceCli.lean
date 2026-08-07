import Dosage

/-! Versioned executable oracle output for the controlled seed corpus. -/

namespace Dosage.ReferenceCli

private def pairJson (name : String) (input : CalculationInput) : String :=
  let pair := (administrationVolume input).canonicalPair
  "  {\"id\":\"" ++ name ++ "\",\"numerator\":" ++ toString pair.1 ++
    ",\"denominator\":" ++ toString pair.2 ++ "}"

def vectorsJson : String :=
  let fullVial := { exampleInput with orderedDose := positive 500 0 (by decide) }
  String.intercalate ",\n" [
    pairJson "same-unit-quarter-vial" exampleInput,
    pairJson "cross-unit-quarter-vial" (asEquivalentOrderedMcg exampleInput),
    pairJson "one-vial-boundary" fullVial,
    pairJson "positive-never-zero-regression" tinyPositiveInput
  ] |> fun rows =>
    "{\"schemaVersion\":\"dosage-formal-v1\",\"vectors\":[\n" ++ rows ++ "\n]}"

def main (args : List String) : IO UInt32 := do
  match args with
  | [] | ["vectors"] =>
      IO.println vectorsJson
      return 0
  | ["version"] =>
      IO.println formalModelVersion
      return 0
  | _ =>
      IO.eprintln "usage: dosage-reference [vectors|version]"
      return 64

end Dosage.ReferenceCli
