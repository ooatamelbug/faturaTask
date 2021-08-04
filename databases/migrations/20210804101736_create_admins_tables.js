
exports.up = function(knex) {
  // create table data schema
  return knex.schema.createTable('admins', table => {
    table.increments();
    table.string('username').notNullable();
    table.string('firstName').notNullable();
    table.string('lastName').notNullable();
    table.string('password').notNullable();
    table.boolean('status').notNullable().default(false);
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
    // drop table
    return knex.schema.dropTable('admins');
};
