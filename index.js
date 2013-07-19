/**
 * Module dependencies
 */

require = require('require-component')(require);

var debug = require('simple-debug')('envs')
  , stacktrace = require('stacktrace.js', 'stacktrace-js');

/**
 * Track the env var usages
 */

var usages = {};

/**
 * Save some global defaults
 */

var defaults = {};

/**
 * Require an environment variable and track its usage
 *
 *     envs('MY_VAR', 'this is a default');
 *
 * @param {String} name
 * @param {Any} defaultVal
 * @return {String}
 */

exports = module.exports = function env(name, defaultVal) {
  // Get the value
  var val = typeof process !== 'undefined'
    ? (process.env[name] || defaultVal || defaults[name])
    : (defaults[name] || defaultVal);

  // Parse the stack
  var lineno = stacktrace()[4].trim();

  // Log it
  debug(lineno, name+'='+val);

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
 * Set defaults in the environment
 *
 * @param {String|Object} name
 * @param {String} val
 * @api public
 */

exports.set = function(name, val) {
  if (isObject(name)) {
    for (var key in name) {
      defaults[key] = name[key];
    }
    return exports;
  }
  defaults[name] = val;
  return exports;
};

/**
 * Check if `obj` is an object.
 *
 * @param {Object} obj
 * @return {Boolean}
 * @api private
 */

function isObject(obj) {
  return obj === Object(obj);
}

/**
 * Expose the usages
 */

exports.usages = usages;
