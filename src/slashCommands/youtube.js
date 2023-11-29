const { SlashCommandBuilder } = require('@discordjs/builders');
const { validarURLYoutube, extraerIdPlaylist } = require('../utils/apiYoutube.js');
const addQueue = require('../utils/addQueue.js');
const initBot = require('../utils/initBot.js');

const data = new SlashCommandBuilder()
    .setName('youtube')
    .setDescription('Agrega un video o playlist de YouTube a la cola de reproducción.')
    .addStringOption(option => 
        option.setName('Url:')
            .setDescription('La URL del video o playlist de YouTube')
            .setRequired(true));

const execute = async (interaction, client) => {
    const url = interaction.options.getString('Url:');
    
    if (!validarURLYoutube(url)) {
        await interaction.reply('Por favor, proporciona una URL válida de YouTube.');
        return;
    }
    const playlistId = extraerIdPlaylist(url);
    if (playlistId) {
        try {
            const response = await axios.get(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=50&key=${YOUTUBE_API_KEY}`);
            const items = response.data.items;

            if (items.length === 0) {
                await interaction.reply('La playlist no contiene canciones o no se pudo acceder a ellas.');
                return;
            }

            // Agregar cada canción de la playlist al JSON
            items.forEach(item => {
                const songName = item.snippet.title;
                addQueue(songName); // Asumiendo que addQueue toma el nombre de la canción
            });

        } catch (error) {
            console.error('Error al obtener datos de la playlist de YouTube:', error);
            await interaction.reply('Hubo un error al obtener los datos de la playlist de YouTube.');
            return;
        }
    } else {
        // Si no es una playlist, asumir que es una canción individual y agregarla al JSON
        addQueue(url); // Asumiendo que addQueue toma la URL de la canción
    }

    // Iniciar la reproducción
    await initBot(interaction, client);
    
};

module.exports = {
    data: data.toJSON(),
    execute,
};