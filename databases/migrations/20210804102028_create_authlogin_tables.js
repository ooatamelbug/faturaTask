
exports.up = function(knex) {
    // create table data schema
  return knex.schema.createTable('authlogin', table => {
    table.increments();
    table.string('tableName').notNullable();
    table.string('token').notNullable();
    table.datetime('logintime').notNullable();
    table.datetime('logouttime').nullable();
    table.foreign('admin_id').unsigned();
    table.string('admin_id').references('id').inTable('admins').nullable().onDelete(setNull).onUpdate(setNull);
    table.foreign('admin_id').unsigned();
    table.string('admin_id').references('id').inTable('admins').nullable().onDelete(setNull).onUpdate(setNull);    
    table.boolean('status').notNullable().default(true);
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
    // drop table
    return knex.schema.dropTable('authlogin');  
};
