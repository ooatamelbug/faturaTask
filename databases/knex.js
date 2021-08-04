// put environment type
const environment = process.env.NOD_ENV || 'development';
// make knexfile configrations with environment type
const config = require('../utils/knexfile')[environment];

// required knex package and inital config to it
module.exports = require('knex')(config);