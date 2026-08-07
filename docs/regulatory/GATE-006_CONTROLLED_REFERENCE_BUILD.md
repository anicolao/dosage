# GATE-006 — Controlled reference build

| Field | Value |
| --- | --- |
| Gate | G6 — controlled reference build |
| Status | Open — draft gate record; not approved or executed |
| Primary owners | Security/privacy lead and software lead (unassigned) |
| Required approvers | Security/privacy, software and quality |
| Supporting approvers/reviewers | Legal manufacturer, regulatory lead, IP counsel and institutional hosting owner as applicable |
| Target | `0.2.0-classification` reference product |
| Record version/date | 0.1 / 2026-08-07 |
| Effective date | None |

G6 confirms that one classification-reference build and its delivery evidence
are controlled. It does not authorize clinical distribution, substitute for
G7 verification, close a vulnerability or risk by itself, or convert GitHub
Pages into a clinical channel. A green workflow, deployed preview or commit
cannot alone close this gate.

## 1. Entry criteria

Step 6 may overlap Steps 4–5 after the calculation boundary stabilizes, but the
gate cannot close until these entries are met:

| Entry criterion | Required evidence | Current status |
| --- | --- | --- |
| G3 calculation implementation verified | Signed G3 record and exact calculation-engine baseline | Open; absent |
| Product/security requirements controlled | Approved SYS-001, RMF-001, SEC-001, VVP-001 and applicable STO-001 controls | Open; drafts only |
| Architecture and data flow approved | ARC-001 plus verified source/built interface and network inventories | Open |
| Supported platform matrix fixed | Exact managed devices, browsers/engines, service-worker/storage support and useful life | Open G1 decision |
| Tool/dependency provisioning approved | DEV-001, lockfiles, Nix/immutable environment and SBOM method | Open |
| Candidate source/build selected | Immutable source revision, package version, visible revision and proposed artifact manifest | Not selected |
| Threat model approved | Assets, boundaries, threats, medical-risk bridge, controls and residual-risk method | Draft only in SEC-001/RMF-001 |
| Clinical distribution boundary decided | Controlled host/operator/responsibilities separated from prototype previews | Open |
| Known anomalies reviewed | No undisclosed critical/high security, privacy, build or availability condition | Open |

Planning and test scaffolding may be drafted while entries remain open. G6
implementation starts only after G3 and the applicable change authorization;
earlier prototype observations cannot be relabelled as controlled G6 evidence
after the fact without meeting VVP-001 run controls.

## 2. Browser security and runtime-network exit criteria

The exact candidate artifact and controlled host configuration must demonstrate:

| Control | Required evidence | Status |
| --- | --- | --- |
| Deny-by-default CSP | Response-header CSP beginning with SEC-001's `default-src 'none'` baseline; directive-by-directive rationale and negative tests for every relaxation | Not implemented/evaluated |
| Supporting headers | Approved Referrer-Policy, nosniff, Permissions-Policy, HSTS and asset/version cache headers | Not implemented/evaluated |
| Runtime source confinement | No remote script/style/font/image/frame/media/worker/CDN or unapproved dynamic-code source | Not evaluated |
| Application network denial | `fetch`, XHR, `sendBeacon`, WebSocket and EventSource denied/instrumented for success, error, save, delete, history, reload and recovery paths | Incomplete prototype evidence only |
| Static request allowlist | Exact approved origin/base path, GET/HEAD method, path, MIME, redirect and integrity behavior for app-shell installation/update | Not defined/verified |
| User-record isolation | Calculation inputs and local records absent from URLs, requests, headers, service-worker messages/caches and generated diagnostics | Not verified |
| Interface absence | Source/configuration/built-artifact evidence of no backend, device-signal, EHR, pharmacy, pump or monitoring interface | Partial architectural observation only |

Tests must separately inventory browser resource loading and application API
constructors. “Every observed request was same-origin” is not acceptance when
an unexpected same-origin path could still receive user-record content.

If the selected host cannot enforce and retain the approved response headers,
it cannot be the controlled clinical host. A prototype meta CSP is defense in
depth, not evidence that GitHub Pages meets the clinical-channel control.

## 3. Threat-model and security-control exit criteria

The approved threat model must cover calculation/review integrity, source and
artifact tampering, compromised packages/actions, content injection, local-data
disclosure/corruption, stale/recalled build, mixed/partial cache, eviction,
availability, shared/lost device, CI credential misuse and host outage. It must:

1. identify assets, actors, trust boundaries and sequences of events;
2. assess technical exploitability and linked medical/privacy harms;
3. map safe-design, protective and information controls to RMF-001/TRC-001;
4. assign verification and operational detection for each control;
5. state residual risk and every assumption about institution/device controls;
6. retain all test/scan findings as anomalies with severity and disposition;
   and
7. be approved by security/privacy, quality and affected risk owners.

Classification G6 requires qualified security review, negative tests and
threat-control evidence. `AUTHORIZATION_PLAN.md`, VVP-001 and SEC-001 defer the
independent penetration test until after classification unless approved risk
analysis requires it earlier. Before G6, security and quality must record that
decision explicitly: either perform it now, or sign a risk-based deferral
showing why the classification dossier remains credible and when the test
becomes mandatory. It cannot be silently marked “not applicable.”

## 4. SBOM and dependency exit criteria

The release evidence must contain both a machine-readable CycloneDX or SPDX
SBOM and a human-reviewable disposition. The inventory covers:

- direct/transitive runtime and build JavaScript packages;
- bundled fonts, icons, images and other media;
- Vite/service-worker/build/test/reporting components used for release;
- Node, npm, Nix inputs and native/system dependencies as applicable;
- GitHub Actions by full reviewed commit SHA; and
- release, signing/attestation, hosting and scanning tools that can affect the
  artifact.

Each component records exact version/commit, supplier/source, scope, integrity
hash, licence, modification status and current vulnerability assessment with
assessment date/source. Unknown or incompatible source, licence or
vulnerability status blocks G6 rather than becoming a blank field. IP-001 and
the SBOM must agree on bundled/redistributed assets and obligations.

Supply-chain evidence must show locked `package.json`/`package-lock.json` with
`npm ci`, approved Nix or immutable tool environment, reviewed install scripts,
registry/source allowlists, dependency-diff review and no undocumented global
tool. `npm audit` is one dated input, not the vulnerability conclusion.

## 5. CI and repository-control exit criteria

The exact workflow revisions must demonstrate:

1. default GitHub Actions permission is `contents: read`;
2. untrusted PR/fork verification has no write token or deployment secret;
3. write permission exists only in a separately protected deploy job/environment;
4. checkout/setup/deploy/reporting actions are pinned to reviewed full commit
   SHAs rather than mutable tags;
5. verification must succeed before deployment and privileged deployment cannot
   alter its result;
6. deployment mutations are serialized so overlapping jobs cannot mix output;
7. non-root base-path build and verification run on every PR, including forks;
8. dependency review, secret scanning and approved static analysis are
   release-blocking under documented severity/disposition rules; and
9. branch/environment protection, reviewers, secrets and release authorization
   are documented and tested.

The current workflow-level write permissions and tag-pinned actions are known
gaps, not accepted residual risk. A fork job that is skipped does not constitute
successful fork/base-path verification.

## 6. Deterministic build, provenance and artifact exit criteria

Two clean builds in controlled, independent workspaces must start from the same
immutable source and locked inputs. Evidence records:

- exact commit, tree status, package version and full/short displayed revision;
- package-lock, Nix/toolchain, configuration and source hashes;
- Node/npm/Vite/Svelte/OS/architecture versions and exact build commands;
- build logs, generated release manifest and complete file inventory;
- SHA-256 for every distributed file and the complete artifact/archive;
- SBOM digest and signed/attested provenance as approved; and
- reconciliation of source revision, visible UI identity, service-worker/cache
  identity, deployed artifact digest and deployment record.

Byte-for-byte equality is the proposed acceptance criterion. Any unavoidable
nondeterministic byte must be identified, removed where feasible and covered by
a pre-approved semantic comparison. An unexplained difference is an anomaly and
blocks G6. An E2E fixture revision such as `e2eha5h` may never identify the
release artifact or be masked into an apparent release hash.

The artifact must include only intended release content. If
`static/images/dilution-containers.png` remains unused, remove it and document
the manifest/SBOM change. Decide and record whether KaTeX/font subsetting is
deferred; optimization must preserve accessible MathML, equation inspectability,
licence notices and deterministic rendering.

## 7. Service-worker, offline and recovery exit criteria

The app-shell release manifest must bind release version, complete source
revision, base path and every static URL to its length, MIME type and
cryptographic digest. Cache identity derives from the manifest digest. It must
exclude local records and all runtime-generated clinical content.

Evidence must show that the service worker:

1. installs into a separate version staging cache;
2. rejects redirects, cross-origin/non-success responses and wrong MIME,
   length or digest;
3. verifies the complete staged cache before it can activate;
4. preserves the active approved release after a failed/interrupted install;
5. keeps one client on one complete HTML/engine/style/font/label/IFU release;
6. does not force activation during an active calculation without an approved
   user-state design;
7. retains the prior compatible approved release for the approved rollback
   window and deletes only in-scope obsolete caches; and
8. never reads, writes, caches, transmits or includes user records in messages.

Run the approved device/browser matrix through: first visit offline (expected
unavailable); first online install; close/reopen offline; calculation, review,
save, reload and history review offline; failed/partial update; N→N+1 update;
activation with an open calculation; rollback; corrupt/missing asset; Cache
Storage eviction; local-record-store eviction independently; quota failure;
service-worker removal; and online recovery.

Storage schema/equation compatibility must be declared for the current and
retained prior shell. Rollback must never silently down-migrate, discard or
trust incompatible records. The UI must distinguish app-shell readiness from
local-record availability and provide approved, accessible recovery/fallback
wording. No first-visit-offline or continuous-availability claim is permitted.

## 8. Distribution-channel and operational boundary

The evidence must state that GitHub Pages and PR previews are public prototype
demonstration channels only. Their URLs, artifacts and access logs cannot be
presented as a clinical release or controlled institutional deployment.

Before a later clinical release, the legal manufacturer/institution must name
the controlled host/operator, approved institutions, deployed version registry,
support/security/privacy contacts, monitoring, update/rollback/recall authority,
logging/retention, end-of-support and non-software fallback. For classification
G6, either identify that proposed channel sufficiently to validate the
architecture/security assumptions or explicitly constrain the dossier to a
non-clinical reference artifact without claiming channel authorization.

Operational vulnerability, incident, breach, complaint and field-action
procedures remain required before clinical release. Their absence must be
visible as deferred work and cannot be misstated as completed by G6.

## 9. Gate exit checklist

| Exit requirement | Planned record/evidence | Status |
| --- | --- | --- |
| All entry criteria approved | Signed prerequisite records and candidate manifest | Open |
| CSP/supporting headers enforced and negatively tested | Header configuration, browser reports and relaxation rationale | Not produced |
| Full runtime network/interface contract verified | Source/artifact inventory and constructor/request reports | Not run |
| Threat model and classification-stage security scope approved | Threat report, RMF/TRC links and penetration-test decision | Open |
| Complete SBOM/licence/vulnerability disposition approved | Machine-readable SBOM and signed review summary | Not produced |
| Least-privilege, SHA-pinned, fork-safe CI verified | Workflow review and adversarial/fork run evidence | Not implemented/evaluated |
| Deterministic build and source/artifact identity proved | Two-build comparison, manifest, hashes and provenance | Not run |
| Production bundle content minimized/reviewed | File manifest; unused-image and KaTeX/font decision | Open |
| Atomic cache/update/rollback/eviction/recovery passed | Version-bound multi-release/device/browser reports | Not implemented/evaluated |
| Service worker proved isolated from user records | Source/artifact/message/cache/network tests | Not run |
| Prototype and proposed clinical channel distinguished | Approved distribution/deployment statement | Open |
| Security/build anomalies dispositioned | Anomaly records and quality/security decisions | Open |
| Traceability updated through G6 | TRC-001 implementation/verification/evidence-status updates | Open; closes only at G7 |
| Required approvals identify exact baseline | Section 12 signatures and immutable source/build identity | Pending |

Any unexpected network call, asset mismatch, unexplained artifact difference,
unsafe rollback, record disclosure or unresolved critical/high security/privacy/
availability anomaly blocks G6. Lower-severity anomalies require documented
medical/privacy impact, rationale, correction/acceptance and quality/security
approval.

## 10. Open decisions

- controlled clinical host/operator and security-header capability;
- exact supported device/browser/service-worker/storage matrix and useful life;
- final CSP/supporting headers and any unavoidable relaxation;
- SBOM format/generator, vulnerability sources, thresholds and monitoring date;
- Nix/CI image, Node/npm/browser/system-tool versions and provenance mechanism;
- action/registry/source allowlists and approved scan/static-analysis tools;
- cache activation, open-client behavior, rollback window, cache retention and
  database/equation compatibility policy;
- update/recall/end-of-support communication and institutional fallback;
- whether to perform or formally defer the independent penetration test before
  the classification request;
- KaTeX/font subsetting and unused release-asset disposition;
- evidence repository, access, signatures and retention period; and
- privacy/hosting logs, device-management and institutional responsibility
  assumptions used by the classification reference.

These decisions must be resolved in SEC-001/DEV-001/STO-001/VVP-001 and the
release/deployment records. A gate signature may not silently decide them.

## 11. Reopening rules

After G6 approval, impact assessment reopens affected evidence for any change
to source, dependencies/lockfiles, Nix/CI image, build flags/toolchain, actions,
permissions, scans, secrets, CSP/headers, host/base path, asset/font/renderer,
network interface, local-record boundary, manifest/service worker/cache/update/
rollback logic, browser/OS support, release signing/provenance, distribution
channel, vulnerability assumptions or security/privacy labelling.

A change after G6 receives a new artifact digest and deployment record. The
affected SBOM, threat/risk analysis, deterministic builds, scans, security/
privacy tests and offline lifecycle tests must be rerun. A dependency-only or
configuration-only commit is not presumed nonfunctional.

## 12. Approval record

The gate remains open unless every required approver signs the same exact source
commit, artifact/manifest digest, SBOM, threat report, build/provenance report,
security/network report, offline-lifecycle report and anomaly disposition set.

| Role | Name | Decision | Date/signature | Approved source/build |
| --- | --- | --- | --- | --- |
| Security/privacy lead | Unassigned | Pending | — | — |
| Software lead | Unassigned | Pending | — | — |
| Quality lead | Unassigned | Pending | — | — |
| Legal manufacturer | Unassigned | Pending review | — | — |
| Regulatory lead | Unassigned | Pending channel/dossier review | — | — |
| IP counsel | Unassigned | Pending SBOM/licence review | — | — |
| Institutional hosting owner, if selected | Unassigned | Pending | — | — |
