var knex = require('knex')({
    client: 'sqlite3',
    connection: { filename: './database/ip3Diary.db' },
    useNullAsDefault: true
})

class NotesDAO {
    init() {
        //creates notes table
        knex.schema.hasTable('notes').then(function (exists) {
            if (!exists) {
                return knex.schema.createTable('notes', function (t) {
                    t.increments('noteID').primary();
                    t.string('noteTitle').notNullable();
                    t.string('noteContent').notNullable();
                    t.integer('foreignID');
                    t.foreign('foreignID').references('users.id').deferrable('deferred');
                });
            }
        });
    }
    async upload(req, res) {
        //user input to variables
        const title = req.body.noteTitle;
        const content = req.body.noteContent;
        //writes to notes table
        try {
            await knex('notes').insert({ noteTitle: title, noteContent: content });
            console.log("note added");
        } catch (e) {
            console.log('Something broke!');
        }
    }
    async edit(req, res) {

    }
}
const dao = new NotesDAO();
dao.init();

module.exports = dao;