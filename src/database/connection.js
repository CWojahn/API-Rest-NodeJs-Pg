const knex = require('knex');
const configuration = require('../../knexfile');

const env = configuration.development;

const connection = knex(env);

module.exports = connection;
