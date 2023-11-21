const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const commands = []; 
const commandFiles = fs.readdirSync('./src/slashCommands').filter(file => file.endsWith('.js'));
const { DISCORD_TOKEN, DISCORD_CLIENT_ID, ID_SERVER} = require('../../config.json');

for (const file of commandFiles) {
    const command = require(`../slashCommands/${file}`);
    commands.push(command.data);
}

(async () => {
  const rest = new REST({ version: '9' }).setToken(DISCORD_TOKEN);

  try {
      console.log('Actualizando comandos dentro del servidor.');

      await rest.put(
          Routes.applicationGuildCommands(DISCORD_CLIENT_ID, ID_SERVER),
          { body: commands },
      );

      console.log('Comandos Actualizados en el servidor.');
  } catch (error) {
      console.error(error);
  }
})();