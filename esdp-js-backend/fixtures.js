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

    db.close();

});
