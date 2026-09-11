const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Soccer Teams & Players API',
      version: '1.0.0',
      description:
        'CSE 341 Project 2 - CRUD API for managing soccer teams and players, backed by MongoDB.'
    },
    servers: [
      {
        url: '/',
        description: 'Current server'
      }
    ]
  },
  apis: ['./routes/*.js']
};

module.exports = swaggerJsdoc(options);