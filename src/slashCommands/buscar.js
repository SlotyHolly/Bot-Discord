const { SlashCommandBuilder } = require('@discordjs/builders');

const data = new SlashCommandBuilder()
    .setName("buscar")
    .setDescription("Buscar una canción en YouTube por su nombre y reproducirla en el canal de voz.")
    .addStringOption(option => option.setName('nombre').setDescription('Nombre de la canción').setRequired(true));

const execute = async (interaction, client) => {

    const cancionName = interaction.options.getString('Cancion:');

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