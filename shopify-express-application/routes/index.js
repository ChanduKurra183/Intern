var path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })
var express = require('express');
const crypto = require('crypto');
var router = express.Router();
const cookie = require('cookie');
const querystring = require('querystring');
const CryptoJS = require('crypto-js')
const axios = require('axios');
const Store = require('../models/schema')
const mongoose = require('mongoose');

const url = 'mongodb://localhost/Shopifydb'
mongoose.connect(url, {useNewUrlParser:true})
const connec = mongoose.connection;

let nonce = crypto.randomBytes(16).toString('base64');
// let nonce1 = String(nonce);
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// install route
router.get('/install', async(req, res, next) => {
  const shop = req.query.shop;
  const api_key = process.env.SHOPIFY_API_KEY;
  const app_secret = process.env.SHOPIFY_API_SECRET;
  const scope = process.env.scope;
  const redirect_uri = "https://ac868e6fbdab.ngrok.io/callback";
  const access_mode = "pre-user";
  const state = nonce;

  const url = `https://${shop}.myshopify.com/admin/oauth/authorize?client_id=${api_key}&scope=${scope}&redirect_uri=${redirect_uri}&state=${state}&grant_options[]=${access_mode}`;

  res.cookie('state', state);
  console.log('state in install: ', state)
  
      res.redirect(url);

  
});

router.get('/callback', async(req, res) => {
  console.log('Callback');
  const { shop, hmac, code, state } = req.query;
  // const shop = req.query.shop;
  const apiKey = process.env.SHOPIFY_API_KEY;
  const apiSecret = process.env.SHOPIFY_API_SECRET;
  console.log('shop',shop);
  console.log('hmac', hmac);
  console.log('code', code);
  console.log(state);
  // const stateCookie = cookie.parse(req.headers.cookie).state;
  // stateCookie = String(stateCookie);
  // console.log('in call back', stateCookie);
  const regular_expression = /^[a-z\d_.-]+[.]myshopify[.]com$/
  ;

  // // nonce check
  // if (state !== stateCookie) {
  //   return res.status(403).send('Request origin cannot be verified');
  // }

  // // to check shop 
  if (shop.match(regular_expression)) {
    console.log('Expression matched');
  }
  else {
    console.log("expression doesn't match");
  }

  if (hmac) {
    const map = Object.assign({}, req.query);
    console.log('map', map);
    delete map['hmac'];
    console.log('map', map);
    let rebuildString= "";
    const val = Object.keys(map).sort();
    val.map((key)=>{
      rebuildString += `${key}=`+map[key]+"&"
    })
    rebuildString = rebuildString.slice(0,rebuildString.length-1);
    console.log('message', rebuildString);
    // const providedHmac = Buffer.from(hmac, 'utf-8');
    // console.log('providedHmac', providedHmac);
    var hash = CryptoJS.HmacSHA256(rebuildString, apiSecret);
        
    console.log('generatedhash', hash);

    if (hash.toString() != hmac) {
      return res.status(400).send('HMAC validation failed');
    }

    const accessToken = await axios({
      method: 'post',
      url: `https://${shop}/admin/oauth/access_token`,
      headers : {
        'Content-Type':'application/json',
        'Accept':'application/json'
      },
      data: {
        client_id: apiKey,
        client_secret: apiSecret,
        code,
      }
  });
    res.status(200).send('access retrived');
    console.log('access token', accessToken.data.access_token);
    const store = {
      storeName: shop,
      AccessToken: accessToken.data.access_token
    }
    console.log('store', store);
  const pair = new Store(store);

    try {
      let Store1 = await pair.save();

    } catch(err) {
      res.send('Error'+ err)
    }
    
  }
   else {
    res.status(400).send('Required parameters missing');
  }
});



module.exports = router;
