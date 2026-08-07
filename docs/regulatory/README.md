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

The next controlled-document phase is G1. No G1 record may imply that G0 is
closed while `GATE-000_CONTROLLED_PROTOTYPE.md` remains open.
