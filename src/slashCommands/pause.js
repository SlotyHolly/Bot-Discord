const { AudioPlayerStatus } = require('@discordjs/voice');
const { SlashCommandBuilder } = require('@discordjs/builders');

const data = new SlashCommandBuilder()
    .setName("pause")
    .setDescription("Pausa la reproducción actual.");

// Define la función execute
async function execute(interaction, client) {
    const player = client.queue.get(interaction.guild.id);
    if (player.state.status !== AudioPlayerStatus.Playing) {
        return interaction.reply('El bot ya está pausado o no se está reproduciendo nada.');
    }

    player.pause();
    await interaction.reply('Reproducción pausada.');
}

// Exporta la función y las propiedades del comando
module.exports = {
    data: data.toJSON(),
    execute,
};


