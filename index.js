"use strict";

var loaderUtils = require("loader-utils");
var glob = require("glob");
var path = require("path");

module.exports = function (content) {
  this.cacheable && this.cacheable();

  var query = loaderUtils.parseQuery(this.resourceQuery);
  var pattern = content.trim();

  var resourceDir = path.dirname(this.resourcePath);
  if (query.cwd) {
      resourceDir = path.join(resourceDir, query.cwd);
  }

  var files = glob.sync(pattern, {
    cwd: resourceDir,
    realpath: true,
  });

  if (!files.length) {
    this.emitWarning('Did not find anything for glob "' + pattern + '" in directory "' + resourceDir + '"');
  }

  return "module.exports = [\n" + files.map((file) => {
    this.addDependency(file);
    return "  require(" + JSON.stringify(file) + ")"
  }).join(",\n") + "\n];"
};
