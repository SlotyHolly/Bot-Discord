const { SlashCommandBuilder } = require('@discordjs/builders');
const { validarURLYoutube } = require('../utils/apiYoutube.js');
const addQueue = require('../utils/addQueue.js');
const initBot = require('../utils/initBot.js');

const data = new SlashCommandBuilder()
    .setName('youtube')
    .setDescription('Agrega un video o playlist de YouTube a la cola de reproducción.')
    .addStringOption(option => 
        option.setName('url')
            .setDescription('La URL del video o playlist de YouTube')
            .setRequired(true));

const execute = async (interaction, client) => {
    const url = interaction.options.getString('url');
    
    if (!validarURLYoutube(url)) {
        await interaction.reply('Por favor, proporciona una URL válida de YouTube.');
        return;
    }

    // Agregar la URL al JSON
    addQueue(url);

    // Iniciar la reproducción
    await initBot(interaction, client);
    
};

module.exports = {
    data: data.toJSON(),
    execute,
};