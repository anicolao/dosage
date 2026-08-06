<script>
  import { onMount } from 'svelte';
  import katex from 'katex';
  import 'katex/dist/katex.min.css';

  const volumes = [10, 50, 100, 250, 500, 1000];
  const baseUrl = import.meta.env.BASE_URL;
  const storageKeys = {
    favourites: 'dosage.favourites.v2',
    history: 'dosage.history.v2'
  };

  let tab = 'mix';
  let medicationName = 'Example medication';
  let medicationAmount = '10';
  let vialUnit = 'mg';
  let vialVolume = '1';
  let finalVolume = 50;
  let orderedDose = '2000';
  let orderedUnit = 'mcg';
  let acknowledged = false;
  let favourites = [];
  let history = [];
  let storageAvailable = true;
  let notice = '';

  $: amount = Number(medicationAmount);
  $: vial = Number(vialVolume);
  $: dose = Number(orderedDose);
  $: compatibleDimensions = unitDimension(vialUnit) === unitDimension(orderedUnit);
  $: amountInBaseUnit = amount * unitFactor(vialUnit);
  $: availableInOrderedUnit = amountInBaseUnit / unitFactor(orderedUnit);
  $: validNumbers =
    Number.isFinite(amount) && amount > 0 &&
    Number.isFinite(vial) && vial > 0 &&
    Number.isFinite(dose) && dose > 0;
  $: error = !medicationAmount || !vialVolume || !orderedDose
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
  $: isValid = validNumbers && !error;
  $: vialConcentration = isValid ? amount / vial : null;
  $: preparedConcentration = isValid ? amount / finalVolume : null;
  $: preparedConcentrationInOrderedUnit = isValid
    ? amountInBaseUnit / unitFactor(orderedUnit) / finalVolume
    : null;
  $: administrationVolume = isValid ? dose / preparedConcentrationInOrderedUnit : null;

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
    return unit === 'units' ? 'activity' : 'mass';
  }

  function unitFactor(unit) {
    return unit === 'mg' ? 1000 : 1;
  }

  function criticalChange() {
    acknowledged = false;
    notice = '';
  }

  function selectVialUnit(event) {
    vialUnit = event.currentTarget.value;
    orderedUnit = vialUnit === 'units'
      ? 'units'
      : orderedUnit === 'units' ? 'mcg' : orderedUnit;
    orderedDose = '';
    criticalChange();
  }

  function selectOrderedUnit(event) {
    orderedUnit = event.currentTarget.value;
    orderedDose = '';
    criticalChange();
  }

  function saveFavourite() {
    if (!storageAvailable || !medicationName.trim() || !Number.isFinite(amount) || amount <= 0 || !Number.isFinite(vial) || vial <= 0) return;
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
      notice = 'Favourite saved on this phone.';
    }
  }

  function useFavourite(favourite) {
    medicationName = favourite.name;
    medicationAmount = favourite.medicationAmount;
    vialUnit = favourite.vialUnit;
    orderedUnit = vialUnit === 'units' ? 'units' : 'mcg';
    vialVolume = favourite.vialVolume;
    orderedDose = '';
    acknowledged = false;
    notice = 'Favourite loaded. Enter the ordered dose.';
    tab = 'mix';
  }

  function deleteFavourite(id) {
    const next = favourites.filter((item) => item.id !== id);
    if (write(storageKeys.favourites, next)) favourites = next;
  }

  function saveMix() {
    if (!storageAvailable || !isValid || !acknowledged) return;
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
      notice = 'Mix saved on this phone.';
    }
  }

  function deleteHistory(id) {
    const next = history.filter((item) => item.id !== id);
    if (write(storageKeys.history, next)) history = next;
  }

  function clearHistory() {
    if (!window.confirm('Clear all mix history from this phone? This cannot be undone.')) return;
    if (write(storageKeys.history, [])) history = [];
  }
</script>

<svelte:head>
  <title>Dosage — local dilution calculator prototype</title>
</svelte:head>

<div class="app-shell" data-status="local">
  <header>
    <a class="brand" href="#mix" onclick={() => tab = 'mix'}>Dosage</a>
    <span class="local-status" aria-label="Data stays on this device">
      <span aria-hidden="true">✓</span> On this device
    </span>
  </header>

  <div class="prototype-banner" role="note">
    <strong>Prototype — not for patient care.</strong>
    Verify every value with the order, vial label, pharmacy guidance, and local policy.
  </div>

  <main data-e2e-layout>
    {#if tab === 'mix'}
      <section id="mix" aria-labelledby="mix-heading">
        <p class="eyebrow">Dilution arithmetic</p>
        <h1 id="mix-heading">Prepare a dose</h1>
        <p class="intro">Enter the label and ordered values. This app does not recommend a dose.</p>

        <form onsubmit={(event) => event.preventDefault()}>
          <fieldset class="form-section">
            <legend><span>1</span> Medication vial</legend>

            <label>
              Medication name <small>Do not enter patient information</small>
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
                  <option value="mg">mg</option>
                  <option value="mcg">mcg</option>
                  <option value="units">units</option>
                </select>
              </label>
              <label>
                Vial volume <span class="unit">mL</span>
                <input type="number" min="0" step="any" inputmode="decimal" bind:value={vialVolume} oninput={criticalChange} />
              </label>
            </div>

            <button class="text-button" type="button" onclick={saveFavourite} disabled={!storageAvailable || !medicationName.trim()}>
              ☆ Save medication as favourite
            </button>
          </fieldset>

          <fieldset class="form-section">
            <legend><span>2</span> Final prepared volume</legend>
            <p class="helper">Choose the total final volume after medication is added—not the amount of diluent added.</p>
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
            <p class="caution">Verify bag overfill and preparation method under local policy.</p>
          </fieldset>

          <fieldset class="form-section">
            <legend><span>3</span> Ordered dose</legend>
            <div class="dose-grid">
              <label>
                Dose from the medication order
                <input type="number" min="0" step="any" inputmode="decimal" bind:value={orderedDose} oninput={criticalChange} />
              </label>
              <label>
                Ordered-dose unit
                <select aria-label="Ordered-dose unit" value={orderedUnit} onchange={selectOrderedUnit}>
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
            <section class="result" data-testid="calculation-result" aria-labelledby="result-heading" aria-live="polite">
              <p id="result-heading">Calculated volume to administer</p>
              <strong class="result-number">{format(administrationVolume)} <span>mL</span></strong>
              <dl>
                <div>
                  <dt>Vial concentration</dt>
                  <dd class="equation" data-testid="vial-equation">
                    {@html renderMath(
                      `C_v = \\frac{${mathNumber(amount)}\\,${mathUnit(vialUnit)}}{${mathNumber(vial)}\\,\\mathrm{mL}} = ${concentration(vialConcentration, vialUnit)}`
                    )}
                  </dd>
                </div>
                <div>
                  <dt>Prepared concentration</dt>
                  <dd class="equation" data-testid="prepared-equation">
                    {@html renderMath(
                      `C_p = \\frac{${mathNumber(amount)}\\,${mathUnit(vialUnit)}}{${finalVolume}\\,\\mathrm{mL}} = ${concentration(preparedConcentration, vialUnit)}`
                    )}
                  </dd>
                </div>
                {#if vialUnit !== orderedUnit}
                  <div>
                    <dt>Unit conversion</dt>
                    <dd class="equation" data-testid="conversion-equation">
                      {@html renderMath(vialUnit === 'mg'
                        ? `${concentration(preparedConcentration, vialUnit)} \\times \\frac{1000\\,${mathUnit('mcg')}}{1\\,${mathUnit('mg')}} = ${concentration(preparedConcentrationInOrderedUnit, orderedUnit)}`
                        : `${concentration(preparedConcentration, vialUnit)} \\times \\frac{1\\,${mathUnit('mg')}}{1000\\,${mathUnit('mcg')}} = ${concentration(preparedConcentrationInOrderedUnit, orderedUnit)}`
                      )}
                    </dd>
                  </div>
                {/if}
                <div>
                  <dt>Calculation</dt>
                  <dd class="equation" data-testid="administration-equation">
                    {@html renderMath(
                      `V_{\\mathrm{admin}} = \\frac{${mathNumber(dose)}\\,${mathUnit(orderedUnit)}}{${concentration(preparedConcentrationInOrderedUnit, orderedUnit)}} = ${mathNumber(administrationVolume)}\\,\\mathrm{mL}`
                    )}
                  </dd>
                </div>
              </dl>
              <p class="rounding">Use local policy for measurable volume and rounding.</p>
            </section>

            <label class="acknowledgement">
              <input type="checkbox" bind:checked={acknowledged} />
              <span>I checked the order, vial unit, ordered-dose unit, and final prepared volume.</span>
            </label>

            <button class="primary" type="button" onclick={saveMix} disabled={!acknowledged || !storageAvailable}>Save mix on this phone</button>
          {/if}
        </form>
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
          <ul class="saved-list">
            {#each favourites as favourite}
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
          <ul class="history-list">
            {#each history as item}
              <li>
                <div class="history-heading">
                  <div>
                    <time datetime={item.createdAt}>{new Date(item.createdAt).toLocaleString('en-CA', { dateStyle: 'medium', timeStyle: 'short' })}</time>
                    <strong>{item.medicationName}</strong>
                  </div>
                  <button class="danger-text" type="button" aria-label={`Delete mix for ${item.medicationName}`} onclick={() => deleteHistory(item.id)}>Delete</button>
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
            {/each}
          </ul>
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
  .brand { color: #102a43; font-size: 1.45rem; font-weight: 800; text-decoration: none; }
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
  button:disabled { opacity: .45; cursor: not-allowed; }
  .helper, .caution { margin: -8px 0 16px; color: #52677a; font-size: .88rem; }
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
  .result > p:first-child { margin: 0; color: #185b58; font-weight: 800; }
  .result-number { display: block; margin: 2px 0 18px; color: #076d69; font-size: clamp(3rem, 15vw, 5.2rem); font-variant-numeric: tabular-nums; letter-spacing: -.06em; line-height: 1; }
  .result-number span { font-size: .52em; letter-spacing: -.03em; }
  dl { display: grid; gap: 11px; margin: 0; text-align: left; }
  dl div { padding-top: 10px; border-top: 1px solid #aad0cc; }
  dt { color: #315c59; font-size: .78rem; font-weight: 800; text-transform: uppercase; }
  dd { margin: 2px 0 0; font-variant-numeric: tabular-nums; font-weight: 650; overflow-wrap: anywhere; }
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
</style>
