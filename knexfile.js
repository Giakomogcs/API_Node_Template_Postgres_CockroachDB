const path = require("path");
require("dotenv").config();

module.exports = {
  development: {
    client: "cockroachdb",
    connection: process.env.DATABASE_URL,

    pool: {
      afterCreate: (conn, cb) => {
        conn.query("SET timezone='UTC'", cb);
        conn.query(
          'SET serial_normalization = "sql_sequence";',
          function (err) {
            if (err) {
              cb(err, conn);
            } else {
              conn.query("SET default_int_size = 4;", function (err) {
                cb(err, conn);
              });
            }
          }
        );
      },
    },

    migrations: {
      directory: path.resolve(
        __dirname,
        "src",
        "database",
        "knex",
        "migrations"
      ),
    },
    useNullAsDefault: true,
    formatting: { capSQL: true },
  },
};
