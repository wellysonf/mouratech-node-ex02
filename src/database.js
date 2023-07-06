import initialKnex from "knex";

export const config = {
    client: 'sqlite3',
    connection: {
        filename: './db.sqlite',
    },
    useNullAsDefault: true,
    migrations: {
        directory: './db/migrations',
    },
}


export const knex = initialKnex(config);