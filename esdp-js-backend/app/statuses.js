const express = require('express');
const router = express.Router();
const nanoid = require('nanoid/generate');
const dbPsql = require('../db/postgre');

const createRouter = () => {
	router.put('/:id', async (req, res) => {
		let orderData = req.body;
		const orderId = req.params.id;
		const result = await db.update('statuses', orderData, orderId);
		res.send(result);
	});
	router.get('/' , async (req , res) => {
		const result = await db.fetch('statuses');
		result.rows.sort((a, b) => a.position - b.position);
		res.send(result.rows);
	});
	router.post('/' , async (req , res) => {
		const object = req.body;
		try {
			const res = await db.save(object, 'statuses');
			console.table(res.rows[0]);
		} catch (err) {
			console.log(err.stack);
		}
		res.status(200).send(`Новый статус добавлен!`);
	});


	return router;
};

module.exports = createRouter;
