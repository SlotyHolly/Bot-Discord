const { SlashCommandBuilder } = require('@discordjs/builders');
const { getVoiceConnection } = require('@discordjs/voice');
const clearQueue = require('../utils/clearQueue.js');

const data = new SlashCommandBuilder()
    .setName("salir")
    .setDescription("Desconectar el bot del canal de voz");

const execute = async (interaction, client) => {
    const voiceChannel = interaction.member.voice.channel;
    
    if (!voiceChannel) {
        return await interaction.reply("¡Necesitas estar en un canal de voz para usar este comando!");
    }
    
    const connection = getVoiceConnection(interaction.guild.id);

    if (connection) {
        connection.destroy(); // Desconectar el bot del canal de voz
        await interaction.reply("¡Adiós!");
        clearQueue();
    } else {
        await interaction.reply("No estoy en un canal de voz.");
    }
}

module.exports = {
    data: data.toJSON(),
    execute,
};