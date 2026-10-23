<script lang="ts">
	import type { Patron, Producto } from '#lib/data/productos';

	let { producto }: { producto: Producto } = $props();

	const patrones: Record<Patron, string> = {
		liso: 'none',
		tartan:
			'repeating-linear-gradient(45deg, rgba(0,0,0,.2) 0 6px, transparent 6px 14px), repeating-linear-gradient(-45deg, rgba(0,0,0,.2) 0 6px, transparent 6px 14px)',
		rayas: 'repeating-linear-gradient(90deg, rgba(255,255,255,.4) 0 3px, transparent 3px 11px)',
		cuadros:
			'repeating-linear-gradient(0deg, rgba(0,0,0,.16) 0 8px, transparent 8px 18px), repeating-linear-gradient(90deg, rgba(0,0,0,.16) 0 8px, transparent 8px 18px)'
	};

	const precio = $derived(
		new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(producto.precio)
	);
</script>

<article class="flex h-full flex-col border border-stone-200 bg-white">
	<div
		class="aspect-4/3 w-full"
		style:background-color={producto.color}
		style:background-image={patrones[producto.patron]}
		role="img"
		aria-label={`Muestra de ${producto.nombre}`}
	></div>

	<div class="flex flex-1 flex-col gap-3 p-5">
		<div>
			<h3 class="text-lg font-medium text-stone-900">{producto.nombre}</h3>
			<p class="text-sm text-stone-500">{producto.material}</p>
		</div>

		<p class="text-sm text-stone-600">{producto.descripcion}</p>

		<dl class="grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-stone-600">
			<dt>Caída y peso</dt>
			<dd class="text-right text-stone-900">{producto.caida}%</dd>
			<dt>Rigidez de flexión</dt>
			<dd class="text-right text-stone-900">{producto.rigidez}%</dd>
			<dt>Gramaje</dt>
			<dd class="text-right text-stone-900">{producto.pesoKg} kg</dd>
			<dt>Stock</dt>
			<dd class="text-right text-stone-900">{producto.stock} m</dd>
		</dl>

		<div class="mt-auto flex items-center justify-between pt-2">
			<p class="text-base font-semibold text-stone-900">{precio}</p>
			<a
				href="/products"
				class="border-b border-stone-900 pb-0.5 text-sm text-stone-900 transition hover:border-stone-400"
			>
				Ver tejido
			</a>
		</div>
	</div>
</article>
