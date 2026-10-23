<script lang="ts">
	import './layout.css';
	import favicon from '#lib/assets/favicon.svg';
	import Icon from '@iconify/svelte';
	import { page } from '$app/state';

	let { children } = $props();

	let menuAbierto = $state(false);

	const enlaces = [
		{ href: '/', etiqueta: 'Inicio', icono: 'mdi:home-outline' },
		{ href: '/products', etiqueta: 'Catálogo', icono: 'mdi:hanger' },
		{ href: '/formulacontacto', etiqueta: 'Contacto', icono: 'mdi:email-outline' }
	];

	const esActivo = (href: string) =>
		href === '/' ? page.url.pathname === '/' : page.url.pathname.startsWith(href);
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<header class="sticky top-0 z-50 border-b border-stone-200 bg-white/90 backdrop-blur">
	<div class="bg-stone-900 text-stone-100">
		<p
			class="mx-auto flex w-full max-w-6xl items-center gap-2 px-6 py-2 text-[0.65rem] uppercase tracking-[0.3em]"
		>
			<Icon icon="mdi:palette" class="text-sm" />
			Colección otoño · Tartán geométrico
		</p>
	</div>

	<div class="mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-6 py-4">
		<a href="/" class="flex flex-col leading-none" aria-label="Trama Studio, ir al inicio">
			<span class="text-lg font-semibold uppercase tracking-[0.25em] text-stone-900">trama studio</span>
			<span class="mt-1 text-[0.65rem] uppercase tracking-[0.3em] text-stone-500">tejidos de autor</span>
		</a>

		<nav class="hidden items-center gap-1 md:flex" aria-label="Navegación principal">
			{#each enlaces as enlace (enlace.href)}
				<a
					href={enlace.href}
					aria-current={esActivo(enlace.href) ? 'page' : undefined}
					class="flex items-center gap-2 border-b-2 px-3 py-2 text-sm transition {esActivo(
						enlace.href
					)
						? 'border-stone-900 text-stone-900'
						: 'border-transparent text-stone-500 hover:border-stone-300 hover:text-stone-900'}"
				>
					<Icon icon={enlace.icono} class="text-base" />
					{enlace.etiqueta}
				</a>
			{/each}
		</nav>

		<button
			type="button"
			class="flex items-center justify-center border border-stone-300 p-2 text-stone-900 transition hover:bg-stone-100 md:hidden"
			onclick={() => (menuAbierto = !menuAbierto)}
			aria-expanded={menuAbierto}
			aria-controls="menu-movil"
			aria-label={menuAbierto ? 'Cerrar menú' : 'Abrir menú'}
		>
			<Icon icon={menuAbierto ? 'mdi:close' : 'mdi:menu'} class="text-xl" />
		</button>
	</div>

	{#if menuAbierto}
		<nav
			id="menu-movil"
			class="border-t border-stone-200 bg-white md:hidden"
			aria-label="Navegación principal móvil"
		>
			{#each enlaces as enlace (enlace.href)}
				<a
					href={enlace.href}
					aria-current={esActivo(enlace.href) ? 'page' : undefined}
					onclick={() => (menuAbierto = false)}
					class="flex items-center gap-3 border-l-2 px-6 py-3 text-sm transition {esActivo(enlace.href)
						? 'border-stone-900 bg-stone-50 text-stone-900'
						: 'border-transparent text-stone-600 hover:border-stone-300 hover:bg-stone-50'}"
				>
					<Icon icon={enlace.icono} class="text-base" />
					{enlace.etiqueta}
				</a>
			{/each}
		</nav>
	{/if}
</header>

{@render children()}
<div>
    <!-- Grupo Amarillo -->
    <div>
        <img src="" alt="" />
        <p>Caída y Peso</p>
        <p>Lana Bouclé</p>
    </div>
    <!-- Grupo Verde -->
    <div> 
        <div>
            <p>Lana Bouclé</p>
            <p>340</p>
        </div>
        <div>
            <p>Lino Pesado</p>
            <p>420</p>
        </div>
        <div>
            <p>Seda Fluida</p>
            <p>110</p>
        </div>
        <div>
            <p>Sarga Algodón</p>
            <p>280</p>
        </div>
    </div>
    <!-- Grupo Azul 1 -->
    <div>
        <div>
            <p>Rigidez de flexión</p>
            <p>72%</p>
        </div>
        <!-- Linea -->
        <div></div>
    </div>
    <!-- Grupo azul 2 -->
    <div>
        <div>
            <p>Rigidez de flexión</p>
            <p>72%</p>
        </div>
        <!-- Linea -->
        <div></div>
    </div>
</div>