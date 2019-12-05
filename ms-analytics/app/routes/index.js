let api = require("./api");
let globalConfig = require('../../../config');

module.exports = {
  "apiBaseUri": globalConfig[process.env.ENV][process.env.ENGINE_NAME]['PREFIX'],
  "api": api
};