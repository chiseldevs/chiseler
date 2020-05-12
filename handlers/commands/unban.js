'use strict';

// Utils
const { displayUser, link, scheduleDeletion } = require('../../utils/tg');
const { logError } = require('../../utils/log');
const { parse, strip } = require('../../utils/parse');

// Bot
const { replyOptions } = require('../../bot/options');

// DB
const { listGroups } = require('../../stores/group');
const { getUser, unban } = require('../../stores/user');

const noop = Function.prototype;

/** @param { import('../../typings/context').ExtendedContext } ctx */
const unbanHandler = async ({ from, message, reply, telegram }) => {
	if (!from || from.status !== 'admin') return null;

	const { targets } = parse(message);

	if (targets.length !== 1) {
		return reply(
			'ℹ️ <b>Bandan olmoqchi bo\'lgan foydalanuvchini ko\'rsating.</b>',
			replyOptions
		).then(scheduleDeletion());
	}

	const userToUnban = await getUser(strip(targets[0]));

	if (!userToUnban) {
		return reply(
			'❓ <b>No\'malum foydalanuvchi.</b>',
			replyOptions
		).then(scheduleDeletion());
	}


	if (userToUnban.status !== 'banned') {
		return reply('ℹ️ <b>Foydalanuvchiga ban berilmagan.</b>', replyOptions);
	}

	const groups = await listGroups();

	const unbans = groups.map(group =>
		telegram.unbanChatMember(group.id, userToUnban.id));

	try {
		await Promise.all(unbans);
	} catch (err) {
		logError(err);
	}

	try {
		await unban(userToUnban);
	} catch (err) {
		logError(err);
	}

	telegram.sendMessage(
		userToUnban.id,
		'♻️ Siz /groups ro\'yxatidagi hamma guruhlarning banidan olindingiz!'
	).catch(noop);
	// it's likely that the banned person haven't PMed the bot,
	// which will cause the sendMessage to fail,
	// hance .catch(noop)
	// (it's an expected, non-critical failure)


	return reply(`♻️ ${link(from)} ` +
		`${displayUser(userToUnban)} <b>ni banlarini yechdi</b>.`, replyOptions);
};

module.exports = unbanHandler;
