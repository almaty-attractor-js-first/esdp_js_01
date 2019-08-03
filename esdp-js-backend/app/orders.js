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
        console.log(orderId);
        let order = await db.getOrdersById(orderId);
        console.log(order);
        res.send(order);
    });
    // router.post('/sessions', async (req, res) => {
    //     const user = await User.findOne({username: req.body.username});
    //     if (!user) return res.status(400).send({message: 'User not found'});
    //     const isMatch = await user.checkPassword(req.body.password);
    //     if(!isMatch) return res.status(400).send({message: "Wrong password"});
    //     user.token = nanoid();
    //     user.save().then((result) => {
    //         res.send(result);
    //     });
    // });
    router.post('/orders', async (req, res) => {
        let orderData = req.body;
        db.addOrder(orderData);
        res.send(orderData);
    });
       // router.delete('/sessions', async (req, res) => {
    //     const token = req.get("Authorization");
    //     const success = {message: "Logged out!"};
    //     if(!token) return res.send(success);
    //     const user = await User.findOne({token});
    //     if(!user) return res.send(success);
    //     user.token = nanoid();
    //     await user.save();
    //     res.send(success);
    // });

    router.post('/facebookLogin', async (req, res) => {
        const inputToken = req.body.accessToken;
        const accessToken = config.facebook.appId + "|" + config.facebook.secretKey;
        const debugTokenUrl = `https://graph.facebook.com/debug_token?input_token=${inputToken}&access_token=${accessToken}`;
        try {
            const response = await axios.get(debugTokenUrl);
            console.log(response)

            if(response.data.data.error) {
                return res.status(401).send({message: "facebook token incorrect"});
            }

            if (req.body.id !== response.data.data.user_id) {
                return res.status(401).send({message: "Wrong user ID"});
            }

            let user = await User.findOne({facebookId: req.body.id});
            if(!user) {
                user = new User({
                    username: req.body.email,
                    password: nanoid(),
                    facebookId: req.body.id,
                    displayName: req.body.name

                });
            }
            user.token = nanoid();
            await user.save();

            res.send(user);


        } catch {
            res.status(401).send({message: "facebook token incorrect"});
        }
    });

    return router;
};

module.exports = createRouter;
