const mongoose = require('mongoose');
const { Schema } = mongoose;

const store = new Schema( {
    storeName : String,
    AccessToken : String
});

// const product = new Schema( {
//     title : String,
//     color : String,
//     type : String,
//     price : Number
    
// });

module.exports = mongoose.model('store', store);
// module.exports = mongoose.model('product', product);