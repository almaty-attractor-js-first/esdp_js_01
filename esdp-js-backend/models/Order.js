const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    client: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    email: {
        type: String,
        required: true
    },
    phone: {
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
    quantity: {
        type: Number,
        required: true,
        default: 1
    },
    deliveryType: {
        type: String,
        enum: ['self', 'delivery']
    },
    cleaningType: {
        type: String,
        required: true,
    },
    date: Date,
    description: String,
    price: Number,
    address: String,
    deliveryDate: Date
});

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;
