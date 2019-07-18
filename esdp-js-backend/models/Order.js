const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    client: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    email: {
        type: String,
        required: true
    },
    telephone: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    surname: {
        type: String,
        required: true,
    },
    middlename: {
        type: String
    },
    status: {
        type: String,
        enum: ['waiting', 'inwork', 'ready', 'sorting', 'delivering', 'delivered'],
        default: 'waiting'
    },
    numberofpairs: {
        type: Number,
        required: true,
        default: 1
    },
    typeofcleaning: {
        type: String,
        required: true,

    }
    date: Date,
    description: String
});

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;
