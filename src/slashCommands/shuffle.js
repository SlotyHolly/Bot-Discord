const fs = require('fs');
const path = require('path');
const { SlashCommandBuilder } = require('@discordjs/builders');
const pathJson = path.join(__dirname, '../../queue.json');

const data = new SlashCommandBuilder()
    .setName('shuffle') // Cambiado a minúsculas
    .setDescription('Desordena la cola de reproducción actual.');

async function execute(interaction) {
    // Leer el archivo queue.json
    fs.readFile(pathJson, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }

        // Convertir el contenido del archivo en un array
        let queue = JSON.parse(data);

        // Desordenar el array
        queue = shuffleArray(queue);

        // Guardar el array desordenado en el archivo queue.json y mostrar un mensaje de éxito
        fs.writeFile(pathJson, JSON.stringify(queue), 'utf8', async (err) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log('El archivo queue.json ha sido desordenado exitosamente.');
            await interaction.reply("La cola de reproducción ha sido desordenada.");
        });
    });
};

// Función para desordenar un array utilizando el algoritmo de Fisher-Yates
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

module.exports = {
    data: data.toJSON(),
    execute,
}
