// @ts-check
'use strict';

const dedent = require('dedent-js');
const ms = require('millisecond');

const { context } = require('../bot');
const { escapeHtml, link } = require('../utils/tg');
const {
	expireWarnsAfter = Infinity,
	numberOfWarnsToBan,
} = require('../utils/config').config;
const { warn } = require('../stores/user');
const ban = require('./ban');

const isNewerThan = date => warning => warning.date >= date;

const cmp = (a, b) => Math.sign(a - b);

module.exports = async ({ admin, amend, reason, userToWarn }) => {
	const by_id = admin.id;
	const date = new Date();

	const { warns } = await warn(
		userToWarn,
		{ by_id, date, reason },
		{ amend }
	);

	// @ts-ignore
	const recentWarns = warns.filter(isNewerThan(date - ms(expireWarnsAfter)));

	const count = {
		'-1': recentWarns.length + '/' + numberOfWarnsToBan,
		0: `${recentWarns.length}/${numberOfWarnsToBan}, <b>oxirgi ogohlantiruv!</b>`,
		1: `${numberOfWarnsToBan} cha ogohlantiruv olgani uchun <b>haydab yuvorildi</b>!`
	}[cmp(recentWarns.length + 1, numberOfWarnsToBan)];

	const warnMessage = dedent(`
		⚠️ ${link(admin)} ${link(userToWarn)} <b>ni quyidagi qoida buzarlik uchun ogohlantiradi</b>:

		${escapeHtml(reason)} (${count})`);

	if (recentWarns.length >= numberOfWarnsToBan) {
		await ban({
			admin: context.botInfo,
			reason: 'Ogohlantirishlar yuqori qiymatiga yetdi',
			userToBan: userToWarn,
		});
	}

	return warnMessage;
};
