const { AudioPlayerStatus } = require('@discordjs/voice');
const { SlashCommandBuilder } = require('@discordjs/builders');
const fistJson = require('../utils/firstJson');
const data = new SlashCommandBuilder()
    .setName("next")
    .setDescription("Reproduce la siguiente canción.");

// Define la función execute
async function execute(interaction, client) {
    const player = client.queue.get(interaction.guild.id)
    if (!fistJson()) {
        await interaction.reply("No hay canciones en la lista de reproducción.");
        return;
    }
    if (!player) {
        await interaction.reply("No estoy en un canal de voz.");
        return;
    }
    // Quita la reproducción actual y reproduce la siguiente canción
    player.stop();
    // Responde al usuario
    await interaction.reply("La siguiente canción se está reproduciendo.");

}

// Exporta la función y las propiedades del comando
module.exports = {
    data: data.toJSON(),
    execute,
};
