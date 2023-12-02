const {Client, GatewayIntentBits, Partials, Collection} = require("discord.js");
const fs = require('fs');
const config = require("./config.json");
const discordTranscripts = require("discord-html-transcripts");
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
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    command.execute(interaction, client);
  } catch (error) {
      console.error(error);
      await interaction.reply({ content: 'Hubo un error al ejecutar este comando!', ephemeral: true });
  }
});

client.login(config.DISCORD_TOKEN);
