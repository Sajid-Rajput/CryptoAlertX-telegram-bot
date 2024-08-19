const { authController } = require('../controllers');

module.exports = (bot) => {

    /**
     * Handles the /register command to register a new user.
     * 
     * @param {Object} msg - The message object received from the Telegram API.
     */
    bot.onText(/\/register/, async (msg) => await authController.registerUser(msg, bot));
};
