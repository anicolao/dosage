# REG-003 — Health Canada classification question

| Field | Value |
| --- | --- |
| Record ID | REG-003 |
| Status | Draft — not submitted; not legal advice or a classification decision |
| Owner | Regulatory lead (unassigned) |
| Required reviewers | Legal manufacturer, regulatory counsel, pharmacy, nursing/human factors, quality |
| Draft version/date | 0.1 / 2026-08-07 |

## 1. Product submitted for analysis

The question applies only to the `0.2.0-classification` reference product
defined in REG-001 and the exact intended use in REG-002. It does not cover
future drug libraries, order checking, patient-specific recommendations,
barcode/EHR/pump input, multi-vial workflows, infusion rates or AI/ML.

## 2. Question for Health Canada

1. Does this bounded product fall outside the Medical Devices Regulations under
   Health Canada's four SaMD exclusion criteria for clinical-decision-support
   software?
2. If it is a medical device, which class does Health Canada consider
   applicable to this exact intended use and enforced scope?
3. Which facts or limitations are determinative, and which product/claim changes
   would require reassessment?

## 3. Four-factor exclusion analysis

| Exclusion factor | Draft product analysis | Evidence needed before submission |
| --- | --- | --- |
| Does not acquire/process/analyze a medical image, IVD result or signal from a signal-acquisition system | Intended to be met: every input is manual text or selection; no interface exists | Approved architecture/data flow, code inventory and interface/network verification |
| Displays/analyzes/prints medical or reference information normally used in practice | Likely met: it applies established dimensional arithmetic to vial-label and already-authorized-order facts | Pharmacy-approved formulas, unit policy, authoritative basis and independent calculation verification |
| Supports rather than replaces a healthcare professional's decision | **Disputed criterion 3:** it does not choose or assess treatment, but the mL output may be used immediately in preparation/administration and may therefore drive near-term management | Exact workflow, enforced exclusions, realistic use analysis, representative-user evidence and Health Canada advice; a checkbox/disclaimer is not dispositive |
| Makes the basis available so the professional does not rely primarily on the output | Strong in concept but not yet demonstrated: substituted equations are shown; current numeric/display defects undermine the basis | Correct exact engine, consistent equation/result object, independent verification and comprehension/usability evidence |

## 4. Draft non-device rationale

The narrow product uses only manually entered vial-label facts, a manually
selected final volume and an already-authorized dose. It performs transparent,
deterministic arithmetic, does not select or assess treatment, and exposes the
complete basis for independent reproduction. These characteristics resemble
the simple, independently reviewable calculation examples discussed in the
Health Canada inputs reviewed for this plan.

This rationale is not conclusive because the output can become the immediate
basis for a high-consequence medication action. Intended workflow and actual
claims matter more than the labels “calculator,” “local,” “free” or “open
source.” The request must foreground, not conceal, criterion 3.

## 5. Fallback classification questions

If Health Canada considers the product SaMD, ask it to address:

- whether the output informs or drives clinical management in the approved
  workflow;
- whether any included patient, medication or care situation is “critical” or
  “serious” under the SaMD framework;
- whether the enforced exclusions support Class II rather than Class III;
- whether any Class I informational rationale remains plausible; and
- whether a pre-submission meeting or additional evidence is recommended.

The planning fallback is Class III until Health Canada or qualified counsel
supports a lower route. The manufacturer must not self-select a convenient
class. Regulatory counsel must verify the applicable regulatory pin-cites,
including any Class III exclusion analysis, on the submission date.

## 6. Submission route control

The primary initial classification-request address in the reviewed plan is
`meddevices-instrumentsmed@hc-sc.gc.ca` because the current MDEL instructions
explicitly direct classification requests there. The older SaMD-guidance
address `hc.devicelicensing-homologationinstruments.sc@canada.ca` is secondary
only if Health Canada redirects the request or asks for specific rule
interpretation. Do not send duplicate requests.

Recheck the then-effective Canada.ca instruction on the day of submission. In
particular, FRM-0292 effective 2026-12-14 under SOR/2026-110 is a known dated
transition; a request on or after that date must use the effective version and
record the source, revision and retrieval date.

## 7. Required package attachments

- approved REG-001, REG-002 and this question;
- approved architecture/data-flow and no-interface evidence;
- formulas, numeric rules and independent verification summary;
- exact English and French labels/IFU/claims;
- complete workflow screenshots from the frozen reference build;
- preliminary risk analysis and wrong-result severity rationale;
- supported population, medication, setting and device limitations;
- comparison to the cited simple/drug-calculation examples;
- planned features explicitly excluded from the reference product; and
- signed manufacturer/regulatory approval to submit.

## 8. Change triggers

Reassess before adding any drug/patient database, recommendation, range check,
clinical alert, automatic input, barcode/camera/OCR, EHR/pharmacy/pump/signal
interface, opaque/adaptive logic, multi-vial/infusion workflow, new critical
setting/population, or claim that changes how users rely on the result.

## Approval

No response may be described as approval, clearance or authorization. Retain
Health Canada's exact response, assumptions and date as controlled advice.

| Role | Name | Decision | Date/signature |
| --- | --- | --- | --- |
| Legal manufacturer | Unassigned | Pending | — |
| Regulatory lead | Unassigned | Pending | — |
| Regulatory counsel | Unassigned | Pending | — |
| Pharmacy lead | Unassigned | Pending | — |
| Nursing/human-factors lead | Unassigned | Pending | — |
| Quality lead | Unassigned | Pending | — |
