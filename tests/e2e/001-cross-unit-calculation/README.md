# Cross-unit calculation

An incomplete calculator gates its answer behind a simultaneous, individually checked review of every substituted equation.

## Only vial unit, vial volume, and ordered-dose unit have safe starting defaults

![Only vial unit, vial volume, and ordered-dose unit have safe starting defaults](./screenshots/000-blank-calculator-phone.png)

**Verifications:**

- [x] Medication name, vial amount, and ordered dose remain blank
- [x] Vial unit defaults to mg, vial volume to 1 mL, and ordered-dose unit to mcg
- [x] No final prepared volume is preselected
- [x] No answer or review action is present for incomplete input
- [x] The build is visibly identified as a non-clinical prototype and tells crawlers not to index it

## All four large single-line equations fit together in one no-scroll review panel

![All four large single-line equations fit together in one no-scroll review panel](./screenshots/001-simultaneous-calculation-review-phone.png)

**Verifications:**

- [x] Vial, preparation, conversion, and administration MathML are simultaneously visible
- [x] The mg-to-mcg factor and substituted 2000 mcg order remain explicit
- [x] Every equation is emitted as one uninterrupted KaTeX line
- [x] Headings are left aligned, formulas vertically centred, and grey checks sit on the right
- [x] The review sheet and every equation fit without scrolling or clipping
- [x] The administration answer is still absent from the underlying calculator

## Completing review reveals the 10 mL administration volume

![Completing review reveals the 10 mL administration volume](./screenshots/002-mg-vial-mcg-order-phone.png)

**Verifications:**

- [x] The vial is 10 mg in 1 mL and the order remains 2000 mcg
- [x] Only after completed review is the answer shown as 10 mL

## An equivalent order in mg produces the same answer after a fresh review

![An equivalent order in mg produces the same answer after a fresh review](./screenshots/003-equivalent-mg-order-phone.png)

**Verifications:**

- [x] 2 mg also calculates to 10 mL
- [x] Changing the unit preserved the entered number until it was deliberately edited

## The reverse mcg-to-mg conversion is equally explicit

![The reverse mcg-to-mg conversion is equally explicit](./screenshots/004-mcg-vial-mg-order-phone.png)

**Verifications:**

- [x] 10000 mcg at 2 mg calculates to 10 mL
- [x] Changing any critical value required another completed review
