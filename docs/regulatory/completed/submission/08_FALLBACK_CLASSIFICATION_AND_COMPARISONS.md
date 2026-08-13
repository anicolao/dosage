# SUB-008 — Fallback classification, comparisons and prior correspondence

> **INCOMPLETE / NOT APPROVED — GENERATED CLASSIFICATION-INQUIRY DOCUMENT.** This is not
> authorization, licensing, clearance, or permission for patient care. Edit
> `docs/regulatory/records/data/submission/SUB-008.yaml`; do not edit this generated file.

| Package control | Value |
| --- | --- |
| Document ID | `SUB-008` |
| Revision | 0.1 |
| Document status | **INCOMPLETE / NOT APPROVED** |
| Package readiness | **NOT READY** |
| Exact prototype baseline | `6b53fde87ff9b193b3c24f7bd93549746b4d6471` |
| Structured source / SHA-256 | `docs/regulatory/records/data/submission/SUB-008.yaml` / `72809972f99ed7e4c07856c0931a306ec09afcacc980964f33e068dffa709c60` |
| Template / SHA-256 | `docs/regulatory/records/templates/submission.md.mustache` / `e8ca736dd37df3c77076e5355d01d1dcf34927304e42b852884b2fca7e14decd` |

Manufacturer's proposed classification if Health Canada considers the exact prototype SaMD, together with published-example, MDALL and prior-decision comparisons. It asks for verification rather than presupposing the outcome.

## Package fields

| ID | Field | Value | Evidence | State |
| --- | --- | --- | --- | --- |
| `FAL-F01` | Proposed SaMD class and current Schedule 1 rule(s) | Conservative planning proposal pending regulatory authorization: Class III under Rule 10(2) if Health Canada considers the output to drive management in critical situations with immediate danger; evaluate Class II under Rule 10(1) for serious situations and Class I fallback Rule 12 if only informing and Rule 10 does not apply | HC SaMD guidance Table 2; MDR Schedule 1; REG-003 | Complete |
| `FAL-F02` | Significance of information and healthcare situation category | Conservative proposal pending clinical/regulatory authorization: drive clinical/patient management; potentially critical because exact prototype code does not enforce medication, patient, acuity or setting restrictions and an erroneous result may create immediate danger | SUB-001; SUB-005; HC SaMD guidance sections 2.3.1–2.3.2 | Complete |
| `FAL-F03` | Current MDALL/comparable Canadian product search date and method | 2026-08-13 automated active-licence-name API searches (dosage=0, dose calculator=0, dosing calculator=0, medication calculator=0, drug dosing=0, infusion calculator=0, dilution=4). “Dilution” matches: ARK METHOTREXATE DILUTION BUFFER, licence 86613, Class 2; PULMONARY ARTERY MONITORING AND THERMODILUTION CATHETERS, licence 14294, Class 4; HANDS-OFF THERMODILUTION CATHETERS, licence 2085, Class 4; BALLOON THERMODILUTION CATHETERS, licence 2087, Class 4. See manifest limitations. | docs/regulatory/evidence/OFFICIAL-SOURCES/MANIFEST.json; refresh with npm run regulatory:sources on the submission day | Complete |
| `FAL-F04` | Prior Canadian classification/correspondence inventory | No prior Health Canada classification response is present in the controlled repository. The legal manufacturer/regulatory lead must confirm whether any off-repository correspondence exists before approval. | Repository documentation search; COR-002; manufacturer/regulatory approval below | Complete |

## 1. Conservative fallback analysis

The mL output may drive immediate medication preparation and an erroneous result could contribute to serious injury or death. The prototype does not select a medication/dose or diagnose a condition. The manufacturer must analyze current Rules 10(1), 10(2), 12 and any other applicable rule and apply Health Canada's significance/situation framework to the exact submitted user, setting and exclusions. Class III remains a planning possibility for critical use unless a current reviewed analysis supports another route.

## 2. Published-example comparison

Compare the exact prototype with Health Canada's non-device example for drug dosing calculated from manually entered drug-label parameters where the calculation is independently reviewable. Distinguish the prototype's administration-volume output, immediate-preparation context, final-volume selection, local records and known implementation limitations.

## 3. Similar products and prior decisions

The recorded MDALL licence-name searches found no active entry for six calculator/dosing terms. Four “dilution” hits were a methotrexate dilution buffer and thermodilution catheters, not name-identified comparable medication-calculation software. MDALL omits Class I devices and keyword names do not establish technical equivalence, so the result is supporting search evidence rather than a conclusion. No prior Health Canada decision was found in this repository; the manufacturer must disclose any held outside it.

## Classification decisions represented

| ID | Question | Position/decision | Rationale | Evidence | State |
| --- | --- | --- | --- | --- | --- |
| `FAL-D01` | Is the proposed fallback class/rule supported by current official material and the same facts used in the exclusion analysis? | ⟦MISSING: SUB-008.decisions.FAL-D01.decision⟧ | ⟦MISSING: SUB-008.decisions.FAL-D01.rationale⟧ | ⟦MISSING: SUB-008.decisions.FAL-D01.evidence_ref⟧ | Open |

## Supporting evidence

| ID | Evidence | Reference | Status | State |
| --- | --- | --- | --- | --- |
| `FAL-E01` | Current official guidance/regulations source identities and draft classification analysis | docs/regulatory/evidence/OFFICIAL-SOURCES/MANIFEST.json; REG-003_CLASSIFICATION_QUESTION.md | draft | Open |
| `FAL-E02` | MDALL comparator and repository prior-correspondence search record | docs/regulatory/evidence/OFFICIAL-SOURCES/MANIFEST.json; README.md; COR-002 | reviewed | Open |

## Review and authorization

| Role | Review scope | Name / organization | Decision | Date | Signature reference | State |
| --- | --- | --- | --- | --- | --- | --- |
| Regulatory lead or qualified Canadian regulatory reviewer | Approve fallback rule/class and comparator analysis | ⟦MISSING: SUB-008.approvals.1.name/organization⟧ | ⟦MISSING: SUB-008.approvals.1.decision⟧ | ⟦MISSING: SUB-008.approvals.1.date⟧ | ⟦MISSING: SUB-008.approvals.1.signature_ref⟧ | Open |
| Legal manufacturer | Adopt the fallback proposal and authorize Health Canada verification | ⟦MISSING: SUB-008.approvals.2.name/organization⟧ | ⟦MISSING: SUB-008.approvals.2.decision⟧ | ⟦MISSING: SUB-008.approvals.2.date⟧ | ⟦MISSING: SUB-008.approvals.2.signature_ref⟧ | Open |

## Document determination

**NOT READY**

The conservative fallback proposal, current official-source capture, MDALL search and repository correspondence inventory are drafted. A qualified Canadian regulatory reviewer and legal manufacturer must validate the rule, class, clinical category, comparators and any off-repository correspondence.

Required items still open:

- `SUB-008.approvals.1.date`
- `SUB-008.approvals.1.decision`
- `SUB-008.approvals.1.name`
- `SUB-008.approvals.1.organization`
- `SUB-008.approvals.1.signature_ref`
- `SUB-008.approvals.2.date`
- `SUB-008.approvals.2.decision`
- `SUB-008.approvals.2.name`
- `SUB-008.approvals.2.organization`
- `SUB-008.approvals.2.signature_ref`
- `SUB-008.decisions.FAL-D01.decision`
- `SUB-008.decisions.FAL-D01.evidence_ref`
- `SUB-008.decisions.FAL-D01.rationale`
- `SUB-008.evidence.FAL-E01.status`
- `SUB-008.evidence.FAL-E02.status`
- `SUB-008.status`
