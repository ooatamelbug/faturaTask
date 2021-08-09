const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  components: {},
  info: {
    title: 'REST API for posts', // Title of the documentation
    version: '1.0.0', // Version of the app
    description: 'This is the REST API for posts', // short description of the app
  },
  host: 'localhost:3000', // the host or url of the app
  basePath: '/api/v1', // the basepath of your endpoint
};

// options for the swagger docs
const options = {
  // import swaggerDefinitions
  swaggerDefinition,
  // path to the API docs
  apis: ['./docs/**/*.yaml'],
};
// initialize swagger-jsdoc
module.exports = swaggerJSDoc(options);
