# LISA (personnal discord-bot)

This is my own personnal discord bot, responding to my own needs and this bot name's Lisa !

Some commands are scraper that I made and that you can find (not all) on my github like [Freenom](https://github.com/Sorok-Dva/freenom-auto-renew-domains) or [CoinMarketCap](https://github.com/Sorok-Dva/coinmarketcap-scraper).

Some others commands are just specific to me, for example the ["Credit Mutuel"](https://www.creditmutuel.fr/) and that is not published yet

## Can I use it ?

**Yes, for the mainstream commands**, but the repository isn't configured to be ready to go and you will miss some files, for some commands, that I can't release for now. Lot of data / files are really sensitive due to some targets (e.g: crédit mutuel). I will soonly make a public repository with this files (a scraper application that I need to refacto)

Waiting that, if for example you especially wish to use **CM** I can give some clue to do your own : 

- you will need to create a `data` folder and create a cookie file with the real cookies of the website.
- And start to play with puppeteer !

_(⚠ If your bank is Crédit Mutuel (and probably some much others), each 2 or 3 months you will have to confirm your login with your mobile phone. At the moment the only solution I found is to login normally, accept phone validation, re-export and renew the cookies on the bot. It means the command will be broken while you don't renew your cookies.)_

Anyway, you can take a look to the code, make a fork and update/change it as you want/need !
But don't forget, i'll release the scraper (all reference to `/srv/PrivateScraper` in the code) so you'll get some samples of specific website scraping.

## I never faced to discord bot, how I can launch my own bot ?
 
You can find great videos guides on youtube or follow written guides ([How to build a discord bot on digital-ocean](https://www.digitalocean.com/community/tutorials/how-to-build-a-discord-bot-with-node-js)), that i receommend you.
