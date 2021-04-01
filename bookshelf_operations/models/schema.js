const knex = require('../db').knex;
const bookshelf = require('bookshelf')(knex);

const book = bookshelf.Model.extend( {
    tableName :'books'
});


module.exports = book;