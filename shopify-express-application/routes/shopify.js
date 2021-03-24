const express = require('express');
const router = express.Router();
const axios = require('axios');
const Store = require('../models/schema')
const mongoose = require('mongoose');




router.get('/', (req, res) => {
    res.send('Hello World..!');
});


router.get("/getProducts", async (req, res) => {
    let shop = req.query.shop;
  
    let url = "https://" + shop +"/admin/api/2021-01/products.json";
    console.log(await Store.findOne({storeName:shop}).AccessToken);
    const header = {
      "X-Shopify-Access-Token": (await Store.findOne({storeName:shop})).AccessToken,
    }
  
    try {
      const getProductsFromStoreResp = await axios.get(url, {headers: header});
      res.send(getProductsFromStoreResp.data);
    }catch (error) {
      console.log(error);
      res.send("getting products from store failed");
    }
    
  })
  
  router.post("/addProduct", async (req, res) => {
    let shop = req.query.shop;
    let product = req.body
  
    let url = "https://" + shop +"/admin/api/2021-01/products.json";
    const store = await Store.findOne({storeName:shop})
    const header = {
      "X-Shopify-Access-Token": store.AccessToken,
    }
  
    try {
      const Resp = await axios.post(url,product, {headers: header});
      res.send(Resp.data);
    }catch (error) {
      console.log(error);
      res.send("getting products from store failed");
    }
    
  })

  router.put("/changeProduct", async (req, res) => {
    let shop = req.query.shop;
  
    let url = "https://" + shop +"/admin/api/2021-01/products/{product_id}.json";
    console.log(await Store.findOne({storeName:shop}).AccessToken);
    const header = {
      "X-Shopify-Access-Token": (await Store.findOne({storeName:shop})).AccessToken,
    }
  
    try {
      const getProductsFromStoreResp = await axios.get(url, {headers: header});
      res.send(getProductsFromStoreResp.data);
    }catch (error) {
      console.log(error);
      res.send("getting products from store failed");
    }
    
  })

  module.exports = router;