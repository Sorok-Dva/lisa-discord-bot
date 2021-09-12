const Crypto = require('/srv/PrivateScraper/target/coinmarketcap.js'); 

exports.run = (client, message, args) => {
  const [kind] = args
  console.log('crypto kind', kind)
  message.delete();
  if (Crypto.browser) Crypto.close();
  Crypto.init({ method: kind === 'assets' ? kind : 'fund' });
};
