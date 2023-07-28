const express = require('express');
const http = require('http');
const { Server } = require("socket.io");

const services = require('./services');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on('connection', async (socket) => {
    console.log('connected');
    emiter(socket);
});

let timer;
function emiter(socket) {
    clearTimeout(timer);

    //I used an iterval because I couldn't find a webhook inside the documentation
    setTimeout(async () => {
        const assetsArray = await services.getAssets();
        if (assetsArray.length) {
            socket.emit('data', assetsArray);
        }
        timer = setInterval(async function () {
            const assetsArray = await services.getAssets();
            if (assetsArray.length) {
                socket.emit('data', assetsArray);
            }
        }, 10000)
    }, 300);
}

const port = 8080;
server.listen(port, () => console.log(`listening in port ${port}`));