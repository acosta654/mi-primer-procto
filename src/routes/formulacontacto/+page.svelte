<script lang="ts">
	import Icon from '@iconify/svelte';

	const tiposConsulta = [
		'Pedido de tejidos',
		'Solicitud de muestras',
		'Proyecto a medida',
		'Colaboración',
		'Otro'
	];

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
		<form class="p-8 md:p-10" onsubmit={(evento) => evento.preventDefault()}>
			<div class="grid gap-5 sm:grid-cols-2">
				<label class="flex flex-col gap-1.5 text-sm text-stone-700">
					<span class="font-medium">
						Nombre y apellidos
						<span class="text-stone-400" aria-hidden="true">*</span>
					</span>
					<input
						type="text"
						name="nombre"
						autocomplete="name"
						required
						placeholder="Ada Lovelace"
						class="rounded-none border border-stone-300 bg-white px-3 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 focus:border-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900"
					/>
				</label>

				<label class="flex flex-col gap-1.5 text-sm text-stone-700">
					<span class="font-medium">
						Email
						<span class="text-stone-400" aria-hidden="true">*</span>
					</span>
					<input
						type="email"
						name="email"
						autocomplete="email"
						required
						placeholder="ada@estudio.com"
						class="rounded-none border border-stone-300 bg-white px-3 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 focus:border-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900"
					/>
				</label>

				<label class="flex flex-col gap-1.5 text-sm text-stone-700">
					<span class="font-medium">
						Teléfono
						<span class="text-xs font-normal text-stone-400">(opcional)</span>
					</span>
					<input
						type="tel"
						name="telefono"
						autocomplete="tel"
						placeholder="+34 600 000 000"
						class="rounded-none border border-stone-300 bg-white px-3 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 focus:border-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900"
					/>
				</label>

				<label class="flex flex-col gap-1.5 text-sm text-stone-700">
					<span class="font-medium">Tipo de consulta</span>
					<select
						name="tipo"
						class="rounded-none border border-stone-300 bg-white px-3 py-2.5 text-sm text-stone-900 focus:border-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900"
					>
						{#each tiposConsulta as tipo}
							<option value={tipo}>{tipo}</option>
						{/each}
					</select>
				</label>
			</div>

			<label class="mt-5 flex flex-col gap-1.5 text-sm text-stone-700">
				<span class="font-medium">
					Cuéntanos tu proyecto
					<span class="text-stone-400" aria-hidden="true">*</span>
				</span>
				<textarea
					name="mensaje"
					rows="5"
					required
					placeholder="Tipo de prenda, metros estimados, colores y plazos…"
					class="resize-y rounded-none border border-stone-300 bg-white px-3 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 focus:border-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900"
				></textarea>
			</label>

			<label class="mt-5 flex items-start gap-3 text-sm text-stone-600">
				<input
					type="checkbox"
					name="privacidad"
					required
					class="mt-0.5 h-4 w-4 shrink-0 rounded-none border-stone-300 text-stone-900 focus:ring-stone-900"
				/>
				<span>
					He leído y acepto la
					<a
						href="/formulacontacto"
						class="border-b border-stone-400 text-stone-900 hover:border-stone-900"
					>
						política de privacidad
					</a>
					y el tratamiento de mis datos para responder a esta consulta.
				</span>
			</label>

			<div class="mt-8 flex flex-col gap-4 border-t border-stone-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
				<p class="text-xs text-stone-500">Los campos marcados con * son obligatorios.</p>
				<button
					type="submit"
					class="inline-flex items-center justify-center gap-2 bg-stone-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-stone-700 focus:outline-none focus:ring-2 focus:ring-stone-900 focus:ring-offset-2"
				>
					Enviar consulta
					<Icon icon="mdi:arrow-right" class="text-base" />
				</button>
			</div>
		</form>
	</div>
</section>
