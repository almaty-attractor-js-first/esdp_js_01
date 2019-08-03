const express = require('express');
const router = express.Router();
const config = require('../config');
const nanoid = require('nanoid');
const axios = require('axios');
const db = require('../db');

const createRouter = () => {
    router.get('/orders', async (req, res) => {
        let orders = db.getOrders();
        console.log('router  get orders: ', orders);
        res.send(orders);
    });
    router.get('/orders/:id', async (req, res) => {
        const orderId = req.params.id;
        console.log(orderId);
        let order = await db.getOrdersById(orderId);
        console.log(order);
        res.send(order);
    });
    router.post('/orders', async (req, res) => {
        let orderData = req.body;
        db.addOrder(orderData);
        res.send(orderData);
        console.log('router order: ', orderData);
    });
    return router;
};

module.exports = createRouter;
