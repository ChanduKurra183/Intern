const mongoose = require('mongoose');
const { Schema } = mongoose;



const order = new Schema( {
        title : String,
        color : String,
        type : String,
        price : Number
        
 });

module.exports = mongoose.model('order', order);