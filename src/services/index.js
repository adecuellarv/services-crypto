const axios = require('axios');

async function getAssets() {
    const coins = ['bitcoin', 'ethereum', 'cardano'];
    const arrayAssets = [];
    for (const coin of coins) {
        const infoAsset = await axios.get(`https://data.messari.io/api/v1/assets/${coin}/metrics/market-data`);
        if (infoAsset?.data?.data) {
            arrayAssets.push(infoAsset?.data?.data);
        }
    };

    return arrayAssets;
}

module.exports = { getAssets };