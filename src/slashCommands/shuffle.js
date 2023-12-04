// Discord.js docs: https://discord.js.org/#/docs/main/stable/class/CommandInteraction
const { SlashCommandBuilder } = require('@discordjs/builders');

const data = new SlashCommandBuilder()
    .setName('shuffle') // Cambiado a minúsculas
    .setDescription('Desordena la cola de reproducción actual.');

async function execute(interaction) {
    return await interaction.reply('Comando shuffle');
}

module.exports = {
    data: data.toJSON(),
    execute,
}
