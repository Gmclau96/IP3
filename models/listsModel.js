const mongoose = require('mongoose');

//list table schema
const listColumns = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please enter a title \n']
    },
    item1: {
        type: String,
        required: [true, 'Please enter a list item \n']
    },
    box1: {
        type: Boolean,
        default: false
    },
    item2: {
        type: String
    },
    box2: {
        type: Boolean,
        default: false
    },
    item3: {
        type: String
    },
    box3: {
        type: Boolean,
        default: false
    },
    item4: {
        type: String
    },
    box4: {
        type: Boolean,
        default: false
    },
    item5: {
        type: String
    },
    box5: {
        type: Boolean,
        default: false
    },
    item6: {
        type: String
    },
    box6: {
        type: Boolean,
        default: false
    },
    item7: {
        type: String
    },
    box7: {
        type: Boolean,
        default: false
    },
    item8: {
        type: String
    },
    box8: {
        type: Boolean,
        default: false
    },
    item9: {
        type: String
    },
    box9: {
        type: Boolean,
        default: false
    },
    item10: {
        type: String
    },
    box10: {
        type: Boolean,
        default: false
    },
    _email: {
        type: String
    }
})

//writes to lists table
const listDao = mongoose.model('list', listColumns);

module.exports = listDao;