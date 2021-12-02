/**
 * @file Default Bot Mention Command
 * @author Naman Vrati
 * @since 3.0.0
 */

const { prefix } = require("../config.json");

module.exports = {
	/**
	 * @description Executes when the bot is pinged.
	 * @author Naman Vrati
	 * @param {Object} message The Message Object of the command.
	 */

	async execute(message) {
		return message.channel.send(
			`Bonjour ${message.author}! Mon préfixe est \`${prefix}\`, tu peux obtenir de l'aide en faisait \`${prefix}help\`.`
		);
	},
};
