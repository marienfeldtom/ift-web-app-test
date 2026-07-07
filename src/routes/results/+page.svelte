<script lang="ts">
  import { playersStore } from '$lib/stores';
  import { getVO2Rating, getVO2Thresholds } from '$lib/vo2max';
  import { Download } from '@lucide/svelte';
  import { t } from '$lib/i18n.svelte';
  
  function downloadCSV() {
    const players = $playersStore;
    if (players.length === 0) return;

    const headers = [t('results.table.name'), t('results.table.age'), t('results.table.weight'), t('results.table.gender'), t('results.table.speed'), t('results.table.vo2max'), t('results.table.rating')];
    const rows = players.map(p => {
      const effectiveAge = p.age ?? 25;
      const rating = p.vo2max ? t(`rating.${getVO2Rating(p.gender, effectiveAge, p.vo2max).rating}` as any) : 'N/A';
      return [
        p.name,
        p.age ? p.age.toString() : '',
        p.weight ? p.weight.toString() : '',
        p.gender === 'male' ? t('dashboard.form.gender_male') : t('dashboard.form.gender_female'),
        p.finalSpeed ? p.finalSpeed.toString() : 'N/A',
        p.vo2max ? p.vo2max.toString() : 'N/A',
        rating
      ];
    });

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `ift-30-15-results-${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
</script>

<svelte:head>
  <title>IFT 30-15 - {t('nav.results')}</title>
</svelte:head>

<div class="container">
  <div class="header">
    <h1>{t('results.title')}</h1>
    <div class="header-actions">
      <a href="/dashboard" class="button secondary" style="display: inline-block;">{t('results.back_btn')}</a>
      <button class="primary" onclick={downloadCSV} disabled={$playersStore.length === 0}>
        <Download size={16} /> {t('results.export_btn')}
      </button>
    </div>
  </div>

  <div class="info-grid">
    <div class="card calculation-card">
      <h3>Berechnung der VO<sub>2</sub>max</h3>
      <p class="formula-desc">Die VO<sub>2</sub>max wird basierend auf der Formel von Buchheit (2008) berechnet:</p>
      <div class="formula">
        VO<sub>2</sub>max = 28.3 - (2.15 × G) - (0.741 × Alter) - (0.0357 × Gewicht) + (0.0586 × Alter × V<sub>IFT</sub>) + (1.03 × V<sub>IFT</sub>)
      </div>
      <ul class="legend">
        <li>{@html t('results.legend.gender')}</li>
        <li>{@html t('results.legend.age')}</li>
        <li>{@html t('results.legend.weight')}</li>
        <li>{@html t('results.legend.vift')}</li>
      </ul>
    </div>
    
    <div class="card reference-card">
      <h3>Referenzwerte</h3>
      <p class="text-muted">Die Bewertung erfolgt anhand normierter Tabellen der ACSM/Cooper-Klinik unter Berücksichtigung von Geschlecht und Alter.</p>
      <div class="badge-legend">
        <span class="badge poor">{t('rating.poor')}</span>
        <span class="badge fair">{t('rating.fair')}</span>
        <span class="badge good">{t('rating.good')}</span>
        <span class="badge excellent">{t('rating.excellent')}</span>
        <span class="badge superior">{t('rating.superior')}</span>
      </div>
    </div>
  </div>

  <div class="card results-card">
    {#if $playersStore.length === 0}
      <div class="empty-state">
        <p>{t('results.empty')}</p>
      </div>
    {:else}
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>{t('results.table.name')}</th>
              <th>Details</th>
              <th>{t('results.table.speed')}</th>
              <th>{t('results.table.vo2max')}</th>
              <th>{t('results.table.rating')}</th>
            </tr>
          </thead>
          <tbody>
            {#each $playersStore as player (player.id)}
              {@const hasData = player.age !== null && player.weight !== null && player.vo2max !== null}
              {@const ratingInfo = hasData ? getVO2Rating(player.gender, player.age!, player.vo2max!) : null}
              {@const thresholds = hasData ? getVO2Thresholds(player.gender, player.age!) : null}
              <tr>
                <td><strong>{player.name}</strong></td>
                <td class="text-muted">{player.age ?? '-'} / {player.weight ?? '-'} / {player.gender === 'male' ? t('dashboard.list.gender_m') : t('dashboard.list.gender_f')}</td>
                <td>
                  {#if player.finalSpeed}
                    <span class="highlight">{player.finalSpeed}</span>
                  {:else}
                    <span class="text-muted">-</span>
                  {/if}
                </td>
                <td>
                  {#if hasData}
                    <span class="highlight success">{player.vo2max}</span>
                  {:else}
                    <span class="text-muted">-</span>
                  {/if}
                </td>
                <td style="min-width: 200px;">
                  {#if hasData && thresholds && ratingInfo}
                    {@const MIN = 20}
                    {@const MAX = 65}
                    {@const range = MAX - MIN}
                    {@const poorPct = ((thresholds.fair - MIN) / range) * 100}
                    {@const fairPct = ((thresholds.good - thresholds.fair) / range) * 100}
                    {@const goodPct = ((thresholds.excellent - thresholds.good) / range) * 100}
                    {@const excPct = ((thresholds.superior - thresholds.excellent) / range) * 100}
                    {@const supPct = ((MAX - thresholds.superior) / range) * 100}
                    {@const markerPct = Math.min(100, Math.max(0, ((player.vo2max! - MIN) / range) * 100))}
                    
                    <div class="vo2-bar-wrapper">
                      <div class="vo2-rating-header">
                        <span class="badge {ratingInfo.rating}">{t(`rating.${ratingInfo.rating}` as any)}</span>
                      </div>
                      <div class="vo2-bar">
                        <div class="segment poor" style="width: {poorPct}%" title="{t('rating.poor')} (< {thresholds.fair})"></div>
                        <div class="segment fair" style="width: {fairPct}%" title="{t('rating.fair')} ({thresholds.fair} - {thresholds.good})"></div>
                        <div class="segment good" style="width: {goodPct}%" title="{t('rating.good')} ({thresholds.good} - {thresholds.excellent})"></div>
                        <div class="segment excellent" style="width: {excPct}%" title="{t('rating.excellent')} ({thresholds.excellent} - {thresholds.superior})"></div>
                        <div class="segment superior" style="width: {supPct}%" title="{t('rating.superior')} (> {thresholds.superior})"></div>
                        <div class="marker" style="left: {markerPct}%"></div>
                      </div>
                    </div>
                  {:else}
                    <span class="text-muted">- ({t('results.table.missing_data')})</span>
                  {/if}
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    {/if}
  </div>
</div>

<style>
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 32px;
  }

  .header-actions {
    display: flex;
    gap: 16px;
  }

  @media (max-width: 600px) {
    .header {
      flex-direction: column;
      align-items: flex-start;
      gap: 16px;
    }
  }

  .info-grid {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 24px;
    margin-bottom: 32px;
  }
  
  @media (max-width: 900px) {
    .info-grid {
      grid-template-columns: 1fr;
    }
  }

  .calculation-card, .reference-card {
    padding: 24px;
  }

  h3 {
    margin-bottom: 12px;
    font-size: 1.2rem;
  }

  .formula-desc {
    color: var(--text-secondary);
    margin-bottom: 16px;
  }

  .formula {
    background-color: var(--surface-color-light);
    padding: 16px;
    border-radius: var(--border-radius);
    font-family: monospace;
    font-size: 1.1rem;
    color: var(--accent-neon);
    margin-bottom: 16px;
    overflow-x: auto;
    border: 1px dashed var(--border-color);
  }

  .legend {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
    color: var(--text-secondary);
    font-size: 0.9rem;
  }

  @media (max-width: 600px) {
    .legend {
      grid-template-columns: 1fr;
    }
  }

  .badge-legend {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 16px;
  }

  .table-container {
    overflow-x: auto;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    text-align: left;
  }

  th, td {
    padding: 16px;
    border-bottom: 1px solid var(--border-color);
  }

  th {
    font-weight: 600;
    color: var(--text-secondary);
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  tbody tr:last-child td {
    border-bottom: none;
  }

  tbody tr:hover {
    background-color: var(--surface-color-light);
  }

  .highlight {
    font-weight: 700;
    color: var(--accent-neon);
    font-size: 1.1rem;
  }

  .empty-state {
    text-align: center;
    padding: 40px;
    color: var(--text-secondary);
  }

  .vo2-bar-wrapper {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
    max-width: 250px;
  }

  .vo2-rating-header {
    display: flex;
    justify-content: flex-start;
  }

  .vo2-bar {
    display: flex;
    height: 10px;
    border-radius: 5px;
    overflow: hidden;
    position: relative;
    background-color: var(--surface-color-light);
  }

  .vo2-bar .segment {
    height: 100%;
  }

  .vo2-bar .segment.poor { background-color: var(--rating-poor); opacity: 0.8; }
  .vo2-bar .segment.fair { background-color: var(--rating-fair); opacity: 0.8; }
  .vo2-bar .segment.good { background-color: var(--rating-good); opacity: 0.8; }
  .vo2-bar .segment.excellent { background-color: var(--rating-excellent); opacity: 0.8; }
  .vo2-bar .segment.superior { background-color: var(--rating-superior); opacity: 0.8; }

  .vo2-bar .marker {
    position: absolute;
    top: -2px;
    bottom: -2px;
    width: 4px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 0 4px rgba(0,0,0,0.5);
    transform: translateX(-50%);
    z-index: 2;
  }
</style>
