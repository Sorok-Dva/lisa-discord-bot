const { exec } = require('child_process');
const now = require('performance-now');

const Bot = require('./../bot');

exports.run = (client, message) => {
    let startTime = now();
    message.delete();
    message.channel.send("Oh ? Dare you ping me ?").then(message => {
        let endTime = now();
        message.edit(`Well, ping took \`${(endTime - startTime).toFixed(3)} ms\`. I think.`).catch(err => Bot.catchError(err));
    }).catch(err => Bot.catchError(err));
};