import Dosage

/-! Versioned executable oracle output for the controlled seed corpus. -/

namespace Dosage.ReferenceCli

private def unitText : MedicationUnit → String
  | .mg => "mg"
  | .mcg => "mcg"

private def errorText : ValidationError → String
  | .finalVolumeBelowVial => "FINAL_VOLUME_BELOW_VIAL"
  | .multiVialUnsupported => "MULTI_VIAL_UNSUPPORTED"

private def errorsJson (errors : List ValidationError) : String :=
  errors.map (fun error => "\"" ++ errorText error ++ "\"")
    |> String.intercalate ","
    |> fun body => "[" ++ body ++ "]"

private structure VectorText where
  id : String
  vialAmount : String
  vialVolume : String
  finalVolume : String
  orderedDose : String

private def decimalJson (raw : String) (value : PositiveDecimal) : String :=
  "{\"raw\":\"" ++ raw ++ "\",\"coefficient\":\"" ++
    toString value.coefficient ++ "\",\"scale\":" ++ toString value.scale ++ "}"

private def vectorJson (text : VectorText) (input : CalculationInput) : String :=
  let decision :=
    match calculate input with
    | .blocked errors =>
        "{\"kind\":\"blocked\",\"errors\":" ++ errorsJson errors ++ "}"
    | .valid ratio =>
        let pair := ratio.canonicalPair
        "{\"kind\":\"valid\",\"exactAdministrationVolumeMl\":{" ++
          "\"numerator\":\"" ++ toString pair.1 ++ "\",\"denominator\":\"" ++
          toString pair.2 ++ "\"},\"referenceDisplay\":\"" ++ toString pair.1 ++
          "/" ++ toString pair.2 ++ " mL\"}"
  "  {\"id\":\"" ++ text.id ++ "\",\"input\":{" ++
    "\"vialAmount\":" ++ decimalJson text.vialAmount input.vialAmount ++
    ",\"vialUnit\":\"" ++ unitText input.vialUnit ++ "\",\"vialVolumeMl\":" ++
    decimalJson text.vialVolume input.vialVolume ++ ",\"finalVolumeMl\":\"" ++
    text.finalVolume ++ "\",\"orderedDose\":" ++
    decimalJson text.orderedDose input.orderedDose ++ ",\"orderedUnit\":\"" ++
    unitText input.orderedUnit ++ "\"},\"decision\":" ++ decision ++ "}"

def vectorsJson : String :=
  let fullVial := { exampleInput with orderedDose := positive 500 0 (by decide) }
  let multiVial := { exampleInput with orderedDose := positive 501 0 (by decide) }
  let finalBelowVial := {
    exampleInput with vialVolume := positive 101 0 (by decide)
  }
  String.intercalate ",\n" [
    vectorJson ⟨"same-unit-quarter-vial", "500", "10", "100", "125"⟩ exampleInput,
    vectorJson ⟨"cross-unit-quarter-vial", "500", "10", "100", "125000"⟩
      (asEquivalentOrderedMcg exampleInput),
    vectorJson ⟨"one-vial-boundary", "500", "10", "100", "500"⟩ fullVial,
    vectorJson ⟨"positive-never-zero-regression", "1000", "1", "1000", "0.0000001"⟩
      tinyPositiveInput,
    vectorJson ⟨"multi-vial-blocked", "500", "10", "100", "501"⟩ multiVial,
    vectorJson ⟨"final-volume-below-vial", "500", "101", "100", "125"⟩ finalBelowVial
  ] |> fun rows =>
    "{\"schemaVersion\":\"dosage-formal-v1\",\"modelVersion\":\"" ++
      formalModelVersion ++ "\",\"vectors\":[\n" ++ rows ++
      "\n],\"parserRejections\":[\"1e3\",\"1E3\",\"+1\",\"-1\",\" 1\",\"1,5\",\".5\",\"1.\",\"01\",\"1..0\"]," ++
      "\"unitRejections\":[\"units\",\"g\",\"MG\",\"\"]}"

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
