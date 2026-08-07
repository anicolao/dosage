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

## Current records

| Record | Status | Purpose |
| --- | --- | --- |
| `BASE-001_PROTOTYPE_BASELINE.md` | Draft | Fix the reviewed legacy and current prototype baselines. |
| `DST-001_PROTOTYPE_DISTRIBUTION.md` | Draft | Inventory public prototype access and distribution controls. |
| `FND-001_OPEN_FINDINGS.csv` | Draft/open | Track review findings to verified disposition. |
| `IP-000_CONTRIBUTOR_AND_ASSET_INVENTORY.md` | Draft/open | Establish the initial authorship and asset inventory for counsel. |
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
| `classification-request/README.md` | Draft/not submission ready | Index the controlled `00`–`09` classification-request source templates. |
| `classification-request/GATE-009_DOSSIER_AUDIT.md` | Open | Require an independent exact-package audit and manufacturer approval before sending. |
| `classification-request/COR-001_CLASSIFICATION_CORRESPONDENCE_LOG.md` | Draft/open | Control submission-day routing, delivery evidence and Health Canada correspondence. |

G1 records are drafted for review, but no G1 record may imply that G0 is closed
while `GATE-000_CONTROLLED_PROTOTYPE.md` remains open. G2 specifications must
not be approved until both gates are legitimately closed. Classification-request
sources are planning scaffolds only: they cannot be finalized until the required
upstream gates and G9 audit are complete.
