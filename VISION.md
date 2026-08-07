# Product vision

## North star

Dosage helps a clinician under time pressure turn a known vial concentration and an already-authorized medication order into a transparent, reviewable dilution calculation—without sending sensitive information off the phone.

The product succeeds when the clinician can see, verify, and independently reproduce the arithmetic. It is not a source of prescribing knowledge and must never make an uncertain input look authoritative.

## Intended user and setting

The initial user is a licensed nurse or other authorized clinician preparing one vial of liquid medication in a 10 mL syringe or a 50, 100, 250, 500, or 1000 mL IV container. Use may occur in a bright, dim, noisy, interrupted, gloved, or low-connectivity environment on a personally or institutionally managed phone.

The likely workflow is brief:

1. Identify the medication and read the vial label.
2. Enter or recall the medication amount and vial volume.
3. Select the intended **final prepared volume**.
4. Enter the dose from an existing order and select its unit independently from the vial unit.
5. Review the equation, concentration, and calculated mL.
6. Independently verify, then optionally save the calculation locally.

## Product promises

### Transparent arithmetic

Every result shows its inputs, intermediate prepared concentration, output unit, and equation. The app does not hide a conversion, infer an order, or substitute a medication protocol.

### Local means local

No account, cloud sync, analytics, advertising, crash upload, remote API, or remote asset is part of the clinical product. Patient identifiers are neither requested nor supported. Local history is plainly labelled, individually reviewable, and erasable.

### Designed around error interception

Safety is not a disclaimer placed after the calculation. It shapes the input order, copy, unit handling, validation, confirmation, history, and tests. The interface distinguishes vial volume from final volume, makes mg↔mcg conversion explicit, prevents incompatible dimensions, blocks impossible one-vial doses, and asks for an explicit final verification before saving.

### Fast without being casual

Favourites reduce re-entry of medication facts, never the review of a patient-specific order. A favourite stores a medication name, amount, unit, and vial volume; it does not store or prefill a dose.

## Boundaries

Dosage MVP does:

- perform deterministic arithmetic from clinician-provided inputs;
- support a vial labelled in mg, mcg, or units and an independently selected ordered-dose unit, with explicit mg↔mcg conversion and no conversion between mass and units;
- represent final volumes of 10, 50, 100, 250, 500, and 1000 mL;
- store favourites and non-patient calculation history on the device;
- expose enough detail for an independent manual calculation.

Dosage MVP does not:

- prescribe, recommend, range-check, or infer a dose;
- contain a drug database, monograph, compatibility advice, infusion rate, route, stability, or reconstitution instructions;
- convert between mg and mcg inside a calculation;
- calculate weight-based, body-surface-area, multi-vial, multi-step, or continuous-infusion dosing;
- integrate with an EHR, barcode scanner, camera, pharmacy system, or cloud service;
- claim that a labelled bag volume equals its actual final prepared volume;
- replace an independent check or institutional medication policy.

## Safety principles

1. **The order comes from elsewhere.** Copy says “ordered dose,” never “recommended dose.”
2. **Final volume is explicit.** The UI never calls a bag size “diluent volume” or silently adds the vial volume.
3. **Units do not disappear.** Vial and ordered-dose units are selected separately. Compatible mg↔mcg conversion is shown in the equation; incompatible mass↔units combinations are blocked. mL is always visible on volume values.
4. **No hidden rounding.** The unrounded calculation is retained. Display precision is disclosed and values that demand local rounding judgment are flagged.
5. **Recall never bypasses review.** Loading a favourite clears the ordered dose and acknowledgement.
6. **History is an audit aid, not a chart.** Reusing a record returns to an editable, unconfirmed form.
7. **Uncertainty stops the flow.** Missing, non-positive, non-finite, mismatched, or impossible inputs produce no actionable output.
8. **Clinical release requires evidence.** Formal hazard analysis, software verification, clinical validation, and representative-user summative usability testing precede patient care.

These principles respond to medication preparation as a high-risk situation, consistent with the WHO’s [Medication Without Harm](https://www.who.int/publications/i/item/9789240062764) program and FDA guidance that human-factors work should minimize use-related risk and confirm safe, effective use.

## Experience character

The interface should feel calm, exact, and unhurried even when the user is hurried. Deep navy carries primary content; teal indicates a selected or verified state; amber is reserved for cautions; red is reserved for blocking errors. Large numerals, clear nouns, and visible units matter more than visual novelty.

The product should not look like a consumer wellness app, a prescribing reference, or a hospital chart. It is a focused clinical arithmetic tool.

## Success criteria

Before a pilot can be considered:

- 100% of the approved calculation corpus produces exact expected mathematical values;
- no tested workflow emits a network request or exposes content outside its browser origin;
- representative clinicians complete every critical task without a use error in formative testing;
- all critical hazards have verified risk controls and traceability to tests;
- phone portrait, phone landscape, tablet, desktop, zoom, and reduced-motion layouts remain operable;
- a clinician can independently reproduce every displayed result from the review screen;
- privacy, deletion, storage limits, and lack of recovery are understood by tested users;
- regulatory classification and release obligations are documented for the deployment jurisdiction.

## Later, only after MVP evidence

Possible future work includes institution-managed formularies, approved standard concentrations, barcode-assisted vial transcription, multi-vial workflows, infusion-rate calculations, and managed-device deployment. Each materially changes risk and regulatory scope and therefore requires a new hazard analysis—not a casual feature addition.
