# DEV-001 — Development and verification tooling decision

| Field | Value |
| --- | --- |
| Record ID | DEV-001 |
| Status | Draft — proposal only; G0/G1/G2 open; not approved |
| Owner | Software lead (unassigned) |
| Required approvers | Quality lead and independent software/calculation verifier; security/privacy review of added tools |
| Clinical review | Pharmacy lead for oracle-independence and corpus implications |
| Target | `0.2.0-classification` reference product |
| Source baseline | Authorization branch based on `552fa82`; exact approval commit pending |
| Draft version/date | 0.1 / 2026-08-07 |

This record proposes the Step 2 tooling decisions required by
`AUTHORIZATION_PLAN.md`. It does not approve a tool, authorize dependency
installation, close G2, or establish verification evidence. No dependency or
configuration change may cite this draft as approval. Exact installed versions,
licence review and compatibility results must be attached before signatures.

## 1. Current repository state

The repository currently has:

- JavaScript/Svelte application code and TypeScript Playwright tests;
- `svelte-check` as `npm run check`, Vite builds and Playwright E2E tests;
- Node 24 in GitHub Actions and a version 3 `package-lock.json`;
- no `tsconfig.json`, safety-critical TypeScript domain module, Vitest,
  fast-check, unit-test script, coverage tool, lint script or formatting script;
- no Nix definition or pinned non-JavaScript development environment; and
- no Lean, Lake or Rocq configuration.

Consequently, `npm run test:unit` and `npm test` in Steps 3 and 7 are currently
hypothetical. Existing Playwright results cannot substitute for domain-unit and
property verification.

## 2. Proposed decision register

Every decision remains **Pending** until the named approvers sign section 13.

| Decision | Proposed disposition | Status |
| --- | --- | --- |
| DEV-D01 — domain language | Use TypeScript for domain, result, formatting and storage boundaries; do not use unchecked JavaScript or JSDoc as the safety-critical baseline. | Pending |
| DEV-D02 — unit runner | Use Vitest in deterministic, non-watch `run` mode for controlled unit/integration runs. | Pending |
| DEV-D03 — property runner | Use fast-check from Vitest; retain the initial/replay seed, path and minimized counterexample for every failure. | Pending |
| DEV-D04 — coverage | Use Vitest's V8 coverage provider. Coverage is a review aid, never an acceptance oracle. | Pending |
| DEV-D05 — static checks | Use strict TypeScript, `svelte-check`, ESLint and Prettier check mode. Type and lint failures are release blocking; formatting failures block CI but have no independent safety claim. | Pending |
| DEV-D06 — dependency boundary | Provision JavaScript libraries through `package.json`/`package-lock.json`; provision Node, browsers/system libraries and formal executables through pinned Nix inputs or an approved immutable CI image as specified below. | Pending |
| DEV-D07 — CI | Run locked install, static checks, unit/property tests and build before E2E. Run formal/differential jobs when their separately gated configuration exists. | Pending |
| DEV-D08 — independence | The implementer may write tests but cannot be the sole source or approver of expected clinical/numeric results. | Pending |
| DEV-D09 — runtime metadata | Pin Node 24 and npm through Nix or the approved immutable CI image, and declare compatible `engines` plus an exact `packageManager` in `package.json`. | Pending |

## 3. Candidate packages and version control

The following exact versions were observed from the npm registry on
2026-08-07. They are compatibility candidates, not installed or approved
versions. Approval requires a clean-checkout spike against the then-current
Svelte/Vite lock, package licences and vulnerability results. If a candidate
changes, this table and the impact review must change before approval.

| Package | Candidate | Purpose | Installation class |
| --- | ---: | --- | --- |
| `typescript` | `7.0.2` | Compiler and strict domain type checking | `devDependencies` |
| `@types/node` | `26.1.2` | Typed Node configuration/test interfaces | `devDependencies` |
| `vitest` | `4.1.10` | Unit and integration runner | `devDependencies` |
| `fast-check` | `4.9.0` | Reproducible property-based tests | `devDependencies` |
| `@vitest/coverage-v8` | `4.1.10` | Machine-readable coverage | `devDependencies` |
| `eslint` | `10.8.0` | Static lint orchestration | `devDependencies` |
| `@eslint/js` | `10.0.1` | Core ESLint rules | `devDependencies` |
| `typescript-eslint` | `8.66.0` | TypeScript-aware linting | `devDependencies` |
| `eslint-plugin-svelte` | `3.22.0` | Svelte linting | `devDependencies` |
| `globals` | `17.9.0` | Explicit browser/Node global sets | `devDependencies` |
| `prettier` | `3.9.6` | Deterministic formatting | `devDependencies` |
| `prettier-plugin-svelte` | `4.1.1` | Svelte formatting | `devDependencies` |

Do not use floating global tools, unrecorded `npx` downloads or an npm install
that leaves the lockfile unreviewed. Once approved, the exact resolved package
graph in `package-lock.json`, not a range shown in `package.json`, identifies
the controlled JavaScript dependency set. `npm ci` is mandatory in CI and in a
clean controlled verification run.

## 4. TypeScript boundary and configuration

Create a committed `tsconfig.json` used by the compiler, `svelte-check`,
Vitest and editor integrations. The proposed safety-relevant settings are:

```json
{
  "compilerOptions": {
    "strict": true,
    "noEmit": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "noImplicitOverride": true,
    "noFallthroughCasesInSwitch": true,
    "useUnknownInCatchVariables": true,
    "verbatimModuleSyntax": true,
    "moduleResolution": "Bundler",
    "target": "ES2022"
  }
}
```

The implementation may extend a Svelte/Vite base configuration, but it must
preserve the above protections or document and approve each exception. Domain
and storage modules must not use `any`, unchecked type assertions or
`@ts-ignore`. A narrowly justified suppression must name a requirement/anomaly,
be locally scoped and receive code-review approval.

Safety-critical unions must be exhaustively handled. External values—including
form text, local storage, JSON and formal-oracle output—enter as `unknown` and
be parsed into approved types before use. The TypeScript compiler is a design
control, not proof that parsed runtime values are valid.

## 5. Test layout and isolation

Use these conventions:

```text
src/lib/domain/*.ts
src/lib/domain/*.test.ts
src/lib/storage/*.ts
src/lib/storage/*.test.ts
tests/integration/*.test.ts
tests/formal-conformance/*.test.ts
tests/e2e/**/*.spec.ts
reports/unit/
reports/coverage/
```

- `*.test.ts` runs in Vitest; `*.spec.ts` under `tests/e2e` runs in Playwright.
- Pure domain tests use the Node environment and may not import Svelte, the DOM,
  local storage or browser globals.
- Storage integration tests use explicit in-memory fakes/adapters rather than a
  hidden process-global store.
- Tests use no live network, current time, locale defaults or random source
  unless injected and recorded.
- Test-only helpers must not become production arithmetic or the expected-value
  oracle.
- A failed test may not be made green by increasing tolerance, deleting a case
  or refreshing a snapshot without an anomaly and impact review.

## 6. Proposed package scripts

The approved implementation should add the following exact baseline scripts.
The Vitest configuration, rather than ad hoc command flags, must select the
Node environment, deterministic execution and `default` plus JUnit reporters.
CLI syntax must be proved against the approved package versions before G2
closes.

```json
{
  "scripts": {
    "typecheck": "tsc --noEmit -p tsconfig.json",
    "check": "svelte-check --tsconfig ./tsconfig.json && npm run typecheck",
    "lint": "eslint . --max-warnings 0",
    "format:check": "prettier --check .",
    "format": "prettier --write .",
    "test": "npm run test:unit",
    "test:unit": "vitest run --config vitest.config.ts",
    "test:unit:watch": "vitest --config vitest.config.ts",
    "test:unit:coverage": "vitest run --config vitest.config.ts --coverage"
  }
}
```

The corresponding Vitest configuration must write JUnit to
`reports/unit/junit.xml`, coverage to `reports/coverage/`, include only approved
unit/property/integration patterns, exclude Playwright specs, reject an empty
suite and disable shuffle/retry for a controlled run.

| Script | Required semantics |
| --- | --- |
| `typecheck` | `tsc --noEmit -p tsconfig.json` |
| `check` | Run `svelte-check --tsconfig ./tsconfig.json` and `typecheck`; preserve the existing public command. |
| `lint` | Run ESLint over committed JS/TS/Svelte/config sources with zero warnings permitted. |
| `format:check` | Check committed source/config/document formatting without writing files. |
| `format` | Developer-only deterministic formatting; never used to mutate files during controlled verification. |
| `test:unit` | One deterministic, non-watch Vitest run, including unit, property and non-browser integration tests, with console plus JUnit output. |
| `test:unit:watch` | Developer watch mode; explicitly not verification evidence. |
| `test:unit:coverage` | Controlled Vitest run with V8 text, JSON and LCOV reports. |
| `test` | Explicit alias to `npm run test:unit`; it must not rely on npm's missing-script default. |
| `test:e2e` | Preserve the explicit `e2eha5h` fixture build and run Playwright; fixture results are not release-build identity evidence. |
| `test:formal` | When CE5 is approved, invoke the pinned Nix/Lean environment without a global Lean installation. |
| `test:formal:conformance` | When CE5 is approved, produce canonical reference vectors and compare the TypeScript engine to them. |

The two formal-script strings are deliberately not added to the baseline JSON
above: their repository entry points do not exist, and inventing commands now
would create the same hypothetical-command gap that this record is intended to
close. CE5 must amend DEV-001 with the exact, executable Nix/Lake/conformance
commands before adding either script.

`test:unit` must exit non-zero for a failed assertion, unhandled rejection,
unexpected console error, missing expected test file or report-write failure.
Watch mode, update-snapshot mode and coverage-threshold override flags are
prohibited in a controlled verification invocation.

## 7. Determinism and property-test replay

The Vitest configuration must disable test-order shuffling for controlled runs,
use a documented worker policy and fail on `.only`. Process timezone/locale,
clock and all generated inputs must be controlled where relevant. Each run
manifest records the runner version, Node version, OS/architecture, worker
count and environment variables that affect results.

Each fast-check property must have a stable property ID, explicit generator
bounds derived from CALC-001 and an explicit run count approved in VVP-001. For
each run, record:

- fast-check version;
- initial seed and any replay `path`;
- requested and completed run counts;
- minimized counterexample and failure text; and
- requirement/hazard links.

CI may use an approved rotating seed to broaden discovery only if it records
that seed. The controlled G7 run must include a fixed regression-seed set plus
the generated run's recorded seed. Any failure is an anomaly; rerunning with a
different seed does not erase it.

## 8. Reports, coverage and acceptance

Vitest must emit human-readable console output and JUnit XML to
`reports/unit/junit.xml`. Coverage mode must emit text, JSON and LCOV beneath
`reports/coverage/`. CI uploads reports even after failure. VVP-001 governs
retention and the exact run manifest.

Before G3/G7, quality may set minimum coverage thresholds after reviewing the
domain structure. Regardless of percentage, acceptance requires:

- every approved CALC-001 case and boundary;
- every applicable SYS-001 requirement and RMF-001 control;
- every critical/high regression;
- all relevant branches of each discriminated domain result; and
- independent approval of expected values.

One hundred percent coverage does not prove arithmetic correctness and cannot
close a missing requirement, missing boundary or failed oracle review.

## 9. Linting and formatting policy

ESLint is proposed for defect-oriented rules: no floating promises, exhaustive
domain decisions, no unsafe `any` flow, no implicit coercion at external
boundaries, no unreachable code and Svelte correctness. A rule must not be
enabled merely for style if Prettier owns that concern. The final flat ESLint
configuration and any exception require review with the exact tool versions.

The controlled CI sequence treats `typecheck`, `svelte-check`, lint errors and
unit failures as release blocking. A Prettier check failure blocks merge to
keep evidence-producing diffs stable, but is not represented as a clinical
risk control. Existing files may be formatted in a separate mechanical commit
so a tooling change does not obscure functional review.

## 10. CI invocation and separation

The proposed unprivileged verification job order is:

```text
npm ci
npm run check
npm run lint
npm run format:check
npm run test:unit
npm run test:unit:coverage
npm run build
npm run test:e2e
```

The unit and coverage commands may be combined only if the one invocation
preserves the named reports and exact semantics. A PR job runs with read-only
repository permissions and no deployment secret. Deployment remains a
dependent, separately permissioned job and cannot turn a failed verification
job green. Actions and the runner environment must be pinned/recorded under
SEC-001 before G6/G7 evidence is claimed.

## 11. Provisioning boundary: package.json versus Nix

Installed dependencies are provided by one of two controlled sources:

| Item | Controlled source | Required lock/evidence |
| --- | --- | --- |
| Application, test, lint, formatting and JS reporting libraries | `package.json` | reviewed `package-lock.json`, `npm ci`, SBOM/licence/vulnerability record |
| Approved JavaScript decimal library, if selected | `package.json` runtime dependency | lockfile, CALC-001 evaluation, SBOM and browser compatibility evidence |
| Node.js, npm, Git and other command-line tools | Nix development/build definition | pinned `flake.lock` (or approved equivalent) and run manifest |
| Playwright browser binaries and required native libraries | Nix, or an immutable documented CI image if Nix support is not feasible | exact browser revision, OS image and system-library record |
| Lean compiler and Lake | Nix | pinned input plus committed `lean-toolchain` |
| Lean libraries | committed Lake configuration | reviewed `lake-manifest.json` revisions |
| Rocq/OCaml/Dune/extraction tools, only after Phase B approval | Nix | pinned inputs; no unmanaged `opam` switch |

JavaScript executables are invoked from the locked local package graph through
npm scripts. Native/system/formal executables are exposed by Nix and must not
be silently downloaded by an npm lifecycle script. The Nix shell and CI report
the same controlled major versions. If Nix cannot provision an item, work stops
until quality/security approve an equally reproducible source; a developer's
global install is not an acceptable fallback.

This division controls *installed tooling*. It does not make Nix a second
JavaScript dependency manager and does not authorize checking `node_modules`
or generated formal binaries into source control.

The compatibility spike shall also propose and test `package.json` metadata.
The current environment's Node `24.13.0` and npm `11.6.2` are candidates, not
approved versions. The target shall declare Node 24 compatibility (excluding an
untested future major) and an exact `packageManager` npm version that matches
the pinned Nix/CI environment. CI shall fail clearly when the controlled major
version is not in use; metadata alone is not the version-provisioning control.

## 12. Oracle independence and change control

The pharmacy lead or independent calculation verifier supplies or approves the
golden expected values without importing or executing the production engine.
Property invariants are reviewed against CALC-001/RMF-001. Generated values
from Lean may provide a differential oracle only after the Lean specification
itself is independently reviewed; identical code translated into two languages
is not independent evidence.

Changes to a compiler, runner, property generator, seed policy, coverage
provider, configuration, report format, Node/browser/Nix input, formal tool,
lockfile or relevant script require:

1. a documented reason and affected requirement/risk analysis;
2. licence/security review of the new dependency graph;
3. clean-checkout compatibility and regression runs;
4. review of any changed expected output or generated vectors; and
5. reapproval/rerun of affected evidence.

## 13. Approval prerequisites and signatures

Before approval, attach: the compatibility-spike commit; exact lockfile diff;
package licence/vulnerability review; proposed `tsconfig`, Vitest and lint
configuration; sample JUnit/coverage/property-replay evidence; Nix/toolchain
proposal; and VVP-001 cross-review. G2 remains open until those artifacts and
CALC-001/RMF-001 are approved.

| Role | Name | Decision | Date/signature |
| --- | --- | --- | --- |
| Software lead | Unassigned | Pending | — |
| Quality lead | Unassigned | Pending | — |
| Security/privacy lead | Unassigned | Pending | — |
| Independent verifier | Unassigned | Pending | — |
| Pharmacy lead (oracle implications) | Unassigned | Pending | — |
