'use strict';

// Utils
const { isMaster } = require('../../utils/config');
const { link, scheduleDeletion } = require('../../utils/tg');
const { logError } = require('../../utils/log');
const { parse, strip } = require('../../utils/parse');

// Bot
const { replyOptions } = require('../../bot/options');

// DB
const {
	admin,
	getUser,
} = require('../../stores/user');

/** @param { import('../../typings/context').ExtendedContext } ctx */
const adminHandler = async ({ from, message, reply }) => {
	if (!isMaster(from)) return null;

	const { targets } = parse(message);

	if (targets.length > 1) {
		return reply(
			'ℹ️ <b>Ko\'tarish uchun foydalanuvchini ko\'rsating.</b>',
			replyOptions
		).then(scheduleDeletion());
	}

	const userToAdmin = targets.length
		? await getUser(strip(targets[0]))
		: from;

	if (!userToAdmin) {
		return reply(
			'❓ <b>No\'malum foydalanuvchi.</b>\n' +
			'Ularni habarini qayta jo\'natib, qayta urinib ko\'ring.',
			replyOptions
		).then(scheduleDeletion());
	}

	if (userToAdmin.status === 'banned') {
		return reply('ℹ️ <b>Ban qilingan foydalanuvchi admin qilib bo\'lmaydi.</b>', replyOptions);
	}

	if (userToAdmin.status === 'admin') {
		return reply(
			`⭐️ ${link(userToAdmin)} <b>allaqachon admin.</b>`,
			replyOptions
		);
	}

	try {
		await admin(userToAdmin);
	} catch (err) {
		logError(err);
	}

	return reply(`⭐️ ${link(userToAdmin)} <b>admin bo\'ldi.</b>`, replyOptions);
};

module.exports = adminHandler;
