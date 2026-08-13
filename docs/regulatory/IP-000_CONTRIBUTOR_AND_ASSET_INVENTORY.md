# IP-000 — Initial contributor and asset inventory

| Field | Value |
| --- | --- |
| Record ID | IP-000 |
| Status | Draft; counsel review required |
| Owner | Legal manufacturer (unassigned) |
| Required reviewer | IP/commercialization counsel (unassigned) |
| Repository base | `552fa8236480e8fa2f850850eeb513bd98a512c9` |
| Record version | 0.1 |
| Record date | 2026-08-07 |

This is a repository-derived inventory, not an ownership opinion. Git author
fields identify commit metadata; they do not prove legal identity, employment,
assignment, authority, originality or copyright ownership.

## Git identities requiring reconciliation

| Git author identity | Observed role | Required evidence/action |
| --- | --- | --- |
| `anicolao <anicolao@users.noreply.github.com>` | Primary source, documentation and asset contributor | Confirm legal name, relationship to proposed manufacturer, and assignment or licence basis. |
| `anicolao <anicolao@gmail.com>` | Source/deployment commits | Confirm whether this is the same natural person and consolidate with a `.mailmap` only after confirmation. |
| `Alex Nicolaou <anicolao@gmail.com>` | Source/deployment commits | Confirm whether this is the same natural person and whether work was employee, contractor or personal work. |
| `github-actions[bot] <41898282+github-actions[bot]@users.noreply.github.com>` | Automated deployment commits | Verify generated deployment content contains no independently authored material; exclude as a rights holder only with that rationale recorded. |

No contributor licence agreement, copyright assignment, employment record,
contractor agreement or signed provenance statement is present in the
repository. The proposed legal manufacturer is also not identified.

## Committed asset groups

| Asset group | Repository evidence | Preliminary status / required action |
| --- | --- | --- |
| Application source, tests, scripts and product documents | Git history beginning at `4761b9b`; repository `LICENSE` added at `44aa9f6` | GPL-3.0 is present. Confirm copyright notices, author authority and the manufacturer's operational rights. |
| Container illustrations in `static/images/` | Introduced and revised in commits by the primary Git identity | Source/provenance record absent; obtain author declaration and retain editable source if it exists. |
| Design mockups in `design/mockups/` | Introduced by the primary Git identity | Confirm creation method, embedded fonts/assets and permission to distribute. |
| App icon master and derived icons | Added at `552fa82` by the primary Git identity | Confirm generation provenance, prompt/tool terms, post-processing, trademark clearance and derivation chain. |
| KaTeX application dependency and bundled fonts | Declared in `package.json`; resolved by `package-lock.json` | Complete dependency licence inventory and notice analysis in IP-001/SBOM work. |
| Svelte, Vite, Playwright, axe and transitive packages | Declared/resolved through npm manifests | Complete automated and counsel-reviewed licence inventory; retain exact lockfile evidence. |

## Counsel questions before G1

1. Who is the legal manufacturer and what rights does it hold in each
   contributor's work?
2. Is GPL-3.0 the intended distribution model for hosted, downloaded,
   institutionally installed and modified builds, and what source, notice,
   marking or installation-information duties apply to each?
3. Does the manufacturer have sufficient practical and contractual control to
   modify, support, correct, suspend and recall the complete product under its
   name?
4. Are any proprietary relicensing plans contemplated? If so, which additional
   assignments or permissions are required?
5. Are “Dosage,” the icon and visual assets clear for the intended Canadian use
   and distribution channels?
6. Do generated or copied assets carry restrictions or attribution duties not
   represented in the repository?

## Open evidence requests

| Evidence | Responsible role | Status |
| --- | --- | --- |
| Legal manufacturer identity and registered address | Executive/regulatory lead | Open |
| Contributor identity reconciliation and signed provenance statements | Quality/IP counsel | Open |
| Employment/contractor assignment or documented licence basis | IP counsel | Open |
| Complete dependency licence report and required notices | Software/IP counsel | Open |
| Asset generation/source files and applicable tool terms | Software lead/IP counsel | Open |
| Trademark/product-name search and conclusion | IP counsel | Open |

Use `G0-03_CONTRIBUTOR_AND_ASSET_PROVENANCE.md` as the controlled completion,
evidence-reconciliation and signature record for the factual requests above.
Its approval does not replace counsel's separate G0-04/IP-001 conclusion.

## Approval

Counsel conclusion: **Pending.** This initial inventory and the unexecuted
G0-03 template cannot support G0 or G1 approval until the questions and evidence
requests above are resolved and the separate counsel conclusion is signed.
