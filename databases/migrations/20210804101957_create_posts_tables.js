
exports.up = function(knex) {
    // create table data schema
  return knex.schema.createTable('posts', table => {
    table.increments();
    table.string('title').notNullable();
    table.string('body').notNullable();
    table.foreign('user_id').unsigned();
    table.string('user_id').references('id').inTable('users').onDelete(setNull).onUpdate(setNull);
    table.foreign('admin_id').unsigned();
    table.string('admin_id').references('id').inTable('admins').onDelete(setNull).onUpdate(setNull);
    table.boolean('status').notNullable().default(false);
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
    // drop table
    return posts.schema.dropTable('posts');
};
