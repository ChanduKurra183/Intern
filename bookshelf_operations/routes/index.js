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
    res.status(400).send("Getting books from db failed..!");
    
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
      res.status(400).send("Adding book into the db failed..!");
    
  }
  
});

router.put('/updatebook', async(req, res) => {
  const id = req.query.id;
  // const title = req.body;
  const update = req.body;

  try {
  var book = await Book.where('id', id).save(update,{patch:true});
  res.send(book);
  } 
  catch(error) {
    console.log("Error..", error);
    res.status(400).send("updating book in db failed..!");
  }

});

router.delete('/deletebook', async(req, res) => {
  const id = req.query.id;

  try {
  var book = await Book.where('id', id).destroy();
  res.send('Book removed from the store');
  } 
  catch(error) {
    console.log("Error..", error);
    res.status(400).send("Deleting book from db failed..!");
  }  

});

router.get('/getbook', async(req, res) => {
  const id = req.query.id;

  try {
    let book = await Book.where({'id': id}).fetch();
    res.send(book);
  } catch (error) {
    console.log("Error..", error);
    res.status(400).send("Getting book from db failed..!");
    
  }
});


module.exports = router;
