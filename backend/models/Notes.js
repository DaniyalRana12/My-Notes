const mongoose = require('mongoose')
const { Schema } = mongoose;

const notesschema = new Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'user',
    },
    title: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    tag: {
        type: String,
        default: 'General',
    },
    date: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model("notes", notesschema);