# SUB-003 — Exact architecture and data flow

> **INCOMPLETE / NOT APPROVED — GENERATED CLASSIFICATION-INQUIRY DOCUMENT.** This is not
> authorization, licensing, clearance, or permission for patient care. Edit
> `docs/regulatory/records/data/submission/SUB-003.yaml`; do not edit this generated file.

| Package control | Value |
| --- | --- |
| Document ID | `SUB-003` |
| Revision | 0.1 |
| Document status | **INCOMPLETE / NOT APPROVED** |
| Package readiness | **NOT READY** |
| Exact prototype baseline | `6b53fde87ff9b193b3c24f7bd93549746b4d6471` |
| Structured source / SHA-256 | `docs/regulatory/records/data/submission/SUB-003.yaml` / `5fb3732775f79670718a2328481c7413b3d081106d67965d13a99c51b27dab7e` |
| Template / SHA-256 | `docs/regulatory/records/templates/submission.md.mustache` / `e8ca736dd37df3c77076e5355d01d1dcf34927304e42b852884b2fca7e14decd` |

Current-state architecture of the source baseline, including localStorage and service-worker behavior; future target controls are excluded.

## Package fields

| ID | Field | Value | Evidence | State |
| --- | --- | --- | --- | --- |
| `ARC-F01` | Deployment/review URL and host owner | Controlled review uses the archived static executable and local npm run preview:e2e server. GitHub Pages is an unvalidated public prototype channel owned by the repository account, not a clinical host. | docs/regulatory/evidence/INQ-000/dosage-0.1.0-6b53fde.zip; vite.config.js; AUTHORIZATION_PLAN.md | Complete |
| `ARC-F02` | Exact built-artifact digest | ZIP SHA-256 8322e6ea7aca435796245a26a796ef5a4508a09b4733642768ae100a63a34442; internal artifact file-manifest SHA-256 87394f7ba3170760d54004916cf3a79ebc1e56cf3c1982d573a8d9af625fe9db | docs/regulatory/evidence/AUTOMATED-FACTS.json | Complete |

## 1. Current runtime components

`Nurse → Svelte App.svelte reactive UI/Number calculation → KaTeX equation rendering → browser DOM`

`Svelte UI ↔ localStorage dosage.favourites.v2 / dosage.history.v2`

`Static HTTPS host → generated cache-first service worker → app-shell Cache Storage → Svelte UI`

All calculation code and runtime record handling are currently in `src/App.svelte`. There is no runtime application server or clinical-system interface.

## 2. Current network and storage facts

Initial load and uncached same-origin in-scope assets may use the static host. The service worker ignores cross-origin and out-of-scope requests rather than providing a formal deny layer. The app source contains no fetch/XHR/beacon/WebSocket/EventSource, analytics or telemetry logic. Favourites/history are JSON arrays in localStorage and may reveal medication context; they have no cloud backup or encryption provided by the app.

## 3. Build and third-party boundary

Vite/Svelte/KaTeX and locked npm dependencies build the static app. Vite injects package version and supplied/Git short revision and generates the service worker from the output inventory. GitHub Pages is a public prototype review channel, not a clinical distribution channel.

## Classification decisions represented

| ID | Question | Position/decision | Rationale | Evidence | State |
| --- | --- | --- | --- | --- | --- |
| `ARC-D01` | Is every actual runtime interface and persistence path disclosed? | Mechanically complete; pending attributable technical and security/privacy acceptance | The controlled application paths are byte-identical to the baseline; automated source inventory and E2E observation cover DOM calculation, KaTeX, both localStorage keys, same-origin static loading and the generated service worker. No other application runtime interface was found. | docs/regulatory/evidence/AUTOMATED-FACTS.json; tests/e2e/004-privacy-and-recovery | Complete |

## Supporting evidence

| ID | Evidence | Reference | Status | State |
| --- | --- | --- | --- | --- |
| `ARC-E01` | Automated source/build interface inventory | docs/regulatory/evidence/AUTOMATED-FACTS.json; scripts/regulatory-facts.mjs | reviewed | Open |
| `ARC-E02` | Runtime network observation for representative workflows | tests/e2e/004-privacy-and-recovery/004-privacy-and-recovery.spec.ts | reviewed | Open |

## Review and authorization

| Role | Review scope | Name / organization | Decision | Date | Signature reference | State |
| --- | --- | --- | --- | --- | --- | --- |
| Software lead | Approve exact current-state technical accuracy | ⟦MISSING: SUB-003.approvals.1.name/organization⟧ | ⟦MISSING: SUB-003.approvals.1.decision⟧ | ⟦MISSING: SUB-003.approvals.1.date⟧ | ⟦MISSING: SUB-003.approvals.1.signature_ref⟧ | Open |
| Security/privacy reviewer | Confirm interfaces, network and local-data statements are complete for classification facts | ⟦MISSING: SUB-003.approvals.2.name/organization⟧ | ⟦MISSING: SUB-003.approvals.2.decision⟧ | ⟦MISSING: SUB-003.approvals.2.date⟧ | ⟦MISSING: SUB-003.approvals.2.signature_ref⟧ | Open |

## Document determination

**NOT READY**

Repository-derived architecture, interface, artifact and runtime-observation evidence is complete. Named software and security/privacy reviewers must accept its completeness and authorize the record.

Required items still open:

- `SUB-003.approvals.1.date`
- `SUB-003.approvals.1.decision`
- `SUB-003.approvals.1.name`
- `SUB-003.approvals.1.organization`
- `SUB-003.approvals.1.signature_ref`
- `SUB-003.approvals.2.date`
- `SUB-003.approvals.2.decision`
- `SUB-003.approvals.2.name`
- `SUB-003.approvals.2.organization`
- `SUB-003.approvals.2.signature_ref`
- `SUB-003.evidence.ARC-E01.status`
- `SUB-003.evidence.ARC-E02.status`
- `SUB-003.status`
