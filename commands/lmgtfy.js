const cheerio = require('cheerio');
const snekfetch = require('snekfetch');
const querystring = require('querystring');

const Bot = require('./../bot');

exports.run = async function run (client, message, args) {
    if (!args || args.length < 1) return Bot.catchCommandError({
        command: 'lmgtfy',
        trueCommand:'!lmgtfy [search|string].',
        example: '`!lmgtfy discord`'
    }, message);

    let searchMessage = await message.reply('Recherche en cours...');
    let searchUrl = `https://www.google.com/search?q=${encodeURIComponent(args.join(' '))}`;

    return snekfetch.get(searchUrl).then((result) => {

        let $ = cheerio.load(result.text);

        let googleData = $('.r').first().find('a').first().attr('href');

        googleData = querystring.parse(googleData.replace('/url?', ''));
        searchMessage.edit(`Results : \n${googleData.q}`);
    });
};