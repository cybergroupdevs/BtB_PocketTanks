
// Transpile all code following this line with babel and use '@babel/preset-env' (aka ES6) preset.
require("@babel/register")({
    presets: ["@babel/preset-env"]
});
require("regenerator-runtime/runtime");
// require("@babel/register")({
//   presets: ["babel-polyfill"]
// });

// ENV CONFIG
process.env.ENGINE_NAME = "ANALYTICS";
process.env.ENV = "DEV";

// CUSTOM ENV CONFIG
if (process.argv.indexOf("--dev") !== -1) {
  process.env.ENV = "DEV";
} else if (process.argv.indexOf("--prod") !== -1) {
  process.env.ENV = "PROD";
}

// Import the rest of our application.
module.exports = require('./ms-analytics.js')