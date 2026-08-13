# STO-001 — Local data specification

| Field | Value |
| --- | --- |
| Record ID | STO-001 |
| Status | Draft — unapproved; G0/G1/G2 open; not a clinical-release specification |
| Owner | Software lead (unassigned) |
| Required approvers | Pharmacy lead, nursing/human-factors lead, security/privacy lead, quality lead, legal manufacturer |
| Target | `0.2.0-classification` reference product |
| Source baseline | `f6e903a08f45` (record must be rebased to the approved G1 baseline) |
| Draft version/date | 0.1 / 2026-08-07 |

This record proposes the storage boundary required by SYS-001 and
AUTHORIZATION_PLAN.md Steps 2 and 4. It is not approved and does not establish
that favourites or history are clinically necessary. The legal manufacturer,
clinical owners and privacy lead must resolve the decision fields in section 12
before G2. No implementation may treat the proposed values below as approved
merely because they are specific.

Normative words such as “shall” describe the proposed reference-product
contract. Current prototype observations are identified explicitly.

## 1. Scope and safety objectives

This specification covers user-created calculation-session data, favourites,
history, storage metadata, schema migration, invalid-record isolation,
retention, deletion, storage failure and recovery. App-shell Cache Storage and
service-worker lifecycle controls are governed by SEC-001; the service worker
shall never read, write, cache or transmit the records described here.

The storage design shall:

1. preserve only the minimum source inputs needed for an approved workflow;
2. prevent persisted data from becoming a trusted calculation result;
3. validate every record independently at every read and write boundary;
4. make legacy, corrupt, incompatible and future-version data non-actionable;
5. preserve valid records when another record is invalid;
6. provide deterministic migration, retention, deletion and recovery;
7. keep calculation available when persistence is unavailable, without implying
   that a record was saved; and
8. support the privacy statement that no user-created content leaves the
   approved device in the intended configuration.

## 2. Current-state observation and gap

The current prototype uses the origin-scoped keys
`dosage.favourites.v2` and `dosage.history.v2`. Each key contains one JSON
array. Reads confirm only that the top level is an array, then filter unit names.
A parse failure for either key sets one global `storageAvailable` flag to false,
which disables all saving. History persists `preparedConcentration`,
`preparedConcentrationInOrderedUnit` and `administrationVolume`, and the UI
displays those derived values without first recomputing them. Writes replace the
whole array and are not transactional across keys.

Useful current boundaries are the closed UI unit selectors, the absence of a
patient-identifier field, the 100-item history slice and the fact that a history
record reopens into mandatory review. These observations are not schema or
migration evidence. They do not conform to STO-001 through STO-004, and the
current corruption test documents degraded behavior rather than the target
invalid-record isolation behavior.

## 3. Data minimization and classification

### 3.1 Permitted data

Subject to the feature decisions in section 12, the repository may store only:

- a user-entered medication display name;
- bounded original decimal strings for vial amount, vial volume and, for
  history only, ordered dose;
- the closed `mg`/`mcg` source units;
- the supported final prepared volume for history only;
- stable record and review-save identifiers;
- schema/equation versions and creation timestamps; and
- non-clinical migration/quarantine status needed to enforce this specification.

A medication name, dose and timestamp can reveal clinical context even without
a patient name. All permitted record content shall therefore be treated as
potentially sensitive local information in the privacy impact and threat/risk
assessments.

### 3.2 Prohibited data

The product shall not request, derive or persist a patient, clinician, facility,
encounter, room, bed, order or prescription identifier; date of birth; health
card number; device identifier; location; contact information; free-text
clinical note; route; diagnosis; indication; or user/account profile. It shall
not store review checkbox state, acknowledgement state, a claim that a result is
clinically correct, or an authentication secret.

Derived concentrations, converted values, formatted equations and
administration volume shall not be stored as authoritative data. The preferred
schema omits them entirely. If a temporary comparison value is approved solely
for a migration-validation report, it shall not be exposed to the calculation
or review UI and shall be deleted at completion of that controlled migration.

No export, cloud backup, cloud synchronization, analytics, telemetry, crash
upload or remote-support copy is in scope. Adding any of them reopens the
privacy, security, risk, classification and intended-use assessments.

## 4. Proposed persistence architecture

The proposed target is an origin-scoped IndexedDB database named `dosage`, with
transactional object stores `favourites`, `history`, `quarantine` and
`metadata`. IndexedDB is preferred over the existing whole-array
`localStorage` design because it supports per-record isolation, unique keys and
transactional schema upgrades. This technology choice remains **open for G2**.
It is not itself a risk control: validation and repository behavior below are
required regardless of browser storage technology.

If `localStorage` is retained, the software lead shall document equivalent
controls for atomic replacement, interrupted writes, record-level quarantine,
unique-key enforcement, downgrade safety and independent recovery of each
record. “The current code already uses it” is not an equivalence rationale.

All access shall pass through typed schema and repository modules. UI code and
the calculation engine shall not call browser persistence APIs directly. The
repository shall return a discriminated outcome such as `available`,
`unavailable`, `partiallyRecovered`, `readOnly` or `requiresUpdate`; an empty
collection shall never stand in for a failed read.

## 5. Proposed record schemas

CALC-001 supplies the exact decimal grammar and numeric bounds. A record is
invalid if a string exceeds those limits even when JavaScript could coerce it
to a number. Unknown properties shall be rejected at the storage boundary so
that an accidental schema expansion cannot silently become part of the product.

### 5.1 Favourite record, schema version 1

```ts
type FavouriteV1 = {
  recordType: 'favourite';
  schemaVersion: 1;
  id: string;                 // canonical UUID generated by the application
  createdAt: string;          // canonical UTC RFC 3339 timestamp
  medicationName: string;     // trimmed, bounded display text; limits pending
  vialAmount: string;         // original admitted decimal string
  vialUnit: 'mg' | 'mcg';
  vialVolume: string;         // original admitted decimal string in mL
};
```

A favourite shall never contain final volume, ordered dose, ordered unit,
calculated output, review state or acknowledgement state. Loading it shall
clear those fields and start an unreviewed calculation session.

### 5.2 History record, schema version 1

```ts
type HistoryV1 = {
  recordType: 'history';
  schemaVersion: 1;
  equationVersion: 'calc-v1'; // exact value requires CALC-001 approval
  id: string;                 // stable canonical UUID
  reviewSaveId: string;       // unique identifier for one completed review
  createdAt: string;          // canonical UTC RFC 3339 timestamp
  medicationName: string;     // trimmed, bounded display text; limits pending
  vialAmount: string;         // original admitted decimal string
  vialUnit: 'mg' | 'mcg';
  vialVolume: string;         // original admitted decimal string in mL
  finalVolume: 10 | 50 | 100 | 250 | 500 | 1000;
  orderedDose: string;        // original admitted decimal string
  orderedUnit: 'mg' | 'mcg';
};
```

The unique `reviewSaveId` shall be created when one complete equation review is
accepted. All save attempts for that same reviewed state shall use the same ID,
and the repository shall enforce uniqueness transactionally. A successful save
shall disable or reset the save action. A later edit or a history reopen starts
a new unreviewed state and cannot reuse the prior ID. This makes a double tap or
retry idempotent without treating equal medication inputs at different times as
the same clinical event.

### 5.3 Metadata and quarantine

Metadata may contain only database version, successful-migration identifiers,
retention configuration, last completed retention sweep, and release/equation
compatibility metadata. It shall not contain clinical source inputs.

An invalid record shall be removed atomically from the actionable collection
and produce a bounded quarantine entry containing its record type, original
store/key when available, detected schema version, reason-code allowlist,
detection time and the detecting software version. The proposed migration-safe
baseline preserves the exact invalid payload as opaque local data for at most
seven days, never parses or displays it, and permits only deletion or a later
approved migration to access it. The privacy/clinical owners must decide
whether this short recovery opportunity outweighs the exposure and whether the
reference product instead keeps reason metadata only and irreversibly deletes
the invalid payload. Quarantined content shall remain non-actionable and shall
never be uploaded automatically. Error strings shall not copy sensitive field
values.

## 6. Validation and authoritative recomputation

Validation shall be pure, deterministic and applied independently to each
record on write, read, migration and reopen. It shall check exact keys and
types, schema/equation version, identifier syntax, canonical timestamp, text and
array limits, CALC-001 decimal grammar/bounds, unit membership, supported final
volume and all applicable cross-field calculation constraints.

For a valid history record:

1. source strings and units are parsed by the approved domain parser;
2. the calculation is executed under the recorded `equationVersion` or an
   explicitly approved migration path;
3. list summaries, equations and administration volume are generated from that
   recomputation only;
4. reopening restores source inputs only, resets all checks, result visibility
   and acknowledgement, then requires current review; and
5. any validation/recomputation failure makes that record non-actionable and
   quarantines it without affecting other records or a new calculation.

Known older equation versions shall be handled by a version-specific, tested
decision: approved source migration to the current version, read-only display
of source facts with no calculated result, or deletion after explicit user and
quality approval. An unknown or future equation version shall never be opened
as a calculation. The app shall preserve it without mutation when preservation
is safe, report that a newer compatible release is required, and keep unrelated
valid records available.

The product shall not dynamically download an old calculation engine. Every
supported equation version and its evidence shall be bundled in the controlled
release or migrated before use.

## 7. Migration and rollback contract

Every migration shall have an identifier, source/target schema, preconditions,
pure record transformer, verification corpus, rollback/forward-compatibility
analysis and approved disposition for failures. Database upgrades shall run in
one transaction when supported. A failed transaction shall leave the source
store intact and shall not set its completion marker.

### 7.1 Existing v2-key migration proposal

On first target release, the repository shall:

1. read `dosage.favourites.v2` and `dosage.history.v2` without modifying them;
2. distinguish missing, inaccessible, non-JSON, non-array and partially valid
   sources;
3. validate each array member against a documented legacy schema;
4. map only admitted source fields to the V1 records, create the required
   version/identifier fields, and discard all legacy derived values;
5. validate and independently recompute each migrated history record;
6. insert valid records and bounded quarantine metadata in one target
   transaction, resolving duplicate identifiers deterministically;
7. read back and verify counts, IDs and source-field equality;
8. set a migration-complete marker only after that verification; and
9. remove the legacy keys only after the target transaction and rollback policy
   are approved and complete.

Non-JSON at one legacy key shall not make the other key or new calculations
unavailable. A raw legacy array shall not be retained indefinitely “just in
case”; the privacy lead shall approve the exact rollback interval or immediate
removal rule. Re-running a completed migration shall be idempotent.

### 7.2 Downgrade and service-worker coordination

A software rollback shall not open a newer schema through older code. SEC-001's
update design shall retain a prior app shell only when its repository layer is
read-compatible with the database state, or shall restore the prior app with
storage in protected read-only mode. Destructive down-migration is prohibited
unless separately approved and verified. Cache activation and database
migration shall never be presented as one indivisible success unless both sides
have completed their compatibility checks.

## 8. Retention, deletion and capacity

The following values are a proposal for risk/privacy review, **not an approved
clinical decision**:

| Collection | Proposed cap/age | Proposed disposition |
| --- | --- | --- |
| Favourites | 100 records; no automatic age expiry | Keep until user deletes, institution resets the app, or browser storage is evicted |
| History | 100 records and 30 elapsed days, whichever removes first | Delete oldest/expired records transactionally; institution may select a shorter approved fixed profile |
| Quarantined invalid records and metadata | 20 entries and 7 elapsed days | Delete oldest/expired entries; never allow them to block calculation |

Before G2 the clinical and privacy owners shall decide whether history is
needed at all, whether the reference profile is 0/off, 7 days or 30 days, and
whether medication names in history and favourites are necessary. The frozen
classification build shall have one explicit profile; arbitrary end-user
extension is prohibited. An institution may mandate a shorter controlled
profile, but configuration identity and verification shall be recorded.

Retention shall use a syntactically validated UTC creation time while treating
the device clock as untrusted. A backwards or implausible clock change shall
not extend a known expiry indefinitely; the approved response may expire the
affected record or make history unavailable pending recovery. The response
needs VVP-001 coverage. Capacity enforcement shall occur in the same
transaction as insertion and shall be deterministic (oldest valid timestamp,
then stable ID). Quota failure shall not
silently evict a different user record or report a successful save.

The UI shall provide record-specific deletion and clear-all for each retained
collection. Clear-all requires an explicit, accessible confirmation naming the
collection and permanence. The human-factors owner shall approve either an undo
window for a single deletion or a pre-deletion confirmation as the accidental-
deletion control. Once confirmed/expired, deletion shall remove the record and
associated quarantine metadata transactionally. There is no manufacturer cloud
copy to delete or restore.

## 9. Failure, recovery and user information

The product shall distinguish at least: unsupported browser storage,
permission/security denial, quota exhaustion, corrupt database, transaction
abort, an invalid individual record, unknown future version and browser/OS
eviction. It shall not collapse these into an empty history or a false “saved”
notice.

Calculation from new manual inputs shall remain available when persistence is
unavailable, provided the calculation engine and required safety information
are intact. Favourite/history controls shall be disabled or explicitly
read-only, and the user shall receive an accessible message that calculation is
not saved. The product shall never advise relying on local history as the
clinical source of truth or backup.

Labels/IFU shall state that records are browser/origin/device-specific,
potentially sensitive, not cloud-backed, unavailable on another browser or
device, removable by clear-site-data/MDM/browser eviction, and not recoverable
by the manufacturer. Institutional workflows shall provide a non-software
calculation method and shall not depend on retained history for continuity of
care.

Storage recovery shall not clear all records automatically. A controlled reset
may be offered only after explaining what will be deleted and obtaining
confirmation. Browser-level backup, restore, managed-device encryption, remote
wipe and site-data policy belong in the institution-specific privacy impact and
threat/risk assessment.

## 10. Privacy and security controls

- The approved deployment shall require institution-managed device controls
  appropriate to the threat model: OS/device encryption, access control,
  supported OS/browser, automatic locking, update policy and remote wipe where
  available.
- App-layer encryption is not presumed to help: a key stored beside encrypted
  browser data does not protect against the same-origin/browser threat. Any
  encryption proposal requires key lifecycle, recovery, availability and
  rollback analysis. The privacy/security lead shall decide after the
  institution threat/risk assessment.
- Records shall never be included in service-worker caches, URLs, DOM telemetry,
  logs, error reports, screenshots generated automatically, or support bundles.
- The static host may observe IP addresses and HTTP metadata during app-shell
  installation/update. No claim that the manufacturer receives “no personal
  information” may be made until hosting logs, contracts and retention are
  included in the privacy data inventory.
- Support shall instruct users not to send local record content. Any future
  diagnostic/export feature is a new controlled privacy project.
- Province/territory and institution-specific privacy-impact, threat/risk,
  contracting, breach and data-location decisions remain required before any
  deployment; this record is not a universal Canadian privacy approval.

## 11. Verification and traceability

VVP-001 shall include clean-database, legacy and failure-injection suites with
machine-readable results. At minimum:

| Requirement/control | Required verification |
| --- | --- |
| STO-001 schema boundary | Unit/property tests for missing, extra, wrong-type, oversized, malformed and boundary fields; built-artifact inspection proving UI has no direct storage access |
| STO-002 recomputation | Mutated/mismatched derived legacy values cannot affect list or reopened result; independent source recomputation for every supported equation version |
| STO-003 isolation | Mixed valid/invalid arrays, corrupt JSON, unknown units/volumes, duplicate IDs, invalid timestamps and future versions preserve each unrelated valid record |
| STO-004 migration | Fresh install; every supported version hop; interrupted transaction; retry/idempotency; rollback/read-only compatibility; retention and deletion |
| STO-005 minimization | Source/schema/DOM inspection plus browser-storage inventory showing no prohibited field or unexpected key/store |
| STO-006 disclosure | English/French label review and representative-user comprehension for locality, loss, deletion and no backup |
| REV-004/REV-005 | Reopen/load restores only approved source facts and always resets result, checks, acknowledgement and ordered-dose state as applicable |
| HZ-004/HZ-013 | Corruption, quota, permission denial, database deletion and browser eviction tests with safe, distinguishable recovery behavior |
| Privacy/network boundary | Assert records do not enter request URLs/bodies, caches, service-worker messages, logs or automatic diagnostics |

Tests shall cover Chromium and WebKit on the approved browser/device matrix and
shall not use a mocked storage implementation as the only evidence. Browser
failure and eviction behavior shall be tested on representative managed devices.
Every result maps into TRC-001, and every unexpected loss, migration difference
or recomputation discrepancy is an anomaly; rerunning until green is not an
acceptable disposition.

## 12. Decisions required before G2

| Decision | Proposed baseline | Required decision owner | Status |
| --- | --- | --- | --- |
| Favourites in first clinical product | Retain source vial facts only | Clinical, privacy, manufacturer | Open |
| History in first clinical product | Retain, subject to short fixed expiry | Clinical, privacy, manufacturer | Open |
| History age/cap | 30 days and 100; evaluate off/7-day options | Clinical, privacy, quality | Open |
| Medication name necessity/limits | Retain bounded display name; exact grammar/length TBD | Pharmacy, nursing/HF, privacy | Open |
| Persistence technology | IndexedDB with typed repository | Software, security/privacy, quality | Open |
| App-layer encryption | No assumption; decide from institutional threat model | Security/privacy | Open |
| Invalid-record quarantine payload | Opaque local payload plus metadata for no more than 7 days; evaluate metadata-only deletion | Privacy, quality, clinical | Open |
| Single-delete protection | Undo or explicit confirmation | Nursing/HF, privacy | Open |
| Legacy-key removal/rollback interval | Remove after verified migration; exact timing TBD | Software, privacy, quality | Open |
| Equation-version disposition | Migrate, read-only or delete per version | Pharmacy, quality, software | Open |

G2 cannot close until these decisions, CALC-001 bounds, VVP-001 methods and
RMF-001 risks agree. A later change to fields, storage technology, retention,
backup, export, synchronization or equation-version policy requires documented
privacy, risk, migration and verification impact assessment.

## Approval

| Role | Name | Decision | Date/signature |
| --- | --- | --- | --- |
| Software lead | Unassigned | Pending | — |
| Pharmacy lead | Unassigned | Pending | — |
| Nursing/human-factors lead | Unassigned | Pending | — |
| Security/privacy lead | Unassigned | Pending | — |
| Quality lead | Unassigned | Pending | — |
| Legal manufacturer | Unassigned | Pending | — |
