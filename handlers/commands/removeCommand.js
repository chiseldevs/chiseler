'use strict';

// DB
const { getCommand, removeCommand } = require('../../stores/command');

// Bot
const { replyOptions } = require('../../bot/options');

/** @param { import('../../typings/context').ExtendedContext } ctx */
const removeCommandHandler = async ({ chat, message, reply, state }) => {
	const { isAdmin, isMaster } = state;
	const { text } = message;
	if (chat.type !== 'private') return null;

	if (!isAdmin) {
		return reply(
			'ℹ️ <b>Afsuski, faqat adminlar bu komandadan foydalana oladi.</b>',
			replyOptions
		);
	}
	const [ , commandName ] = text.split(' ');
	if (!commandName) {
		return reply(
			'<b>Mavjud bo\'lgan komandani jo\'nating.</b>\n\nMasalan:\n' +
			'<code>/removecommand rules</code>',
			replyOptions
		);
	}

	const command = await getCommand({ name: commandName.toLowerCase() });
	if (!command) {
		return reply(
			'ℹ️ <b>Komanda topilmayabdi.</b>',
			replyOptions
		);
	}

	const role = command.role.toLowerCase();
	if (role === 'master' && !isMaster) {
		return reply(
			'ℹ️ <b>Afsuski, faqat senpai bu komandani olib tashlay oladi.</b>',
			replyOptions
		);
	}

	await removeCommand({ name: commandName.toLowerCase() });
	return reply(
		`✅ <code>!${commandName}</code> ` +
		'<b>komanda muvaffaqiyatli olib tashlandi.</b>',
		replyOptions
	);
};

module.exports = removeCommandHandler;
