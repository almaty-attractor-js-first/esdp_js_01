const express = require('express');
const router = express.Router();
const db = require("../db/postgre");

let activeConnections = {};

const createRouter = () => {
    router.ws('/', async function(ws, req) {
        const token = req.query.token;
        if (!token) {
            console.log('NO TOKEN');
            ws.send(JSON.stringify({
                type: 'ERROR',
                message: 'Ошибка аутентификации'
            }));
            return ws.close();
        }
        const worker = await db.fetchByToken(token);

        if (!worker) {
            console.log('NO WORKER');
            ws.send(JSON.stringify({
                type: 'ERROR',
                message: 'Пользователь не найден'
            }));
            return ws.close();
        }
        if (token) {
            if (!(token in activeConnections)) {
                activeConnections[token] = ws;
                activeConnections[token].connectedUser = worker.rows;
                console.log('ACTIVE_CONNECTIONS', Object.keys(activeConnections));
            }
        }
        //



        ws.on('message', function(msg) {
            try {
                console.log('msg', msg);
                let decodedMessage;
                try {
                    decodedMessage = JSON.parse(msg);
                } catch (e) {
                    return ws.send(JSON.stringify({
                        type: 'ERROR',
                        message: 'Message is not JSON'
                    }));
                }
                console.log('DECODED MESSAGE', decodedMessage);
                if (decodedMessage.type === 'STATUS_CHANGED') {
                    console.log('STATUS_CHANGED');
                    Object
                        .values(activeConnections)
                        .forEach(client => {
                            console.log(client.connectedUser);
                            client.send(JSON.stringify({
                                type: 'UPDATED_ORDERS_FROM_SERVER'
                            }));
                            console.log('SENDING');
                        });

                }
            } catch (e) {
                console.log('MESSAGE_ERROR')
            }
        });

        ws.on('close', () => {
            try {
                delete activeConnections[token];
                console.log('NEW_ACTIVE_CONNECTION', Object.keys(activeConnections));
            } catch (e) {
                console.log('LOGOUT_ERROR')
            }
        });
});
    router.ws('/new', async function(ws, req) {
        ws.on('message', function(msg) {
            try {
                let decodedMessage;
                try {
                    decodedMessage = JSON.parse(msg);
                } catch (e) {
                    return ws.send(JSON.stringify({
                        type: 'ERROR',
                    }));
                }
                console.log('DECODED MESSAGE', decodedMessage);
                if (decodedMessage.type === 'NEW_ORDER') {
                    console.log('NEW_ORDER');
                    Object
                        .values(activeConnections)
                        .forEach(client => {
                            console.log(client.connectedUser);
                            client.send(JSON.stringify({
                                type: 'UPDATED_ORDERS_FROM_SERVER'
                            }));
                        });

                }
            } catch (e) {
                console.log('MESSAGE_ERROR')
            }
        });
});

return router;
};

module.exports = createRouter;
