const { SlashCommandBuilder } = require('@discordjs/builders');

const data = new SlashCommandBuilder()
    .setName('buscar')
    .setDescription('Bucar Cancion en youtube por el nombre.')
    .addStringOption(option => 
        option.setName('nombre')
            .setDescription('Nombre de la cancion.')
            .setRequired(true));

const execute = async (interaction, client) => {

    const cancionName = interaction.options.getString('nombre');

    // Limpiamos la cola de reproducción
    clearQueue();

    // Llamar a la función newQueue para agregar la canción a la cola de reproducción
    addQueue(cancionName);

    initBot(interaction, client);
}

module.exports = {
    data: data.toJSON(),
    execute,
};