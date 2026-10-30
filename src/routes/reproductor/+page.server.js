import { canciones } from '#lib/server/canciones';

/** @type {import('./$types').PageServerLoad} */
export function load() {
	return {
		tracks: canciones,
		error: canciones.length === 0 ? 'No hay canciones guardadas en el servidor.' : null
	};
}
