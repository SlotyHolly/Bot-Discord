const { AudioPlayerStatus } = require('@discordjs/voice');
const { SlashCommandBuilder } = require('@discordjs/builders');

const data = new SlashCommandBuilder()
    .setName("play")
    .setDescription("Reanuda la reproducción si está pausada.");

// Define la función execute
async function execute(interaction, client) {
    const player = client.queue.get(interaction.guild.id);
    if (player.state.status !== AudioPlayerStatus.Paused) {
        return interaction.reply('El bot no está pausado o no hay nada que reproducir.');
    }

    player.unpause();
    await interaction.reply('Reproducción reanudada.');
}

// Exporta la función y las propiedades del comando
module.exports = {
    data: data.toJSON(),
    execute,
};

