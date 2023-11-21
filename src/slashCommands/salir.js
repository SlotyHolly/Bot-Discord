const { SlashCommandBuilder } = require('@discordjs/builders');

const data = new SlashCommandBuilder()
    .setName("salir")
    .setDescription("Desconectar el bot del canal de voz");

const execute = async (interaction, client) => {
    const voiceChannel = interaction.member.voice.channel;
    
    if (!voiceChannel) {
        return await interaction.reply("¡Necesitas estar en un canal de voz para usar este comando!");
    }
    
    await interaction.reply("¡Adiós!");
    
    await voiceChannel.leave();
    }


module.exports = {
    data: data.toJSON(),
    execute,
};

