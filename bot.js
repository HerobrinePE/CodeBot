const Discord = require('discord.js');

const client = new Discord.Client();

const config = require("./config.json");
const manager = require("./rolemanager.js");

function handleRoles(server,messageData) {
    const channel = server.channels.cache.get(messageData.channelId);

    console.log("Server is",server.name);
    console.log("Channel is",channel.name);
    console.log("Message is",messageData.messageId);

    channel.messages.fetch(config.messageId).then( message =>  {

        // Fetch can either return a Promise<Message> or a Primise<Collection<Message>>
        // so we have to check wich one it is =[
        if (!message.content) {
            message = message.filter(m => m.id === messageData.messageId).first();
        }


        console.log(`Killswitch activated for '${messageData.mapname}'`);

        manager.manageRoles(message,client,messageData);

    }
    );
}

client.once('ready', () => {
    console.log('Ready!');


    client.user.setActivity("Political Hub🌍", { type: "STREAMING" });
  
    const server = client.guilds.cache.get(config.serverId);

    config.messageData.forEach(data => handleRoles(server,data));


});

client.login(process.env.DISCORD_KEY);
