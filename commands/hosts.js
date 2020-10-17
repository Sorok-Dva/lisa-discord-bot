const fs = require('fs');
const Bot = require('./../bot');

const removeLines = (data, lines = []) => {
  return data.split('\n').filter((v, i) => lines.indexOf(i) === -1).join('\n');
};

exports.run = (client, message, args) => {
  message.delete();
  let ip = args.slice(0).join(' ');
  fs.readFile('/etc/hosts.allow', 'utf8', (errRead, data) => {
    fs.writeFile'/etc/hosts.allow', removeLines(data, [12], 'utf8', errWrite => {
      fs.appendFile('/etc/hosts.allow', `sshd: ${ip}`, err => {
        if (err) console.log('unable to edit hosts');
      });
    });
  )};
};
