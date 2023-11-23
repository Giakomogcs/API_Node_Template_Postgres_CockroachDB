exports.up = (knex) =>
  knex.schema.createTable("tags", (table) => {
    table.increments("id").unsigned().primary();
    table.text("patrimony");
    table.text("description");
    table.text("responsible");
    table.text("tag_id");
    table.timestamp("last_read");
    table.boolean("is_active");
  });

exports.down = (knex) => knex.schema.dropTable("tags");
