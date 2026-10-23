import { productos } from '#lib/data/productos';
import type { PageLoad } from './$types';

export const load: PageLoad = () => {
	return { productos };
};
