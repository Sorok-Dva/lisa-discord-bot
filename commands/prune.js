const Bot = require('./../bot');

exports.run = (client, message, args, config) => {
    if (message.author.id !== config.OWNER_ID) return Bot.catchError('Cette commande est réservée aux administrateurs.', message);
    let [numb] = args;
    let count = parseInt(numb) ? parseInt(numb) : 1;
    message.channel.fetchMessages({limit: 100}).then(messages => {
        let msg_array = messages.array();
        msg_array.length = count + 1;
        msg_array.map(m => m.delete().catch(err => Bot.catchError(err, message)));
    });
};