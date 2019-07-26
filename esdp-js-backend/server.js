// const express = require('express');
// const cors = require('cors');
// const mongoose = require('mongoose');
// const PORT = 8000;
// const users = require('./app/users');
// const config = require("./config");
// const app = require('express')();
// const bodyParser = require('body-parser');
// const jsonRouter = require('express-json-rpc-router');
//
// const controller = {
//     testMethod({ username }) {
//         console.log('username: ', username);
//         return ['example data 1', 'example data 2'];
//     },
//     getOrders(id) {
//         return db.get('orders',id);
//     }
// };
//
// app.use(express.json());
// app.use(cors());
// app.use(express.static('public'));
// app.use(bodyParser.json());
// app.use(jsonRouter({ methods: controller }));
// app.listen(8001, () => console.log('Example app listening on port 8001'));
const app = require('express')();
const cors = require('cors');
const bodyParser = require('body-parser');
const jsonRouter = require('express-json-rpc-router');

const controller = {
    testMethod({ username }) {
        console.log('username: ', username);
        return ['example data 1', 'example data 2']
    },

};

app.use(bodyParser.json());
app.use(jsonRouter({ methods: controller }));
app.listen(8001, () => console.log('Example app listening on port 8001'));


let db = {
    get: (subject, id, token) => {
        if (!id) {
            if (subject === 'orders') {
                const user = db[subject].find((element) => {return element.token === token});
                if (user.role === 'admin' || user.role === 'master') {
                    return db[subject];
                } else {
                    return {message: "only master and admin can fetch orders"}
                }
            } else if (subject === 'users'){
                if (user.role === 'admin') {
                    return db[subject];
                } else {
                    return {message: "only admin can fetch users"}
                }
            }

        } else {
            const item = db[subject].find((element) => {return element.id === id});
            const user = db[subject].find((element) => {return element.token === token});
            if (subject === 'orders') {
                if (user.role === 'admin' || user.role === 'master') {
                    return item;
                } else  if (user.role === 'user' && user.id === item.client) {
                    return item;
                } else {
                    return {message: "this is not your order"};
                }
            } else if (subject === 'users'){
                if (user.role === 'admin' || user.role === 'courier') {
                    return item;
                } else {
                    return {message: "only admin can fetch users"}
                }
            }
        }
    },
    post: (subject, data, token) => {
        if (data) {
            if (subject === 'orders') {
                const user = db[subject].find((element) => {return element.token === token});
                if (user.role === 'admin' || user.role === 'user') {
                    data.date = new Date();
                    db[subject].push(data);
                } else {
                    return {message: "only user and admin can create orders"}
                }
            } else if (subject === 'users') {
                db[subject].push(data);
            } else if (subject === 'cleaningTypes') {
                data.date = new Date();
            }
        }
    },
    delete: (subject, id, token) => {
        if (id) {
            const user = db[subject].find((element) => {return element.token === token});
            if (user.role === 'admin') {
                const index = db[subject].findIndex( (element) => {return element.id === id});
                db[subject].slice(index, 1);
            } else {
                return {message: "you dont have enough rights to delete this"}
            }
        }
    },
    getOrdersByStatus: (status) => {
        const token;
        const user = db[subject].find((element) => {return element.token === token});
        if (user.role === 'master' || user.role === 'admin') {
            return db.orders.find((element) => {return element.status === status});
        } else {
            return {message: "you dont have enough rights to fetch orders by status"}
        }

    },
    getUsersByRole: (role) => {
        return db.users.find((user) => { return user.role === role});
    }
};



db.users = [
    {
        id: '1',
        email: 'greenmassa@gmail.com',
        name: 'dauren',
        surname: 'akhmetov',
        middlename: 'kuandykovich',
        password: 'qwe',
        token: 'qweqwe',
        role: 'admin',
        displayName: 'Dauren Green'
    },
    {
        id: '2',
        email: 'aidos@gmail.com',
        name: 'aidos',
        surname: 'omurzakov',
        middlename: '',
        password: 'qwe',
        token: 'qweqweqwew',
        role: 'user',
        displayName: 'Aidos11'
    }
];

db.orders = [
    {
        clientId: '1',
        email: 'greenmassa@gmail.com',
        phone: '7476396538',
        name: 'James',
        surname: 'Bond',
        middlename: '',
        status: 'inwork',
        quantity: 1,
        cleaningType: 'dry',
        date: new Date(),
        description: 'помыть',
        price: '1200',
        address: 'Абая Саина 54',
        deliveryType: 'self',
        deliveryDate: new Date()
    },
    {
        clientId: '2',
        email: 'aidos@gmail.com',
        phone: '7476313132',
        name: 'Aidos',
        surname: 'Omurzakov',
        middlename: '',
        status: 'waiting',
        quantity: 1,
        cleaningType: 'dry',
        date: new Date(),
        description: 'помыть',
        price: '1200',
        address: 'Абая Саина 54',
        deliveryType: 'self',
        deliveryDate: new Date()
    }
];

db.cleaningType = [
    {

    },
    {

    }
];

db.statuses = {

};


db.post('users',{
    email: "user@user.com",
    password: "user",
    displayName: "User",
    role: "user"
});
console.log(db.get('users'));

//
// mongoose.connect(config.db.url + config.db.name, {useNewUrlParser: true})
//     .then(() => {
//         console.log('Mongoose connected');
//
//         app.use('/users', users());
//
//         app.listen(PORT, () => {
//             console.log(`Server running on ${PORT} port`);
//         });
//     });
