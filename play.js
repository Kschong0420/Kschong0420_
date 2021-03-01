const Discord = require('discord.js'),
      DisTube = require('distube'),
    client = new Discord.Client(),
    config = {
        prefix: "v ",
        token: process.env.TOKEN || "token"
    };

const distube = new DisTube(client, { searchSongs: true, emitNewSongOnly: true });

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async message => {
      
    if (!message.guild) return;
  
    if (message.content === 'v join') {
      if (message.member.voice.channel) {
        if (message.member.hasPermission('MANAGE_MESSAGES')) {
        const connection = await message.member.voice.channel.join();
        message.channel.send('Sucessfully join a voice channel!');
      }} else {
        message.reply('You need to join a voice channel first!');
      }
    }
  });

client.on('message', async message => {
      
    if (!message.guild) return;
  
    if (message.content === 'v stop') {
      if (message.member.voice.channel) {
        if (message.member.hasPermission('MANAGE_MESSAGES')) {
        const connection = await message.member.voice.channel.leave();
        message.channel.send("Goodbye Nii Sama!");
      }} else {
        message.reply('You need to join the voice channel that vanilla bot inside first!');
      }
    }
  });

client.on('message', async message => {
      
    if (!message.guild) return;
  
    if (message.content === 'v fuck off') {
      if (message.member.voice.channel) {
        if (message.member.hasPermission('MANAGE_MESSAGES')) {
        const connection = await message.member.voice.channel.leave();
        message.channel.send("Also Shigure praised me for being calm but u really let me mad now!");
      }} else {
        message.reply('You need to join the voice channel that vanilla bot inside first!');
      }
    }
  });

client.on("message", async (message) => {
    if (!message.content.startsWith(config.prefix)) return;
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift();

    if (command == "play")
        distube.play(message, args.join(" "));

    if (["repeat", "loop"].includes(command))
        distube.setRepeatMode(message, parseInt(args[0]));

    if (command == "leave") {
        distube.stop(message);
        message.channel.send("Goodbye Nii Sama!");
    }

    if (command == "fuckoff") {
        distube.stop(message);
        message.channel.send("Also Shigure praised me for being calm but u really let me mad now!");
    }

    if (command == "loop") {
        message.channel.send("Setting successfully changed!");
    }

    if (command == "skip")
        distube.skip(message);

    if (command == "skip")
        message.channel.send('Song successfully skipped!');

    if (command == "queue") {
        let queue = distube.getQueue(message);
        message.channel.send('Current queue:\n' + queue.songs.map((song, id) =>
            `**${id + 1}**. ${song.name} - \`${song.formattedDuration}\``
        ).slice(0, 50).join("\n"));
    }

    if ([`3d`, `bassboost`, `echo`, `karaoke`, `nightcore`, `vaporwave`].includes(command)) {
        let filter = distube.setFilter(message, command);
        message.channel.send("Current queue filter: " + (filter || "Off"));
    }

    if (command == "volume"){
        distube.setVolume(message, args[0]);
        message.channel.send(`Volume have been set to **${args[0]}%**!`);
    }

    if (command == "autoplay") {
        let mode = distube.toggleAutoplay(message);
        message.channel.send("Set autoplay mode to `" + (mode ? "On" : "Off") + "`");
    }

    if (command == "jump")
        distube.jump(message, parseInt(args[0]))
            .catch(err => message.channel.send("Invalid song number."));

});

const status = (queue) => `Volume: \`${queue.volume}%\` | Filter: \`${queue.filter || "Off"}\` | Loop: \`${queue.repeatMode ? queue.repeatMode == 2 ? "All Queue" : "This Song" : "Off"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``;

distube
    .on("playSong", (message, queue, song) => message.channel.send(
        `Playing \`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: ${song.user}\n${status(queue)}`
    ))
    .on("addSong", (message, queue, song) => message.channel.send(
        `Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`
    ))
    .on("playList", (message, queue, playlist, song) => message.channel.send(
        `Play \`${playlist.name}\` playlist (${playlist.songs.length} songs).\nRequested by: ${song.user}\nNow playing \`${song.name}\` - \`${song.formattedDuration}\`\n${status(queue)}`
    ))
    .on("addList", (message, queue, playlist) => message.channel.send(
        `Added \`${playlist.name}\` playlist (${playlist.songs.length} songs) to queue\n${status(queue)}`
    ))
    
    .on("searchResult", (message, result) => {
        let i = 0;
        message.channel.send(`**Choose an option from below**\n${result.map(song => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``).join("\n")}\n*Enter anything else or wait 60 seconds to cancel*`);
    })
   
    .on("searchCancel", (message) => message.channel.send(`Searching canceled`))
    .on("error", (message, e) => {
        console.error(e)
        message.channel.send("An error encountered: " + e);
    });

client.login(config.token);