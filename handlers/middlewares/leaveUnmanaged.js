'use strict';

// Utils
const { logError } = require('../../utils/log');

const { managesGroup } = require('../../stores/group');

const { chats = {} } = require('../../utils/config').config;

const pkg = require('../../package.json');


const caption = `\
Kechirasiz siz mani yaratuvchimmisiz? \
O'zingizga boshqa bot yaratib dasturlashtirvoling!

Agar qiyin bo'lsa bizning guruhimizga o'tib, \
dasturlashni o'rganing va dasturlang!
`;

const inline_keyboard = [ [ {
	text: 'Guruhimiz',
	url: 'https://t.me/iBlogs_community',
} ] ];

const reply_markup = JSON.stringify({ inline_keyboard });

const gifIds = [
	'xTk9ZBWrma4PIC9y4E',
	'l2Sqc3POpzkj5r8SQ',
	'StaMzjNkq5PqM',
	'fjYDN5flDJ756',
	'3XiQswSmbjBiU'
];

const gifs = gifIds.map(x => `https://media.giphy.com/media/${x}/giphy.gif`);


/**
 * @param {Array} arr An anonymous array
 * @returns {Number} A random number
 */
const randomChoice = arr => arr[Math.floor(Math.random() * arr.length)];


/** @param { import('telegraf').ContextMessageUpdate } ctx */
const leaveUnmanagedHandler = async (ctx, next) => {
	if (
		ctx.chat.type === 'private' ||
		Object.values(chats).includes(ctx.chat.id) ||
		await managesGroup({ id: ctx.chat.id })) {
		return next();
	}

	try {
		await ctx.replyWithVideo(randomChoice(gifs), { caption, reply_markup });
	} catch (err) {
		logError(err);
	}
	await ctx.telegram.leaveChat(ctx.chat.id);
	return next();
};

module.exports = leaveUnmanagedHandler;
