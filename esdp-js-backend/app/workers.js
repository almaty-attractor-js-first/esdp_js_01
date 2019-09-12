const express = require('express');
const router = express.Router();
const config = require('../config');
const uuid = require('uuid');
const db = require('../db/postgre');
const Helper = require('../controllers/Helper');

const createRouter = () => {
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
        if (newUser.phone.length < 11) return res.status(400).send({message: 'Неправильный формат номера телефона'});
        if (newUser.password.length <= 0) return res.status(400).send({message: 'Вы не ввели пароль'});
    
        newUser.password = Helper.hashPassword(newUser.password);
        db.saveUser(newUser).then(result => {
            res.send(result);
        }).catch(err => {
            res.status(400).send({message: err});
        });
    });
    router.post('/sessions', async (req, res) => {
        const data = await db.fetchByPhone('workers', req.body.phone);
        const user = data.rows[0];
        if (!user) return res.status(400).send({message: 'User not found'});
        const password = user.password;
        console.log(user.password);
        console.log(req.body.password);
        const isMatch = await Helper.comparePassword(password, req.body.password);
        if(!isMatch) return res.status(400).send({message: "Wrong password"});
        user.token = Helper.generateToken(user.id);
        const token = {token: user.token};
        db.update('workers', token, user.id).then(result => {
            let response = result.rows[0];
            delete response.password;
            res.send(response);
        });
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
