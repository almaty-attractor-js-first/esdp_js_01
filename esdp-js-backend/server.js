const axios = require('axios');
const { appendFile } = require('fs');
const app = require('express')();
const bodyParser = require('body-parser');
const jsonRouter = require('express-json-rpc-router');
const cors = require('cors');

const controller = {
    async getUser({ params }) {
        console.log(params.userId);
        const url = `https://jsonplaceholder.typicode.com/users/${params.userId}`;
        const response = await axios.get(url);
        return response.data
    },
};

app.use(cors());
app.use(bodyParser.json());
app.use(jsonRouter({
    methods: controller,
    onError(e) {
        console.log('Omg error occurred!', e)
    }
}));
app.listen(8001, () => console.log('Example app listening on port 8001'));
