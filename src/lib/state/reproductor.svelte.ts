import { browser } from '$app/environment';

const CLAVE = 'reproductor-estado';
const VOLUMEN_POR_DEFECTO = 0.8;

export type Track = {
	id: string;
	titulo: string;
	audio: string;
	artista: string;
	album: string;
	portada: string | null;
};

export type EstadoReproductor = {
	cancionId: string | null;
	tiempo: number;
	volumen: number;
	aleatorio: boolean;
	repetir: boolean;
	favoritos: string[];
	reproduciendo: boolean;
	tracks: Track[];
	indiceActual: number;
};

export const estadoReproductor = $state<EstadoReproductor>({
	cancionId: null,
	tiempo: 0,
	volumen: VOLUMEN_POR_DEFECTO,
	aleatorio: false,
	repetir: false,
	favoritos: [],
	reproduciendo: false,
	tracks: [],
	indiceActual: 0
});

function numeroValido(valor: unknown, porDefecto: number) {
	return typeof valor === 'number' && Number.isFinite(valor) ? valor : porDefecto;
}

/** Lee el estado guardado en localStorage (solo en el navegador). */
export function cargarEstadoReproductor() {
	if (!browser) return;

	try {
		const crudo = localStorage.getItem(CLAVE);
		if (!crudo) return;

		const guardado = JSON.parse(crudo) as Partial<EstadoReproductor>;

		estadoReproductor.cancionId =
			typeof guardado.cancionId === 'string' && guardado.cancionId.length > 0
				? guardado.cancionId
				: null;
		estadoReproductor.tiempo = Math.max(0, numeroValido(guardado.tiempo, 0));
		estadoReproductor.volumen = Math.min(
			1,
			Math.max(0, numeroValido(guardado.volumen, VOLUMEN_POR_DEFECTO))
		);
		estadoReproductor.aleatorio = Boolean(guardado.aleatorio);
		estadoReproductor.repetir = Boolean(guardado.repetir);
		estadoReproductor.favoritos = Array.isArray(guardado.favoritos)
			? guardado.favoritos.filter((id): id is string => typeof id === 'string')
			: [];
	} catch (error) {
		console.warn('No se pudo cargar el estado del reproductor:', error);
	}
}

let temporizador: ReturnType<typeof setTimeout> | undefined;

function escribirEstado() {
	try {
		localStorage.setItem(
			CLAVE,
			JSON.stringify({
				cancionId: estadoReproductor.cancionId,
				tiempo: estadoReproductor.tiempo,
				volumen: estadoReproductor.volumen,
				aleatorio: estadoReproductor.aleatorio,
				repetir: estadoReproductor.repetir,
				favoritos: estadoReproductor.favoritos
			})
		);
	} catch (error) {
		console.warn('No se pudo guardar el estado del reproductor:', error);
	}
}

/**
 * Guarda el estado en localStorage.
 * Las llamadas normales se agrupan para no escribir en cada `timeupdate`;
 * con `inmediato` se guarda al instante (pausa, cambio de canción, etc.).
 */
export function guardarEstadoReproductor(inmediato = false) {
	if (!browser) return;

	if (inmediato) {
		clearTimeout(temporizador);
		temporizador = undefined;
		escribirEstado();
		return;
	}

	if (temporizador) return;

	temporizador = setTimeout(() => {
		temporizador = undefined;
		escribirEstado();
	}, 800);
}

export function establecerTracks(tracks: Track[]) {
	estadoReproductor.tracks = tracks;
	if (tracks.length > 0) {
		const encontrado = tracks.findIndex((t) => t.id === estadoReproductor.cancionId);
		estadoReproductor.indiceActual = encontrado >= 0 ? encontrado : 0;
		if (!estadoReproductor.cancionId) {
			estadoReproductor.cancionId = tracks[0].id;
		}
	}
}

export function obtenerCancionActual(): Track | undefined {
	return estadoReproductor.tracks.find((t) => t.id === estadoReproductor.cancionId);
}

export function siguienteCancion() {
	if (estadoReproductor.tracks.length === 0) return;
	if (estadoReproductor.aleatorio && estadoReproductor.tracks.length > 1) {
		let pos = estadoReproductor.indiceActual;
		while (pos === estadoReproductor.indiceActual) {
			pos = Math.floor(Math.random() * estadoReproductor.tracks.length);
		}
		estadoReproductor.indiceActual = pos;
		estadoReproductor.cancionId = estadoReproductor.tracks[pos].id;
		estadoReproductor.tiempo = 0;
		return;
	}
	estadoReproductor.indiceActual = (estadoReproductor.indiceActual + 1) % estadoReproductor.tracks.length;
	estadoReproductor.cancionId = estadoReproductor.tracks[estadoReproductor.indiceActual].id;
	estadoReproductor.tiempo = 0;
}

export function anteriorCancion() {
	if (estadoReproductor.tracks.length === 0) return;
	estadoReproductor.indiceActual = (estadoReproductor.indiceActual - 1 + estadoReproductor.tracks.length) % estadoReproductor.tracks.length;
	estadoReproductor.cancionId = estadoReproductor.tracks[estadoReproductor.indiceActual].id;
	estadoReproductor.tiempo = 0;
}

export function seleccionarCancion(indice: number) {
	if (estadoReproductor.tracks.length === 0) return;
	const pos = ((indice % estadoReproductor.tracks.length) + estadoReproductor.tracks.length) % estadoReproductor.tracks.length;
	estadoReproductor.indiceActual = pos;
	estadoReproductor.cancionId = estadoReproductor.tracks[pos].id;
	estadoReproductor.tiempo = 0;
}

export function alternarAleatorio() {
	estadoReproductor.aleatorio = !estadoReproductor.aleatorio;
	guardarEstadoReproductor(true);
}

export function alternarRepetir() {
	estadoReproductor.repetir = !estadoReproductor.repetir;
	guardarEstadoReproductor(true);
}

export function alternarFavorito(id?: string) {
	const trackId = id || estadoReproductor.cancionId;
	if (!trackId) return;
	if (estadoReproductor.favoritos.includes(trackId)) {
		estadoReproductor.favoritos = estadoReproductor.favoritos.filter((f) => f !== trackId);
	} else {
		estadoReproductor.favoritos = [...estadoReproductor.favoritos, trackId];
	}
	guardarEstadoReproductor(true);
}
