// @ts-check
'use strict';

// Bot
const { replyOptions } = require('../../bot/options');

const { admin } = require('../../stores/user');
const { addGroup } = require('../../stores/group');
const { isMaster } = require('../../utils/config');

/** @param { import('telegraf').Context } ctx */
const addedToGroupHandler = async (ctx, next) => {
	const msg = ctx.message;

	const wasAdded = msg.new_chat_members.some(user =>
		user.username === ctx.me);
	if (wasAdded && isMaster(ctx.from)) {
		await admin(ctx.from);
		const link = ctx.chat.username
			? `https://t.me/${ctx.chat.username.toLowerCase()}`
			: await ctx.exportChatInviteLink().catch(() => '');
		if (!link) {
			await ctx.replyWithHTML(
				'⚠️ <b>Guruhga taklif qilish ssilkasini eksport qilolmadi.</b>\n' +
				'Quyidagi guruh /groups ro\'yxatida endi ko\'rinmaydi.\n' +
				'\n' +
				'Agar bu sizning aybingiz bo\'lmasa, ' +
				'menda adminlik huquqi borligiga ishonch komil qiling, ' +
				'va keyin /showgroup komadasini qayta ishga tushiring.'
			);
		}
		const { id, title, type } = ctx.chat;
		await addGroup({ id, link, title, type });
		ctx.reply(
			'🛠 <b>Xo\'sh, bugundan men bu guruhda sardorman. O\'zingiz bor bilimingizni ko\'rsating... 😉</b>',
			replyOptions
		);
	}

	return next();
};

module.exports = addedToGroupHandler;
