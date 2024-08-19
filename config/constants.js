const MENU_MESSAGE = `
💰 *Get Token Data:* Query specific tokens by sending a command like \`/get_token <token_name>\`. I’ll respond with the latest data for the specified token.

📈 *Set Alerts:* Set price alerts by sending \`/set_alert <token_name> <price_threshold>\`. I'll notify you when the token price crosses the specified threshold.

📋 *List Alerts:* List all your active alerts by sending \`/list_alerts\`.

❌ *Remove Alert:* Remove an alert by sending \`/remove_alert <alert_id>\`.
`;

module.exports = {
    recognizedCommands: ['/start', '/register', '/get_token', '/set_alert', '/list_alerts', '/remove_alert', '/cancel'],
    COINGECKO_API_URL: 'https://api.coingecko.com/api/v3',
    menuMessage: MENU_MESSAGE,
}