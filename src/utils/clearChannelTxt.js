const { CHANNEL_ID } = require("../../config.json");

async function clearChannelTxt(client) {
    const channel = client.channels.cache.get(CHANNEL_ID);
    if (!channel) {
        console.log("Canal no encontrado");
        return;
    }

    try {
        const deleteMessages = async () => {
            const fetched = await channel.messages.fetch({ limit: 100 });
            const notPinned = fetched.filter(fetchedMsg => !fetchedMsg.pinned);

            if (notPinned.size === 0) return;

            await channel.bulkDelete(notPinned, true);
        };

        await deleteMessages();
        const currentTime = new Date();
        const formattedTime = `${currentTime.getHours()}:${currentTime.getMinutes()}:${currentTime.getSeconds()}`;
        const results = channel.messages.cache.filter(msg => !msg.pinned);
        console.log("Se ha limpiado el canal Música con éxito!", results.size, "mensajes eliminados", "a las", formattedTime);

    } catch (error) {
        console.error("Error al limpiar el canal:", error);
    }
}

module.exports = clearChannelTxt;