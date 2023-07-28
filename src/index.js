const express = require('express');
const http = require('http');
const { Server } = require("socket.io");

const services = require('./services');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on('connection', async (socket) => {
    console.log('a user connected');

    socket.on('response', async (data) => {
        if (data) {
            const assetsArray = await services.getAssets();
            if(assetsArray.length){
                socket.emit('data', assetsArray);
            }
            
        }
    })
});

const port = 8080;
server.listen(port, () => console.log(`listening in port ${port}`));