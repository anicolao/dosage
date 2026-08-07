# GATE-008 — Classification dossier baseline frozen

> **DRAFT — G8 OPEN — NO RELEASE, LABEL, IFU OR DOSSIER BASELINE IS FROZEN.**

| Field | Value |
| --- | --- |
| Gate | G8 — dossier baseline frozen |
| Status | Open — G7 and freeze evidence incomplete |
| Primary owners | Quality lead `[TBD]`; regulatory lead `[TBD]` |
| Proposed reference version | `0.2.0-classification` |
| Gate-record version/date | `[TBD]` / 2026-08-07 |
| Full source commit / immutable tag | `[TBD]` / `[TBD]` |
| Primary artifact / SHA-256 | `[TBD]` / `[TBD]` |
| Complete baseline-manifest SHA-256 | `[TBD]` |

Closing G8 identifies one immutable classification reference and its concise
dossier source. It does not authorize patient care or distribution, approve
final market labelling, close G9, or represent Health Canada classification.

## Entry evidence

| Entry criterion | Required exact evidence | Status |
| --- | --- | --- |
| G7 verified reference build approved | Signed GATE-007 and VVR-001 hashes `[TBD]` | Open |
| Legal manufacturer and regulatory authority established | Approved G1/IP-001 evidence `[TBD]` | Open |
| Reference version and source identity assigned | Version, full commit, immutable tag `[TBD]` | Open |
| Freeze/change-control procedure active | Branch protection/release procedure evidence `[TBD]` | Open |

## Frozen source, artifact and evidence set

| Baseline item | Exact version/location | SHA-256 | Owner/approval | Status |
| --- | --- | --- | --- | --- |
| Source archive and immutable tag | `[TBD]` | `[TBD]` | `[TBD]` | Open |
| Built artifact and version/app-shell manifest | `[TBD]` | `[TBD]` | `[TBD]` | Open |
| SBOM and dependency lockfiles | `[TBD]` | `[TBD]` | `[TBD]` | Open |
| VVP-001, VVR-001 and raw verification archive | `[TBD]` | `[TBD]` | `[TBD]` | Open |
| TRC-001, anomaly and finding dispositions | `[TBD]` | `[TBD]` | `[TBD]` | Open |
| Controlled screenshots/workflow evidence | `[TBD]` | `[TBD]` | `[TBD]` | Open |
| Product/intended use/claims/system/architecture records | `[TBD]` | `[TBD]` | `[TBD]` | Open |
| Calculation, risk, storage and security records | `[TBD]` | `[TBD]` | `[TBD]` | Open |
| Draft bilingual classification label/IFU and software-version description | `[TBD]` | `[TBD]` | `[TBD]` | Open |

## Product and safety-content freeze

| Frozen decision/content | Controlled source and exact revision/hash | Approval/status |
| --- | --- | --- |
| Intended use, users, setting and exclusions | REG-001 / REG-002 `[TBD]` | Open |
| UI safety copy and persistent prototype warning | REG-002 / label source / UI artifact `[TBD]` | Open |
| Feature set and explicitly deferred features | REG-001 / version summary `[TBD]` | Open |
| Formula, units, numeric/display policy | CALC-001 `[TBD]` | Open |
| Supported device/browser/AT matrix | REG/SYS/VVP approved records `[TBD]` | Open |
| Offline/update/eviction/recovery claim | REG/SYS/SEC/VVR evidence `[TBD]` | Open |
| Local-record/privacy claim, if included | REG/STO/SEC/VVR evidence `[TBD]` | Open |

## Draft classification label and IFU

These are classification-request drafts, not final market labelling.

| Item | Controlled location/version | SHA-256 | Review/signature | Status |
| --- | --- | --- | --- | --- |
| Approved English source label/IFU | `[TBD]` | `[TBD]` | Regulatory/clinical/manufacturer `[TBD]` | Open |
| French translation | `[TBD — qualified translator]` | `[TBD]` | Translator `[TBD]` | Not produced/reviewed |
| Independent French clinical-equivalence review | `[TBD]` | `[TBD]` | Pharmacy/nursing French reviewer `[TBD]` | Not performed |
| Exact-build UI/manifest/installation safety text | `[TBD]` | `[TBD]` | Quality/HF `[TBD]` | Open |

No machine-generated or placeholder French text may enter the frozen package.
English/French differences must be resolved in the controlled source and
reverified against the executable artifact.

## Version and change summary

The controlled software-version description must compare the reference build
with reviewed legacy baseline `3b4b63b`, after independently confirming that
baseline's identity and availability. It must list every FND-001/review finding,
the implemented change and verification evidence for each fixed item, every
approved lower-severity disposition, and every deferred item without calling
unverified work complete.

| Summary record/location | Revision/SHA-256 | Quality/software approval | Status |
| --- | --- | --- | --- |
| `[TBD — 09_VERSION_AND_CHANGE_SUMMARY source and generated artifact]` | `[TBD]` | `[TBD]` | Open |

## Freeze controls and exit decision

- [ ] Ordinary feature merges into the frozen branch are prevented.
- [ ] The quality archive is access controlled, backed up, integrity checked
  and retained for the approved regulatory/QMS period.
- [ ] The baseline manifest contains file names, byte lengths, SHA-256 values,
  owners, approvals and generation tool versions for every item.
- [ ] All frozen copies are consistent and contain no unresolved placeholder,
  stale version, unsigned approval, unreviewed translation or unsupported claim.
- [ ] Downstream dossier assembly must cite this exact baseline and remain
  draft, unsent and unapproved until G9.

**Decision:** Open. `[TBD — APPROVE / REJECT exact baseline-manifest SHA-256]`

| Role | Name | Decision | Date/signature | Approved baseline/source/artifact hashes |
| --- | --- | --- | --- | --- |
| Quality lead | `[TBD]` | Pending | `[TBD]` | `[TBD]` |
| Regulatory lead | `[TBD]` | Pending | `[TBD]` | `[TBD]` |
| Legal manufacturer | `[TBD]` | Pending | `[TBD]` | `[TBD]` |
| Pharmacy lead | `[TBD]` | Pending | `[TBD]` | `[TBD]` |
| Nursing/human-factors lead | `[TBD]` | Pending | `[TBD]` | `[TBD]` |
| Security/privacy lead | `[TBD]` | Pending | `[TBD]` | `[TBD]` |
| Independent French clinical reviewer | `[TBD]` | Pending | `[TBD]` | `[TBD]` |

## Reopening rule

Any change after G8 to code, dependency, configuration, source/build identity,
formula, input/output, intended use, supported matrix, UI safety copy,
English/French label or IFU, risk/control status, verification evidence or
dossier summary reopens G8. The owner must perform impact assessment, create a
new immutable build/baseline identity, reopen G7 when verification can be
affected, rerun affected evidence, regenerate all dependent attachments and
obtain new approvals. Preserve the superseded baseline and audit trail.
