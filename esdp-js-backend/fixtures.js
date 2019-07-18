const mongoose = require("mongoose");
const config = require("./config");

const User = require("./models/User");

mongoose.connect(config.getDBPath());

const db = mongoose.connection;

db.once('open', async () => {
    try {
        await db.dropCollection('users');
    } catch (e) {
        console.log("Collections were not present.");
    }

    await Order.create({
        name: "Intel Core i7",
        model: "Core i7 8 Gen",
        category: cpuCategory._id,
        price: 700,
        photo: "cpu.jpg"
    }, {
        name: "Seagate 3TB",
        model: "Barracuda",
        category: hddCategory._id,
        price: 200,
        photo: "hdd.jpg"
    });

    await User.create({
        username: "User",
        password: "123",
        role: "user"
    }, {
        username: "admin",
        password: "admin",
        role: "admin"
    });

    db.close();

});
