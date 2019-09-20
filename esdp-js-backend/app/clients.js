const express = require('express');
const router = express.Router();
const db = require("../db/postgre");


const createRouter = () => {
    router.post('/', async (req, res) => {
        const phone = req.body.phone;
        try {
            const client = await db.fetchByPhone('clients', phone).catch(error => console.log(error));
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

    return router;
};

module.exports = createRouter;
