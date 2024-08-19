const cron = require('node-cron');
const log = require('../config/log');
const Alert = require('../models/alert.model');
const cryptoService = require('../services/cypto.service');

module.exports = (bot) => {
    // Schedule the cron job to run every 2 minutes
    cron.schedule('*/2 * * * *', async () => {
        try {
            log.START('🔔🔔 Cron job started: Checking alerts for price thresholds 🔔🔔');
            const alerts = await Alert.find();

            for (const alert of alerts) {
                try {
                    const tokenData = await cryptoService.getTokenData(alert['token']);
                    if (tokenData.price >= alert['threshold']) {
                        bot.sendMessage(
                            alert['chatId'],
                            `⚡️🔔 *${alert['token']}* 🚀 has exceeded your set threshold of $${alert['threshold']}! 📈 Current price: $${tokenData['price']} 💰`,
                            { parse_mode: 'Markdown' }
                        );

                        log.INFO(`🔔✅ Alert triggered for token: ${alert['token']}, threshold: $${alert['threshold']}, chat ID: ${alert['chatId']} 🔔✅`);
                        await Alert.findByIdAndDelete(alert['_id']);
                        log.DELETE(`🧹🗑️ Alert with ID: ${alert['_id']} successfully removed after triggering 🧹🗑️`);
                    }
                } catch (error) {
                    log.ERROR(`🚨🚫 Error processing alert for token: ${alert['token']}, chat ID: ${alert['chatId']} 🚨🚫`, error);
                }
            }

            log.SUCCESS('✅✨ Cron job completed: Finished checking alerts for price thresholds ✅✨');
        } catch (error) { log.ERROR('🚨🚫 Error in cron job: Failed to check alerts 🚨🚫', error); }
    });
};
