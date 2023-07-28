function mockData(data) {
    const arrayAssets = [];
    for (const item of data) {
        if (item) {
            const obj = item;

            //Mock of price, cuze the api don't have the last information
            const price_usd = parseFloat(obj?.metrics?.market_data?.price_usd);
            const mockNumber = Math.round(Math.random() * 10);

            obj.metrics.market_data.price_usd = price_usd + mockNumber;
            arrayAssets.push(obj);
        }
    };

    return arrayAssets;
}

module.exports = { mockData };