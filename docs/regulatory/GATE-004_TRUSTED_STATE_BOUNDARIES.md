# GATE-004 — Trusted state boundaries

| Field | Value |
| --- | --- |
| Gate | G4 — trusted state boundaries |
| Status | **Open — not approved; G0, G1 and G2 remain open; G3 domain dependency unavailable** |
| Primary owner | Software lead (unassigned) |
| Required approvers | Software lead, security/privacy lead and quality lead |
| Required reviewers | Pharmacy lead, nursing/human-factors lead and independent software/storage reviewer (all unassigned) |
| Controlled record revision | `[TBD — exact commit containing approved record]` |
| Record version/date | 0.1 / 2026-08-07 |
| Effective date | None |

This is the prospective decision record for AUTHORIZATION_PLAN.md Step 4. It
does not approve the current `localStorage` arrays or the unapproved STO-001
proposal. Creating schemas, migrating records, landing a code commit, receiving
pull-request approval or obtaining green CI cannot close G4. Closure requires
the exact controlled inputs, candidate identity, objective evidence, clinical/
privacy decisions, anomaly disposition and attributable signatures below.

Closing G4 verifies the local persistence and state-transition trust boundaries
for one reference candidate. It does not certify privacy-law compliance at an
institution, validate the complete interface, close G5–G10 or authorize patient
care.

## 1. Gate candidate identity

| Controlled field | Required value/evidence | Current state |
| --- | --- | --- |
| G2 approval | Signed `GATE-002_SAFETY_REQUIREMENTS.md` and exact approved commit | Missing; G2 open |
| G3 domain dependency | Exact G3 candidate/approved typed parser, units, calculation and result interfaces used for recomputation | Missing; G3 open |
| G4 candidate source | Full Git commit and clean-worktree record | Not assigned |
| Package/build identity | Package version, displayed revision, lockfile and build/configuration digests | Not assigned |
| Storage specification | Approved STO-001 version/commit and frozen storage profile | Draft/open |
| Security/privacy inputs | Approved SEC-001 version plus privacy data-flow and managed-device assumptions | Draft/open |
| Verification inputs | Approved VVP-001 storage corpus, environments and expected outcomes | Draft/open |
| Migration fixtures | Immutable legacy/current/future schema fixtures and their provenance | Not assigned |
| Evidence bundle | Immutable location/digest for reports, reviews and anomaly records | Not assigned |

The G3 and G4 candidates may be developed in overlapping branches after G2 if
the typed domain interfaces are controlled. G4 cannot close until the exact
engine used for stored-record validation/recomputation is closed at G3, or G3
and G4 are signed together for the same compatible candidate. A later G3 change
invalidates affected G4 evidence.

## 2. Exact entry criteria

| ID | Entry criterion | Required evidence | Status |
| --- | --- | --- | --- |
| G4-EN-01 | G0 and G1 are signed and the feature set explicitly includes the approved favourites/history behavior. | Signed GATE-000/GATE-001, REG-001 and SYS-001 revisions | Blocking — open |
| G4-EN-02 | G2 is signed with every STO-001 decision resolved: fields, storage technology, retention, quarantine, deletion, legacy removal, equation-version and privacy/security profile. | Signed GATE-002/STO-001; no open storage decision | Blocking — open |
| G4-EN-03 | CALC-001 and the controlled Step 3 domain types define the parser, units, result and equation-version interface used at storage boundaries. | Approved CALC-001 and exact G3 interface revision | Blocking — absent |
| G4-EN-04 | SYS-001 STO-001–006, PRV-001–002 and REV-003–005 agree with RMF controls RC-STO-01/02, RC-REV-02 and hazards HZ-003/004/010/013. | Approved consistency/traceability review | Blocking — draft |
| G4-EN-05 | DEV-001/VVP-001 approve exact typed-schema/test tools, browser environments, fixtures, failure injection, reports and anomaly handling. | Signed records and controlled test corpus | Blocking — draft |
| G4-EN-06 | The security/privacy owner has approved the data inventory, potentially sensitive classification, device/host boundary and encryption/MDM decision used by the candidate. | SEC-001/STO-001 decision records and privacy review | Blocking — open |
| G4-EN-07 | Software implementer, independent software/storage reviewer and required clinical/HF reviewers are named and competent. | Role/competency/independence records | Blocking — unassigned |
| G4-EN-08 | Legacy data fixtures are preserved as controlled test inputs and no prototype record is represented as patient-care evidence. | Fixture inventory, provenance and de-identification review | Not established |

Implementation shall not fill an open retention, migration, encryption or
clinical-necessity decision with a developer default. Any controlled input
change requires impact assessment and affected reapproval.

## 3. Required trusted-boundary implementation

| ID | Required implementation outcome | Traces to |
| --- | --- | --- |
| G4-IM-01 | Favourite/history data pass only through typed schema and repository modules. UI/domain code has no direct browser-storage access and untrusted stored JSON enters as `unknown`. | STO-001; DEV-001; ARC-001 |
| G4-IM-02 | Every record has the exact allowlisted fields and approved `schemaVersion`, applicable `equationVersion`, bounded original decimal strings, closed units, supported final volume, canonical timestamp and stable identifiers. Missing, extra, wrong-type or oversized fields fail closed. | SYS STO-001; STO-001 sections 3–6 |
| G4-IM-03 | Favourites never contain/restore ordered dose, final volume, calculated result, review state or acknowledgement. History stores only approved authoritative source inputs and version metadata. | REV-004; REV-005; STO-002 |
| G4-IM-04 | Persisted derived concentration, converted value, equation or administration volume is ignored/discarded. All list/detail/reopen output is validated and recomputed from admitted sources under an approved equation-version policy. | STO-002; RC-STO-02 |
| G4-IM-05 | Each record is validated independently. One invalid, corrupt, unknown, legacy-incompatible or future record becomes non-actionable/quarantined according to STO-001 while unrelated valid records and new calculation remain available. | STO-003; RC-STO-01; HZ-004 |
| G4-IM-06 | Missing, malformed, unavailable, quota-exhausted, transaction-aborted, future-version, partially recovered and empty storage return distinguishable typed states. None is silently converted to an empty successful collection. | STO-003/004/006; HZ-013 |
| G4-IM-07 | Each approved schema/equation migration is transactional where supported, record-independent, idempotent and verified before its completion marker/source removal. Failure preserves the safe source state and cannot partially expose migrated data. | STO-004; STO-001 section 7 |
| G4-IM-08 | Legacy `dosage.favourites.v2` and `dosage.history.v2` data are read without initial mutation, validated per item, migrated from source facts only, recomputed, read back and disposed under the approved rollback/privacy interval. | STO-001 section 7.1; FND-H1 |
| G4-IM-09 | Unknown/future schema or equation versions cannot become actionable. Supported older versions follow their specifically approved migrate/read-only/delete policy; no old engine is downloaded dynamically. | STO-003/004; SEC-001 |
| G4-IM-10 | One completed equation review receives one stable save identity and a transactional uniqueness constraint. Double tap/retry is idempotent; success resets/disables acknowledgement/save. A later edit/re-review creates a new review state. | AUTHORIZATION_PLAN 4.6; REV-003 |
| G4-IM-11 | Approved record/age caps are applied transactionally and deterministically. Retention handles invalid/backwards device time per STO-001 and never claims successful save after quota/cap failure. | STO-004; HZ-010 |
| G4-IM-12 | Record deletion and clear-all use the approved confirmation/undo control, are accessible, remove associated active/quarantine data as specified and never alter an unrelated record. | STO-004; HZ-010/013 |
| G4-IM-13 | When persistence is unavailable, calculation remains available only if its G3 domain and required safety information are intact. Saving/history/favourite state is honestly disabled/read-only and no success notice is shown. | STO-006; HZ-013 |
| G4-IM-14 | No prohibited patient/clinician/facility/order/free-note field is requested or stored; no record enters URL, request, service-worker cache/message, telemetry, log or support output. | STO-005; PRV-001/002; SEC-001 |
| G4-IM-15 | Database upgrade/downgrade compatibility is coordinated with service-worker release/rollback. Older code cannot destructively open a newer schema; cache changes never delete or transmit user records. | AVL-003/004; STO-001 7.2; SEC-001 section 6 |

The selected technology is not a control by itself. If G2 retains
`localStorage`, the implementation/evidence shall prove the approved equivalent
atomicity, isolation, unique-key and rollback controls. If G2 selects IndexedDB,
database creation alone does not satisfy any G4-IM row.

## 4. Required verification and review evidence

All tests use the candidate and controlled environments in section 1. Expected
outcomes shall derive from STO-001/CALC-001, not from copying current behavior.

| ID | Evidence required for G4 | Acceptance condition |
| --- | --- | --- |
| G4-EV-01 | Storage architecture/code review | Reviewer confirms all persistence API calls are contained, schema/repository boundaries are typed and every G4-IM control maps to code |
| G4-EV-02 | Exact schema unit/property tests | Missing/extra/type/length/boundary fields, malformed identifiers/timestamps/decimals, unknown units/volumes and arbitrary structures fail independently |
| G4-EV-03 | Source-authority/recomputation tests | Deliberately inconsistent/tampered derived legacy values never affect summary/result; approved source inputs recompute through the exact G3 engine |
| G4-EV-04 | Mixed/corrupt/future isolation tests | Valid plus invalid records, partial arrays, non-array JSON, corrupt JSON, duplicates and future versions preserve every unrelated valid record and calculation |
| G4-EV-05 | Migration suite | Fresh install and every supported version hop pass; interruption at each write/marker/removal boundary, retry, idempotency, readback, rollback/read-only and privacy disposition are verified |
| G4-EV-06 | Equation-version suite | Every supported old/current/future equation version follows its approved migrate/read-only/delete/reject policy and cannot bypass current review |
| G4-EV-07 | Idempotent-save/state suite | Concurrent/double click/retry creates one record; success resets/disables save; input edit, reopen and new review cannot reuse completed state |
| G4-EV-08 | Retention/capacity/deletion suite | At/beyond every count/age boundary, tie ordering, backwards clock, quota exhaustion, single deletion, accidental-deletion control and clear-all behave deterministically |
| G4-EV-09 | Storage failure/eviction suite | Permission denial, unavailable API, transaction abort, quota, corruption and browser eviction produce distinguishable safe states without stale output or false save |
| G4-EV-10 | Browser E2E suite | Approved Chromium/WebKit/device matrix covers favourite/history save/load/review/delete, corruption recovery, persistence loss and accessibility of every state |
| G4-EV-11 | Privacy/network/cache inspection | Browser storage inventory contains only allowed stores/fields; user records never appear in requests, service-worker caches/messages, logs or generated reports |
| G4-EV-12 | Release/update compatibility test | Current/prior app-shell and database combinations prove the approved activation, migration, rollback/read-only and no-record-deletion behavior |
| G4-EV-13 | Clinical/HF review | Pharmacy confirms versioned recomputation policy; nursing/HF approves history/favourite workflow, failure wording and accidental-deletion control |
| G4-EV-14 | Security/privacy review | Lead confirms implemented data minimization, quarantine/retention, device/encryption assumptions and data flow match approved STO/SEC records |
| G4-EV-15 | Traceability/anomaly package | TRC-001 maps STO/REV/PRV requirements and HZ-003/004/010/013 controls to exact implementation/results; every discrepancy is dispositioned |

Mocked repository tests are useful but cannot be the only evidence for browser
transaction, quota, eviction, rollback or failure behavior. Current tests that
expect one corrupt JSON value to disable all saving describe the prototype gap
and are not target acceptance criteria.

## 5. Findings, deviations and privacy/risk handoff

Every failed migration, record loss/change, unexpected recomputation,
duplicate, privacy field/flow, storage exception, skipped browser case or report
failure becomes an anomaly before rerun. Records include the exact fixture,
schema/equation version, environment, root cause, affected releases/
requirements/hazards, correction, regression and independent review.

FND-H1 and every critical/high storage, review-state, security or privacy
finding remain open until objective evidence and quality/required-owner approval
support closure. No critical/high anomaly may remain at G4. Lower findings need
documented medical/privacy impact, rationale, owner and quality disposition.

G4 provides implemented-control evidence for RMF-001; it does not accept
residual/overall risk or complete an institution-specific privacy impact or
threat/risk assessment. A newly found data flow, field, hazard or rollback risk
updates SYS-001, STO-001, SEC-001, RMF-001 and TRC-001 before closure.

## 6. Unresolved decisions and blockers

| Decision/blocker | Required resolution | Current state |
| --- | --- | --- |
| Favourites/history inclusion | Exact G1 feature decision | Open |
| Storage schema fields and medication-name limits | Approved allowlist and CALC-001 bounds | Open |
| Persistence technology | IndexedDB proposal or justified `localStorage` equivalence | Open |
| Retention/cap profile | Exact history/favourite/quarantine count and age; clock behavior | Open |
| Invalid-record quarantine | Opaque payload versus metadata-only, expiry and recovery | Open |
| Single-deletion safeguard | Undo or explicit confirmation and accessible behavior | Open |
| Legacy-key removal/rollback interval | Exact timing and privacy disposition | Open |
| Equation-version policy | Migrate/read-only/delete for every version | Open |
| App-layer encryption/managed-device controls | Threat-model-based decision | Open |
| Supported browser/device matrix | Exact versions and failure/eviction behavior | Open |
| G3 recomputation engine | Closed exact implementation/interface | Absent |
| Independent storage reviewer and evidence environment | Named/approved | Open |

These decisions should close at G1/G2. If any remains open when a G4 decision is
requested, the gate remains open regardless of implementation completeness.

## 7. Exact exit criteria and determination

G4 closes only when the quality lead verifies and records **all** of the
following for the single candidate in section 1:

1. every G4 entry criterion is satisfied and remains effective;
2. G3 is closed for the exact domain engine/interfaces used by the repository,
   or is signed concurrently for the same compatible candidate;
3. every G4-IM control is implemented with no direct/unapproved persistence or
   trusted-derived-value path;
4. every G4-EV item is present, passing, internally consistent and reviewed by
   the named role;
5. STO-001/SEC-001/SYS-001/RMF-001/TRC-001, schemas, code, migration fixtures,
   tests and user information agree exactly;
6. every valid record remains usable when an unrelated record is invalid, and
   no invalid/future/incompatible record produces an actionable value;
7. source-authoritative recomputation, review reset, idempotent saving,
   retention, deletion, migration, rollback and all failure states meet their
   approved policy on the supported matrix;
8. privacy/network/cache inspection finds no prohibited field or user-record
   flow, and security/privacy signs the implemented data flow;
9. no required case is skipped/retried away and no critical/high anomaly is
   open; all lower anomalies have approved dispositions;
10. TRC-001 and the immutable evidence bundle identify the exact candidate,
    dependencies/configuration, environments, fixtures, reports and reviewers;
    and
11. every required approver signs the exact candidate commit below.

There is no partial or conditional closure. A green unit/E2E run, code review,
technology migration or schema file without the full evidence and decisions
leaves status **Open**.

## 8. Approval record

| Role | Name | Decision | Date/signature | Approved candidate commit | Evidence reference |
| --- | --- | --- | --- | --- | --- |
| Software lead | Unassigned | Pending | — | — | — |
| Independent software/storage reviewer | Unassigned | Pending | — | — | — |
| Pharmacy reviewer | Unassigned | Pending | — | — | — |
| Nursing/human-factors reviewer | Unassigned | Pending | — | — | — |
| Security/privacy lead | Unassigned | Pending | — | — | — |
| Quality lead / gate authority | Unassigned | Pending | — | — | — |

No approval may be completed by a bot or inferred from pull-request approvals,
branch protection or check status. Electronic signatures must be attributable,
controlled and linked to the exact candidate and evidence bundle.

## 9. Reopening and change control

After closure, quality shall reopen G4 before accepting a change to:

- any persisted field, schema/equation version, validation rule, record ID,
  timestamp, medication-name policy or authoritative-source rule;
- storage technology, repository/browser API, transaction/atomicity behavior,
  migration, quarantine, retention/cap, deletion/undo, backup/export or recovery;
- G3 parser/unit/calculation/result behavior used to validate or recompute a
  stored record;
- favourite/history/review/acknowledgement/save state transitions or UI failure
  wording;
- encryption, MDM/device assumptions, hosting/log/network data flow,
  service-worker/cache/update/rollback behavior or supported browser/OS;
- a dependency, compiler/configuration or fixture/oracle change that can affect
  storage or evidence; or
- an anomaly, complaint, breach, vulnerability, browser change or field signal
  that questions a G4 assumption, control or result.

The impact assessment maps affected requirements/hazards, privacy/risk records,
migration paths and evidence. Schema/technology/equation-version changes require
all affected migrations, prior/current/rollback combinations, corruption,
retention and privacy flows to be rerun. The new candidate receives a new
evidence bundle and signatures; prior CI or gate approval never transfers
automatically.
