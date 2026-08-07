# Installable offline app

The production build exposes install metadata and keeps the complete static app shell available after the network is removed.

**Verifications:**

- [x] The manifest requests standalone display and supplies 192 px and 512 px PNG icons.
- [x] The generated service worker reaches an explicit cache-ready state.
- [x] Closing the online page and reopening while offline restores the calculator.
- [x] A calculation can be reviewed and saved without a network.
- [x] Reloading offline preserves history and reopens the saved calculation in mandatory review.

This scenario does not claim that a first-ever visit works offline, that browser storage cannot be evicted, or that multi-release update and rollback behaviour is clinically validated.
