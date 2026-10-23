<script lang="ts">
	import Icon from '@iconify/svelte';
	import TarjetaProducto from '#lib/components/TarjetaProducto.svelte';
	import type { Producto } from '#lib/data/productos';

	let { data }: { data: { productos: Producto[] } } = $props();

	let busqueda = $state('');
	let material = $state<'todos' | string>('todos');
	let orden = $state<'precio-asc' | 'precio-desc' | 'caida'>('precio-asc');

	const materiales = $derived(['todos', ...new Set(data.productos.map((p) => p.material))]);

	const filtrados = $derived.by(() => {
		const texto = busqueda.trim().toLowerCase();

		const lista = data.productos.filter((producto) => {
			const coincideTexto =
				texto === '' ||
				producto.nombre.toLowerCase().includes(texto) ||
				producto.material.toLowerCase().includes(texto);
			const coincideMaterial = material === 'todos' || producto.material === material;
			return coincideTexto && coincideMaterial;
		});

		return lista.sort((a, b) => {
			if (orden === 'precio-desc') return b.precio - a.precio;
			if (orden === 'caida') return b.caida - a.caida;
			return a.precio - b.precio;
		});
	});
</script>

<svelte:head>
	<title>Productos · Trama Studio</title>
	<meta name="description" content="Catálogo de tejidos de la colección otoño tartan geométrico." />
</svelte:head>

<section class="mx-auto w-full max-w-6xl px-6 py-12">
	<header class="mb-10 flex flex-col gap-2">
		<p class="text-sm uppercase tracking-[0.3em] text-stone-500">Catálogo</p>
		<h1 class="text-3xl font-semibold text-stone-900">Colección otoño tartan geométrico</h1>
		<p class="text-stone-600">
			{filtrados.length} de {data.productos.length} tejidos
		</p>
	</header>

	<div class="mb-10 flex flex-wrap items-end gap-4">
		<label class="flex flex-col gap-1 text-sm text-stone-600">
			<span>Buscar</span>
			<input
				type="search"
				bind:value={busqueda}
				placeholder="Nombre o material"
				class="rounded-none border-stone-300 px-3 py-2 text-stone-900"
			/>
		</label>

		<label class="flex flex-col gap-1 text-sm text-stone-600">
			<span>Material</span>
			<select bind:value={material} class="rounded-none border-stone-300 px-3 py-2 text-stone-900">
				{#each materiales as opcion}
					<option value={opcion}>{opcion === 'todos' ? 'Todos' : opcion}</option>
				{/each}
			</select>
		</label>

		<label class="flex flex-col gap-1 text-sm text-stone-600">
			<span>Ordenar por</span>
			<select bind:value={orden} class="rounded-none border-stone-300 px-3 py-2 text-stone-900">
				<option value="precio-asc">Precio ascendente</option>
				<option value="precio-desc">Precio descendente</option>
				<option value="caida">Caída</option>
			</select>
		</label>
	</div>

	{#if filtrados.length === 0}
		<p class="border border-dashed border-stone-300 px-6 py-12 text-center text-stone-500">
			No hay tejidos con estos filtros.
		</p>
	{:else}
		<ul class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
			{#each filtrados as producto (producto.id)}
				<li>
					<TarjetaProducto {producto} />
				</li>
			{/each}
		</ul>
	{/if}

	<footer class="mt-16 border-t border-stone-200 pt-6 text-sm text-stone-500">
		<p class="flex items-center gap-2">
			<Icon icon="mdi:palette" />
			Tejidos con caída, peso y rigidez de flexión medidos por metro lineal.
		</p>
	</footer>
</section>
