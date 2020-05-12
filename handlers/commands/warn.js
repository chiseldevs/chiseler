'use strict';

// Utils
const { parse, strip } = require('../../utils/parse');
const { scheduleDeletion } = require('../../utils/tg');

// Bot
const { replyOptions } = require('../../bot/options');

// DB
const { getUser } = require('../../stores/user');

/** @param { import('../../typings/context').ExtendedContext } ctx */
const warnHandler = async (ctx) => {
	const { message, reply } = ctx;

	if (!message.chat.type.endsWith('group')) {
		return reply(
			'ℹ️ <b>Bu komandani faqat guruhlarda ishlatish mumkin.</b>',
			replyOptions
		);
	}

	if (ctx.from.status !== 'admin') return null;

	const { flags, reason, targets } = parse(message);

	if (targets.length !== 1) {
		return reply(
			'ℹ️ <b>Ogohlantirish uchun bironta foydalanuvchini ko\'rsating.</b>',
			replyOptions
		).then(scheduleDeletion());
	}

	const userToWarn = await getUser(strip(targets[0]));

	if (!userToWarn) {
		return reply(
			'❓ <b>No\'malum foydalanuvchi.</b>\n' +
			'Ularni habarini qayta jo\'natib turib, qayta urinib ko\'ring.',
			replyOptions
		).then(scheduleDeletion());
	}

	if (userToWarn.id === ctx.botInfo.id) return null;

	if (userToWarn.status === 'admin') {
		return reply('ℹ️ <b>Boshqa adminlarni ogohlantira ololmayman.</b>', replyOptions);
	}

	if (reason.length === 0) {
		return reply('ℹ️ <b>Ogohlantirish uchun sabab kerak.</b>', replyOptions)
			.then(scheduleDeletion());
	}

	if (message.reply_to_message) {
		ctx.deleteMessage(message.reply_to_message.message_id);
	}

	return ctx.warn({
		admin: ctx.from,
		amend: flags.has('amend'),
		reason,
		userToWarn,
		mode: 'manual',
	});
};

module.exports = warnHandler;
