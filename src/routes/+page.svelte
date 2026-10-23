<script lang="ts">
	import Icon from '@iconify/svelte';
	import TarjetaProducto from '#lib/components/TarjetaProducto.svelte';
	import type { Producto } from '#lib/data/productos';

	let { data }: { data: { productos: Producto[] } } = $props();

	const destacados = $derived(data.productos.slice(0, 3));
</script>

<svelte:head>
	<title>Trama Studio · Tejidos</title>
	<meta name="description" content="Trama Studio, catálogo de tejidos de autor para moda e interiorismo." />
</svelte:head>

<section class="mx-auto w-full max-w-6xl px-6 py-16">
	<header class="mb-12 flex flex-col gap-3">
		<p class="text-sm uppercase tracking-[0.3em] text-stone-500">Trama Studio</p>
		<h1 class="max-w-2xl text-4xl font-semibold text-stone-900">
			Tejidos de autor para la colección otoño tartan geométrico
		</h1>
		<p class="max-w-xl text-stone-600">
			{data.productos.length} tejidos con caída, peso y rigidez de flexión medidos por metro lineal.
		</p>
		<a
			href="/products"
			class="mt-4 inline-flex w-fit items-center gap-2 bg-stone-900 px-5 py-3 text-sm text-white transition hover:bg-stone-700"
		>
			Ver catálogo completo
			<Icon icon="mdi:arrow-right" />
		</a>
	</header>

	<h2 class="mb-6 text-xl font-medium text-stone-900">Destacados</h2>
	<ul class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
		{#each destacados as producto (producto.id)}
			<li>
				<TarjetaProducto {producto} />
			</li>
		{/each}
	</ul>
</section>
