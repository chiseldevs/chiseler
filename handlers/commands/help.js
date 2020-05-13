'use strict';
const { Markup } = require('telegraf');
const { homepage } = require('../../package.json');

const message = `\
Salom hurmatli foydalanuvchi!

Men Chisel Devs guruhlarining <b>administrativ</b> botiman va \
Chisel Devs <b>guruhlarini</b> <b>spam va floodchilardan</b> toza saqlashga yordam beraman.

<code>/commands</code> komadasini, ishlatish mumkin bolgan komandalarni ro'yxatini korish uchun yuboring.

Iltimos komandaga uzoq vaqt damovida javob bersam, \
ozgina sabrli bo'ling va menga ortiqcha yozib o'tirmang. \
O'ylab o'tirmay ban berib yuborishim <b>MUMKIN!</b>
`;

/** @param { import('../../typings/context').ExtendedContext } ctx */
const helpHandler = ({ chat, replyWithHTML }) => {
	if (chat.type !== 'private') return null;

	return replyWithHTML(
		message,
		Markup.inlineKeyboard([
			Markup.urlButton('📲 Websaytimiz', homepage)
		]).extra()
	);
};

module.exports = helpHandler;
