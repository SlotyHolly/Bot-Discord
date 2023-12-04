// Discord.js docs: https://discord.js.org/#/docs/main/stable/class/CommandInteraction
const { SlashCommandBuilder } = require('@discordjs/builders');
const { shuffleQueue } = require('../utils/querySql.js');

const data = new SlashCommandBuilder()
    .setName('shuffle') // Cambiado a minúsculas
    .setDescription('Desordena la cola de reproducción actual.');

async function execute(interaction) {
    await interaction.deferReply();
    try {
        await shuffleQueue();
        await interaction.editReply('Cola de reproducción desordenada.');
    } catch (error) {
        console.error('Error al desordenar la cola de reproducción:', error);
        await interaction.editReply('Ha ocurrido un error al desordenar la cola de reproducción.');
    }
}

module.exports = {
    data: data.toJSON(),
    execute,
}
