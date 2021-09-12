const Freenom = require('/srv/PrivateScraper/target/freenom.js'); 

exports.run = (client, message) => {

	message.delete();

	if (Freenom.browser) Freenom.close();
	Freenom.init();
};
