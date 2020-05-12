'use strict';

const R = require('ramda');

// DB
const { listCommands } = require('../../stores/command');

// cfg
const { isMaster } = require('../../utils/config');

const { scheduleDeletion } = require('../../utils/tg');

const masterCommands = `\
<b>Senpai komandalari</b>:
<code>/admin</code> - Foydalanuvchini admin qilish.
<code>/unadmin</code> - Adminlik huquqini olib qo'yish.
<code>/leave &lt;ism yoki id&gt;</code> - Botni gruppadan chiqib ketishga majburlaydi.
<code>/hidegroup</code> - Guruhni <code>/groups</code> ro'yxatidan olib tashash.
<code>/showgroup</code> - Guruhni <code>/groups</code> ro'yxatida ko'rsatish.\n
`;

const adminCommands = `\
<b>Admin komandalari</b>:
<code>/del [sabab]</code> - Ko'rsatilgan habarni o'chirib tashash.
<code>/warn &lt;sabab&gt;</code> - Foydalanuvchini ogohlantiradi.
<code>/unwarn</code> - Oxirgi ogohlantiruvni foydalanuvchidan olib tashlash.
<code>/nowarns</code> - Foydalanuvchini ogohlantirishlardan tozalash.
<code>/ban &lt;sabab&gt;</code> - Foydalanuvchini hamma guruhdan ban berish.
<code>/unban</code> - Foydalanuvchini ban ro'yxatidan olib tashlash.
<code>/user</code> - Foydalanuvchi hozirgi holat va banlarini ko'rsatish.
<code>/addcommand &lt;ism&gt;</code> - komandalar yaratish.
<code>/removecommand &lt;ism&gt;</code> - yaratilgan komandalarni olib tashlash.\n
`;
const userCommands = `\
<b>Hammaga mumkin bo'lgan komandalar</b>:
<code>/staff</code> - Adminlar ro'yxatini ko'rsatish.
<code>/link</code> - Shu guruhning ssilkasini ko'rsatish.
<code>/groups</code> - Bot mavjud bo'lgan gruppalar ro'yxati.
<code>/report</code> - Ko'rsatilgan habarning egasiga shikoyat berish.\n
`;
const role = R.prop('role');
const name = R.prop('name');

/** @param { import('../../typings/context').ExtendedContext } ctx */
const commandReferenceHandler = async (ctx) => {
	const customCommands = await listCommands();

	const customCommandsGrouped = R.groupBy(role, customCommands);
	const userCustomCommands = customCommandsGrouped.everyone
		? '[hamma uchun]\n<code>' +
		customCommandsGrouped.everyone
			.map(name)
			.join(', ') +
		'</code>\n\n'
		: '';

	const adminCustomCommands = customCommandsGrouped.admins
		? '[adminlar uchun]\n<code>' +
		customCommandsGrouped.admins
			.map(name)
			.join(', ') +
		'</code>\n\n'
		: '';

	const masterCustomCommands = customCommandsGrouped.master
		? '[senpai uchun]\n<code>' +
		customCommandsGrouped.master
			.map(name)
			.join(', ') +
		'</code>\n\n'
		: '';

	const customCommandsText = masterCommands.repeat(isMaster(ctx.from)) +
		adminCommands.repeat(ctx.from && ctx.from.status === 'admin') +
		userCommands +
		'\n<b>Yaratilgan komandalar (yozishdan oldin "!" ishlating):</b>\n' +
		masterCustomCommands.repeat(isMaster(ctx.from)) +
		adminCustomCommands.repeat(ctx.from && ctx.from.status === 'admin') +
		userCustomCommands;

	return ctx.replyWithHTML(customCommandsText)
		.then(scheduleDeletion());
};

module.exports = commandReferenceHandler;
