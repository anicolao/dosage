# DST-001 — Prototype distribution and access record

| Field | Value |
| --- | --- |
| Record ID | DST-001 |
| Status | Draft; controls implemented, ownership review pending |
| Owner | Quality lead (unassigned) |
| Technical owner | Software lead (unassigned) |
| Record version | 0.1 |
| Record date | 2026-08-07 |

## Known access points

| Access point | Audience/access | Present control | Required disposition |
| --- | --- | --- | --- |
| Public GitHub repository | Public, read/download/fork | GPL-3.0 licence and README prototype warning | Retain as source distribution only; counsel to confirm notices and distribution obligations. |
| GitHub Pages main deployment | Public URL | Prominent in-app prototype warning; HTML `noindex`, `nofollow`, `noarchive` | Prototype evaluation only; never designate this mutable preview path as the clinical distribution channel. |
| Per-PR GitHub Pages previews | Public, unguessable only by convention | Same warning and `noindex` metadata; exact build revision in header | Review only; remove stale previews under a documented retention process. |
| Local development/preview server | Developer machine/network configuration | Default scripts bind to `127.0.0.1` | Development only; no clinical data or patient care. |
| Installed PWA from a preview URL | Any person with the URL and browser access | Prototype warning remains cached; version/revision displayed | Evaluation only. Users must be told how to remove it and that cached copies may persist. |

There is no authenticated production service, enterprise mobile-management
distribution, app-store listing, or designated clinical release channel in the
repository. GitHub Pages access is not access-controlled. The selected Step 0
containment is therefore prominent prototype identification plus `noindex`;
this reduces accidental search presentation but does not make the URL private.

## Required controls

- Every screen must retain the exact visible warning “Prototype only — not for
  patient care.” Automated browser coverage must assert its presence.
- The document head must direct conforming search crawlers not to index, follow
  or archive the preview.
- The visible header must identify the package version and source revision.
- Preview descriptions and review messages must not describe the build as
  approved, validated, safe, clinical or ready for patient care.
- Testers must use synthetic data only.
- A future clinical channel requires separate authorization, release controls,
  update/rollback ownership, support, recall capability and institutional
  deployment approval.

## Open actions

| Action | Owner | Due/trigger | Status |
| --- | --- | --- | --- |
| Name the quality and software owners. | Legal manufacturer | Before G0 approval | Open |
| Inventory and remove stale Pages previews under an approved retention policy. | Software lead | Before G7 | Open |
| Define the future controlled clinical distribution channel. | Manufacturer/regulatory lead | After classification route is known | Open |
| Confirm GPL obligations for each hosted, downloaded, installed and modified distribution model. | IP counsel | Before G1 | Open |

## Approval

| Role | Name | Decision | Date/signature |
| --- | --- | --- | --- |
| Quality lead | Unassigned | Pending | — |
| Software lead | Unassigned | Pending | — |
