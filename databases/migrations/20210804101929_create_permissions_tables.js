
exports.up = function(knex) {
    // create table data schema 
  return knex.schema.createTable('permissions', table => {
    table.increments();
    table.string('name').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
    // drop table
    return knex.schema.dropTable('permissions');
};
