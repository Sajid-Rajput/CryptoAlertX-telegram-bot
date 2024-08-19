const { alertController } = require('../controllers');
const isAuthenticated = require('../auth/auth.middleware');
const processingCommands = require('../config/stateManager');

module.exports = (bot) => {

    /**
     * Handles the /set_alert command to set a price alert for a specific token.
     * 
     * @param {Object} msg - The message object received from the Telegram API.
     * @param {Array} match - The matched elements from the regex for the command.
     */
    bot.onText(/\/set_alert/, async (msg) => {
        await isAuthenticated(msg, bot, async () => {
            processingCommands.set(msg['chat']['id'], true);
            bot.sendMessage(msg['chat']['id'], '🚨 Please provide the name of the cryptocurrency token you want to set an alert for (e.g., ethereum):');
            bot.once('message', async (tokenMsg) => {

                const token = tokenMsg['text'].trim().toLowerCase();
                if (!token) {
                    bot.sendMessage(msg['chat']['id'], '🚨🚫 Invalid token name. Please try again with a valid cryptocurrency token name.');
                    processingCommands.delete(msg['chat']['id']);  // Reset processing state
                    return;
                }
                bot.sendMessage(msg['chat']['id'], `📉 Great! Now, please provide the price threshold for ${token}:`);

                bot.once('message', async (thresholdMsg) => {
                    const threshold = parseFloat(thresholdMsg['text'].trim());
                    if (isNaN(threshold)) {
                        bot.sendMessage(msg['chat']['id'], '🚨🚫 Invalid price threshold. Please try again with a valid number.');
                        processingCommands.delete(msg['chat']['id']);  // Reset processing state
                        return;
                    }
                    await alertController.setAlert(msg, bot, token, threshold);
                    processingCommands.delete(msg['chat']['id']);
                });
            });
        });
    });

    /**
     * Handles the /list_alerts command to list all active alerts for the user.
     * 
     * @param {Object} msg - The message object received from the Telegram API.
     */
    bot.onText(/\/list_alerts/, async (msg) => isAuthenticated(msg, bot, async () => await alertController.listAlerts(msg, bot)));

    /**
     * Handles the /remove_alert command to remove a specific alert by its ID.
     * 
     * @param {Object} msg - The message object received from the Telegram API.
     * @param {Array} match - The matched elements from the regex for the command.
     */
    bot.onText(/\/remove_alert/, async (msg) => {
        await isAuthenticated(msg, bot, async () => {
            processingCommands.set(msg['chat']['id'], true);
            bot.sendMessage(msg['chat']['id'], '🗑 Please provide the ID of the alert you want to remove:');

            bot.once('message', async (alertMsg) => {
                const alertId = alertMsg['text'].trim();
                if (!alertId) {
                    bot.sendMessage(msg['chat']['id'], '🚨🚫 Invalid alert ID. Please try again with a valid alert ID.');
                    return processingCommands.delete(msg['chat']['id']);
                }

                await alertController.removeAlert(msg, bot, alertId);
                processingCommands.delete(msg['chat']['id']);
            });
        });
    });
};