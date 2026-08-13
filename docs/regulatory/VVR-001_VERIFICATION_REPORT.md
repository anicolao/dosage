# VVR-001 — Verification report

> **DRAFT — NO TEST EXECUTION RECORDED — NO RESULTS OR RELEASE CONCLUSION.**
> This prospective template does not convert prototype or CI observations into
> G7 evidence. Populate it only from a controlled VVP-001 run.

| Field | Controlled value |
| --- | --- |
| Record ID / report version | VVR-001 / `[TBD]` |
| Status | Draft — empty; G7 open |
| Owner | Quality lead `[TBD]` |
| Target product/version | `0.2.0-classification` (proposed; `[TBD approved value]`) |
| Approved VVP-001 revision/hash | `[TBD]` |
| TRC-001 revision/hash | `[TBD]` |
| Run ID / start and end timestamps | `[TBD — NO RUN EXECUTED]` |
| Executor / quality witness | `[TBD]` |

## 1. Run identity and entry authorization

| Identity field | Controlled value |
| --- | --- |
| Source repository / branch / immutable tag | `[TBD]` |
| Full source commit | `[TBD — full hash]` |
| Clean-checkout evidence / status hash | `[TBD]` |
| Displayed version / displayed revision | `[TBD]` / `[TBD]` |
| Primary artifact name / SHA-256 / byte length | `[TBD]` / `[TBD]` / `[TBD]` |
| Non-root-base artifact name / SHA-256 / byte length | `[TBD]` / `[TBD]` / `[TBD]` |
| Version/app-shell manifest SHA-256 | `[TBD]` |
| Package lockfile SHA-256 | `[TBD]` |
| Nix/CI environment definition SHA-256 | `[TBD]` |
| Test data/oracle/configuration manifest SHA-256 | `[TBD]` |
| G3/G4/G5/G6 approval references and hashes | `[TBD — all must be closed]` |
| Quality authorization to execute / timestamp | `[TBD]` |

No execution may begin until every VVP-001 section 3.2 entry criterion is
confirmed, test inputs and expected values are controlled, the checkout is
clean, and the anomaly register includes every known failure/deviation.

## 2. Execution environments

Add one row for every actual environment. Marketing names or “latest” are not
sufficient.

| Environment ID | Purpose | OS/build and architecture | Node/npm/Nix/formal tools | Device/browser/engine/AT | Viewport, scale, locale, network state | Configuration hashes | Deviation |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `[TBD]` | `[TBD]` | `[TBD]` | `[TBD]` | `[TBD]` | `[TBD]` | `[TBD]` | `[TBD/NONE]` |

## 3. Controlled command results

Record exact command text, environment, start/end times, exit code and immutable
log/report hash. A rerun is a separate row and never replaces an earlier
failure.

| Result ID | Command/activity | Environment ID | Exit/result | Totals, failures, skips, retries | Evidence location / SHA-256 | Anomaly IDs |
| --- | --- | --- | --- | --- | --- | --- |
| `[TBD]` | `npm ci` | `[TBD]` | Not run | `[TBD]` | `[TBD]` | `[TBD]` |
| `[TBD]` | `npm run check` | `[TBD]` | Not run | `[TBD]` | `[TBD]` | `[TBD]` |
| `[TBD]` | `npm run lint` | `[TBD]` | Not run | `[TBD]` | `[TBD]` | `[TBD]` |
| `[TBD]` | `npm run format:check` | `[TBD]` | Not run | `[TBD]` | `[TBD]` | `[TBD]` |
| `[TBD]` | `npm run test:unit` | `[TBD]` | Not run | `[TBD]` | `[TBD]` | `[TBD]` |
| `[TBD]` | `npm run build` | `[TBD]` | Not run | `[TBD]` | `[TBD]` | `[TBD]` |
| `[TBD]` | `PUBLIC_BASE_PATH=/dosage/classification npm run build` | `[TBD]` | Not run | `[TBD]` | `[TBD]` | `[TBD]` |
| `[TBD]` | `PUBLIC_BASE_PATH=/dosage/classification npm run check:base` | `[TBD]` | Not run | `[TBD]` | `[TBD]` | `[TBD]` |
| `[TBD]` | `npm run test:e2e` against the exact reference revision | `[TBD]` | Not run | `[TBD]` | `[TBD]` | `[TBD]` |
| `[TBD]` | `npm audit` | `[TBD]` | Not run | `[TBD]` | `[TBD]` | `[TBD]` |
| `[TBD]` | Coverage/formal/differential commands required by approved controls | `[TBD]` | Not run | `[TBD]` | `[TBD]` | `[TBD]` |

## 4. Verification result roll-up

| Area | VVP-001 sections | Required result summary | Pass/fail/not run | Evidence IDs | Open anomaly/deviation IDs |
| --- | --- | --- | --- | --- | --- |
| Numeric parser, calculation, units, boundaries and properties | 6 | `[TBD]` | Not run | `[TBD]` | `[TBD]` |
| Storage, migration and state transitions | 7 | `[TBD]` | Not run | `[TBD]` | `[TBD]` |
| Browser workflows and review resets | 8 | `[TBD]` | Not run | `[TBD]` | `[TBD]` |
| Security, privacy, network and supply chain | 9 | `[TBD]` | Not run | `[TBD]` | `[TBD]` |
| Accessibility and human factors | 10 | `[TBD]` | Not run | `[TBD]` | `[TBD]` |
| Formal/differential verification or approved disposition | 11 | `[TBD]` | Not run | `[TBD]` | `[TBD]` |
| Offline install/update/rollback/eviction/recovery | 5, 8, 9 | `[TBD]` | Not run | `[TBD]` | `[TBD]` |

The final report must give assertion/test totals, controlled property seeds and
minimized failures, coverage, device/browser/assistive-technology matrix,
security findings, SBOM/audit status, proof axioms if applicable, and all
skips/retries. Blank, “not applicable” or deferred entries require an approved
rationale and requirement/risk impact assessment.

## 5. Evidence manifest and traceability

| Evidence ID | Description | Producer/tool version | File/archive location | SHA-256 | TRC requirement/risk/result rows |
| --- | --- | --- | --- | --- | --- |
| `[TBD]` | `[TBD]` | `[TBD]` | `[TBD]` | `[TBD]` | `[TBD]` |

- [ ] Every applicable SYS-001 requirement, RMF-001 control, CALC-001 rule,
  STO-001 rule, SEC-001 control, formal obligation and finding maps through
  TRC-001 to an identified result above.
- [ ] TRC-001 contains no unexplained missing, failed or not-run evidence and
  its controlled revision/hash is recorded.
- [ ] Evidence was copied from transient CI into the controlled quality archive
  with access, retention, backup and integrity controls.

## 6. Anomalies, deviations and reruns

| ID | Detection/run | Severity and safety/security impact | Root cause | Correction / affected evidence | Regression result | Independent disposition/signature |
| --- | --- | --- | --- | --- | --- | --- |
| `[TBD]` | `[TBD]` | `[TBD]` | `[TBD]` | `[TBD]` | `[TBD]` | `[TBD]` |

Every unexpected failure, timeout, flake, proof divergence, missing report,
skip, retry or environment deviation requires an ID before rerun. Critical/high
anomalies block G7. Lower-severity dispositions require quality approval.

## 7. Independence and review

| Activity | Author/executor | Independent reviewer | Independence basis/conflict assessment | Evidence/signature |
| --- | --- | --- | --- | --- |
| Clinical formula and expected-value corpus | `[TBD]` | `[TBD]` | `[TBD]` | `[TBD]` |
| Calculation implementation and unit/property results | `[TBD]` | `[TBD]` | `[TBD]` | `[TBD]` |
| Formal specification/proof/differential results, if used | `[TBD]` | `[TBD]` | `[TBD]` | `[TBD]` |
| Security/privacy evidence | `[TBD]` | `[TBD]` | `[TBD]` | `[TBD]` |
| Accessibility/human-factors evidence | `[TBD]` | `[TBD]` | `[TBD]` | `[TBD]` |
| Final traceability and report conclusion | `[TBD]` | `[TBD]` | `[TBD]` | `[TBD]` |

## 8. Conclusion and approval

**Current conclusion:** No controlled verification run is recorded. Conformity,
clinical suitability and G7 completion cannot be concluded.

Final conclusion: `[TBD — PASS / FAIL, exact scope, residual limitations and
approved deviations; must not claim clinical validity or authorization]`

| Role | Name | Decision | Date/signature | Approved report/archive hash |
| --- | --- | --- | --- | --- |
| Quality lead | `[TBD]` | Pending | `[TBD]` | `[TBD]` |
| Independent verifier | `[TBD]` | Pending | `[TBD]` | `[TBD]` |
| Pharmacy lead | `[TBD]` | Pending | `[TBD]` | `[TBD]` |
| Security/privacy lead | `[TBD]` | Pending | `[TBD]` | `[TBD]` |
| Nursing/human-factors lead | `[TBD]` | Pending | `[TBD]` | `[TBD]` |
| Software lead | `[TBD]` | Pending | `[TBD]` | `[TBD]` |

Any post-G7 code, dependency, configuration, test/oracle or safety-label change
requires impact assessment, a new source/artifact identity, rerun of all
affected verification, updated TRC-001/VVR-001, and reopening G7 when evidence
may be affected.
