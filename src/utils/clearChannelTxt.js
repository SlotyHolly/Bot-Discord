const { Client, GatewayIntentBits } = require('discord.js');
const { CHANNEL_ID, DISCORD_TOKEN } = require("../../config.json");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMessages
    ]
});

client.login(DISCORD_TOKEN);

client.on('ready', () => {
    const channel = client.channels.cache.get(CHANNEL_ID);
    if (channel) {
        try {
            // Fetch y elimina los mensajes en bucles de 100 mensajes
            const deleteMessages = async () => {
                const fetched = await channel.messages.fetch({ limit: 100 });
                const notPinned = fetched.filter(fetchedMsg => !fetchedMsg.pinned);

                if (notPinned.size === 0) return;

                await channel.bulkDelete(notPinned, true);
                deleteMessages(); // Recursividad para más de 100 mensajes
            };

            deleteMessages().then(() => {
                const currentTime = new Date();
                const formattedTime = `${currentTime.getHours()}:${currentTime.getMinutes()}:${currentTime.getSeconds()}`;
                const results = channel.messages.cache.filter(msg => !msg.pinned);
                console.log("Se ha limpiado el canal Música con éxito!", results.size, "mensajes eliminados", "a las", formattedTime);
            });
        } catch (error) {
            console.error("Error al limpiar el canal:", error);
        }
    } else {
        console.log("Canal no encontrado");
    }
});
