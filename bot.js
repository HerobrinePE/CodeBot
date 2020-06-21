const Discord = require('discord.js');

const client = new Discord.Client();

const router = require("./router.js");



client.once('ready', () => {
    console.log('Ready!');
    router.onLoad(client);//


    client.user.setActivity("Political Hub🌍", { type: "STREAMING" });
  
    const server = client.guilds.cache.get(config.serverId);

    config.messageData.forEach(data => handleRoles(server,data));



});

client.login(process.env.DISCORD_KEY);
