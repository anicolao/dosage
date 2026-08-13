# G0-03-FRM — Contributor and asset provenance evidence

> **CONTROLLED TEMPLATE — NOT COMPLETED OR APPROVED.** This form reconciles
> people, commits, source, documents and assets to objective provenance
> evidence. Completion supports G0-03 but does not replace the independent
> rights/GPL/distribution opinion required by G0-04 and IP-001. It does not by
> itself prove title, permit relicensing or authorize distribution.

## 1. Record control and inventory boundary

| Field | Required entry |
| --- | --- |
| Record ID | `G0-03-FRM` |
| Record version | `[ENTER VERSION]` |
| Record status | Draft / In review / Approved / Superseded `[SELECT ONE]` |
| Product and proposed version | `[ENTER]` |
| Legal manufacturer | `[ENTER EXACT NAME FROM APPROVED G0-01-FRM]` |
| Repository and canonical URL | `[ENTER]` |
| Inventory start revision | `[ENTER ROOT/FIRST INCLUDED FULL COMMIT SHA]` |
| Inventory end revision | `[ENTER FULL COMMIT SHA]` |
| Inventory date | `[YYYY-MM-DD]` |
| Prepared by | `[ENTER NAME/ROLE]` |
| Controlled evidence location | `[ENTER IMMUTABLE/AUDITABLE LOCATION]` |
| Supersedes | `[ENTER RECORD ID/VERSION OR NONE]` |

This record must account for the full reachable history and working tree at the
inventory end revision, including deleted/replaced content that remains in
distributed history, generated files, automation, design materials, fonts,
icons, documentation, tests, formal specifications, prompts/source files and
third-party content. State any excluded branch, tag, submodule, LFS object,
release artifact or external design store and justify the exclusion.

Exclusions and rationale:

`[ENTER OR STATE NONE]`

## 2. Reproducible inventory method

| Check | Method/command or source | Result/evidence ID | Reviewer |
| --- | --- | --- | --- |
| All local/remote branches and tags enumerated | `[ENTER]` | `[EV-INV-___]` | `[ENTER]` |
| Unique Git author/committer names and emails enumerated | `[ENTER]` | `[EV-INV-___]` | `[ENTER]` |
| Commit coverage by identity and path enumerated | `[ENTER]` | `[EV-INV-___]` | `[ENTER]` |
| Co-authors, merge/PR authors and patch sources reviewed | `[ENTER]` | `[EV-INV-___]` | `[ENTER]` |
| Deleted/replaced historical assets reviewed | `[ENTER]` | `[EV-INV-___]` | `[ENTER]` |
| Submodules, LFS, vendored/generated files and archives reviewed | `[ENTER]` | `[EV-INV-___]` | `[ENTER]` |
| Current source/document/asset path inventory generated | `[ENTER]` | `[EV-INV-___]` | `[ENTER]` |
| npm/Nix/other third-party dependency manifests captured | `[ENTER]` | `[EV-INV-___]` | `[ENTER]` |
| External design/generation tools and source stores identified | `[ENTER]` | `[EV-INV-___]` | `[ENTER]` |
| Repository ownership/transfers/forks relevant to provenance reviewed | `[ENTER]` | `[EV-INV-___]` | `[ENTER]` |

Retain command outputs or reports with tool versions and hashes. A manually
typed list without a reproducible completeness check is insufficient.

## 3. Identity reconciliation and contribution coverage

One natural person or organization may have multiple Git identities. Do not
merge identities in `.mailmap` or this record until the person or authorized
representative confirms the relationship.

| Contributor ID | Git/display identities | Verified legal name | Relationship when work was created | Commit/path coverage | Rights-basis evidence | Attestation status |
| --- | --- | --- | --- | --- | --- | --- |
| `CTR-___` | `[ENTER NAMES/EMAILS]` | `[ENTER]` | Employee / contractor / owner / volunteer / tool provider / other `[ENTER]` | `[ENTER RANGES/PATHS OR REPORT]` | `[EV-RGT-___]` | Signed / open |

For every identity, classify whether it represents an author, committer only,
bot, merge service, vendor or other non-author and retain the basis. Automation
must not be excluded solely because the author field says “bot”; identify the
human-authored inputs and whether generated output can contain independent
copyrightable or licensed material.

### 3.1 Contributor evidence required

For each `CTR-*`, attach the applicable evidence:

- signed contributor provenance attestation from section 9;
- employment agreement and applicable invention/copyright provisions;
- contractor agreement, assignment or licence identifying scope and parties;
- employer/rights-holder confirmation where the contributor could not
  personally grant the relevant rights;
- third-party source/licence/notice for adapted or copied material;
- explanation and generation inputs/terms for tool-generated material; and
- identity evidence sufficient to connect the signatory to Git identities.

Do not place unnecessary identity documents or contract contents in the public
repository. Retain them in the controlled evidence store and cite immutable
references here.

## 4. Source, documentation and formal-material inventory

Group files only when they share the same author/source, creation method and
rights basis. Use separate rows when provenance differs.

| Item ID | Paths/material | Creator/source | Creation/adaptation method | First commit/date | Rights/licence asserted | Evidence ID | Open issue |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `SRC-___` | `[ENTER]` | `[CTR-___ OR THIRD PARTY]` | Original / adapted / generated / copied `[DETAIL]` | `[ENTER]` | `[ENTER WITHOUT LEGAL CONCLUSION]` | `[EV-RGT-___]` | `[ENTER OR NONE]` |

Include application source, tests, CI/build scripts, regulatory documents,
calculation specifications, Lean/Rocq material, test vectors and generated
reports where they may contain authored material.

## 5. Visual, font, icon and generated-asset inventory

| Asset ID | Current/historical paths | Creator/source | Tool/model/version and date | Prompt/input/editable source | Derivation chain | Licence/terms/attribution | Trademark/name issue | Evidence ID |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `AST-___` | `[ENTER]` | `[CTR-___ OR SOURCE]` | `[ENTER OR N/A]` | `[ENTER CONTROLLED REFERENCE]` | `[ENTER]` | `[ENTER]` | `[ENTER]` | `[EV-AST-___]` |

For generated assets, retain applicable tool terms as they existed on the
generation date, prompts/inputs where permitted, human editing steps and hashes
of master/derived files. For fonts and bundled media, record the exact licence,
notice and redistribution conditions. Product-name or trademark clearance is a
separate counsel conclusion; identify the evidence request rather than marking
it clear here.

## 6. Third-party software and data boundary

| Package/data group | Authoritative manifest/SBOM | Locked revision/version | Licence report/evidence | Required notices/source duties | Owner and later gate |
| --- | --- | --- | --- | --- | --- |
| npm production/build/test dependencies | `package.json`; `package-lock.json`; `[SBOM REF]` | `[ENTER HASH/VERSION]` | `[EV-3P-___]` | `[PENDING COUNSEL ANALYSIS]` | Software/IP counsel; G0-04/G1/G6 |
| Nix/Lean/toolchain dependencies | `flake.nix`; `flake.lock`; Lean/Lake manifests | `[ENTER HASH/VERSION]` | `[EV-3P-___]` | `[PENDING COUNSEL ANALYSIS]` | Software/IP counsel; G0-04/G1/G6 |
| Other data, examples or external references | `[ENTER OR NONE]` | `[ENTER]` | `[EV-3P-___]` | `[ENTER]` | `[ENTER]` |

G0-03 requires a complete identification boundary and available source
evidence. Final obligation, notice, GPL compatibility and distribution-model
analysis belongs in G0-04/IP-001 and later SBOM/licence review.

## 7. Coverage reconciliation and gaps

| Reconciliation | Total | Accounted for | Open | Evidence/report |
| --- | ---: | ---: | ---: | --- |
| Unique contributor identities | `[ENTER]` | `[ENTER]` | `[ENTER]` | `[EV-INV-___]` |
| Commits in inventory boundary | `[ENTER]` | `[ENTER]` | `[ENTER]` | `[EV-INV-___]` |
| Current source/document groups | `[ENTER]` | `[ENTER]` | `[ENTER]` | `[EV-INV-___]` |
| Current/historical asset groups | `[ENTER]` | `[ENTER]` | `[ENTER]` | `[EV-INV-___]` |
| Third-party dependency/data groups | `[ENTER]` | `[ENTER]` | `[ENTER]` | `[EV-INV-___]` |

| Gap ID | Identity/item affected | Missing or conflicting evidence | Owner | Due date | Gate impact | Resolution evidence |
| --- | --- | --- | --- | --- | --- | --- |
| `PRV-GAP-___` | `[ENTER]` | `[ENTER]` | `[ENTER]` | `[ENTER]` | Blocking / non-blocking `[JUSTIFY]` | `[ENTER OR OPEN]` |

G0-03 cannot be approved while an author identity, material contribution,
current distributed asset or relevant rights basis is unknown. Counsel may
identify additional evidence needed for G0-04 even after factual inventory
completeness is approved.

## 8. Evidence register

| Evidence ID | Document/report | Subject/scope | Issuer/custodian | Date/version/hash | Verification performed | Controlled location/retention |
| --- | --- | --- | --- | --- | --- | --- |
| `EV-INV-___` | `[ENTER]` | `[ENTER]` | `[ENTER]` | `[ENTER]` | `[ENTER]` | `[ENTER]` |
| `EV-RGT-___` | `[ENTER]` | `[ENTER]` | `[ENTER]` | `[ENTER]` | `[ENTER]` | `[ENTER]` |
| `EV-AST-___` | `[ENTER]` | `[ENTER]` | `[ENTER]` | `[ENTER]` | `[ENTER]` | `[ENTER]` |
| `EV-3P-___` | `[ENTER]` | `[ENTER]` | `[ENTER]` | `[ENTER]` | `[ENTER]` | `[ENTER]` |

## 9. Contributor/rights-holder attestation annex

Complete one signed annex per contributor or relevant rights holder. An
authorized employer/organization representative must sign where that entity,
rather than the individual contributor, owns or controls the rights.

| Field | Required entry |
| --- | --- |
| Contributor ID and verified legal name | `[ENTER]` |
| Git identities | `[ENTER]` |
| Employer/principal when contributions were made | `[ENTER OR NONE]` |
| Contribution dates/commits/paths | `[ENTER OR ATTACH REPORT]` |
| Material created entirely by signatory | `[IDENTIFY]` |
| Material adapted/copied/generated with third-party input | `[IDENTIFY SOURCE, TERMS AND EVIDENCE]` |
| Employment/contract/assignment/licence governing work | `[ENTER EVIDENCE ID]` |
| Known third-party confidential/proprietary material included | None / `[DISCLOSE]` |
| Known additional authors or rights claims | None / `[DISCLOSE]` |

Attestation text:

> I confirm that the information above is complete and accurate to the best of
> my knowledge; I have identified material I did not create independently and
> the agreements or permissions that may govern my contributions; I disclose
> any employer, client, co-author or third party that may hold relevant rights;
> and I understand that this factual attestation will be relied upon for legal
> review but is not itself counsel's ownership or licensing conclusion.

| Signatory capacity | Name/organization | Date | Signature/e-approval reference |
| --- | --- | --- | --- |
| Contributor or authorized rights-holder representative | `[ENTER]` | `[ENTER]` | `[ENTER]` |
| Identity/evidence witness or verifier | `[ENTER]` | `[ENTER]` | `[ENTER]` |

## 10. Review and approval

| Signatory | Required decision | Name/organization | Decision and conditions | Date | Signature/e-approval reference |
| --- | --- | --- | --- | --- | --- |
| Software lead | Inventory method covers the exact repository/history boundary and all source, generated and asset groups known to the project. | `[ENTER]` | `[ENTER]` | `[ENTER]` | `[ENTER]` |
| Repository owner/custodian | Branch/tag/history, external source stores and contributor access records have been completely disclosed. | `[ENTER]` | `[ENTER]` | `[ENTER]` | `[ENTER]` |
| Quality lead | Required attestations/evidence are controlled, reconciliation totals agree and no G0-03 blocking gap remains. | `[ENTER]` | `[ENTER]` | `[ENTER]` | `[ENTER]` |
| IP/commercialization counsel | Evidence package is sufficiently complete to undertake G0-04/IP-001 analysis; this signature is not the substantive legal conclusion. | `[ENTER]` | `[ENTER]` | `[ENTER]` | `[ENTER]` |
| Authorized manufacturer officer | Accepts the factual provenance package for the identified product/baseline and commits to resolve any later counsel evidence request. | `[ENTER]` | `[ENTER]` | `[ENTER]` | `[ENTER]` |

Every required `CTR-*` contributor/rights-holder annex must also be signed or
replaced by counsel-accepted objective evidence explicitly listed in section 3.

## 11. Gate-use determination

| Determination | Required entry |
| --- | --- |
| Inventory boundary reproducibly complete | Yes / No `[SELECT]` |
| All identities reconciled | Yes / No `[SELECT]` |
| All material groups linked to evidence | Yes / No `[SELECT]` |
| Required contributor/rights-holder attestations present | Yes / No `[SELECT]` |
| Blocking provenance gaps | None / `[LIST]` |
| G0-03 disposition | Approved / Rejected / Conditional—blocks G0 `[SELECT]` |
| Exact approved record commit | `[ENTER FULL COMMIT SHA]` |
| G0-04 counsel request/package reference | `[ENTER]` |
| GATE-000 updated by/date | `[ENTER NAME AND DATE]` |

Only an **Approved** disposition with no blocking provenance gap may be cited as
G0-03 evidence. G0 remains blocked until the separate G0-04 counsel conclusion
confirms that the legal manufacturer has a sufficient rights/licence basis and
authority for the intended distribution models.
