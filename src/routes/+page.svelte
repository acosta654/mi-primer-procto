<script lang="ts">
	import Icon from '@iconify/svelte';
	import TarjetaProducto from '#lib/components/TarjetaProducto.svelte';
	import type { Producto } from '#lib/data/productos';

	let { data }: { data: { productos: Producto[] } } = $props();

	const destacados = $derived(data.productos.slice(0, 3));
</script>

<svelte:head>
	<title>Trama Studio | Tejidos de autor</title>
	<meta name="description" content="Trama Studio, catálogo de tejidos de autor para moda e interiorismo." />
</svelte:head>

<section class="relative mx-auto w-full max-w-6xl px-6 py-20">
	<div class="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
		<div class="absolute -top-24 right-0 h-72 w-72 rounded-full bg-stone-200/40 blur-3xl"></div>
		<div class="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-stone-300/30 blur-3xl"></div>
	</div>

	<header class="mb-16 flex flex-col items-start gap-6">
		<div class="inline-flex items-center gap-2 rounded-full border border-stone-300/60 px-4 py-1.5 text-xs uppercase tracking-[0.4em] text-stone-500">
			<span>Trama Studio</span>
		</div>
		<h1 class="max-w-3xl text-5xl font-semibold leading-tight text-stone-900 sm:text-6xl">
			Tejidos de autor con carácter y textura única
		</h1>
		<p class="max-w-2xl text-lg leading-relaxed text-stone-600">
			Descubre {data.productos.length} piezas cuidadosamente seleccionadas. Tejidos con caída, peso y estructura pensados para dar vida a tus proyectos de moda e interiorismo.
		</p>
		<div class="mt-2 flex flex-wrap items-center gap-4">
			<a
				href="/products"
				class="group inline-flex items-center gap-2 rounded-full bg-stone-900 px-7 py-3 text-sm font-medium text-white transition hover:bg-stone-800"
			>
				Ver catálogo completo
				<Icon icon="mdi:arrow-right" class="transition-transform group-hover:translate-x-1" />
			</a>
			<a
				href="/formulacontacto"
				class="inline-flex items-center gap-2 rounded-full border border-stone-300 px-7 py-3 text-sm font-medium text-stone-900 transition hover:bg-stone-100"
			>
				Contactar
			</a>
		</div>
	</header>

	<div class="mb-10 flex items-end justify-between">
		<div>
			<p class="text-sm uppercase tracking-[0.3em] text-stone-500">Selección</p>
			<h2 class="mt-2 text-2xl font-medium text-stone-900 sm:text-3xl">Destacados</h2>
		</div>
		<a href="/products" class="hidden items-center gap-2 text-sm text-stone-600 transition hover:text-stone-900 sm:inline-flex">
			Ver todos
			<Icon icon="mdi:arrow-right" />
		</a>
	</div>
	<ul class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
		{#each destacados as producto (producto.id)}
			<li>
				<TarjetaProducto {producto} />
			</li>
		{/each}
	</ul>
</section>
