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
  // Get the value
  var val = process.env[name] || defaultVal;
  debug(lineno, name+"="+val);

  // Parse the stack
  var lineno = (new Error).stack.split("\n")[2].trim();

  // Track the usages
  var envUsages = usages[name];

  // Create it if we don't have it already
  if(!envUsages) envUsages = usages[name] = [];

  // Check to see if we've already added this line number
  for (var i = envUsages.length - 1; i >= 0; i--) {
    if (envUsages[i].lineno === lineno) return val;
  };

  envUsages.push({lineno: lineno, defaultVal: defaultVal, val: val});

  return val;
};

/**
 * Expose the usages
 */
exports.usages = usages;
