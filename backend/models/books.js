const mongoose = require('mongoose');


const bookSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    author: { type: String },
    bookName: { type: String },
    date: { type: Date },
    genre: { type: String },
    rank: { type: String }

});

module.exports = Books = mongoose.model('Books', bookSchema);