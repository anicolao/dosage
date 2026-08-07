# Canadian clinical deployment and regulatory plan

Regulatory snapshot: 2026-08-07  
Product reviewed: Dosage prototype at revision `3b4b63b`  
Target use: a tool used by nurses in Canadian clinical settings

> This document is a product-specific planning assessment, not a legal opinion,
> a Health Canada classification decision, or authorization for clinical use.
> Canadian regulatory counsel, a qualified medical-device regulatory
> professional, clinical safety leadership, and each deploying health
> institution must review the final product and claims. Requirements and fees
> must be rechecked immediately before submission and launch.

## Executive decision

The current repository must not be provided to nurses for patient care. It is
an explicitly unvalidated prototype and has known safety defects and missing
regulatory infrastructure. In particular, the current implementation can
display a positive calculated administration volume as `0 mL`, can allow
overflowed arithmetic into its review flow, clips content at 200% text size and
in phone landscape, trusts unvalidated saved records, and has no controlled
quality, clinical-evidence, cybersecurity, complaint, recall, or post-market
system. See [CODEX_REVIEW.md](./CODEX_REVIEW.md) for the repository evidence.

The preliminary Health Canada assessment is:

- **The narrowly defined product is likely capable of being treated as
  non-device software**, because it performs simple, transparent arithmetic on
  user-entered vial facts, a user-selected final volume, and an already
  authorized dose. It does not select or recommend a dose, and the nurse can
  independently review the substituted equations. Health Canada's published
  examples specifically include independently reviewable, simple medical
  calculations and a manually entered drug-dosing calculation based on a drug
  label among software not subject to the Medical Devices Regulations.
- **That conclusion is not certain.** The output may be used immediately to
  prepare or administer an IV medication. This can be characterized as driving
  clinical management rather than merely informing it, and the consequences of
  an incorrect result can be critical. Intended use, labelling, promotional
  claims, supported medications and patients, and actual workflow all affect
  the result. Health Canada makes the final classification decision.
- **Before any clinical distribution, submit a product-specific classification
  inquiry to Health Canada.** Provide the intended-use statement, exclusions,
  screenshots, formulas, architecture, risk analysis, workflow and exact
  marketing copy. Preserve the written response in the design history file.
- **Run a Class III contingency programme until Health Canada confirms the
  exclusion or a lower class.** If the software is a medical device and remains
  available for unrestricted IV medications and clinical situations, a
  conservative analysis is that it drives management in potentially critical
  situations and may be Class III. Restricting the intended use to identified
  non-critical situations could support Class II; a transparent informational
  function could be Class I. The manufacturer must not self-select the most
  convenient class without Health Canada concurrence.

Canada does not issue a generic approval for every clinical app. If Dosage is
excluded from device regulation, there is no Health Canada licence or approval
to obtain or advertise. If it is Class II, III or IV, the manufacturer needs a
Medical Device Licence (MDL) before sale or import. A Class I device does not
receive an MDL, although the device requirements and Medical Device
Establishment Licence (MDEL) rules can still apply. Hospital procurement,
privacy review, security review, clinical governance and professional practice
approval are separate from Health Canada licensing.

## 1. Product and intended-use baseline

### 1.1 What the repository currently does

Dosage is a local Svelte web application. A user manually enters:

- the medication name, optionally;
- the quantity and unit printed on a vial (`mg`, `mcg`, or `units`);
- vial volume;
- a selected final prepared volume; and
- an already-prescribed dose and unit.

The software calculates prepared concentration and volume to administer in mL.
It presents substituted arithmetic equations for user review and withholds the
result until the user checks each equation. It has no drug library, patient
model, protocol engine, dose recommendation, EHR connection, account, cloud
service, analytics, telemetry, or adaptive/AI component. Favourites and history
are stored in browser `localStorage`.

### 1.2 Proposed controlled intended-use statement

Use the following as a starting point for regulatory review, then freeze the
approved wording across requirements, UI, instructions, website, sales
material, contracts and training:

> Dosage is a software arithmetic aid intended for trained healthcare
> professionals in Canada to calculate a volume in millilitres from a manually
> entered medication vial quantity, a manually entered or selected final
> prepared volume, and an already-authorized medication dose. It displays the
> substituted calculation for independent review. Dosage does not select,
> recommend, prescribe, verify, modify or assess the appropriateness of a dose,
> medication, route, preparation method or treatment, and is not a substitute
> for the medication order, authorized product monograph, pharmacy instructions,
> independent double-check requirements or institutional policy.

The initial release should be limited to adult, non-emergency workflows and a
clinically approved list of medications/preparations unless evidence supports a
broader population. The risk analysis must decide whether high-alert
medications, paediatrics, neonates, critical care, resuscitation, investigational
drugs, multi-vial preparations, continuous infusions, compounded concentrations
and hazardous drugs are contraindicated. “All medications” is not an acceptable
default scope.

The limitations must also state that the software does not account for bag
overfill, drug displacement, withdrawal volume, dead space, product stability,
compatibility, maximum concentration/rate, route, renal/hepatic function,
allergy, duplicate therapy, patient weight or institutional preparation rules.

### 1.3 Regulatory perimeter that preserves the exclusion argument

Unless reclassified before implementation, the first Canadian release must not:

- recommend or choose a medication, dose, concentration, route, rate or final
  volume;
- decide whether an order is clinically appropriate or within a “safe” range;
- use patient-specific parameters to propose therapy;
- hide the formula or prevent a professional from independently reproducing it;
- automatically ingest an order, barcode, pump, EHR or patient-monitor signal;
- generate alerts based on a drug library or institutional protocol;
- control a pump, compounder or other treatment device;
- learn, adapt, predict or use an opaque model;
- claim to diagnose, treat, prevent adverse events, ensure safe dosing, replace
  a double check, or reduce medication errors without evidence and a renewed
  classification assessment; or
- silently expand to new populations, medications or workflows.

Each of those changes can alter the intended purpose, make the output less
independently reviewable, or increase the significance of the information. It
must trigger formal regulatory impact assessment before development approval.

## 2. Is Dosage Software as a Medical Device?

### 2.1 Governing test

Health Canada's [Software as a Medical Device guidance](https://www.canada.ca/en/health-canada/services/drugs-health-products/medical-devices/application-information/guidance-documents/software-medical-device-guidance-document.html)
focuses on the manufacturer's intended or represented use. SaMD is software
intended for one or more medical purposes that performs those purposes without
being part of a hardware medical device. Software that supports or recommends
prevention, diagnosis, treatment or mitigation may be included.

Health Canada describes four exclusion criteria which generally all need to be
met for clinical-decision-support software to fall outside the Regulations.
They are guidance factors, not a mechanical safe harbour.

| Health Canada exclusion factor | Dosage assessment | Required evidence/control |
| --- | --- | --- |
| It does not acquire, process or analyze a medical image, IVD result, or signal from a signal-acquisition system. | **Met by the current design.** All inputs are manually entered text/selections. | Keep device/EHR/barcode/pump integration outside the cleared release. Document the data-flow architecture and test that no interface exists. |
| It displays, analyzes or prints medical or reference information normally used in practice. | **Likely met.** It applies ordinary dimensional arithmetic to vial-label and order facts. | Limit the formula to established arithmetic. Document every unit rule and formula with authoritative references and independent verification. |
| It supports, rather than replaces, a healthcare professional's decision; software that treats/diagnoses or drives immediate or near-term management generally does not fit this factor. | **Ambiguous.** The app does not decide the dose, but the mL result may be acted on immediately during IV preparation or administration. | Seek Health Canada classification advice. Narrow the setting and contraindications. Require independent review, but do not treat a warning or checkbox as sufficient to change the actual use. |
| The basis for the result is available so the professional does not rely primarily on the output. Simple routine calculations that can be independently validated may meet this factor. | **Strongly supported in concept, not yet validated in implementation.** Equations are displayed, but current rounding/overflow defects can make the displayed proof wrong. | Build a verified pure calculation engine; show original inputs, units, unrounded/appropriately rounded values and the complete substituted formula; validate comprehension through human-factors testing. |

The most relevant Health Canada [SaMD classification examples](https://www.canada.ca/en/health-canada/services/drugs-health-products/medical-devices/application-information/guidance-documents/software-medical-device-guidance/examples.html)
place software using established, public, simple calculations comparable to
paper charts, spreadsheets or generic calculators outside the Regulations when
the calculation can be independently reviewed. They also give an example of
software that calculates drug dosing from manually entered parameters based on
the drug product label as not subject to the Regulations. Dosage is close to
those examples, but its exact clinical claims and immediate-use context still
need confirmation.

### 2.2 Preliminary conclusion

**Likely outcome for the strictly bounded arithmetic aid: not SaMD / not a
medical device under current Health Canada policy. Confidence: moderate, not
sufficient for launch without a product-specific inquiry.**

The conclusion depends on all of the following remaining true:

1. The ordered dose is already authorized and entered by the user.
2. The software never selects, recommends, validates or changes treatment.
3. It performs only deterministic, established arithmetic.
4. The user can see and independently reproduce the basis of every result.
5. Labelling and promotion match the limited function.
6. The supported workflow, population and medication scope do not make the
   software the primary basis for a critical action.

The fact that software is free, open source, locally hosted, called a
“calculator,” or accompanied by a disclaimer does not determine classification.
Health Canada looks at intended and represented use, including what the product
actually does and how it is marketed.

### 2.3 Classification if Health Canada decides it is SaMD

Health Canada classifies SaMD by the significance of the information and the
state of the healthcare situation. Its guidance maps software that **drives**
management in critical situations to Class III; driving serious situations can
be Class II or III depending on whether an erroneous decision could create
immediate danger. Informational software may be Class I or II. The highest-risk
intended situation controls when several apply.

For the present broad aspiration—nurses using it for medication preparation in
clinical settings, without a medication or patient limitation—the prudent
contingency is **Class III**. A wrong volume for a high-alert IV medication or a
fragile patient could lead to immediate serious deterioration or death. A Class
II position would require a defensible, enforced intended-use limitation and
risk analysis showing that the supported situations are serious but not
critical and that an erroneous output would not create immediate danger. Class
I should not be assumed merely because the formula is simple.

Under the [Medical Devices Regulations](https://laws-lois.justice.gc.ca/eng/regulations/SOR-98-282/FullText.html),
the final classification is Health Canada's decision and the highest applicable
class applies.

### 2.4 Required classification inquiry

Before usability testing involving patient-care decisions, public clinical
claims, sales, or a hospital pilot:

1. Establish the legal manufacturer and Canadian regulatory contact.
2. Approve a regulatory-intended-use statement and the initial contraindicated
   uses.
3. Prepare a concise classification dossier containing:
   - product description and architecture;
   - user, care setting, patient population and medication scope;
   - exact inputs, outputs, formulas and unit conversions;
   - screenshots of the entire workflow and equation review;
   - a data-flow diagram showing manual input and local-only operation;
   - draft English and French labels, IFU, website and promotional claims;
   - the four-factor exclusion analysis above;
   - the Class I/II/III alternatives under the SaMD classification table;
   - preliminary ISO 14971-style hazards, including severity of a wrong result;
   - comparison with Health Canada's simple-calculation and drug-calculation
     examples; and
   - a list of planned features explicitly outside the first release.
4. Submit the initial classification-support request to Health Canada's Medical
   Devices Directorate at `meddevices-instrumentsmed@hc-sc.gc.ca`. Health
   Canada's current MDEL instructions (updated 2025-02-26) explicitly designate
   that address for classification requests. The older SaMD guidance lists
   `hc.devicelicensing-homologationinstruments.sc@canada.ca` for clarification
   of a specific classification rule. Treat that as a secondary
   rule-interpretation/pre-submission contact only if Health Canada redirects
   the request or advises using it; do not send duplicate requests to both.
   Health Canada has also published a superseding FRM-0292 effective
   2026-12-14 under SOR/2026-110. Its reference copy currently retains the same
   classification-support address, but a request on or after that date must use
   the then-effective instructions and implementation notices rather than this
   snapshot.
5. Obtain regulatory counsel's written opinion as a second input. Record Health
   Canada's response, assumptions and date in the regulatory file.
6. Do not describe the response as “approval.” Reassess it at least annually and
   before every material claim, workflow or feature change.

## 3. Two permissible market routes

### Route A — Health Canada concurs that Dosage is not a medical device

No MDL, MDEL or mandatory MDSAP certificate is obtained solely for Dosage under
the Medical Devices Regulations. There is also no Health Canada approval badge
or claim. The classification dossier and Health Canada correspondence become a
controlled product record.

Exclusion is not a safety exemption. The manufacturer should still implement a
proportionate medical-device-grade quality and safety programme because the
product is used in a high-consequence workflow. Hospital customers will
reasonably require evidence of software verification, clinical validation,
human factors, privacy, security, change control, complaint handling and rapid
field correction. Product liability, negligence, advertising, privacy,
language, accessibility, contract and professional-practice requirements still
apply.

Route A may launch only after the non-device release gates in section 10 are
met, an institutional clinical owner approves the product, and the applicable
province/territory and health-institution reviews are complete.

### Route B — Dosage is a Class II or Class III medical device

The manufacturer must comply with the Food and Drugs Act and Medical Devices
Regulations and obtain the appropriate MDL before sale or import. As of this
snapshot:

| Item | Class II | Class III |
| --- | --- | --- |
| Medical Device Licence | Required before sale/import | Required before sale/import |
| QMS | ISO 13485 system covering manufacture | ISO 13485 system covering design and manufacture |
| Audit certificate | Valid MDSAP certificate from a Health Canada-recognized auditing organization | Same |
| Application evidence | Intended use, standards, section 10–20 attestation/objective evidence, label and QMS certificate | Detailed device description, design/features, risk management, studies and safety/effectiveness evidence, clinical evidence as needed, marketing history, label, bibliography and QMS certificate |
| Current federal review fee, effective 2026-04-01 | CAD 643 | CAD 14,163 |
| Software change before implementation | Controlled in QMS; section 34 changes require an amendment | A significant change requires licence amendment before sale of the changed device |
| Periodic safety summary | Biennial | Annual |

Fees change annually and do not include MDSAP certification, consultants,
standards, testing, translation, insurance, clinical work or staff. Verify the
current amount on Health Canada's [medical-device licence application fee page](https://www.canada.ca/en/health-canada/services/drugs-health-products/funding-fees/fees-respect-human-drugs-medical-devices/medical-device-licence-application-review-funding-fees-drugs-health-products.html)
before filing.

Applications and amendments use Health Canada's Regulatory Enrolment Process
(REP). Follow the current [REP notice](https://www.canada.ca/en/health-canada/services/drugs-health-products/medical-devices/activities/announcements/mandatory-use-regulatory-enrolment-process-notice-to-industry.html)
and [new/amended licence guidance](https://www.canada.ca/en/health-canada/services/drugs-health-products/medical-devices/application-information/guidance-documents/application-new-amended-licence/implementation.html).
Since 2026, Health Canada may impose or amend terms and conditions on Class
II–IV licences throughout the product lifecycle; those conditions must be
tracked as controlled regulatory obligations.

## 4. Federal medical-device requirements if regulated

### 4.1 Safety and effectiveness evidence

Sections 10–20 of the Medical Devices Regulations require the manufacturer to
identify hazards, eliminate or reduce risks as far as possible, provide
protection and residual-risk information, establish an acceptable benefit-risk
profile, demonstrate intended performance and effectiveness throughout useful
life, and validate software. Objective evidence must exist even where a Class II
application uses an attestation rather than submitting the full file.

Create and maintain:

- an approved intended use, indications, contraindications, user profile,
  environment, supported platforms and expected useful life;
- system and software requirements with unique identifiers;
- software architecture, detailed design and data-flow documentation;
- a complete ISO 14971 risk-management plan/file/report;
- bidirectional traceability from hazard and user need through requirement,
  implementation, verification, validation and residual-risk label;
- a software development and maintenance plan;
- configuration, build, dependency, release and problem-resolution records;
- verification protocols and reports for every requirement;
- validation evidence on production-equivalent builds and supported devices;
- a clinical evaluation report and, where needed, clinical investigation;
- a usability engineering file for safety-critical tasks; and
- a benefit-risk determination signed by qualified clinical and regulatory
  reviewers.

Use the current edition accepted or recognized by Health Canada and document
full or partial conformity. A reasonable standards strategy is:

- ISO 13485 for the quality management system;
- ISO 14971 for medical-device risk management;
- IEC 62304 for the software lifecycle and software safety classification;
- IEC 62366-1 for usability engineering;
- IEC 82304-1 for health-software product safety and/or IEC 81001-5-1 for
  health-software security activities, where accepted and applicable;
- ISO 14155 if a clinical investigation is required; and
- WCAG 2.2 AA as the product accessibility target.

Check Health Canada's current [recognized standards list](https://www.canada.ca/en/health-canada/services/drugs-health-products/medical-devices/standards/list-recognized.html)
before declaring conformity. Standards support but do not replace compliance
with sections 10–20.

### 4.2 Quality management system and MDSAP

If regulated as Class II or III, engage a Health Canada-recognized Medical
Device Single Audit Program auditing organization early. Certification is not a
document purchased at the end: the manufacturer needs an operating ISO 13485
system with records. Health Canada's [MDSAP requirements](https://www.canada.ca/en/health-canada/services/drugs-health-products/medical-devices/quality-systems-13485/requirements-recognition-process-mdsap-auditing-organizations-profile/guidance-document.html)
apply to the certificate used in the licence application.

At minimum, implement controlled procedures for:

- quality governance, management responsibility and management review;
- document and record control;
- regulatory intelligence and submission/licence maintenance;
- design and development planning, inputs, outputs, reviews, verification,
  validation, transfer and changes;
- risk management integrated with development and post-market data;
- supplier qualification and monitoring, including hosting, libraries,
  translation, test laboratories and consultants;
- software configuration, secure build, release, deployment and rollback;
- training and competency;
- complaint intake, evaluation, investigation and regulatory reporting;
- nonconformance, corrective and preventive action (CAPA);
- vigilance, trend review, post-market surveillance and periodic reporting;
- advisory notices, field safety corrective action and recall;
- internal audit; and
- device, distribution and QMS record retention.

Name one accountable legal manufacturer. A GitHub account or informal group is
not an adequate manufacturer identity. Define who owns the design, places the
product on the market, signs regulatory attestations, receives complaints,
funds recalls and remains available through the useful life.

### 4.3 Calculation and software verification

Before clinical evidence is generated, replace the current calculation
implementation with a pure, deterministic, independently testable engine.
Clinical and pharmacy owners must approve a numeric specification covering:

- an exact decimal input grammar and preservation of entered values;
- permitted units, dimensional compatibility and conversion ratios;
- maximum and minimum values and decimal precision;
- overflow, underflow, division and unsafe-number behaviour;
- calculation precision versus display precision;
- rounding mode, significant figures, trailing zeros and mandatory rounding
  disclosure;
- results too small to display without becoming zero;
- final volume versus vial volume, medication amount and one-/multi-vial scope;
- supported/unsupported final-volume concepts, including bag overfill and drug
  displacement; and
- every blocking error, warning and recovery state.

Verification must include:

- a pharmacy-authored golden corpus with ordinary, boundary and adversarial
  cases;
- independent implementation or manual reference calculations;
- unit and dimension tests;
- property/metamorphic tests;
- fuzz and malformed-input tests;
- overflow/underflow and extreme-magnitude tests;
- exact regression tests for the current rounding-to-zero and infinity defects;
- persisted-data corruption and migration tests;
- browser/platform/device compatibility tests; and
- code review by a qualified reviewer independent of the original
  implementation.

The result displayed in the equation review must be the result that will be
acted upon. A rounded equation cannot be presented as proof of a different
internal value. Any value outside the validated display policy must be blocked,
not coerced to zero or infinity.

### 4.4 Risk management

The risk file must consider at least:

- wrong vial quantity, unit, vial volume, final volume or ordered dose;
- mg/mcg thousand-fold error and mass/activity incompatibility;
- decimal, exponent, locale and copy/paste interpretation;
- underflow, overflow, floating-point loss and unsafe rounding;
- stale review state after an input changes;
- restored favourites/history with invalid, inconsistent or old schema data;
- user confusing final volume with diluent added or nominal bag size;
- bag overfill, displacement, dead space and multiple-vial assumptions;
- dose/volume outside the preparation device's measurable range;
- unsupported medication, concentration, route, population or care setting;
- transcription, interruption, confirmation bias and time pressure;
- inaccessible/clipped content, colour/vision limitations and touch errors;
- browser, operating-system, font, service-worker, cache or storage failure;
- use of an outdated or recalled build;
- unauthorized modification, dependency compromise and corrupted assets;
- local history revealing sensitive clinical context;
- unavailable product/support during a clinical task; and
- foreseeable misuse as a prescribing, order-checking or infusion-rate tool.

Risk controls should follow the hierarchy of safe design, protective measures,
then information for safety. A warning, acknowledgement checkbox or instruction
must not be the sole control when a design control is feasible. Verify each
control and validate safety-critical controls with representative users.

### 4.5 Clinical evidence and human factors

Health Canada's 2026 [clinical-evidence guidance](https://www.canada.ca/en/health-canada/services/drugs-health-products/medical-devices/application-information/guidance-documents/clinical-evidence-requirements-medical-devices.html)
states that evidence is proportional to risk and may be required across the
lifecycle. The evidence must support the exact intended users, use environment,
population, indications and claims; evidence for a generic calculator is not
automatically evidence for high-alert IV preparation.

Build the evidence in this order:

1. **Analytical validation:** prove all formulas, unit conversions, numeric
   policies and error handling against approved references and independent
   calculations.
2. **Software verification/validation:** prove the released build and supported
   platform matrix implement the requirements and risk controls.
3. **Formative usability:** observe representative Canadian nurses and pharmacy
   staff across English and French interfaces, realistic interruptions, gloves,
   small screens, large text, landscape, low connectivity and local workflows.
4. **Summative human-factors validation:** use production-equivalent software,
   trained and untrained-as-intended participants, representative environments
   and all critical tasks. Predetermine success criteria. Include entry and
   detection of wrong units/decimals, interpretation of final volume, equation
   checking, review reset, unsupported use, recovery and response to errors.
5. **Clinical evaluation:** synthesize literature, established arithmetic,
   comparator information, analytical performance, usability and risk evidence.
   Address sex, gender, age, disability, language, race/ethnicity and other
   identity factors where they can affect representativeness, interaction or
   risk.
6. **Clinical investigation if residual uncertainty remains:** agree the plan
   with Health Canada and an institutional Research Ethics Board (REB).

A patient-care pilot is not a substitute for authorization. If a Class II, III
or IV investigational device is sold or imported for human investigational
testing in Canada, an Investigational Testing Authorization and REB approval may
be required. Follow Health Canada's [ITA guidance](https://www.canada.ca/en/health-canada/services/drugs-health-products/medical-devices/application-information/guidance-documents/investigational-testing-authorizations-guidance/guidance-document.html).
Non-clinical simulation that cannot influence patient care can precede a
licence, subject to institutional and REB determinations. Keep prototype builds
technically separated and visibly marked so they cannot be used on patients.

### 4.6 Cybersecurity

Health Canada's [premarket cybersecurity guidance](https://www.canada.ca/en/health-canada/services/drugs-health-products/medical-devices/application-information/guidance-documents/cybersecurity/document.html)
treats cybersecurity as a lifecycle safety issue for all software medical
devices. It expects secure design, device-specific risk management,
verification/validation, and ongoing monitoring and response. A Class III
submission should include cybersecurity risk analysis/report, testing evidence,
traceability, a cybersecurity bill of materials (SBOM) and a maintenance plan.

Required controls for Dosage include:

- a security architecture and threat model tied to patient-safety hazards;
- an exact SBOM with package, version, source, licence and known-vulnerability
  status for production and build dependencies;
- locked, reproducible builds, protected release signing and provenance;
- dependency review, static analysis, secret scanning, malformed-input/fuzz
  testing and independent penetration testing proportionate to exposure;
- restrictive CSP, no unapproved network destinations, no remote runtime
  dependency and integrity-protected local assets;
- controlled service-worker/cache behaviour, atomic updates, safe rollback and
  a visible version/status;
- schema validation and safe migrations for all local data;
- vulnerability intake, coordinated disclosure, severity/exploitability
  assessment, remediation targets and field communication;
- continuous monitoring of dependencies and supported browsers/operating
  systems;
- an end-of-support policy and procedure to disable or warn on unsupported
  versions without creating a new clinical hazard; and
- incident response integrated with complaint, CAPA, regulatory reporting and
  recall procedures.

Local-only operation reduces exposure but does not prove security. A public,
mutable GitHub Pages deployment does not provide sufficient version inventory,
release control, field correction or recall capability for clinical use.

### 4.7 Labelling and bilingual information

Sections 21–23 of the Medical Devices Regulations require applicable label
information such as device name, manufacturer name/address, identifier,
intended use/performance when not self-evident, and directions needed for safe
and effective use. Professional-use information may be in English or French,
but the other official language must be made available as soon as possible on
request. Health Canada permits electronic labelling for eligible SaMD subject to
the applicable controls.

For national deployment, do more than the federal minimum: ship the UI, labels,
IFU, training, safety notices, support and complaint intake fully in English and
French at launch. This supports Quebec language obligations, user safety and
institutional procurement. Translation must be qualified, clinically reviewed,
version-controlled and usability-tested; do not rely on browser translation.

The built-in label/IFU should include:

- legal manufacturer and contact details;
- product/device name, release version/build and unique identifier;
- intended use, intended users, population, environment and supported
  medications/workflows;
- contraindications, limitations, residual risks and warnings;
- required independent verification and local-policy steps;
- complete formula/unit definitions and clinically approved examples;
- numeric input, output and rounding rules;
- supported devices, browsers, operating systems, display/zoom requirements and
  minimum technical controls;
- privacy, local-storage, deletion, backup and device-management behaviour;
- connectivity, offline, cache and update behaviour;
- troubleshooting and safe response to error/unavailability;
- cybersecurity hardening, update and end-of-support information;
- complaint, incident and security-vulnerability contacts; and
- issue date/version and a durable way to retrieve the matching prior IFU.

Safety information necessary during offline use must be bundled with the
validated release, not available only on a website.

### 4.8 Licensing, establishment and distribution

- A Class II/III manufacturer must hold the device licence before sale or
  import. Advertising an unlicensed Class II–IV device for sale is prohibited,
  subject to narrow catalogue rules.
- A manufacturer selling only its own licensed Class II–IV device is generally
  exempt from an MDEL, but Canadian importers and distributors generally need
  one. A Class I manufacturer generally needs an MDEL unless distribution is
  solely through an appropriately licensed establishment. Map the actual legal
  entities and distribution chain with counsel.
- Do not assume that a free download or open-source licence avoids the Act. Get
  advice on whether each transfer, hosted access model and institutional
  arrangement is a “sale” or import in the regulated context.
- Maintain distribution records sufficient for a rapid, complete field action.
  For a web app this requires knowing which institution has which version,
  administrative contacts, deployment method and active/end-of-life status.
- Retain distribution records for the longer of projected useful life or two
  years after shipment. Recall records have additional retention rules.
- Define a controlled Canadian release channel. Institutional MDM/private web
  hosting can be used, but responsibility for validation, availability, updates,
  access control and records must be explicit.

Transition note: SOR/2026-110 and the superseding FRM-0292 take effect on
2026-12-14. They change aspects of foreign-distributor exemptions, mandatory
supplier information and documented MDEL procedures. Re-perform the MDEL and
distribution-chain analysis against the effective rules if classification,
licensing or launch work reaches that date.

The repository is GPL-3.0 licensed. Commercialization counsel should confirm
source-code and notice obligations for every distribution model and verify all
third-party licences. This is separate from Health Canada compliance.

### 4.9 Licence maintenance and post-market obligations

Before the first clinical release, operate—not merely draft—the following:

- complaint intake in English and French, with 24/7 escalation appropriate to
  clinical severity;
- complaint record, reportability assessment, investigation, trend analysis and
  CAPA procedures;
- Canadian incident reporting: preliminary report within 10 days for an
  incident causing death or serious deterioration, or within 30 days if it
  could do so on recurrence, followed by the agreed final report;
- reporting within 72 hours of specified serious foreign risks, regulatory
  actions, recalls or relevant labelling changes;
- Class II biennial or Class III/IV annual summary reports with a critical
  benefit-risk analysis, retained with source records for seven years;
- notification to Health Canada within 72 hours when a summary analysis finds a
  material adverse change in benefits or risks;
- voluntary recall decision notification within 24 hours, required information
  by the start of recall, effectiveness checks, and completion report within 30
  days;
- annual licence confirmation before November 1, QMS certificate updates, fee
  payment and notice of discontinuation within 30 days;
- monitoring and fulfilment of Health Canada licence terms and conditions;
- ongoing security and safety surveillance, literature review and signal
  detection; and
- a tested procedure to reach institutions, identify affected versions, stop
  use, correct/rollback, verify effectiveness and preserve continuity of care.

Hospitals have their own mandatory medical-device incident reporting duty. The
manufacturer's customer agreement and training should make it easy for the
hospital to identify the device/manufacturer and send incident information,
without shifting the manufacturer's obligations to the hospital.

For Class III, assess every software, cybersecurity, label and intended-use
change under Health Canada's current [significant-change guidance](https://www.canada.ca/en/health-canada/services/drugs-health-products/medical-devices/application-information/guidance-documents/interpret-significant-change-medical-device.html).
A significant change requires an amended licence before the changed device is
sold. All changes, including non-significant ones, remain subject to QMS,
verification, validation, risk and regulatory records.

## 5. Privacy and health-information compliance

There is no single Canadian health-privacy approval. The applicable law depends
on the province/territory, whether the customer is public or private, the role
of the hospital/clinic, where information moves and whether the manufacturer is
a custodian, agent or service provider.

The present data-minimization design is a major advantage: no patient field,
account, cloud, analytics or telemetry is needed. Preserve that architecture.
Even so, a medication name, dose, timestamp, device identifier or history can
become identifiable health or clinician information in context. Browser
`localStorage` on an unmanaged personal phone is not an adequate production
control merely because the developer cannot see it.

The federal private-sector baseline is PIPEDA, including accountability,
identified purposes, meaningful consent where required, collection/use/
retention limits, safeguards, openness, access and breach handling. Substantially
similar provincial private-sector laws can apply within Alberta, British
Columbia and Quebec, while PIPEDA continues to matter in federal works and
cross-border/interprovincial commercial activity. Provinces and territories
also have health-information and public-sector laws. Use the Office of the
Privacy Commissioner's [provincial and territorial privacy-law map](https://www.priv.gc.ca/en/about-the-opc/what-we-do/provincial-and-territorial-collaboration/provincial-and-territorial-privacy-laws-and-oversight/)
as the starting index, then obtain local advice for all 13 jurisdictions.

Required privacy work:

1. Appoint a privacy officer and maintain a privacy-management programme.
2. Create a data inventory and flow diagram for every field, log, cache,
   support record and build/deployment service. Prove the manufacturer receives
   no patient data in the intended configuration.
3. Prohibit patient names, identifiers and free text by design and labelling.
   Decide whether medication history is needed at all. Prefer no clinical
   history or short, institution-configurable retention.
4. Replace unvalidated `localStorage` with managed, schema-validated storage.
   Determine whether app-layer encryption adds safety or whether institution
   MDM, device encryption, access control, remote wipe and managed backup are
   the appropriate controls. Document the threat model.
5. Complete a privacy impact assessment and threat/risk assessment with every
   pilot institution before deployment. Quebec and public-sector institutions
   may impose specific assessment, contracting, access and location rules.
6. Define controller/custodian, agent/service-provider and subcontractor roles
   in contracts. Include permitted purpose, no secondary use, safeguards,
   access, audit, breach notice, deletion/return, subcontracting and support.
7. Provide accurate English/French privacy notices and in-product data deletion.
   Do not claim “no personal information” if support tickets, web-server logs,
   IP addresses or deployment services collect it.
8. Maintain breach detection, containment, risk assessment, notification and
   recordkeeping procedures for PIPEDA and each applicable provincial law.
9. Test deletion, retention, migration, backup and device-loss workflows.
10. Treat accounts, cloud sync, EHR integration, remote support, analytics,
    crash reporting, push notifications or exports as a new privacy and
    regulatory project, not an ordinary feature.

There is no universal Canadian rule that all data must stay in Canada, but
province-, public-sector-, custodian- and contract-specific restrictions can
apply. The safest first release is one where no patient information leaves the
institution or device and no manufacturer-operated backend processes it.

## 6. Provincial, territorial and institutional readiness

Health Canada regulates the product; it does not authorize a nurse or hospital
to adopt it. Nursing practice, pharmacy/medication management, health-facility
governance, privacy, language, accessibility and procurement operate at
provincial/territorial and institutional levels.

For each of Canada's 10 provinces and 3 territories, maintain a market-entry
record covering:

- health-information, private-sector and public-sector privacy statutes;
- breach, privacy-impact-assessment, contracting and data-location rules;
- the nursing regulator's medication administration, documentation,
  competence, independent double-check and technology standards;
- provincial college of pharmacists/pharmacy-service requirements affecting
  medication preparation;
- hospital accreditation, medication-management and clinical-technology policy;
- French/language requirements, especially Quebec;
- applicable accessibility legislation and public-sector procurement criteria;
- product/cyber liability, consumer protection and local contracting advice;
- clinical engineering, pharmacy, nursing, privacy, security, accessibility,
  legal and procurement approvals required by the customer; and
- incident escalation between nurse, employer, manufacturer and regulator.

Plan the first deployment in one province and a small number of institutions;
do not claim “approved for Canadian nurses” based on one hospital. A typical
institutional approval package should contain the classification record/MDL,
MDSAP certificate if applicable, intended use, risk and clinical evaluation
summaries, human-factors report, cybersecurity package/SBOM, privacy assessment,
architecture, bilingual IFU/training, support SLA, insurance, complaint/incident
process, update/rollback plan and recall contact tree.

Design and validate to WCAG 2.2 AA even when a specific statute does not directly
mandate it for the manufacturer. The present clipping at 200% text and in
landscape must be corrected. Hospital procurement may also require compatibility
with managed iOS/Android devices, assistive technologies, approved browsers,
MDM, network controls and downtime procedures.

## 7. Advertising and claims

Create a claims register tying every public or sales claim to evidence and the
classification record. Regulatory and clinical owners must pre-approve all
website, app-store, README, demo, training, social-media and sales language.

Until the route is resolved and release gates are complete:

- retain “Prototype only — not for patient care” on every accessible build;
- do not advertise clinical availability;
- do not call the product Health Canada approved, licensed, certified, cleared,
  validated, safe, error-preventing or suitable for all medications;
- do not imply endorsement by a nursing college, hospital or government; and
- prevent search engines/public links from presenting test builds as clinical
  products.

If excluded, acceptable language should say that Health Canada confirmed or the
manufacturer determined on a specified basis/date that the defined release is
not subject to the Medical Devices Regulations—only if that statement precisely
matches the correspondence and legal advice. It still must not say “approved by
Health Canada.” If licensed, state the exact licensed name, class, identifier
and intended use without extending the licence through marketing.

## 8. Current repository gap assessment

| Area | Current state | Clinical-release decision |
| --- | --- | --- |
| Intended use | Product documents say it is a dilution calculator for clinicians and not a dose chooser, but scope is not frozen by medication, patient or setting. | **Block.** Approve one controlled intended-use/contraindication set and classification dossier. |
| SaMD status | Repository acknowledges classification is future work. | **Block.** Obtain Health Canada input and legal/regulatory opinion. |
| Arithmetic | Transparent equations and useful E2E cases exist. Exponent input, unsafe magnitudes, overflow and display rounding can yield a reviewed `0 mL`. | **Critical block.** Replace and independently validate calculation core. |
| Risk controls | Review gating, reset-on-edit and no dose restoration from favourites are good design patterns. No formal risk file or traceability exists. | **Block.** ISO 14971 process, control verification and residual-risk approval. |
| Software lifecycle | Most logic resides in one Svelte component; no pure unit/property tests or controlled design history. | **Block.** IEC 62304-appropriate lifecycle, architecture, tests, configuration and release records. |
| Saved data | Local-only and no patient field are good. Records are not schema-validated, derived history values are trusted, retention is not implemented and storage is unencrypted. | **Block.** Minimize, validate, migrate, retain/delete safely and approve managed-device controls. |
| Human factors/accessibility | Answer gating and equation visibility are promising. Layout clips at 200% text and phone landscape; no representative-user validation exists. | **Block.** Fix reflow and complete formative/summative bilingual validation. |
| Cybersecurity | Small dependency set, local KaTeX and no telemetry/backend reduce exposure. No production CSP, SBOM, threat model, signed release, vulnerability process or penetration test exists. | **Block.** Implement lifecycle security package. |
| Offline/availability | No installable production service worker or validated offline restart/update path. | **Block** if offline use is claimed or required. Define availability/downtime model and validate it. |
| QMS | No ISO 13485/MDSAP QMS, controlled procedures, CAPA, audit or management review. | **Block for regulated Class II/III; material procurement block even if excluded.** |
| Clinical evidence | No analytical-validation report, clinical evaluation or nurse usability study. | **Block.** Generate evidence for exact intended use. |
| Labelling/language | English prototype warning and README exist. No controlled e-label/IFU or French interface/training. | **Block.** Fully bilingual, version-controlled product information. |
| Distribution/post-market | Public GitHub preview, no institution/version registry, complaint, incident, recall, field correction or support system. | **Block.** Controlled deployment and operating post-market system. |

## 9. Detailed execution plan

The two routes share most safety work. Do not wait for the classification reply
to fix defects, define the product, establish traceability or begin the quality
system. Do not begin clinical use while the inquiry is pending.

### Phase 0 — Governance and containment

**Exit gate:** no prototype can be mistaken for a clinical product; accountable
owners and decision authority exist.

- Incorporate or designate the legal manufacturer and Canadian address/contact.
- Name executive, regulatory, quality, clinical safety/pharmacy, nursing/human
  factors, privacy, security and engineering owners. Define independence for
  review and release.
- Keep every current deployment visibly marked not for patient care. Remove or
  access-control public previews if they could be used clinically.
- Freeze new clinical features until intended use and architecture are approved.
- Open controlled issue/CAPA-like records for every critical/high finding in
  `CODEX_REVIEW.md`.
- Purchase or plan adequate Canadian product, errors-and-omissions and cyber
  insurance before external clinical evaluation.
- Establish regulatory-change monitoring and retain qualified Canadian counsel.

### Phase 1 — Define product and obtain classification direction

**Exit gate:** signed intended use, enforced scope, documented risk-based
classification position, and Health Canada inquiry submitted; no clinical pilot.

- Conduct workshops with nursing, pharmacy, medication safety and human-factors
  experts to define actual use, users, environments, medications, populations
  and contraindications.
- Decide whether any saved history is necessary and whether institution-managed
  devices are mandatory.
- Approve the intended-use statement and claims register.
- Produce the classification dossier in section 2.4 and submit it to Health
  Canada.
- In parallel, document Class II and conservative Class III classification
  rationales, submission deltas, evidence needs and cost plan.
- Choose the regulatory route only after written input is reviewed. Record
  dissent and residual uncertainty; re-contact Health Canada if the product
  changes during development.

### Phase 2 — Establish the quality and regulatory system

**Exit gate:** controlled procedures are effective and generating records; an
MDSAP plan is contracted if Route B applies.

- Implement the QMS procedures listed in section 4.2 in an electronic document
  control system with audit trails and backups.
- Train staff and contractors; retain competency evidence.
- Qualify critical suppliers, including hosting/deployment, open-source
  dependencies, translation, security testing and clinical partners.
- Establish a design and development plan, software safety classification,
  configuration item list and regulatory requirements matrix.
- Start the risk-management file, usability engineering file, cybersecurity
  file and clinical evaluation plan.
- If regulated, contract an MDSAP auditing organization and complete gap,
  internal and certification audits. Correct nonconformities before submission.
- If excluded, schedule an independent ISO 13485-style quality audit even if
  certification is not pursued.

### Phase 3 — Rebuild and verify the clinical candidate

**Exit gate:** all requirements and risk controls are implemented, traceable and
verified; no unresolved critical/high defect; production candidate is frozen.

- Extract the strict calculation engine, decimal parser, formatter, unit model
  and storage schemas into independently testable modules.
- Fix every critical and high repository finding, including numeric zeroing,
  overflow, zoom/landscape, invalid persisted data and overprivileged CI.
- Implement validated bilingual UI/IFU and accessible reflow across the approved
  device matrix.
- Implement the privacy-minimized storage/retention design and institution MDM
  requirements.
- Implement production CSP, offline/update architecture if claimed, SBOM,
  release provenance, vulnerability controls and safe rollback.
- Establish deterministic builds and a controlled release repository separate
  from public prototype previews.
- Complete code review, static analysis, unit/property/integration/E2E tests,
  compatibility, performance, install/update/rollback, recovery, security and
  penetration testing.
- Produce verification reports and close all anomalies through formal risk and
  release decisions. Do not waive a calculation discrepancy.

### Phase 4 — Validate intended use and clinical safety

**Exit gate:** objective evidence supports the exact intended use; clinical,
human-factors, privacy and security owners approve residual risk.

- Complete analytical validation with an independent pharmacy/calculation
  reviewer.
- Run formative studies, improve the design under change control, then freeze
  the production-equivalent validation build.
- Complete bilingual summative human-factors validation with representative
  nurses, realistic devices, settings, interruptions and all critical tasks.
- Complete clinical evaluation and determine with Health Canada/regulatory
  counsel whether additional clinical investigation is necessary.
- If actual patient-care investigation is required, obtain ITA/REB and
  institutional authorization before use; conduct it under the approved plan.
- Complete security assessment/penetration testing and remediate findings.
- Complete privacy impact/threat-risk assessments and initial province-specific
  legal matrix.
- Finalize the benefit-risk report, residual-risk acceptance and post-market
  surveillance plan.

### Phase 5A — Non-device market authorization gate

**Exit gate:** documented exclusion remains valid and the first institution has
approved controlled use.

- Have regulatory counsel compare the final build, label and claims with the
  product assessed by Health Canada. Re-submit if any material difference
  exists.
- Complete an independent safety/quality file audit.
- Obtain the pilot institution's nursing, pharmacy, medication safety, privacy,
  cybersecurity, clinical engineering, accessibility, legal and procurement
  approvals.
- Sign support, update, breach, complaint, incident and field-correction
  agreements.
- Deploy only the controlled version to trained users through the approved
  channel. Monitor intensively under a prospective post-market plan.

### Phase 5B — Medical Device Licence gate

**Exit gate:** Health Canada MDL issued with all conditions fulfilled; QMS
certificate valid; institutional deployment approval complete.

- Assemble the Class II or III REP application using the current Health Canada
  format.
- For Class III, submit the complete design, risk, software V&V, cybersecurity,
  usability, clinical, labelling, marketing-history and standards evidence.
- For Class II, retain the complete objective evidence supporting the required
  attestations and provide the label/QMS material.
- Respond to information requests through controlled records. Update risk and
  application documents consistently.
- Do not sell, advertise for sale, import or clinically deploy until the licence
  is issued. Review any terms and conditions and incorporate them into the QMS.
- Verify importer/distributor MDEL status and distribution agreements.
- Complete the same institution-specific approvals required in Phase 5A.

### Phase 6 — Controlled launch and lifecycle operation

**Exit gate:** continuous; loss of licence, QMS certificate, safety evidence or
post-market capability triggers stop-sale/use evaluation.

- Use a staged deployment with named institutional clinical owner, training and
  go-live criteria. Maintain a non-software calculation fallback.
- Register every customer, deployment, version and contact for field action.
- Review complaints, near misses, use errors, security signals and calculation
  anomalies at a predefined frequency; trend by language, platform, workflow
  and user group.
- Meet all incident, foreign-risk, summary, recall, annual notification and QMS
  deadlines.
- Test the recall and security response process at least annually.
- Conduct internal audits, management review, supplier review, CAPA effectiveness
  checks, SBOM monitoring and penetration testing on a risk-based schedule.
- Revalidate relevant critical tasks and update evidence after changes.
- Expand to another province, population, medication group, platform or
  integration only through formal design, privacy, clinical and regulatory
  change control.

## 10. Release gates

### Gates required under either route

- [ ] Legal manufacturer and accountable quality/regulatory/clinical owners
  established.
- [ ] Final intended use, contraindications, supported matrix and claims frozen.
- [ ] Health Canada classification inquiry resolved for the final product.
- [ ] No open critical or high safety defect; current numeric and layout defects
  independently verified as fixed.
- [ ] Calculation requirements, approved corpus, independent verification,
  property/fuzz/boundary tests and traceability complete.
- [ ] Risk-management, software lifecycle, usability, cybersecurity and clinical
  evaluation files approved.
- [ ] Bilingual English/French UI, labels, IFU, training and complaint channels
  validated.
- [ ] Representative Canadian nurse/pharmacy formative and summative usability
  evidence meets predetermined criteria.
- [ ] Privacy impact/threat-risk assessment and province/customer legal matrix
  complete; no unintended data flows.
- [ ] SBOM, threat model, security verification, vulnerability disclosure,
  maintenance and end-of-support plan complete.
- [ ] Controlled build/deployment, customer/version registry, update/rollback,
  downtime and field-correction capability validated.
- [ ] Complaint, incident, CAPA, post-market, breach and recall processes trained
  and tested.
- [ ] Institution-specific clinical, pharmacy, privacy, security, accessibility,
  legal and procurement approvals complete.
- [ ] Product/cyber liability insurance and customer contracts effective.

### Additional Route B gates

- [ ] ISO 13485 QMS operating and valid MDSAP certificate issued by a recognized
  auditing organization.
- [ ] REP application dossier approved internally and submitted in the current
  format.
- [ ] Correct MDL issued for the final device, manufacturer, identifier, class
  and intended use; all terms/conditions operationalized.
- [ ] Importer/distributor MDEL and written regulatory responsibilities verified.
- [ ] No unapproved significant change between submission and deployed build.

## 11. Stop conditions and mandatory reassessment triggers

Stop clinical distribution/use and convene the safety/regulatory team when:

- any result discrepancy, rounding-to-zero, overflow, unit-conversion error or
  stale/incorrect saved result is reported;
- an incident caused or could cause death or serious deterioration;
- the validated build, label, licence, QMS certificate or required support
  service is unavailable or out of date;
- an exploited vulnerability can affect calculation integrity or availability;
- a customer cannot identify affected users/versions for field action;
- Health Canada or a provincial/institutional authority questions the
  classification, licence, claims or safety; or
- post-market evidence changes the benefit-risk conclusion.

Perform a documented regulatory, privacy, risk and validation impact assessment
before adding:

- a drug library, clinical ranges, dose/route/rate recommendation or alerts;
- patient age, weight, diagnosis, laboratory values, organ function or other
  patient-specific logic;
- barcode scanning, OCR, voice input, EHR/order/pump/compounder integration;
- cloud sync, accounts, remote support, analytics, telemetry or exports;
- automated or AI/ML recommendations;
- paediatric/neonatal, emergency, ICU or high-alert medication claims;
- new units, formulas, multi-vial or continuous-infusion workflows;
- a new platform/browser, storage/update architecture or third-party dependency
  that affects essential performance; or
- claims that the product prevents errors, verifies an order or replaces
  independent clinical judgment.

## 12. Primary regulatory sources

The source set below was checked on 2026-08-07. Always use the current version
when acting.

### Federal device law, classification and licensing

- [Medical Devices Regulations, SOR/98-282](https://laws-lois.justice.gc.ca/eng/regulations/SOR-98-282/FullText.html)
- [Software as a Medical Device: Definition and Classification](https://www.canada.ca/en/health-canada/services/drugs-health-products/medical-devices/application-information/guidance-documents/software-medical-device-guidance-document.html)
- [SaMD classification examples](https://www.canada.ca/en/health-canada/services/drugs-health-products/medical-devices/application-information/guidance-documents/software-medical-device-guidance/examples.html)
- [MDEL instructions and classification-request contact](https://www.canada.ca/en/health-canada/services/drugs-health-products/compliance-enforcement/establishment-licences/forms/medical-device-establishment-licence-application-form-instructions-0292.html)
- [Future FRM-0292 effective 2026-12-14](https://www.canada.ca/en/health-canada/services/drugs-health-products/compliance-enforcement/establishment-licences/forms/dec-medical-device-establishment-licence-application-form-instructions-0292.html)
- [SOR/2026-110 establishment-licence amendments](https://gazette.gc.ca/rp-pr/p2/2026/2026-06-17/html/sor-dors110-eng.html)
- [Medical-device guidance index](https://www.canada.ca/en/health-canada/services/drugs-health-products/medical-devices/application-information/guidance-documents.html)
- [New and amended medical-device licence applications](https://www.canada.ca/en/health-canada/services/drugs-health-products/medical-devices/application-information/guidance-documents/application-new-amended-licence/implementation.html)
- [Mandatory Regulatory Enrolment Process notice](https://www.canada.ca/en/health-canada/services/drugs-health-products/medical-devices/activities/announcements/mandatory-use-regulatory-enrolment-process-notice-to-industry.html)
- [Terms and conditions for Class II–IV licences](https://www.canada.ca/en/health-canada/services/drugs-health-products/medical-devices/application-information/guidance-documents/terms-conditions-class-ii-iv.html)
- [2026 medical-device licence application fees](https://www.canada.ca/en/health-canada/services/drugs-health-products/funding-fees/fees-respect-human-drugs-medical-devices/medical-device-licence-application-review-funding-fees-drugs-health-products.html)

### Quality, evidence, software and security

- [ISO 13485 and MDSAP information](https://www.canada.ca/en/health-canada/services/drugs-health-products/medical-devices/quality-systems-13485.html)
- [MDSAP audit/certificate requirements](https://www.canada.ca/en/health-canada/services/drugs-health-products/medical-devices/quality-systems-13485/requirements-recognition-process-mdsap-auditing-organizations-profile/guidance-document.html)
- [Clinical evidence requirements](https://www.canada.ca/en/health-canada/services/drugs-health-products/medical-devices/application-information/guidance-documents/clinical-evidence-requirements-medical-devices.html)
- [Investigational Testing Authorization guidance](https://www.canada.ca/en/health-canada/services/drugs-health-products/medical-devices/application-information/guidance-documents/investigational-testing-authorizations-guidance/guidance-document.html)
- [Premarket cybersecurity guidance](https://www.canada.ca/en/health-canada/services/drugs-health-products/medical-devices/application-information/guidance-documents/cybersecurity/document.html)
- [Health Canada recognized standards](https://www.canada.ca/en/health-canada/services/drugs-health-products/medical-devices/standards/list-recognized.html)
- [Use of standards to support compliance](https://www.canada.ca/en/health-canada/services/drugs-health-products/medical-devices/application-information/guidance-documents/using-standards-support-compliance-regulations.html)
- [Interpretation of a significant change](https://www.canada.ca/en/health-canada/services/drugs-health-products/medical-devices/application-information/guidance-documents/interpret-significant-change-medical-device.html)

### Labels, post-market and privacy

- [Class II labelling and promotional-material guidance](https://www.canada.ca/en/health-canada/services/drugs-health-products/medical-devices/application-information/guidance-documents/international-medical-device-regulators-forum/class-ii-licence-application-content-classifications/labelling-promotional-material.html)
- [Medical-device compliance and enforcement](https://www.canada.ca/en/health-canada/services/drugs-health-products/compliance-enforcement/information-health-product/medical-devices/guidance-medical-device-compliance-enforcement-0073/response-non-compliance.html)
- [PIPEDA fair-information principles](https://www.priv.gc.ca/en/privacy-topics/privacy-laws-in-canada/the-personal-information-protection-and-electronic-documents-act-pipeda/p_principle/)
- [Provincial and territorial privacy laws and oversight](https://www.priv.gc.ca/en/about-the-opc/what-we-do/provincial-and-territorial-collaboration/provincial-and-territorial-privacy-laws-and-oversight/)
- [Privacy breaches at a business](https://www.priv.gc.ca/en/privacy-topics/business-privacy/breaches-and-safeguards/privacy-breaches-at-your-business/)

## Bottom line

The fastest defensible route is not to add a disclaimer and publish the current
calculator. It is to keep the product a narrow, transparent arithmetic aid,
obtain a product-specific Health Canada classification response, and complete
the same core calculation, risk, human-factors, privacy, security, quality and
post-market work that a hospital needs regardless of classification. If Health
Canada accepts the exclusion, Dosage can proceed through institutional approval
without an MDL and must never be marketed as Health Canada approved. If it is a
device, plan conservatively for Class III until a narrower Class II or Class I
position is accepted, complete MDSAP/ISO 13485 and the appropriate evidence
dossier, and do not distribute for clinical use until the licence is issued.
