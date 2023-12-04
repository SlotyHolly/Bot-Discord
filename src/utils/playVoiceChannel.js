const { joinVoiceChannel, createAudioPlayer, createAudioResource, StreamType, AudioPlayerStatus } = require('@discordjs/voice');
const ytdl = require('ytdl-core');
const fs = require('fs');
const path = require('path');

async function playVoiceChannel(client, interaction, url) {
    const voiceChannel = interaction.member.voice.channel;
    const guildId = interaction.guild.id;

    let player = client.queue.get(guildId);
    if (!player) {
        player = createAudioPlayer();
        client.queue.set(guildId, player);
    } else {
        player.removeAllListeners('error');
    }

    const connection = joinVoiceChannel({
        channelId: voiceChannel.id,
        guildId: guildId,
        adapterCreator: voiceChannel.guild.voiceAdapterCreator,
    });

    connection.subscribe(player);

    const songPath = path.join(__dirname, './song.mp3');

    player.on('error', error => {
        console.error('Error en el reproductor de audio:', error);
        interaction.channel.send(`No se pudo reproducir la canción: ${url}`);
        // Eliminar el archivo de la canción si existe
        if (fs.existsSync(songPath)) {
            fs.unlinkSync(songPath);
        }
    });

    try {
        const stream = ytdl(url, { filter: 'audioonly', quality: 'highestaudio' });
        stream.pipe(fs.createWriteStream(songPath));

        stream.on('finish', () => {
            const resource = createAudioResource(songPath);
            player.play(resource);
        });

        stream.on('error', error => {
            console.error('Error al escribir el stream de audio en un archivo:', error);
            interaction.channel.send(`No se pudo reproducir la canción: ${url}`);
            if (fs.existsSync(songPath)) {
                fs.unlinkSync(songPath);
            }
        });

        await new Promise((resolve, reject) => {
            player.on(AudioPlayerStatus.Idle, () => {
                // Eliminar el archivo de la canción
                if (fs.existsSync(songPath)) {
                    fs.unlink(songPath, (err) => {
                        if (err) {
                            console.error('Error al eliminar el archivo de la canción:', err);
                            reject(err);
                        } else {
                            resolve();
                        }
                    });
                } else {
                    resolve();
                }
            });
            player.on('error', error => reject(error));
        });
    } catch (error) {
        console.error('Error al reproducir la canción:', error);
        interaction.channel.send(`No se pudo reproducir la canción: ${url}`);
        if (fs.existsSync(songPath)) {
            fs.unlinkSync(songPath);
        }
    }
}

module.exports = playVoiceChannel;