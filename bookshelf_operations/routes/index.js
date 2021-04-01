var express = require('express');
var router = express.Router();
const Book = require('../models/schema');
const knex = require('../db').knex;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/getbooks', async(req, res) => {
  
  try {
    let books = await Book.fetchAll();
    res.send(books);
  } catch (error) {
    console.log("Error..", error);
    res.send({code:400, error});
    
  }
});

router.post('/addbook', async(req, res) => {
  const title = req.body.title;
  const author = req.body.author;

  console.log('title..', title);
  console.log('author...', author);

  try {
    var book = await Book.forge({'title':title, 'author':author}).save();
    res.send(book);
    
  } catch (error) {
      console.log("Error..", error);
      res.send({code:400, error});
    
  }
  
});

router.put('/updatebook', async(req, res) => {

});

router.delete('/deletebook', async(req, res) => {

});


module.exports = router;
