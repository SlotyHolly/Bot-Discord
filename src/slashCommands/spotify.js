const { SlashCommandBuilder } = require('@discordjs/builders');
const initBot = require('../utils/initBot.js');
const addSongToDatabase = require('../utils/querySql.js');

// Importar el módulo 'axios' para hacer solicitudes HTTP
const axios = require('axios');
const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET} = require('../../config.json');

const data = new SlashCommandBuilder()
    .setName('spotify')
    .setDescription('Agregar todas las canciones de una lista de reproducción de Spotify a la cola de reproducción.')
    .addStringOption(option =>
        option.setName('playlist')
            .setDescription('Enlace de la lista de reproducción de Spotify')
            .setRequired(true));

// Función para obtener el nombre de cada canción en una playlist de Spotify
const execute = async (interaction, client) => {
    // Obtener el argumento del comando
    const playlistLink = interaction.options.getString('playlist');
    await interaction.deferReply();
    try {
        // Dividir el enlace de la playlist para obtener el ID de la playlist
        const [, tipo, id] = playlistLink.split('/').filter(parte => parte !== 'open.spotify.com' && parte !== '' && parte !== 'intl-es');
        // Obtener un nuevo token de acceso de Spotify
        const response = await axios.post('https://accounts.spotify.com/api/token', null, {
            params: { grant_type: 'client_credentials' },
            headers: {
                Authorization: `Basic ${Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64')}`
            }
        });
        const accessToken = response.data.access_token;
        let canciones = [];

        // Realizar la solicitud a la API de Spotify según el tipo
        if (tipo === 'playlist') {
            const playlistResponse = await axios.get(`https://api.spotify.com/v1/playlists/${id}`, {
                headers: { Authorization: `Bearer ${accessToken}` }
            });
            canciones = playlistResponse.data.tracks.items.map(item => {
                const track = item.track;
                const name = track.name;
                const artist = track.artists[0].name;
                const url = track.external_urls.spotify;
                const cover = track.album.images && track.album.images.length > 0 ? track.album.images[0].url : 'https://files.readme.io/f2e91bb-portalDocs-sonosApp-defaultArtAlone.png';
                const duration = track.duration_ms;
                return { name, artist, url, cover, duration };
            });
        } 
        else if (tipo === 'album') {
            const albumResponse = await axios.get(`https://api.spotify.com/v1/albums/${id}`, {
                headers: { Authorization: `Bearer ${accessToken}` }
            });
            canciones = albumResponse.data.tracks.items.map(item => {
                const name = item.name;
                const artist = item.artists[0].name;
                const url = item.external_urls.spotify;
                const cover = item.album.images && item.album.images.length > 0 ? item.album.images[0].url : 'https://files.readme.io/f2e91bb-portalDocs-sonosApp-defaultArtAlone.png';
                const duration = item.duration_ms;
                return { name, artist, url, cover, duration };
            });
        } 
        else if (tipo === 'track') {
            const trackResponse = await axios.get(`https://api.spotify.com/v1/tracks/${id}`, {
                headers: { Authorization: `Bearer ${accessToken}` }
            });
            const track = trackResponse.data;
            const name = track.name;
            const artist = track.artists[0].name;
            const url = track.external_urls.spotify;
            const cover = track.album.images && track.album.images.length > 0 ? track.album.images[0].url : 'https://files.readme.io/f2e91bb-portalDocs-sonosApp-defaultArtAlone.png';
            const duration = track.duration_ms;
            canciones.push({ name, artist, url, cover, duration });
        }

        // Insertar cada canción en la base de datos
        for (const song of canciones) {
            await addSongToDatabase(song);
        }
        
        await interaction.editReply('Reproducción iniciada.');
        initBot(interaction, client);

    } catch (error) {
        await interaction.editReply('Error al obtener los nombres de las canciones: ' + error);
        console.error('Error al obtener los nombres de las canciones:', error);
    }
}


module.exports = {
    data: data.toJSON(),
    execute,
};
