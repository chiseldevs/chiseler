'use strict';
const { Markup } = require('telegraf');
const { homepage } = require('../../package.json');

const message = `\
Salom hurmatli foydalanuvchilar!

Men shu guruhning <b>administrativ</b> botiman va \
shu <b>guruhni</b> <b>spam va floodchilardan</b> toza saqlashga yordam beraman

<code>/commands</code> komadasini ishlatish mumkin bolgan komandalarni ro'yxatini korish uchun yuboring.

Iltimos komandaga uzoq vaqt damovida javob bersam, \
menga ortiqcha yozib o'tirmang. Ban berib yuborishim \
<b>MUMKIN!</b>
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
