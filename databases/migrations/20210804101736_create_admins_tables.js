
exports.up = function(knex) {
  // create table data schema
  return knex.schema.createTable('admins', table => {
    table.increments();
    table.string('username').notNullable().unique();
    table.string('firstName').notNullable();
    table.string('lastName').notNullable();
    table.string('password').notNullable();
    table.integer('admin_id')
      .references('id')
      .inTable('admins')
      .nullable()
      .onDelete('SET NULL')
      .onUpdate('SET NULL');
    table.boolean('status').notNullable().default(false);
    table.timestamp(false, true);
  });
};

exports.down = function(knex) {
    // drop table
    return knex.schema.dropTable('admins');
};
