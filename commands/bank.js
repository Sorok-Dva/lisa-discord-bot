const Bank = require('/srv/PrivateScraper/bundle/bank.js'); 

exports.run = (client, message) => {
	message.delete();
	Bank.start();
};
