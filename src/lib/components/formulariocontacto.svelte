<script lang="ts">
	import { tick } from 'svelte';
	import { enhance } from '$app/forms';
	import Icon from '@iconify/svelte';

	type Valores = {
		nombre: string;
		email: string;
		telefono: string;
		tipo: string;
		mensaje: string;
	};

	type Resultado = {
		success?: boolean;
		mensaje?: string;
		errores?: Record<string, string>;
		valores?: Valores;
	};

	let { form }: { form: Resultado | null } = $props();

	const tiposConsulta = [
		'Pedido de tejidos',
		'Solicitud de muestras',
		'Proyecto a medida',
		'Colaboración',
		'Otro'
	];

	let enviando = $state(false);
	let formulario = $state<HTMLFormElement>();

	const claseCampo = (error?: string) =>
		`rounded-none border bg-white px-3 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-1 ${
			error
				? 'border-red-400 focus:border-red-600 focus:ring-red-600'
				: 'border-stone-300 focus:border-stone-900 focus:ring-stone-900'
		}`;
</script>

<form
	bind:this={formulario}
	method="POST"
	class="p-8 md:p-10"
	use:enhance={() => {
		enviando = true;

		return async ({ result, update }) => {
			await update();
			enviando = false;

			if (result.type === 'success' && result.data?.success) {
				await tick();
				formulario?.reset();
			}
		};
	}}
>
	{#if form?.mensaje}
		<div
			class="mb-6 flex items-start gap-3 border p-4 text-sm {form.success
				? 'border-green-200 bg-green-50 text-green-800'
				: 'border-red-200 bg-red-50 text-red-800'}"
			role={form.success ? 'status' : 'alert'}
		>
			<Icon
				icon={form.success ? 'mdi:check-circle-outline' : 'mdi:alert-circle-outline'}
				class="mt-0.5 shrink-0 text-lg"
			/>
			<p>{form.mensaje}</p>
		</div>
	{/if}

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
				value={form?.valores?.nombre ?? ''}
				aria-invalid={form?.errores?.nombre ? 'true' : undefined}
				aria-describedby={form?.errores?.nombre ? 'error-nombre' : undefined}
				placeholder="Ada Lovelace"
				class={claseCampo(form?.errores?.nombre)}
			/>
			{#if form?.errores?.nombre}
				<p id="error-nombre" class="text-xs text-red-600">{form.errores.nombre}</p>
			{/if}
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
				value={form?.valores?.email ?? ''}
				aria-invalid={form?.errores?.email ? 'true' : undefined}
				aria-describedby={form?.errores?.email ? 'error-email' : undefined}
				placeholder="ada@estudio.com"
				class={claseCampo(form?.errores?.email)}
			/>
			{#if form?.errores?.email}
				<p id="error-email" class="text-xs text-red-600">{form.errores.email}</p>
			{/if}
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
				value={form?.valores?.telefono ?? ''}
				aria-invalid={form?.errores?.telefono ? 'true' : undefined}
				aria-describedby={form?.errores?.telefono ? 'error-telefono' : undefined}
				placeholder="+34 600 000 000"
				class={claseCampo(form?.errores?.telefono)}
			/>
			{#if form?.errores?.telefono}
				<p id="error-telefono" class="text-xs text-red-600">{form.errores.telefono}</p>
			{/if}
		</label>

		<label class="flex flex-col gap-1.5 text-sm text-stone-700">
			<span class="font-medium">Tipo de consulta</span>
			<select
				name="tipo"
				value={form?.valores?.tipo ?? tiposConsulta[0]}
				aria-invalid={form?.errores?.tipo ? 'true' : undefined}
				aria-describedby={form?.errores?.tipo ? 'error-tipo' : undefined}
				class={claseCampo(form?.errores?.tipo)}
			>
				{#each tiposConsulta as tipo}
					<option value={tipo}>{tipo}</option>
				{/each}
			</select>
			{#if form?.errores?.tipo}
				<p id="error-tipo" class="text-xs text-red-600">{form.errores.tipo}</p>
			{/if}
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
			value={form?.valores?.mensaje ?? ''}
			aria-invalid={form?.errores?.mensaje ? 'true' : undefined}
			aria-describedby={form?.errores?.mensaje ? 'error-mensaje' : undefined}
			placeholder="Tipo de prenda, metros estimados, colores y plazos…"
			class="{claseCampo(form?.errores?.mensaje)} resize-y"
		></textarea>
		{#if form?.errores?.mensaje}
			<p id="error-mensaje" class="text-xs text-red-600">{form.errores.mensaje}</p>
		{/if}
	</label>

	<label class="mt-5 flex items-start gap-3 text-sm text-stone-600">
		<input
			type="checkbox"
			name="privacidad"
			required
			aria-invalid={form?.errores?.privacidad ? 'true' : undefined}
			aria-describedby={form?.errores?.privacidad ? 'error-privacidad' : undefined}
			class="mt-0.5 h-4 w-4 shrink-0 rounded-none border-stone-300 text-stone-900 focus:ring-stone-900"
		/>
		<span>
			He leído y acepto la
			<a href="/formulacontacto" class="border-b border-stone-400 text-stone-900 hover:border-stone-900">
				política de privacidad
			</a>
			y el tratamiento de mis datos para responder a esta consulta.
		</span>
	</label>
	{#if form?.errores?.privacidad}
		<p id="error-privacidad" class="mt-2 text-xs text-red-600">{form.errores.privacidad}</p>
	{/if}

	<!-- Honeypot antispam: oculto para personas, visible para bots. -->
	<div class="hidden" aria-hidden="true">
		<label>
			No rellenar este campo
			<input type="text" name="sitio_web" tabindex="-1" autocomplete="off" />
		</label>
	</div>

	<div
		class="mt-8 flex flex-col gap-4 border-t border-stone-200 pt-6 sm:flex-row sm:items-center sm:justify-between"
	>
		<p class="text-xs text-stone-500">Los campos marcados con * son obligatorios.</p>
		<button
			type="submit"
			disabled={enviando}
			class="inline-flex items-center justify-center gap-2 bg-stone-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-stone-700 focus:outline-none focus:ring-2 focus:ring-stone-900 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-stone-400"
		>
			{#if enviando}
				<Icon icon="mdi:loading" class="animate-spin text-base" />
				Enviando…
			{:else}
				Enviar consulta
				<Icon icon="mdi:arrow-right" class="text-base" />
			{/if}
		</button>
	</div>
</form>
