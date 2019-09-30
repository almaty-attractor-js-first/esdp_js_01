const express = require('express');
const app = require('express')();
const cors = require('cors');
const bodyParser = require('body-parser');
const orders = require('./app/orders');
const ws_orders = require('./app/ws_orders');
const statuses = require('./app/statuses');
const workers = require('./app/workers');
const clients = require('./app/clients');
const cleaningTypes = require('./app/cleaningTypes');
const ws = require('express-ws')(app);
app.ws = ws;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
app.use('/', orders());
app.use('/statuses', statuses());
app.use('/workers', workers());
app.use('/clients', clients());
app.use('/cleaning-items', cleaningTypes());
app.use('/', ws_orders());

app.listen(8000, () => console.log('Example app listening on port 8000'));

