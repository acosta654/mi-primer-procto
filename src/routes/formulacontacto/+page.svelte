<script lang="ts">
	import Icon from '@iconify/svelte';
	import FormularioContacto from '#lib/components/formulariocontacto.svelte';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();

	const datosContacto = [
		{ icono: 'mdi:email-outline', etiqueta: 'Email', valor: 'hola@tramastudio.com' },
		{ icono: 'mdi:phone-outline', etiqueta: 'Teléfono', valor: '+34 910 123 456' },
		{ icono: 'mdi:map-marker-outline', etiqueta: 'Estudio', valor: 'Calle de la Trama 12, Madrid' },
		{ icono: 'mdi:clock-outline', etiqueta: 'Horario', valor: 'Lunes a viernes · 9:00 – 18:00' }
	];
</script>

<svelte:head>
	<title>Contacto · Trama Studio</title>
	<meta
		name="description"
		content="Contacta con Trama Studio para pedidos de tejidos, muestras o proyectos a medida."
	/>
</svelte:head>

<section class="mx-auto w-full max-w-6xl px-6 py-12 md:py-16">
	<header class="mb-10 flex flex-col gap-2">
		<p class="text-sm uppercase tracking-[0.3em] text-stone-500">Hablemos</p>
		<h1 class="text-3xl font-semibold text-stone-900 md:text-4xl">Contacto</h1>
		<p class="max-w-xl text-stone-600">
			Cuéntanos qué necesitas y te responderemos con disponibilidad, muestras y plazos.
		</p>
	</header>

	<div class="grid overflow-hidden border border-stone-200 bg-white lg:grid-cols-[0.85fr_1.15fr]">
		<!-- Panel informativo -->
		<aside class="relative flex flex-col justify-between gap-10 bg-stone-900 p-8 text-stone-100 md:p-10">
			<div
				class="pointer-events-none absolute inset-0 opacity-[0.07]"
				style:background-image="repeating-linear-gradient(45deg, #fff 0 1px, transparent 1px 18px), repeating-linear-gradient(-45deg, #fff 0 1px, transparent 1px 18px)"
				aria-hidden="true"
			></div>

			<div class="relative">
				<p class="text-xs uppercase tracking-[0.3em] text-stone-400">Trama Studio</p>
				<h2 class="mt-3 max-w-xs text-2xl font-medium leading-snug">
					Hablemos de tu próximo tejido
				</h2>
				<p class="mt-4 max-w-sm text-sm leading-relaxed text-stone-300">
					Trabajamos con marcas de moda e interiorismo. Seleccionamos la trama, el peso y la caída
					adecuados para cada colección.
				</p>

				<ul class="mt-10 space-y-5 text-sm">
					{#each datosContacto as dato (dato.etiqueta)}
						<li class="flex items-start gap-3">
							<span
								class="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center border border-stone-700 text-stone-300"
							>
								<Icon icon={dato.icono} class="text-base" />
							</span>
							<div>
								<p class="text-[0.65rem] uppercase tracking-[0.25em] text-stone-400">
									{dato.etiqueta}
								</p>
								<p class="mt-0.5 text-stone-100">{dato.valor}</p>
							</div>
						</li>
					{/each}
				</ul>
			</div>

			<p class="relative border-t border-stone-700 pt-5 text-xs text-stone-400">
				Respondemos en un plazo de 24 – 48 h laborables.
			</p>
		</aside>

		<!-- Formulario -->
		<FormularioContacto {form} />
	</div>
</section>
