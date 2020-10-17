const { exec } = require('child_process');

const Discord = require('discord.js');
const Bot = require('./../bot');

exports.run = (client, message, args, config) => {
    if (message.author.id !== config.OWNER_ID) return Bot.catchError('Cette commande est réservée aux administrateurs.', message);
    if (!process.env.sh || process.env.sh === 'false') {
        message.delete();
        message.reply('Connection open with lisa.');
        process.env.sh = true;
        return false;
    }
    let command = message.content;
    if (command === 'exit')
    {
        message.delete();
        message.channel.send('Exit requested. Connection closed with lisa.');
        process.env.sh = false;
        return false;
    } else {
        if (process.env.sh === 'false') return false;
        exec(command, {shell: '/bin/zsh'}, (err, stdout, stderr) => {
            if (err) return Bot.catchError(err, message);
            message.delete();
            let embedOut = new Discord.RichEmbed()
                .setColor(0x188A6C)
                .setTitle('42@lisa ➜  ~ ' + command)
                .setDescription(stdout);

            let embedErr = new Discord.RichEmbed()
                .setColor(0x188A6C)
                .setTitle('42@lisa ➜  ~ ' + command)
                .setDescription(stderr);

            let embedErr2 = new Discord.RichEmbed()
                .setColor(0x188A6C)
                .setTitle('42@lisa ➜  ~ ' + command)
                .setDescription(err);

            if (stdout) message.channel.send({embed: embedOut});
            if (stderr) message.channel.send({embed: embedErr});
            if (err) message.channel.send({embed: embedErr2});
        });
    }
};