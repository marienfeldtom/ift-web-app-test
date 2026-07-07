<script lang="ts">
  import { playersStore, type Player } from '$lib/stores';
  import { onMount, onDestroy } from 'svelte';
  import { Activity, Footprints } from '@lucide/svelte';
  import { t } from '$lib/i18n.svelte';

  let startSpeed = $state(8);
  let testState = $state<'idle' | 'running' | 'finished'>('idle');
  let audio = $state<HTMLAudioElement | null>(null);
  let audioCurrentTime = $state(0);
  let audioDuration = $state(0);
  let volume = $state(1.0);

  $effect(() => {
    if (audio) {
      // Eine leicht angehobene Kurve (0.75 statt 1.0 linear), damit der Ton im unteren Bereich 
      // nicht so extrem schnell leise wird (was oft als "zu früh aus" wahrgenommen wird).
      audio.volume = volume === 0 ? 0 : Math.pow(volume, 0.75);
    }
  });

  // The actual test starts at different times in the MP3 depending on the speed
  let startDelaySeconds = $derived(startSpeed === 8 ? 8.7 : 7.0);
  const LEVEL_DURATION_SECONDS = 45;

  let effectiveTime = $derived(audioCurrentTime - startDelaySeconds);
  let isPreparationPhase = $derived(effectiveTime < 0);
  
  let currentLevelIndex = $derived(
    isPreparationPhase ? 0 : Math.floor(effectiveTime / LEVEL_DURATION_SECONDS)
  );

  let currentSpeed = $derived(
    isPreparationPhase ? startSpeed : startSpeed + (currentLevelIndex * 0.5)
  );

  let timeInCurrentLevel = $derived(
    isPreparationPhase ? 0 : effectiveTime % LEVEL_DURATION_SECONDS
  );

  let timeToNextLevel = $derived(
    isPreparationPhase 
      ? Math.ceil(Math.abs(effectiveTime))
      : Math.ceil(LEVEL_DURATION_SECONDS - timeInCurrentLevel)
  );

  let phase = $derived(
    isPreparationPhase 
      ? t('test.active.status_starting') 
      : (timeInCurrentLevel < 30 ? t('test.active.status_running') : t('test.active.status_resting'))
  );

  onMount(() => {
    // Reset players for a new test
    playersStore.update(players => players.map(p => ({
        ...p,
        status: 'active',
        finalSpeed: null,
        vo2max: null
    })));
  });

  onDestroy(() => {
    if (audio) {
      audio.pause();
      audio.src = '';
    }
  });

  function getAudioSrc() {
    return startSpeed === 8 ? '/40m_en_8.mp3' : '/40m_en_10.mp3';
  }

  function startTest() {
    testState = 'running';
    audioCurrentTime = 0;

    audio = new Audio(getAudioSrc());
    audio.volume = volume;
    
    audio.ontimeupdate = () => {
      if (audio) {
        audioCurrentTime = audio.currentTime;
      }
    };

    audio.onloadedmetadata = () => {
      if (audio) {
        audioDuration = audio.duration;
      }
    };

    audio.onended = () => {
        finishTest();
    };

    audio.play();
  }

  function stopTestEarly() {
    finishTest();
  }

  function finishTest() {
    if (audio) {
      audio.pause();
    }
    testState = 'finished';

    // Auto drop-out remaining players
    playersStore.update(players => {
      return players.map(p => {
        if (p.status === 'active') {
          return calculateDropOut(p, currentSpeed);
        }
        return p;
      });
    });
  }

  function calculateDropOut(player: Player, speed: number): Player {
    // Die VIFT ist laut Protokoll die *zuletzt vollständig abgeschlossene* Stufe. 
    // Wer also auf Stufe 18,5 km/h ausscheidet, bekommt 18,0 km/h.
    // Falls man direkt auf der ersten Stufe ausscheidet, werten wir das als Startgeschwindigkeit (auch wenn eigentlich keine Stufe beendet wurde).
    const completedSpeed = Math.max(startSpeed, speed - 0.5);
    const dropTimeStr = formatTime(effectiveTime);

    let vo2 = null;
    if (player.age !== null && player.weight !== null) {
      const g = player.gender === 'male' ? 1 : 2;
      vo2 = 28.3 - (2.15 * g) - (0.741 * player.age) - (0.0357 * player.weight) + (0.0586 * player.age * completedSpeed) + (1.03 * completedSpeed);
    }
    
    return {
      ...player,
      status: 'finished',
      finalSpeed: completedSpeed,
      vo2max: vo2 !== null ? Math.round(vo2 * 10) / 10 : null,
      dropOutTime: dropTimeStr
    };
  }

  function dropOutPlayer(id: string) {
    if (testState !== 'running') return;
    
    playersStore.update(players => {
      let activeCount = 0;
      const updated = players.map(p => {
        if (p.id === id) {
          return calculateDropOut(p, currentSpeed);
        }
        if (p.status === 'active') activeCount++;
        return p;
      });
      
      // If the player we just dropped out was the last active one
      if (activeCount === 0) {
        setTimeout(finishTest, 0); 
      }
      return updated;
    });
  }

  let activePlayers = $derived($playersStore.filter(p => p.status === 'active'));
  let finishedPlayers = $derived($playersStore.filter(p => p.status === 'finished' && p.finalSpeed !== null));
  
  function formatTime(seconds: number) {
    if (seconds < 0) seconds = 0;
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  }
</script>

<svelte:head>
  <title>IFT 30-15 - {t('nav.live_test')}</title>
</svelte:head>

<div class="container">
  <div class="header">
    <h1>{testState === 'running' ? t('test.active.title') : t('test.setup.title')}</h1>
    {#if testState === 'idle'}
      <a href="/dashboard" class="button secondary" style="display: inline-block; text-align: center; line-height: 20px;">
        &larr; {t('dashboard.form.cancel')}
      </a>
    {:else if testState === 'running'}
      <button class="danger" onclick={stopTestEarly}>{t('test.active.cancel_btn')}</button>
    {:else}
      <a href="/results" class="button primary" style="display: inline-block; text-align: center; line-height: 20px;">
        {t('test.active.to_results_btn')} &rarr;
      </a>
    {/if}
  </div>

  {#if testState === 'idle'}
    <div class="card setup-card">
      <h2>{t('test.setup.title')}</h2>
      <p class="description">{t('test.setup.speed_label')}</p>
      
      <div class="speed-selector">
        <label class="radio-label {startSpeed === 8 ? 'selected' : ''}">
          <input type="radio" bind:group={startSpeed} value={8} />
          <div class="speed-value">8.0 km/h</div>
          <div class="speed-desc">Standard</div>
        </label>
        
        <label class="radio-label {startSpeed === 10 ? 'selected' : ''}">
          <input type="radio" bind:group={startSpeed} value={10} />
          <div class="speed-value">10.0 km/h</div>
          <div class="speed-desc">Pro</div>
        </label>
      </div>

      <button class="primary w-full start-btn" onclick={startTest} disabled={$playersStore.length === 0}>
        {$playersStore.length > 0 ? t('test.setup.start_btn') : t('dashboard.list.empty')}
      </button>
    </div>
  {/if}

  {#if testState === 'running'}
    <div class="dashboard-grid">
      <div class="card timer-card">
        <div class="speed-display">
          <span class="value">{currentSpeed.toFixed(1)}</span>
          <span class="unit">km/h</span>
        </div>
        
        <div class="time-overall">
          {t('test.active.time')}: {formatTime(effectiveTime)}
        </div>

        <div class="phase-indicator {isPreparationPhase ? 'prep' : (timeInCurrentLevel < 30 ? 'run' : 'walk')}">
          <div class="phase-content">
            {#if !isPreparationPhase && timeInCurrentLevel < 30}
              <Activity size={24} />
            {:else if !isPreparationPhase}
              <Footprints size={24} />
            {/if}
            <span>{phase}</span>
          </div>
        </div>

        <div class="countdown-display">
          <span class="countdown-value">{timeToNextLevel}s</span>
        </div>

        <div class="volume-control">
          <div class="volume-header">
            <span class="volume-label">{t('test.active.volume')}</span>
            <span class="volume-value">{Math.round(volume * 100)} %</span>
          </div>
          <input type="range" min="0" max="1" step="0.01" bind:value={volume} class="volume-slider" />
        </div>
      </div>

      <div class="card players-card">
        <h2>{t('test.active.players_active')} ({activePlayers.length})</h2>
        <div class="active-grid">
          {#each activePlayers as player (player.id)}
            <div class="player-tile">
              <span class="player-name">{player.name}</span>
              <button class="danger large" onclick={() => dropOutPlayer(player.id)}>{t('test.active.dropout_btn')}</button>
            </div>
          {/each}
          {#if activePlayers.length === 0}
            <p class="empty-state">-</p>
          {/if}
        </div>

        {#if finishedPlayers.length > 0}
          <div class="finished-divider"></div>
          <h2>{t('test.active.dropped_out')} ({finishedPlayers.length})</h2>
          <div class="active-grid">
            {#each finishedPlayers as player (player.id)}
              <div class="player-tile finished-tile">
                <span class="player-name">{player.name}</span>
                <span class="player-stats">{player.finalSpeed} km/h - {player.dropOutTime}</span>
              </div>
            {/each}
          </div>
        {/if}
      </div>
    </div>
  {/if}

  {#if testState === 'finished'}
    <div class="card finished-card">
      <h2>{t('test.active.finish_btn')}</h2>
      <a href="/results" class="button primary mt-4" style="display: inline-block;">{t('test.active.to_results_btn')}</a>
    </div>
  {/if}
</div>

<style>
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 32px;
  }

  .setup-card {
    max-width: 600px;
    margin: 0 auto;
    text-align: center;
  }

  .description {
    color: var(--text-secondary);
    margin-bottom: 24px;
  }

  .speed-selector {
    display: flex;
    gap: 16px;
    margin-bottom: 24px;
  }

  .radio-label {
    flex: 1;
    background-color: var(--surface-color-light);
    border: 2px solid var(--border-color);
    border-radius: var(--border-radius);
    padding: 24px;
    cursor: pointer;
    transition: var(--transition);
    position: relative;
  }

  .radio-label input {
    position: absolute;
    opacity: 0;
  }

  .radio-label.selected {
    border-color: var(--accent-neon);
    background-color: rgba(0, 255, 204, 0.05);
  }

  .speed-value {
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 8px;
    color: var(--text-primary);
  }

  .speed-desc {
    font-size: 14px;
    color: var(--text-secondary);
  }

  .start-btn {
    font-size: 18px;
    padding: 16px;
  }

  .w-full {
    width: 100%;
  }

  .mt-4 {
    margin-top: 16px;
  }

  .dashboard-grid {
    display: grid;
    grid-template-columns: 350px 1fr;
    gap: 24px;
  }

  @media (max-width: 768px) {
    .dashboard-grid {
      grid-template-columns: 1fr;
    }
  }

  .timer-card {
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: max-content;
    padding: 40px 24px;
  }

  .speed-display {
    color: var(--accent-neon);
    margin-bottom: 12px;
  }

  .speed-display .value {
    font-size: 72px;
    font-weight: 800;
    line-height: 1;
  }

  .speed-display .unit {
    font-size: 24px;
    font-weight: 600;
    margin-left: 8px;
  }

  .time-overall {
    font-size: 16px;
    color: var(--text-secondary);
    margin-bottom: 24px;
    font-variant-numeric: tabular-nums;
  }

  .phase-indicator {
    padding: 12px 24px;
    border-radius: 30px;
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 24px;
    width: 100%;
  }
  
  .phase-content {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
  }

  .phase-indicator.prep {
    background-color: var(--surface-color-light);
    color: var(--text-secondary);
  }

  .phase-indicator.run {
    background-color: rgba(0, 255, 204, 0.15);
    color: var(--accent-neon);
    border: 1px solid var(--accent-neon);
  }

  .phase-indicator.walk {
    background-color: rgba(255, 171, 0, 0.15);
    color: #ffab00;
    border: 1px solid #ffab00;
  }

  .volume-control {
    width: 100%;
    margin-top: 24px;
    padding-top: 24px;
    border-top: 1px solid var(--border-color);
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .volume-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }

  .volume-label {
    font-size: 14px;
    color: var(--text-secondary);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .volume-value {
    font-size: 14px;
    font-weight: 600;
    color: var(--accent-neon);
    font-variant-numeric: tabular-nums;
  }

  .volume-slider {
    width: 100%;
    margin: 0;
    padding: 0;
    accent-color: var(--accent-neon);
    cursor: pointer;
  }

  .countdown-display {
    background-color: var(--surface-color-light);
    padding: 16px;
    border-radius: var(--border-radius);
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .countdown-label {
    font-size: 14px;
    color: var(--text-secondary);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .countdown-value {
    font-size: 32px;
    font-weight: 700;
    font-variant-numeric: tabular-nums;
  }

  .active-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 16px;
    margin-top: 24px;
  }

  .player-tile {
    background-color: var(--surface-color-light);
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    padding: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
  }

  .player-tile .player-name {
    font-weight: 600;
    font-size: 16px;
    text-align: center;
  }

  button.large {
    width: 100%;
    padding: 12px;
    font-size: 16px;
  }

  .finished-divider {
    height: 1px;
    background-color: var(--border-color);
    margin: 32px 0;
  }

  .finished-tile {
    opacity: 0.6;
    background-color: transparent;
  }

  .player-stats {
    font-size: 13px;
    color: var(--text-secondary);
    background: var(--surface-color-light);
    padding: 4px 8px;
    border-radius: 4px;
  }

  .finished-card {
    text-align: center;
    max-width: 600px;
    margin: 0 auto;
    padding: 48px 24px;
  }

  .empty-state {
    color: var(--text-secondary);
    font-style: italic;
    grid-column: 1 / -1;
  }
</style>
