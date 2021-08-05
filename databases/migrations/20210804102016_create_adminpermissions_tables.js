
exports.up = function(knex) {
    // create table data schema
  return knex.schema.createTable('adminpermissions', table => {
    table.increments();
    table.integer('permission_id')
      .references('id')
      .inTable('permissions')
      .nullable().
      onDelete('SET NULL').
      onUpdate('SET NULL');
    table.integer('admin_id')
      .references('id')
      .inTable('admins')
      .nullable()
      .onDelete('SET NULL')
      .onUpdate('SET NULL');
    table.timestamp(true, true);
  });
};

exports.down = function(knex) {
    // drop table
    return knex.schema.dropTable('adminpermissions');
};
