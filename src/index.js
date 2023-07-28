const express = require('express');
const http = require('http');
const { Server } = require("socket.io");

const services = require('./services');
const utils = require('./utils');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

let dataAssets = [], loadingAPI = false

// I load just one time the API cuze sometimes it have problems to ask consecutives request
async function initial() {
    if (!loadingAPI) {
        loadingAPI = true;
        const assetsArray = await services.getAssets();
        if (assetsArray.length) {
            dataAssets = assetsArray;
            loadingAPI = false;
        }
    }
}

io.on('connection', async (socket) => {
    console.log('connected');
    await initial();
    socket.emit('data', dataAssets);

    //I used an iterval because I couldn't find a webhook inside the documentation
    interval(socket);
});

let timer;
async function interval(socket) {
    clearTimeout(timer);
    timer = setInterval(async function () {
        //I created a mock to no ask many request to the API
        const assetsArray = utils.mockData(dataAssets);
        if (assetsArray.length) {
            socket.emit('data', assetsArray);
        }
    }, 5000)
}

const port = 8080;
server.listen(port, () => {
    console.log(`listening in port ${port}`)
});