// index.js
const knex = require("knex");
const path = require("path");

function postgresConnection() {
  return knex({
    client: "pg",
    connection: process.env.DATABASE_URL,
    migrations: {
      tableName: "knex_migrations",
      directory: path.resolve(
        __dirname,
        "src",
        "database",
        "knex",
        "migrations"
      ),
    },
  });
}

module.exports = postgresConnection;
