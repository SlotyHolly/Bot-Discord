const { joinVoiceChannel, createAudioPlayer, createAudioResource, StreamType, AudioPlayerStatus } = require('@discordjs/voice');
const ytdl = require('ytdl-core');

async function playVoiceChannel(client, interaction, url) {
    const voiceChannel = interaction.member.voice.channel;
    const guildId = interaction.guild.id;
    
    let player = client.queue.get(guildId);
    if (!player) {
        player = createAudioPlayer();
        client.queue.set(guildId, player);
    }

    const connection = joinVoiceChannel({
        channelId: voiceChannel.id,
        guildId: guildId,
        adapterCreator: voiceChannel.guild.voiceAdapterCreator,
    });

    connection.subscribe(player);

    player.on('error', error => {
        console.error('Error en el reproductor de audio:', error);
        interaction.followUp(`No se pudo reproducir la canción: ${url}`);
        // Aquí puedes agregar lógica para saltar a la siguiente canción en la cola
    });

    try {
        const stream = ytdl(url, { filter: 'audioonly'});
        const resource = createAudioResource(stream, { inputType: StreamType.Arbitrary });
        player.play(resource);

        await new Promise((resolve, reject) => {
            player.on(AudioPlayerStatus.Idle, () => resolve());
            player.on('error', error => reject(error));
        });
    } catch (error) {
        console.error('Error al reproducir la canción:', error);
        interaction.followUp(`No se pudo reproducir la canción: ${url}`);
        // Aquí puedes agregar lógica para saltar a la siguiente canción en la cola
    }
}

module.exports = playVoiceChannel;