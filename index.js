const Discord = require('discord.js');

const client = new Discord.Client();

const prefix = 'v ';

const fs = require('fs');

client.commands = new Discord.Collection

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log('Vanilla is online!');
    client.user.setActivity("Chocola",{
        type: "WATCHING"
    })
});

client.on('message', message =>{
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split("/ +/");
    const command = args.shift().toLowerCase();

    if(command === 'ping'){
        client.commands.get('ping').execute(message, args);
    } else if(command == 'vanilla'){
        client.commands.get('vanilla').execute(message, args);
    } else if(command == 'character'){
        client.commands.get('character').execute(message, args);
    } else if(command == 'help'){
        client.commands.get('help').execute(message, args);
    } else if(command == 'op'){
        client.commands.get('op').execute(message, args);
    } else if(command == 'ed'){
        client.commands.get('ed').execute(message, args);
    }
});

client.login('ODE0MDM4MDk1MTI4MTY2NDAw.YDYCDQ.3cCFVix-Y5Kf0hrUUqb6Vnp8Pow');