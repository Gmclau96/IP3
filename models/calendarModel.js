const res = require('express/lib/response');
const mongoose = require('mongoose');

//calendar table schema
const calendarColumns = new mongoose.Schema({
    eventName: {
        type: String,
        required: [true, 'Please enter a title \n']
    },
    date: {
        type: Date,
        trim: true,
        required: [true, 'Please enter the event date']
    },
    note: {
        type: String
    },
    priority: {
        type: Number,
    },
    _email: {
        type: String
    }
})

//writes to calendar table
const calendarDao = mongoose.model('calendar', calendarColumns);

module.exports = calendarDao;