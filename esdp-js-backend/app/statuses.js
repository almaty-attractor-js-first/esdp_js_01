const express = require('express');
const router = express.Router();
const nanoid = require('nanoid/generate');
const dbPsql = require('../db/postgres');

const createRouter = () => {
	router.post('/' , async (req , res) => {
		req.body.id = nanoid('1234567890', 6);
		const bodyKeys = Object.keys(req.body);
		const bodyValues = Object.values(req.body);
		const VALUES = bodyKeys.map((key, index) => {
			return `$${index + 1}`;
		});
		const sqlString = `INSERT INTO statuses(${bodyKeys.join(", ")}) VALUES(${VALUES.join(", ")}) RETURNING *`;
		try {
			const res = await dbPsql.query(sqlString, bodyValues);
			console.table(res.rows[0]);
		} catch (err) {
			console.log(err.stack);
		}
		res.status(200).send(`Новый статус добавлен под ID: ${req.body.id}`);
	});
	router.get('/', async (req, res) => {
		const { id } = req.params;
		const { rows } = await dbPsql.query('SELECT * FROM statuses');
		rows.sort((a, b) => a.position - b.position);
		console.table(rows);
		res.send(rows)
	});
	router.put('/:id' , async (req , res) => {
		const id = parseInt(req.params.id);
		const { name, title, color, status, position } = req.body;
		const sqlString = `
			UPDATE statuses
			SET name = $1, title = $2, color = $3, status = $4, position = $5
      WHERE id = $6`;
		const bodyValues = [ name, title, color, status, position, id ];
		try {
			const res = await dbPsql.query(sqlString, bodyValues);
		} catch (err) {
			console.log(err.stack);
		}
		res.status(200).send(`Статус под ID: ${id} успешно изменен`);
	});

	return router;
};

module.exports = createRouter;
