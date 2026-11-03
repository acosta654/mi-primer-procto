<script lang="ts">
  import { onMount } from 'svelte';
  import axios from 'axios';
  import {
    cargarEstadoReproductor,
    estadoReproductor,
    guardarEstadoReproductor,
    establecerTracks,
    obtenerCancionActual,
    siguienteCancion,
    anteriorCancion,
    seleccionarCancion,
    alternarAleatorio as alternarAleatorioStore,
    alternarRepetir as alternarRepetirStore,
    alternarFavorito as alternarFavoritoStore
  } from '#lib/state/reproductor.svelte';

  type Track = {
    id: string;
    titulo: string;
    audio: string;
    artista: string;
    album: string;
    portada: string | null;
  };

  let { data }: { data: { tracks: Track[]; error: string | null } } = $props();

  let tracks = $state<Track[]>(data.tracks || []);
  let errorCarga = $state<string | null>(data.error);

  let audio: HTMLAudioElement | undefined = $state();
  let reproduciendo = $state(false);
  let duracion = $state(0);
  let duraciones = $state<Record<string, number>>({});
  let actual = $state(0);
  let cargando = $state(false);

  const aleatorio = $derived(estadoReproductor.aleatorio);
  const repetir = $derived(estadoReproductor.repetir);
  const volumen = $derived(estadoReproductor.volumen);

  const cancionActual = $derived(
    obtenerCancionActual() ?? tracks.find((track) => track.id === estadoReproductor.cancionId) ?? tracks[0]
  );
  const indice = $derived(estadoReproductor.indiceActual >= 0 ? estadoReproductor.indiceActual : (cancionActual ? tracks.indexOf(cancionActual) : 0));
  const porcentaje = $derived(
    duracion > 0 ? (estadoReproductor.tiempo / duracion) * 100 : 0
  );
  const esFavorita = $derived(
    cancionActual ? estadoReproductor.favoritos.includes(cancionActual.id) : false
  );

  function formatearTiempo(segundos: number) {
    if (!Number.isFinite(segundos) || segundos < 0) return '0:00';
    const minutos = Math.floor(segundos / 60);
    const restantes = Math.floor(segundos % 60);
    return `${minutos}:${restantes.toString().padStart(2, '0')}`;
  }

  function reproducir() {
    if (!audio) return;
    if (!audio.src || audio.src === window.location.href) {
      if (cancionActual?.audio) {
        audio.src = cancionActual.audio;
        audio.load();
      } else {
        return;
      }
    }
    audio.volume = estadoReproductor.volumen;
    const promesa = audio.play();
    if (promesa !== undefined) {
      promesa
        .then(() => {
          reproduciendo = true;
        })
        .catch((error) => {
          console.error('No se pudo reproducir la canción:', error);
          reproduciendo = false;
        });
    } else {
      reproduciendo = true;
    }
  }

  function cargarCancion(nuevoIndice: number, autoplay = true) {
    if (!audio || tracks.length === 0) return;

    seleccionarCancion(nuevoIndice);
    const track = obtenerCancionActual() ?? tracks[estadoReproductor.indiceActual] ?? tracks[nuevoIndice];
    if (!track || !track.audio) return;

    estadoReproductor.tiempo = 0;
    actual = 0;

    try {
      audio.pause();
    } catch (e) {}
    audio.crossOrigin = 'anonymous';
    audio.src = track.audio;
    audio.load();
    audio.volume = estadoReproductor.volumen;
    audio.currentTime = 0;
    duracion = duraciones[track.id] ?? 0;

    if (autoplay) {
      setTimeout(() => {
        reproducir();
      }, 200);
    }
    guardarEstadoReproductor(true);
  }

  function alternarReproduccion() {
    if (!audio || !cancionActual) return;

    if (audio.paused || audio.ended) {
      reproducir();
    } else {
      audio.pause();
      reproduciendo = false;
    }
  }

  function anterior() {
    if (!audio) return;

    if (audio.currentTime > 3) {
      audio.currentTime = 0;
      actual = 0;
      estadoReproductor.tiempo = 0;
      guardarEstadoReproductor(true);
      return;
    }

    anteriorCancion();
    const track = obtenerCancionActual() ?? tracks[estadoReproductor.indiceActual];
    if (!track?.audio) return;
    estadoReproductor.tiempo = 0;
    actual = 0;
    try {
      audio.pause();
    } catch (e) {}
    audio.crossOrigin = 'anonymous';
    audio.src = track.audio;
    audio.load();
    audio.volume = estadoReproductor.volumen;
    audio.currentTime = 0;
    duracion = duraciones[track.id] ?? 0;
    setTimeout(() => reproducir(), 200);
    guardarEstadoReproductor(true);
  }

  function siguiente() {
    if (tracks.length === 0) return;

    if (aleatorio && tracks.length > 1) {
      siguienteCancion();
      const track = obtenerCancionActual() ?? tracks[estadoReproductor.indiceActual];
      if (!audio || !track?.audio) return;
      estadoReproductor.tiempo = 0;
      actual = 0;
      try {
        audio.pause();
      } catch (e) {}
      audio.crossOrigin = 'anonymous';
      audio.src = track.audio;
      audio.load();
      audio.volume = estadoReproductor.volumen;
      audio.currentTime = 0;
      duracion = duraciones[track.id] ?? 0;
      setTimeout(() => reproducir(), 200);
      guardarEstadoReproductor(true);
      return;
    }

    cargarCancion(indice + 1);
  }

  function alTerminar() {
    if (repetir) {
      if (audio) {
        audio.currentTime = 0;
        actual = 0;
        estadoReproductor.tiempo = 0;
        reproducir();
        guardarEstadoReproductor(true);
      }
      return;
    }

    siguiente();
  }

  function actualizarTiempo() {
    if (!audio) return;

    actual = audio.currentTime;
    estadoReproductor.tiempo = audio.currentTime;
    guardarEstadoReproductor();
  }

  function alPausar() {
    reproduciendo = false;

    if (audio) {
      actual = audio.currentTime;
      estadoReproductor.tiempo = audio.currentTime;
    }

    guardarEstadoReproductor(true);
  }

  function buscar(evento: Event) {
    const valor = Number((evento.currentTarget as HTMLInputElement).value);
    estadoReproductor.tiempo = valor;
    actual = valor;
    if (audio) audio.currentTime = valor;
    guardarEstadoReproductor(true);
  }

  function cambiarVolumen(evento: Event) {
    const valor = Number((evento.currentTarget as HTMLInputElement).value);
    estadoReproductor.volumen = valor;
    if (audio) audio.volume = valor;
    guardarEstadoReproductor(true);
  }

  function alternarAleatorio() {
    estadoReproductor.aleatorio = !estadoReproductor.aleatorio;
    guardarEstadoReproductor(true);
  }

  function alternarRepetir() {
    estadoReproductor.repetir = !estadoReproductor.repetir;
    guardarEstadoReproductor(true);
  }

  function alternarFavorita() {
    if (!cancionActual) return;

    estadoReproductor.favoritos = esFavorita
      ? estadoReproductor.favoritos.filter((id) => id !== cancionActual.id)
      : [...estadoReproductor.favoritos, cancionActual.id];

    guardarEstadoReproductor(true);
  }

  function guardarDuracion() {
    if (!audio || !cancionActual) return;

    duracion = audio.duration || 0;
    if (Number.isFinite(duracion) && duracion > 0) {
      duraciones = { ...duraciones, [cancionActual.id]: duracion };
    }
  }

  async function cargarDesdeApi() {
    cargando = true;
    try {
      const respuesta = await axios.get('/api/canciones?_=' + Date.now(), {
        headers: {
          'Cache-Control': 'no-cache',
          Pragma: 'no-cache'
        },
        timeout: 8000
      });
      let lista: any[] = [];
      if (Array.isArray(respuesta.data?.tracks)) {
        lista = respuesta.data.tracks;
      } else if (Array.isArray(respuesta.data)) {
        lista = respuesta.data;
      }
      if (lista.length === 0 && Array.isArray(data.tracks) && data.tracks.length > 0) {
        lista = data.tracks;
      }
      if (lista.length === 0) {
        const { canciones } = await import('#lib/server/canciones');
        lista = canciones;
      }
      tracks = lista
        .map((t: any) => ({
          id: t.id || t._id || (crypto.randomUUID ? crypto.randomUUID() : String(Math.random())),
          titulo: t.titulo || t.title || t.nombre || t.name || 'Sin título',
          audio: t.audio || t.url || t.song || t.track || t.src || t.audioUrl || '',
          artista: t.artista || t.artist || t.autor || t.author || 'Desconocido',
          album: t.album || t.disco || t.albumName || '',
          portada: t.portada || t.cover || t.image || t.img || t.thumbnail || null
        }))
        .filter((t) => t.audio);
      establecerTracks(tracks);
      errorCarga = tracks.length === 0 ? 'No hay canciones disponibles.' : null;
    } catch (error) {
      console.error('Error al cargar canciones con Axios:', error);
      try {
        const { canciones } = await import('#lib/server/canciones');
        tracks = (canciones as any[])
          .map((t: any) => ({
            id: t.id || (crypto.randomUUID ? crypto.randomUUID() : String(Math.random())),
            titulo: t.titulo || t.title || 'Sin título',
            audio: t.audio || t.url || '',
            artista: t.artista || t.artist || 'Desconocido',
            album: t.album || '',
            portada: t.portada || t.cover || null
          }))
          .filter((t) => t.audio);
        establecerTracks(tracks);
        errorCarga = tracks.length === 0 ? 'No se pudieron cargar las canciones desde la API.' : null;
      } catch (e) {
        if (Array.isArray(data.tracks) && data.tracks.length > 0) {
          tracks = (data.tracks as any[])
            .map((t: any) => ({
              id: t.id || (crypto.randomUUID ? crypto.randomUUID() : String(Math.random())),
              titulo: t.titulo || t.title || 'Sin título',
              audio: t.audio || t.url || '',
              artista: t.artista || t.artist || 'Desconocido',
              album: t.album || '',
              portada: t.portada || t.cover || null
            }))
            .filter((t) => t.audio);
          establecerTracks(tracks);
          errorCarga = null;
        } else {
          errorCarga = 'No se pudieron cargar las canciones desde la API.';
        }
      }
    } finally {
      cargando = false;
    }
  }

  onMount(async () => {
    await cargarDesdeApi();
    if (!audio || tracks.length === 0) return;

    cargarEstadoReproductor();
    establecerTracks(tracks);

    const cancionGuardada = tracks.find((track) => track.id === estadoReproductor.cancionId);
    const inicial = cancionGuardada ?? tracks[0];
    if (!inicial || !inicial.audio) return;
    const tiempoGuardado = cancionGuardada ? estadoReproductor.tiempo : 0;

    estadoReproductor.cancionId = inicial.id;
    estadoReproductor.indiceActual = tracks.indexOf(inicial);
    estadoReproductor.tiempo = tiempoGuardado;
    actual = tiempoGuardado;
    if (audio) {
      audio.volume = estadoReproductor.volumen;
      audio.crossOrigin = 'anonymous';
      audio.preload = 'auto';
    }

    const restaurarTiempo = () => {
      if (!audio || tiempoGuardado <= 0) return;

      const limite =
        Number.isFinite(audio.duration) && audio.duration > 0 ? audio.duration : tiempoGuardado;
      audio.currentTime = Math.min(tiempoGuardado, limite);
      actual = audio.currentTime;
      estadoReproductor.tiempo = audio.currentTime;
    };

    if (audio) {
      audio.addEventListener('loadedmetadata', restaurarTiempo, { once: true });
      audio.pause();
      audio.src = inicial.audio;
      audio.load();
    }

    // Precarga la duración de cada canción para mostrarla en la lista.
    const precargas: HTMLAudioElement[] = [];

    for (const track of tracks) {
      if (!track.audio) continue;
      try {
        const pre = new Audio();
        pre.preload = 'metadata';
        pre.crossOrigin = 'anonymous';
        pre.src = track.audio;

        pre.addEventListener('loadedmetadata', () => {
          if (Number.isFinite(pre.duration) && pre.duration > 0) {
            duraciones = { ...duraciones, [track.id]: pre.duration };
          }
        });

        precargas.push(pre);
      } catch (e) {
        // ignorar
      }
    }

    const guardarAlSalir = () => guardarEstadoReproductor(true);
    const guardarAlOcultar = () => {
      if (document.visibilityState === 'hidden') guardarEstadoReproductor(true);
    };

    window.addEventListener('beforeunload', guardarAlSalir);
    document.addEventListener('visibilitychange', guardarAlOcultar);

    return () => {
      for (const pre of precargas) pre.src = '';
      audio?.removeEventListener('loadedmetadata', restaurarTiempo);
      window.removeEventListener('beforeunload', guardarAlSalir);
      document.removeEventListener('visibilitychange', guardarAlOcultar);
    };
  });
</script>

<svelte:head>
  <title>Reproductor de Música</title>
  <meta name="description" content="Escucha la lista de reproducción con canciones de la API de Leonardo." />
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
</svelte:head>

<div class="player-page">
  <div class="player-container">
    {#if errorCarga && tracks.length === 0}
      <div class="empty-state">
        <i class="ti ti-music-off"></i>
        <h1 class="song-title">Sin conexión</h1>
        <p class="song-artist">{errorCarga}</p>
        <button class="play-btn" type="button" onclick={cargarDesdeApi} aria-label="Reintentar" style="margin-top: 16px;">
          <i class="ti ti-refresh"></i>
        </button>
      </div>
    {:else if cancionActual}
      <audio
        bind:this={audio}
        preload="auto"
        crossorigin="anonymous"
        playsinline
        onplay={() => (reproduciendo = true)}
        onpause={() => (reproduciendo = false)}
        onended={alTerminar}
        ontimeupdate={actualizarTiempo}
        onloadedmetadata={guardarDuracion}
        ondurationchange={guardarDuracion}
      ></audio>

      <!-- Sección del álbum -->
      <div class="album-section">
        <div class="album-cover">
          {#if cancionActual.portada}
            <img
              class="cover-image"
              src={cancionActual.portada}
              alt={`Portada de ${cancionActual.album || cancionActual.titulo}`}
            />
          {/if}
          <div class="vinyl-overlay" class:girando={reproduciendo}>
            <div class="vinyl-center"></div>
          </div>
        </div>

        <div class="song-info">
          <h1 class="song-title">{cancionActual.titulo}</h1>
          <p class="song-artist">{cancionActual.artista}</p>
        </div>

        <div class="progress-section">
          <input
            class="slider progress-slider"
            type="range"
            min="0"
            max={duracion || 0}
            step="0.1"
            value={actual}
            oninput={buscar}
            disabled={duracion === 0}
            aria-label="Progreso de la canción"
            style={`--progress: ${porcentaje}%`}
          />
          <div class="time-info">
            <span>{formatearTiempo(actual)}</span>
            <span>{formatearTiempo(duracion)}</span>
          </div>
        </div>

        <div class="controls-section">
          <button class="control-btn" type="button" onclick={anterior} aria-label="Canción anterior">
            <i class="ti ti-player-skip-back"></i>
          </button>
          <button
            class="control-btn play-btn"
            type="button"
            onclick={alternarReproduccion}
            aria-label={reproduciendo ? 'Pausar' : 'Reproducir'}
          >
            <i class={reproduciendo ? 'ti ti-player-pause-filled' : 'ti ti-player-play-filled'}></i>
          </button>
          <button class="control-btn" type="button" onclick={siguiente} aria-label="Canción siguiente">
            <i class="ti ti-player-skip-forward"></i>
          </button>
        </div>

        <div class="secondary-controls">
          <button
            class="secondary-btn"
            class:activo={aleatorio}
            type="button"
            onclick={() => { alternarAleatorio(); alternarAleatorioStore(); }}
            aria-label="Aleatorio"
            aria-pressed={aleatorio}
          >
            <i class="ti ti-arrows-shuffle"></i>
          </button>
          <button
            class="secondary-btn"
            class:activo={repetir}
            type="button"
            onclick={() => { alternarRepetir(); alternarRepetirStore(); }}
            aria-label="Repetir canción"
            aria-pressed={repetir}
          >
            <i class="ti ti-repeat"></i>
          </button>
          <button
            class="secondary-btn"
            class:favorita={esFavorita}
            type="button"
            onclick={() => { alternarFavorita(); alternarFavoritoStore(); }}
            aria-label={esFavorita ? 'Quitar de favoritos' : 'Añadir a favoritos'}
            aria-pressed={esFavorita}
          >
            <i class={esFavorita ? 'ti ti-heart-filled' : 'ti ti-heart'}></i>
          </button>
        </div>
      </div>

      <!-- Control de volumen -->
      <div class="volume-section">
        <div class="volume-icon">
          <i
            class={volumen === 0
              ? 'ti ti-volume-off'
              : volumen < 0.5
                ? 'ti ti-volume-1'
                : 'ti ti-volume-2'}
          ></i>
        </div>
        <input
          class="slider volume-slider"
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volumen}
          oninput={cambiarVolumen}
          aria-label="Volumen"
          style={`--progress: ${volumen * 100}%`}
        />
      </div>

      <!-- Lista de reproducción -->
      <div class="playlist-section">
        <div class="playlist-header">
          <h2 class="playlist-title">Lista de reproducción</h2>
          <span class="playlist-count">{tracks.length} canciones</span>
        </div>

        {#each tracks as track, i (track.id)}
          <button
            type="button"
            class="playlist-item"
            class:active={indice === i}
            onclick={() => cargarCancion(i)}
            aria-current={indice === i ? 'true' : undefined}
            aria-label={`Reproducir ${track.titulo} de ${track.artista}`}
          >
            <div class="playlist-cover">
              {#if track.portada}
                <img src={track.portada} alt={`Portada de ${track.titulo}`} />
              {:else}
                <div class="playlist-cover-placeholder">
                  <i class="ti ti-music"></i>
                </div>
              {/if}
            </div>
            <div class="playlist-number">
              {#if indice === i}
                <div class="playing-indicator" class:pausado={!reproduciendo}>
                  <div class="bar"></div>
                  <div class="bar"></div>
                  <div class="bar"></div>
                </div>
              {:else}
                {i + 1}
              {/if}
            </div>
            <div class="playlist-song-info">
              <div class="playlist-song-title">{track.titulo}</div>
              <div class="playlist-song-artist">{track.artista}</div>
            </div>
            <span class="playlist-duration">
              {(duraciones[track.id] ?? 0) > 0 ? formatearTiempo(duraciones[track.id]) : '–:–'}
            </span>
          </button>
        {/each}
      </div>
    {/if}
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

  .empty-state {
    padding: 48px 32px;
    text-align: center;
  }

  .empty-state i {
    font-size: 48px;
    color: #6366f1;
    margin-bottom: 16px;
    display: inline-block;
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

  .cover-image {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .album-cover::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(15, 15, 35, 0) 55%, rgba(15, 15, 35, 0.55) 100%);
    pointer-events: none;
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
    animation: girar 18s linear infinite;
    animation-play-state: paused;
  }

  .vinyl-overlay.girando {
    animation-play-state: running;
  }

  @keyframes girar {
    to {
      transform: rotate(360deg);
    }
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
    margin: 0 0 6px;
    letter-spacing: -0.02em;
    color: #ffffff;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .song-artist {
    font-size: 15px;
    color: #a0a0c0;
    font-weight: 500;
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .progress-section {
    margin-bottom: 28px;
  }

  .slider {
    -webkit-appearance: none;
    appearance: none;
    display: block;
    width: 100%;
    height: 6px;
    border-radius: 3px;
    background: linear-gradient(90deg, #6366f1 var(--progress, 0%), #2a2a4a var(--progress, 0%));
    cursor: pointer;
    outline: none;
    margin: 0;
    padding: 0;
  }

  .slider:disabled {
    cursor: default;
  }

  .slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 12px;
    height: 12px;
    border: none;
    border-radius: 50%;
    background: #ffffff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
    cursor: pointer;
  }

  .slider::-moz-range-thumb {
    width: 12px;
    height: 12px;
    border: none;
    border-radius: 50%;
    background: #ffffff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
    cursor: pointer;
  }

  .progress-slider {
    margin-bottom: 10px;
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

  .secondary-btn.activo {
    color: #6366f1;
    background: rgba(99, 102, 241, 0.15);
  }

  .secondary-btn.favorita {
    color: #ec4899;
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

  .volume-slider {
    flex: 1;
    height: 4px;
    border-radius: 2px;
  }

  .volume-slider::-webkit-slider-thumb {
    width: 10px;
    height: 10px;
  }

  .volume-slider::-moz-range-thumb {
    width: 10px;
    height: 10px;
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
    width: 100%;
    background: transparent;
    border: 1px solid transparent;
    color: inherit;
    font: inherit;
    text-align: left;
    cursor: pointer;
  }

  .playlist-cover {
    width: 40px;
    height: 40px;
    border-radius: 8px;
    overflow: hidden;
    flex-shrink: 0;
    background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  }

  .playlist-cover img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .playlist-cover-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;
  }

  .playlist-cover-placeholder i {
    font-size: 18px;
  }

  .playlist-item.active {
    background: rgba(99, 102, 241, 0.15);
    border-color: rgba(99, 102, 241, 0.3);
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
    display: flex;
    justify-content: center;
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
    align-items: flex-end;
    gap: 2px;
    height: 12px;
  }

  .bar {
    width: 3px;
    background: #6366f1;
    border-radius: 1px;
    transform-origin: bottom;
    animation: saltar 1s ease-in-out infinite;
  }

  .bar:nth-child(1) {
    height: 6px;
  }

  .bar:nth-child(2) {
    height: 12px;
    animation-delay: 0.2s;
  }

  .bar:nth-child(3) {
    height: 8px;
    animation-delay: 0.4s;
  }

  .playing-indicator.pausado .bar {
    animation-play-state: paused;
  }

  @keyframes saltar {
    0%,
    100% {
      transform: scaleY(0.4);
    }
    50% {
      transform: scaleY(1);
    }
  }

  @media (max-width: 420px) {
    .album-cover {
      width: 100%;
      height: auto;
      aspect-ratio: 1;
    }
  }
</style>
