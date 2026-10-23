export type Patron = 'liso' | 'tartan' | 'rayas' | 'cuadros';

export interface Producto {
	id: string;
	nombre: string;
	material: string;
	precio: number;
	pesoKg: number;
	/** Caída y peso: 0 = rígido, 100 = caída total. */
	caida: number;
	/** Rigidez de flexión en porcentaje. */
	rigidez: number;
	color: string;
	patron: Patron;
	descripcion: string;
	stock: number;
}

export const productos: Producto[] = [
	{
		id: 'boucle-miel',
		nombre: 'Bouclé Miel',
		material: 'Lana Bouclé',
		precio: 340,
		pesoKg: 1.35,
		caida: 82,
		rigidez: 72,
		color: '#e0b44a',
		patron: 'liso',
		descripcion: 'Bouclé de lana cardada de caída marcada, ideal para chaquetas y abrigos.',
		stock: 12
	},
	{
		id: 'lino-bosque',
		nombre: 'Lino Bosque',
		material: 'Lino Pesado',
		precio: 420,
		pesoKg: 1.62,
		caida: 68,
		rigidez: 84,
		color: '#4a7c59',
		patron: 'rayas',
		descripcion: 'Lino lavado de trama gruesa, estructurada y transpirable.',
		stock: 7
	},
	{
		id: 'seda-jade',
		nombre: 'Seda Jade',
		material: 'Seda Fluida',
		precio: 110,
		pesoKg: 0.35,
		caida: 95,
		rigidez: 12,
		color: '#2f8f7a',
		patron: 'liso',
		descripcion: 'Seda de caída fluida y peso pluma para forros yDetalles.',
		stock: 24
	},
	{
		id: 'sarga-hierba',
		nombre: 'Sarga Hierba',
		material: 'Sarga Algodón',
		precio: 280,
		pesoKg: 0.9,
		caida: 55,
		rigidez: 63,
		color: '#6aa84f',
		patron: 'cuadros',
		descripcion: 'Sarga de algodón peinado con trama en diagonal, resistente y estable.',
		stock: 15
	},
	{
		id: 'tartan-artico',
		nombre: 'Tartan Ártico',
		material: 'Lana Tartán',
		precio: 385,
		pesoKg: 1.48,
		caida: 74,
		rigidez: 71,
		color: '#3b6ea5',
		patron: 'tartan',
		descripcion: 'Tartan de lana con el check geométrico de la colección otoño.',
		stock: 9
	},
	{
		id: 'algodon-organico',
		nombre: 'Algodón Orgánico Crudo',
		material: 'Algodón Orgánico',
		precio: 165,
		pesoKg: 0.78,
		caida: 48,
		rigidez: 57,
		color: '#d9cbb3',
		patron: 'liso',
		descripcion: 'Algodón certificado GOTS, sin teñir, de tacto seco y natural.',
		stock: 31
	},
	{
		id: 'seda-ambar',
		nombre: 'Seda Ámbar',
		material: 'Seda Fluida',
		precio: 130,
		pesoKg: 0.28,
		caida: 92,
		rigidez: 9,
		color: '#c76e2b',
		patron: 'liso',
		descripcion: 'Seda ámbar de caída profunda para detalles y acabados.',
		stock: 18
	},
	{
		id: 'sarga-indigo',
		nombre: 'Sarga Índigo',
		material: 'Sarga Algodón',
		precio: 260,
		pesoKg: 0.95,
		caida: 58,
		rigidez: 66,
		color: '#2f4858',
		patron: 'rayas',
		descripcion: 'Sarga teñida en índigo con líneas sutiles, de uso diario.',
		stock: 21
	}
];

export const getProducto = (id: string): Producto | undefined =>
	productos.find((producto) => producto.id === id);
