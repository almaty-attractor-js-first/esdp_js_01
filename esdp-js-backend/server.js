const app = require('express')();
const db = require("./db");
const cors = require('cors');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;
const bodyParser = require('body-parser');
const jsonRouter = require('express-json-rpc-router');
const cors = require('cors');
const db = require('./db');
const orders = require('./app/orders');
const express = require('express');

const controller = {
    async getOrders({params}) {
        return await db.get('orders', null, params.token);
    },
    async createOrder({params}) {
        return await db.post('order', params.data, params.token);
    },
    async getCleaningTypes({params}) {
        return await db.get('cleaningItems')
    },
    async getUsers({params}) {
        return await db.get('users', params.token);
    },
    async createUser({params}) {
        return await db.post('users', params.data, params.token);
    }
};

app.use(express.json());
app.use(express.static('public'));
app.use(cors());
app.use(bodyParser.json());
app.use('/' , orders());
// app.use(jsonRouter({
//     methods: controller,
//     onError(e) {
//         console.log('Omg error occurred!', e)
//     }
// }));


app.listen(8000, () => console.log('Example app listening on port 8000'));
app.use(jsonRouter({ methods: controller }));
app.listen(8001, () => console.log('Example app listening on port 8001'));

