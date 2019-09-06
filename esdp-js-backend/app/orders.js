const express = require('express');
const router = express.Router();
const uuid = require('uuid');
const QRCode = require('qrcode');
const db = require("../db/postgre");
const fs = require('fs');
const nodemailer = require("nodemailer");


const createRouter = () => {

    router.get('/orders', async (req, res) => {
        let order = await db.fetch('orders');
        res.send(order.rows);
    });
    router.get('/orders/:id', async (req, res) => {
        const orderId = req.params.id;
        let order = await db.fetch('orders', orderId);
        res.send(order.rows[0]);
    });
    router.post('/orders', async (req, res) => {
        // if(req.query.phone){
        //     const result = await db.findClient(req.query.phone);
        //     return res.send(result);
        // }
        let orderData = req.body;
        const orderId = uuid();
        orderData.id = orderId;
        console.log(orderData);
        //создаем клиента
        const clientData = {
            id: uuid(),
            address: orderData.address,
            email: orderData.email,
            firstName: orderData.firstName,
            lastName: orderData.lastName,
            middleName: orderData.middleName,
            createdAt: new Date(),
            displayName: orderData.firstName,
            birthDate: null,
            phone: orderData.phone
        };
        orderData.clientId = clientData.id;


        orderData.order_items.map((item) => {
            const orderItem = {
                id: uuid(),
                orderId: orderData.id,
                cleaningType: item.cleaningType,
                qty: item.qty,
                price: item.price,
                title: item.title
            };
            db.save(orderItem,'order_items');
        });
        db.save(clientData, 'clients');
        db.save(orderData, 'orders');
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
                    user: 'natebevlast@yandex.kz', // generated ethereal user
                    pass: 'KZApex2017' // generated ethereal password
                }
            });
            let info = await transporter.sendMail({
                from: 'natebevlast@yandex.kz', // sender address
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


        res.send(orderData);
    });
    router.put('/orders/:id', async (req, res) => {
        console.log(req.body);
        const orderId = req.params.id;
        let data = req.body;
        db.updateOrdersById(orderId, data);
        res.send({message: 'OK'});
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
