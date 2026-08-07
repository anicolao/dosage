<script>
  import { onMount, tick } from 'svelte';
  import katex from 'katex';
  import 'katex/dist/katex.min.css';

  const volumes = [10, 50, 100, 250, 500, 1000];
  const favouritesPerPage = 6;
  const baseUrl = import.meta.env.BASE_URL;
  const appVersion = import.meta.env.VITE_APP_VERSION;
  const gitHash = import.meta.env.VITE_GIT_HASH;
  const storageKeys = {
    favourites: 'dosage.favourites.v2',
    history: 'dosage.history.v2'
  };

  let tab = 'mix';
  let medicationName = '';
  let medicationAmount = '';
  let vialUnit = 'mg';
  let vialVolume = '1';
  let finalVolume = null;
  let orderedDose = '';
  let orderedUnit = 'mcg';
  let reviewed = false;
  let checkedSteps = [];
  let acknowledged = false;
  let favourites = [];
  let history = [];
  let storageAvailable = true;
  let notice = '';
  let detailDialog;
  let favouritePage = 0;
  let historyPage = 0;

  $: amount = Number(medicationAmount);
  $: vial = Number(vialVolume);
  $: dose = Number(orderedDose);
  $: hasRequiredValues =
    medicationAmount !== '' && vialUnit !== '' && vialVolume !== '' &&
    finalVolume !== null && orderedDose !== '' && orderedUnit !== '';
  $: compatibleDimensions = hasRequiredValues && unitDimension(vialUnit) === unitDimension(orderedUnit);
  $: amountInBaseUnit = amount * unitFactor(vialUnit);
  $: availableInOrderedUnit = amountInBaseUnit / unitFactor(orderedUnit);
  $: validNumbers =
    Number.isFinite(amount) && amount > 0 &&
    Number.isFinite(vial) && vial > 0 &&
    Number.isFinite(dose) && dose > 0;
  $: error = !hasRequiredValues
    ? ''
    : !validNumbers
      ? 'Enter positive numbers for vial amount, vial volume, and ordered dose.'
      : !compatibleDimensions
        ? 'Vial and ordered-dose units are not compatible.'
      : vial > finalVolume
        ? 'Final prepared volume cannot be smaller than the vial volume.'
        : dose > availableInOrderedUnit
          ? 'Ordered dose is greater than the medication available in one vial.'
          : '';
  $: isValid = hasRequiredValues && validNumbers && !error;
  $: vialConcentration = isValid ? amount / vial : null;
  $: preparedConcentration = isValid ? amount / finalVolume : null;
  $: preparedConcentrationInOrderedUnit = isValid
    ? amountInBaseUnit / unitFactor(orderedUnit) / finalVolume
    : null;
  $: administrationVolume = isValid ? dose / preparedConcentrationInOrderedUnit : null;
  $: calculationSteps = isValid ? [
    {
      id: 'vial',
      title: 'Vial concentration',
      expression: `\\frac{${mathNumber(amount)}\\,${mathUnit(vialUnit)}}{${mathNumber(vial)}\\,\\mathrm{mL}} = ${concentration(vialConcentration, vialUnit)}`
    },
    {
      id: 'prepared',
      title: 'Prepared concentration',
      expression: `\\frac{${mathNumber(amount)}\\,${mathUnit(vialUnit)}}{${finalVolume}\\,\\mathrm{mL}} = ${concentration(preparedConcentration, vialUnit)}`
    },
    ...(vialUnit !== orderedUnit ? [{
      id: 'conversion',
      title: 'Unit conversion',
      expression: vialUnit === 'mg'
        ? `${concentration(preparedConcentration, vialUnit)} \\times \\frac{1000\\,${mathUnit('mcg')}}{1\\,${mathUnit('mg')}} = ${concentration(preparedConcentrationInOrderedUnit, orderedUnit)}`
        : `${concentration(preparedConcentration, vialUnit)} \\times \\frac{1\\,${mathUnit('mg')}}{1000\\,${mathUnit('mcg')}} = ${concentration(preparedConcentrationInOrderedUnit, orderedUnit)}`
    }] : []),
    {
      id: 'administration',
      title: 'Volume to administer',
      expression: `\\frac{${mathNumber(dose)}\\,${mathUnit(orderedUnit)}}{${concentration(preparedConcentrationInOrderedUnit, orderedUnit)}} = ${mathNumber(administrationVolume)}\\,\\mathrm{mL}`
    }
  ] : [];
  $: allStepsChecked = calculationSteps.length > 0 && calculationSteps.every((step) => checkedSteps.includes(step.id));
  $: currentFavourite = favourites.find((favourite) =>
    favourite.name?.trim().toLocaleLowerCase() === medicationName.trim().toLocaleLowerCase() &&
    String(favourite.medicationAmount) === String(medicationAmount) &&
    favourite.vialUnit === vialUnit &&
    String(favourite.vialVolume) === String(vialVolume)
  );
  $: favouritePageCount = Math.max(1, Math.ceil(favourites.length / favouritesPerPage));
  $: visibleFavourites = favourites.slice(
    favouritePage * favouritesPerPage,
    (favouritePage + 1) * favouritesPerPage
  );

  onMount(() => {
    try {
      favourites = read(storageKeys.favourites);
      history = read(storageKeys.history);
      localStorage.setItem('dosage.storage-check', '1');
      localStorage.removeItem('dosage.storage-check');
    } catch {
      storageAvailable = false;
    }
  });

  function read(key) {
    const raw = localStorage.getItem(key);
    if (!raw) return [];
    const value = JSON.parse(raw);
    return Array.isArray(value) ? value : [];
  }

  function write(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch {
      storageAvailable = false;
      return false;
    }
  }

  function format(value) {
    return new Intl.NumberFormat('en-CA', { maximumFractionDigits: 6 }).format(value);
  }

  function mathNumber(value) {
    return format(value).replaceAll(',', '{,}');
  }

  function mathUnit(unit) {
    return `\\mathrm{${unit}}`;
  }

  function concentration(value, unit) {
    return `${mathNumber(value)}\\,\\frac{${mathUnit(unit)}}{\\mathrm{mL}}`;
  }

  function renderMath(expression) {
    return katex.renderToString(expression, {
      displayMode: true,
      output: 'htmlAndMathml',
      strict: 'error',
      throwOnError: true
    });
  }

  function unitDimension(unit) {
    if (unit === 'units') return 'activity';
    if (unit === 'mg' || unit === 'mcg') return 'mass';
    return null;
  }

  function unitFactor(unit) {
    return unit === 'mg' ? 1000 : 1;
  }

  function criticalChange() {
    reviewed = false;
    checkedSteps = [];
    acknowledged = false;
    notice = '';
  }

  function selectVialUnit(event) {
    vialUnit = event.currentTarget.value;
    criticalChange();
  }

  function selectOrderedUnit(event) {
    orderedUnit = event.currentTarget.value;
    criticalChange();
  }

  function saveFavourite() {
    if (currentFavourite || !storageAvailable || !medicationName.trim() || !Number.isFinite(amount) || amount <= 0 || !Number.isFinite(vial) || vial <= 0) return;
    const next = [{
      id: crypto.randomUUID(),
      name: medicationName.trim(),
      medicationAmount,
      vialUnit,
      vialVolume,
      createdAt: new Date().toISOString()
    }, ...favourites];
    if (write(storageKeys.favourites, next)) {
      favourites = next;
      favouritePage = 0;
      notice = 'Favourite saved on this phone.';
    }
  }

  function toggleFavourite() {
    if (!currentFavourite) {
      saveFavourite();
      return;
    }

    const next = favourites.filter((item) => item.id !== currentFavourite.id);
    if (write(storageKeys.favourites, next)) {
      favourites = next;
      favouritePage = Math.min(favouritePage, Math.max(0, Math.ceil(next.length / favouritesPerPage) - 1));
      notice = 'Favourite removed from this phone.';
    }
  }

  function useFavourite(favourite) {
    medicationName = favourite.name;
    medicationAmount = favourite.medicationAmount;
    vialUnit = favourite.vialUnit;
    orderedUnit = favourite.vialUnit === 'units' ? 'units' : 'mcg';
    vialVolume = favourite.vialVolume;
    finalVolume = null;
    orderedDose = '';
    reviewed = false;
    checkedSteps = [];
    acknowledged = false;
    notice = 'Favourite loaded. Enter the ordered dose.';
    tab = 'mix';
  }

  function deleteFavourite(id) {
    const next = favourites.filter((item) => item.id !== id);
    if (write(storageKeys.favourites, next)) {
      favourites = next;
      favouritePage = Math.min(favouritePage, Math.max(0, Math.ceil(next.length / favouritesPerPage) - 1));
    }
  }

  function saveMix() {
    if (!storageAvailable || !isValid || !reviewed || !acknowledged) return;
    const next = [{
      id: crypto.randomUUID(),
      medicationName: medicationName.trim() || 'Unnamed medication',
      medicationAmount,
      vialUnit,
      vialVolume,
      finalVolume,
      orderedDose,
      orderedUnit,
      preparedConcentration,
      preparedConcentrationInOrderedUnit,
      administrationVolume,
      createdAt: new Date().toISOString()
    }, ...history].slice(0, 100);
    if (write(storageKeys.history, next)) {
      history = next;
      historyPage = 0;
      notice = 'Mix saved on this phone.';
    }
  }

  async function reviewHistory(item) {
    medicationName = item.medicationName;
    medicationAmount = item.medicationAmount;
    vialUnit = item.vialUnit;
    vialVolume = item.vialVolume;
    finalVolume = item.finalVolume;
    orderedDose = item.orderedDose;
    orderedUnit = item.orderedUnit;
    reviewed = false;
    checkedSteps = [];
    acknowledged = false;
    notice = 'Saved mix loaded for review. Recheck every step.';
    tab = 'mix';

    await tick();
    openCalculationDetails();
  }

  function deleteHistory(id) {
    const next = history.filter((item) => item.id !== id);
    if (write(storageKeys.history, next)) {
      history = next;
      historyPage = Math.min(historyPage, Math.max(0, next.length - 1));
    }
  }

  function clearHistory() {
    if (!window.confirm('Clear all mix history from this phone? This cannot be undone.')) return;
    if (write(storageKeys.history, [])) {
      history = [];
      historyPage = 0;
    }
  }

  function openCalculationDetails() {
    checkedSteps = [];
    detailDialog?.showModal();
  }

  function completeCalculationReview() {
    if (!allStepsChecked) return;
    reviewed = true;
    acknowledged = false;
    detailDialog?.close();
  }

  function closeCalculationDetails() {
    detailDialog?.close();
  }

  function toggleCheckedStep(stepId) {
    checkedSteps = checkedSteps.includes(stepId)
      ? checkedSteps.filter((id) => id !== stepId)
      : [...checkedSteps, stepId];
  }
</script>

<svelte:head>
  <title>Dosage — local dilution calculator prototype</title>
</svelte:head>

<div class="app-shell" data-status="local">
  <header>
    <div class="brand-block">
      <a class="brand" href="#mix" onclick={() => tab = 'mix'}>Dosage</a>
      <span
        class="build-identifier"
        data-testid="build-identifier"
        aria-label={`Dosage version ${appVersion}, revision ${gitHash}`}
      >v{appVersion} · {gitHash}</span>
    </div>
    <span class="local-status" aria-label="Data stays on this device">
      <span aria-hidden="true">✓</span> On this device
    </span>
  </header>

  <div class="prototype-banner" role="note">
    <strong>Prototype — not for patient care.</strong>
    <span>Verify every value with the order, vial label, pharmacy guidance, and local policy.</span>
  </div>

  <main data-e2e-layout>
    {#if tab === 'mix'}
      <section id="mix" class="mix-screen" aria-labelledby="mix-heading">
        <div class="screen-heading">
          <p class="eyebrow">Dilution arithmetic</p>
          <h1 id="mix-heading">Prepare a dose</h1>
          <p class="intro">Enter the label and ordered values. This app does not recommend a dose.</p>
        </div>

        <form onsubmit={(event) => event.preventDefault()}>
          <fieldset class="form-section vial-section">
            <legend><span>1</span> Vial</legend>

            <label class="name-field">
              <span class="field-label">Medication name <small>· Do not enter patient information</small></span>
              <input bind:value={medicationName} oninput={criticalChange} autocomplete="off" />
            </label>

            <div class="input-grid">
              <label>
                Amount in vial
                <input type="number" min="0" step="any" inputmode="decimal" bind:value={medicationAmount} oninput={criticalChange} />
              </label>
              <label>
                Vial unit
                <select aria-label="Vial unit" value={vialUnit} onchange={selectVialUnit}>
                  <option value="" disabled>Select</option>
                  <option value="mg">mg</option>
                  <option value="mcg">mcg</option>
                  <option value="units">units</option>
                </select>
              </label>
              <label>
                <span>Vial volume <span class="unit">mL</span></span>
                <input type="number" min="0" step="any" inputmode="decimal" bind:value={vialVolume} oninput={criticalChange} />
              </label>
            </div>

            <button
              class="text-button favourite-button"
              class:favourited={Boolean(currentFavourite)}
              type="button"
              aria-label={currentFavourite ? 'Remove medication from favourites' : 'Save medication as favourite'}
              aria-pressed={Boolean(currentFavourite)}
              onclick={toggleFavourite}
              disabled={!storageAvailable || !medicationName.trim() || !medicationAmount || !vialUnit || !vialVolume}
            >
              <span class="favourite-star" aria-hidden="true">{currentFavourite ? '★' : '☆'}</span>
              {currentFavourite ? 'Favourite' : 'Save favourite'}
            </button>
          </fieldset>

          <fieldset class="form-section volume-section">
            <legend><span>2</span> Final prepared volume <small>after medication</small></legend>
            <div class="volume-grid" role="group" aria-label="Final prepared volume">
              {#each volumes as volume}
                <button
                  type="button"
                  class:selected={finalVolume === volume}
                  aria-pressed={finalVolume === volume}
                  onclick={() => { finalVolume = volume; criticalChange(); }}
                >
                  <img src={`${baseUrl}images/container-${volume}ml.png`} alt="" />
                  <strong>{volume} mL</strong>
                  {#if finalVolume === volume}<span class="selected-mark" aria-hidden="true">✓</span>{/if}
                </button>
              {/each}
            </div>
            <p class="caution">Verify overfill and preparation method.</p>
          </fieldset>

          <fieldset class="form-section dose-section">
            <legend><span>3</span> Ordered dose</legend>
            <div class="dose-grid">
              <label>
                Dose from the medication order
                <input type="number" min="0" step="any" inputmode="decimal" bind:value={orderedDose} oninput={criticalChange} />
              </label>
              <label>
                Ordered-dose unit
                <select aria-label="Ordered-dose unit" value={orderedUnit} onchange={selectOrderedUnit}>
                  <option value="" disabled>Select</option>
                  {#if vialUnit === 'units'}
                    <option value="units">units</option>
                  {:else}
                    <option value="mcg">mcg</option>
                    <option value="mg">mg</option>
                  {/if}
                </select>
              </label>
            </div>
          </fieldset>

          {#if error}
            <div class="error" role="alert">
              <strong>Cannot calculate</strong>
              <span>{error}</span>
            </div>
          {:else if isValid}
            {#if reviewed}
              <section class="result" data-testid="calculation-result" aria-labelledby="result-heading" aria-live="polite">
                <div>
                  <p id="result-heading">Give</p>
                  <strong class="result-number">{format(administrationVolume)} <span>mL</span></strong>
                </div>
                <button class="details-button" type="button" onclick={openCalculationDetails}>
                  Review again <span aria-hidden="true">›</span>
                </button>
              </section>

              <label class="acknowledgement">
                <input type="checkbox" bind:checked={acknowledged} />
                <span>I checked the order, vial unit, ordered-dose unit, and final prepared volume.</span>
              </label>

              <button class="primary" type="button" onclick={saveMix} disabled={!acknowledged || !storageAvailable}>Save mix on this phone</button>
            {:else}
              <section class="review-ready" data-testid="calculation-ready" aria-live="polite">
                <div>
                  <p>Inputs complete</p>
                  <strong>Answer hidden until review</strong>
                </div>
                <button class="primary" type="button" onclick={openCalculationDetails}>Review calculation</button>
              </section>
            {/if}
          {/if}
        </form>

        <dialog class="calculation-dialog" aria-labelledby="calculation-dialog-heading" bind:this={detailDialog} oncancel={closeCalculationDetails}>
          {#if calculationSteps.length > 0}
            <div class="dialog-heading">
              <div>
                <p id="calculation-dialog-heading">Calculation details</p>
                <h2>Check every step</h2>
              </div>
              <button type="button" aria-label="Close calculation details" onclick={closeCalculationDetails}>×</button>
            </div>

            <div class="equation-list" aria-label="Calculation steps">
              {#each calculationSteps as step, index}
                <section class="equation-step" aria-labelledby={`equation-title-${step.id}`}>
                  <div class="equation-heading">
                    <span>{index + 1}</span>
                    <h3 id={`equation-title-${step.id}`}>{step.title}</h3>
                  </div>
                  <div class="equation" data-testid={`${step.id}-equation`}>
                    {@html renderMath(step.expression)}
                  </div>
                  <button
                    class="step-check"
                    class:checked={checkedSteps.includes(step.id)}
                    type="button"
                    aria-label={`Check ${step.title}`}
                    aria-pressed={checkedSteps.includes(step.id)}
                    data-testid={`check-${step.id}`}
                    onclick={() => toggleCheckedStep(step.id)}
                  >
                    <span aria-hidden="true">✓</span>
                  </button>
                </section>
              {/each}
            </div>

            <p class="rounding">Use local policy for measurable volume and rounding.</p>

            <div class="dialog-actions">
              <button type="button" onclick={closeCalculationDetails}>Go back</button>
              <button class="primary" type="button" onclick={completeCalculationReview} disabled={!allStepsChecked}>Complete review</button>
            </div>
          {/if}
        </dialog>
      </section>
    {:else if tab === 'favourites'}
      <section aria-labelledby="favourites-heading">
        <p class="eyebrow">Local shortcuts</p>
        <h1 id="favourites-heading">Favourites</h1>
        <p class="intro">Medication label facts only. Ordered doses are never saved here.</p>
        {#if favourites.length === 0}
          <div class="empty-state">
            <span aria-hidden="true">☆</span>
            <h2>No favourites yet</h2>
            <p>Save a medication from the Mix screen to reuse its vial details.</p>
          </div>
        {:else}
          <ul class="saved-list" aria-label="Saved favourites">
            {#each visibleFavourites as favourite}
              <li>
                <div>
                  <strong>{favourite.name}</strong>
                  <span>{favourite.medicationAmount} {favourite.vialUnit} in {favourite.vialVolume} mL</span>
                </div>
                <div class="row-actions">
                  <button type="button" onclick={() => useFavourite(favourite)}>Use</button>
                  <button class="danger-text" type="button" aria-label={`Delete ${favourite.name}`} onclick={() => deleteFavourite(favourite.id)}>Delete</button>
                </div>
              </li>
            {/each}
          </ul>
          {#if favouritePageCount > 1}
            <div class="pager" aria-label="Favourite pages">
              <button type="button" disabled={favouritePage === 0} onclick={() => favouritePage -= 1}>Previous</button>
              <span>Page {favouritePage + 1} of {favouritePageCount}</span>
              <button type="button" disabled={favouritePage === favouritePageCount - 1} onclick={() => favouritePage += 1}>Next</button>
            </div>
          {/if}
        {/if}
      </section>
    {:else}
      <section aria-labelledby="history-heading">
        <p class="eyebrow">Stored locally</p>
        <h1 id="history-heading">Mix history</h1>
        <p class="intro">Saved on this phone. Do not use history as a medication order.</p>
        {#if history.length === 0}
          <div class="empty-state">
            <span aria-hidden="true">◷</span>
            <h2>No saved mixes</h2>
            <p>Acknowledged calculations will appear here for review.</p>
          </div>
        {:else}
          <ul class="history-list" aria-label="Saved mix history">
            {#each history as item, index}
              {#if index === historyPage}
              <li>
                <div class="history-heading">
                  <div>
                    <time datetime={item.createdAt}>{new Date(item.createdAt).toLocaleString('en-CA', { dateStyle: 'medium', timeStyle: 'short' })}</time>
                    <strong>{item.medicationName}</strong>
                  </div>
                  <div class="row-actions">
                    <button type="button" aria-label={`Review mix for ${item.medicationName}`} onclick={() => reviewHistory(item)}>Review</button>
                    <button class="danger-text" type="button" aria-label={`Delete mix for ${item.medicationName}`} onclick={() => deleteHistory(item.id)}>Delete</button>
                  </div>
                </div>
                <p>{item.medicationAmount} {item.vialUnit} in {item.vialVolume} mL vial → {item.finalVolume} mL final</p>
                <strong class="history-result">{item.orderedDose} {item.orderedUnit} → {format(item.administrationVolume)} mL</strong>
                <small>
                  Prepared concentration {format(item.preparedConcentration)} {item.vialUnit}/mL
                  {#if item.vialUnit !== item.orderedUnit}
                    = {format(item.preparedConcentrationInOrderedUnit)} {item.orderedUnit}/mL
                  {/if}
                </small>
              </li>
              {/if}
            {/each}
          </ul>
          <div class="pager" aria-label="History pages">
            <button type="button" disabled={historyPage === 0} onclick={() => historyPage -= 1}>Previous</button>
            <span>{historyPage + 1} of {history.length}</span>
            <button type="button" disabled={historyPage === history.length - 1} onclick={() => historyPage += 1}>Next</button>
          </div>
          <button class="clear-history" type="button" onclick={clearHistory}>Clear all history</button>
        {/if}
      </section>
    {/if}

    {#if !storageAvailable}
      <div class="storage-warning" role="status">This browser cannot save records. Your calculation still works.</div>
    {:else if notice}
      <div class="toast" role="status">{notice}</div>
    {/if}
  </main>

  <nav aria-label="Main navigation">
    <button class:active={tab === 'mix'} aria-current={tab === 'mix' ? 'page' : undefined} onclick={() => { tab = 'mix'; notice = ''; }}>
      <span aria-hidden="true">⌁</span> Mix
    </button>
    <button class:active={tab === 'favourites'} aria-current={tab === 'favourites' ? 'page' : undefined} onclick={() => { tab = 'favourites'; notice = ''; }}>
      <span aria-hidden="true">☆</span> Favourites
    </button>
    <button class:active={tab === 'history'} aria-current={tab === 'history' ? 'page' : undefined} onclick={() => { tab = 'history'; notice = ''; }}>
      <span aria-hidden="true">◷</span> History
    </button>
  </nav>
</div>

<style>
  :global(*) { box-sizing: border-box; }
  :global(html) { color-scheme: light; background: #eef1ef; }
  :global(body) {
    margin: 0;
    color: #102a43;
    background: #eef1ef;
    font-family: Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    font-size: 16px;
    line-height: 1.45;
  }
  :global(button), :global(input), :global(select) { font: inherit; }
  :global(button) { touch-action: manipulation; }
  :global(:focus-visible) { outline: 3px solid #f5b700; outline-offset: 3px; }

  .app-shell {
    width: min(100%, 720px);
    min-height: 100vh;
    margin: 0 auto;
    padding-bottom: 88px;
    background: #f7f8f5;
    box-shadow: 0 0 0 1px rgba(16, 42, 67, 0.08);
  }
  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 68px;
    padding: 0 20px;
    border-bottom: 1px solid #d8dfdc;
  }
  .brand-block { display: grid; align-content: center; line-height: 1.05; }
  .brand { color: #102a43; font-size: 1.45rem; font-weight: 800; text-decoration: none; }
  .build-identifier { color: #52677a; font-size: .68rem; font-variant-numeric: tabular-nums; font-weight: 700; white-space: nowrap; }
  .local-status { display: inline-flex; gap: 7px; align-items: center; color: #087f7a; font-size: .88rem; font-weight: 700; }
  .local-status span { display: grid; width: 24px; height: 24px; place-items: center; border: 2px solid currentColor; border-radius: 50%; }
  .prototype-banner { padding: 10px 20px; color: #5f3b00; background: #fff3cd; border-bottom: 1px solid #ead49b; font-size: .85rem; }
  .prototype-banner strong { display: block; }
  main { padding: 28px 20px 34px; }
  .eyebrow { margin: 0 0 4px; color: #087f7a; font-size: .78rem; font-weight: 800; letter-spacing: .1em; text-transform: uppercase; }
  h1 { margin: 0; font-size: clamp(2rem, 9vw, 3rem); line-height: 1.08; letter-spacing: -.035em; }
  .intro { max-width: 580px; margin: 10px 0 26px; color: #52677a; }
  form { display: grid; gap: 18px; }
  fieldset { min-width: 0; margin: 0; padding: 0; border: 0; }
  .form-section { padding: 20px; background: #fff; border: 1px solid #d8dfdc; border-radius: 18px; }
  legend { display: flex; gap: 10px; align-items: center; width: 100%; margin-bottom: 18px; padding: 0; font-size: 1.1rem; font-weight: 800; }
  legend span { display: grid; width: 30px; height: 30px; place-items: center; color: #fff; background: #087f7a; border-radius: 50%; }
  label { display: grid; gap: 7px; color: #263f56; font-weight: 750; }
  label small { color: #52677a; font-size: .76rem; font-weight: 500; }
  input, select { width: 100%; min-height: 50px; padding: 10px 12px; color: #102a43; background: #fbfcfa; border: 1.5px solid #aebbb8; border-radius: 10px; font-size: 1.08rem; }
  input:focus, select:focus { border-color: #087f7a; }
  .input-grid { display: grid; grid-template-columns: minmax(0, 1.35fr) minmax(88px, .8fr); gap: 14px; }
  .input-grid label:last-child { grid-column: 1 / -1; }
  .dose-grid { display: grid; grid-template-columns: minmax(0, 1.35fr) minmax(110px, .8fr); gap: 14px; }
  .unit { color: #087f7a; font-weight: 800; }
  .text-button, .danger-text, .clear-history { min-height: 44px; padding: 8px 2px; color: #087f7a; background: transparent; border: 0; font-weight: 800; text-decoration: underline; text-underline-offset: 4px; cursor: pointer; }
  .text-button { margin-top: 10px; }
  .favourite-button { border-radius: 9px; }
  .favourite-button.favourited { padding-inline: 8px; color: #6b4d00; background: #fff3cd; text-decoration: none; }
  .favourite-star { color: #9a6700; font-size: 1.2em; line-height: 1; }
  button:disabled { opacity: .45; cursor: not-allowed; }
  .caution { margin: -8px 0 16px; color: #52677a; font-size: .88rem; }
  .caution { margin: 14px 0 0; padding-left: 24px; color: #6b4d00; position: relative; }
  .caution::before { content: "!"; position: absolute; left: 0; display: grid; width: 18px; height: 18px; place-items: center; color: #fff; background: #9a6700; border-radius: 50%; font-size: .72rem; font-weight: 900; }
  .volume-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 9px; }
  .volume-grid button { position: relative; min-width: 0; min-height: 130px; padding: 8px 4px 12px; color: #102a43; background: #f7f8f5; border: 1.5px solid #c7d0cd; border-radius: 13px; cursor: pointer; }
  .volume-grid button.selected { color: #076d69; background: #e8f4f1; border: 3px solid #087f7a; }
  .volume-grid img { display: block; width: 100%; height: 80px; margin: 0 auto 2px; object-fit: contain; mix-blend-mode: multiply; }
  .volume-grid strong { display: block; white-space: nowrap; }
  .selected-mark { position: absolute; top: 6px; right: 6px; display: grid; width: 22px; height: 22px; place-items: center; color: #fff; background: #087f7a; border-radius: 50%; font-size: .75rem; }
  .error { display: grid; gap: 3px; padding: 16px; color: #8a1c13; background: #fff2f0; border: 2px solid #b42318; border-radius: 14px; }
  .result { padding: 22px 18px; text-align: center; background: #e8f4f1; border: 2px solid #72aaa5; border-radius: 18px; }
  .result-number { display: block; margin: 2px 0 18px; color: #076d69; font-size: clamp(3rem, 15vw, 5.2rem); font-variant-numeric: tabular-nums; letter-spacing: -.06em; line-height: 1; }
  .result-number span { font-size: .52em; letter-spacing: -.03em; }
  .equation { overflow-x: auto; overflow-y: hidden; color: #102a43; }
  .equation :global(.katex-display) { margin: .35rem 0 .15rem; text-align: left; }
  .equation :global(.katex) { font-size: 1.04em; }
  .rounding { margin: 14px 0 0; color: #52677a; font-size: .82rem; }
  .acknowledgement { grid-template-columns: 26px 1fr; align-items: start; padding: 14px 0; }
  .acknowledgement input { width: 24px; min-height: 24px; margin: 0; accent-color: #087f7a; }
  .primary { min-height: 54px; padding: 12px 18px; color: #fff; background: #087f7a; border: 0; border-radius: 12px; font-weight: 850; cursor: pointer; }
  .empty-state { padding: 42px 20px; text-align: center; background: #fff; border: 1px dashed #aebbb8; border-radius: 18px; }
  .empty-state > span { color: #087f7a; font-size: 2.8rem; }
  .empty-state h2 { margin: 8px 0 3px; }
  .empty-state p { margin: 0; color: #52677a; }
  .saved-list, .history-list { display: grid; gap: 12px; margin: 0; padding: 0; list-style: none; }
  .saved-list li, .history-list li { padding: 17px; background: #fff; border: 1px solid #d8dfdc; border-radius: 15px; }
  .saved-list li, .history-heading { display: flex; gap: 12px; align-items: center; justify-content: space-between; }
  .saved-list li > div:first-child, .history-heading > div { display: grid; gap: 3px; }
  .saved-list span, .history-list p, .history-list small, time { color: #52677a; }
  .row-actions { display: flex; align-items: center; gap: 8px; }
  .row-actions button:first-child { min-width: 54px; min-height: 44px; color: #076d69; background: #e8f4f1; border: 1.5px solid #087f7a; border-radius: 10px; font-weight: 800; cursor: pointer; }
  .danger-text { color: #8a1c13; }
  time { font-size: .8rem; }
  .history-list p { margin: 15px 0 9px; }
  .history-result { display: block; padding: 10px 12px; color: #076d69; background: #e8f4f1; border-radius: 9px; font-size: 1.22rem; font-variant-numeric: tabular-nums; }
  .history-list small { display: block; margin-top: 8px; }
  .clear-history { display: block; margin: 20px auto 0; color: #8a1c13; }
  .storage-warning, .toast { position: fixed; z-index: 4; right: 16px; bottom: 86px; left: 16px; max-width: 600px; margin: auto; padding: 12px 14px; color: #fff; background: #102a43; border-radius: 10px; box-shadow: 0 6px 20px rgba(16, 42, 67, .25); font-weight: 700; }
  nav { position: fixed; z-index: 3; right: 0; bottom: 0; left: 0; display: grid; grid-template-columns: repeat(3, 1fr); width: min(100%, 720px); min-height: 72px; margin: auto; padding: 5px 8px max(5px, env(safe-area-inset-bottom)); background: rgba(255, 255, 255, .98); border-top: 1px solid #ccd5d2; }
  nav button { display: grid; place-items: center; align-content: center; min-height: 58px; color: #52677a; background: transparent; border: 0; border-radius: 10px; font-size: .78rem; font-weight: 750; cursor: pointer; }
  nav button span { font-size: 1.45rem; line-height: 1; }
  nav button.active { color: #076d69; background: #e8f4f1; }

  @media (min-width: 600px) {
    main { padding: 38px 46px 46px; }
    header { padding-inline: 46px; }
    .prototype-banner { padding-inline: 46px; }
    .input-grid { grid-template-columns: 1.4fr .8fr 1fr; }
    .input-grid label:last-child { grid-column: auto; }
    .volume-grid { grid-template-columns: repeat(6, minmax(0, 1fr)); }
    .volume-grid button { min-height: 120px; }
    .volume-grid img { height: 70px; }
  }

  @media (prefers-reduced-motion: no-preference) {
    button { transition: background-color .16s ease, border-color .16s ease, transform .16s ease; }
    button:active:not(:disabled) { transform: scale(.98); }
  }

  /* The primary workflow is a fixed-height instrument panel: navigation replaces scrolling. */
  :global(html), :global(body) { width: 100%; height: 100%; overflow: hidden; }
  .app-shell {
    display: grid;
    grid-template-rows: 46px auto minmax(0, 1fr) 58px;
    width: min(100%, 760px);
    height: 100dvh;
    min-height: 0;
    padding: 0;
    overflow: hidden;
  }
  header { min-height: 0; padding: 0 12px; }
  .brand { font-size: 1.22rem; }
  .build-identifier { font-size: .61rem; }
  .local-status { gap: 5px; font-size: .75rem; }
  .local-status span { width: 21px; height: 21px; font-size: .72rem; }
  .prototype-banner { min-height: 29px; padding: 6px 12px; font-size: .72rem; line-height: 1.25; }
  .prototype-banner strong { display: inline; }
  .prototype-banner span { display: none; }
  main { min-height: 0; padding: 7px 12px; overflow: hidden; }
  main > section { height: 100%; min-height: 0; overflow: hidden; }
  .mix-screen { display: grid; grid-template-rows: auto minmax(0, 1fr); gap: 4px; }
  .screen-heading { min-height: 27px; }
  .screen-heading .eyebrow, .screen-heading .intro { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0; }
  h1 { font-size: 1.35rem; line-height: 1.15; letter-spacing: -.02em; }
  .intro { margin: 4px 0 12px; font-size: .8rem; }
  form { align-content: start; gap: 5px; min-height: 0; }
  .form-section { padding: 6px 8px; border-radius: 11px; }
  legend { gap: 6px; margin-bottom: 4px; font-size: .82rem; line-height: 1; }
  legend > span { width: 19px; height: 19px; font-size: .66rem; }
  legend small { margin-left: 2px; color: #52677a; font-size: .72rem; font-weight: 600; }
  label { gap: 2px; font-size: .74rem; line-height: 1.15; }
  label small { display: inline; margin-left: 2px; font-size: .68rem; }
  .field-label { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  input, select { min-height: 44px; padding: 5px 8px; border-radius: 8px; font-size: .98rem; }
  .vial-section { display: grid; grid-template-columns: minmax(0, 1fr) auto; column-gap: 7px; }
  .vial-section legend, .vial-section .input-grid { grid-column: 1 / -1; }
  .name-field { min-width: 0; }
  .input-grid { grid-template-columns: minmax(0, 1fr) 88px minmax(0, 1fr); gap: 5px; margin-top: 4px; }
  .input-grid label:last-child { grid-column: auto; }
  .text-button { align-self: end; min-height: 44px; margin: 0; padding: 4px 3px; font-size: .74rem; white-space: nowrap; }
  .volume-section { padding-bottom: 5px; }
  .volume-grid { grid-template-columns: repeat(6, minmax(0, 1fr)); gap: 3px; }
  .volume-grid button { min-height: 55px; padding: 2px 1px 3px; border-radius: 8px; }
  .volume-grid button.selected { border-width: 2px; }
  .volume-grid img { height: 29px; margin-bottom: 0; }
  .volume-grid strong { font-size: .66rem; letter-spacing: -.02em; }
  .selected-mark { top: 2px; right: 2px; width: 15px; height: 15px; font-size: .52rem; }
  .caution { min-height: 14px; margin: 3px 0 0; padding-left: 17px; overflow: hidden; font-size: .66rem; line-height: 1.25; white-space: nowrap; }
  .caution::before { width: 13px; height: 13px; font-size: .55rem; }
  .dose-grid { grid-template-columns: minmax(0, 1fr) 100px; gap: 5px; }
  .error { min-height: 54px; gap: 1px; padding: 7px 10px; border-width: 1.5px; border-radius: 10px; font-size: .72rem; }
  .result { display: flex; align-items: center; justify-content: space-between; min-height: 74px; padding: 6px 8px 6px 12px; text-align: left; border-width: 1.5px; border-radius: 11px; }
  .result > div > p { margin: 0; color: #185b58; font-size: .72rem; font-weight: 800; text-transform: uppercase; }
  .result-number { margin: 0; font-size: clamp(2.4rem, 12vw, 3.5rem); }
  .details-button { min-height: 44px; padding: 6px 8px; color: #076d69; background: #fff; border: 1px solid #72aaa5; border-radius: 9px; font-size: .76rem; font-weight: 800; cursor: pointer; }
  .details-button span { font-size: 1.2rem; vertical-align: -.08em; }
  .review-ready { display: flex; align-items: center; justify-content: space-between; min-height: 74px; padding: 8px 8px 8px 12px; background: #eef2f0; border: 1.5px dashed #78908b; border-radius: 11px; }
  .review-ready p { margin: 0; color: #52677a; font-size: .68rem; font-weight: 800; text-transform: uppercase; }
  .review-ready strong { display: block; font-size: .8rem; }
  .review-ready .primary { min-width: 132px; }
  .acknowledgement { grid-template-columns: 23px 1fr; min-height: 44px; align-items: center; padding: 0 2px; font-size: .76rem; }
  .acknowledgement input { width: 21px; min-height: 21px; }
  .primary { min-height: 44px; padding: 8px 12px; border-radius: 9px; font-size: .84rem; }

  .calculation-dialog {
    width: min(calc(100% - 20px), 540px);
    height: min(700px, calc(100dvh - 20px));
    max-height: calc(100dvh - 20px);
    margin: auto;
    padding: 12px;
    color: #102a43;
    background: #f7f8f5;
    border: 0;
    border-radius: 16px;
    box-shadow: 0 18px 70px rgba(16, 42, 67, .35);
    overflow: hidden;
  }
  .calculation-dialog[open] { display: grid; grid-template-rows: auto minmax(0, 1fr) auto auto; gap: 8px; }
  .calculation-dialog::backdrop { background: rgba(16, 42, 67, .62); }
  .dialog-heading { display: flex; align-items: center; justify-content: space-between; }
  .dialog-heading p { margin: 0; color: #52677a; font-size: .72rem; font-weight: 800; text-transform: uppercase; }
  .dialog-heading h2 { margin: 1px 0 0; color: #102a43; font-size: 1.2rem; line-height: 1.1; }
  .dialog-heading button { width: 44px; min-height: 44px; color: #52677a; background: #fff; border: 1px solid #c7d0cd; border-radius: 50%; font-size: 1.6rem; cursor: pointer; }
  .equation-list { display: grid; grid-template-rows: repeat(4, minmax(0, 1fr)); gap: 5px; min-height: 0; overflow: hidden; }
  .equation-step { display: grid; grid-template-columns: minmax(0, 1fr) 44px; grid-template-rows: auto minmax(0, 1fr); column-gap: 6px; min-height: 0; padding: 5px 7px; text-align: center; background: #fff; border: 1px solid #d8dfdc; border-radius: 10px; overflow: hidden; }
  .equation-heading { display: flex; grid-column: 1; grid-row: 1; gap: 6px; align-items: center; justify-content: flex-start; min-width: 0; text-align: left; }
  .equation-heading > span { display: grid; flex: 0 0 20px; width: 20px; height: 20px; place-items: center; color: #fff; background: #087f7a; border-radius: 50%; font-size: .66rem; font-weight: 850; }
  .equation-step h3 { margin: 0; font-size: .76rem; }
  .equation { display: grid; grid-column: 1; grid-row: 2; width: 100%; min-height: 0; place-items: center; overflow: hidden; text-align: center; }
  .equation :global(.katex-display) { margin: .1rem 0; text-align: center; }
  .equation :global(.katex) { font-size: clamp(.86rem, 3.7vw, 1.08rem); }
  .step-check { display: grid; grid-column: 2; grid-row: 1 / 3; align-self: center; justify-self: center; width: 44px; min-height: 44px; place-items: center; color: #7a8784; background: #eef0ef; border: 1.5px solid #aebbb8; border-radius: 50%; cursor: pointer; }
  .step-check span { font-size: 1.2rem; font-weight: 900; line-height: 1; }
  .step-check.checked { color: #fff; background: #687674; border-color: #687674; }
  .rounding { margin: 0; text-align: center; font-size: .68rem; }
  .dialog-actions { display: grid; grid-template-columns: 1fr 1fr; gap: 7px; }
  .dialog-actions button { min-height: 44px; color: #076d69; background: #fff; border: 1px solid #72aaa5; border-radius: 9px; font-size: .76rem; font-weight: 800; cursor: pointer; }
  .dialog-actions button.primary { color: #fff; background: #087f7a; }

  main > section:not(.mix-screen) { display: flex; flex-direction: column; }
  main > section:not(.mix-screen) .eyebrow { margin-bottom: 1px; font-size: .68rem; }
  main > section:not(.mix-screen) h1 { font-size: 1.65rem; }
  main > section:not(.mix-screen) .intro { flex: 0 0 auto; margin: 3px 0 9px; }
  .empty-state { min-height: 0; padding: 24px 12px; border-radius: 12px; }
  .saved-list, .history-list { min-height: 0; gap: 0; }
  .saved-list { gap: 5px; }
  .saved-list li, .history-list li { padding: 12px; border-radius: 12px; }
  .saved-list li > div:first-child { min-width: 0; }
  .saved-list strong, .saved-list li > div:first-child span { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .history-list p { margin: 10px 0 6px; }
  .pager { display: grid; grid-template-columns: 1fr auto 1fr; gap: 8px; align-items: center; margin-top: 8px; }
  .pager button { min-height: 44px; color: #076d69; background: #fff; border: 1px solid #72aaa5; border-radius: 9px; font-weight: 800; cursor: pointer; }
  .pager button:last-child { justify-self: stretch; }
  .pager span { color: #52677a; font-size: .75rem; font-weight: 700; }
  .clear-history { min-height: 44px; margin: 4px auto 0; }
  .storage-warning, .toast { bottom: 64px; padding: 9px 12px; font-size: .74rem; }
  nav { position: static; width: 100%; min-height: 0; padding: 3px 7px max(3px, env(safe-area-inset-bottom)); }
  nav button { min-height: 48px; font-size: .7rem; }
  nav button span { font-size: 1.12rem; }

  @media (min-width: 600px) {
    header { padding-inline: 20px; }
    .prototype-banner { padding-inline: 20px; }
    .prototype-banner span { display: inline; margin-left: 5px; }
    main { padding: 9px 20px; }
    .input-grid { grid-template-columns: minmax(0, 1.4fr) 88px minmax(0, 1fr); }
    .volume-grid button { min-height: 62px; }
    .volume-grid img { height: 35px; }
    .volume-grid strong { font-size: .7rem; }
  }
</style>
