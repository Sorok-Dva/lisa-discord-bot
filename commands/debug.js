const Discord = require('discord.js');
const si = require('systeminformation');

const Bot = require('./../bot');

exports.run = (client, message, args) => {
    let [type, module] = args;
    let embed;
    switch (type) {
        case 'info':
            switch (module) {
                case 'system':
                    si.osInfo((data) => {
                        embed = new Discord.RichEmbed()
                            .setColor(0x188A6C)
                            .setTitle('System Debug Info')
                            .setDescription('Here is all the host system informations.')
                            .addField('System-OS', `\`${data.platform}\``)
                            .addField('System-distro', `\`${data.distro}\``)
                            .addField('System-release', `\`${data.release}\``)
                            .addField('System-codeName', `\`${data.codename}\``)
                            .addField('System-kernel', `\`${data.kernel}\``);
                        message.reply({embed}).catch(err => Bot.catchError(err, message));
                        batteryDebug(message);
                    });
                    break;
                case 'cpu':
                    si.cpu((data) => {
                        embed = new Discord.RichEmbed()
                            .setColor(0x188A6C)
                            .setTitle('CPU Debug Info')
                            .addField('CPU-manufacturer:', `\`${data.manufacturer}\``)
                            .addField('CPU-brand:', `\`${data.brand}\``);
                        message.reply({embed}).catch(err => Bot.catchError(err, message));
                        advancedCPUDebug(message);
                    });
                    break;
                case 'network':
                    si.networkStats((data) => {
                        embed = new Discord.RichEmbed()
                            .setColor(0x188A6C)
                            .setTitle('Network Debug Info')
                            .setDescription('Network Interface Stats (eth1):')
                            .addField('- is up: ', data.operstate)
                            .addField('- RX bytes overall: ', data.rx)
                            .addField('- TX bytes overall: ', data.tx)
                            .addField('- RX bytes/sec: ', data.rx_sec)
                            .addField('- TX bytes/sec: ', data.tx_sec);
                        message.reply({embed}).catch(err => Bot.catchError(err, message));
                    });
                    break;
                default:
                    embed = new Discord.RichEmbed()
                        .setTitle('Global Debug Info')
                        .setColor(0x188A6C)
                        .setDescription('`Servant of Tensess` - Discord Bot.')
                        .addField('Made with', '`Node.js` and `Discord.js` library (https://discord.js.org)')
                        .addField('Creator', '`Lymal <lymal@allods-nova.tk>`')
                        .addField('Date of creation', 'Wed Jan 31 2018 14:15:41 GMT+0200 (Central Europe Daylight Time)');
                    message.reply({embed}).catch(err => Bot.catchError(err, message));
            }
            break;

        default:
            Bot.catchCommandError({
                command: 'debug',
                trueCommand:'!debug [type|int] [module|int].',
                example: '`!debug info`\nor\n`!debug info system`'
            }, message);
            return false;
    }
};

const advancedCPUDebug = message => {
    let embed;
    si.currentLoad((data) => {
        embed = new Discord.RichEmbed()
            .setColor(0x188A6C)
            .setTitle('CPU advanced debug Info')
            .setDescription('Here is some advanced CPU info')
            .addField('CPU-avgload: ', `\`${data.avgload}\``)
            .addField('CPU-currentLoad:', `\`${data.currentload} %\``);
        message.channel.send({embed}).catch(err => Bot.catchError(err, message));
    })
};

const batteryDebug = message => {
    let embed;
    si.battery((data) => {
        console.log(data);
        embed = new Discord.RichEmbed()
            .setColor(0x0066CC)
            .setTitle('System advanced debug info')
            .setDescription('Informations about battery')
            .addField('Battery-exists', `\`${data.hasbattery}\``)
            .addField('Battery-numberOfRecharges', `\`${data.cyclecount}\` times`)
            .addField('Battery-isCharging', `\`${data.ischarging}\``)
            .addField('Battery-maxCapacity', `\`${data.maxcapacity}\``)
            .addField('Battery-currentCapacity', `\`${data.currentcapacity}\``)
            .addField('Battery-level', `\`${data.percent} %\``);
        message.channel.send({embed}).catch(err => Bot.catchError(err, message));
    })
};
