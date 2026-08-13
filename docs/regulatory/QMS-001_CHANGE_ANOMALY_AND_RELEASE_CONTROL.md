# QMS-001 — Change, anomaly and classification-release control

> **DRAFT — NOT APPROVED OR IMPLEMENTED.** This procedure does not close
> SYS-001 QMS-001/QMS-002, any authorization gate, or any finding. It does not
> establish the clinical-release processes required by SYS-001 QMS-003.

| Field | Value |
| --- | --- |
| Record owner | Quality lead (unassigned) |
| Required approvers | Legal manufacturer, quality lead, software lead, regulatory lead |
| Record version/date | 0.1 / 2026-08-07 |
| Effective date | None — approval pending |
| Controlled registers | `FND-001_OPEN_FINDINGS.csv`; future executed anomaly log/evidence repository |

## 1. Purpose and scope

This proposed procedure controls changes, verification anomalies and release
decisions for the classification reference product. It applies to source,
dependencies, configuration, tests, formal models, build/deployment tooling,
stored-data formats, labels, intended use, risk records, verification evidence
and classification-request attachments.

It supplements, but does not replace, the future complaint, incident,
vulnerability, CAPA, safety-communication, field-action and recall procedures
required before clinical release. Until those processes and all applicable
authorization requirements exist, this repository remains a prototype and is
not authorized for patient care.

## 2. Roles and independence

| Role | Proposed responsibility |
| --- | --- |
| Requester/implementer | Describe the need, affected baseline and proposed change; never self-approve final disposition. |
| Quality lead | Assign identifiers, preserve records, approve classification/severity, enforce gates and decide record closure. |
| Software lead | Assess architecture, configuration, dependency, storage, security and verification impact. |
| Regulatory lead | Assess intended-use, classification, dossier, label and submission impact. |
| Clinical/pharmacy or human-factors reviewer | Assess calculation, workflow, comprehension and clinical-risk impact where applicable. |
| Security/privacy lead | Assess interface, supply-chain, local-data, vulnerability and delivery impact where applicable. |
| Independent verifier | Review expected results, regression sufficiency and conclusions without being the sole implementer. |
| Legal manufacturer | Approve the exact G8/G9 baseline and any accepted release residual risk within its authority. |

Names, authority, independence and electronic-signature method remain open.

## 3. Controlled identifiers and records

Use immutable identifiers with no reuse:

- `CHG-YYYY-NNN` for a proposed change;
- `ANM-YYYY-NNN` for a verification anomaly or deviation; and
- the existing `FND-*` identifiers for review findings.

Each record must identify its author, timestamps, exact affected commit/build,
linked requirements, hazards/controls, gate, evidence locations and approval
history. Corrections create a new revision with a reason; they do not erase the
original. The quality lead must approve the controlled repository, access,
backup, retention and signature mechanism before this procedure is effective.

## 4. Change initiation and impact assessment

Before implementation, record:

1. the need, source and proposed acceptance criteria;
2. exact current baseline and affected artifacts;
3. affected intended use, claims, exclusions, formulas, numeric decisions,
   storage, UI, accessibility, security/privacy, offline lifecycle and IP;
4. linked SYS-001 requirements, RMF-001 hazards/controls, findings and TRC rows;
5. dependency/SBOM, toolchain, configuration and data-migration effects;
6. required reviewers, independence and verification scope;
7. gates reopened and dossier/label/translation changes; and
8. rollback, transition and record-retention effects.

A change with no traceable approved need, requirement or anomaly is rejected.
Approval to implement is not approval to release. If the scope or impact is
uncertain, classify conservatively and obtain the missing specialist review.

## 5. Anomaly and deviation intake

Before any rerun, record every unexpected failure, crash, timeout, flake,
proof/differential mismatch, missing report, skipped or quarantined test,
changed tolerance/oracle/snapshot, environment deviation, unexplained warning,
or discrepancy between displayed and recorded build identity.

The initial record must preserve enough evidence to reproduce the observation:
exact command, environment, seed/path, inputs, expected and actual result,
logs/screenshots/traces, affected artifact hashes and test-attempt number. A
rerun is additional evidence and never replaces the failed attempt.

## 6. Triage and containment

Quality and the applicable specialist assign a provisional severity using the
approved RMF-001 method; this procedure does not create a competing risk scale.
They assess affected versions, requirements, hazards, users/data, evidence and
whether the result calls earlier tests or approvals into question.

Immediate containment includes, as applicable:

- stop the controlled run or release;
- preserve the failing artifact and evidence;
- prevent the affected prototype/build from being represented as suitable for
  patient care;
- identify whether another distributed or cached build may be affected; and
- escalate security, privacy, regulatory or clinical issues to the assigned
  accountable role.

Any suspected wrong calculation, unit error, positive result displayed as
zero, invalid saved record reaching review, critical safety content clipping,
unexpected runtime transmission, mixed/stale build or tampering blocks the
affected gate pending documented assessment.

## 7. Investigation, correction and verification

For each anomaly, record root cause or the evidence supporting an explicitly
approved unresolved-cause disposition. Link every correction to a change
record. Review whether the correction introduces new hazards or changes any
previous probability, severity, residual-risk, usability or classification
conclusion.

Regression evidence must include the reproduced case, boundary/adjacent cases,
affected requirement and risk-control tests, and all additional tests selected
by the impact assessment. Expected numeric values require independent review.
Changing a test, tolerance, environment, formal axiom, snapshot or oracle is a
controlled change and cannot be used solely to make a failure disappear.

## 8. Disposition and closure

| Disposition | Minimum condition |
| --- | --- |
| Corrected | Root cause/impact documented; correction reviewed; required regression and broader reruns pass on an identified artifact. |
| Duplicate | Independent evidence shows the same root cause and affected scope as a linked open/closed record. |
| Not reproducible | Original evidence retained; bounded investigation and risk impact documented; quality approves follow-up and release effect. |
| Deferred | Rationale, residual uncertainty, owner/date and gate/release effect approved; never permitted for a critical/high safety or security anomaly at G7. |
| Not a defect | Approved requirement and independent evidence demonstrate expected behavior; disagreement with a draft requirement is not sufficient. |

Only quality may close an anomaly, and only against objective evidence for the
exact affected baseline. Critical/high safety or security anomalies block G7.
Every lower-severity open or deferred item needs documented rationale and
quality approval in VVR-001 and the release record.

## 9. Verification-run control

The controlled G7 run follows approved VVP-001. It begins only after G3–G6 are
closed and uses a clean checkout, locked dependencies, approved environment,
immutable source/build identity and an empty-or-reconciled anomaly register.
Retries are disabled unless pre-approved as an environmental deviation, and
all attempts are retained.

At completion, reconcile command logs, reports, anomalies, findings and every
TRC-001 row into VVR-001. Green CI is supporting evidence; it is neither the
complete controlled run nor a gate signature.

## 10. Release and post-release change control

G8 may freeze only the exact G7-approved source, artifact, lockfile, SBOM,
configuration, evidence, screenshots and label/IFU set. The release decision
records full/short commit, version, artifact and manifest hashes, approvers and
all anomaly dispositions. An ordinary branch merge is not a release approval.

Any post-G7 code, dependency, configuration, test, formal model, safety label,
translation or evidence change requires a new impact assessment, new artifact
identity and rerun of every affected verification activity. A post-G8 change
also reopens affected dossier sources and G8/G9. A change to intended use,
clinical scope or classification rationale requires regulatory assessment
before work proceeds.

## 11. Emergency and clinical-release boundary

No emergency path may bypass containment, traceability, independent review or
manufacturer accountability. Because the classification reference is not
authorized for patient care, an urgent prototype correction results in a new
prototype build and controlled notices as applicable—not an implied clinical
release.

Before any later clinical distribution, the legal manufacturer must approve
the separate QMS-003 processes and regulatory reporting timelines for
complaints, incidents, vulnerabilities, CAPA, safety communications, field
actions and recalls. This draft deliberately leaves those obligations open.

## 12. Approval and open decisions

The approvers must select the controlled repository, retention period,
electronic-signature method, anomaly record schema, severity/escalation service
levels, independence rules and emergency governance before this procedure can
become effective.

| Role | Name | Decision | Date/signature | Approved commit/version |
| --- | --- | --- | --- | --- |
| Legal manufacturer | Unassigned | Pending | — | — |
| Quality lead | Unassigned | Pending | — | — |
| Software lead | Unassigned | Pending | — | — |
| Regulatory lead | Unassigned | Pending | — | — |
| Clinical/pharmacy lead | Unassigned | Pending | — | — |
| Security/privacy lead | Unassigned | Pending | — | — |
| Independent verifier | Unassigned | Pending | — | — |
