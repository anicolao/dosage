# IP-001 — Ownership and licensing assessment

| Field | Value |
| --- | --- |
| Record ID | IP-001 |
| Status | Draft — counsel conclusion pending; blocks G1 |
| Owner | Legal manufacturer (unassigned) |
| Required reviewer | IP/commercialization counsel (unassigned) |
| Repository base | `552fa8236480e8fa2f850850eeb513bd98a512c9` |
| Draft version/date | 0.1 / 2026-08-07 |

This record extends IP-000. It describes questions and repository evidence; it
does not conclude title, freedom to operate, trademark availability or legal
compliance.

## 1. Proposed manufacturer and authority

The legal manufacturer is not identified. Before G1, one entity must establish
its right and practical ability to place the product on the market under its
name, modify and distribute the full product, obtain source and build inputs,
provide support and safety corrections, stop distribution, issue notices and
perform a field action or recall.

## 2. Contributor/copyright chain

Git exposes three human author variants—`anicolao` with GitHub noreply and Gmail
addresses, and `Alex Nicolaou` with the Gmail address—plus an automated GitHub
Actions bot. The human identities may represent one person, but that must be
confirmed by signed evidence. No assignment, contributor agreement, employment
record or contractor agreement is committed.

For each human contributor, record legal identity, employer/contract status at
the time of contribution, work scope, pre-existing material, third-party or
generated inputs, assignment/licence terms and authority to grant those rights.
Bot deployment commits require a documented conclusion that they only reproduce
controlled build output and do not add independent authored material.

## 3. Repository licence

The repository contains the GNU General Public License version 3, added at
commit `44aa9f6`. The repository does not contain file-level copyright notices,
a contributor licence agreement, a separate trademark grant or a proprietary
licence.

GPL-3.0 grants permissions but does not prove that every contributor had
authority to grant them or that the proposed manufacturer owns all copyright.
Counsel must identify the manufacturer's sufficient licence/assignment basis
and the obligations triggered by each distribution model. Proprietary
relicensing must not be assumed possible without permissions from every
relevant rights holder.

## 4. Distribution-model analysis to be approved

| Model | Conveyance/other legal questions | Evidence and obligations to resolve |
| --- | --- | --- |
| Public source repository | Existing source access and forks | Confirm notices, copyright statements, licence scope and repository terms |
| Public hosted GitHub Pages app | Whether hosted interaction alone triggers GPL obligations and what other regulatory/contract duties apply | Counsel conclusion; preserve corresponding-source access and accurate prototype claims |
| Downloadable static/PWA build | Likely recipient obtains object/source-capable product; exact conclusion reserved to counsel | Licence copy, corresponding source offer/access, modification marking, notices, build/install information as applicable |
| Institution-hosted build | Allocation of manufacturer, modifier, deployer and support responsibilities | Contract, source/notice delivery, change control, security updates, field-action authority |
| Institution-modified/forked build | Who becomes manufacturer and how modifications are identified/supported | GPL compliance, attribution/marking, regulatory impact and version differentiation |
| Managed-device/MDM deployment | App/web-clip configuration and installed cache distribution | Installation/update/recall control, source/notices and device-management responsibilities |
| Proprietary relicensing or dual licensing | Whether all necessary copyrights can be relicensed | Signed assignments/permissions from every relevant holder before reliance |

## 5. Third-party software inventory

At the current lockfile, direct dependencies resolve as follows; this is not a
complete SBOM or licence compatibility opinion.

| Package | Resolved version | Lockfile licence field | Use |
| --- | ---: | --- | --- |
| `katex` | 0.18.1 | MIT | Runtime equation rendering/fonts |
| `svelte` | 5.56.8 | MIT | Runtime/UI framework |
| `@axe-core/playwright` | 4.12.1 | MPL-2.0 | Development verification |
| `@playwright/test` | 1.62.1 | Apache-2.0 | Development verification |
| `@sveltejs/vite-plugin-svelte` | 7.2.0 | MIT | Build tooling |
| `svelte-check` | 4.7.4 | MIT | Static checking |
| `vite` | 8.2.1 | MIT | Build tooling |

The package lock includes transitive MIT, Apache-2.0, MPL-2.0, ISC and
BSD-3-Clause metadata. Before G1/G6, generate a complete dependency and bundled-
asset SBOM, retain actual licence texts/notices, verify every package source and
licence, and have counsel assess compatibility and notice placement. Lockfile
metadata alone is not proof.

## 6. Media, generated assets and marks

IP-000 inventories container illustrations, mockups and the app-icon derivation
chain. For each, retain editable/source material where available, creator and
creation date, generation tool/model and applicable terms if generated, prompts
or provenance records needed for audit, post-processing, embedded fonts/assets,
and a signed originality/licence statement.

“Dosage,” the icon and other branding have no committed trademark search or
clearance. The software licence does not grant a trademark right. Counsel must
approve name/mark use and any policy for forks or modified builds.

## 7. Required legal conclusions

Counsel must provide a signed conclusion covering:

1. the rights held by the proposed legal manufacturer for every product part;
2. unresolved contributor or asset provenance gaps and their disposition;
3. GPL-3.0 obligations for every planned distribution model;
4. third-party licence compatibility, notices and source obligations;
5. whether proprietary relicensing is available or prohibited;
6. trademark/product-name disposition; and
7. whether the manufacturer can contractually and practically support,
   correct, suspend and recall the product.

## Approval

Counsel conclusion: **Pending — G1 blocker.**

| Role | Name | Decision | Date/signature | Evidence reference |
| --- | --- | --- | --- | --- |
| Legal manufacturer | Unassigned | Pending | — | — |
| IP/commercialization counsel | Unassigned | Pending | — | — |
| Quality lead | Unassigned | Pending | — | — |
