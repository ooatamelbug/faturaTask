
exports.up = function(knex) {
    // create table data schema 
  return knex.schema.createTable('permissions', table => {
    table.increments();
    table.string('name').notNullable().unique();
    table.timestamp(false, true);
  });
};

exports.down = function(knex) {
    // drop table
    return knex.schema.dropTable('permissions');
};
