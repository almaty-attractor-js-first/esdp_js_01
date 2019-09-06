const express = require('express');
const router = express.Router();
const nanoid = require('nanoid/generate');
const db = require('../db/postgre');

const createRouter = () => {
	router.put('/', async (req, res) => {
		let data = req.body;
		data.map(async status => {
			delete status.editable;
			const result = await db.update('statuses', status, status.id);
		});
		console.table(data);
		res.send(result);
	});
	router.put('/:id', async (req, res) => {
		let orderData = req.body;
		delete orderData.editable;
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
		delete object.editable;
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
