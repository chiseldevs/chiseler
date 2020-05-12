'use strict';

process.chdir(__dirname);

// Utils
const { logError } = require('./utils/log');

const bot = require('./bot');

bot.use(
	require('./handlers/middlewares'),
	require('./plugins'),
	require('./handlers/commands'),
	require('./handlers/regex'),
	require('./handlers/unmatched'),
);

bot.catch(logError);

bot.launch();

// bot.telegram.deleteWebhook().then();
// bot.telegram.setWebhook(`${process.env.URL}/bot${process.env.TOKEN}`).then();
// bot.startWebhook(`/bot${process.env.TOKEN}`, null, process.env.PORT);