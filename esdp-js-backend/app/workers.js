const express = require('express');
const router = express.Router();
const uuid = require('uuid');
const db = require('../db/postgre');
const Helper = require('../controllers/Helper');

const createRouter = () => {
    router.get('/', async (req, res) => {
        let workers = await db.fetch('workers');
        res.send(workers.rows);
    });
    router.post('/', (req, res) => {
        const id = uuid.v4();
        const token = Helper.generateToken(id);
        const newUser = {
            phone: req.body.phone,
            email: req.body.email,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            id,
            token
        };
        if (newUser.phone.length < 11) return res.status(400).send({message: 'Неверный формат номера телефона'});
        if (newUser.password.length <= 0) return res.status(400).send({message: 'Вы не ввели пароль'});
    
        newUser.password = Helper.hashPassword(newUser.password);
        db.saveUser(newUser).then(result => {
            res.send(result);
        }).catch(error => {
            res.status(400).send({message: error});
        });
    });
    router.post('/sessions', async (req, res) => {
        let phone = '';
        if (req.body.phone.length > 0) phone = req.body.phone;
        try {
            if (!phone) {
                res.status(400).send({message: 'Введите номер телефона'});
            }
            const data = await db.fetchByPhone('workers', phone);
            const user = data.rows[0];
            if (!user) {
                res.status(400).send({message: 'Пользователь не найден'});
            }
            const password = user.password;
            const isMatch = await Helper.comparePassword(password, req.body.password);
            if (!isMatch) {
                res.status(400).send({message: "Неверный пароль"});
            }
            user.token = Helper.generateToken(user.id);
            const token = {token: user.token};
            db.update('workers', token, user.id).then(result => {
                let response = result.rows[0];
                delete response.password;
                res.send(response);
            });
        } catch (error) {
            return res.status(500).send({message: "Ошибка сервера"});
        }

    });

    router.delete('/sessions', async (req, res) => {
        const token = req.get("Authorization");
        const success = {message: "Logged out!"};
        if(!token) return res.send(success);
        const user = await db.fetchByToken({token});
        if(!user) return res.send(success);
        user.token = Helper.generateToken(user.id);
        const newToken = {token: user.token};
        db.update('workers', newToken, user.id).then(() => {
            res.send(success);
        });
    });

    return router;
};

module.exports = createRouter;
