const express = require('express');
const router = express.Router();
const db = require("../db/postgre");
const auth = require('../middleware/auth');

const createRouter = () => {
    router.put('/', auth, async (req, res) => {
        let data = req.body;
        const result = data.map(async cleaningType => {
            delete cleaningType.editable;
            await db.update('cleaningTypes', cleaningType, cleaningType.id);
        });
        console.table(data);
        res.send(result);
    });
    router.put('/:id', auth, async (req, res) => {
        let cleaningType = req.body;
        delete cleaningType.editable;
        const cleaningTypeId = req.params.id;
        const result = await db.update('cleaningTypes', cleaningType, cleaningTypeId);
        res.send(result);
    });
    router.get('/', async (req , res) => {
        const result = await db.fetch('cleaningTypes');
        result.rows.sort((a, b) => a.position - b.position);
        res.send(result.rows);
    });
    router.post('/', auth, async (req, res) => {
        const object = req.body;
        console.log(req.body);
        delete object.editable;
        try {
            const res = await db.save(object, 'cleaningTypes');
            console.table(res.rows[0]);
        } catch (err) {
            console.log(err.stack);
        }
        res.status(200).send(`Новый статус добавлен!`);
    });
    router.put('/:id/edit', async (req, res) => {
        const id = req.query.id;
        const item = req.body;
        const result = await db.update('cleaningTypes', item, id);
        res.send(result.rows);
    });
    return router;
};

module.exports = createRouter;
