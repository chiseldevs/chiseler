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

bot.launch({
	webhook: {
		domain: process.env.URL,
		hookPath: '/bot',
		port: process.env.PORT
	}
}).then();
