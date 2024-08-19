const { messageController } = require('../controllers');
const processingCommands = require('../config/stateManager');
const { recognizedCommands } = require('../config/constants');

module.exports = (bot) => {
    /**
     * Handles the /start command to initiate interaction with the bot.
     * 
     * @param {Object} msg - The message object received from the Telegram API.
     */
    bot.onText(/\/start/, (msg) => messageController.handleStartCommand(msg, bot));

    /**
     * Handles any incoming message that is not a recognized command and not part of an ongoing interaction.
     * 
     * @param {Object} msg - The message object received from the Telegram API.
     */
    bot.on('message', (msg) => {
        const isRecognizedCommand = recognizedCommands.some((command) => msg['text'].startsWith(command));
        const isProcessing = processingCommands.get(msg['chat']['id']);

        if (isRecognizedCommand || isProcessing) return;

        return messageController.handleUnrecognizedCommand(msg, bot);
    });
};
