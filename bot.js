const {Client, GatewayIntentBits, Partials} = require("discord.js");
const fs = require('fs');
const config = require("./config.json");;
const Discord = require('discord.js');
const client = new Client({
  intents: [  
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.AutoModerationConfiguration,
    GatewayIntentBits.AutoModerationExecution,
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.DirectMessageTyping,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildModeration,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildScheduledEvents,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildWebhooks,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent,
  ],
  partials: [
    Partials.Channel,
    Partials.GuildMember,
    Partials.GuildScheduledEvent,
    Partials.Message,
    Partials.Reaction,
    Partials.ThreadMember,
    Partials.User,
  ],
});
const clearChannelTxt = require('./src/utils/clearChannelTxt');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./src/slashCommands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./src/slashCommands/${file}`);
    client.commands.set(command.data.name, command);
}


client.on('ready', () => {
  console.log(`Bot activo en el Servidor -> ${client.guilds.cache.first().name} <- con el nombre -> ${client.user.username} <-`);

    // Llamar a clearChannelTxt cada 10 minutos
  setInterval(() => {
    clearChannelTxt(client);
  }, 600000); // 600000 ms = 10 minutos
});

client.queue = new Map();

client.on('interactionCreate', async interaction => {
  // Manejar comandos slash
  if (interaction.isCommand()) {
      const command = client.commands.get(interaction.commandName);

      if (!command) return;

      try {
          await command.execute(interaction, client);
      } catch (error) {
          console.error(error);
          await interaction.reply({ content: 'Hubo un error al ejecutar este comando!', ephemeral: true });
      }
  }
  // Manejar interacciones de botones
  else if (interaction.isButton()) {
      switch (interaction.customId) {
          case 'play':
              const playCommand = client.commands.get('play');
              if (playCommand) {
                  await playCommand.execute(interaction, client);
              }
              break;
          case 'pause':
              const pauseCommand = client.commands.get('pause');
              if (pauseCommand) {
                  await pauseCommand.execute(interaction, client);
              }
              break;
          case 'next':
              const nextCommand = client.commands.get('next');
              if (nextCommand) {
                  await nextCommand.execute(interaction, client);
              }
              break;
          case 'shuffle':
              const shuffleCommand = client.commands.get('shuffle');
              if (shuffleCommand) {
                  await shuffleCommand.execute(interaction, client);
              }
              break;
      }
  }
});

client.login(config.DISCORD_TOKEN);
