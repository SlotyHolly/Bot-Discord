const { SlashCommandBuilder } = require('@discordjs/builders');
const { validarURLYoutube, extraerIdPlaylist, obtenerCancionesPlaylist, obtenerDatosCancion } = require('../utils/apiYoutube.js');
const initBot = require('../utils/initBot.js');
const { addSongToDatabase, clearQueue } = require('../utils/querySql.js');

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

    await interaction.deferReply();
    const playlistId = extraerIdPlaylist(url);
    if (playlistId) {
        try {
            const canciones = await obtenerCancionesPlaylist(playlistId);
            await clearQueue();
            // Insertar cada canción en la base de datos y en la cola
            for (const cancion of canciones) {
                await addSongToDatabase(cancion);
            }
        } catch (error) {
            await interaction.editReply('Hubo un error al obtener los datos de la playlist de YouTube.');
            return;
        }
    } else {
        try {
            const cancion = await obtenerDatosCancion(url);
            await clearQueue();
            await addSongToDatabase(cancion);
        } catch (error) {
            await interaction.editReply('Hubo un error al obtener los datos de la canción de YouTube.');
            return;
        }
    }

    // Iniciar la reproducción
    await interaction.editReply('Reproducción iniciada.');
    initBot(client, interaction);
};

module.exports = {
    data: data.toJSON(),
    execute,
};