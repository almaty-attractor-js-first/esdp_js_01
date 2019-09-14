const express = require('express');
const router = express.Router();
const db = require("../db/postgre");

const createRouter = () => {
    router.get('/', async (req , res) => {
        const result = await db.fetch('cleaningTypes');
        result.rows.sort((a, b) => a.position - b.position);
        res.send(result.rows);
    });
    router.post('/', async (req, res) => {
        const item = req.body;
        const result = await db.save(item, 'cleaningTypes');
        res.send(result.rows);
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
