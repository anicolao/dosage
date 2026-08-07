# GATE-007 — Verified classification reference build

> **DRAFT — G7 OPEN — NO CONTROLLED TEST EXECUTION OR APPROVAL RECORDED.**

| Field | Value |
| --- | --- |
| Gate | G7 — verified classification reference build |
| Status | Open — dependencies and verification incomplete |
| Primary owner | Quality lead `[TBD]` |
| Target version | `0.2.0-classification` (proposed) |
| Gate-record version/date | `[TBD]` / 2026-08-07 |
| Exact source commit / immutable tag | `[TBD]` / `[TBD]` |
| Exact artifact / SHA-256 | `[TBD]` / `[TBD]` |
| Approved VVR-001 / archive SHA-256 | `[TBD]` / `[TBD]` |

Closing G7 means that one exact build satisfies the approved verification plan
and traceability criteria. It does not approve patient care, classification,
market access, final labelling or G8/G9.

## Entry evidence

| Entry criterion | Required exact evidence | Status |
| --- | --- | --- |
| G3 calculation engine verified | Signed GATE-003 record, commit and evidence hashes `[TBD]` | Open |
| G4 storage/state controls verified | Signed GATE-004 record, commit and evidence hashes `[TBD]` | Open |
| G5 interface/accessibility baseline verified | Signed GATE-005 record, commit and evidence hashes `[TBD]` | Open |
| G6 security/availability build candidate verified | Signed GATE-006 record, commit and evidence hashes `[TBD]` | Open |
| VVP-001 and all acceptance criteria approved | Approved document revision/hash/signatures `[TBD]` | Open |
| Requirements, risks, specifications and findings baselined | Approved SYS/RMF/CALC/STO/SEC/FND revisions and hashes `[TBD]` | Open |
| Clean immutable checkout and locked environment | Source/tag, clean-status evidence, lock/Nix/CI hashes `[TBD]` | Open |
| Approved corpus/oracles/configuration and anomaly register | Manifest/revision/hash and approvals `[TBD]` | Open |
| Quality authorization and independent personnel assigned | Named authorization/signatures `[TBD]` | Open |

## Exit evidence

| Exit criterion | Required exact evidence | Status |
| --- | --- | --- |
| Full Step 7 command sequence completed successfully | VVR-001 result IDs, logs and SHA-256 values `[TBD]` | Not run |
| Approved device/browser/viewport/zoom/AT matrix completed | Environment/results manifest `[TBD]` | Not run |
| Calculation/error/property/formal obligations completed or approved disposition recorded | VVR/TRC evidence `[TBD]` | Not run |
| Review reset and all critical workflow states verified | VVR/TRC evidence `[TBD]` | Not run |
| Storage schema/migration/quarantine/retention/idempotency verified | VVR/TRC evidence `[TBD]` | Not run |
| Exact zero-application-network contract verified on all paths | VVR/TRC evidence `[TBD]` | Not run |
| Offline install/reopen/update/rollback/eviction/recovery verified | VVR/TRC evidence `[TBD]` | Not run |
| Accessibility, keyboard, focus and representative-use evidence complete | VVR/TRC evidence `[TBD]` | Not run |
| Warning/version/intended-use/limitations accessible and correct | Frozen UI/label hashes and VVR evidence `[TBD]` | Not run |
| Every result mapped in TRC-001 and traceability closed | TRC revision/hash and reconciliation `[TBD]` | Open |
| No unresolved critical/high anomaly; all others approved | Anomaly register/review hashes `[TBD]` | Open |
| VVR-001 conclusion independently approved | Signed report and archive hash `[TBD]` | Open |

## Immutable evidence manifest

| Item | Identity/location | SHA-256 | Retention/integrity verification |
| --- | --- | --- | --- |
| Source snapshot/tag | `[TBD]` | `[TBD]` | `[TBD]` |
| Primary and non-root build artifacts | `[TBD]` | `[TBD]` | `[TBD]` |
| Lockfiles, environment and test-input manifest | `[TBD]` | `[TBD]` | `[TBD]` |
| VVR-001 and raw verification archive | `[TBD]` | `[TBD]` | `[TBD]` |
| TRC-001 and anomaly/finding records | `[TBD]` | `[TBD]` | `[TBD]` |
| SBOM/audit/security evidence | `[TBD]` | `[TBD]` | `[TBD]` |
| Screenshots/traces/accessibility/HF records | `[TBD]` | `[TBD]` | `[TBD]` |

## Gate decision and signatures

**Decision:** Open. `[TBD — APPROVE / REJECT only after every entry/exit row is
supported by immutable evidence.]`

| Role | Name | Decision | Date/signature | Approved commit/artifact/report hashes |
| --- | --- | --- | --- | --- |
| Quality lead | `[TBD]` | Pending | `[TBD]` | `[TBD]` |
| Independent verifier | `[TBD]` | Pending | `[TBD]` | `[TBD]` |
| Pharmacy lead | `[TBD]` | Pending | `[TBD]` | `[TBD]` |
| Security/privacy lead | `[TBD]` | Pending | `[TBD]` | `[TBD]` |
| Nursing/human-factors lead | `[TBD]` | Pending | `[TBD]` | `[TBD]` |
| Software lead | `[TBD]` | Pending | `[TBD]` | `[TBD]` |

## Reopening rule

Reopen G7 before relying on its evidence after any code, dependency, build,
configuration, test/oracle, supported-environment, intended-use or safety-label
change that may affect the result. Record impact assessment, assign a new
source/build/artifact identity, rerun all affected verification, retain prior
and new evidence, update TRC-001/VVR-001, and obtain fresh approvals. A green
ordinary CI run does not reclose this gate.

