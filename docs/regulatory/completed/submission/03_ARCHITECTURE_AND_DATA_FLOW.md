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
| Structured source / SHA-256 | `docs/regulatory/records/data/submission/SUB-003.yaml` / `1d3fe8fd72ccdb960dda2aa97fafc354296e630459a6239b3933c557fbb7e4be` |
| Template / SHA-256 | `docs/regulatory/records/templates/submission.md.mustache` / `e8ca736dd37df3c77076e5355d01d1dcf34927304e42b852884b2fca7e14decd` |

Current-state architecture of the source baseline, including localStorage and service-worker behavior; future target controls are excluded.

## Package fields

| ID | Field | Value | Evidence | State |
| --- | --- | --- | --- | --- |
| `ARC-F01` | Deployment/review URL and host owner | ⟦MISSING: SUB-003.required_fields.ARC-F01.value⟧ | ⟦MISSING: SUB-003.required_fields.ARC-F01.evidence_ref⟧ | Open |
| `ARC-F02` | Exact built-artifact digest | ⟦MISSING: SUB-003.required_fields.ARC-F02.value⟧ | ⟦MISSING: SUB-003.required_fields.ARC-F02.evidence_ref⟧ | Open |

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
| `ARC-D01` | Is every actual runtime interface and persistence path disclosed? | ⟦MISSING: SUB-003.decisions.ARC-D01.decision⟧ | ⟦MISSING: SUB-003.decisions.ARC-D01.rationale⟧ | ⟦MISSING: SUB-003.decisions.ARC-D01.evidence_ref⟧ | Open |

## Supporting evidence

| ID | Evidence | Reference | Status | State |
| --- | --- | --- | --- | --- |
| `ARC-E01` | Independent source/build interface inventory | ⟦MISSING: SUB-003.evidence.ARC-E01.reference⟧ | missing | Open |
| `ARC-E02` | Runtime network observation for representative workflows | ⟦MISSING: SUB-003.evidence.ARC-E02.reference⟧ | missing | Open |

## Review and authorization

| Role | Review scope | Name / organization | Decision | Date | Signature reference | State |
| --- | --- | --- | --- | --- | --- | --- |
| Software lead | Approve exact current-state technical accuracy | ⟦MISSING: SUB-003.approvals.1.name/organization⟧ | ⟦MISSING: SUB-003.approvals.1.decision⟧ | ⟦MISSING: SUB-003.approvals.1.date⟧ | ⟦MISSING: SUB-003.approvals.1.signature_ref⟧ | Open |
| Security/privacy reviewer | Confirm interfaces, network and local-data statements are complete for classification facts | ⟦MISSING: SUB-003.approvals.2.name/organization⟧ | ⟦MISSING: SUB-003.approvals.2.decision⟧ | ⟦MISSING: SUB-003.approvals.2.date⟧ | ⟦MISSING: SUB-003.approvals.2.signature_ref⟧ | Open |

## Document determination

**NOT READY**

⟦MISSING: SUB-003.completion_statement⟧

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
- `SUB-003.completion_statement`
- `SUB-003.decisions.ARC-D01.decision`
- `SUB-003.decisions.ARC-D01.evidence_ref`
- `SUB-003.decisions.ARC-D01.rationale`
- `SUB-003.evidence.ARC-E01.reference`
- `SUB-003.evidence.ARC-E01.status`
- `SUB-003.evidence.ARC-E02.reference`
- `SUB-003.evidence.ARC-E02.status`
- `SUB-003.required_fields.ARC-F01.evidence_ref`
- `SUB-003.required_fields.ARC-F01.value`
- `SUB-003.required_fields.ARC-F02.evidence_ref`
- `SUB-003.required_fields.ARC-F02.value`
- `SUB-003.status`
