const { MessageEmbed } = require('discord.js');

class Reproductor {
    constructor(client, channelId) {
        this.client = client; // Cliente de Discord
        this.channelId = channelId; // ID del canal donde se mostrará el reproductor
        this.cancionActual = null; // La canción actual que se está reproduciendo
        this.embedMensaje = null; // El mensaje embed que muestra el reproductor
    }
    // Método para establecer la canción actual y actualizar el mensaje embed
    async setCancionActual(cancion) {
        this.cancionActual = cancion;
        await this.actualizarMensaje();
    }

    // Método para actualizar el mensaje embed en el canal
    async actualizarMensaje() {
        const { getTopTenSongs } = require('./querySql.js');
        const topTenSongs = await getTopTenSongs();
        const embed = this.crearEmbedCancion(topTenSongs);

        if (this.embedMensaje) {
            await this.embedMensaje.edit({ embeds: [embed] }); // Actualiza el mensaje si ya existe
        } else {
            const canal = await this.client.channels.fetch(this.channelId);
            this.embedMensaje = await canal.send({ embeds: [embed] }); // Crea un nuevo mensaje si aún no existe
        }
    }

    // Método para crear un embed con la información de la canción actual
    crearEmbedCancion(topTenSongs) {
        const embed = new MessageEmbed()
            .setTitle('Reproduciendo ahora:')
            .setURL(this.cancionActual.song_url)
            .setDescription(`[${this.cancionActual.song_name}](${this.cancionActual.song_url}) - ${this.cancionActual.artist_name}`)
            .setImage(this.cancionActual.cover_url)
            .setFooter(`Duración: ${this.formatearDuracion(this.cancionActual.duration)}`)
            .addField('Lista de reproduccion:', this.formatTopTenSongs(topTenSongs));
        // Crear una fila de botones
        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('play')
                    .setLabel('Play')
                    .setStyle('PRIMARY'),
                new MessageButton()
                    .setCustomId('pause')
                    .setLabel('Pause')
                    .setStyle('PRIMARY'),
                new MessageButton()
                    .setCustomId('next')
                    .setLabel('Next')
                    .setStyle('PRIMARY'),
                new MessageButton()
                    .setCustomId('shuffle')
                    .setLabel('Shuffle')
                    .setStyle('PRIMARY')
            );
        return { embeds: [embed], components: [row] };
    }
    
    // Método para formatear la duración de la canción en minutos y segundos
    formatearDuracion(duracionMs) {
        const minutos = Math.floor(duracionMs / 60000);
        const segundos = ((duracionMs % 60000) / 1000).toFixed(0);
        return minutos + ":" + (segundos < 10 ? '0' : '') + segundos;
    }

    // Método para formatear las próximas 10 canciones en un string
    formatTopTenSongs(topTenSongs) {
        return topTenSongs.map((song, index) => 
            `${index + 1}. [${song.song_name}](${song.song_url}) - ${song.artist_name}`).join('\n');
    }
}

module.exports = Reproductor;