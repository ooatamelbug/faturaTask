
exports.up = function(knex) {
    // create table data schema
  return knex.schema.createTable('authlogin', table => {
    table.increments();
    table.string('tablename').notNullable();
    table.datetime('expirin').notNullable();
    table.text('token').notNullable().unique();
    table.datetime('logintime').notNullable();
    table.datetime('logouttime').nullable();
    table.integer('admin_id')
      .references('id')
      .inTable('admins')
      .nullable()
      .onDelete('SET NULL')
      .onUpdate('SET NULL');
    table.integer('user_id')
      .references('id')
      .inTable('users')
      .nullable()
      .onDelete('SET NULL')
      .onUpdate('SET NULL');    
    table.boolean('status').notNullable().default(true);
    table.timestamp(true, true);
  });
};

exports.down = function(knex) {
    // drop table
    return knex.schema.dropTable('authlogin');  
};
