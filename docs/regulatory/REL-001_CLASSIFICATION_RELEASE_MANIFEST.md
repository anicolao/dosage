# REL-001 — Classification reference release manifest

> **DRAFT TEMPLATE — NO RELEASE IS IDENTIFIED, BUILT, VERIFIED OR APPROVED.**
> Do not populate from a working tree or promote preview/CI artifacts without
> the G7/G8 controls and signatures.

| Field | Controlled value |
| --- | --- |
| Proposed product version | `0.2.0-classification` |
| Release status | Draft / no release |
| Legal manufacturer | `[TBD]` |
| Quality/regulatory owners | `[TBD]` |
| Manifest version / SHA-256 | `[TBD]` / `[TBD]` |
| G7 approval / VVR-001 digest | `[TBD]` / `[TBD]` |
| G8 decision / date | `[TBD]` / `[TBD]` |

## 1. Source and identity

| Item | Exact controlled value | Evidence/status |
| --- | --- | --- |
| Repository and immutable tag | `[TBD]` | Not selected |
| Full source commit / tree | `[TBD]` / `[TBD]` | Not selected |
| Clean-checkout evidence | `[TBD LOCATION/SHA-256]` | Not produced |
| package.json version | `[TBD]` | Proposed value only |
| Displayed short revision | `[TBD]` | Must derive from full source commit |
| App-shell/release identity | `[TBD]` | Must match source/artifact/manifest |
| Superseded baseline | Legacy `3b4b63b` identity subject to G8 reconfirmation | Planning input only |

The displayed revision may be injected explicitly for controlled E2E fixtures
such as `e2eha5h`, but no fixture value may identify or be masked into the
release. The release value must derive from and match the selected source
commit.

## 2. Build inputs and environment

| Input | Version/revision | File/location | SHA-256 / provenance |
| --- | --- | --- | --- |
| `package.json` / lockfile | `[TBD]` | `[TBD]` | `[TBD]` |
| Nix/immutable environment | `[TBD]` | `[TBD]` | `[TBD]` |
| Node/npm/Vite/Svelte | `[TBD]` | `[TBD]` | `[TBD]` |
| TypeScript/test/lint/format configuration | `[TBD]` | `[TBD]` | `[TBD]` |
| Build command/environment | `[TBD]` | `[TBD LOG]` | `[TBD]` |
| Non-root build command/environment | `[TBD]` | `[TBD LOG]` | `[TBD]` |
| Test corpus/oracle/formal inputs | `[TBD]` | `[TBD]` | `[TBD]` |

All JavaScript dependencies are provided through approved `package.json` plus
the lockfile; system/native/formal tools are provided through approved Nix or
an equivalently immutable environment. Undocumented global tools invalidate
the build record.

## 3. Distributed artifact inventory

Populate every file in the archive; do not use an ellipsis or directory-only
hash as the sole inventory.

| Relative path | Byte length | MIME/type | SHA-256 | SBOM/licence entry | Intended purpose |
| --- | --- | --- | --- | --- | --- |
| `[TBD]` | `[TBD]` | `[TBD]` | `[TBD]` | `[TBD]` | `[TBD]` |

| Aggregate item | File/location | SHA-256 | Signature/attestation |
| --- | --- | --- | --- |
| Primary artifact archive | `[TBD]` | `[TBD]` | `[TBD]` |
| Non-root artifact archive | `[TBD]` | `[TBD]` | `[TBD]` |
| Version/app-shell manifest | `[TBD]` | `[TBD]` | `[TBD]` |
| Machine-readable SBOM | `[TBD]` | `[TBD]` | `[TBD]` |
| Human licence/vulnerability disposition | `[TBD]` | `[TBD]` | `[TBD]` |
| Build provenance statement | `[TBD]` | `[TBD]` | `[TBD]` |

## 4. Reproducibility and deployment reconciliation

| Check | Independent workspace/result | Evidence SHA-256 | Status |
| --- | --- | --- | --- |
| Clean build A | `[TBD]` | `[TBD]` | Not run |
| Clean build B | `[TBD]` | `[TBD]` | Not run |
| Byte-for-byte comparison or approved exception | `[TBD]` | `[TBD]` | Not run |
| Displayed version/revision vs source | `[TBD]` | `[TBD]` | Not run |
| App-shell/cache identity vs file manifest | `[TBD]` | `[TBD]` | Not run |
| Controlled deployed artifact vs approved archive | `[TBD]` | `[TBD]` | Not run |

GitHub Pages/PR preview deployment is prototype evidence only and is not the
future controlled clinical channel.

## 5. Verification and quality evidence set

| Record/artifact | Exact revision/location | SHA-256 | Approval/status |
| --- | --- | --- | --- |
| Approved VVP-001 | `[TBD]` | `[TBD]` | Open |
| Executed VVR-001 and raw archive | `[TBD]` | `[TBD]` | Not executed |
| Closed TRC-001 | `[TBD]` | `[TBD]` | Open until G7 |
| Findings/anomaly/change records | `[TBD]` | `[TBD]` | Open |
| G3/G4/G5/G6/G7 records | `[TBD]` | `[TBD]` | Open |
| Threat/security/privacy/SBOM reports | `[TBD]` | `[TBD]` | Not produced |
| Accessibility/HF report and screenshot manifest | `[TBD]` | `[TBD]` | Not produced |
| Approved LBL-001 English/French source | `[TBD]` | `[TBD]` | Draft/untranslated |

## 6. Classification baseline and package sources

| Item | Exact revision/location | SHA-256 | Status |
| --- | --- | --- | --- |
| Product/intended use/claims/architecture | `[TBD]` | `[TBD]` | Draft |
| CALC/RMF/STO/SEC/DEV controlled inputs | `[TBD]` | `[TBD]` | Draft |
| Attachment sources `00`–`09` | `[TBD]` | `[TBD]` | Draft/not submission ready |
| Generated attachment PDFs | `[TBD]` | `[TBD]` | Not generated |
| Complete G9 package archive | `[TBD]` | `[TBD]` | Not assembled/audited |

The G8 manifest freezes sources and the classification reference. G9 separately
audits the exact generated package and authorizes its digest for sending.

## 7. Archive, retention and access

| Control | Approved value/evidence |
| --- | --- |
| Controlled archive location and custodian | `[TBD]` |
| Access/signature controls | `[TBD]` |
| Backup/retrieval/integrity-check method | `[TBD]` |
| Retention period and legal/QMS basis | `[TBD]` |
| Superseded-release preservation | `[TBD]` |
| Institution/version registry relationship | `[TBD — REQUIRED BEFORE CLINICAL RELEASE]` |

## 8. Approval and reopening

Any change to source, dependency, lockfile, build/configuration, toolchain,
artifact, formula, intended use, supported matrix, label/translation, risk or
verification evidence requires impact assessment and a new affected identity.
Reopen G7 where verification can change, then regenerate this manifest and all
dependent dossier artifacts. Never edit a signed manifest in place.

| Role | Name | Decision | Date/signature | Approved manifest/artifact digest |
| --- | --- | --- | --- | --- |
| Legal manufacturer | Unassigned | Pending | — | — |
| Quality lead | Unassigned | Pending | — | — |
| Regulatory lead | Unassigned | Pending | — | — |
| Software lead | Unassigned | Pending | — | — |
| Security/privacy lead | Unassigned | Pending | — | — |
