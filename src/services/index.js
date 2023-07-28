const axios = require('axios');

const coins = ['bitcoin', 'ethereum', 'cardano'];
async function getAssets() {
    let arrayAssets = [];
    try {
        //const infoAsset = await axios.get(`https://data.messari.io/api/v1/assets/${coin}/metrics`);
        const infoAsset = await axios.get(`https://data.messari.io/api/v2/assets`);
        if (infoAsset?.data?.data) 
            arrayAssets = infoAsset?.data?.data;

    } catch (error) {
        console.error(error);
    }

    const cleanAssts = arrayAssets.filter(i => i.slug === coins[0] || i.slug === coins[1] || i.slug === coins[2]);

    return cleanAssts;
}

module.exports = { getAssets };