const Discord = require('discord.js');
require('dotenv').config();
const client = new Discord.Client();

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

client.once('ready', () => {
    client.user.setActivity("Chocola", {
        type: "WATCHING"

    })
});

client.on('messageDelete', async message => {
    const logchannel = message.guild.channels.cache.find(ch => ch.name === "logchannel");
    if (!logchannel) return
    const embed = new Discord.MessageEmbed()
        .setColor('#0352fc')
        .setTitle('Deleted Message')
        .addFields(
            { name: 'Author', value: `${message.author.tag}` },
            { name: 'Deleted Message', value: `${message.content}` },
            { name: 'Channel', value: `${message.channel.name}` },
        )
        .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        .setFooter(`User ID: ${message.author.id}`)
    logchannel.send(embed);
});

client.on('messageUpdate', async message => {
    const logchannel =  message.guild.channels.cache.find(ch => ch.name === "logchannel");
    if (!logchannel) return
    const embed = new Discord.MessageEmbed()
        .setColor('#fca503')
        .setTitle('Edited Message')
        .addFields(
            { name: 'Author', value: `${message.author.tag}` },
            { name: 'Message Before Edited', value: `${message.content}` },
            { name: 'Guild', value: `${message.guild.name}` },
            { name: 'Channel', value: `${message.channel.name}` },
        )
        .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        .setFooter(`User ID: ${message.author.id}`)
    logchannel.send(embed);
});

['command_handler', 'event_handler'].forEach(handler => {
    require(`./handlers/${handler}`)(client, Discord);
})

client.login(process.env.DISCORD_TOKEN).catch(console.error());

//{ name: 'Edited Message', value: `${message.edit.content}` },
