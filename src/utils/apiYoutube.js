const YTMusic = require("ytmusic-api").default
const api = new YTMusic();

function extraerIdPlaylist(url) {
    const regex = /[&?]list=([a-zA-Z0-9_-]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

function validarURLYoutube(url) {
    const regex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/(watch\?v=)?([a-zA-Z0-9\-_]{11})(\S*)$/;
    return regex.test(url);
}

async function buscarCancionPorNombre(nombreCancion) {
    try {
        await api.initalize();

        const resultadoBusqueda = await api.search(nombreCancion, 'songs', { limit: 1 });
        
        if (resultadoBusqueda.content.length === 0) {
            throw new Error('Canción no encontrada');
        }

        const cancion = resultadoBusqueda.content[0];
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
        // Inicializa la API de YTMusic si es necesario
        if (!api.initialized) {
            await api.initalize();
        }

        // Obtiene detalles de la playlist
        const playlistDetails = await api.getPlaylist(playlistId, pageToken);

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

        // Inicia la API de YTMusic
        await api.initalize(); // Asegúrate de llamar a initialize antes de hacer cualquier solicitud

        // Realiza la solicitud para obtener los detalles del video
        const detallesCancion = await api.getSong(videoId);
        
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
