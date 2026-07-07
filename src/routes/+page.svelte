<script lang="ts">
  import { Activity, Zap, ClipboardX, Trophy } from '@lucide/svelte';
  import { t } from '$lib/i18n.svelte';
</script>

<svelte:head>
  <title>{t('landing.title')}</title>
  <meta name="description" content={t('landing.subtitle').replace(/<[^>]*>?/gm, '')} />
</svelte:head>

<div class="landing-page">
  <header class="hero">
    <div class="container hero-content">
      <div class="hero-text">
        <h1 class="gradient-text">{t('landing.title')}</h1>
        <p class="subtitle">
          {@html t('landing.subtitle')}
        </p>
        <a href="/dashboard" class="button primary cta-hero">{t('landing.cta')}</a>
      </div>
      <div class="hero-visual">
        <div class="glow-orb"></div>
        <div class="visual-card">
          <div class="mock-ui">
            <div class="mock-line"></div>
            <div class="mock-line short"></div>
            <div class="mock-chart">
              <div class="bar poor" style="width: 15%"></div>
              <div class="bar fair" style="width: 25%"></div>
              <div class="bar good" style="width: 20%"></div>
              <div class="bar excellent" style="width: 30%"></div>
            </div>
            <div class="mock-badge">{t('rating.excellent')}</div>
          </div>
        </div>
      </div>
    </div>
  </header>

  <section class="problem-solution container">
    <div class="section-header">
      <h2>{t('landing.why.title')}</h2>
      <p class="text-muted">{t('landing.why.subtitle')}</p>
    </div>
    <div class="grid">
      <div class="card old-way">
        <div class="icon-wrapper danger"><ClipboardX size={32} /></div>
        <h3>{t('landing.old.title')}</h3>
        <p>{t('landing.old.desc')}</p>
      </div>
      <div class="card new-way">
        <div class="icon-wrapper success"><Zap size={32} /></div>
        <h3>{t('landing.new.title')}</h3>
        <p>{@html t('landing.new.desc')}</p>
      </div>
    </div>
  </section>

  <section class="test-explanation container">
    <div class="content-box card">
      <h2>{t('landing.test.title')}</h2>
      <div class="explanation-grid">
        <div class="text-block">
          <p>{@html t('landing.test.desc1')}</p>
          <div class="requirement">
            <Activity size={20} class="req-icon" />
            <span>{@html t('landing.test.desc2')}</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="credits container">
    <div class="section-header">
      <h2>{t('landing.science.title')}</h2>
    </div>
    <div class="credits-grid">
      <div class="author-card card">
        <Trophy size={40} class="trophy-icon" />
        <h3>Martin Buchheit</h3>
        <p>{t('landing.science.buchheit')}</p>
        <a href="https://30-15ift.com/" target="_blank" rel="noopener noreferrer" class="link">{t('landing.science.link1')}</a>
        <br>
        <a href="https://martin-buchheit.net/" target="_blank" rel="noopener noreferrer" class="link">{t('landing.science.link2')}</a>
      </div>
      <div class="studies-card card">
        <h3>{t('landing.science.studies')}</h3>
        <ul class="study-list">
          <li>
            <strong>Buchheit M. (2008)</strong>
            <p>"The 30-15 Intermittent Fitness Test: accuracy for individualizing interval training of young intermittent sport players." <span class="text-muted">J Strength Cond Res.</span></p>
          </li>
          <li>
            <strong>Buchheit M. (2010)</strong>
            <p>"The 30-15 Intermittent Fitness Test: 10 year review." <span class="text-muted">Myorubicon.</span></p>
          </li>
        </ul>
      </div>
    </div>
  </section>
  
  <footer class="landing-footer">
    <div class="container">
      <p>{t('landing.footer')}</p>
    </div>
  </footer>
</div>

<style>
  .landing-page {
    width: 100%;
    overflow-x: hidden;
  }

  .hero {
    padding: 80px 0;
    min-height: 70vh;
    display: flex;
    align-items: center;
    position: relative;
    border-bottom: 1px solid var(--border-color);
  }

  .hero-content {
    display: flex;
    align-items: center;
    gap: 60px;
    position: relative;
    z-index: 2;
  }

  .hero-text {
    flex: 1;
    max-width: 600px;
  }

  h1.gradient-text {
    font-size: 4rem;
    line-height: 1.1;
    margin-bottom: 24px;
    background: linear-gradient(135deg, #fff 0%, var(--accent-neon) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .subtitle {
    font-size: 1.25rem;
    color: var(--text-secondary);
    margin-bottom: 40px;
    line-height: 1.6;
  }

  .cta-hero {
    font-size: 1.2rem;
    padding: 16px 40px;
  }

  .hero-visual {
    flex: 1;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .glow-orb {
    position: absolute;
    width: 300px;
    height: 300px;
    background: var(--accent-primary);
    filter: blur(100px);
    opacity: 0.3;
    border-radius: 50%;
    z-index: 0;
  }

  .visual-card {
    background: var(--surface-color);
    border: 1px solid var(--border-color);
    border-radius: 20px;
    padding: 30px;
    width: 100%;
    max-width: 400px;
    position: relative;
    z-index: 1;
    box-shadow: 0 20px 50px rgba(0,0,0,0.5);
    transform: perspective(1000px) rotateY(-10deg) rotateX(5deg);
    transition: transform 0.5s ease;
  }

  .visual-card:hover {
    transform: perspective(1000px) rotateY(0deg) rotateX(0deg);
  }

  .mock-ui {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .mock-line {
    height: 12px;
    background: var(--surface-color-light);
    border-radius: 6px;
    width: 100%;
  }

  .mock-line.short {
    width: 60%;
  }

  .mock-chart {
    display: flex;
    height: 12px;
    border-radius: 6px;
    overflow: hidden;
    margin: 20px 0;
  }

  .mock-chart .bar.poor { background: var(--rating-poor); }
  .mock-chart .bar.fair { background: var(--rating-fair); }
  .mock-chart .bar.good { background: var(--rating-good); }
  .mock-chart .bar.excellent { background: var(--rating-excellent); }

  .mock-badge {
    align-self: flex-start;
    background: rgba(24, 144, 255, 0.2);
    color: var(--rating-excellent);
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: bold;
  }

  .section-header {
    text-align: center;
    margin-bottom: 48px;
  }

  .section-header h2 {
    font-size: 2.5rem;
    margin-bottom: 12px;
  }

  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 32px;
    margin-bottom: 80px;
  }

  .icon-wrapper {
    width: 60px;
    height: 60px;
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 24px;
  }

  .icon-wrapper.danger {
    background: rgba(255, 71, 87, 0.1);
    color: var(--accent-danger);
  }

  .icon-wrapper.success {
    background: rgba(0, 255, 204, 0.1);
    color: var(--accent-neon);
  }

  .content-box {
    padding: 40px;
    margin-bottom: 80px;
    border-left: 4px solid var(--accent-primary);
  }

  .requirement {
    display: flex;
    align-items: flex-start;
    gap: 16px;
    background: var(--surface-color-light);
    padding: 20px;
    border-radius: 12px;
    margin-top: 24px;
    border: 1px solid var(--border-color);
  }

  :global(.req-icon) {
    color: var(--accent-neon);
    flex-shrink: 0;
  }

  .credits-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 32px;
    margin-bottom: 80px;
  }

  :global(.trophy-icon) {
    color: #ffd700;
    margin-bottom: 20px;
  }

  .link {
    display: inline-block;
    margin-top: 16px;
    font-weight: 600;
  }

  .study-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .study-list li {
    padding: 16px 0;
    border-bottom: 1px solid var(--border-color);
  }

  .study-list li:last-child {
    border-bottom: none;
  }

  .study-list p {
    font-size: 0.9rem;
    margin-top: 4px;
  }

  .landing-footer {
    text-align: center;
    padding: 40px 0;
    border-top: 1px solid var(--border-color);
    color: var(--text-secondary);
  }

  @media (max-width: 900px) {
    .hero-content {
      flex-direction: column;
      text-align: center;
    }
    h1.gradient-text {
      font-size: 3rem;
    }
    .hero-visual {
      width: 100%;
    }
    .grid, .credits-grid {
      grid-template-columns: 1fr;
    }
    .mock-badge {
      align-self: center;
    }
  }
</style>
