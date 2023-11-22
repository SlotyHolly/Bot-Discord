const { AudioPlayerStatus } = require('@discordjs/voice');
const { SlashCommandBuilder } = require('@discordjs/builders');
const fistJson = require('../utils/firstJSON.js');
const data = new SlashCommandBuilder()
    .setName("next")
    .setDescription("Reproduce la siguiente canción.");

// Define la función execute
async function execute(interaction, client) {
    const player = client.queue.get(interaction.guild.id)
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
