'use strict';

/** @param { import('../typings/context').ExtendedContext } ctx */
const unmatchedHandler = ctx => {
	ctx.state[unmatchedHandler.unmatched] = true;
	if (ctx.chat && ctx.chat.type === 'private') {
		ctx.reply('Uzr, men sizni chunolmadim, yordam kerak bo\'lsa /help yozib ko\'ring.');
	}
};

unmatchedHandler.unmatched = Symbol('unmatchedHandler.unmatched');

module.exports = unmatchedHandler;
