const fetch = require('node-fetch');
const { handleError } = require('../config/errorHandle');
const { COINGECKO_API_URL } = require('../config/constants');

process['env']['NODE_ENV'] = process['env']['NODE_ENV'] || 'development';
require('dotenv').config({ path: `./.env.${process['env']['NODE_ENV']}` });

class CryptoService {
    constructor(apiUrl = COINGECKO_API_URL) { this['apiUrl'] = apiUrl; }

    async getTokenData(token) {
        try {
            const url = `${this['apiUrl']}/coins/markets?vs_currency=usd&ids=${token}`;
            const options = {
                method: 'GET',
                headers: { accept: 'application/json', 'x-cg-demo-api-key': process['env']['COINGECKO_API_KEY'] },
            };

            const response = await fetch(url, options);
            const responseBody = await response.text();
            if (response['status'] === 200) {
                const data = JSON.parse(responseBody);
                if (data.length === 0) throw new Error(`Token ${token} not found`);

                const tokenData = data[0];
                return {
                    price: tokenData?.['current_price'] || 0,
                    marketCap: tokenData?.['market_cap'] || 0,
                    holders: tokenData?.['total_volume'] || 0,
                    volume24h: tokenData?.['total_volume'] || 0,
                    priceChange24h: tokenData?.['price_change_24h'] || 0,
                    priceChangePercentage24h: tokenData?.['price_change_percentage_24h'] || 0,
                    marketCapChange24h: tokenData?.['market_cap_change_24h'] || 0,
                    marketCapChangePercentage24h: tokenData?.['market_cap_change_percentage_24h'] || 0,
                };
            } else throw new Error(`API responded with status ${response['status']}: ${responseBody}`);
        } catch (error) { return handleError(error); }
    }
}

module.exports = new CryptoService();
