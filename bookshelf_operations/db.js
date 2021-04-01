const knex = require('knex')({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'Kchandu@123',
        database: 'bookshelf',
        charset: 'utf8'
    }
});

module.exports.knex = knex;