'use strict';

// DB
const { addCommand, getCommand } = require('../../stores/command');

// Bot
const { Markup } = require('telegraf');
const { replyOptions } = require('../../bot/options');

const Cmd = require('../../utils/cmd');
const { isMaster } = require('../../utils/config');
const { inlineKeyboard } = require('../../utils/tg');

const preserved = require('../commands').handlers;

const roleBtn = (btRole, { newCommand, currentRole }) => {
	const noop = btRole.toLowerCase() === currentRole.toLowerCase();
	return {
		text: '✅ '.repeat(noop) + btRole,
		callback_data: Cmd.stringify({
			command: 'addcommand',
			flags: {
				noop,
				role: btRole,
				replace: 'soft',
			},
			reason: newCommand,
		}),
	};
};

const roleKbRow = (cmdData) => [
	roleBtn('Adminlar', cmdData),
	roleBtn('Hamma', cmdData),
];

const normalizeRole = (role = '') => {
	const lower = role.toLowerCase();
	return lower === 'master' || lower === 'admins'
		? lower
		: 'everyone';
};

/** @param { import('../../typings/context').ExtendedContext } ctx */
const addCommandHandler = async (ctx) => {
	const { chat, message, reply } = ctx;
	if (chat.type === 'channel') return null;
	const { id } = ctx.from;

	if (ctx.from.status !== 'admin') {
		return reply(
			'ℹ️ <b>Afsuski, faqat adminlar bu komadadan foydalanishi mumkin.</b>',
			replyOptions
		);
	}

	const { flags, reason: commandName } = Cmd.parse(message);
	if (flags.has('noop')) return null;

	const isValidName = /^!?(\w+)$/.exec(commandName);
	if (!isValidName) {
		return reply(
			'<b>Send a valid command.</b>\n\nExample:\n' +
			'<code>/addcommand rules</code>',
			replyOptions
		);
	}
	const newCommand = isValidName[1].toLowerCase();
	if (preserved.has(newCommand)) {
		return reply('❗️ Siz bu ism ishlata olmaysiz, bu nom egallangan.\n\n' +
			'Boshqasida urinib ko\'ring.');
	}

	const replaceCmd = flags.has('replace');
	const content = message.reply_to_message;

	const cmdExists = await getCommand({ isActive: true, name: newCommand });

	if (!replaceCmd && cmdExists) {
		return ctx.replyWithHTML(
			'ℹ️ <b>This command already exists.</b>\n\n' +
			'/commands - to\'liq komandalar ro\'yxatini ko\'rish.\n' +
			'/addcommand <code>&lt;nom&gt;</code> - komanda yaratish uchun.\n' +
			'/removecommand <code>&lt;nom&gt;</code>' +
			' - komandani olib tashash uchun.',
			Markup.keyboard([ [ `/addcommand -replace ${newCommand}` ] ])
				.oneTime()
				.resize()
				.extra()
		);
	}
	if (cmdExists && cmdExists.role === 'master' && !isMaster(ctx.from)) {
		return ctx.reply(
			'ℹ️ <b>Afsuski, only bu komandani faqat master almashita oladi.</b>',
			replyOptions
		);
	}

	const softReplace = flags.get('replace') === 'soft';
	if (content || softReplace) {
		const role = normalizeRole(flags.get('role'));
		await addCommand({
			id,
			role,
			type: 'copy',
			caption: null,
			isActive: true,
			name: newCommand,
			...softReplace || { content },
		});
		return ctx.replyWithHTML(
			`✅ <b><code>!${isValidName[1]}</code> muvaffaqiyatli saqlandi</b>.\n` +
			'Kim bu komandadan foydalana olishi kerak?',
			inlineKeyboard(roleKbRow({ currentRole: role, newCommand }))
		);
	}

	// eslint-disable-next-line max-len
	return ctx.replyWithHTML('ℹ️ <b>Reply to a message you\'d like to save</b>');
};

module.exports = addCommandHandler;
