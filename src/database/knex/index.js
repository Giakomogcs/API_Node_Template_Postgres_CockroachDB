const config = require("../../../knexfile");
const knex = require("knex");
require("dotenv").config();

const connection = knex(config.development);

module.exports = connection;
