const Bank = require('/srv/PrivateScraper/target/creditMutuel.js'); 

exports.run = (client, message) => {

	message.delete();

	if (Bank.browser) Bank.close();
	Bank.init();
};
