/** @typedef {{ nombre: string, artista: string, url: string }} Cancion */

/** @type {{ actual: Cancion | null }} */
const EstadoCancion = $state({
    actual: null
})

/**
 * @param {Cancion | null} nuevaCancion
 */
export const actualizarCancion = (nuevaCancion) => {
    EstadoCancion.actual = nuevaCancion
}

export { EstadoCancion }
