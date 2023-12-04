const { SlashCommandBuilder } = require('@discordjs/builders');
const { buscarCancionPorNombre } = require('../utils/apiYoutube.js');
const { initBot } = require('../utils/initBot.js');
const { addSongToDatabase, deleteAllSongs } = require('../utils/querySql.js');

const data = new SlashCommandBuilder()
    .setName('buscar')
    .setDescription('Bucar Cancion en youtube por el nombre.')
    .addStringOption(option => 
        option.setName('nombre')
            .setDescription('Nombre de la cancion.')
            .setRequired(true));

const execute = async (interaction, client) => {

    const cancionName = interaction.options.getString('nombre');
    await interaction.deferReply();
    try {
        const cancion = await buscarCancionPorNombre(cancionName);
        await deleteAllSongs();
        await addSongToDatabase(cancion);
    } catch (error) {
        await interaction.editReply('Hubo un error al obtener los datos de la canción de YouTube.');
        return;
    }

    initBot(interaction, client);
}

module.exports = {
    data: data.toJSON(),
    execute,
};