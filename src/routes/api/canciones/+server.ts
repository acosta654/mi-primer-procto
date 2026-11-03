import { json } from '@sveltejs/kit';
import axios from 'axios';
import { canciones } from '#lib/server/canciones';

const normalizar = (t: any) => ({
	id: t.id || t._id || crypto.randomUUID?.() || String(Math.random()),
	titulo: t.titulo || t.title || t.nombre || t.name || 'Sin título',
	audio: t.audio || t.url || t.song || t.track || t.src || t.audioUrl || '',
	artista: t.artista || t.artist || t.autor || t.author || 'Desconocido',
	album: t.album || t.disco || t.albumName || '',
	portada: t.portada || t.cover || t.image || t.img || t.thumbnail || null
});

export const GET = async () => {
	try {
		const response = await axios.get('https://leonardoapi.vercel.app/api/tracks', {
			headers: {
				'Cache-Control': 'no-cache',
				Pragma: 'no-cache',
				'User-Agent': 'mi-primer-procto/1.0',
				Accept: 'application/json'
			},
			timeout: 8000
		});

		let tracks: any[] = [];
		if (Array.isArray(response.data)) {
			tracks = response.data;
		} else if (Array.isArray(response.data?.tracks)) {
			tracks = response.data.tracks;
		} else if (Array.isArray(response.data?.data)) {
			tracks = response.data.data;
		} else if (Array.isArray(response.data?.items)) {
			tracks = response.data.items;
		} else if (Array.isArray(response.data?.results)) {
			tracks = response.data.results;
		}

		if (Array.isArray(canciones) && canciones.length > 0) {
			const apiTracks = tracks.map(normalizar).filter((t) => t.audio);
			const fallbackTracks = (canciones as any[]).map(normalizar).filter((t) => t.audio);
			tracks = apiTracks.length > 0 ? apiTracks : fallbackTracks;
		} else {
			tracks = tracks.map(normalizar).filter((t) => t.audio);
		}

		return json({ tracks });
	} catch (error) {
		console.error('Error al obtener canciones:', error);
		const fallbackTracks = (canciones as any[]).map(normalizar).filter((t) => t.audio);
		return json({ tracks: fallbackTracks });
	}
};
