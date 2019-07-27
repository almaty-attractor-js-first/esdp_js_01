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


let db = {
    get: (subject, id) => {
        if (!id) {
            return db[subject];
        } else {
            return db[subject].find((element) => {return element.id === id});
        }
    },
    post: (subject, data) => {
        if (data) {
            data.date = new Date();
            db[subject].push(data);
        }
    },
    delete: (subject, id) => {
        if (id) {
            const index = db[subject].findIndex( (element) => {return element.id === id});
            db[subject].slice(index, 1);
        }
    },
    getOrdersByStatus: (status) => {
        return db.orders.find((element) => {return element.status === status});
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
