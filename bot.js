/**
 * @Author : Llyam Garcia <lgarcia@student.42.fr> (https://fortytwo.tk);
 */
const Discord = require('discord.js');

const Bot = {};

Bot.catchError = (error, message) => {
    const embed = new Discord.RichEmbed()
        .setTitle('Erreur')
        .setColor(0xFF0000)
        .setDescription('An error has occurred : ' + error)
        .setTimestamp();

    message.reply({embed});
};

Bot.catchCommandError = (error, message) => {
    const embed = new Discord.RichEmbed()
        .setTitle('Error using the command `!' + error.command + '`')
        .setColor(0xFF0000)
        .addField('Utilisation', '`' + error.trueCommand + '`\n\n')
        .addField('Exemple of use :', error.example)
        .setTimestamp();

    message.reply({embed});
};

Bot.embedYoutubeAnswer = (answer, message) => {
    const embed = new Discord.RichEmbed()
        .setColor(answer.color)
        .setTitle('Currently playing')
        .setURL(answer.url)
        .setAuthor(answer.author.name, answer.author.avatar)
        .addField('Song Informations',
            'Title: `'+answer.title+'`\nLength: `'+answer.length_seconds+'s`\n'
            +
            'View count: `'+answer.view_count+'` times'
        )
        .setImage(answer.iurlhq)
        .setFooter(`added to playlist by ${answer.author.askedBy}`, message.author.displayAvatarURL)
        .setTimestamp();

    message.delete();
    message.reply({embed});
};

module.exports = Bot;