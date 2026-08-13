# Automated exact-prototype facts

This evidence was derived from repository source and controlled tests. It is not a clinical or regulatory approval.

| Fact | Value |
| --- | --- |
| Product | Dosage v0.1.0 · 6b53fde |
| Full source baseline | `6b53fde87ff9b193b3c24f7bd93549746b4d6471` |
| Application-path comparison | Current application source is byte-identical to the inquiry baseline for every controlled path |
| Built artifact file-manifest SHA-256 | `87394f7ba3170760d54004916cf3a79ebc1e56cf3c1982d573a8d9af625fe9db` |
| Archived executable ZIP / SHA-256 | `docs/regulatory/evidence/INQ-000/dosage-0.1.0-6b53fde.zip` / `8322e6ea7aca435796245a26a796ef5a4508a09b4733642768ae100a63a34442` |
| Screenshot archive | 12 captures; `96251e9737a40a662d722778d565489ecf4f18753df6e74abe3968f9245778f8` |
| Units / final volumes | mg, mcg / 10, 50, 100, 250, 500, 1000 mL |
| Runtime application network APIs | None in `src/App.svelte`; representative runtime observation is tested separately |
| Evidence JSON SHA-256 | `5eb4ee9abb0bb9253226897aaba731b394887560a4cf24380ede73c3147db5e0` |

## Mechanically reproduced worked example

10 mg in 1 mL prepared to 50 mL gives 0.2 mg/mL = 200 mcg/mL. An already-authorized 2000 mcg dose gives 10 mL. This arithmetic result still requires pharmacy approval as an authoritative clinical example.

## Human controls intentionally not automated

- This evidence establishes source and observed behavior, not clinical appropriateness or regulatory classification.
- The Lean model is a separate exact-rational reference and is not differential proof of the JavaScript prototype.
- A zero-length runtime API list is a source fact corroborated by E2E observation; the generated service worker still fetches same-origin cache misses.
- Identity, professional competence, clinical/regulatory judgment, evidence acceptance and signatures require attributable humans.
