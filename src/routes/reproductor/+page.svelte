<script lang="ts">
  // Solo diseño, sin funcionalidad
</script>

<svelte:head>
  <title>Reproductor de Música - Solo Diseño</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
</svelte:head>

<div class="player-page">
  <div class="player-container">
    <!-- Sección del álbum -->
    <div class="album-section">
      <div class="album-cover">
        <div class="vinyl-overlay">
          <div class="vinyl-center"></div>
        </div>
      </div>

      <div class="song-info">
        <h1 class="song-title">Midnight Dreams</h1>
        <p class="song-artist">Luna & The Stars</p>
      </div>

      <div class="progress-section">
        <div class="progress-bar-container">
          <div class="progress-bar"></div>
        </div>
        <div class="time-info">
          <span>1:24</span>
          <span>3:58</span>
        </div>
      </div>

      <div class="controls-section">
        <button class="control-btn" aria-label="Canción anterior">
          <i class="ti ti-player-skip-back"></i>
        </button>
        <button class="control-btn play-btn" aria-label="Reproducir">
          <i class="ti ti-player-play-filled"></i>
        </button>
        <button class="control-btn" aria-label="Canción siguiente">
          <i class="ti ti-player-skip-forward"></i>
        </button>
      </div>

      <div class="secondary-controls">
        <button class="secondary-btn" aria-label="Aleatorio">
          <i class="ti ti-arrows-shuffle"></i>
        </button>
        <button class="secondary-btn" aria-label="Repetir">
          <i class="ti ti-repeat"></i>
        </button>
        <button class="secondary-btn" aria-label="Me gusta">
          <i class="ti ti-heart"></i>
        </button>
      </div>
    </div>

    <!-- Control de volumen -->
    <div class="volume-section">
      <div class="volume-icon">
        <i class="ti ti-volume-2"></i>
      </div>
      <div class="volume-bar-container">
        <div class="volume-bar"></div>
      </div>
    </div>

    <!-- Lista de reproducción -->
    <div class="playlist-section">
      <div class="playlist-header">
        <h2 class="playlist-title">Lista de reproducción</h2>
        <span class="playlist-count">4 canciones</span>
      </div>

      <div class="playlist-item active">
        <div class="playlist-number">
          <div class="playing-indicator">
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
          </div>
        </div>
        <div class="playlist-song-info">
          <div class="playlist-song-title">Midnight Dreams</div>
          <div class="playlist-song-artist">Luna & The Stars</div>
        </div>
        <span class="playlist-duration">3:58</span>
      </div>

      <div class="playlist-item">
        <span class="playlist-number">2</span>
        <div class="playlist-song-info">
          <div class="playlist-song-title">Neon Nights</div>
          <div class="playlist-song-artist">Synthwave Collective</div>
        </div>
        <span class="playlist-duration">4:12</span>
      </div>

      <div class="playlist-item">
        <span class="playlist-number">3</span>
        <div class="playlist-song-info">
          <div class="playlist-song-title">Ocean Drive</div>
          <div class="playlist-song-artist">Miami Sunset</div>
        </div>
        <span class="playlist-duration">3:45</span>
      </div>

      <div class="playlist-item">
        <span class="playlist-number">4</span>
        <div class="playlist-song-info">
          <div class="playlist-song-title">Electric Soul</div>
          <div class="playlist-song-artist">Retro Pulse</div>
        </div>
        <span class="playlist-duration">5:23</span>
      </div>
    </div>
  </div>
</div>

<style>
  :global(body) {
    background: radial-gradient(ellipse at top, #1e1b4b 0%, #0f0f23 50%);
    margin: 0;
    padding: 0;
  }

  .player-page {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    color: #ffffff;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  }

  .player-container {
    width: 100%;
    max-width: 380px;
    background: linear-gradient(145deg, #16213e 0%, #1a1a2e 100%);
    border-radius: 24px;
    box-shadow: 
      0 25px 50px -12px rgba(99, 102, 241, 0.25),
      0 0 0 1px rgba(99, 102, 241, 0.1);
    overflow: hidden;
    backdrop-filter: blur(10px);
  }

  .album-section {
    padding: 32px 32px 24px;
    text-align: center;
  }

  .album-cover {
    width: 280px;
    height: 280px;
    margin: 0 auto 24px;
    border-radius: 16px;
    background: linear-gradient(135deg, #6366f1 0%, #ec4899 50%, #f59e0b 100%);
    position: relative;
    box-shadow: 
      0 20px 40px -8px rgba(0, 0, 0, 0.6),
      0 0 60px -20px rgba(99, 102, 241, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  .album-cover::before {
    content: '';
    position: absolute;
    inset: 0;
    background: url('https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop') center/cover;
    opacity: 0.7;
  }

  .vinyl-overlay {
    position: absolute;
    width: 80px;
    height: 80px;
    background: radial-gradient(circle, #000 30%, #1a1a1a 31%, #1a1a1a 40%, #000 41%);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
  }

  .vinyl-center {
    width: 16px;
    height: 16px;
    background: #6366f1;
    border-radius: 50%;
  }

  .song-info {
    margin-bottom: 24px;
  }

  .song-title {
    font-size: 22px;
    font-weight: 600;
    margin-bottom: 6px;
    letter-spacing: -0.02em;
    color: #ffffff;
  }

  .song-artist {
    font-size: 15px;
    color: #a0a0c0;
    font-weight: 500;
    margin: 0;
  }

  .progress-section {
    margin-bottom: 28px;
  }

  .progress-bar-container {
    width: 100%;
    height: 6px;
    background: #2a2a4a;
    border-radius: 3px;
    margin-bottom: 10px;
    position: relative;
    overflow: hidden;
  }

  .progress-bar {
    width: 35%;
    height: 100%;
    background: linear-gradient(90deg, #6366f1 0%, #8b5cf6 100%);
    border-radius: 3px;
    position: relative;
  }

  .progress-bar::after {
    content: '';
    position: absolute;
    right: -6px;
    top: 50%;
    transform: translateY(-50%);
    width: 12px;
    height: 12px;
    background: #ffffff;
    border-radius: 50%;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
  }

  .time-info {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    color: #a0a0c0;
    font-weight: 500;
  }

  .controls-section {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    margin-bottom: 24px;
  }

  .control-btn {
    background: transparent;
    border: none;
    color: #a0a0c0;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
    border-radius: 50%;
    width: 48px;
    height: 48px;
    padding: 0;
  }

  .control-btn:hover {
    color: #ffffff;
    background: rgba(99, 102, 241, 0.1);
  }

  .control-btn i {
    font-size: 24px;
  }

  .play-btn {
    width: 64px;
    height: 64px;
    background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
    color: #ffffff;
    box-shadow: 0 8px 24px -8px rgba(99, 102, 241, 0.6);
  }

  .play-btn:hover {
    background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
    color: #ffffff;
    transform: scale(1.05);
  }

  .play-btn i {
    font-size: 28px;
    margin-left: 2px;
  }

  .secondary-controls {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 8px;
  }

  .secondary-btn {
    background: transparent;
    border: none;
    color: #a0a0c0;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    transition: all 0.2s ease;
    padding: 0;
  }

  .secondary-btn:hover {
    color: #ffffff;
    background: rgba(99, 102, 241, 0.1);
  }

  .secondary-btn i {
    font-size: 20px;
  }

  .volume-section {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 20px 32px 32px;
    border-top: 1px solid #2a2a4a;
  }

  .volume-icon {
    color: #a0a0c0;
    display: flex;
    align-items: center;
  }

  .volume-icon i {
    font-size: 20px;
  }

  .volume-bar-container {
    flex: 1;
    height: 4px;
    background: #2a2a4a;
    border-radius: 2px;
    position: relative;
    overflow: hidden;
  }

  .volume-bar {
    width: 65%;
    height: 100%;
    background: linear-gradient(90deg, #6366f1 0%, #8b5cf6 100%);
    border-radius: 2px;
  }

  .playlist-section {
    padding: 0 32px 32px;
  }

  .playlist-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
  }

  .playlist-title {
    font-size: 16px;
    font-weight: 600;
    margin: 0;
    color: #ffffff;
  }

  .playlist-count {
    font-size: 13px;
    color: #a0a0c0;
  }

  .playlist-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 12px;
    border-radius: 12px;
    margin-bottom: 6px;
    transition: all 0.2s ease;
  }

  .playlist-item.active {
    background: rgba(99, 102, 241, 0.15);
    border: 1px solid rgba(99, 102, 241, 0.3);
  }

  .playlist-item:not(.active):hover {
    background: rgba(255, 255, 255, 0.03);
  }

  .playlist-number {
    width: 20px;
    text-align: center;
    font-size: 13px;
    color: #a0a0c0;
    font-weight: 500;
  }

  .playlist-item.active .playlist-number {
    color: #6366f1;
  }

  .playlist-song-info {
    flex: 1;
    min-width: 0;
  }

  .playlist-song-title {
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 2px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #ffffff;
  }

  .playlist-song-artist {
    font-size: 12px;
    color: #a0a0c0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 0;
  }

  .playlist-duration {
    font-size: 12px;
    color: #a0a0c0;
    font-weight: 500;
  }

  .playing-indicator {
    display: flex;
    align-items: end;
    gap: 2px;
    height: 12px;
  }

  .bar {
    width: 3px;
    background: #6366f1;
    border-radius: 1px;
  }

  .bar:nth-child(1) {
    height: 6px;
  }

  .bar:nth-child(2) {
    height: 12px;
  }

  .bar:nth-child(3) {
    height: 8px;
  }
</style>
