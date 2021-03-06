
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('permissions').del()
    .then(function () {
      // Inserts seed entries
      return knex('permissions').insert([
        {id: 1, name: 'admins:create'},
        {id: 2, name: 'admins:read'},
        {id: 3, name: 'admins:update'},
        {id: 4, name: 'admins:delete'},
        {id: 5, name: 'admins:active'},
        {id: 6, name: 'users:active'},
        {id: 7, name: 'users:read'},
        {id: 8, name: 'posts:active'},
        {id: 9, name: 'permissions:create'},
        {id: 10, name: 'permissions:update'},
        {id: 11, name: 'permissions:delete'},
        {id: 12, name: 'permissions:read'},
        {id: 13, name: 'permissions:give'},
        {id: 14, name: 'users:delete'},
        {id: 15, name: 'permissions:del'}
      ]);
    });
};
