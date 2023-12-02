const firstJSON = require('./firstJSON.js');
const playVoiceChannel = require('./playVoiceChannel.js');
const { buscarCancion, validarURLYoutube } = require('./apiYoutube.js');

async function initBot(interaction, client) {
    // Obtiene el canal de voz del usuario que envió la interacción
    const voiceChannel = interaction.member.voice.channel;

    if (!voiceChannel) {
        await interaction.reply('Debes estar en un canal de voz para iniciar el bot.');
        return;
    }

    await interaction.deferReply();

    while (true) {
        const cancion = firstJSON();
        if (!cancion) {
            console.log('No hay más canciones en la cola.');
            await interaction.followUp('Se ha alcanzado el final de la cola de canciones.');
            break;
        }

        try {
            // Verifica si la canción es una URL de YouTube
            if (validarURLYoutube(cancion)) {
                await interaction.followUp(`Reproduciendo: ${cancion}`);
                await playVoiceChannel(client, interaction, cancion);
                continue;
            }
            // Si no es una URL de YouTube, busca la canción en YouTube
            else {
                const songUrl = await buscarCancion(cancion);
                await interaction.followUp(`Reproduciendo: ${cancion}`);
                await playVoiceChannel(client, interaction, songUrl);

                // Verifica si el bot sigue en el canal de voz
                if (!voiceChannel.members.has(interaction.client.user.id)) {
                    console.log('El bot ha sido desconectado del canal de voz.');
                    await interaction.followUp('El bot ha sido desconectado del canal de voz.');
                    break;
            }
        }

        } catch (error) {
            console.error('Error:', error);
            await interaction.followUp('Ha ocurrido un error al reproducir la canción.');
            break;
        }
    }
}

module.exports = initBot;
