const axios = require('axios');

async function getAssets() {
    const coins = ['bitcoin', 'ethereum', 'cardano'];
    const arrayAssets = [];
    try {
        for (const coin of coins) {
            const infoAsset = await axios.get(`https://data.messari.io/api/v1/assets/${coin}/metrics`);
            if (infoAsset?.data?.data) {
                const obj = infoAsset?.data?.data;

                //Mock of price, cuze the api don't have the last information
                const price_usd = parseFloat(obj?.market_data?.price_usd);
                const mockNumber = Math.round(Math.random() * 10);

                obj.market_data.price_usd = price_usd + mockNumber;
                arrayAssets.push(obj);
            }
        };
    } catch (error) {
        console.error(error);
    }

    return arrayAssets;
}

module.exports = { getAssets };