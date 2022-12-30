const mongoose = require('mongoose');

const messageSchema = {
    email: String,
    message: String,
    channel: String
}; 

const groupSchema = {
    name: String,
    users: [],
    tagLine: String
}

const userSchema = {
    name: String,
    email: String,
    password:String,
    friends: []
}

let Message = mongoose.model("Message", messageSchema);

let Group = mongoose.model('Group', groupSchema);

let User = mongoose.model('User', userSchema);

module.exports = { Message, User, Group }