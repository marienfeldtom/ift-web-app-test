<script lang="ts">
  import { playersStore, type Player, type Gender } from '$lib/stores';
  import { Pencil, Trash2, Play } from '@lucide/svelte';
  import { t } from '$lib/i18n.svelte';

  let name = $state('');
  let age = $state<number | ''>('');
  let weight = $state<number | ''>('');
  let gender = $state<Gender>('male');
  let editingId = $state<string | null>(null);
  let showWarningModal = $state(false);
  let showImageModal = $state(false);
  let showEmptySquadModal = $state(false);

  function requestSave() {
    if (!name) return;
    if (age === '' || weight === '') {
      showWarningModal = true;
    } else {
      confirmSave();
    }
  }

  function confirmSave() {
    showWarningModal = false;

    const parsedAge = age === '' ? null : Number(age);
    const parsedWeight = weight === '' ? null : Number(weight);

    if (editingId) {
      playersStore.update(players => players.map(p => {
        if (p.id === editingId) {
          return { ...p, name, age: parsedAge, weight: parsedWeight, gender };
        }
        return p;
      }));
      editingId = null;
    } else {
      const newPlayer: Player = {
        id: crypto.randomUUID(),
        name,
        age: parsedAge,
        weight: parsedWeight,
        gender,
        status: 'active',
        finalSpeed: null,
        vo2max: null
      };
      playersStore.update(players => [...players, newPlayer]);
    }

    resetForm();
  }

  function editPlayer(player: Player) {
    editingId = player.id;
    name = player.name;
    age = player.age === null ? '' : player.age;
    weight = player.weight === null ? '' : player.weight;
    gender = player.gender;
  }

  function resetForm() {
    editingId = null;
    name = '';
    age = '';
    weight = '';
    gender = 'male';
  }

  function removePlayer(id: string) {
    if (editingId === id) resetForm();
    playersStore.update(players => players.filter(p => p.id !== id));
  }
</script>

<svelte:head>
  <title>{t('dashboard.title')}</title>
</svelte:head>

<div class="container">
  <div class="header">
    <h1>{t('dashboard.title')}</h1>
  </div>

  <div class="explanation-card card">
    <h2>{t('dashboard.about.title')}</h2>
    <div class="explanation-content">
      <div class="text-content">
        <p>
          {t('dashboard.about.desc1')}
        </p>
        <ul>
          <li>{@html t('dashboard.about.list1')}</li>
          <li>{@html t('dashboard.about.list2')}</li>
          <li>{@html t('dashboard.about.list3')}</li>
        </ul>
        <p class="highlight-text">
          {t('dashboard.about.highlight')}
        </p>
      </div>
      <div class="image-content">
        <!-- The user's image from the chat. Assuming they will save it to static/erklaerung.png -->
          <!-- svelte-ignore a11y_click_events_have_key_events -->
          <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
          <img src="/erklaerung.png" alt={t('dashboard.img_alt')} class="expl-image clickable" onclick={() => showImageModal = true} onerror={(e) => {
            const target = e.currentTarget;
            target.style.display = 'none';
            if (target.nextElementSibling) target.nextElementSibling.style.display = 'block';
          }} />
        <div class="image-placeholder" style="display: none;">
          Bitte speichere dein Bild als <code>erklaerung.png</code> im Ordner <code>static/</code> ab, damit es hier erscheint.
        </div>
      </div>
    </div>
  </div>

  <div class="content-grid">
    <div class="card add-player-card">
      <h2>{editingId ? t('dashboard.form.edit') : t('dashboard.form.add')}</h2>
      <form onsubmit={(e) => { e.preventDefault(); requestSave(); }}>
        <div class="form-group">
          <label for="name">{t('dashboard.form.name')}</label>
          <input type="text" id="name" bind:value={name} placeholder={t('dashboard.form.name_placeholder')} required />
        </div>
        <div class="form-row">
          <div class="form-group">
            <label for="age">{t('dashboard.form.age')}</label>
            <input type="number" id="age" bind:value={age} min="1" />
          </div>
          <div class="form-group">
            <label for="weight">{t('dashboard.form.weight')}</label>
            <input type="number" id="weight" bind:value={weight} min="1" step="0.1" />
          </div>
        </div>
        <div class="form-group">
          <label for="gender">{t('dashboard.form.gender')}</label>
          <select id="gender" bind:value={gender} required>
            <option value="male">{t('dashboard.form.gender_male')}</option>
            <option value="female">{t('dashboard.form.gender_female')}</option>
          </select>
        </div>
        <div class="form-actions">
          <button type="submit" class="primary w-full">{editingId ? t('dashboard.form.submit_edit') : t('dashboard.form.submit_add')}</button>
          {#if editingId}
            <button type="button" class="secondary w-full" onclick={resetForm} style="margin-top: 8px;">{t('dashboard.form.cancel')}</button>
          {/if}
        </div>
      </form>
    </div>

    <div class="card players-list-card">
      <h2>{t('dashboard.list.title')} ({$playersStore.length})</h2>
      {#if $playersStore.length === 0}
        <p class="empty-state">{t('dashboard.list.empty')}</p>
      {:else}
        <ul class="player-list">
          {#each $playersStore as player (player.id)}
            <li class="player-item {editingId === player.id ? 'editing' : ''}">
              <div class="player-info">
                <span class="player-name">{player.name}</span>
                <span class="player-details">{player.age ?? '-'} {t('dashboard.list.years')}, {player.weight ?? '-'} kg, {player.gender === 'male' ? t('dashboard.list.gender_m') : t('dashboard.list.gender_f')}</span>
              </div>
              <div class="player-actions">
                <button class="secondary small" onclick={() => editPlayer(player)}><Pencil size={14} /> {t('dashboard.list.edit')}</button>
                <button class="danger small" onclick={() => removePlayer(player.id)}><Trash2 size={14} /></button>
              </div>
            </li>
          {/each}
        </ul>
      {/if}
    </div>
  </div>

  <div class="action-footer">
    {#if $playersStore.length === 0}
      <button class="button primary cta-button" onclick={() => showEmptySquadModal = true} style="display: flex; align-items: center; gap: 8px;">
        <Play size={20} /> {t('dashboard.cta')}
      </button>
    {:else}
      <a href="/test" class="button primary cta-button" style="display: flex; align-items: center; gap: 8px;">
        <Play size={20} /> {t('dashboard.cta')}
      </a>
    {/if}
  </div>
</div>

{#if showWarningModal}
  <div class="modal-backdrop">
    <div class="modal card">
      <h2 style="margin-bottom: 16px;">{t('dashboard.modal.missing_title')}</h2>
      <p style="margin-bottom: 16px; color: var(--text-secondary);">
        {@html t('dashboard.modal.missing_desc')}
      </p>
      <div class="modal-actions">
        <button class="secondary" onclick={() => showWarningModal = false}>{t('dashboard.modal.cancel')}</button>
        <button class="primary" onclick={confirmSave}>{t('dashboard.modal.save')}</button>
      </div>
    </div>
  </div>
{/if}

{#if showImageModal}
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="modal-backdrop" onclick={() => showImageModal = false}>
    <div class="image-modal-content">
      <img src="/erklaerung.png" alt={t('dashboard.img_alt_enlarged')} class="enlarged-image" />
      <button class="secondary close-button" onclick={() => showImageModal = false}>{t('dashboard.modal.close')}</button>
    </div>
  </div>
{/if}

{#if showEmptySquadModal}
  <div class="modal-backdrop">
    <div class="modal card">
      <h2 style="margin-bottom: 16px;">{t('dashboard.modal.empty_squad_title')}</h2>
      <p style="margin-bottom: 16px; color: var(--text-secondary);">
        {t('dashboard.modal.empty_squad_desc')}
      </p>
      <div class="modal-actions">
        <button class="primary" onclick={() => showEmptySquadModal = false}>{t('dashboard.modal.close')}</button>
      </div>
    </div>
  </div>
{/if}

<style>
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 32px;
  }

  .explanation-card {
    margin-bottom: 32px;
    border-left: 5px solid var(--accent-neon);
  }

  .explanation-content {
    display: flex;
    gap: 32px;
    align-items: flex-start;
  }

  .text-content {
    flex: 1;
  }

  .image-content {
    flex: 1;
    max-width: 400px;
    background-color: var(--surface-color-light);
    border-radius: var(--border-radius);
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px dashed var(--border-color);
  }

  .expl-image {
    width: 100%;
    height: auto;
    display: block;
    border-radius: var(--border-radius);
    transition: transform 0.2s ease;
  }

  .expl-image.clickable {
    cursor: zoom-in;
  }

  .expl-image.clickable:hover {
    transform: scale(1.02);
  }

  .image-placeholder {
    padding: 32px;
    text-align: center;
    color: var(--text-secondary);
    font-size: 14px;
  }

  @media (max-width: 900px) {
    .explanation-content {
      flex-direction: column;
    }
    .image-content {
      max-width: 100%;
    }
  }

  .explanation-card h2 {
    margin-bottom: 16px;
  }

  .explanation-card ul {
    margin: 16px 0 20px 24px;
    color: var(--text-secondary);
  }

  .explanation-card li {
    margin-bottom: 8px;
  }

  .highlight-text {
    color: var(--accent-neon);
    font-weight: 600;
  }

  .content-grid {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 32px;
    margin-bottom: 40px;
  }

  @media (max-width: 768px) {
    .content-grid {
      grid-template-columns: 1fr;
    }
  }

  .form-group {
    margin-bottom: 20px;
  }

  .form-row {
    display: flex;
    gap: 16px;
  }

  .form-row .form-group {
    flex: 1;
  }

  label {
    display: block;
    margin-bottom: 8px;
    font-size: 14px;
    font-weight: 600;
    color: var(--text-secondary);
  }

  input, select {
    width: 100%;
  }

  .w-full {
    width: 100%;
  }
  
  .form-actions {
    margin-top: 24px;
  }

  .player-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 12px;
    max-height: 500px;
    overflow-y: auto;
    padding-right: 8px;
  }

  .player-list::-webkit-scrollbar {
    width: 6px;
  }
  .player-list::-webkit-scrollbar-thumb {
    background-color: var(--border-color);
    border-radius: 4px;
  }

  .player-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 20px;
    background-color: var(--surface-color-light);
    border-radius: var(--border-radius);
    border: 1px solid var(--border-color);
    transition: var(--transition);
  }

  .player-item:hover {
    border-color: var(--accent-primary);
  }

  .player-item.editing {
    border-color: var(--accent-neon);
    box-shadow: 0 0 0 1px var(--accent-neon);
  }

  .player-info {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .player-name {
    font-weight: 600;
    font-size: 16px;
  }

  .player-details {
    font-size: 13px;
    color: var(--text-secondary);
  }

  .player-actions {
    display: flex;
    gap: 8px;
  }

  button.small {
    padding: 8px 12px;
    font-size: 13px;
  }

  .empty-state {
    color: var(--text-secondary);
    font-style: italic;
    margin-top: 16px;
  }

  .action-footer {
    position: fixed;
    bottom: 40px;
    right: 40px;
    z-index: 90;
    display: flex;
    justify-content: flex-end;
  }

  .cta-button {
    font-size: 18px;
    padding: 16px 32px;
    display: inline-flex;
    letter-spacing: 0.02em;
    box-shadow: 0 10px 30px rgba(0, 255, 204, 0.4);
    border-radius: 30px; /* Make it more pill-shaped for a floating button */
  }

  .cta-button:hover {
    box-shadow: 0 15px 40px rgba(0, 255, 204, 0.6);
  }

  @media (max-width: 768px) {
    .action-footer {
      bottom: 24px;
      right: 24px;
    }
    .cta-button {
      padding: 14px 24px;
      font-size: 16px;
    }
  }

  .modal-backdrop {
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0, 0, 0, 0.75);
    backdrop-filter: blur(4px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }

  .modal {
    max-width: 480px;
    width: 90%;
    box-shadow: 0 16px 40px rgba(0, 0, 0, 0.5);
    border: 1px solid var(--accent-danger);
  }

  .modal-actions {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    margin-top: 24px;
  }

  .image-modal-content {
    position: relative;
    max-width: 90vw;
    max-height: 90vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
  }

  .enlarged-image {
    max-width: 100%;
    max-height: 80vh;
    object-fit: contain;
    border-radius: var(--border-radius);
    box-shadow: 0 16px 50px rgba(0,0,0,0.8);
  }

  .close-button {
    background: rgba(0,0,0,0.5);
    backdrop-filter: blur(4px);
    border: 1px solid var(--border-color);
  }
</style>
