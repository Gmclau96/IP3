var knex = require('knex')({
    client: 'sqlite3',
    connection: { filename: './database/ip3Diary.db' },
    useNullAsDefault: true
})

class ListsDAO {
    init() {
        //creates notes table
        knex.schema.hasTable('lists').then(function (exists) {
            if (!exists) {
                return knex.schema.createTable('lists', function (t) {
                    t.increments('listID').primary();
                    t.string('listTitle').notNullable();
                    t.string('list1').notNullable();
                    t.string('list2');
                    t.string('list3');
                    t.string('list4');
                    t.string('list5');
                    t.string('list6');
                    t.string('list7');
                    t.string('list8');
                    t.string('list9');
                    t.string('list10');
                    t.integer('foreignID');
                    t.foreign('foreignID').references('users.id').deferrable('deferred');
                });
            }
        });
    }
    async upload(req, res) {
        //user input to variables
        const title = req.body.listTitle;
        const item1 = req.body.listItem1;
        const item2 = req.body.listItem2;
        const item3 = req.body.listItem3;
        const item4 = req.body.listItem4;
        const item5 = req.body.listItem5;
        const item6 = req.body.listItem6;
        const item7 = req.body.listItem7;
        const item8 = req.body.listItem8;
        const item9 = req.body.listItem9;
        const item10 = req.body.listItem10;
        //writes to lists table
        try {
            await knex('lists').insert({ listTitle: title, list1: item1, list2: item2, list3: item3, list4: item4, list5: item5, list6: item6, list7: item7, List8: item8, list9: item9, list10: item10 });
            console.log("list added");
        } catch (e) {
            console.log('Something broke!');
        }
    }
    async edit(req, res) {

    }
}
const dao = new ListsDAO();
dao.init();

module.exports = dao;