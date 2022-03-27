const res = require('express/lib/response');
const mongoose = require('mongoose');

//notes table schema
const noteColumns = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please enter a title \n']
    },
    content: {
        type: String,
        required: [true, 'Please enter the note content']
    },
    _email: { 
        type: String
     }
})

//writes to notes table
const noteDao = mongoose.model('note', noteColumns);

module.exports = noteDao;