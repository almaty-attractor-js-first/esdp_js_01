const mongoose = require("mongoose");
const config = require("./config");
const User = require("./models/User");
const Order = require("./models/Order");

mongoose.connect(config.getDBPath());

const db = mongoose.connection;

db.once('open', async () => {
    try {
        await db.dropCollection('users');
        await db.dropCollection('orders');
    } catch (e) {
        console.log("Collections were not present.");
    }

    await User.create({
        username: "user",
        password: "user",
        displayName: "User",
        role: "user"
    }, {
        username: "admin",
        password: "admin",
        displayName: "Admin",
        role: "admin"
    });

    await Order.create({
        client: user,
        email: 'jamesbond@gmail.com',
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
    }, {
        client: user,
        email: 'vasya2@gmail.com',
        phone: '7476396538123',
        name: 'Ivan',
        surname: 'Pupkin',
        middlename: 'Kuzmich',
        status: 'waiting',
        quantity: 1,
        cleaningType: 'dry',
        date: new Date(),
        description: 'аккуратно, ебать',
        price: '1400',
        address: 'Манаса 22',
        deliveryType: 'self',
        deliveryDate: new Date()
    });

    db.close();

});
