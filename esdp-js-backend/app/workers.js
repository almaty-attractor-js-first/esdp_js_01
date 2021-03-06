const express = require('express');
const router = express.Router();
const uuid = require('uuid');
const db = require('../db/postgre');
const Helper = require('../controllers/Helper');

const createRouter = () => {
    router.get('/', async (req, res) => {
        let workers = await db.fetch('workers');
        workers.rows.sort((a, b) => a.createdAt - b.createdAt);
        res.send(workers.rows);
    });
    router.get('/roles', async (req, res) => {
        const sqlString = 'SELECT e.enumLabel \n' +
            ' FROM pg_type t, pg_enum e \n' +
            ' WHERE t.oid = e.enumtypid AND typname = \'role\';';
        let roles = await db.nativeFetch(sqlString);
        res.send(roles.rows);
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
            role: req.body.role,
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
                return res.status(400).send({message: 'Введите номер телефона'});
            }
            const data = await db.fetchByPhone('workers', phone);
            const user = data.rows[0];
            if (!user) {
                return res.status(400).send({message: 'Пользователь не найден'});
            }
            const password = user.password;
            const isMatch = await Helper.comparePassword(password, req.body.password);
            if (!isMatch) {
                return res.status(400).send({message: "Неверный пароль"});
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
        const user = await db.fetchBy('workers', 'id', token);
        if(!user) return res.send(success);
        let userId;
        if (user.rows[0]) {
            userId = user.rows[0].id;
        }
        const newToken = {token: uuid()};
        db.update('workers', newToken, userId).then(() => {
            res.send(success);
        });
    });

    return router;
};

module.exports = createRouter;
