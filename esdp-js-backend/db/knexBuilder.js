const knex = require('knex')({
    client: 'pg',
    version: '11.5',
    connection: {
        host : '127.0.0.1',
        user : 'admin',
        password : 'admin',
        database : 'shoeser'
    },
    pool: {min: 2, max: 20},
    acquireConnectionTimeout: 10000,
    log: {
        warn(message) {
        },
        error(message) {
        },
        deprecate(message) {
        },
        debug(message) {
        },
    }
});

module.exports = knex;
knexBuilder = {
    save: async (object, table) => {
        knex(`${table}`).insert(object)
            .then(() => console.log("data inserted"))
            .catch((err) => { console.log(err); throw err })
            .finally(() => {
                knex.destroy();
            });
    },
    fetch: async (table, id) => {
        if (id) {
            knex.from(`${table}`)
                .select("*")
                .where('id', `${id}`)
                .then((rows) => {
                    return rows;
                }).catch((err) => { console.log( err); throw err })
                .finally(() => {
                    knex.destroy();
                });
        } else {
            knex.from(`${table}`)
                .select("*")
                .then((rows) => {
                    return rows;
                }).catch((err) => { console.log( err); throw err })
                .finally(() => {
                    knex.destroy();
                });
        }

    },
    fetchBy: async (table, column, value) => {
        if (column && value) {
            knex.from(`${table}`).where(`${column}`, `${value}`)
                .catch((err) => { console.log(err); throw err })
                .finally(() => {
                    knex.destroy();
                });
        } else {
            knex.from(`${table}`).select("*")
                .catch((err) => { console.log(err); throw err })
                .finally(() => {
                    knex.destroy();
                });
        }
    },
    fetchByPhone: async (table, phone) => {
        knex.from(`${table}`).select("*")
            .where('phone', `${phone}`)
            .catch((err) => { console.log(err); throw err })
            .finally(() => {
                knex.destroy();
            });
    },
    fetchByToken: async (token) => {
        knex.from('workers').select("*")
            .where('token', `${token}`)
            .then((rows) => {console.table(rows); return rows;})
            .catch((err) => { console.log(err); throw err })
            .finally(() => {
                knex.destroy();
            });
    },
    update: async (table, object, id) => {
        knex(`${table}`)
            .where('id', '=', `${id}`)
            .update(object)
            .catch((err) => { console.log(err); throw err })
            .finally(() => {
                knex.destroy();
            });
    }
};