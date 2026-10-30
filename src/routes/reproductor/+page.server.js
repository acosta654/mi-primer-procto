 export const load = () => {
    const respuestaCanicones = axios.get('https//leonardopi.vercel.app/apis/tracks')
   return {
    tracks: respuestaCanicones.data.tracks
   } 
}
