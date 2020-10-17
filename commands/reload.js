const Bot = require('./../bot');

exports.run = (client, message, args, config) => {
    if (message.author.id !== config.OWNER_ID) return Bot.catchError('Cette commande est réservée aux administrateurs.', message);
    if (!args || args.length < 1) return Bot.catchCommandError({
        command: 'reload',
        trueCommand:'!reload [command|string].',
        example: '`!reload invit` (limité aux administrateurs)'
    }, message);

    delete require.cache[require.resolve(`./${args[0]}.js`)];
    message.delete();
    message.reply(`la commande \`${args[0]}\` a été rechargée.`).catch(err => Bot.catchError(err, message)).then(msg => {
        msg.delete(5000)
    });
};