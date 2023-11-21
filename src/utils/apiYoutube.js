const { google } = require('googleapis');
const { YOUTUBE_API_KEY } = require('../../config.json');

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

module.exports = buscarCancion;