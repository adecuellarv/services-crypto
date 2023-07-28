const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('message', (data) => {
        console.log(data);
        //if(data){
            socket.emit('data','envio de datos');
        //}
    })
});

const port = 8080;
server.listen(port, () => console.log(`listening in port ${port}`));