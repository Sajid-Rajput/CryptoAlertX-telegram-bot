const log = require('../config/log');
const User = require('../models/user.model');

/**
 * Middleware to check if a user is authenticated.
 * It checks if the user exists in the database based on their Telegram ID.
 * If the user is not found, it prompts them to register first.
 * If the user is found, it proceeds to the next middleware or controller.
 *
 * @param {Object} msg - The Telegram message object.
 * @param {Object} bot - The Telegram bot instance.
 * @param {Function} next - The next middleware or controller function to execute.
 */

const isAuthenticated = async (msg, bot, next) => {
  const telegramId = msg['from']['id'];

  try {
    const user = await User.findOne({ telegramId });

    if (!user) return bot.sendMessage(msg['chat']['id'], '🚨🚫 Please register first using /register 🚨🚫');
    else next();
  } catch (error) {
    log.ERROR(`Error during authentication for Telegram ID: ${telegramId}`, error);
    return bot.sendMessage(msg['chat']['id'], '❌🔴 An error occurred during authentication. Please try again later. ❌🔴');
  }
};

module.exports = isAuthenticated;
