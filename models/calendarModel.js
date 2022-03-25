var knex = require('knex')({
    client: 'sqlite3',
    connection: { filename: './database/ip3Diary.db' },
    useNullAsDefault: true
})

class CalendarDAO {
    init() {
        //creates calendar table
        knex.schema.hasTable('calendar').then(function (exists) {
            if (!exists) {
                return knex.schema.createTable('calendar', function (t) {
                    t.string('eventName').notNullable();
                    t.string('date').notNullable();
                    t.string('notes');
                    t.foreign('foreignID').references('users.id').deferrable('deferred');
                });
            }
        });
    }
    async upload(req, res) {
        //user input to variables
        const eventName = req.body.eventName;
        const date = req.body.date;
        const notes = req.body.notes;
        //writes to calendar table
        try {
            await knex('calendar').insert({ eventName: eventName, date: date, notes: notes });
            console.log("event added");
        } catch (e) {
            console.log('Something broke!');
        }
    }
    async edit(req, res) {

    }
}
const dao = new CalendarDAO();
dao.init();

module.exports = dao;