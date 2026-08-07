# BASE-001 — Prototype baseline record

| Field | Value |
| --- | --- |
| Record ID | BASE-001 |
| Status | Draft |
| Owner | Software lead (unassigned) |
| Required approver | Quality lead (unassigned) |
| Record version | 0.1 |
| Record date | 2026-08-07 |
| Effective date | Not effective; approval pending |

## Fixed revisions

| Purpose | Revision | Meaning |
| --- | --- | --- |
| Legacy review baseline | `3b4b63bebdf3e7c0412b7716db45b6f03887fcde` | Revision examined by `CODEX_REVIEW.md` and `CLAUDE_REVIEW.md`; retained for reproducibility. |
| Authorization branch base | `552fa8236480e8fa2f850850eeb513bd98a512c9` | Main revision from which `agent/authorization-plan` was created. |
| First controlled-plan commit | `550f52a22ddc63eb4d0b79828334d4b27473b828` | Adds `CALCULATION_ENGINE_PLAN.md` alone. |
| Package version at branch base | `0.1.0` | Value in `package.json`; not the proposed classification version. |

The proposed classification reference version remains
`0.2.0-classification`. It has not been built, verified or released.

## Build identity rule

Production and preview builds must receive the full source revision through
`DOSAGE_GIT_HASH`. `vite.config.js` exposes the first seven characters in the
UI and includes them in the service-worker cache name. A build made in a Git
checkout may derive the same short revision from `HEAD`. E2E builds deliberately
use `e2eha5h`; they are test fixtures and must not be submitted as release
evidence.

For every candidate reference build, the software lead must retain:

1. the full source commit;
2. the displayed seven-character revision and `package.json` version;
3. the CI run and immutable build-artifact digest;
4. the build configuration, base path and dependency lockfile; and
5. the verification result tied to that artifact.

No candidate reference build exists yet. Its row must be added here before G7.

## Change boundary

Until the classification request is sent, feature additions are frozen beyond
the defined mg/mcg, one-vial calculation, favourites, history, and installed
offline app-shell scope. Remediation, controlled documentation, verification,
security work and accessibility work may proceed through reviewed commits.
Additional units, calculations, integrations or clinical claims require formal
scope approval and reopening of the affected records.

## Approval

| Role | Name | Decision | Date/signature |
| --- | --- | --- | --- |
| Software lead | Unassigned | Pending | — |
| Quality lead | Unassigned | Pending | — |
