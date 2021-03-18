var express = require('express');
var router = express.Router();
const Player = require('../models/db');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get('/', async(req, res) => {
  try {
      const players = await Player.find({})
      res.send(players)
      // console.log(players)
      
  }
  catch(err) {
      res.send('error' + err)
  }
  // res.send('get request')
  // console.log('get request..')
})

router.get('/:id', async(req, res) => {
  try {
      const player = await Player.findById(req.params.id)
      res.json(player)
      res.send("Player retrived...")
  }
  catch(err) {
      res.send('error' + err)
  }
  
})

router.post('/', async(req, res) => {
  const player = new Player({
      name: req.body.name,
      team: req.body.team,
      price: req.body.price,
      age: req.body.age
  })
  // console.log(req.body.name)

  try {
      const player1 = await player.save()
      res.send(player1)
  } catch(err) {
      res.send('Error'+ err)
      console.log(err)
  }
})

router.patch('/:id', async(req, res) => {
  try {
      const player = await Player.findById(req.params.id)
      console.log("player", player)
      console.log("team", player.team)
      player.team = req.body.team
      // console.log("team1",player.team)
      const player1 = await player.save()
      res.json(player1)
  }
  catch(err) {
      res.send('Error' + err)
  }
})

router.delete('/:id', async(req, res) => {
  try {
      const player = await Player.findById(req.params.id)
      // player.team = req.body.team
      const player1 = await player.remove()
      res.json(player1)
  }
  catch(err) {
      res.send('Error' + err)
  }
})


module.exports = router;
