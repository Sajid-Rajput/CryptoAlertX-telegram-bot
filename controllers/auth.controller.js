const log = require('../config/log');
const User = require('../models/user.model');

/**
 * Register a new user in the system.
 * 
 * @param {Object} msg - The message object received from Telegram.
 * @param {Object} bot - The Telegram bot instance.
 * 
 * This function checks if a user is already registered using their Telegram ID.
 * If the user is not registered, it creates a new user record in the database.
 * Appropriate messages are sent back to the user depending on the outcome.
 */
exports.registerUser = async (msg, bot) => {
    const telegramId = msg['from']['id'];

    try {
        log.START(`🔔🔔 Attempting to register user with Telegram ID: ${telegramId} 🔔🔔`);

        // Check if the user is already registered
        let user = await User.findOne({ telegramId });

        if (user) {
            log.INFO(`📝✍🏻 User ${user['firstName']} ${user['lastName']} is already registered 📝✍🏻`);
            return bot.sendMessage(msg['chat']['id'], `📝✍🏻 Dear ${user['firstName']}! You are already registered! 📝✍🏻`);
        } else {
            // Register a new user
            user = new User({
                telegramId,
                username: msg['from']['username'],
                firstName: msg['from']['first_name'],
                lastName: msg['from']['last_name'],
            });
            await user.save();

            log.CREATE(`🎊🌟 User ${user['firstName']} ${user['lastName']} registered successfully 🎊🌟`);
            return bot.sendMessage(msg['chat']['id'], `🎊🌟 Welcome *${user['firstName']} ${user['lastName']}*! Registration successful! 🎊🌟`);
        }
    } catch (error) {
        log.ERROR(`Error during registration for Telegram ID: ${telegramId}`, error);
        return bot.sendMessage(msg['chat']['id'], '❌🔴 Oops! There was an error during registration. Please try again. ❌🔴');
    }
};
