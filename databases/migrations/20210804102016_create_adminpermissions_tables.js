
exports.up = function(knex) {
    // create table data schema
  return knex.schema.createTable('adminpermissions', table => {
    table.increments();
    table.string('name').notNullable();
    table.foreign('permission_id').unsigned();
    table.string('permission_id').references('id').inTable('permissions').onDelete(setNull).onUpdate(setNull);
    table.foreign('admin_id').unsigned();
    table.string('admin_id').references('id').inTable('admins').onDelete(setNull).onUpdate(setNull);
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
    // drop table
    return knex.schema.dropTable('adminpermissions');
};
