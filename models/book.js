const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author:{
        type: String,
        required: true,
    },
    publishDate:{
        type: Date,
        required: true
    },
    pageCount: {
        type: Number,
        required: true
    },
    description: {
        type: String,
    },
})

module.exports = mongoose.model('Book', bookSchema);