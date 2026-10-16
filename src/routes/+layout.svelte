<script lang="ts">
	import './layout.css';
	import favicon from '#lib/assets/favicon.svg';
	import Icon from '@iconify/svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>


<header>
	<div>
		<p>trama studio</p>
	</div>
	<p>coleccion otoño tartan geomertico <Icon icon="mdi:palette" /></p>
	<div>
	

	
		

	</div>




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