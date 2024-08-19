const { cryptoController } = require('../controllers');
const isAuthenticated = require('../auth/auth.middleware');
const processingCommands = require('../config/stateManager');

module.exports = (bot) => {

    /**
     * Handles the /get_token command to retrieve data for a specific cryptocurrency token.
     * 
     * @param {Object} msg - The message object received from the Telegram API.
     */
    bot.onText(/\/get_token/, async (msg) => {
        await isAuthenticated(msg, bot, async () => {
            processingCommands.set(msg['chat']['id'], true);

            bot.sendMessage(msg['chat']['id'], '🔍 Please provide the name of the cryptocurrency token you want to get data for (e.g., bitcoin):');

            bot.once('message', async (responseMsg) => {
                const tokenSymbol = responseMsg['text'].trim().toLowerCase();
                if (tokenSymbol) await cryptoController.getTokenData(msg, bot, tokenSymbol);
                else bot.sendMessage(msg['chat']['id'], '🚨🚫 Invalid token name. Please try again with a valid cryptocurrency token name.');
                processingCommands.delete(msg['chat']['id']);
            });
        });
    });
};
