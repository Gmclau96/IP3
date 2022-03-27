const mongoose = require('mongoose');

//recipe table schema
const recipeColumns = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please enter a recipe title \n'],
        minLength: 2,
        maxLength: 50
    },
    ingredients: {
        type: String,
        required: [true, 'Please enter the ingredients \n']     
    },
    method: {
        type: String,
        required: [true, 'Please enter the method'],
        minLength: 10
    },
    _email: {
        type: String
    }
})

//writes to recipes table
const recipeDao = mongoose.model('recipe', recipeColumns);

module.exports = recipeDao;