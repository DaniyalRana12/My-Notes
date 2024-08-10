const mongoose = require('mongoose')
const { Schema } = mongoose;

const userschema = new Schema({
    name: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    date: {
        type: Date,
        default: Date.now,
    }
});
const User = mongoose.model('user', userschema)
User.createIndexes();
module.exports = User;