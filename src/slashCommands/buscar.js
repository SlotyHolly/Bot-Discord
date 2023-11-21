const { SlashCommandBuilder } = require('@discordjs/builders');

const data = new SlashCommandBuilder()
    .setName("buscar")
    .setDescription("Buscar una canción en YouTube por su nombre y reproducirla en el canal de voz.")
    .addStringOption(option => option.setName('nombre').setDescription('Nombre de la canción').setRequired(true));

const execute = async (interaction, client) => {
    
}

module.exports = {
    data: data.toJSON(),
    execute,
};