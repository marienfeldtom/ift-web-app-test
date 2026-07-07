<script lang="ts">
  import '../app.css';
  import { page } from '$app/state';
  import { Activity, Globe } from '@lucide/svelte';
  import { t, locale, type Language } from '$lib/i18n.svelte';
  
  let { children } = $props();

  function toggleLang() {
    locale.current = locale.current === 'de' ? 'en' : 'de';
  }
</script>

<header class="global-header">
  <div class="container header-container">
    <a href="/" class="logo">
      <Activity size={24} />
      <span>30-15 IFT</span>
    </a>
    <nav class="main-nav">
      <a href="/" class="nav-link" class:active={page.url.pathname === '/'}>{t('nav.home')}</a>
      <a href="/dashboard" class="nav-link" class:active={page.url.pathname === '/dashboard'}>{t('nav.dashboard')}</a>
      {#if page.url.pathname === '/test'}
        <span class="nav-link active">{t('nav.live_test')}</span>
      {/if}
      {#if page.url.pathname === '/results'}
        <span class="nav-link active">{t('nav.results')}</span>
      {/if}
      
      <button class="lang-toggle" onclick={toggleLang} aria-label="Toggle Language">
        <Globe size={16} />
        <span>{locale.current.toUpperCase()}</span>
      </button>
    </nav>
  </div>
</header>

<main class="page-content">
  {@render children()}
</main>

<style>
  .global-header {
    background-color: var(--surface-color);
    border-bottom: 1px solid var(--border-color);
    position: sticky;
    top: 0;
    z-index: 100;
  }
  
  .header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 16px;
    padding-bottom: 16px;
  }
  
  .logo {
    display: flex;
    align-items: center;
    gap: 12px;
    font-weight: 800;
    font-size: 22px;
    color: #fff;
    text-decoration: none;
    letter-spacing: -0.02em;
  }
  
  .logo :global(svg) {
    color: var(--accent-neon);
  }
  
  .main-nav {
    display: flex;
    gap: 24px;
    align-items: center;
  }
  
  .nav-link {
    color: var(--text-secondary);
    font-weight: 600;
    text-decoration: none;
    transition: var(--transition);
    font-size: 15px;
  }
  
  .nav-link:hover {
    color: var(--text-primary);
  }
  
  .nav-link.active {
    color: var(--accent-neon);
  }

  .lang-toggle {
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid var(--border-color);
    color: var(--text-primary);
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 13px;
    font-weight: 600;
  }

  .lang-toggle:hover {
    background: rgba(255, 255, 255, 0.15);
  }

  .page-content {
    min-height: calc(100vh - 70px);
  }

  @media (max-width: 600px) {
    .header-container {
      flex-direction: column;
      gap: 16px;
    }
  }
</style>
