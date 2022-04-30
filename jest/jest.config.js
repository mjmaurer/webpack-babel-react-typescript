module.exports = {
  rootDir: "..",
  verbose: true,
  transform: { "^.+\\.[jt]sx?$": "<rootDir>/jest/jestPreprocess.js" },
};
