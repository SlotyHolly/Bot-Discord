const { SlashCommandBuilder } = require('@discordjs/builders');

const data = new SlashCommandBuilder()
    .setName("hola")
    .setDescription("Enviar un mensaje de saludo en el chat y el estado del bot .");

const execute = async (interaction, client) => {
    await interaction.reply(`¡Hola, ${interaction.user}! Mi ping es de ${client.ws.ping}ms`);
}

module.exports = {
    data: data.toJSON(),
    execute,
};