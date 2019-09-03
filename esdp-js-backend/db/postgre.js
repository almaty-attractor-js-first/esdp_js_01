const { Pool } = require('pg');

const pool = new Pool({
    user: '',
    host: '127.0.0.1',
    database: 'shoeser',
    password: '',
    port: 5432,
});
module.exports = {
    save: async (object, table) => {
        const bodyKeys = Object.keys(object);
        const bodyValues = Object.values(object);
        const VALUES = bodyKeys.map((key, index) => {
            return "$"+(index + 1);
        });
        const sqlString = `INSERT INTO ${table}(${bodyKeys.join(", ")}) VALUES(${VALUES.join(", ")}) RETURNING *`;
        try {
            const res = await pool.query(sqlString, bodyValues);
            console.table(res.rows[0]);
        } catch (err) {
            console.log(err.stack);
        }
    },
    fetch: async (table, id) => {
        let sqlString = `SELECT * FROM ${table}`;
        if (id) {
            sqlString = `SELECT * FROM ${table} WHERE (${table}.id = ${id})`;
        }
        try {
            const res = await pool.query(sqlString);
            console.table(res.rows[0]);
            return res;
        } catch (err) {
            console.log(err.stack);
        }
    },
    update: async (table, object, id) => {
        const bodyKeys = Object.keys(object);
        const bodyValues = Object.values(object);
        let str = [];
        console.log(object);
        for (let i in bodyKeys) {
            str.push(`${bodyKeys[i]} = '${bodyValues[i]}'`);
        }
        str = str.join(", ");
        let sqlString = `UPDATE ${table} SET ${str} WHERE ${table}.id = ${id}`;
        try {
            const res = await pool.query(sqlString);
            console.table(res.rows[0]);
            return res;
        } catch (err) {
            console.log(err.stack);
        }
    }
};


