
exports.up = function(knex) {
    // create table data schema
  return knex.schema.createTable('posts', table => {
    table.increments();
    table.string('title').notNullable();
    table.string('body').notNullable();
    table.integer('user_id')
      .references('id')
      .inTable('users')
      .nullable()
      .onDelete('SET NULL')
      .onUpdate('SET NULL');
    table.integer('admin_id')
      .references('id')
      .inTable('admins')
      .nullable()
      .onDelete('SET NULL')
      .onUpdate('SET NULL');
    table.boolean('status').notNullable().default(false);
    table.timestamp(true, true);
  });
};

exports.down = function(knex) {
    // drop table
    return posts.schema.dropTable('posts');
};
