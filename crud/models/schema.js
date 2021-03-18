const mongoose = require('mongoose');
const {Schema} = mongoose;


const playerdata = new mongoose.Schema({
    name : String,
    team : String,
    price: Number,
    age: Number
});

module.exports = mongoose.model('player', playerdata)