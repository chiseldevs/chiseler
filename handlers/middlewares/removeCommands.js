'use strict';

const { deleteCommands = 'own' } = require('../../utils/config').config;
const { isCommand } = require('../../utils/tg.js');
const { unmatched } = require('../unmatched');

const shouldDelete = {
	all: () => true,
	none: () => false,
	own: ctx => !ctx.state[unmatched],
};

if (!(deleteCommands in shouldDelete)) {
	throw new Error('`deleteCommands` uchun config dagi mavjud bo\'magan qiymat: ' +
		deleteCommands);
}

const noop = Function.prototype;

/** @param { import('../../typings/context').ExtendedContext } ctx */
const removeCommandsHandler = async (ctx, next) => {
	await next();
	if (
		shouldDelete[deleteCommands](ctx) &&
		isCommand(ctx.message) &&
		ctx.chat.type !== 'private'
	) {
		ctx.deleteMessage().catch(noop);
	}
};

module.exports = removeCommandsHandler;
