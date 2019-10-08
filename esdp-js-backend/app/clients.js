const express = require('express');
const router = express.Router();
const db = require("../db/postgre");


const createRouter = () => {
    router.get('/', async (req, res) => {
        let clients = await db.fetch('clients');
        clients.rows.sort((a, b) => a.createdAt - b.createdAt);
        res.send(clients.rows);
    });
    router.post('/', async (req, res) => {
        const phone = req.body.phone;
        try {
            let client;
            if (phone) {
                client = await db.fetchByPhone('clients', phone).catch(error => console.log(error));
            }
            if (req.params.id) {
                const id = req.params.id;
                client = await db.fetchBy('clients', 'id', id).catch(error => console.log(error));
            }
            if (!client.rows[0]) return res.status(404).send({message: 'Пользователь не найден'});
            const clientId = client.rows[0].id;

            const orders = await db.fetchBy('orders', 'clientId', clientId).catch(error => console.log(error));
            if (!orders.rows[0]) return res.status(404).send({message: 'Нет текущих заказов'});

                for (let i in orders.rows) {
                    if ( orders.rows.hasOwnProperty(i) ) {
                        const orderItem = await db.fetchBy('orderItems', 'orderId', orders.rows[i].id)
                            .catch(error => console.log(error));
                        orders.rows[i].orderItems = orderItem.rows;
                    }
                }
            const result = {
                orders: orders.rows,
            };

            res.send(result);

        } catch (error){
            res.status(500).send({message: "Ошибка сервера"});
        }

    });
    router.get('/:id', async (req, res) => {
        try {
            const clientId = req.params.id;
            console.log('clientId', clientId);
            const orders = await db.fetchBy('orders_with_status_fields', 'clientId', clientId).catch(error => console.log(error));
            if (!orders.rows[0]) return res.status(404).send({message: 'Нет текущих заказов'});

                for (let i in orders.rows) {
                    if ( orders.rows.hasOwnProperty(i) ) {
                        const orderItem = await db.fetchBy('orderItems', 'orderId', orders.rows[i].id)
                            .catch(error => console.log(error));
                        orders.rows[i].orderItems = orderItem.rows;
                    }
                }
            const result = {
                orders: orders.rows,
            };

            res.send(result);

        } catch (error){
            res.status(500).send({message: "Ошибка сервера"});
        }

    });

    return router;
};

module.exports = createRouter;
