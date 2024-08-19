const log = require('./log');
const mongoose = require('mongoose');

process['env']['NODE_ENV'] = process['env']['NODE_ENV'] || 'development';
require('dotenv').config({ path: `./.env.${process['env']['NODE_ENV']}` });

const mongo = { db_url: process['env']['db_url'], debug: false }

function getConnection() {
  mongoose.connect(String(mongo['db_url']));

  mongoose.connection.on('connected', () => { log.INFO(`🔗🌐 Mongoose default connection 🔌 open to ${mongo['db_url']} 🔗🌐`); });

  mongoose.connection.on('error', (err) => { log.ERROR('❌🚨 Mongoose default connection error: ' + err); });

  mongoose.connection.on('disconnected', () => { log.STOP('Mongoose default connection disconnected'); });

  process.on('SIGINT', () => {
    mongoose.connection.close().then(() => { process.exit(0); }).catch((error) => {
      log.ERROR('❌⛔ Failed to close database connection:', error);
      process.exit(1);
    });
  });
}

module.exports = { getConnection };
