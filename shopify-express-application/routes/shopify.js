const express = require('express');
const router = express.Router();
const axios = require('axios');
const Store = require('../models/schema')
const mongoose = require('mongoose');




router.get('/Product', (req, res) => {
  let shop = req.query.shop;
  const productId = req.body.id;
  console.log("pid", productId);
  let url = "https://" + shop +"/admin/api/2021-01/products/"+productId+".json";
  // console.log(await Store.findOne({storeName:shop}).AccessToken);
  const header = {
    "X-Shopify-Access-Token": (await Store.findOne({storeName:shop})).AccessToken,
  }

  try {
    const getProductFromStoreResp = await axios.get(url, {headers: header});
    res.send(getProductFromStoreResp.data);
  }catch (error) {
    console.log(error);
    res.send("getting product from store failed");
  }
  
});


router.get("/getProducts", async (req, res) => {
    let shop = req.query.shop;
  
    let url = "https://" + shop +"/admin/api/2021-01/products.json";
    console.log('url', url);
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
      res.send("Adding product in to the store failed");
    }
    
  })

  router.put("/changeProduct", async (req, res) => {
    let shop = req.query.shop;
    const details = req.body;
    const productId = details.product.id;
    console.log('details', )
    let url = "https://" + shop +"/admin/api/2021-01/products/"+productId+".json";
    console.log(await Store.findOne({storeName:shop}).AccessToken);
    const header = {
      "X-Shopify-Access-Token": (await Store.findOne({storeName:shop})).AccessToken,
    }
  
    try {
      const updateProductFromStoreResp = await axios.put(url, details, {headers: header});
      res.send(updateProductFromStoreResp.data);
    }catch (error) {
      console.log(error);
      res.send("Updating product in the store failed");
    }
    
  })

  router.delete("/deleteProduct", async (req, res) => {
    let shop = req.query.shop;
    const productId = req.body.id;
    console.log("pid", productId);
    let url = "https://" + shop +"/admin/api/2021-01/products/"+productId+".json";
    // console.log(await Store.findOne({storeName:shop}).AccessToken);
    const header = {
      "X-Shopify-Access-Token": (await Store.findOne({storeName:shop})).AccessToken,
    }
  
    try {
      const deleteProductFromStoreResp = await axios.delete(url, {headers: header});
      res.send(deleteProductFromStoreResp.data);
    }catch (error) {
      console.log(error);
      res.send("Deleting product from store failed");
    }
    
  })

  module.exports = router;