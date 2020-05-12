'use strict';

process.chdir(__dirname);

// Utils
const { logError } = require('./utils/log');
const { token } = require('./config')
const bot = require('./bot');

bot.use(
	require('./handlers/middlewares'),
	require('./plugins'),
	require('./handlers/commands'),
	require('./handlers/regex'),
	require('./handlers/unmatched'),
);

bot.catch(logError);

// bot.launch();

bot.telegram.deleteWebhook().then();
bot.telegram.setWebhook(`https://chiseler.herokuapp.com/bot${token}`).then();
bot.startWebhook(`/bot${token}`, null, 5000);