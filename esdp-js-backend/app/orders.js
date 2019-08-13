const express = require('express');
const router = express.Router();
const config = require('../config');
const nanoid = require('nanoid');
const QRCode = require('qrcode');
const axios = require('axios');
const db = require('../db');
const nodemailer = require("nodemailer");

const createRouter = () => {
    router.get('/cleaning-items' , async (req , res) => {
        const result = await db.getCleaningItems();
        res.send(result);
    });
    router.get('/statuses' , async (req , res) => {
        const result = await db.getStatuses();
        res.send(result);
    });
    router.get('/orders', async (req, res) => {
        let orders = db.getOrders();
        res.send(orders);
    });
    router.get('/orders/:id', async (req, res) => {
        const orderId = req.params.id;
        let order = await db.getOrdersById(orderId);
        res.send(order);
    });
    router.post('/orders', async (req, res) => {
        if(req.query.phone){
            const result = await db.findClient(req.query.phone);
            return res.send(result);
        }
        let orderData = req.body;
        orderData.id = nanoid(6);
        orderData.createdAt = new Date();
        async function mailer(qr){
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
                       <img src="${qr}" alt="${qr}" />` // html body
            });

            console.log("Message sent: %s", info.messageId);
            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

            // Preview only available when sending through an Ethereal account
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        }

        const generateQR = async text => {
            console.log('generateQR');
            try {
                const qr = await QRCode.toDataURL(text, {scale: 10});
                mailer(qr).catch(console.error);
            } catch (err) {
                console.error(err)
            }
        };
        generateQR(orderData.id);
        console.log(orderData.id);

        db.addOrder(orderData);
        db.insertClients(orderData);
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
