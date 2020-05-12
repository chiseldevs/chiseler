'use strict';

const msgAlreadyDeleted = 'Noto\'gri urinish: o\'chirilishi kerak bo\'lgan habar topilmadi.';

/** @param { import('telegraf').ContextMessageUpdate } ctx */
module.exports = (ctx, next) => {
	ctx.tg.deleteMessage = async (chat_id, message_id) => {
		try {
			return await ctx.tg.callApi('deleteMessage', {
				chat_id,
				message_id
			});
		} catch (err) {
			if (err.description === msgAlreadyDeleted) {
				return false;
			}
			throw err;
		}
	};
	return next();
};
