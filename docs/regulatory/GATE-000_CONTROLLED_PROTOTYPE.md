# GATE-000 — Controlled prototype approval

| Field | Value |
| --- | --- |
| Gate | G0 — controlled prototype |
| Status | Open — not approved |
| Primary owners | Quality lead and software lead (both unassigned) |
| Record version | 0.1 |
| Record date | 2026-08-07 |
| Effective date | None |

Closing this gate confirms containment and traceable baselining only. It does
not approve clinical evaluation, patient care, a classification submission or
commercial distribution.

## Exit checklist

| Requirement | Evidence | Status |
| --- | --- | --- |
| Legacy and current baselines fixed | `BASE-001_PROTOTYPE_BASELINE.md` | Draft; approval pending |
| Source review documents retained unchanged | Git history and repository copies of `CLAUDE_REVIEW.md`, `CODEX_REVIEW.md`, `CANADIAN_REGULATIONS.md` | Present; quality confirmation pending |
| Exact prototype warning visible and tested | `src/App.svelte`; E2E scenarios 001 and 006 | Implemented; CI and quality review pending |
| Public preview indexing discouraged | `index.html` robots metadata | Implemented; deployment verification pending |
| Feature/claim scope frozen | `BASE-001_PROTOTYPE_BASELINE.md` | Draft; owner approval pending |
| Review findings controlled | `FND-001_OPEN_FINDINGS.csv` | Open register created; no finding is quality-closed |
| Classification reference work isolated | Branch `agent/authorization-plan`; draft PR #7 | Present; branch policy/owner approval pending |
| Distribution and access inventoried | `DST-001_PROTOTYPE_DISTRIBUTION.md` | Draft; stale-preview inventory open |
| Legal manufacturer identity and signatory authority | `G0-01_LEGAL_MANUFACTURER_IDENTITY_AND_SIGNATORY_AUTHORITY.md` | Controlled template present; identity, evidence and signatures missing |
| Quality/software authority and competence | `G0-02_ROLE_AUTHORITY_AND_COMPETENCE.md` | Controlled template present; appointments, assessments, evidence and signatures missing |
| Contributors and assets inventoried | `IP-000_CONTRIBUTOR_AND_ASSET_INVENTORY.md`; `G0-03_CONTRIBUTOR_AND_ASSET_PROVENANCE.md` | Initial inventory and controlled completion template present; reconciliation, evidence and signatures missing |
| Manufacturer rights and GPL obligations reviewed | Counsel conclusion in IP-000/IP-001 | Not started; blocking |

## Blocking actions

- Complete and approve G0-01-FRM for the legal manufacturer and signatory.
- Complete and approve both role packets in G0-02-FRM.
- Complete and approve G0-03-FRM, then obtain IP/commercialization counsel's
  separate G0-04 written conclusion.
- Review the public deployment inventory and approve its retention controls.
- Review every finding's preliminary severity, owner and disposition.
- Record successful CI/deployment evidence for the exact gate candidate commit.

## Approval record

The gate remains open unless every required row contains a named person,
decision, date, signature/electronic approval reference, and exact approved
commit.

| Role | Name | Decision | Date/signature | Approved commit |
| --- | --- | --- | --- | --- |
| Quality lead | Unassigned | Pending | — | — |
| Software lead | Unassigned | Pending | — | — |
| Legal manufacturer | Unassigned | Pending | — | — |
