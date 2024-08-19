const log = require('../config/log');
const Alert = require('../models/alert.model');
const cryptoService = require('../services/cypto.service');

/**
 * Set a new alert for a specific token and price threshold.
 * 
 * @param {Object} msg - The message object received from Telegram.
 * @param {Object} bot - The Telegram bot instance.
 * @param {String} token - The name of the token for which the alert is to be set.
 * @param {Number} threshold - The price threshold to trigger the alert.
 * 
 * This function creates a new alert for the specified token and price threshold. If the alert already exists,
 * it notifies the user. If an error occurs during the process, a friendly error message is returned.
 */
exports.setAlert = async (msg, bot, token, threshold) => {
    const chatId = msg['chat']['id'];

    try {
        log.INFO(`🔔🔔 Request to set an alert for token: ${token}, threshold: $${threshold} by chat ID: ${chatId} 🔔🔔`);

        if (!token || !threshold) return bot.sendMessage(chatId, '🚨🚫 Please provide a token and a price threshold. Usage: /set_alert <token_name> <price_threshold> 🚨🚫');

        const tokenData = await cryptoService.getTokenData(token.toLowerCase());

        if (tokenData['error']) return bot.sendMessage(chatId, '🚨🚫 Unable to set alert. The token data could not be retrieved 🚨🚫');

        const existingAlert = await Alert.findOne({ chatId, token: token.toLowerCase(), threshold }).lean();
        if (existingAlert) return bot.sendMessage(chatId, `🔔 You already have an alert set for *${token}* at $${threshold}. 🚨🔄`, { parse_mode: 'Markdown' });

        const newAlert = new Alert({ chatId, token: token.toLowerCase(), threshold: threshold });
        await newAlert.save();

        log.SUCCESS(`🔔✅ Alert successfully set for token: ${token}, threshold: $${threshold} by chat ID: ${chatId} 🔔✅`);
        return bot.sendMessage(chatId, `🔔✅ Alert set for *${token}* when the price crosses $${threshold} 🔔✅`, { parse_mode: 'Markdown' });
    } catch (error) {
        log.ERROR(`Error occurred while setting alert for token: ${token}, threshold: $${threshold} by chat ID: ${chatId}`, error);
        return bot.sendMessage(chatId, '❌🔴 Oops! There was an error setting the alert. Please try again. ❌🔴');
    }
};


/**
 * List all active alerts for the user.
 * 
 * @param {Object} msg - The message object received from Telegram.
 * @param {Object} bot - The Telegram bot instance.
 * 
 * This function retrieves and displays all active alerts for the user.
 * If no alerts are found, it notifies the user.
 */
exports.listAlerts = async (msg, bot) => {
    const chatId = msg['chat']['id'];

    try {
        log.START(`🔔🔔 Request to list all active alerts by chat ID: ${chatId} 🔔🔔`);

        const alerts = await Alert.find({ chatId }).lean();

        if (alerts.length === 0) return bot.sendMessage(chatId, '🔍 You have no active alerts.');

        const alertList = alerts.map((alert, index) => {
            let message = `🚨 <b>Alert ${index + 1}</b>\n\n`;
            message += `- 🔍 <b>Alert_Id:</b> ${alert['_id']}\n`;
            message += `- 💰 <b>Token:</b> ${alert['token']}\n`;
            message += `- ⏳ <b>Threshold:</b> $${alert['threshold']}\n\n`;
            return message;
        }).join('');

        bot.sendMessage(chatId, `📋 Your active alerts:\n\n${alertList}`, { parse_mode: 'HTML' });
        return log.SUCCESS(`✅✨ Successfully listed active alerts for chat ID: ${chatId} ✅✨`);
    } catch (error) {
        log.ERROR(`Error occurred while listing alerts for chat ID: ${chatId}`, error);
        return bot.sendMessage(chatId, '❌🔴 Oops! There was an error listing your alerts. Please try again. ❌🔴');
    }

};


/**
 * Remove a specific alert by alert ID.
 * 
 * @param {Object} msg - The message object received from Telegram.
 * @param {Object} bot - The Telegram bot instance.
 * @param {String} alertId - The ID of the alert to be removed.
 * 
 * This function removes the specified alert by its ID. If the alert is not found,
 * it notifies the user. If an error occurs, a friendly error message is returned.
 */
exports.removeAlert = async (msg, bot, alertId) => {
    const chatId = msg['chat']['id'];

    try {
        log.INFO(`🔔🔔 Request to remove alert with ID: ${alertId} by chat ID: ${chatId} 🔔🔔`);
        if (!alertId) return bot.sendMessage(chatId, '🚨🚫 Please provide an alert ID. Usage: /remove_alert <alert_id> 🚨🚫');

        const alert = await Alert.findOneAndDelete({ _id: alertId, chatId });
        if (!alert) return bot.sendMessage(chatId, `🚨 No alert found with ID: *${alertId}*`);

        log.DELETE(`🧹🗑️ Alert with ID: ${alertId} successfully removed by chat ID: ${chatId} 🧹🗑️`);
        return bot.sendMessage(chatId, `🧹🗑️ Alert with ID: ${alertId} has been removed 🧹🗑️`);
    } catch (error) {
        log.ERROR(`Error occurred while removing alert with ID: ${alertId} by chat ID: ${chatId}`, error);
        return bot.sendMessage(chatId, '❌🔴 Oops! There was an error removing the alert. Please try again. ❌🔴');
    }
};