/**
 * Module dependencies
 */
var should = require("should")
  , envs = require("..");

describe("envs", function() {
  it("should return the correct values", function() {
    var NODE_ENV = envs("NODE_ENV", "production")
      , NONEXISTANT = envs("NONEXISTANT", "i do exist");

    NODE_ENV.should.eql("test");
    NONEXISTANT.should.eql("i do exist");
  });

  it("should populate the `usages` variable", function() {
    envs("LINENO_TEST", "test123"); // If this line number changes, it will break the test

    envs.usages.LINENO_TEST[0].lineno.should.include("17");
  });
});
