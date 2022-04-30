const { commonBabelOptions } = require("../webpack/common.js");

module.exports = require("babel-jest").default.createTransformer(
  commonBabelOptions()
);
