const express = require('express');
const router = express.Router();
const axios = require('axios');
const Store = require('../models/schema')
const mongoose = require('mongoose');

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

  router.get("/getOrders", async(req, res) => {
    let shop = req.query.shop;
    let url = "https://74dffbe019dd03437bda9608f9938ce8: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@closestone.myshopify.com/admin/api/2021-01/orders.json?status=any";
    const header = {
      'Content-Type': 'application/json',
    }
    try {
      const getOrders = await axios.get(url, {headers: header});
      res.send(getOrders.data);
    }
    catch (error) {
      console.log(error);
      res.send("failed to fetch orders from store");
    }

  })

  router.post("/createOrder", async(req, res) => {
    console.log('in create..')
    let order = req.body;
    let url = "https://74dffbe019dd03437bda9608f9938ce8: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@closestone.myshopify.com/admin/api/2021-01/orders.json";
    const header = {
      'Content-Type': 'application/json',
    }
    console.log('order..', order);
    try {
      const createOrder = await axios.post(url, order, {headers: header});
      console.log('createorder', createOrder.data);
      res.send(createOrder.data);
    }
    catch (error) {
      console.log(error);
      res.send("failed to create an order in store");
    }

  })

  router.put("/updateOrder", async(req, res) => {
    const details = req.body;
    let orderId = details.order.id;
    let url = "https://74dffbe019dd03437bda9608f9938ce8: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@closestone.myshopify.com/admin/api/2021-01/orders/"+orderId+".json";
    const header = {
      'Content-Type': 'application/json',
    }
    try {
      const updateOrder = await axios.put(url, details, {headers: header})
      res.send(updateOrder.data);
    }
    catch (error) {
      console.log(error);
      res.send("failed to update the order");
    }

  })

  router.delete("/deleteOrder", async(req, res) => {
    const details = req.body;
    let orderId = details.order.id;
    console.log('id', orderId);
    let url = "https://74dffbe019dd03437bda9608f9938ce8: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@closestone.myshopify.com/admin/api/2021-01/orders/"+orderId+".json";
    const header = {
      'Content-Type': 'application/json',
    }
    try {
      const deleteOrder = await axios.delete(url, details, {headers: header})
      res.send(deleteOrder.data);
    }
    catch (error) {
      console.log(error);
      res.send("failed to delete the order");
    }

  })

  module.exports = router;


  // https://74dffbe019dd03437bda9608f9938ce8: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@closestone.myshopify.com/admin/api/2021-01/orders.json