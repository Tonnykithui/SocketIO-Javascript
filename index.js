const express = require("express");
const http = require("http");
const { Server } = require('socket.io');


const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.get('/', (req,res) => {
    // console.log(__dirname);
    res.sendFile(__dirname + '/index.html');
})


io.on('connection', (socket) => {
    socket["User"] = "Good-yeah";
    console.log('A user has connected ' + socket.User);
    socket.on('disconnect', () => {
        console.log('User has disconnected')
    });

    socket.on('sendingMsg', value => {
        io.emit('chat message', value);
    })
})


server.listen(3000, () => {
    console.log("App started on port 3000");
})