
exports.up = function(knex) {
    // create table data schema
    return knex.schema.createTable('users', table => {
    table.increments();
    table.string('username').notNullable();
    table.string('firstName').notNullable();
    table.string('lastName').notNullable();
    table.string('email').notNullable();
    table.string('password').notNullable();
    table.foreign('admin_id').unsigned();
    table.string('admin_id').references('id').inTable('admins').onDelete(setNull).onUpdate(setNull);
    table.boolean('status').notNullable().default(false);
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
    // drop table
    return knex.schema.dropTable('users');
};
