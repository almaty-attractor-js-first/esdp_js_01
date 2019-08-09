const express = require('express');
const router = express.Router();
const config = require('../config');
const nanoid = require('nanoid');
const axios = require('axios');
const db = require('../db');

const createRouter = () => {
    router.get('/orders', async (req, res) => {
        let orders = db.getOrders();
        res.send(orders);
    });
    router.get('/orders/:id', async (req, res) => {
        const orderId = req.params.id;
        let order = await db.getOrdersById(orderId);
        res.send(order);
    });
    router.post('/orders', async (req, res) => {
        if(req.query.phone){
            const result = await db.findClient(req.query.phone);
            return res.send(result);
        }
        let orderData = req.body;
        db.addOrder(orderData);
        db.insertClients(orderData);
        res.send(orderData);
    });

    router.put('/orders/:id', async (req, res) => {
        const orderId = req.params.id;
        let data = req.body;
        db.updateOrdersById(orderId, data);
        res.send({message: 'OK'});
    });
    return router;
};

module.exports = createRouter;
