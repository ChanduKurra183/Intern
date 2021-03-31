const mongoose = require('mongoose');
const { Schema } = mongoose;



const product = new Schema( {
    "sku":String,
    "product": {
        "id":String,
        "title": String,
        "body_html": String,
        "vendor": String,
        "product_type": String,
        "tags": Array,
        "price": Number,
        "status": String,
        
            
     
           
       
        
    }
        
 });

module.exports = mongoose.model('product', product);