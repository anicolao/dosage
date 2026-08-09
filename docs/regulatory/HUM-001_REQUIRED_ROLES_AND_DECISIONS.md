# HUM-001 — Required roles and human decision sequence

> **DRAFT — ALL ROLES UNASSIGNED; ALL DECISIONS OPEN.** This register is a
> handoff aid, not an approval record. It does not authorize implementation,
> submission, clinical evaluation, patient care or distribution.

| Field | Value |
| --- | --- |
| Record owner | Quality lead (unassigned) |
| Record version/date | 0.1 / 2026-08-07 |
| Applicable product | Proposed `0.2.0-classification` reference product only |
| Current dependency state | G0, G1 and G2 open; implementation gates not entered |

## 1. Purpose

This record identifies decisions that cannot be supplied by repository
analysis, code generation or green CI. It orders those decisions so reviewers
can close the earliest blocking gate without prematurely approving downstream
implementation. The controlled gate records and their cited evidence remain
authoritative if this summary and a gate record ever disagree.

## 2. Required accountable people

| Role | Authority/evidence required | Earliest blocking gate |
| --- | --- | --- |
| Legal manufacturer | Legal identity, address, signatory authority and practical/contractual ability to maintain, correct, distribute and recall the product | G0 |
| Quality lead | Document/evidence control authority, gate administration, anomaly disposition and release independence | G0 |
| Software lead | Authority over architecture, implementation, configuration and build/release evidence | G0 |
| IP/commercialization counsel | Written contributor/title/licence/GPL/distribution-model conclusion for the identified manufacturer and product | G0/G1 |
| Regulatory lead | Intended-use/classification/dossier ownership and controlled Health Canada correspondence | G1 |
| Pharmacy/medication-safety lead | Formula, preparation assumptions, numeric bounds, rounding, measurable output and clinical risk decisions | G1/G2 |
| Nursing/human-factors lead | Real workflow, users/settings, exclusions, UI comprehension, accessibility and representative-use decisions | G1/G2 |
| Security/privacy lead | Threat, device/host, local-data, delivery, privacy and incident-control decisions | G2 |
| Independent calculation verifier | Independent oracle/formula review and final calculation-verification conclusion | G2/G3/G7 |
| French clinical reviewer/translator | Clinically equivalent French safety meaning and translation trail | G8/G9; plan must be approved earlier |
| Independent dossier auditor | Exact-package audit independent of package authorship | G9 |
| Formal-methods reviewer/implementer | Lean/toolchain proof boundary if CE5 is approved; may be deferred by signed risk-based decision | G2/G7 |

One person may hold compatible roles only when the legal manufacturer and
quality lead document competence, authority and independence. The calculation
implementer cannot be the sole author/approver of the expected-value corpus,
formal specification and final calculation conclusion. The dossier author
cannot perform the sole independent G9 audit.

## 3. Approval evidence rules

An approval must identify the person, role/authority, decision, date,
signature or controlled electronic-approval reference, exact document
revision/commit and any conditions. A repository checkbox, pull-request merge,
code-owner review or green CI result is not by itself a gate approval.

Conditional approval must state the condition, owner, due date and whether it
blocks the gate. Silence, blank cells, “looks good,” draft comments and inferred
agreement are not approval. A changed controlled input requires the affected
reviewer to reassess and either reaffirm or replace the earlier decision.

## 4. Decision sequence

### Packet A — close G0 before any downstream approval

1. Complete and approve `G0-01_LEGAL_MANUFACTURER_IDENTITY_AND_SIGNATORY_AUTHORITY.md`
   and both role packets in `G0-02_ROLE_AUTHORITY_AND_COMPETENCE.md`.
2. Confirm the exact legacy/current prototype baselines and unchanged source
   reviews in BASE-001.
3. Review prototype URLs/access/retention and containment in DST-001.
4. Assign every FND-001 finding an accountable owner and approve its initial
   severity/disposition without marking unverified findings closed.
5. Complete contributor/asset provenance evidence in IP-000 and approve
   `G0-03_CONTRIBUTOR_AND_ASSET_PROVENANCE.md`.
6. Obtain counsel's written preliminary conclusion that the manufacturer has a
   sufficient rights/licence basis and authority to correct/distribute/recall.
7. Record exact candidate-commit CI/deployment evidence and sign GATE-000.

Counsel and manufacturer identity are hard blockers. Downstream drafts may be
reviewed in parallel, but G1 cannot close until G0 closes.

### Packet B — close G1 product definition

1. Approve the bounded reference-product workflow, users/settings,
   patient/medication/preparation scope and explicit exclusions in REG-001.
2. Decide favourites/history inclusion and the exact device/browser/OS matrix.
3. Approve intended use, contraindications/limitations, prototype warning,
   permitted/prohibited claims and English/French review plan in REG-002.
4. Approve the criterion 3 ambiguity and fallback questions in REG-003 without
   asserting a classification outcome.
5. Complete IP-001 for every contemplated hosting/download/institutional/
   modified-build model, including GPL and third-party obligations.
6. Approve SYS-001, ARC-001 and initial TRC-001 links.
7. Sign GATE-001 against one exact commit.

### Packet C — close G2 safety requirements

The pharmacy, clinical, software, quality, security/privacy and independent
reviewers resolve the numbered decision tables in CALC-001, RMF-001, STO-001,
SEC-001, DEV-001 and VVP-001. At minimum they must approve:

- exact decimal/input/output bounds, rational/decimal representation, formula,
  rounding/display/measurability and independent golden values;
- risk method/scales/acceptability, hazard severity/assumptions, controls and
  verification responsibilities;
- favourites/history schema, technology, retention, quarantine, deletion,
  migration/rollback and privacy rules;
- supported host/device/browser matrix, CSP/network contract, app-shell
  update/rollback, provenance/SBOM and security response targets;
- exact TypeScript/test/property/lint/format tool versions after a clean
  compatibility spike, including package-lock/Nix boundaries; and
- test environments/counts, evidence repository/retention, anomaly process,
  independent personnel and Lean/formal-method scope or signed deferral.

Update SYS-001/RMF-001/TRC-001 for every decision, demonstrate the proposed
commands/configuration, and sign GATE-002. No Step 3 implementation begins
while G2 remains open.

### Packet D — approve implementation gates G3–G6

After G2, authorize traced changes in small controlled increments. Review and
sign each gate's exact evidence:

- G3: typed calculation boundaries, strict parsing, exact/bounded arithmetic,
  review-reset behavior, unit state and independent unit/property evidence;
- G4: versioned storage schemas, source-authoritative recomputation,
  quarantine/migration/retention/deletion and idempotent state transitions;
- G5: representative reflow/accessibility/keyboard/screen-reader behavior,
  stable final-build screenshots and formative nurse evidence; and
- G6: CSP/network enforcement, supply-chain/build provenance, SBOM,
  least-privilege CI and two-release offline/update/rollback/eviction evidence.

G5/G6 may overlap where AUTHORIZATION_PLAN permits, but overlap does not waive
their entry criteria, independent evidence or signatures.

### Packet E — execute G7 and freeze G8

Quality authorizes one clean, immutable controlled run under VVP-001. Every
failure/deviation receives an anomaly ID before rerun under QMS-001. Close
TRC-001 only when every applicable requirement/control/finding maps to exact
results. Independent reviewers approve VVR-001; no critical/high anomaly may
remain open and every other disposition requires rationale and quality approval.

Then freeze only the G7-approved source/artifact/lockfile/SBOM/evidence/label
set. Record full commit, version, artifact/manifest hashes and archive location;
complete English and clinically reviewed French draft label/IFU; sign G8. Any
subsequent affected change reopens verification and the dossier baseline.

### Packet F — approve and send the classification package

Populate attachment sources `00`–`09` exclusively from approved records and
the frozen build. Generate and hash PDFs under the selected controlled process.
An independent auditor completes GATE-009 and the manufacturer approves the
exact package digest.

On submission day, COR-001 must record the then-effective Health Canada
instruction and routing, including the 2026-12-14 FRM-0292 transition check.
Send one request only after G9; archive the exact message, attachments,
delivery evidence and acknowledgement. Classification support is not market
authorization.

## 5. Decisions that may be deferred without blocking early drafting

The following may remain open until their stated gate, provided no earlier
record falsely assumes their outcome:

| Decision/evidence | Latest gate | Reopen/escalation trigger |
| --- | --- | --- |
| Final named independent verifier and controlled evidence repository | G2 | Needed earlier if compatibility/oracle work is represented as approved evidence |
| Representative nurse recruitment/session evidence | G5 | Workflow/scope cannot close at G1 if no competent owner approves the plan |
| Executed SBOM/vulnerability/build/offline reports | G6 | Tool/policy decisions and acceptance criteria still close at G2 |
| Exact G7 run identity/results | G7 | No earlier CI result may be promoted as the controlled run |
| Frozen build, screenshots, translations and package hashes | G8/G9 | Any affected change invalidates prepared artifacts |
| Final submission address/access date | G10 send day | Known 2026-12-14 transition must be explicitly checked, not generically assumed |
| Complaint/incident/CAPA/field-action/recall operating procedures | Before clinical release | Required earlier if classification work exposes a distributed safety issue or the product enters clinical use |

## 6. Current acknowledgement and approvals

No person has been assigned or approved through this repository record. The
table must remain pending until the accountable roles review the source gate
records and the exact commit they intend to approve.

| Role | Name | Acknowledgement/decision | Date/signature | Exact commit |
| --- | --- | --- | --- | --- |
| Legal manufacturer | Unassigned | Pending | — | — |
| Quality lead | Unassigned | Pending | — | — |
| Regulatory lead | Unassigned | Pending | — | — |
| Pharmacy/medication-safety lead | Unassigned | Pending | — | — |
| Nursing/human-factors lead | Unassigned | Pending | — | — |
| Software lead | Unassigned | Pending | — | — |
| Security/privacy lead | Unassigned | Pending | — | — |
| IP/commercialization counsel | Unassigned | Pending | — | — |
| Independent calculation verifier | Unassigned | Pending | — | — |
