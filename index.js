const express = require("express");
const http = require("http");
const { Server } = require('socket.io');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const { User } = require("./model");


const app = express();
const server = http.createServer(app);
const io = new Server(server);

let mongoConnect = async () => {
    await mongoose.connect('mongodb://localhost:27017/chatApp')
                  .then(res => {
                    console.log('Connected to DB');
                  })
                  .catch(err => {
                    throw new Error(err);
                  });
} 
mongoConnect();


app.use(bodyParser.json({ extended:true }));

app.get('/', (req,res) => {
    // console.log(__dirname);
    res.sendFile(__dirname + '/index.html');
})

app.get('/login', (req,res) => {
    res.sendFile(__dirname + '/login.html');
})

app.post('/login', (req, res) => {

})

app.get('/register', (req,res) => {
    res.sendFile(__dirname + '/register.html');
});

app.post('/register', async (req,res) => {
    let newUser = new User({
        name : req.body.name,
        email : req.body.email,
        password : req.body.password
    });

    let savedUser = await newUser.save();
    res.send(savedUser).status(200);
})

io.on('connection', (socket) => {
    socket["User"] = "Good-yeah";

    let dateTimeObj = new Date();
    let hours = dateTimeObj.getHours();
    let minutes = dateTimeObj.getMinutes();
    let time = hours + ":" + minutes;
    let ampm = hours >= 12 ? "pm" : 'am';
    time = time + " " + ampm;

    socket.on('disconnect', () => {
        console.log('User has disconnected')
    });

    socket.on('sendingMsg', (value) => {
        io.emit('chat message', {value, time});
    })
})


server.listen(3000, () => {
    console.log("App started on port 3000");
})