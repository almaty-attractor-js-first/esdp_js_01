const app = require('express')();
const cors = require('cors');
const bodyParser = require('body-parser');
const orders = require('./app/orders');
const express = require('express');

app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use(bodyParser.json());
app.use('/' ,orders());

app.listen(8000, () => console.log('Example app listening on port 8000'));

