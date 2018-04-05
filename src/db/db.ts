import * as knex from "knex";

const config = require("../../knexfile");

// Create connection using knex configuration
const db = knex(config);

export default db;
