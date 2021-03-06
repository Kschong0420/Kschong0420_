const Discord = require('discord.js')
require('dotenv').config()
const client = new Discord.Client()
const fetch = require('node-fetch')
const querystring = require('querystring')

const memberCounter = require('./counters/member-counter')

client.commands = new Discord.Collection()
client.events = new Discord.Collection()

client.once('ready', () => {
  client.user.setActivity('Chocola', {
    type: 'WATCHING'
  })
})

client.once('ready', () => {
  console.log('Member Counter Started Countdown!')
  memberCounter(client)
})

client.on('messageDelete', async message => {
  const logchannel = message.guild.channels.cache.find(ch => ch.name === 'logchannel')
  if (!logchannel) return
  const embed = new Discord.MessageEmbed()
    .setColor('#0352fc')
    .setTitle('Deleted Message')
    .addFields(
      { name: 'Author', value: `${message.author.tag}` },
      { name: 'Deleted Message', value: `${message.content}` },
      { name: 'Channel', value: `${message.channel.name}` }
    )
    .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
    .setTimestamp()
    .setFooter(`User ID: ${message.author.id}`)
  logchannel.send(embed)
})

client.on('messageUpdate', async message => {
  const logchannel = message.guild.channels.cache.find(ch => ch.name === 'logchannel')
  if (!logchannel) return
  const embed = new Discord.MessageEmbed()
    .setColor('#fca503')
    .setTitle('Edited Message')
    .addFields(
      { name: 'Author', value: `${message.author.tag}` },
      { name: 'Message Before Edited', value: `${message.content}` },
      { name: 'Channel', value: `${message.channel.name}` }
    )
    .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
    .setTimestamp()
    .setFooter(`User ID: ${message.author.id}`)
  logchannel.send(embed)
})

client.on('message', async message => {
  const prefix = process.env.PREFIX
  const args = message.content.substring(prefix.length).split(' ')

  if (message.content.startsWith(`${prefix}urban`)) {
    const searchString = querystring.stringify({ term: args.slice(1).join(' ') })

    if (!args.slice(1).join(' ')) {
      return message.channel.send(new MessageEmbed()
        .setColor('BLUE')
        .setDescription('You need to specify something you want to search the urban dictionary')
      )
    }

    const { list } = await fetch(`https://api.urbandictionary.com/v0/define?${searchString}`).then(response => response.json())

    try {
      const [answer] = list

      const trim = (str, max) => ((str.length > max) ? `${str.slice(0, max - 3)}...` : str)

      const embed = new Discord.MessageEmbed()
        .setColor('BLUE')
        .setTitle(answer.word)
        .setURL(answer.permalink)
        .addFields(
          { name: 'Definition', value: trim(answer.definition, 1024) },
          { name: 'Example', value: trim(answer.example, 1024) },
          { name: 'Rating', value: `${answer.thumbs_up} 👍. ${answer.thumbs_down} 👎.` }
        )
      message.channel.send(embed)
    } catch (error) {
      console.log(error)
      return message.channel.send(new Discord.MessageEmbed()
        .setColor('BLUE')
        .setDescription(`No results were found for **${args.slice(1).join(' ')}**`)
      )
    }
  }
});

['command_handler', 'event_handler'].forEach(handler => {
  require(`./handlers/${handler}`)(client, Discord)
})

client.login(process.env.DISCORD_TOKEN)

// { name: 'Edited Message', value: `${message.edit.content}` },

// Special Thanks
// Thank for the following tutorial youtuber below for teach the code to bot creator for this bot:
// 1.codelyon  - newbie suitable tutorial 
// 2.fusion terror - useful code and clear
// 3.reconlx (and his npm package) - make bot more fun and fuction with lot of npm package
