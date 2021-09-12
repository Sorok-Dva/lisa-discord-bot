/**
 * @Author : Llyam
 * @Application : Personnal SSH Bot
 */

const Discord = require('discord.js');
const config = require('dotenv').config().parsed;
const fs = require('fs');
const Bot = require('./bot');

const client = new Discord.Client();
const token = config.BOT_TOKEN;
const logChannel = config.LOG_CHANNEL;
const prefix = config.PREFIX;
const commands = ['eval', 'bank', 'freenom', 'hosts', 'prune', 'mute', 'unmute', 'sh', 'reload', 'lmgtfy', 'debug', 'ping', 'yt', 'survey', 'cm', 'crypto'];

let streaming = false;

client.on('ready', () => {
    client.user.setActivity('Travel to M42.');
});

client.on('message', message => {
    if (!message.guild || message.channel.type === 'dm' || message.author.bot) return;

    let args = message.content.slice(prefix.length).trim().split(/ +/g);
    let command = args.shift().toLowerCase();

    if ((commands.indexOf(command) === -1) && (process.env.sh === 'false' || process.env.sh === undefined)) return false;

    if (process.env.sh === 'true' && message.author.id === config.OWNER_ID) {
        shCommand(command, message, args, config);
        if (commands.indexOf(command) === -1) return false;
    }

    try {
        let commandFile = require(`./commands/${command}.js`);
        commandFile.run(client, message, args, config);
        return true;
    } catch (err) {
        Bot.catchError(err, message);
    }
});

client.on('guildMemberAdd', member => {
    return false;
    member.guild.defaultChannel.send(`Welcome ${member} !`);
});

client.login(token);

let shCommand = (command, message, args, config) => {
    try {
        let commandFile = require(`./commands/sh.js`);
        commandFile.run(client, message, args, config);
        return true;
    } catch (err) {
        Bot.catchError(err, message);
    }
};
