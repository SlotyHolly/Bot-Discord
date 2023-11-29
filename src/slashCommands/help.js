// Importa las dependencias necesarias
const { SlashCommandBuilder } = require('@discordjs/builders');

// Define los datos del comando
const data = new SlashCommandBuilder()
  .setName("help")
  .setDescription("Muestra todos los comandos disponibles")

// Define la función que se ejecutará cuando se llame al comando
const execute = async (interaction, client) => {
  await interaction.reply(`**/hola:** Enviar un mensaje de saludo en el chat.\n**/spotify <url>:** Agregar todas las canciones de una lista de reproducción de Spotify a la cola de reproducción.\n**/youtube <url>:** Reproducir un video de YouTube en el canal de voz.\n**/buscar <nombre>:** Buscar una canción en YouTube por su nombre y reproducirla en el canal de voz.\n**/salir:** Desconectar el bot del canal de voz.\n**/encolar:** Agregar una canción`);
}

// Exporta los datos del comando y la función execute
module.exports = {
  data: data.toJSON(),
  execute,
};