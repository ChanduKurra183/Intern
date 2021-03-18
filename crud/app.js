const express = require('express');
const mongoose = require('mongoose');
const app = express(); 

const url = 'mongodb://localhost/IPL'
mongoose.connect(url, {useNewUrlParser:true})
const connec = mongoose.connection



connec.on('open', () =>{
    console.log('Connected to db...')
})

app.use(express.json())

const router = require('./routes/players')
app.use('/players',router)


app.listen(3000, () => {
    console.log('Server Started...!')
})

// for insert(create)
// app.post('/', (req, res){
//     res.send('Post method')
// });

 
// // for display(read)
// app.get('/', (req,res) => {
//     res.send("get method")
// });

// // to change(update)
// app.post('/', (req, res){
//     res.send('Post method')
// });

// // to delete(delete)
// app.post('/', (req, res){
//     res.send('Post method')
// });
