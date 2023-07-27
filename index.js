const Express = require('express');

const app = Express();
const port = 8080;

app.get('/api/v1/test', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With")
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({
        data: "ok"
    }));
});


app.listen(port, () => console.log(`listening in port ${port}`));