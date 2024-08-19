process['env']['NODE_ENV'] = process['env']['NODE_ENV'] || 'development';
require('dotenv').config({ path: `./.env.${process['env']['NODE_ENV']}` });

const route = require('./routes');
const log = require("./config/log");
const database = require('./config/connection');
const TelegramBot = require('node-telegram-bot-api');

const bot = new TelegramBot(process['env']['TELEGRAM_BOT_TOKEN'], { polling: true });

require('./config/scheduledTask')(bot);

// ***************************** CONNECT TO DATABASE *****************************
database.getConnection();

// **************************** INITIALIZE ALL ROUTES ****************************
route(bot);

// ********************************** START BOT **********************************
bot.on('polling_error', log.ERROR);

// ****************************** BOT START LOG **********************************
log.START('🚀🤖 Bot is now running and ready to accept commands! 🚀🤖');
