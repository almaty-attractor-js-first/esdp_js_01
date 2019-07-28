const axios = require('axios');
const { appendFile } = require('fs');
const app = require('express')();
const bodyParser = require('body-parser');
const jsonRouter = require('express-json-rpc-router');
const cors = require('cors');
const db = require('./db');

const items = db.getSubject('cleaningItems');
console.log(items);

const controller = {
    async getCleaningItems() {
        return await db.getSubject('cleaningItems');
    }
};

app.use(cors());
app.use(bodyParser.json());
app.use(jsonRouter({
    methods: controller,
    onError(e) {
        console.log('Omg error occurred!', e)
    }
}));
app.listen(8000, () => console.log('Example app listening on port 8000'));
