const express = require('express');
const router = express.Router();
const uuid = require('uuid');
const auth = require('../middleware/auth');
const QRCode = require('qrcode');
const db = require("../db/postgre");
const knex = require("../db/knexBuilder");
const fs = require('fs');
const nodemailer = require("nodemailer");
const moment = require('moment');
const setupPaginator = require('knex-paginator');
setupPaginator(knex);

const createRouter = () => {
    router.get('/orders/total', async (req, res) => {
        const total = await knex('orders')
            .select("*")
            .paginate(5, 1, true)
            .then(result => {return result.total})
            .catch((err) => {console.log(err)});
        return res.send(total);
    });
    router.get('/orders', async (req, res) => {
        const token = req.get("Authorization");
        let perPage;
        let page;
        if (req.query) {
            perPage = req.query.perPage;
            page = req.query.page;
        }
        console.log('OFFSET', page);
        console.log('LIMIT', perPage);

        if (!token)  return res.status(401).send({message: "Ошибка аутентификации"});
        const worker = await knex('workers')
            .select("*")
            .where("token", `${token}`)
            .then((result) => {return result})
            .catch((err) => {console.log(err)});

        if (!worker) {
            return res.status(401).send({message: "Пользователь не найден"});
        }
        let workerId;
        if (worker) {
            console.log(worker[0].role);
            workerId = worker[0].id;
        }

        if (worker) {
            switch (worker[0].role) {
                case 'master':
                    knex('orders')
                        .select("*")
                        .where(function() {
                            this.whereIn('masterId', ['ff35c2dd-97bc-44b8-bc25-1d756be13fa7', `${workerId}`])
                        })
                        .andWhere(function() {
                            this.whereIn('statusId', [
                                'a708c4b0-e3b8-4480-89bf-2ab23fc54f85', // pending
                                '7d088a66-ded7-448a-a58a-f4bed44a1433', // inWork
                            ])
                        })
                        .orderBy('createdAt', 'desc').paginate(perPage, page, false)
                        .then(paginator => {return paginator.data})
                        .then((rows) => {
                            return res.send(rows);
                        }).catch((err) => { console.log( err); throw err });
                    break;
                case 'courier':
                    knex('orders')
                        .select("*")
                        .where(function() {
                            this.whereIn('courierId', ['ff35c2dd-97bc-44b8-bc25-1d756be13fa7', `${workerId}`])
                        })
                        .andWhere(function() {
                            this.whereIn('statusId', [
                                '80659b19-1bf5-466b-8221-bce9ab456efb', // new
                                'f2f2b5cd-efc9-4df3-81ec-f834795b1a36', // taken
                                '1203a5ac-3fcd-443a-a1c5-cf9de24026c3', // done
                            ])
                        })
                        .orderBy('createdAt', 'desc').paginate(perPage, page, false)
                        .then(paginator => {return paginator.data})
                        .then((rows) => {
                            return res.send(rows);
                        }).catch((err) => { console.log( err); throw err });
                    break;
                case 'admin':
                    knex('orders')
                        .select("*")
                        .orderBy('createdAt', 'desc').paginate(perPage, page, false)
                        .then(paginator => {return paginator.data})
                        .then((rows) => {
                            return res.send(rows);
                        }).catch((err) => { console.log( err); throw err });
                    break;
                default:
                    throw new Error('Ошибка доступа');
            }
        }
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
        const client = await db.fetchByPhone('clients', orderData.phone);
        if (client.rows[0]) {
            console.log("Client already exists, it's ok, creating new order for him");
            clientId = client.rows[0].id;
            const clientData = {
                address: orderData.address,
                email: orderData.email,
                firstName: orderData.firstName,
                lastName: orderData.lastName,
                middleName: orderData.middleName,
            };
            await db.update('clients', clientData, clientId);
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
                    pass: 'shoeser2019' // generated ethereal password
                }
            });
            let substrId = orderData.id.substring(1,8);
            let htmlstring = `<h2>Здравствуйте, ${orderData.firstName}</h2>
                       <p>Ваш заказ № ${substrId} оформлен</p>
                       <p>Вы заказали:</p>
                       <div> <ul>`;
            let itemString = "";
                orderData.orderItems.forEach((item) => {
                itemString += `<li>
                           <span>${item.title}</span>
                           <span>${item.price} тг.</span>
                           <span>${item.qty} шт.</span>
                        </li>`
            });
                let qrString =  `</li> </div> 
                        <p>Общая сумма заказа: ${orderData.totalPrice}</p>
                        <p>Адрес указанный в заказе: ${orderData.address}</p>
                        <p>Тип оплаты: ${(orderData.paymentMethod === 'cash')?'Оплата наличными':'Онлайн оплата'}</p>
                        <p>Дата доставки: ${moment(orderData.completedDate, 'YYYY-MM-DD-HH:mm')}</p>
                       <img src="cid:${orderData.email}" alt="qr" />`;
                let string = htmlstring+itemString+qrString;
            let info = await transporter.sendMail({
                from: 'shoeserkz@yandex.kz', // sender address
                to: orderData.email, // list of receivers
                subject: "Здравствуйте, " + orderData.firstName + " ваш заказ оформлен", // Subject line
                text: "Ваш заказ № " + orderData.id + " оформлен", // plain text body
                html: string,// html body
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
        if (!token)  return res.status(401).send({message: "Ошибка аутентификации"});
        await knex('orders')
            .where('id', `${orderId}`)
            .update(data)
            .then(() => {
                return res.status(200).send({message: `Заказ ${orderId.substring(0, 7)} обновлен`});
            })
            .catch((err) => { console.log( err); throw err });
    });

    return router;
};

module.exports = createRouter;
