<p align="center">
  <img src="assets/logo.png" width="180" height="180">
  <h1 align="center">Chiseller</h1>
</p>
Chiseller is a Telegram bot made to help admins manage their groups.

## Features
* Synchronized database across multiple groups.
* Adding admins to the bot.
* Auto-remove and warn channels and groups ads.
* Kick bots added by users.
* Warn and ban users to control the group.
* Commands work with replying, mentioning and ID.
* Removes commands and temporary bot messages.
* Ability to create custom commands.
* Supports plugins.

Overall, keeps the groups clean and healthy to use.

## Commands
Command                 | Role       | Available at | Description
----------------------- | ---------- | ------------ | -----------------
`/admin`                | _Master_   | _Everywhere_ | Makes the user admin in the bot and groups.
`/unadmin`              | _Master_   | _Everywhere_ | Demotes the user from admin list.
`/leave <name\|id>`     | _Master_   | _Everywhere_ | Make the bot to leave the group cleanly.
`/hidegroup`            | _Master_   | _Groups_     | Revoke invite link and hide the group from `/groups` list.
`/showgroup`            | _Master_   | _Groups_     | Make the group accessible via `/groups` list.
`/del [reason]`         | _Admin_    | _Everywhere_ | Deletes replied-to message.
`/warn <reason>`        | _Admin_    | _Groups_     | Warns the user.
`/unwarn`               | _Admin_    | _Everywhere_ | Removes the last warn from the user.
`/nowarns`              | _Admin_    | _Everywhere_ | Clears warns for the user.
`/ban <reason>`         | _Admin_    | _Groups_     | Bans the user from groups.
`/unban`                | _Admin_    | _Everywhere_ | Removes the user from ban list.
`/user`                 | _Admin_    | _Everywhere_ | Shows the status of the user.
`/addcommand <name>`    | _Admin_    | _In-Bot_     | Create a custom command.
`/removecommand <name>` | _Admin_    | _In-Bot_     | Remove a custom command.
`/staff`                | _Everyone_ | _Everywhere_ | Shows a list of admins.
`/link`                 | _Everyone_ | _Everywhere_ | Shows the current group's link.
`/groups`               | _Everyone_ | _Everywhere_ | Shows a list of groups which the bot is admin in.
`/report`               | _Everyone_ | _Everywhere_ | Reports the replied-to message to admins.
`/commands`             | _Everyone_ | _In-Bot_     | Shows a list of available commands.
`/help` \| `/start`     | _Everyone_ | _In-Bot_     | How to use the bot.

All commands and actions are synchronized across all of the groups managed by the owner and they work with **replying**, **mentioning** or **ID** of a user.

If used by reply, `/ban` and `/warn` would remove the replied-to message.

The bot is still in beta phase so feel free to [open issues](https://github.com/genemators/chiseller/issues/new) and ask for features.

---

> Important Note: Under the AGPL-3.0 license, if you're running your own instance, you should add a link to the source [(this repository)](https://github.com/genemators/chiseller) in your bot's bio. If you're modifying this source and making your own bot, you should link to the source of your own version of the bot according to the AGPL-3.0 license. Check [LICENSE](LICENSE) for more info.

`Chiseller` icon is created by Genemator Sakhib.
