# Regulatory record index

These records implement the sequence in `AUTHORIZATION_PLAN.md`. They are
controlled drafts for review; they are not evidence of Health Canada approval,
permission for patient care, or completion of any authorization gate.

## Control rules

- A document marked **Draft** has not been approved.
- A gate remains **Open** until every required approver is named and signs the
  revision identified in that gate record.
- Blank approver or signature fields must not be interpreted as approval.
- Repository commits preserve revisions; an approved record must identify its
  exact commit and any referenced build hash.
- Findings may be closed only with objective verification evidence and quality
  approval. A code commit by itself does not close a finding.
- The three source reviews remain unchanged design inputs:
  `CLAUDE_REVIEW.md`, `CODEX_REVIEW.md`, and `CANADIAN_REGULATIONS.md`.

## Structured execution records

The prose records in this directory define procedures, rationale and required
evidence. They are not filled in directly for execution. The controlled,
fillable sources are YAML under `records/data/`; deterministic Markdown for
review is generated under `completed/`.

```text
npm run regulatory:build
npm run regulatory:check
npm run regulatory:ready -- --record RECORD-ID
npm run regulatory:commit -- "Describe the completed evidence or decision"
npm run regulatory:screenshots
npm run regulatory:facts
npm run regulatory:sources
npm run regulatory:submission
```

`regulatory:build` validates each YAML record against
`records/record.schema.json`, renders it through a version-controlled Mustache
template, and writes the generated record, completeness index and SHA-256
manifest. Null required values render as conspicuous `MISSING` markers.
`regulatory:ready` fails until the selected records contain required evidence,
decisions and approvals and are marked approved. `regulatory:commit` refuses
pre-existing staged files, regenerates/checks the package, and stages only the
YAML sources and `completed/` outputs.

Git records who changed the YAML and generated output; it is not itself a legal
or quality signature. Signature references must identify evidence held in the
approved record system. Do not commit privileged, personal or sensitive source
evidence merely to satisfy a reference field.

The evidence commands remove repeatable manual preparation:

- `regulatory:screenshots` rebuilds the frozen prototype, captures the SUB-002
  workflow in Playwright and regenerates screenshot/artifact hashes;
- `regulatory:facts` verifies that controlled application paths still equal the
  inquiry baseline, creates the deterministic executable ZIP and derives the
  source, claims, interfaces and worked-example evidence; and
- `regulatory:sources` fetches the official Health Canada/regulations sources,
  records response hashes and runs the defined MDALL keyword searches. It uses
  the actual access date and must be rerun on the submission day.

`completed/HUMAN_ACTIONS.md` is generated from all remaining early-inquiry
blanks and unaccepted evidence. It is the current checklist for identities,
professional decisions, evidence acceptance, signatures and external events.
`regulatory:submission` runs all three evidence refreshes, updates the
source-derived YAML fields, rebuilds the completed documents and checks drift.
Because it records the real official-source access date, run it immediately
before the IQ-002 submission-day review and commit all resulting controlled
changes.

## Exact-prototype inquiry path

The immediate classification inquiry describes package version `0.1.0` at
source commit `6b53fde87ff9b193b3c24f7bd93549746b4d6471` exactly as implemented,
including its known defects and unclosed clinical-release controls. It neither
authorizes patient care nor claims validation. Its execution order is:

```text
G0-01 and accountable role appointments
  → INQ-000
    → IQ-001
      → SUB-000 through SUB-009
        → IQ-002
          → COR-002
```

The `GATE-000` through `GATE-010` YAML records govern the separate, later
clinical-release programme. They do not have to be closed before IQ-002. The
product feature boundary remains the current prototype: no new clinical logic,
integration, cloud, AI or automation is silently added. Safety corrections may
change defective input, arithmetic, display, persistence or lifecycle behavior
only under documented classification-impact control.

## Current records

| Record | Status | Purpose |
| --- | --- | --- |
| `BASE-001_PROTOTYPE_BASELINE.md` | Draft | Fix the reviewed legacy and current prototype baselines. |
| `DST-001_PROTOTYPE_DISTRIBUTION.md` | Draft | Inventory public prototype access and distribution controls. |
| `FND-001_OPEN_FINDINGS.csv` | Draft/open | Track review findings to verified disposition. |
| `IP-000_CONTRIBUTOR_AND_ASSET_INVENTORY.md` | Draft/open | Establish the initial authorship and asset inventory for counsel. |
| `G0-01_LEGAL_MANUFACTURER_IDENTITY_AND_SIGNATORY_AUTHORITY.md` | Template/unexecuted | Record official manufacturer identity, responsibility and attributable signatory authority for G0-01. |
| `G0-02_ROLE_AUTHORITY_AND_COMPETENCE.md` | Template/unexecuted | Appoint and assess the quality and software leads, including authority, competence and independence evidence for G0-02. |
| `G0-03_CONTRIBUTOR_AND_ASSET_PROVENANCE.md` | Template/unexecuted | Reconcile contributors, history, source, assets and factual rights-basis evidence for G0-03 and later counsel review. |
| `GATE-000_CONTROLLED_PROTOTYPE.md` | Open | Record the evidence and approvals required to close G0. |
| `REG-001_PRODUCT_DEFINITION.md` | Draft | Define the bounded classification reference product. |
| `REG-002_INTENDED_USE_AND_CLAIMS.md` | Draft | Control intended use, limitations, warning and claims. |
| `REG-003_CLASSIFICATION_QUESTION.md` | Draft | Frame the four-factor analysis and fallback questions. |
| `IP-001_OWNERSHIP_AND_LICENSING.md` | Draft/blocking | Prepare the rights and GPL analysis for counsel. |
| `SYS-001_SYSTEM_REQUIREMENTS.md` | Draft | Number proposed user, safety and lifecycle requirements. |
| `ARC-001_ARCHITECTURE_AND_DATA_FLOW.md` | Draft | Describe components, trust boundaries and data flow. |
| `TRC-001_TRACEABILITY_MATRIX.csv` | Initial/open | Link preliminary hazards to requirements and planned evidence. |
| `GATE-001_PRODUCT_DEFINITION.md` | Open | Record the decisions and approvals required to freeze G1. |
| `CALC-001_NUMERIC_SPECIFICATION.md` | Draft/blocking | Propose numeric grammar, exact arithmetic, formula, display and corpus decisions. |
| `RMF-001_PRELIMINARY_RISK_MANAGEMENT.md` | Draft/blocking | Define the preliminary method, hazards, controls and risk-decision gaps. |
| `STO-001_LOCAL_DATA_SPECIFICATION.md` | Draft/blocking | Propose local schemas, recomputation, migration, retention and recovery. |
| `SEC-001_SECURITY_AND_PRIVACY_PLAN.md` | Draft/blocking | Propose network, delivery, supply-chain, lifecycle and privacy controls. |
| `DEV-001_TOOLING_DECISION.md` | Draft/blocking | Propose TypeScript/test tooling and the npm/Nix provisioning boundary. |
| `VVP-001_VERIFICATION_PLAN.md` | Draft/blocking | Define prospective verification, evidence, independence and anomaly rules. |
| `GATE-002_SAFETY_REQUIREMENTS.md` | Open | Reconcile Step 2 records and list every decision required to approve G2. |
| `QMS-001_CHANGE_ANOMALY_AND_RELEASE_CONTROL.md` | Draft/blocking | Propose classification-build change, anomaly, verification-run and release controls; clinical post-market procedures remain open. |
| `HUM-001_REQUIRED_ROLES_AND_DECISIONS.md` | Draft/open | Order the named human, clinical, legal, quality and independent decisions needed to close G0–G10. |
| `WRK-001_REMAINING_AUTHORIZATION_WORK.md` | Draft/open | Consolidate every remaining gate, formal-conformance, dossier and clinical-release work item after the Lean implementation. |
| `GATE-003_CALCULATION_IMPLEMENTATION.md` | Open | Define exact calculation-engine implementation, verification, independence and anomaly evidence required at G3. |
| `GATE-004_TRUSTED_STATE_BOUNDARIES.md` | Open | Define exact storage, migration, recomputation, privacy and state-transition evidence required at G4. |
| `GATE-005_REPRESENTATIVE_INTERFACE.md` | Open | Define interface, accessibility, representative-nurse, screenshot and review evidence required at G5. |
| `GATE-006_CONTROLLED_REFERENCE_BUILD.md` | Open | Define security, SBOM, provenance, CI, offline lifecycle and delivery-boundary evidence required at G6. |
| `VVR-001_VERIFICATION_REPORT.md` | Draft/not executed | Provide the exact-build result, environment, evidence, anomaly, traceability and independent-review structure for G7. |
| `GATE-007_VERIFIED_REFERENCE_BUILD.md` | Open | Define controlled-run, evidence-archive, traceability and verification approvals required at G7. |
| `GATE-008_DOSSIER_BASELINE.md` | Open | Define the immutable source/artifact/evidence/bilingual-label freeze required at G8. |
| `LBL-001_DRAFT_LABEL_AND_IFU.md` | Draft/untranslated | Structure exact-build English/French classification labelling and clinical-review controls without supplying unapproved safety text. |
| `REL-001_CLASSIFICATION_RELEASE_MANIFEST.md` | Draft/empty | Structure source, dependency, artifact, SBOM, evidence, label and package hashes for the future G8 baseline. |
| `classification-request/README.md` | Draft/not submission ready | Index the controlled `00`–`09` classification-request source templates. |
| `classification-request/GATE-009_DOSSIER_AUDIT.md` | Open | Require an independent exact-package audit and manufacturer approval before sending. |
| `classification-request/COR-001_CLASSIFICATION_CORRESPONDENCE_LOG.md` | Draft/open | Control submission-day routing, delivery evidence and Health Canada correspondence. |
| `records/data/inquiry/*.yaml` | Incomplete/fillable | Control the exact prototype baseline, early inquiry gates and correspondence log. |
| `records/data/submission/*.yaml` | Incomplete/fillable | Populate the `SUB-000`–`SUB-009` early classification package. |
| `records/data/gates/*.yaml` | Incomplete/fillable | Populate G0 support records and the G0–G10 clinical-release gates. |
| `completed/` | Generated/not ready | Deterministic review copies, completeness index and source/template/output hash manifest. |

G1 records are drafted for review, but no G1 record may imply that G0 is closed
while `GATE-000_CONTROLLED_PROTOTYPE.md` remains open. G2 specifications must
not be approved until both gates are legitimately closed. The legacy
`classification-request/` Markdown scaffolds are superseded for early-inquiry
execution by the structured records. G9/G10 apply only to a future formal
clinical-release/licence dossier; IQ-002 and COR-002 control the early inquiry.
