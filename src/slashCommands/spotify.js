const { SlashCommandBuilder } = require('@discordjs/builders');
const addQueue = require('../utils/addQueue.js');
const initBot = require('../utils/initBot.js');
const clearQueue = require('../utils/clearQueue.js');

// Importar el módulo 'axios' para hacer solicitudes HTTP
const axios = require('axios');
const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } = require('../../config.json');

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
    const playlistLink = interaction.options.getString('Playlist:');

    try {
        // Dividir el enlace de la playlist para obtener el ID de la playlist
        const playlistId = playlistLink.split('playlist/')[1].split('?')[0];
        
        // Obtener un nuevo token de acceso de Spotify
        const response = await axios.post('https://accounts.spotify.com/api/token', null, {
            params: {
                grant_type: 'client_credentials'
            },
            headers: {
                Authorization: `Basic ${Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64')}`
            }
        });

        const accessToken = response.data.access_token;

        // Hacer una solicitud GET a la API de Spotify para obtener la información de la playlist
        const playlistResponse = await axios.get(`https://api.spotify.com/v1/playlists/${playlistId}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        // Obtener el nombre y el artista de cada canción en la playlist
        const canciones = playlistResponse.data.tracks.items.map(item => `${item.track.name} - ${item.track.artists[0].name}`);

        // Limpiamos la cola de reproducción
        clearQueue();
        
        // Llamar a la función newQueue para cada canción
        canciones.forEach(cancion => {
            addQueue(cancion);
        });

        initBot(interaction, client);

    } catch (error) {
        await interaction.reply('Error al obtener los nombres de las canciones: ' + error);
    }
}


module.exports = {
    data: data.toJSON(),
    execute,
};
