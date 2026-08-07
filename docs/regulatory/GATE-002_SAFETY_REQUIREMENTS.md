# GATE-002 — Safety requirements approved

| Field | Value |
| --- | --- |
| Gate | G2 — safety requirements approved |
| Status | Open — not approved; G0 and G1 dependencies remain open |
| Primary owners | Pharmacy, software and quality leads (unassigned) |
| Required reviewers | Nursing/human factors, security/privacy and independent verifier |
| Record version/date | 0.1 / 2026-08-07 |

This record inventories the Step 2 proposals and their unresolved decisions. It
does not authorize installing dependencies, implementing the calculation or
storage designs, claiming a risk acceptable, or treating planned verification
as executed evidence.

## Required records

| Record | Review state | Blocking work |
| --- | --- | --- |
| `CALC-001_NUMERIC_SPECIFICATION.md` | Draft | Approve 12 decisions, every numeric bound, exact representation, display/rounding policy, formula corpus and clinical rationale. |
| `RMF-001_PRELIMINARY_RISK_MANAGEMENT.md` | Draft | Approve the method/scales/acceptability criteria, hazard severities and control set; probability and residual/overall risk remain unassessed. |
| `STO-001_LOCAL_DATA_SPECIFICATION.md` | Draft | Decide feature inclusion, schemas/technology, retention, quarantine, deletion, migration/rollback and privacy controls. |
| `SEC-001_SECURITY_AND_PRIVACY_PLAN.md` | Draft | Approve the host/device matrix, CSP, update/rollback, provenance/SBOM, incident targets and institution-specific privacy work. |
| `DEV-001_TOOLING_DECISION.md` | Draft | Run and review the compatibility spike, exact locks/configuration/reports and licence/security evidence; approve nine decisions. |
| `VVP-001_VERIFICATION_PLAN.md` | Draft | Approve exact environments, case/property counts, oracle, evidence repository/retention, formal scope and independent personnel. |

## Dependency and consistency checks

| Check | Current result | Gate effect |
| --- | --- | --- |
| G0 controlled prototype | `GATE-000` remains open | Blocks G2 |
| G1 product definition | `GATE-001` remains open | Blocks G2 and clinical scope decisions |
| Unit scope | All Step 2 drafts use only `mg`/`mcg` and reject activity/unknown units | Consistent proposal; approval pending |
| Multi-vial scope | CALC/RMF/STO/VVP treat it as unsupported/rejected, not implemented | Consistent proposal; clinical/HF approval pending |
| Exact arithmetic | CALC proposes bounded decimal inputs and normalized rational results; DEV proposes TypeScript; VVP defines independent/formal checks | Representation limits and compatibility evidence pending |
| Positive-never-zero | CALC/RMF/VVP make this a blocking invariant/regression | Display thresholds/rounding and implementation pending |
| Local data | STO treats source inputs as authoritative and derived output as recomputed | Favourites/history and migration/retention decisions pending |
| Network/offline | SEC defines deny-by-default runtime and atomic digest-bound app-shell lifecycle | Host/device policy and implementation evidence pending |
| Dependency provisioning | JavaScript remains under `package.json`/lockfile; a locked Nix shell and Lean 4.30.0 formal build now execute locally/CI | Formal spike present; Node exact pin, licences/security, tool/corpus independence and G2 approval pending |
| Verification commands | DEV/VVP define proposed commands and identify every currently hypothetical command | Scripts/config/dependencies are intentionally not installed before approval |
| Risk traceability | TRC-001 names the preliminary RMF controls and planned verification | Initial/incomplete; must close at G7 |

## Human decision packet

G2 reviewers must resolve at least:

1. exact patient/medication/care-setting/preparation scope inherited from G1;
2. input/output digit, scale, magnitude and measurable-volume bounds;
3. exact rounding, trailing-zero, below-threshold and error-presentation policy;
4. formula, one-vial/final-volume assumptions and independent golden corpus;
5. risk-estimation scales, severity rationales, acceptability matrix and owners;
6. favourites/history inclusion, data fields, retention, storage technology,
   quarantine, deletion and migration/rollback behavior;
7. supported devices/browsers, controlled host/channel, CSP/headers,
   app-shell update/rollback and institution-specific privacy/security controls;
8. exact TypeScript/test/lint/format/coverage packages and configuration after a
   clean compatibility spike, including Node/npm/Nix and lockfile evidence;
9. verification environments, case/property counts, independent oracle and
   verifier, formal-method scope, reports and retention; and
10. every resulting change to SYS-001, RMF-001 and TRC-001.

## Exit criteria

G2 closes only when G0/G1 are closed, every Step 2 decision is explicit, the
six records agree with one another and SYS-001, no clinical value is still
`TBD`, the tooling commands/configuration have been demonstrated rather than
remaining hypothetical, traceability is reviewed, and every required approver
signs the exact commit. Approval authorizes controlled implementation work; it
does not close G3–G10 or authorize patient care.

## Approval record

| Role | Name | Decision | Date/signature | Approved commit |
| --- | --- | --- | --- | --- |
| Legal manufacturer | Unassigned | Pending | — | — |
| Pharmacy lead | Unassigned | Pending | — | — |
| Software lead | Unassigned | Pending | — | — |
| Quality lead | Unassigned | Pending | — | — |
| Nursing/human-factors lead | Unassigned | Pending | — | — |
| Security/privacy lead | Unassigned | Pending | — | — |
| Independent verifier | Unassigned | Pending | — | — |
