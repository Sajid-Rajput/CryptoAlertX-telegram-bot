# CryptoAlertX - Telegram Bot

🚀 Welcome to **CryptoAlertX** - Your personal assistant for cryptocurrency alerts and live data on Telegram! 🚀

**Telegram Bot Link:** <a href="https://t.me/SajidCryptoDataBot" target="_blank">CryptoAlertX</a>

## 📋 Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Getting Started for Users](#getting-started-for-users)
- [Getting Started for Developers](#getting-started-for-developers)
- [Commands](#commands)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## 📖 Introduction

**CryptoAlertX** is a powerful Telegram bot that allows you to stay updated with live cryptocurrency data, set custom price alerts, and manage your crypto portfolio efficiently. Whether you're a trader or an enthusiast, CryptoAlertX will help you make informed decisions with real-time data and notifications.

## ✨ Features

- 📊 **Live Data:** Fetch real-time data for any cryptocurrency.
- 🚨 **Custom Alerts:** Set price alerts for your favorite tokens.
- 📋 **Manage Alerts:** List, update, and remove your active alerts.
- 🔒 **User Authentication:** Ensures secure access to bot features.
- 🌐 **Integration with CoinGecko API:** For accurate and up-to-date cryptocurrency information.

## 🛠 Getting Started for Users

### 1. Start the Bot
- Simply click on this link: [CryptoAlertX](t.me/SajidCryptoDataBot).
- Hit the **/start** command to begin your journey.

### 2. Register Yourself
- Use the **/register** command to create your account.

### 3. Explore the Features
- Use the commands listed below to interact with the bot and manage your crypto alerts!

## 💻 Getting Started for Developers

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/cryptoalertx.git
cd cryptoalertx
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root of your project and add the following variables:

```env
###################### MongoDB Database ######################
db_url = your_mongodb_url

###################### TELEGRAM BOT CREDENTIALS ######################
TELEGRAM_BOT_TOKEN = your_telegram_bot_token

###################### COINGECKO API ######################
COINGECKO_API_KEY = your_coingecko_api_key
```

### 4. Run the Bot

```bash
node index.js
```

Your bot is now up and running! 🎉

## 📝 Commands

- **/start** - 🚀 Start interacting with the bot and see the welcome message.
- **/register** - 🎉 Register yourself to start using the bot.
- **/get_token** - 🔍 Get live data for a specific cryptocurrency token.
- **/set_alert** - 🚨 Set an alert to be notified when a token's price crosses a specified threshold.
- **/list_alerts** - 📋 List all your active alerts.
- **/remove_alert** - 🗑 Remove an existing alert by its ID.

## 🛠 Environment Variables

This project requires the following environment variables:

```env
###################### MongoDB Database ######################
db_url = your_mongodb_url

###################### TELEGRAM BOT CREDENTIALS ######################
TELEGRAM_BOT_TOKEN = your_telegram_bot_token

###################### COINGECKO API ######################
COINGECKO_API_KEY = your_coingecko_api_key
```

## 📂 Project Structure

```
cryptoalertx/
├── controllers/          # Contains the bot's logic and command handling
├── config/               # Configuration files for database, logging, etc.
├── routes/               # Defines the bot's command routes
├── auth/                 # Authentication middleware
├── models/               # Database models
├── index.js              # Entry point of the bot
└── .env                  # Environment variables
```

## 🤝 Contributing

We welcome contributions from the community! Feel free to fork the project and submit pull requests. Please make sure to follow the coding standards and add relevant tests for any new features.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

🚀 **CryptoAlertX** - Keeping you ahead in the cryptocurrency game! 📈