const axios = require('axios');
const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } = require('./config.json'); // Asegúrate de tener estas claves en tu config.json

async function getSpotifyAccessToken() {
    try {
        const response = await axios.post('https://accounts.spotify.com/api/token', 'grant_type=client_credentials', {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + Buffer.from(SPOTIFY_CLIENT_ID + ':' + SPOTIFY_CLIENT_SECRET).toString('base64')
            }
        });
        return response.data.access_token;
    } catch (error) {
        console.error('Error obteniendo el token de acceso de Spotify:', error);
        return null;
    }
}

async function getTrackDetails(trackId) {
    const accessToken = await getSpotifyAccessToken();
    if (!accessToken) {
        console.log('No se pudo obtener el token de acceso de Spotify.');
        return;
    }

    try {
        const response = await axios.get(`https://api.spotify.com/v1/tracks/${trackId}`, {
            headers: { 'Authorization': `Bearer ${accessToken}` }
        });
        console.log(response.data);
    } catch (error) {
        console.error('Error al realizar la solicitud a la API de Spotify:', error);
    }
}

// Extrae el ID del track del enlace de Spotify
const trackUrl = 'https://open.spotify.com/intl-es/track/6NSMQFKgjpQb0KkjMDYIK0?si=623708a07b674daa';
const trackId = trackUrl.split('/track/')[1].split('?')[0];

// Obtener detalles del track
getTrackDetails(trackId);