const express = require('express');
const router = express.Router();
const uuid = require('uuid');
const QRCode = require('qrcode');
const db = require("../db/postgre");
const fs = require('fs');
const nodemailer = require("nodemailer");
const auth = require('../middleware/auth');

const createRouter = () => {
    router.get('/orders', auth, async (req, res) => {
        const token = req.get("Authorization");
        if (!token) {
            return res.status(401).send({message: "Ошибка аутентификации"});
        }
        const worker = await db.fetchByToken(token);
        if (!worker) {
            return res.status(401).send({message: "Пользователь не найден"});
        }
        let order = await db.fetch('orders_with_status_fields');
        order.rows.sort((a, b) => b.createdAt - a.createdAt);
        let ordersByRole;
        let ordersById;

        if (worker.rows[0]) {
            switch (worker.rows[0].role) {
                case 'courier':
                    ordersById = order.rows
                        .filter(order => order.courierId === worker.rows[0].id || order.courierId === 'ff35c2dd-97bc-44b8-bc25-1d756be13fa7');
                    ordersByRole = ordersById
                        .filter(order => order.statusName === 'new' || order.statusName === 'taken' || order.statusName === 'done');
                    break;
                case 'master':
                    ordersById = order.rows
                        .filter(order => order.masterId === worker.rows[0].id || order.masterId === 'ff35c2dd-97bc-44b8-bc25-1d756be13fa7');
                    ordersByRole = ordersById
                        .filter(order => order.statusName === 'pending' || order.statusName === 'inWork');
                    break;
                case 'admin':
                    ordersByRole = order.rows;
                    break;
                default:
                    throw new Error('Ошибка доступа');
            }
        }

        res.send(ordersByRole);
    });
    router.get('/orders/client', async (req, res) => {
	    if(req.query.phone){
		    const result = await db.fetchByPhone('clients',req.query.phone);
		    if (result.rows[0]) {
			    return res.send(result.rows[0]);
		    } else {
			    return res.status(404).send({message: "Number not found"});
		    }
	    }
    });
    router.get('/orders/:id', async (req, res) => {
        const orderId = req.params.id;
        let order = await db.fetch('orders', orderId);
        res.send(order.rows[0]);
    });
    router.post('/orders', async (req, res) => {
        let orderData = req.body;
        const orderId = uuid();
        orderData.id = orderId;
        orderData.statusId = "80659b19-1bf5-466b-8221-bce9ab456efb"; //@TODO Переделать на "name" статуса!!! (statusId = statuses -> '~new' ->  'id')
        orderData.masterId = "ff35c2dd-97bc-44b8-bc25-1d756be13fa7"; //@TODO Переделать на "name" мастера!!!
        orderData.courierId = "ff35c2dd-97bc-44b8-bc25-1d756be13fa7"; //@TODO Переделать на "name" курьера!!!
        let clientId;
        //создаем клиента
        const result = await db.fetchByPhone('clients', orderData.phone);
        if (result.rows[0]) {
            console.log("Client already exists, it's ok, creating new order for him");
            clientId = result.rows[0].id;
        } else {
            const clientData = {
                id: uuid(),
                address: orderData.address,
                email: orderData.email,
                firstName: orderData.firstName,
                lastName: orderData.lastName,
                middleName: orderData.middleName,
                createdAt: new Date(),
                birthDate: null,
                phone: orderData.phone
            };
            orderData.clientId = clientData.id;
            await db.save(clientData, 'clients');
        }
        const finalOrder = {
            id: orderId,
            clientId: orderData.clientId || clientId,
            masterId: orderData.masterId,
            courierId: orderData.courierId,
            statusId: orderData.statusId,
            createdAt: new Date(),
            description: null,
            paymentStatus: orderData.paymentStatus || false,
            paymentMethod: orderData.paymentMethod,
            totalPrice: orderData.totalPrice,
            pickupAddress: orderData.address,
            address: orderData.address,
            deliveryType: orderData.deliveryType,
            completedDate: orderData.completedDate
        };

        const completedOrder = await db.save(finalOrder, 'orders');
        orderData.orderItems.map((item) => {
            const orderItem = {
                id: uuid(),
                orderId: orderData.id,
                cleaningType: item.cleaningType,
                qty: item.qty,
                price: item.price,
                title: item.title
            };
            db.save(orderItem,'orderItems');
        });

        QRCode.toFile(`src/assets/images/${orderId}file.png`, orderId, {
            scale: 10,
            color: {
                dark: '#000000',  //
                light: '#0000' // Transparent background
            }
        }, function (err) {
            if (err) throw err;
            console.log('done')
        });
        mailer().catch(console.error).then(()=> {
            fs.unlink(`src/assets/images/${orderId}file.png`, (err) => {
                if (err) {
                    console.error(err);
                }
                console.log(`file ${orderId}file.png удалён`);
            });
        });

        async function mailer(){
            let transporter = nodemailer.createTransport({
                host: "smtp.yandex.com",
                port: 465,
                secure: true, // true for 465, false for other ports
                auth: {
                    user: 'shoeserkz@yandex.kz', // generated ethereal user
                    pass: 'TfJsh8fwAGX6nhS' // generated ethereal password
                }
            });
            let info = await transporter.sendMail({
                from: 'shoeserkz@yandex.kz', // sender address
                to: orderData.email, // list of receivers
                subject: "Здравствуйте, " + orderData.firstName + " ваш заказ оформлен", // Subject line
                text: "Ваш заказ № " + orderData.id + " оформлен", // plain text body
                html: `<h2>Здравствуйте, ${orderData.firstName}</h2>
                       <p>Ваш заказ № ${orderData.id} оформлен</p>
                       <img src="cid:${orderData.email}" alt="qr" />`,// html body
                attachments: [{
                    filename: `${orderId}file.png`,
                    path: `src/assets/images/${orderId}file.png`,
                    cid: orderData.email //same cid value as in the html img src
                }]
            });

            console.log("Message sent: %s", info.messageId);
            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

            // Preview only available when sending through an Ethereal account
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        }
        
        if (!(completedOrder instanceof Error))  {
            orderData.createdAt = await db.fetch('orders', orderData.id);
            res.send(orderData);
        } else {
            res.status(500).send({message: 'Internal error'});
        }
        
        
    });
    router.put('/orders/:id', auth, async (req, res) => {
        const orderId = req.params.id;
        let data = req.body;
        const token = req.get("Authorization");
        const worker = await db.fetchByToken(token);
        const order = await db.fetch('orders', orderId);
        const workerRole = worker.rows[0].role;
        const workerId = worker.rows[0].id;
        const defaultWorkerId = 'ff35c2dd-97bc-44b8-bc25-1d756be13fa7';
        // if (workerRole === 'master') {
        //     if (order.rows[0].masterId !== defaultWorkerId) {
        //         return res.status(403).send({message: `Заказ ${orderId.substring(0, 7)} уже взят в работу`});
        //     }
        //     if (order.rows[0].masterId !== workerId) {
        //         return res.status(403).send({message: `Заказ ${orderId.substring(0, 7)} уже взят в работу`});
        //     }
        //     data.masterId = worker.rows[0].id;
        // }
        if (workerRole === 'courier') {
            data.courierId = worker.rows[0].id;
        }
        await db.update('orders', data, orderId)
            .then(() => {
                res.status(200).send({message: `Заказ ${orderId.substring(0, 7)} обновлен`});
            }).catch(() => {
                res.status(500).send({message: `Ошибка сервера`});
            });
    });
    router.put('/orders/:id/status', async (req, res) => {
        const orderId = req.params.id;
        const status = req.body;
        db.updateOrderStatusById(orderId, status);
        res.send({message: 'OK'});
    });

    return router;
};

module.exports = createRouter;
