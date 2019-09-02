const { Pool } = require('pg');
const pool = new Pool({
	user: 'sysadmin',
	host: '127.0.0.1',
	database: 'shoeser',
	password: '123456',
	port: 5432,
});
module.exports = {
	query: (text, params) => pool.query(text, params)
};