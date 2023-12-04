const playVoiceChannel = require('./playVoiceChannel.js');
const { getAndDeleteFirstSong } = require('./querySql.js');
const { validarURLYoutube, buscarCancionPorNombre } = require('./apiYoutube.js');

async function initBot(client, interaction) {
    const voiceChannel = interaction.member.voice.channel;
    if (!voiceChannel) {
        await interaction.channel.send('Debes estar en un canal de voz para iniciar el bot.');
        return;
    }

    while (true) {
        try {
            const cancion = await getAndDeleteFirstSong();
            if (!cancion) { 
                console.log('No hay más canciones en la cola.');
                await interaction.channel.send('Se ha alcanzado el final de la cola de canciones.');
                break;
            }

            const { song_name, artist_name, song_url } = cancion;
            
            if (validarURLYoutube(song_url)) {
                await playVoiceChannel(client, interaction, song_url);
            } else {
                const detallesCancion = await buscarCancionPorNombre(song_name, artist_name);
                // Asegúrate de que detallesCancion tiene la propiedad 'url'
                await playVoiceChannel(client, interaction, detallesCancion.url);
            }
        } catch (error) {
            console.error('Error:', error);
            await interaction.channel.send('Ha ocurrido un error al reproducir la canción.');
            break;
        }
    }
}

module.exports = initBot;