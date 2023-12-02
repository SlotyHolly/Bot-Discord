const { google } = require('googleapis');
const { YOUTUBE_API_KEY } = require('../../config.json');
const axios = require('axios');

const youtube = google.youtube({
    version: 'v3',
    auth: YOUTUBE_API_KEY
});

async function buscarCancion(nombreCancion) {
    const response = await youtube.search.list({
        part: 'snippet',
        q: nombreCancion,
        maxResults: 1,
        type: 'video'
    });

    const videos = response.data.items;
    if (videos.length > 0) {
        const videoId = videos[0].id.videoId;
        return `https://www.youtube.com/watch?v=${videoId}`;
    } else {
        throw new Error('Canción no encontrada');
    }
}

function validarURLYoutube(url) {
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/(watch\?v=)?([a-zA-Z0-9\-_]{11})(\S*)$/;
    return youtubeRegex.test(url);
}

function extraerIdPlaylist(url) {
    const regex = /list=([a-zA-Z0-9_-]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

async function obtenerCancionesPlaylist(playlistId, canciones = [], pageToken = '') {
    try {
        const response = await axios.get(`https://www.googleapis.com/youtube/v3/playlistItems`, {
            params: {
                part: 'snippet',
                playlistId: playlistId,
                maxResults: 50,
                key: YOUTUBE_API_KEY,
                pageToken: pageToken
            }
        });

        const items = response.data.items;
        const nextPageToken = response.data.nextPageToken;

        items.forEach(item => {
            canciones.push(item.snippet.title); // Agregar título de la canción al array
        });

        // Si hay un nextPageToken, hacer otra solicitud para la siguiente página
        if (nextPageToken) {
            return obtenerCancionesPlaylist(playlistId, canciones, nextPageToken);
        }

        return canciones;
    } catch (error) {
        console.error('Error al obtener datos de la playlist:', error);
        throw new Error('Error al obtener canciones de la playlist');
    }
}

module.exports = {
    buscarCancion,
    validarURLYoutube,
    extraerIdPlaylist,
    obtenerCancionesPlaylist,
};
