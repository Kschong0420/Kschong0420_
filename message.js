const { Message } = require("discord.js");

require('dotenv').config();
module.exports = (Discord, client, message) => {
    const prefix = process.env.PREFIX;
    if(!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();

    const command = client.commands.get(cmd);

    if(command) command.execute(client, message, args, Discord);
}

//const command = client.commands.get(cmd) || client.commands.find(a => a.aliases && a.aliases.includes(cmd));
//if(command) command.execute(client, message, cmd, args, Discord);