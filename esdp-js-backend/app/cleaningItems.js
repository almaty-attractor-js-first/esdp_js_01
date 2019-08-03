const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Order = require('../models/Order');
const config = require('../config');
const nanoid = require('nanoid');
const axios = require('axios');
const db = require('../db');



const createRouter = () => {
    router.get('/cleaning-items' , async (req , res) => {
        const result = await db.getSubject('cleaningItems');
        res.send(result);
    });



    return router;
};

module.exports = createRouter;
