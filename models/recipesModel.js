var knex = require('knex')({
    client: 'sqlite3',
    connection: { filename: './database/ip3Diary.db' },
    useNullAsDefault: true
})

class RecipesDAO {
    init() {
        //creates notes table
        knex.schema.hasTable('recipes').then(function (exists) {
            if (!exists) {
                return knex.schema.createTable('recipes', function (t) {
                    t.increments('recipeID').primary();
                    t.string('recipeTitle');
                    t.string('recipeIngredients');
                    t.string('recipeMethod');
                    t.integer('foreignID');
                    t.foreign('foreignID').references('users.id').deferrable('deferred');
                });
            }
        });
    }
    async upload(req, res) {
        //user input to variables
        const recipeTitle = req.body.recipeTitle;
        const ingredients = req.body.recipeIngredients;
        const method = req.body.recipeMethod;
        //writes to recipes table
        try {
            await knex('recipes').insert({ recipeTitle: recipeTitle, recipeIngredients: ingredients, recipeMethod: method });
            console.log("recipe added");
        } catch (e) {
            console.log('Something broke!');
        }
    }
    async edit(req, res) {

    }
}
const dao = new RecipesDAO();
dao.init();

module.exports = dao;