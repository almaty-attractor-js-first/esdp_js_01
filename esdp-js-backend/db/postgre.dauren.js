const { Pool } = require('pg');

const pool = new Pool({
    user: '',
    host: '127.0.0.1',
    database: 'shoeser',
    password: '',
    port: 5432,
});
pool.on('connect', () => {
    console.log('connected to the Shoeser');
});

module.exports = {
    save: async (object, table) => {
        const bodyKeys = Object.keys(object);
        console.log(bodyKeys);
        const bodyValues = Object.values(object);
        const bodyKeysWithRegistr = bodyKeys.map((key, index) => {
            return `"${key}"`;
        });
        const VALUES = bodyKeys.map((key, index) => {
            return "$"+(index + 1);
        });
        const sqlString = `INSERT INTO "${table}"(${bodyKeysWithRegistr.join(', ')}) VALUES(${VALUES.join(', ')}) RETURNING *`;
        try {
            console.log(sqlString);
            const res = await pool.query(sqlString, bodyValues);
            return (res.rows[0]);
        } catch (err) {
            // console.log('register error', err);
            return (err);
        }
    },

    fetch: async (table, id) => {
        let sqlString = `SELECT * FROM "${table}"`;
        if (id) {
            sqlString = `SELECT * FROM "${table}" WHERE ("${table}".id = ${id})`;
        }
        try {
            const res = await pool.query(sqlString);
            return res;
        } catch (err) {
            console.log(err.stack);
        }
    },
	fetchBy: async (table, column, value) => {
        	let sqlString = `SELECT * FROM "${table}"`;
        	if (column && value) {
        	    sqlString = `SELECT * FROM "${table}" WHERE ("${table}"."${column}" = '${value}')`;
        	}
        	try {
        	    const res = await pool.query(sqlString);
        	    return res;
        	} catch (err) {
        	    console.log(err.stack);
        	    return err;
        	}
    },

    saveUser: async (object) => {
        const bodyKeys = Object.keys(object);
        console.log(bodyKeys);
        const bodyValues = Object.values(object);
        const bodyKeysWithRegister = bodyKeys.map((key) => {
            return `"${key}"`;
        });
        const VALUES = bodyKeys.map((key, index) => {
            return "$"+(index + 1);
        });
        const sql = `INSERT INTO "workers"(${bodyKeysWithRegister.join(', ')}) VALUES(${VALUES.join(', ')}) RETURNING *`;
        try {
            console.log(sql);
            const res = await pool.query(sql, bodyValues);
            console.table(res.rows[0]);
        } catch (err) {
            console.log(err.stack);
        }
    },


    fetchByPhone: async (table, phone) => {
        let sqlString = `SELECT * FROM "${table}" WHERE ("${table}".phone = '${phone}')`;
        console.log(sqlString);
        try {
            const res = await pool.query(sqlString);
            console.table(res.rows[0]);
            return res;
        } catch (err) {
            console.log(err.stack);
        }
    },

    fetchByToken: async (token) => {
        let sqlString = `SELECT * FROM "workers" WHERE ("workers".token = '${token}')`;
        console.log(sqlString);
        try {
            const res = await pool.query(sqlString);
            console.table(res);
            return res;
        } catch (err) {
            console.log(err.stack);
        }
    },
    update: async (table, object, id) => {
        const bodyKeys = Object.keys(object);
        const bodyValues = Object.values(object);
        let str = [];
        for (let i in bodyKeys) {
            str.push(`"${bodyKeys[i]}" = '${bodyValues[i]}'`);
        }
        str = str.join(", ");
        let sqlString = `UPDATE "${table}" SET ${str} WHERE "${table}".id = '${id}' RETURNING *`;
        console.log(sqlString);
        try {
            return res = await pool.query(sqlString);
        } catch (err) {
            console.log(err.stack);
        }
    }
};
