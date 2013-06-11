/**
 * Module dependencies
 */
var debug = require("simple-debug")("envs");

/**
 * Track the env var usages
 */
var usages = {};

/**
 * Require an environment variable and track its usage
 *
 *     envs("MY_VAR", "this is a default");
 *
 * @param {String} name
 * @param {Any} defaultVal
 * @return {String}
 */
exports = module.exports = function env(name, defaultVal) {
  var location = /\((.+)\)/.exec((new Error).stack.split("\n")[2])
    , lineno = location[1]
    , val = process.env[name] || defaultVal;

  debug(lineno, name+"="+val);

  if(!usages[name]) usages[name] = [];

  usages[name].push({lineno: lineno, defaultVal: defaultVal, val: val});

  return val;
};

/**
 * Expose the usages
 */
exports.usages = usages;
