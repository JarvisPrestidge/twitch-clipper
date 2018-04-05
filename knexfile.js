const dotenv = require("dotenv");

dotenv.config();

module.exports = {
    client: "pg",
    version: "9.6",
    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    },
    migrations: {
        directory: "./dist/db/migrations"
    },
    seeds: {
        directory: "./dist/db/seeds"
    },
    debug: true
};
