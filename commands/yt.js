const ytdl = require('ytdl-core');
const ytSearch = require('youtube-search');

const Bot = require('./../bot');


let playlist = [];
let inListening = false;
let currentlyListening = null;
let stream, voiceChannel, dispatcher, music;

exports.run = (client, message, args) => {
    let [command, url] = args;
    const searchString = args.slice(1).join(' ');
    switch (command) {
        case 'add':
            message.delete();
            if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
                getYTMusicInfo(url, message);
            } else {
                const opts = {
                    maxResults: 3,
                    key: 'AIzaSyCTFGdTQRnlAI2trAc9m_10ddslJPCFlsk'
                };
                ytSearch(searchString, opts, function (err, results) {
                    if (err) {
                        message.channel.send(`Aucun résultat.`);
                        return console.log(err);
                    }
                    for (var y = 0; results[y].kind === 'youtube#channel'; y++);
                    getYTMusicInfo(results[y].link, message);
                });
            }

            break;
        case 'next':
            if (inListening && currentlyListening) {
                dispatcher.destroy();
            }
            break;
        case 'stop':
            leave(message);
            break;
        default:
            if (!message.member.voiceChannel) {
                Bot.catchError('Tu dois être dans un salon vocal avant d\'utiliser la commande !yt.', message);
            } else {
                Bot.catchCommandError({
                    command: 'yt',
                    trueCommand:'!yt [command|[add,pause,play,next,stop]] [url|string/null].',
                    example: '`!yt add https://www.youtube.com/watch?v=f5AjMRi9of8`\n`!yt stop`'
                }, message);
            }
            break;
    }
};

const play = (music, message) => {
    voiceChannel = message.member.voiceChannel;
    if (voiceChannel) {
        voiceChannel.join().then(connection => {
            stream = ytdl(music.url, { filter: 'audioonly' });
            dispatcher = connection.playStream(stream);
            dispatcher.on('start', () => {
                Bot.embedYoutubeAnswer(music, message);
                inListening = true;
                currentlyListening = music;
            });
            dispatcher.on('error', (err) => {
                Bot.catchError(err, message);
                inListening = false;
                currentlyListening = null;
            });
            dispatcher.on('end', () => {
                inListening = false;
                currentlyListening = null;
                playlist = playlist.filter(m => m.plid !== music.plid);
                if (playlist.length === 0) {
                    message.reply('je quitte le salon vocal, il n\'y a plus rien dans la playlist !');
                    voiceChannel.leave()
                } else {
                    play(playlist[0], message);
                }
            });
        }).catch(err => Bot.catchError(err, message));
    } else {
        Bot.catchError('Tu dois être dans un salon vocal avant d\'utiliser la commande !yt.', message);
    }
};

const leave = (message) => {
    message.member.voiceChannel.leave();
    message.delete();
};

const getYTMusicInfo = (url, message) => {
    ytdl.getInfo(url).then(info => {
        if (info.status === 'ok') {
            music = {
                plid: playlist.length,
                id: info.video_id,
                length_seconds: info.length_seconds,
                view_count: parseInt(info.view_count).toLocaleString('fr-FR'),
                iurlhq: info.iurlhq,
                author: {
                    askedBy: message.author.username + '#' + message.author.discriminator,
                    name: info.author.name,
                    avatar: info.author.avatar,
                    channel_url: info.author.channel_url,
                },
                title: info.title,
                url: info.video_url
            };
            playlist.push(music);
            if (!inListening) {
                play(music, message);
            } else {
                message.reply(`**${music.title}** ajouté à la playlist !`, message);
            }
        } else {
            message.reply(`Impossible de jouer cette musique : **${info.status}**. Essayez via un autre lien.`, message);
        }
    }).catch(e => console.log(e));
};