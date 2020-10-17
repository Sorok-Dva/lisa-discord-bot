const Bot = require('./../bot');
const Discord = require("discord.js");

exports.run = (client, message, args, config) => {
    message.delete();
    let question = args.slice(0).join(" ");

    if (args.length === 0)
        return Bot.catchError('Bad usage', message);

    const embed = new Discord.RichEmbed()
        .setTitle('A new survey is available ! Please react to give your opinion.')
        .setColor("#5599ff")
        .setDescription(`${question}`)
        .setFooter(`Author : ${message.author.username}.`, `${message.author.avatarURL}`)

    message.channel.send({embed}).then(msg => {
        msg.react('👍')
            .then(() => msg.react('👎'))
            .then(() => msg.react('🤷'))
            .catch(() => console.error('Prout'));
    })
};
