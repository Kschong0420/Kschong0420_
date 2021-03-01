const Discord = require('discord.js')

module.exports = {
    name: 'help',
    description: "Command List",
    aliases: ['help1', 'help 2', 'help3'],
    execute(client, message, cmd, args) {
        if (cmd === 'help') {
            const newEmbed = new Discord.MessageEmbed()
                .setColor('#FFE666')
                .setTitle('Vanilla Command List')
                .setDescription("Type v <command> to use me!")
                .addFields(
                    { name: 'ping', value: 'pong' },
                    { name: 'cute', value: 'praise Vanilla bot' },
                    { name: 'congrats', value: 'congratulation someone' },
                    { name: 'song', value: 'get a list for song command' },
                    { name: 'avatar', value: 'check for your profile picture' },
                    { name: 'modhelp', value: 'show the command list that only mod can trigger' },
                    { name: 'roast <ping someone>', value: 'insult the person you ping' },
                    { name: 'membercount', value: 'show the amount of users and bot in the server' },
                    { name: 'silence', value: 'someone too noisy? use this command!' },
                    { name: 'hentai', value: 'realise someone is hentai? use this command!' },
                )
                .setImage('https://cdn.discordapp.com/attachments/814445307764670495/814449916822290452/ezgif-2-5516e48d1a75.gif')
                .setFooter('Page 1 out of 3. Use v help<page> to check other commands.')

            message.channel.send(newEmbed);
        }

        if (cmd === 'help1') {
            const newEmbed = new Discord.MessageEmbed()
                .setColor('#FFE666')
                .setTitle('Vanilla Command List')
                .setDescription("Type v <command> to use me!")
                .addFields(
                    { name: 'ping', value: 'pong' },
                    { name: 'cute', value: 'praise Vanilla bot' },
                    { name: 'congrats', value: 'congratulation someone' },
                    { name: 'song', value: 'get a list for song command' },
                    { name: 'avatar', value: 'check for your profile picture' },
                    { name: 'modhelp', value: 'show the command list that only mod can trigger' },
                    { name: 'roast <ping someone>', value: 'insult the person you ping' },
                    { name: 'membercount', value: 'show the amount of users and bot in the server' },
                    { name: 'silence', value: 'someone too noisy? use this command!' },
                    { name: 'hentai', value: 'realise someone is hentai? use this command!' },
                )
                .setImage('https://cdn.discordapp.com/attachments/814445307764670495/814449916822290452/ezgif-2-5516e48d1a75.gif')
                .setFooter('Page 1 out of 3. Use v help<page> to check other commands.')

            message.channel.send(newEmbed);
        }

        if (cmd === 'help2') {
            const newEmbed = new Discord.MessageEmbed()
                .setColor('#FFE666')
                .setTitle('Vanilla Command List')
                .setDescription("Type v <command> to use me!")
                .addFields(
                    { name: 'character', value: 'SPOILERS WARNING! get details for Nekopara' },
                    { name: 'op', value: 'get a list for nekopara opening song' },
                    { name: 'op_play', value: 'automatic put op song to queue, make sure the bot in a voice channel to use this command' },
                    { name: 'ed', value: 'get a list for nekopara ending song' },
                    { name: 'ed_play', value: 'automatic put ed song to queue, make sure the bot in a voice channel to use this command' },
                    { name: 'report', value: 'if realise the bot got bug please use this command to report to the owner quickly' },
                    { name: 'mcserver <ip> <port>', value: 'check the server detail' },
                    { name: 'image <name>', value: 'send the first google image according to the things you want' },
                    { name: 'image <link>', value: 'send the picture according to the link given' },
                    { name: 'say <>', value: 'let the bot help you to say something' },
                )
                .setImage('https://cdn.discordapp.com/attachments/814445307764670495/814449916822290452/ezgif-2-5516e48d1a75.gif')
                .setFooter('Page 2 out of 3. Use v help<page> to check other commands.')

            message.channel.send(newEmbed);
        }

        if (cmd === 'help3') {
            const newEmbed = new Discord.MessageEmbed()
                .setColor('#FFE666')
                .setTitle('Vanilla Command List')
                .setDescription("Type v <command> to use me!")
                .addFields(
                    { name: 'cal add <number1> <number2>', value: 'get the result when <number1> add to <number2>' },
                    { name: 'cal subtract <number1> <number2>', value: 'get the result when <number1> subtract <number2>' },
                    { name: 'cal multiply <number1> <number2>', value: 'get the result when number 1 multiply <number2>' },
                    { name: 'cal divide <number1> <number2>', value: 'get the result when <number1> divided by <number2>' },
                )
                .setImage('https://cdn.discordapp.com/attachments/814445307764670495/814449916822290452/ezgif-2-5516e48d1a75.gif')
                .setFooter('Page 3 out of 3. Use v help<page> to check other commands.')

            message.channel.send(newEmbed);
        }

    }
}