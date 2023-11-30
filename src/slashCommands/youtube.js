const { SlashCommandBuilder } = require('@discordjs/builders');
const { validarURLYoutube, extraerIdPlaylist, obtenerCancionesPlaylist } = require('../utils/apiYoutube.js');
const addQueue = require('../utils/addQueue.js');
const initBot = require('../utils/initBot.js');

const data = new SlashCommandBuilder()
    .setName('youtube')
    .setDescription('Agrega un video o playlist de YouTube a la cola de reproducción.')
    .addStringOption(option => 
        option.setName('url')
            .setDescription('La URL del video o playlist de YouTube')
            .setRequired(true));

const execute = async (interaction, client) => {
    const url = interaction.options.getString('url');
    
    if (!validarURLYoutube(url)) {
        await interaction.reply('Por favor, proporciona una URL válida de YouTube.');
        return;
    }
    const playlistId = extraerIdPlaylist(url);
    if (playlistId) {
        try {
            const canciones = await obtenerCancionesPlaylist(playlistId);

            // Aquí, 'canciones' es un array con todos los títulos de las canciones de la playlist
            canciones.forEach(cancion => addQueue(cancion));

        } catch (error) {
            await interaction.reply('Hubo un error al obtener los datos de la playlist de YouTube.');
            return;
        }
    } else {
        // Si no es una playlist, asumir que es una canción individual y agregarla al JSON
        addQueue(url); // Asumiendo que addQueue toma la URL de la canción
    }

    // Iniciar la reproducción
    await initBot(interaction, client);
    
};

module.exports = {
    data: data.toJSON(),
    execute,
};