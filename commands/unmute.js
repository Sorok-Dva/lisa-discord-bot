const Bot = require('./../bot');

exports.run = (client, message, args, config) => {
    if (message.author.id !== config.OWNER_ID) return Bot.catchError('Cette commande est réservée aux administrateurs.', message);
    let [who] = args;
    if (message.mentions.users.size === 0) return Bot.catchError("Please mention a user to unmute");
    let mutedRole = message.guild.roles.find('name', 'Muted');
    let mute = message.mentions.members.first();
    message.delete();
    mute.removeRole(mutedRole.id).catch(err => Bot.catchError(err, message));
    message.reply(` has manually unmute ${mute.user.username}.`);
};