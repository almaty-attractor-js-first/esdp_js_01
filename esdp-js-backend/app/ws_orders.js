const express = require('express');
const router = express.Router();
const db = require("../db/postgre");

let activeConnections = {};
let connectedUsers;

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
        console.log(worker.rows);
        const id = req.get('sec-websocket-key');
        activeConnections[id] = ws;
        activeConnections[id].connectedUser = worker.rows;
        // console.log('ACTIVE_CONNECTIONS', Object.keys(activeConnections));
        //
        Object
            .values(activeConnections)
            .forEach(client => (
                client.send(JSON.stringify({
                    type: 'USER_LOGGED_IN',
                    user: activeConnections[id].connectedUser
                }))
            ));

        connectedUsers = Object
            .keys(activeConnections)
            .map(key => (activeConnections[key].connectedUser));

        ws.send(JSON.stringify({
            type: 'CONNECTED_USERS',
            connectedUsers
        }));



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
                if (decodedMessage.type === 'WS_TEST_CLIENT') {
                    Object
                        .values(activeConnections)
                        .forEach(client => {
                            console.log(client);
                            client.send(JSON.stringify({
                                type: 'WS_TEST_SERVER',
                                message: 'TESTING_SUCCESS'
                            }))
                        });

                }
            } catch {
                console.log('MESSAGE_ERROR')
            }
        });

        ws.on('close', () => {
            // try {
            //     delete activeConnections[id];
            //     connectedUsers =
            //         Object
            //             .keys(activeConnections)
            //             .map(key => (activeConnections[key].connectedUser));
            //
            //     Object
            //         .values(activeConnections)
            //         .forEach(client => (
            //             client.send(JSON.stringify({
            //                 type: 'USER_LOGGED_OUT',
            //                 connectedUsers
            //             }))
            //         ));
            //     console.log('NEW_ACTIVE_CONNECTION', Object.keys(activeConnections));
            // } catch {
            //     console.log('LOGOUT_ERROR')
            // }
        });
});

return router;
};

module.exports = createRouter;
