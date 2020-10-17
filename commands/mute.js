const Bot = require('./../bot');
const ms = require('ms');

exports.run = (client, message, args, config) => {
    let modRole = message.guild.roles.find('name', 'Mod Discord');
    if (message.member.roles.has(modRole.id)) {
        let [who, time] = args;
        let reason = args.slice(2).join(" ");
        if (message.mentions.users.size === 0) return Bot.catchError("Please mention a user to mute", message);
        let mutedRole = message.guild.roles.find('name', 'Muted');
        let mute = message.mentions.members.first();
        message.delete();
        mute.addRole(mutedRole.id).catch(err => Bot.catchError(err, message));
        message.channel.send(`${mute.user.username} was succesfully muted for ${ms(ms(time), {long: true})}. Reason : ${reason}`);

        setTimeout(() => {
            mute.removeRole(mutedRole.id).catch(err => Bot.catchError(err, message));
            message.channel.send(`${mute.user.username} was unmuted after ${ms(ms(time), {long: true})}.`);
        }, ms(time));
    } else {
       return Bot.catchError('This action is reserved to moderators.', message);
    }

};