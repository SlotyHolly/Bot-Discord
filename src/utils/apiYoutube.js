const YTMusic = require("ytmusic-api").default;

function extraerIdPlaylist(url) {
    const regex = /[&?]list=([a-zA-Z0-9_-]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

function validarURLYoutube(url) {
    const regex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/(watch\?v=)?([a-zA-Z0-9\-_]{11})(\S*)$/;
    return regex.test(url);
}

async function buscarCancionPorNombre(nombreCancion, artista) {
    try {
        const ytmusic = await new YTMusic().initialize();
        const busqueda = nombreCancion + artista;
        const resultadoBusqueda = await ytmusic.search(busqueda);
        console.log(resultadoBusqueda);
        const canciones = resultadoBusqueda.content.filter(item => item.type === 'SONG' && item.type === 'VIDEO');
        console.log("Esto es despues de filtrar");
        console.log(canciones);

        if (canciones.length === 0) {
            throw new Error('Canción no encontrada');
        }

        const cancion = canciones.content[0];
        return {
            nombre: cancion.name,
            artista: cancion.artists.map(artista => artista.name).join(', '),
            url: `https://www.youtube.com/watch?v=${cancion.videoId}`,
            cover: cancion.thumbnails[0].url,
            duracion: cancion.duration // Esto devolverá la duración en milisegundos
        };
    } catch (error) {
        console.error('Error al buscar la canción:', error);
        throw error;
    }
}

async function obtenerCancionesPlaylist(playlistId, canciones = [], pageToken = '') {
    try {

        const ytmusic = await new YTMusic().initialize();

        // Obtiene detalles de la playlist
        const playlistDetails = await ytmusic.getPlaylist(playlistId, pageToken);

        playlistDetails.tracks.forEach(track => {
            const songDetails = {
                name: track.name,
                artist: track.artist,
                url: `https://www.youtube.com/watch?v=${track.videoId}`,
                cover: track.thumbnails[0].url, // Usando la primera imagen como portada
                duration: track.duration // Duración en milisegundos
            };
            canciones.push(songDetails);
        });

        // Si hay más páginas, continúa con la siguiente
        if (playlistDetails.nextPageToken) {
            return await obtenerCancionesPlaylist(playlistId, canciones, playlistDetails.nextPageToken);
        }

        return canciones;
    } catch (error) {
        console.error('Error al obtener datos de la playlist:', error);
        throw new Error('Error al obtener canciones de la playlist');
    }
}

async function obtenerDatosCancion(url) {
    try {
        // Extrae el ID del video de la URL de YouTube
        const videoId = url.split('watch?v=')[1];
        if (!videoId) {
            throw new Error('URL no válida');
        }

        // Inicia la ytmusic de YTMusic
        const ytmusic = await new YTMusic().initialize(); // Asegúrate de llamar a initialize antes de hacer cualquier solicitud

        // Realiza la solicitud para obtener los detalles del video
        const detallesCancion = await ytmusic.getSong(videoId);
        
        // Procesa y devuelve los datos necesarios
        return {
            nombre: detallesCancion.name,
            artista: detallesCancion.artists.map(artista => artista.name).join(', '),
            url: url,
            cover: detallesCancion.thumbnails[0].url,
            duracion: detallesCancion.duration // Esto devolverá la duración en milisegundos
        };
    } catch (error) {
        console.error('Error al obtener datos de la canción:', error);
        throw error;
    }
}

module.exports = {
    buscarCancionPorNombre,
    validarURLYoutube,
    extraerIdPlaylist,
    obtenerCancionesPlaylist,
    obtenerDatosCancion
};
