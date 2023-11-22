const { AudioPlayerStatus } = require('@discordjs/voice');
const { SlashCommandBuilder } = require('@discordjs/builders');
const firsJSON = require('../first.json');

const data = new SlashCommandBuilder()
    .setName("play")
    .setDescription("Reanuda la reproducción si está pausada.");

// Define la función execute
async function execute(interaction, client) {
    const player = client.queue.get(interaction.guild.id);
    try {
        if (!player) {
            return interaction.reply('No hay nada que reproducir.');
        }
        if (!firsJSON) {
            return interaction.reply('No hay nada que reproducir.');
        }

        if (player.state.status !== AudioPlayerStatus.Paused) {
            return interaction.reply('El bot no está pausado.');
        }

        player.unpause();
        await interaction.reply('Reproducción reanudada.');
    }
    catch (error) {
        console.error(error);
        await interaction.reply('Ha ocurrido un error al intentar reanudar la reproducción.', error);
        console.error(error);
    }
}

// Exporta la función y las propiedades del comando
module.exports = {
    data: data.toJSON(),
    execute,
};

