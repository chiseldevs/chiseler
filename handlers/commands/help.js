'use strict';
const { Markup } = require('telegraf');
const { homepage } = require('../../package.json');

const message = `\
Hey there!

I'm an <b>administration</b> bot that helps you to keep \
Chisel Devs <b>groups</b> safe from <b>spammers.</b>

Send /commands to get the list of available commands.

If you want to use me for your groups, \
contact with @genemator for further details.
`;

/** @param { import('../../typings/context').ExtendedContext } ctx */
const helpHandler = ({ chat, replyWithHTML }) => {
	if (chat.type !== 'private') return null;

	return replyWithHTML(
		message,
		Markup.inlineKeyboard([
			Markup.urlButton('🛠 Setup a New Bot', homepage)
		]).extra(),
	);
};

module.exports = helpHandler;
