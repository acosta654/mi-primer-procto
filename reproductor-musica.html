<!DOCTYPE html>
<html lang="es">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reproductor de Música - Solo Diseño</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg-primary: #0f0f23;
      --bg-secondary: #1a1a2e;
      --bg-card: #16213e;
      --text-primary: #ffffff;
      --text-secondary: #a0a0c0;
      --accent: #6366f1;
      --accent-hover: #4f46e5;
      --progress-bg: #2a2a4a;
      --border: #2a2a4a;
    }

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    }

    body {
      background: radial-gradient(ellipse at top, #1e1b4b 0%, var(--bg-primary) 50%);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
      color: var(--text-primary);
    }

    .player-container {
      width: 100%;
      max-width: 380px;
      background: linear-gradient(145deg, var(--bg-card) 0%, var(--bg-secondary) 100%);
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
      background: var(--accent);
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
    }

    .song-artist {
      font-size: 15px;
      color: var(--text-secondary);
      font-weight: 500;
    }

    .progress-section {
      margin-bottom: 28px;
    }

    .progress-bar-container {
      width: 100%;
      height: 6px;
      background: var(--progress-bg);
      border-radius: 3px;
      margin-bottom: 10px;
      position: relative;
      overflow: hidden;
    }

    .progress-bar {
      width: 35%;
      height: 100%;
      background: linear-gradient(90deg, var(--accent) 0%, #8b5cf6 100%);
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
      background: var(--text-primary);
      border-radius: 50%;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
    }

    .time-info {
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      color: var(--text-secondary);
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
      color: var(--text-secondary);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease;
      border-radius: 50%;
      width: 48px;
      height: 48px;
    }

    .control-btn:hover {
      color: var(--text-primary);
      background: rgba(99, 102, 241, 0.1);
    }

    .control-btn i {
      font-size: 24px;
    }

    .play-btn {
      width: 64px;
      height: 64px;
      background: linear-gradient(135deg, var(--accent) 0%, #8b5cf6 100%);
      color: var(--text-primary);
      box-shadow: 0 8px 24px -8px rgba(99, 102, 241, 0.6);
    }

    .play-btn:hover {
      background: linear-gradient(135deg, var(--accent-hover) 0%, #7c3aed 100%);
      color: var(--text-primary);
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
      color: var(--text-secondary);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      transition: all 0.2s ease;
    }

    .secondary-btn:hover {
      color: var(--text-primary);
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
      border-top: 1px solid var(--border);
    }

    .volume-icon {
      color: var(--text-secondary);
      display: flex;
      align-items: center;
    }

    .volume-icon i {
      font-size: 20px;
    }

    .volume-bar-container {
      flex: 1;
      height: 4px;
      background: var(--progress-bg);
      border-radius: 2px;
      position: relative;
      overflow: hidden;
    }

    .volume-bar {
      width: 65%;
      height: 100%;
      background: linear-gradient(90deg, var(--accent) 0%, #8b5cf6 100%);
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
    }

    .playlist-count {
      font-size: 13px;
      color: var(--text-secondary);
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
      color: var(--text-secondary);
      font-weight: 500;
    }

    .playlist-item.active .playlist-number {
      color: var(--accent);
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
    }

    .playlist-song-artist {
      font-size: 12px;
      color: var(--text-secondary);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .playlist-duration {
      font-size: 12px;
      color: var(--text-secondary);
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
      background: var(--accent);
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
</head>

<body>
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
        <button class="control-btn">
          <i class="ti ti-player-skip-back"></i>
        </button>
        <button class="control-btn play-btn">
          <i class="ti ti-player-play-filled"></i>
        </button>
        <button class="control-btn">
          <i class="ti ti-player-skip-forward"></i>
        </button>
      </div>

      <div class="secondary-controls">
        <button class="secondary-btn">
          <i class="ti ti-arrows-shuffle"></i>
        </button>
        <button class="secondary-btn">
          <i class="ti ti-repeat"></i>
        </button>
        <button class="secondary-btn">
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
</body>

</html>
